import { createFileRoute } from "@tanstack/react-router";
import { SupportLaunchSection } from "@/components/site/SupportLaunchSection";
import { buildSeo, breadcrumbSchema, canonicalLink, jsonLdScript } from "@/lib/seo";

export const Route = createFileRoute("/en/support-the-launch")({
  head: () => ({
    meta: buildSeo({
      path: "/en/support-the-launch",
      title: "Support the Launch | G-Structure",
      description:
        "Support the early validation, operation, and commercial development of KAIRON, G-Structure's main product, now that the MVP is live.",
      locale: "en_US",
    }),
    links: canonicalLink("/en/support-the-launch"),
    scripts: [
      jsonLdScript(
        breadcrumbSchema([
          { name: "Home", path: "/en" },
          { name: "Support the Launch", path: "/en/support-the-launch" },
        ]),
      ),
    ],
  }),
  component: SupportLaunchPage,
});

function SupportLaunchPage() {
  return <SupportLaunchSection />;
}
