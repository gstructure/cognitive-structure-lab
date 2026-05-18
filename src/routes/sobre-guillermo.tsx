import { createFileRoute } from "@tanstack/react-router";
import portrait from "@/assets/guillermo-suco.webp";
import { AboutGuillermoPage } from "@/components/pages/AboutGuillermoPage";
import { buildSeo, canonicalLink, jsonLdScript, personGuillermoSchema, breadcrumbSchema } from "@/lib/seo";

export const Route = createFileRoute("/sobre-guillermo")({
  head: () => ({
    meta: buildSeo({
      path: "/sobre-guillermo",
      title: "Guillermo Suco | Fundador & CEO de G-Structure",
      description:
        "Guillermo Suco, Fundador & CEO de G-Structure, creador de G-Struct y del método I-R-O™. CBT Coach Practitioner acreditado por CTAA.",
      image: portrait,
      type: "profile",
    }),
    links: canonicalLink("/sobre-guillermo"),
    scripts: [
      jsonLdScript(personGuillermoSchema),
      jsonLdScript(breadcrumbSchema([
        { name: "Inicio", path: "/" },
        { name: "Sobre Guillermo", path: "/sobre-guillermo" },
      ])),
    ],
  }),
  component: () => <AboutGuillermoPage locale="es" />,
});
