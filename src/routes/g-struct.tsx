import { createFileRoute } from "@tanstack/react-router";
import { buildSeo, canonicalLink, jsonLdScript, breadcrumbSchema, gStructSoftwareSchema } from "@/lib/seo";
import gStructHomePreview from "@/assets/g-struct-home-preview.png";
import { GStructPage } from "@/components/pages/GStructPage";

export const Route = createFileRoute("/g-struct")({
  head: () => ({
    meta: buildSeo({
      path: "/g-struct",
      title: "G-Struct | Plataforma de ejecución impulsada por el método I-R-O™",
      description:
        "G-Struct es la app móvil de G-Structure que aplica el método I-R-O™ para identificar la fricción que bloquea tu ejecución, reencuadrarla y optimizar tu acción. Lanzamiento Q3 2026.",
      image: gStructHomePreview,
    }),
    links: canonicalLink("/g-struct"),
    scripts: [
      jsonLdScript(breadcrumbSchema([
        { name: "Inicio", path: "/" },
        { name: "G-Struct", path: "/g-struct" },
      ])),
      jsonLdScript(gStructSoftwareSchema("es")),
    ],
  }),
  component: () => <GStructPage locale="es" />,
});
