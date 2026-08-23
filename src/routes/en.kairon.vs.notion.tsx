import { createFileRoute } from "@tanstack/react-router";
import { buildSeo, breadcrumbSchema, faqSchema, canonicalLink, jsonLdScript } from "@/lib/seo";
import { KaironVsNotionPage, VS_NOTION_COPY } from "@/components/pages/KaironVsNotionPage";

export const Route = createFileRoute("/en/kairon/vs/notion")({
  head: () => ({
    meta: buildSeo({
      path: "/en/kairon/vs/notion",
      title: "KAIRON vs Notion — which one you need if you plan well but don't execute | G-Structure",
      description:
        "An honest comparison between KAIRON and organization tools like Notion, ClickUp, or Todoist. What each one solves, when to choose which, and why they don't compete.",
      locale: "en_US",
    }),
    links: canonicalLink("/en/kairon/vs/notion"),
    scripts: [
      jsonLdScript(
        breadcrumbSchema([
          { name: "KAIRON", path: "/en/kairon" },
          { name: "KAIRON vs Notion", path: "/en/kairon/vs/notion" },
        ]),
      ),
      jsonLdScript(faqSchema(VS_NOTION_COPY.en.faq)),
    ],
  }),
  component: () => <KaironVsNotionPage locale="en" />,
});
