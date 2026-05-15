import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const Schema = z.object({
  email: z.string().trim().email("invalid_email").max(255),
  source: z.string().trim().max(60).optional(),
  locale: z.string().trim().max(10).optional(),
  // Honeypot — must be empty.
  website: z.string().max(0).optional().or(z.literal("")),
});

const RATE_BUCKET = new Map<string, { count: number; resetAt: number }>();
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 5;

function rateLimit(key: string): boolean {
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

export const Route = createFileRoute("/api/public/gstruct-waitlist")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "invalid_json" }, { status: 400 });
        }

        const parsed = Schema.safeParse(body);
        if (!parsed.success) {
          return Response.json(
            { error: "validation_failed", issues: parsed.error.issues.map((i) => i.message) },
            { status: 400 },
          );
        }

        if (parsed.data.website && parsed.data.website.length > 0) {
          return Response.json({ ok: true });
        }

        const ip =
          request.headers.get("cf-connecting-ip") ||
          request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
          "unknown";
        if (!rateLimit(ip)) {
          return Response.json({ error: "rate_limited" }, { status: 429 });
        }

        const email = parsed.data.email.toLowerCase();
        const { error } = await supabaseAdmin
          .from("gstruct_waitlist")
          .upsert(
            {
              email,
              source: parsed.data.source ?? "web",
              locale: parsed.data.locale ?? "es",
              metadata: { ip_hash: null, ua: request.headers.get("user-agent") ?? null },
            },
            { onConflict: "email" },
          );

        if (error) {
          console.error("[api/public/gstruct-waitlist] insert failed", error);
          return Response.json({ error: "save_failed" }, { status: 502 });
        }

        return Response.json({ ok: true });
      },
    },
  },
});
