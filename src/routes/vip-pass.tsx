import { createFileRoute } from "@tanstack/react-router";
import { VipPassPage } from "@/components/pages/VipPassPage";

export const Route = createFileRoute("/vip-pass")({
  head: () => ({
    meta: [
      { title: "Pase VIP · Cohorte Fundadora KAIRON" },
      { name: "robots", content: "noindex, nofollow" },
      {
        name: "description",
        content: "Pase de Arquitectura VIP para la Cohorte Fundadora de KAIRON.",
      },
    ],
  }),
  component: () => <VipPassPage locale="es" />,
});
