import { createFileRoute } from "@tanstack/react-router";
import { buildSeo, canonicalLink, jsonLdScript, breadcrumbSchema } from "@/lib/seo";
import { InvestorsPage } from "@/components/pages/InvestorsPage";

export const Route = createFileRoute("/inversores")({
  head: () => ({
    meta: buildSeo({
      path: "/inversores",
      title: "Inversores | G-Struct, plataforma CBT para ejecución en LATAM",
      description:
        "Tesis pre-seed de G-Structure: G-Struct convierte el método I-R-O en una plataforma cognitivo-conductual escalable para profesionales y equipos en LATAM.",
    }),
    links: canonicalLink("/inversores"),
    scripts: [
      jsonLdScript(
        breadcrumbSchema([
          { name: "Inicio", path: "/" },
          { name: "Inversores", path: "/inversores" },
        ]),
      ),
    ],
  }),
  component: () => <InvestorsPage locale="es" contactTo="/contacto" />,
});
