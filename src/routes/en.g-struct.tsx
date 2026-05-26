import { createFileRoute } from "@tanstack/react-router";
import { buildSeo, canonicalLink, jsonLdScript, breadcrumbSchema, gStructSoftwareSchema } from "@/lib/seo";
import mockupInicio from "@/assets/g-frame-mockups/01-inicio.webp";
import { GStructPage } from "@/components/pages/GStructPage";

export const Route = createFileRoute("/en/g-struct")({
  head: () => ({
    meta: buildSeo({
      path: "/en/g-struct",
      title: "G-Frame | Execution platform powered by the I-R-O™ Method",
      description:
        "G-Frame is G-Structure's mobile app applying the I-R-O™ Method to identify the friction blocking your execution, reframe it, and optimize your action. Launching Q3 2026.",
      image: mockupInicio,
      locale: "en_US",
    }),
    links: canonicalLink("/en/g-struct"),
    scripts: [
      jsonLdScript(breadcrumbSchema([
        { name: "Home", path: "/en" },
        { name: "G-Frame", path: "/en/g-struct" },
      ])),
      jsonLdScript(gStructSoftwareSchema("en")),
    ],
  }),
  component: () => <GStructPage locale="en" />,
});
