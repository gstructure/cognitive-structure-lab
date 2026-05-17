import { createFileRoute } from "@tanstack/react-router";
import { buildSeo, canonicalLink, jsonLdScript, faqSchema, breadcrumbSchema } from "@/lib/seo";
import gStructHomePreview from "@/assets/g-struct-home-preview.png";
import { Index } from "./index";

const HOME_FAQ_EN = [
  { q: "What is G-Structure?", a: "A cognitive-behavioral coaching practice applied to execution, for leaders, professionals, and teams who need to move past procrastination, perfectionism, overthinking, and self-sabotage." },
  { q: "Does G-Structure offer therapy?", a: "No. G-Structure is cognitive-behavioral coaching applied to professional execution. It does not replace clinical care or psychotherapy." },
  { q: "What is the I-R-O method?", a: "Identify, Reframe, and Optimize: a sequence to surface patterns that block action, reformulate them, and translate them into sustained functional behavior." },
  { q: "What is G-Struct?", a: "The technological layer of the G-Structure method: a digital tool in development for logging patterns, structuring exercises, and sustaining practice between sessions." },
];

export const Route = createFileRoute("/en/")({
  head: () => ({
    meta: buildSeo({
      path: "/en",
      title: "G-Structure | Cognitive-Behavioral Coaching for Execution · G-Struct App · I-R-O Method",
      description:
        "G-Structure applies CBT coaching to remove the friction that blocks execution for leaders, founders, and teams in Ecuador and LATAM. G-Struct is the digital product. Enterprise is the team solution.",
      image: gStructHomePreview,
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
