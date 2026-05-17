import { createFileRoute } from "@tanstack/react-router";
import { buildSeo, canonicalLink, jsonLdScript, breadcrumbSchema } from "@/lib/seo";
import { InvestorsPage } from "@/components/pages/InvestorsPage";

export const Route = createFileRoute("/inversores")({
  head: () => ({
    meta: buildSeo({
      path: "/inversores",
      title: "Inversores | G-Structure",
      description:
        "G-Struct es el primer OS cognitivo-conductual para high-performers en LATAM. Pre-seed en curso. Información para inversores calificados.",
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
