import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { sendContactEmails } from "@/lib/contact-emails.server";

const ContactSchema = z.object({
  name: z.string().trim().min(1, "name_required").max(120),
  email: z.string().trim().email("invalid_email").max(255),
  organization: z.string().trim().max(160).optional().or(z.literal("")),
  role: z.string().trim().max(120).optional().or(z.literal("")),
  whatsapp: z.string().trim().max(40).optional().or(z.literal("")),
  country: z.string().trim().max(120).optional().or(z.literal("")),
  requestType: z.string().trim().min(1, "request_type_required").max(80),
  message: z.string().trim().min(1, "message_required").max(4000),
  consent: z.literal(true, { errorMap: () => ({ message: "consent_required" }) }),
  // Honeypot — must be empty.
  website: z.string().max(0).optional().or(z.literal("")),
  pageOrigin: z.string().max(255).optional().or(z.literal("")),
  language: z.string().max(10).optional().or(z.literal("")),
});

// In-memory rate limiter (per-Worker instance — best-effort).
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

export const Route = createFileRoute("/api/public/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "invalid_json" }, { status: 400 });
        }

        const parsed = ContactSchema.safeParse(body);
        if (!parsed.success) {
          return Response.json(
            { error: "validation_failed", issues: parsed.error.issues.map((i) => i.message) },
            { status: 400 },
          );
        }

        // Honeypot triggered — pretend success.
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

        const result = await sendContactEmails({
          name: parsed.data.name,
          email: parsed.data.email,
          organization: parsed.data.organization || undefined,
          role: parsed.data.role || undefined,
          whatsapp: parsed.data.whatsapp || undefined,
          country: parsed.data.country || undefined,
          requestType: parsed.data.requestType,
          message: parsed.data.message,
          pageOrigin: parsed.data.pageOrigin || undefined,
          language: parsed.data.language || undefined,
        });

        if (!result.ok) {
          console.error("[api/public/contact] send failed", result.error);
          return Response.json({ error: "send_failed" }, { status: 502 });
        }

        return Response.json({ ok: true });
      },
    },
  },
});
