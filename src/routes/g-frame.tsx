import { createFileRoute } from "@tanstack/react-router";
import { buildSeo, canonicalLink, jsonLdScript, breadcrumbSchema, gStructSoftwareSchema } from "@/lib/seo";
import kaironLogo from "@/assets/kairon-logo.webp";
import { GStructPage } from "@/components/pages/GStructPage";

export const Route = createFileRoute("/g-frame")({
  head: () => ({
    meta: buildSeo({
      path: "/g-frame",
      title: "KAIRON | Cognitive OS para convertir fricción mental en ejecución",
      description:
        "KAIRON es el Cognitive OS de G-Structure: una plataforma guiada por Kai para identificar patrones que bloquean la acción, reencuadrarlos y convertirlos en acciones validadas de 5 minutos.",
      image: kaironLogo,
    }),
    links: canonicalLink("/g-frame"),
    scripts: [
      jsonLdScript(breadcrumbSchema([
        { name: "Inicio", path: "/" },
        { name: "KAIRON", path: "/g-frame" },
      ])),
      jsonLdScript(gStructSoftwareSchema("es")),
    ],
  }),
  component: () => <GStructPage locale="es" />,
});
