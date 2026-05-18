import { createFileRoute } from "@tanstack/react-router";
import portrait from "@/assets/guillermo-suco.webp";
import { AboutGuillermoPage } from "@/components/pages/AboutGuillermoPage";
import { buildSeo, canonicalLink, jsonLdScript, personGuillermoSchema, breadcrumbSchema } from "@/lib/seo";

export const Route = createFileRoute("/en/about-guillermo")({
  head: () => ({
    meta: buildSeo({
      path: "/en/about-guillermo",
      title: "Guillermo Suco | Founder & CEO of G-Structure",
      description:
        "Guillermo Suco, Founder & CEO of G-Structure, creator of G-Struct and the I-R-O™ Method. CBT Coach Practitioner accredited by CTAA.",
      image: portrait,
      type: "profile",
      locale: "en_US",
    }),
    links: canonicalLink("/en/about-guillermo"),
    scripts: [
      jsonLdScript(personGuillermoSchema),
      jsonLdScript(breadcrumbSchema([
        { name: "Home", path: "/en" },
        { name: "About Guillermo", path: "/en/about-guillermo" },
      ])),
    ],
  }),
  component: () => <AboutGuillermoPage locale="en" />,
});
