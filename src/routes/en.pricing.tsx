import { createFileRoute } from "@tanstack/react-router";
import { buildSeo, canonicalLink, jsonLdScript, breadcrumbSchema, gStructSoftwareSchema } from "@/lib/seo";
import { PricingPage } from "./precios";

export const Route = createFileRoute("/en/pricing")({
  head: () => ({
    meta: buildSeo({
      path: "/en/pricing",
      title: "KAIRON Pro Pricing | G-Structure",
      description:
        "KAIRON Pro combines Filter, Workshop, Protocol, Daily Activator, Night Mode and voice with Kai into one cognitive execution system.",
      locale: "en_US",
    }),
    links: canonicalLink("/en/pricing"),
    scripts: [
      jsonLdScript(breadcrumbSchema([
        { name: "Home", path: "/en" },
        { name: "Pricing", path: "/en/pricing" },
      ])),
      jsonLdScript(gStructSoftwareSchema("en")),
    ],
  }),
  component: () => <PricingPage locale="en" />,
});
