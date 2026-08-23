import { createFileRoute } from "@tanstack/react-router";
import { buildSeo, breadcrumbSchema, faqSchema, howToSchema, canonicalLink, jsonLdScript } from "@/lib/seo";
import { MetodoIroPage, METODO_IRO_COPY } from "@/components/pages/MetodoIroPage";

export const Route = createFileRoute("/metodo-iro")({
  head: () => ({
    meta: buildSeo({
      path: "/metodo-iro",
      title: "Método I-R-O™ — Identificar, Reestructurar, Optimizar | G-Structure",
      description:
        "Definición canónica del Método I-R-O™: el marco de tres fases que KAIRON usa para identificar bloqueos de ejecución, reestructurar la interpretación que los sostiene y convertir la claridad en acción.",
    }),
    links: canonicalLink("/metodo-iro"),
    scripts: [
      jsonLdScript(breadcrumbSchema([{ name: "Método I-R-O™", path: "/metodo-iro" }])),
      jsonLdScript(faqSchema(METODO_IRO_COPY.es.faq)),
      jsonLdScript(
        howToSchema({
          name: "Método I-R-O™",
          description:
            "Protocolo de tres fases que interviene sobre el pensamiento que sostiene un bloqueo de ejecución, en el momento en que aparece.",
          steps: METODO_IRO_COPY.es.phases.map((p) => ({ name: p.title, text: p.body })),
        }),
      ),
    ],
  }),
  component: () => <MetodoIroPage locale="es" />,
});
