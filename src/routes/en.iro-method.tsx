import { createFileRoute } from "@tanstack/react-router";
import { buildSeo, breadcrumbSchema, faqSchema, howToSchema, canonicalLink, jsonLdScript } from "@/lib/seo";
import { MetodoIroPage, METODO_IRO_COPY } from "@/components/pages/MetodoIroPage";

export const Route = createFileRoute("/en/iro-method")({
  head: () => ({
    meta: buildSeo({
      path: "/en/iro-method",
      title: "The I-R-O™ Method — Identify, Restructure, Optimize | G-Structure",
      description:
        "The canonical definition of the I-R-O™ Method: the three-phase framework KAIRON uses to identify execution blocks, restructure the interpretation sustaining them, and turn clarity into action.",
      locale: "en_US",
    }),
    links: canonicalLink("/en/iro-method"),
    scripts: [
      jsonLdScript(breadcrumbSchema([{ name: "I-R-O™ Method", path: "/en/iro-method" }])),
      jsonLdScript(faqSchema(METODO_IRO_COPY.en.faq)),
      jsonLdScript(
        howToSchema({
          name: "I-R-O™ Method",
          description:
            "A three-phase protocol that intervenes on the thought sustaining an execution block, at the moment it appears.",
          steps: METODO_IRO_COPY.en.phases.map((p) => ({ name: p.title, text: p.body })),
        }),
      ),
    ],
  }),
  component: () => <MetodoIroPage locale="en" />,
});
