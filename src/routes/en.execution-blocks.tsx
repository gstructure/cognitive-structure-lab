import { createFileRoute } from "@tanstack/react-router";
import { buildSeo, breadcrumbSchema, definedTermSetSchema, canonicalLink, jsonLdScript } from "@/lib/seo";
import { BloqueosPage, BLOQUEOS_COPY } from "@/components/pages/BloqueosPage";

export const Route = createFileRoute("/en/execution-blocks")({
  head: () => ({
    meta: buildSeo({
      path: "/en/execution-blocks",
      title: "The Four Execution Blocks — procrastination, perfectionism, self-sabotage, impostor syndrome | G-Structure",
      description:
        "An open taxonomy of the four patterns that block execution: an operational definition, observable signals, how to tell them apart, and the right intervention for each.",
      locale: "en_US",
    }),
    links: canonicalLink("/en/execution-blocks"),
    scripts: [
      jsonLdScript(breadcrumbSchema([{ name: "Execution blocks", path: "/en/execution-blocks" }])),
      jsonLdScript(
        definedTermSetSchema({
          name: "Execution Blocks Taxonomy",
          description:
            "The four cognitive patterns that block execution in people who already have the information, resources, and ability needed to act.",
          url: "https://g-structure.co/en/execution-blocks",
          terms: [
            {
              name: "Execution friction",
              description: BLOQUEOS_COPY.en.frictionBody,
              url: "https://g-structure.co/en/execution-blocks",
            },
            ...BLOQUEOS_COPY.en.blocks.map((b) => ({
              name: b.name,
              description: b.lede,
              url: `https://g-structure.co/en/execution-blocks#${b.anchor}`,
            })),
          ],
        }),
      ),
    ],
  }),
  component: () => <BloqueosPage locale="en" />,
});
