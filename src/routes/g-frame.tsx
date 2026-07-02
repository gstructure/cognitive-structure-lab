import { createFileRoute } from "@tanstack/react-router";
import { buildSeo, canonicalLink, jsonLdScript, breadcrumbSchema, gStructSoftwareSchema } from "@/lib/seo";
import kaironLogo from "@/assets/kairon-logo.webp";
import { GStructPage } from "@/components/pages/GStructPage";

export const Route = createFileRoute("/g-frame")({
  head: () => ({
    meta: buildSeo({
      path: "/g-frame",
      title: "KAIRON | Coaching cognitivo con IA para ejecutar mejor",
      description:
        "KAIRON es coaching cognitivo con IA guiado por Kai. Procesa pensamientos, emociones e interpretaciones que bloquean tu ejecución, separa la situación de la lectura mental y te lleva a una acción concreta en menos de 12 minutos.",
      image: kaironLogo,
    }),
    links: canonicalLink("/g-frame"),
    scripts: [
      jsonLdScript(breadcrumbSchema([
        { name: "Inicio", path: "/" },
        { name: "KAIRON", path: "/g-frame" },
      ])),
      jsonLdScript(gStructSoftwareSchema("es")),
    ],
  }),
  component: () => <GStructPage locale="es" />,
});
