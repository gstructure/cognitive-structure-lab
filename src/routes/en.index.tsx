import { createFileRoute } from "@tanstack/react-router";
import { buildSeo, canonicalLink, jsonLdScript, faqSchema, breadcrumbSchema } from "@/lib/seo";
import kaironLogo from "@/assets/kairon-logo.webp";
import { HomePage } from "@/components/pages/HomePage";

const HOME_FAQ_EN = [
  { q: "What is G-Structure?", a: "A tech startup building KAIRON: an AI cognitive coaching tool that helps professionals process the mental friction blocking execution." },
  { q: "How does KAIRON help users execute?", a: "Kai guides users to separate situation, emotion, and interpretation, then turn that reading into a concrete next action." },
  { q: "What is the I-R-O™ Method?", a: "Identify, Reframe, and Optimize: the proprietary framework that powers KAIRON and turns cognitive-behavioral friction into functional action." },
  { q: "What is KAIRON?", a: "G-Structure's main product: a live MVP guided by Kai to separate situation, emotion, and interpretation, reach a more precise reading, and turn it into a concrete action in under 12 minutes." },
];

export const Route = createFileRoute("/en/")({
  head: () => ({
    meta: buildSeo({
      path: "/en",
      title: "G-Structure · KAIRON — Your AI keeps agreeing with you. Kai won't.",
      description:
        "KAIRON catches the thought that is stalling your execution, takes it apart, and hands you back a 5-minute action. AI cognitive coaching from G-Structure.",
      image: kaironLogo,
      locale: "en_US",
    }),
    links: canonicalLink("/en"),
    scripts: [
      jsonLdScript(faqSchema(HOME_FAQ_EN)),
      jsonLdScript(breadcrumbSchema([{ name: "Home", path: "/en" }])),
    ],
  }),
  component: () => <HomePage locale="en" />,
});
