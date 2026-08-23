import { createFileRoute } from "@tanstack/react-router";
import { buildSeo, breadcrumbSchema, faqSchema, canonicalLink, jsonLdScript } from "@/lib/seo";
import { KaironVsNotionPage, VS_NOTION_COPY } from "@/components/pages/KaironVsNotionPage";

export const Route = createFileRoute("/kairon_/vs/notion")({
  head: () => ({
    meta: buildSeo({
      path: "/kairon/vs/notion",
      title: "KAIRON vs Notion — cuál necesitas si planificas bien pero no ejecutas | G-Structure",
      description:
        "Comparación honesta entre KAIRON y las herramientas de organización como Notion, ClickUp o Todoist. Qué resuelve cada una, cuándo elegir cuál, y por qué no compiten.",
    }),
    links: canonicalLink("/kairon/vs/notion"),
    scripts: [
      jsonLdScript(
        breadcrumbSchema([
          { name: "KAIRON", path: "/kairon" },
          { name: "KAIRON vs Notion", path: "/kairon/vs/notion" },
        ]),
      ),
      jsonLdScript(faqSchema(VS_NOTION_COPY.es.faq)),
    ],
  }),
  component: () => <KaironVsNotionPage locale="es" />,
});
