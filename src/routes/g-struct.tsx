import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/g-struct")({
  beforeLoad: () => {
    throw redirect({ to: "/kairon", statusCode: 301 });
  },
});
