import { createFileRoute } from "@tanstack/react-router";
import { buildSeo, canonicalLink, jsonLdScript, breadcrumbSchema, gStructSoftwareSchema } from "@/lib/seo";
import kaironLogo from "@/assets/kairon-logo.webp";
import { GStructPage } from "@/components/pages/GStructPage";

export const Route = createFileRoute("/en/kairon")({
  head: () => ({
    meta: buildSeo({
      path: "/en/kairon",
      title: "KAIRON | AI cognitive coaching for better execution",
      description:
        "KAIRON is AI cognitive coaching guided by Kai. It helps professionals process thoughts, emotions, and interpretations that block execution and reach a concrete action in under 12 minutes.",
      image: kaironLogo,
      locale: "en_US",
    }),
    links: canonicalLink("/en/kairon"),
    scripts: [
      jsonLdScript(breadcrumbSchema([
        { name: "Home", path: "/en" },
        { name: "KAIRON", path: "/en/kairon" },
      ])),
      jsonLdScript(gStructSoftwareSchema("en")),
    ],
  }),
  component: () => <GStructPage locale="en" />,
});
