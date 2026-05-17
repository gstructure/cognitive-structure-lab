import { createFileRoute } from "@tanstack/react-router";
import { buildSeo, canonicalLink, jsonLdScript, breadcrumbSchema } from "@/lib/seo";
import gStructHomePreview from "@/assets/g-struct-home-preview.png";
import { GStructPage } from "@/components/pages/GStructPage";

export const Route = createFileRoute("/en/g-struct")({
  head: () => ({
    meta: buildSeo({
      path: "/en/g-struct",
      title: "G-Struct | The Cognitive-Behavioral OS for High-Performers",
      description:
        "G-Struct is the first mobile app applying CBT coaching methodology to identify the friction blocking your execution, reframe it, and optimize your action. Available in Ecuador and LATAM.",
      image: gStructHomePreview,
      locale: "en_US",
    }),
    links: canonicalLink("/en/g-struct"),
    scripts: [
      jsonLdScript(breadcrumbSchema([
        { name: "Home", path: "/en" },
        { name: "G-Struct", path: "/en/g-struct" },
      ])),
    ],
  }),
  component: () => <GStructPage locale="en" />,
});
