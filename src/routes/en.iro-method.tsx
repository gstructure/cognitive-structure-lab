import { createFileRoute } from "@tanstack/react-router";
import { IroMethodPage } from "./metodo-iro";
import { buildSeo, breadcrumbSchema, canonicalLink, jsonLdScript } from "@/lib/seo";

export const Route = createFileRoute("/en/iro-method")({
  head: () => ({
    meta: buildSeo({
      path: "/en/iro-method",
      title: "I-R-O™ Method | G-Structure",
      description:
        "I-R-O™ is the proprietary method behind G-Frame: Identify, Reframe, and Optimize cognitive-behavioral friction before execution.",
      locale: "en_US",
    }),
    links: canonicalLink("/en/iro-method"),
    scripts: [jsonLdScript(breadcrumbSchema([{ name: "I-R-O™ Method", path: "/en/iro-method" }]))],
  }),
  component: () => <IroMethodPage locale="en" />,
});
