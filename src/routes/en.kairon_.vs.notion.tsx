import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/en/kairon_/vs/notion")({
  beforeLoad: () => {
    throw redirect({ to: "/en/vs-generative-ai", statusCode: 301 });
  },
});
