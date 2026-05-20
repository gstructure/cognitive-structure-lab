import { createFileRoute } from "@tanstack/react-router";
import { NewsletterPage } from "@/components/pages/NewsletterPage";
import { buildSeo, breadcrumbSchema, jsonLdScript, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/newsletter")({
  head: () => ({
    meta: buildSeo({
      path: "/newsletter",
      title: "Newsletter | G-Structure",
      description:
        "Suscribete a las notas de G-Structure: articulos, updates de G-Struct y ensayos sobre el Metodo I-R-O.",
    }),
    links: [
      { rel: "canonical", href: `${SITE_URL}/newsletter` },
      { rel: "alternate", hrefLang: "es", href: `${SITE_URL}/newsletter` },
      { rel: "alternate", hrefLang: "es-EC", href: `${SITE_URL}/newsletter` },
      { rel: "alternate", hrefLang: "en", href: `${SITE_URL}/en/newsletter` },
      { rel: "alternate", hrefLang: "x-default", href: `${SITE_URL}/newsletter` },
    ],
    scripts: [jsonLdScript(breadcrumbSchema([{ name: "Newsletter", path: "/newsletter" }]))],
  }),
  component: () => <NewsletterPage locale="es" />,
});
