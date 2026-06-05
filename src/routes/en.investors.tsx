import { createFileRoute } from "@tanstack/react-router";
import { buildSeo, canonicalLink, jsonLdScript, breadcrumbSchema } from "@/lib/seo";
import { InvestorsPage } from "@/components/pages/InvestorsPage";

export const Route = createFileRoute("/en/investors")({
  head: () => ({
    meta: buildSeo({
      path: "/en/investors",
      title: "Investors | KAIRON, Cognitive OS for execution in LATAM",
      description:
        "G-Structure's pre-seed thesis: KAIRON turns the I-R-O Method into a Kai-guided Cognitive OS for professionals, founders, and teams in LATAM.",
      locale: "en_US",
    }),
    links: canonicalLink("/en/investors"),
    scripts: [
      jsonLdScript(
        breadcrumbSchema([
          { name: "Home", path: "/en" },
          { name: "Investors", path: "/en/investors" },
        ]),
      ),
    ],
  }),
  component: () => <InvestorsPage locale="en" contactTo="/en/contact" />,
});
