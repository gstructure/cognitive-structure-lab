import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { sendNewsletterWelcomeEmail } from "@/lib/newsletter-emails.server";

const Schema = z.object({
  email: z.string().trim().email("invalid_email").max(255),
  source: z.string().trim().max(80).optional(),
  locale: z.enum(["es", "en"]).optional(),
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

function getClientIp(request: Request) {
  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

export const Route = createFileRoute("/api/public/newsletter-subscribe")({
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
            { error: "validation_failed", issues: parsed.error.issues.map((issue) => issue.message) },
            { status: 400 },
          );
        }

        if (parsed.data.website && parsed.data.website.length > 0) {
          return Response.json({ ok: true, status: "subscribed" });
        }

        const ip = getClientIp(request);
        if (!rateLimit(ip)) {
          return Response.json({ error: "rate_limited" }, { status: 429 });
        }

        const email = parsed.data.email.toLowerCase();
        const locale = parsed.data.locale ?? "es";
        const source = parsed.data.source ?? "website";

        const { data: existing, error: readError } = await supabaseAdmin
          .from("newsletter_subscribers" as any)
          .select("id, status")
          .eq("email", email)
          .maybeSingle();

        if (readError) {
          console.error("[api/public/newsletter-subscribe] read failed", readError);
          return Response.json({ error: "save_failed" }, { status: 502 });
        }

        if (existing?.status === "subscribed") {
          return Response.json({ error: "already_subscribed" }, { status: 409 });
        }

        const now = new Date().toISOString();
        const query = existing
          ? supabaseAdmin
              .from("newsletter_subscribers" as any)
              .update({
                status: "subscribed",
                locale,
                source,
                subscribed_at: now,
                unsubscribed_at: null,
              })
              .eq("id", existing.id)
              .select("id")
              .single()
          : supabaseAdmin
              .from("newsletter_subscribers" as any)
              .insert({
                email,
                status: "subscribed",
                locale,
                source,
              })
              .select("id")
              .single();

        const { data: subscriber, error: saveError } = await query;
        if (saveError || !subscriber) {
          console.error("[api/public/newsletter-subscribe] save failed", saveError);
          return Response.json({ error: "save_failed" }, { status: 502 });
        }

        try {
          await supabaseAdmin
            .from("suppressed_emails" as any)
            .delete()
            .eq("email", email)
            .eq("reason", "unsubscribe");
        } catch (error) {
          console.error("[newsletter] suppression reactivation failed", error);
        }

        try {
          const emailResult = await sendNewsletterWelcomeEmail({
            recipientEmail: email,
            locale,
            idempotencyKey: `newsletter-welcome-${subscriber.id}-${Date.now()}`,
          });
          if (emailResult.ok) {
            await supabaseAdmin
              .from("newsletter_subscribers" as any)
              .update({ welcome_email_sent_at: new Date().toISOString() })
              .eq("id", subscriber.id);
          } else {
            console.error("[newsletter] welcome email failed", emailResult.error);
          }
        } catch (error) {
          console.error("[newsletter] welcome email unavailable", error);
        }

        return Response.json({ ok: true, status: "subscribed" });
      },
    },
  },
});
