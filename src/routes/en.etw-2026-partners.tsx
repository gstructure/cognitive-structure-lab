import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/en/etw-2026-partners")({
  beforeLoad: () => {
    throw redirect({ to: "/en", replace: true, statusCode: 301 });
  },
});
