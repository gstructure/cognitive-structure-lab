import { createFileRoute } from "@tanstack/react-router";
import { buildSeo, canonicalLink, jsonLdScript, breadcrumbSchema, gStructSoftwareSchema } from "@/lib/seo";
import kaironLogo from "@/assets/kairon-logo.webp";
import { GStructPage } from "@/components/pages/GStructPage";

export const Route = createFileRoute("/kairon")({
  head: () => ({
    meta: buildSeo({
      path: "/kairon",
      title: "KAIRON | Coaching cognitivo con IA para ejecutar mejor",
      description:
        "KAIRON es coaching cognitivo con IA guiado por Kai. Procesa pensamientos, emociones e interpretaciones que bloquean tu ejecucion y te lleva a una accion concreta en menos de 12 minutos.",
      image: kaironLogo,
    }),
    links: canonicalLink("/kairon"),
    scripts: [
      jsonLdScript(breadcrumbSchema([
        { name: "Inicio", path: "/" },
        { name: "KAIRON", path: "/kairon" },
      ])),
      jsonLdScript(gStructSoftwareSchema("es")),
    ],
  }),
  component: () => <GStructPage locale="es" />,
});
