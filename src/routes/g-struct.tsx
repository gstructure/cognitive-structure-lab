import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/g-struct")({
  beforeLoad: () => {
    throw redirect({ to: "/g-frame", replace: true });
  },
});
