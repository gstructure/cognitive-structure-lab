import { createFileRoute } from "@tanstack/react-router";
import { buildSeo, breadcrumbSchema, faqSchema, canonicalLink, jsonLdScript } from "@/lib/seo";
import { KaironVsGenerativeAIPage, VS_AI_COPY } from "@/components/pages/KaironVsGenerativeAIPage";

const c = VS_AI_COPY.es;

export const Route = createFileRoute("/vs-ia-generativa")({
  head: () => ({
    meta: buildSeo({
      path: "/vs-ia-generativa",
      title: "¿Por qué no simplemente usar ChatGPT? — KAIRON vs IA generativa | G-Structure",
      description:
        "Una IA generalista conversa. KAIRON interviene sobre un proceso específico: identifica la fricción cognitiva, cuestiona la interpretación que la sostiene y termina en una acción concreta.",
    }),
    links: canonicalLink("/vs-ia-generativa"),
    scripts: [
      jsonLdScript(
        breadcrumbSchema([
          { name: "KAIRON", path: "/kairon" },
          { name: "KAIRON vs IA generativa", path: "/vs-ia-generativa" },
        ]),
      ),
      jsonLdScript(faqSchema([
        { q: "¿Por qué no simplemente usar ChatGPT?", a: c.heroSub },
        { q: c.b2bTitle, a: c.b2bSub },
      ])),
    ],
  }),
  component: () => <KaironVsGenerativeAIPage locale="es" />,
});
