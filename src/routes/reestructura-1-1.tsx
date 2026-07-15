import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/reestructura-1-1")({
  beforeLoad: () => {
    throw redirect({ to: "/enterprise", replace: true, statusCode: 301 });
  },
});
