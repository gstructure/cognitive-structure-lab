import { createFileRoute } from "@tanstack/react-router";
import { buildSeo, canonicalLink, jsonLdScript, faqSchema, breadcrumbSchema } from "@/lib/seo";
import gStructHomePreview from "@/assets/g-struct-home-preview.webp";
import { Index } from "./index";

const HOME_FAQ_EN = [
  { q: "What is G-Structure?", a: "A tech startup building G-Struct: a cognitive-behavioral execution platform powered by the I-R-O™ Method." },
  { q: "Does G-Structure offer therapy?", a: "No. G-Structure is cognitive-behavioral coaching applied to professional execution. It does not replace clinical care or psychotherapy." },
  { q: "What is the I-R-O™ Method?", a: "Identify, Reframe, and Optimize: the proprietary framework that powers G-Struct and turns cognitive-behavioral friction into functional action." },
  { q: "What is G-Struct?", a: "G-Structure's main product: an app in development to diagnose execution patterns, reframe them, and sustain concrete action before its Q3 2026 launch." },
];

export const Route = createFileRoute("/en/")({
  head: () => ({
    meta: buildSeo({
      path: "/en",
      title: "G-Structure | G-Struct · I-R-O™ Method · Professional execution startup",
      description:
        "G-Structure is a tech startup building G-Struct, a cognitive-behavioral execution platform powered by the I-R-O™ Method. 1:1, Enterprise, and workshops are validation channels.",
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
