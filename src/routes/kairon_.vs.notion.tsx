import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/kairon_/vs/notion")({
  beforeLoad: () => {
    throw redirect({ to: "/vs-ia-generativa", statusCode: 301 });
  },
});
