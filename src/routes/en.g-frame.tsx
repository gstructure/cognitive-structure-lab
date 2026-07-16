import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/en/g-frame")({
  beforeLoad: () => {
    throw redirect({ to: "/en/kairon", statusCode: 301 });
  },
});
