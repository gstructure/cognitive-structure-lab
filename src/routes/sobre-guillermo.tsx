import { createFileRoute } from "@tanstack/react-router";
import portrait from "@/assets/guillermo-suco.webp";
import { AboutGuillermoPage } from "@/components/pages/AboutGuillermoPage";
import { buildSeo, canonicalLink, jsonLdScript, personGuillermoSchema, breadcrumbSchema } from "@/lib/seo";

export const Route = createFileRoute("/sobre-guillermo")({
  head: () => ({
    meta: buildSeo({
      path: "/sobre-guillermo",
      title: "Nosotros | G-Structure · KAIRON",
      description:
        "Conoce al equipo fundador de G-Structure: Guillermo Suco y Nathanael Guy, construyendo KAIRON como MVP activo de coaching cognitivo para ejecución profesional.",
      image: portrait,
      type: "profile",
    }),
    links: canonicalLink("/sobre-guillermo"),
    scripts: [
      jsonLdScript(personGuillermoSchema),
      jsonLdScript(breadcrumbSchema([
        { name: "Inicio", path: "/" },
        { name: "Nosotros", path: "/sobre-guillermo" },
      ])),
    ],
  }),
  component: () => <AboutGuillermoPage locale="es" />,
});
