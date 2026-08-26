import { createFileRoute } from "@tanstack/react-router";
import { buildSeo, breadcrumbSchema, faqSchema, canonicalLink, jsonLdScript } from "@/lib/seo";
import { KaironVsGenerativeAIPage, VS_AI_COPY } from "@/components/pages/KaironVsGenerativeAIPage";

const c = VS_AI_COPY.en;

export const Route = createFileRoute("/en/vs-generative-ai")({
  head: () => ({
    meta: buildSeo({
      path: "/en/vs-generative-ai",
      title: "Why not just use ChatGPT? — KAIRON vs generative AI | G-Structure",
      description:
        "General AI talks. KAIRON intervenes on a specific process: it identifies the cognitive friction, questions the interpretation holding it in place, and ends in one concrete action.",
      locale: "en_US",
    }),
    links: canonicalLink("/en/vs-generative-ai"),
    scripts: [
      jsonLdScript(
        breadcrumbSchema([
          { name: "KAIRON", path: "/en/kairon" },
          { name: "KAIRON vs generative AI", path: "/en/vs-generative-ai" },
        ]),
      ),
      jsonLdScript(faqSchema([
        { q: "Why not just use ChatGPT?", a: c.heroSub },
        { q: c.b2bTitle, a: c.b2bSub },
      ])),
    ],
  }),
  component: () => <KaironVsGenerativeAIPage locale="en" />,
});
