import { createFileRoute } from "@tanstack/react-router";
import { buildSeo, breadcrumbSchema, definedTermSetSchema, canonicalLink, jsonLdScript } from "@/lib/seo";
import { BloqueosPage, BLOQUEOS } from "@/components/pages/BloqueosPage";

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
              description:
                "Resistencia interna que separa la intención de la acción en una persona que ya tiene la información, los recursos y la capacidad necesarios para actuar. No es falta de tiempo ni de motivación: es una interpretación activa que vuelve razonable no empezar.",
              url: "https://g-structure.co/bloqueos",
            },
            ...BLOQUEOS.map((b) => ({
              name: b.name,
              description: b.lede,
              url: `https://g-structure.co/bloqueos#${b.anchor}`,
            })),
          ],
        }),
      ),
    ],
  }),
  component: () => <BloqueosPage />,
});
