import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { sendWaitlistConfirmationEmail } from "@/lib/waitlist-emails.server";

const Schema = z.object({
  email: z.string().trim().email("invalid_email").max(255),
  name: z.string().trim().max(120).optional(),
  source: z.string().trim().max(60).optional(),
  pattern: z.string().trim().max(60).optional(),
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

        // Insert into the new waitlist table. Unique on email -> duplicate detection.
        const { data: inserted, error } = await supabaseAdmin
          .from("waitlist")
          .insert({
            email,
            name: parsed.data.name?.trim() || null,
            source: parsed.data.source ?? "other",
            pattern: parsed.data.pattern?.trim() || null,
          })
          .select("id")
          .single();

        if (error) {
          // Postgres unique violation
          if ((error as any).code === "23505") {
            return Response.json({ error: "already_subscribed" }, { status: 409 });
          }
          console.error("[api/public/gstruct-waitlist] insert failed", error);
          return Response.json({ error: "save_failed" }, { status: 502 });
        }

        // Send confirmation email — await so the Worker doesn't terminate early.
        try {
          await sendWaitlistConfirmationEmail({
            recipientEmail: email,
            idempotencyKey: `waitlist-${inserted!.id}`,
          });
        } catch (e) {
          console.error("[waitlist] email send failed", e);
        }

        return Response.json({ ok: true });
      },
    },
  },
});
