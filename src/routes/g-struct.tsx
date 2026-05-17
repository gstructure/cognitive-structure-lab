import { createFileRoute } from "@tanstack/react-router";
import { buildSeo, canonicalLink, jsonLdScript, breadcrumbSchema } from "@/lib/seo";
import gStructHomePreview from "@/assets/g-struct-home-preview.png";
import { GStructPage } from "@/components/pages/GStructPage";

export const Route = createFileRoute("/g-struct")({
  head: () => ({
    meta: buildSeo({
      path: "/g-struct",
      title: "G-Struct | El OS Cognitivo-Conductual para High-Performers",
      description:
        "G-Struct es la primera app móvil que aplica metodología CBT coaching para identificar la fricción que bloquea tu ejecución, reencuadrarla y optimizar tu acción. Disponible en Ecuador y LATAM.",
      image: gStructHomePreview,
    }),
    links: canonicalLink("/g-struct"),
    scripts: [
      jsonLdScript(breadcrumbSchema([
        { name: "Inicio", path: "/" },
        { name: "G-Struct", path: "/g-struct" },
      ])),
    ],
  }),
  component: () => <GStructPage locale="es" />,
});
