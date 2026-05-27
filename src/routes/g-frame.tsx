import { createFileRoute } from "@tanstack/react-router";
import { buildSeo, canonicalLink, jsonLdScript, breadcrumbSchema, gStructSoftwareSchema } from "@/lib/seo";
import mockupInicio from "@/assets/g-frame-mockups/01-inicio.webp";
import { GStructPage } from "@/components/pages/GStructPage";

export const Route = createFileRoute("/g-frame")({
  head: () => ({
    meta: buildSeo({
      path: "/g-frame",
      title: "G-Frame | Plataforma de ejecución impulsada por el método I-R-O™",
      description:
        "G-Frame es la app móvil de G-Structure que aplica el método I-R-O™ para identificar la fricción que bloquea tu ejecución, reencuadrarla y optimizar tu acción. Lanzamiento Q3 2026.",
      image: mockupInicio,
    }),
    links: canonicalLink("/g-frame"),
    scripts: [
      jsonLdScript(breadcrumbSchema([
        { name: "Inicio", path: "/" },
        { name: "G-Frame", path: "/g-frame" },
      ])),
      jsonLdScript(gStructSoftwareSchema("es")),
    ],
  }),
  component: () => <GStructPage locale="es" />,
});
