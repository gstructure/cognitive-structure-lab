import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/aliados-etw-2026")({
  beforeLoad: () => {
    throw redirect({ to: "/", replace: true, statusCode: 301 });
  },
});
