import { createFileRoute } from "@tanstack/react-router";
import { SupportLaunchSection } from "@/components/site/SupportLaunchSection";
import { buildSeo, breadcrumbSchema, canonicalLink, jsonLdScript } from "@/lib/seo";

export const Route = createFileRoute("/apoya-el-lanzamiento")({
  head: () => ({
    meta: buildSeo({
      path: "/apoya-el-lanzamiento",
      title: "Apoya el lanzamiento | G-Structure",
      description:
        "Apoya la etapa temprana de validación y desarrollo de G-Struct, el producto principal de G-Structure, antes de su lanzamiento y camino hacia MVP.",
    }),
    links: canonicalLink("/apoya-el-lanzamiento"),
    scripts: [
      jsonLdScript(
        breadcrumbSchema([
          { name: "Inicio", path: "/" },
          { name: "Apoya el lanzamiento", path: "/apoya-el-lanzamiento" },
        ]),
      ),
    ],
  }),
  component: SupportLaunchPage,
});

function SupportLaunchPage() {
  return <SupportLaunchSection />;
}
