import { createFileRoute } from "@tanstack/react-router";
import { buildSeo, breadcrumbSchema, definedTermSetSchema, canonicalLink, jsonLdScript } from "@/lib/seo";
import { BloqueosPage, BLOQUEOS_COPY } from "@/components/pages/BloqueosPage";

export const Route = createFileRoute("/bloqueos")({
  head: () => ({
    meta: buildSeo({
      path: "/bloqueos",
      title: "Los cuatro bloqueos de ejecución — procrastinación, perfeccionismo, autosabotaje, impostor | G-Structure",
      description:
        "Taxonomía abierta de los cuatro patrones que bloquean la ejecución: definición operativa, señales observables, cómo distinguirlos entre sí y qué intervención corresponde a cada uno.",
    }),
    links: canonicalLink("/bloqueos"),
    scripts: [
      jsonLdScript(breadcrumbSchema([{ name: "Bloqueos de ejecución", path: "/bloqueos" }])),
      jsonLdScript(
        definedTermSetSchema({
          name: "Taxonomía de bloqueos de ejecución",
          description:
            "Los cuatro patrones cognitivos que bloquean la ejecución en personas que ya tienen la información, los recursos y la capacidad necesarios para actuar.",
          url: "https://g-structure.co/bloqueos",
          terms: [
            {
              name: "Fricción de ejecución",
              description: BLOQUEOS_COPY.es.frictionBody,
              url: "https://g-structure.co/bloqueos",
            },
            ...BLOQUEOS_COPY.es.blocks.map((b) => ({
              name: b.name,
              description: b.lede,
              url: `https://g-structure.co/bloqueos#${b.anchor}`,
            })),
          ],
        }),
      ),
    ],
  }),
  component: () => <BloqueosPage locale="es" />,
});
