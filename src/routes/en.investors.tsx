import { createFileRoute } from "@tanstack/react-router";
import { buildSeo, canonicalLink, jsonLdScript, breadcrumbSchema } from "@/lib/seo";
import { InvestorsPage } from "@/components/pages/InvestorsPage";

export const Route = createFileRoute("/en/investors")({
  head: () => ({
    meta: buildSeo({
      path: "/en/investors",
      title: "Investors | G-Structure",
      description:
        "G-Struct is the first cognitive-behavioral OS for high-performers in LATAM. Pre-seed in progress. Information for qualified investors.",
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
