import { createFileRoute } from "@tanstack/react-router";
import portrait from "@/assets/guillermo-suco.webp";
import { AboutGuillermoPage } from "@/components/pages/AboutGuillermoPage";
import { buildSeo, canonicalLink, jsonLdScript, personGuillermoSchema, breadcrumbSchema } from "@/lib/seo";

export const Route = createFileRoute("/en/about-guillermo")({
  head: () => ({
    meta: buildSeo({
      path: "/en/about-guillermo",
      title: "About | G-Structure · KAIRON",
      description:
        "Meet G-Structure's founding team: Guillermo Suco and Nathanael Guy, building KAIRON as a live MVP for cognitive execution coaching.",
      image: portrait,
      type: "profile",
      locale: "en_US",
    }),
    links: canonicalLink("/en/about-guillermo"),
    scripts: [
      jsonLdScript(personGuillermoSchema),
      jsonLdScript(breadcrumbSchema([
        { name: "Home", path: "/en" },
        { name: "About", path: "/en/about-guillermo" },
      ])),
    ],
  }),
  component: () => <AboutGuillermoPage locale="en" />,
});
