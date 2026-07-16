import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/diagnostico-friccion-ejecutiva")({
  beforeLoad: () => {
    throw redirect({ to: "/kairon", statusCode: 301 });
  },
});
