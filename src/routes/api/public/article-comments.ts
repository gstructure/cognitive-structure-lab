import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { ARTICLES } from "@/lib/articles";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const SLUGS = new Set(ARTICLES.map((article) => article.slug));

const PostSchema = z.object({
  slug: z.string().trim().max(120),
  authorName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(255),
  body: z.string().trim().min(12).max(1200),
  website: z.string().max(0).optional().or(z.literal("")),
});

const RATE_BUCKET = new Map<string, { count: number; resetAt: number }>();
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 3;

function rateLimit(key: string) {
  const now = Date.now();
  const entry = RATE_BUCKET.get(key);
  if (!entry || entry.resetAt < now) {
    RATE_BUCKET.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_MAX) return false;
  entry.count += 1;
  return true;
}

function getClientIp(request: Request) {
  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

async function sha256(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export const Route = createFileRoute("/api/public/article-comments")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const slug = url.searchParams.get("slug")?.trim() ?? "";
        if (!SLUGS.has(slug)) {
          return Response.json({ error: "unknown_article" }, { status: 404 });
        }

        try {
          const { data, error } = await supabaseAdmin
            .from("article_comments" as any)
            .select("id, author_name, body, created_at")
            .eq("article_slug", slug)
            .eq("status", "approved")
            .order("created_at", { ascending: true });

          if (error) {
            console.error("[api/public/article-comments] select failed", error);
            return Response.json({ comments: [] });
          }

          return Response.json({ comments: data ?? [] });
        } catch (err) {
          console.error("[api/public/article-comments] unavailable", err);
          return Response.json({ comments: [] });
        }
      },
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "invalid_json" }, { status: 400 });
        }

        const parsed = PostSchema.safeParse(body);
        if (!parsed.success) {
          return Response.json({ error: "validation_failed" }, { status: 400 });
        }

        if (parsed.data.website && parsed.data.website.length > 0) {
          return Response.json({ ok: true, status: "pending" });
        }

        if (!SLUGS.has(parsed.data.slug)) {
          return Response.json({ error: "unknown_article" }, { status: 404 });
        }

        const ip = getClientIp(request);
        if (!rateLimit(`${ip}:${parsed.data.slug}`)) {
          return Response.json({ error: "rate_limited" }, { status: 429 });
        }

        const { error } = await supabaseAdmin.from("article_comments" as any).insert({
          article_slug: parsed.data.slug,
          author_name: parsed.data.authorName,
          author_email: parsed.data.email.toLowerCase(),
          body: parsed.data.body,
          status: "pending",
          user_agent: request.headers.get("user-agent")?.slice(0, 500) ?? null,
          ip_hash: await sha256(ip),
        });

        if (error) {
          console.error("[api/public/article-comments] insert failed", error);
          return Response.json({ error: "save_failed" }, { status: 502 });
        }

        return Response.json({ ok: true, status: "pending" });
      },
    },
  },
});
