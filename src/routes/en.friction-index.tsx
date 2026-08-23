import { createFileRoute } from "@tanstack/react-router";
import { buildSeo, breadcrumbSchema, datasetSchema, canonicalLink, jsonLdScript } from "@/lib/seo";
import { IndiceFriccionPage } from "@/components/pages/IndiceFriccionPage";

export const Route = createFileRoute("/en/friction-index")({
  head: () => ({
    meta: buildSeo({
      path: "/en/friction-index",
      title: "Execution Friction Index (EFI) — preliminary edition 2026 | G-Structure",
      description:
        "The Execution Friction Index measures the distance between intention and action in professional settings. Open methodology and aggregated data from KAIRON's pilot sample.",
      locale: "en_US",
    }),
    links: canonicalLink("/en/friction-index"),
    scripts: [
      jsonLdScript(breadcrumbSchema([{ name: "Friction Index", path: "/en/friction-index" }])),
      jsonLdScript(
        datasetSchema({
          name: "Execution Friction Index (EFI), preliminary edition",
          description:
            "A value from 0 to 100 that expresses the proportion of declared intentions that don't turn into action within their expected window, weighted by how relevant the person rates each intention. Calculated on anonymized KAIRON sessions with a pilot sample of 52 participants; not representative at the population level.",
          url: "https://g-structure.co/en/friction-index",
          license: "Free to use, including application by third parties for research purposes. See g-structure.co/en/friction-index.",
          temporalCoverage: "2026-08",
          variables: [
            "Intention conversion rate",
            "Start latency",
            "Pattern recurrence",
          ],
        }),
      ),
    ],
  }),
  component: () => <IndiceFriccionPage locale="en" />,
});
