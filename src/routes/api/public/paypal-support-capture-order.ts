import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { callPayPal } from "@/lib/paypal.server";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { getSupportTier } from "@/lib/support-tiers";

const Schema = z.object({
  orderId: z.string().trim().min(6).max(120),
  supporterName: z.string().trim().max(120).optional(),
  supporterEmail: z.string().trim().email().max(255),
  wantsPublicRecognition: z.boolean().optional(),
  message: z.string().trim().max(800).optional(),
  acceptedTerms: z.literal(true),
});

type PayPalCaptureResponse = {
  id: string;
  status: string;
  payer?: { email_address?: string };
  purchase_units?: Array<{
    custom_id?: string;
    reference_id?: string;
    amount?: { value?: string; currency_code?: string };
    payments?: {
      captures?: Array<{
        id?: string;
        status?: string;
        amount?: { value?: string; currency_code?: string };
        create_time?: string;
      }>;
    };
  }>;
};

export const Route = createFileRoute("/api/public/paypal-support-capture-order")({
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
          return Response.json({ error: "validation_failed" }, { status: 400 });
        }

        try {
          const capture = await callPayPal<PayPalCaptureResponse>(
            `/v2/checkout/orders/${encodeURIComponent(parsed.data.orderId)}/capture`,
            { method: "POST", body: "{}" },
          );

          const purchaseUnit = capture.purchase_units?.[0];
          const paymentCapture = purchaseUnit?.payments?.captures?.[0];
          const tierId = purchaseUnit?.custom_id ?? purchaseUnit?.reference_id ?? "";
          const tier = getSupportTier(tierId);
          const amountValue = Number(paymentCapture?.amount?.value ?? purchaseUnit?.amount?.value ?? 0);
          const currency = paymentCapture?.amount?.currency_code ?? purchaseUnit?.amount?.currency_code;

          if (capture.status !== "COMPLETED" || paymentCapture?.status !== "COMPLETED" || !tier) {
            console.error("[paypal-support-capture-order] incomplete capture", { capture });
            return Response.json({ error: "payment_not_completed" }, { status: 409 });
          }

          if (currency !== "USD" || amountValue !== tier.amount) {
            console.error("[paypal-support-capture-order] amount mismatch", { currency, amountValue, tier });
            return Response.json({ error: "payment_mismatch" }, { status: 409 });
          }

          const db = supabaseAdmin as any;
          const { error } = await db
            .from("support_payments")
            .insert({
              support_tier: tier.id,
              amount_usd: tier.amount,
              supporter_name: parsed.data.supporterName?.trim() || null,
              supporter_email: parsed.data.supporterEmail.toLowerCase(),
              wants_public_recognition: parsed.data.wantsPublicRecognition ?? false,
              supporter_message: parsed.data.message?.trim() || null,
              payment_status: "captured",
              paypal_order_id: capture.id,
              paypal_capture_id: paymentCapture.id ?? null,
              paypal_payer_email: capture.payer?.email_address?.toLowerCase() ?? null,
              captured_at: paymentCapture.create_time ?? new Date().toISOString(),
            });

          if (error && (error as any).code !== "23505") {
            console.error("[paypal-support-capture-order] save failed", error);
            return Response.json({ error: "save_failed" }, { status: 502 });
          }

          return Response.json({
            ok: true,
            status: "captured",
            orderId: capture.id,
            captureId: paymentCapture.id ?? null,
          });
        } catch (error) {
          console.error("[paypal-support-capture-order] failed", error);
          return Response.json({ error: "capture_failed" }, { status: 502 });
        }
      },
    },
  },
});
