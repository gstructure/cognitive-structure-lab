import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/en/g-struct")({
  beforeLoad: () => {
    throw redirect({ to: "/en/g-frame", replace: true });
  },
});
