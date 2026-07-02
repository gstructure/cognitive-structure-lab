import { createFileRoute } from "@tanstack/react-router";
import { buildSeo, canonicalLink, jsonLdScript, faqSchema, breadcrumbSchema } from "@/lib/seo";
import kaironLogo from "@/assets/kairon-logo.webp";
import { Index } from "./index";

const HOME_FAQ_EN = [
  { q: "What is G-Structure?", a: "A tech startup building KAIRON: an AI cognitive coaching tool that helps professionals process the mental friction blocking execution." },
  { q: "Does G-Structure offer therapy?", a: "No. KAIRON is not therapy, does not diagnose, and does not replace psychological, medical, or psychiatric care. It is structured cognitive coaching for professional execution." },
  { q: "What is the I-R-O™ Method?", a: "Identify, Reframe, and Optimize: the proprietary framework that powers KAIRON and turns cognitive-behavioral friction into functional action." },
  { q: "What is KAIRON?", a: "G-Structure's main product: a live MVP guided by Kai to separate situation, emotion, and interpretation, reach a more precise reading, and turn it into a concrete action in under 12 minutes." },
];

export const Route = createFileRoute("/en/")({
  head: () => ({
    meta: buildSeo({
      path: "/en",
      title: "G-Structure | KAIRON · AI cognitive coaching for execution",
      description:
        "G-Structure is a tech startup building KAIRON, an AI cognitive coaching tool guided by Kai to process thoughts, emotions, and interpretations that block execution in real time.",
      image: kaironLogo,
      locale: "en_US",
    }),
    links: canonicalLink("/en"),
    scripts: [
      jsonLdScript(faqSchema(HOME_FAQ_EN)),
      jsonLdScript(breadcrumbSchema([{ name: "Home", path: "/en" }])),
    ],
  }),
  component: Index,
});
