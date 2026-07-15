import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/en/restructure-1-1")({
  beforeLoad: () => {
    throw redirect({ to: "/en/enterprise", replace: true, statusCode: 301 });
  },
});
