import { createFileRoute } from "@tanstack/react-router";
import { getPayPalClientId, getPayPalEnvironment, isPayPalConfigured } from "@/lib/paypal.server";

export const Route = createFileRoute("/api/public/paypal-support-config")({
  server: {
    handlers: {
      GET: async () => Response.json({
        clientId: getPayPalClientId(),
        environment: getPayPalEnvironment(),
        configured: isPayPalConfigured(),
      }),
    },
  },
});
