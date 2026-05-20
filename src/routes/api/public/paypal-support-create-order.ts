import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { callPayPal } from "@/lib/paypal.server";
import { getSupportTier } from "@/lib/support-tiers";

const Schema = z.object({
  tier: z.string().trim(),
});

type PayPalCreateOrderResponse = {
  id: string;
  status: string;
};

export const Route = createFileRoute("/api/public/paypal-support-create-order")({
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

        const tier = getSupportTier(parsed.data.tier);
        if (!tier) {
          return Response.json({ error: "unknown_tier" }, { status: 400 });
        }

        try {
          const order = await callPayPal<PayPalCreateOrderResponse>("/v2/checkout/orders", {
            method: "POST",
            body: JSON.stringify({
              intent: "CAPTURE",
              purchase_units: [
                {
                  reference_id: tier.id,
                  custom_id: tier.id,
                  description: `G-Structure launch support - ${tier.label}`,
                  amount: {
                    currency_code: "USD",
                    value: tier.amount.toFixed(2),
                  },
                },
              ],
              application_context: {
                brand_name: "G-Structure",
                shipping_preference: "NO_SHIPPING",
                user_action: "PAY_NOW",
              },
            }),
          });

          return Response.json({ id: order.id, status: order.status });
        } catch (error) {
          console.error("[paypal-support-create-order] failed", error);
          return Response.json({ error: "paypal_unavailable" }, { status: 502 });
        }
      },
    },
  },
});
