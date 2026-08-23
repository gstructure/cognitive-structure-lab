import { createFileRoute } from "@tanstack/react-router";
import { buildSeo, breadcrumbSchema, datasetSchema, canonicalLink, jsonLdScript } from "@/lib/seo";
import { IndiceFriccionPage } from "@/components/pages/IndiceFriccionPage";

export const Route = createFileRoute("/indice-friccion")({
  head: () => ({
    meta: buildSeo({
      path: "/indice-friccion",
      title: "Índice de Fricción de Ejecución (IFE) — edición preliminar 2026 | G-Structure",
      description:
        "El Índice de Fricción de Ejecución mide la distancia entre intención y acción en entornos profesionales. Metodología abierta y datos agregados de la muestra piloto de KAIRON.",
    }),
    links: canonicalLink("/indice-friccion"),
    scripts: [
      jsonLdScript(breadcrumbSchema([{ name: "Índice de Fricción", path: "/indice-friccion" }])),
      jsonLdScript(
        datasetSchema({
          name: "Índice de Fricción de Ejecución (IFE), edición preliminar",
          description:
            "Valor de 0 a 100 que expresa la proporción de intenciones declaradas que no se convierten en acción dentro de su ventana prevista, ponderada por la relevancia que la persona asigna a cada intención. Calculado sobre sesiones anonimizadas de KAIRON con una muestra piloto de 52 participantes; no representativa a nivel poblacional.",
          url: "https://g-structure.co/indice-friccion",
          license: "Uso libre, incluida su aplicación por terceros con fines de investigación. Ver g-structure.co/indice-friccion.",
          temporalCoverage: "2026-08",
          variables: [
            "Tasa de conversión de intención",
            "Latencia de inicio",
            "Recurrencia de patrón",
          ],
        }),
      ),
    ],
  }),
  component: () => <IndiceFriccionPage />,
});
