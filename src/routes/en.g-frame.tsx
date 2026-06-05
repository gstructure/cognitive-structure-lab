import { createFileRoute } from "@tanstack/react-router";
import { buildSeo, canonicalLink, jsonLdScript, breadcrumbSchema, gStructSoftwareSchema } from "@/lib/seo";
import kaironLogo from "@/assets/kairon-logo.webp";
import { GStructPage } from "@/components/pages/GStructPage";

export const Route = createFileRoute("/en/g-frame")({
  head: () => ({
    meta: buildSeo({
      path: "/en/g-frame",
      title: "KAIRON | Cognitive OS for turning mental friction into execution",
      description:
        "KAIRON is G-Structure's Cognitive OS: a Kai-guided platform to identify action-blocking patterns, reframe them, and turn insight into validated 5-minute actions.",
      image: kaironLogo,
      locale: "en_US",
    }),
    links: canonicalLink("/en/g-frame"),
    scripts: [
      jsonLdScript(breadcrumbSchema([
        { name: "Home", path: "/en" },
        { name: "KAIRON", path: "/en/g-frame" },
      ])),
      jsonLdScript(gStructSoftwareSchema("en")),
    ],
  }),
  component: () => <GStructPage locale="en" />,
});
