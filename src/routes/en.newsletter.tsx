import { createFileRoute } from "@tanstack/react-router";
import { NewsletterPage } from "@/components/pages/NewsletterPage";
import { buildSeo, breadcrumbSchema, jsonLdScript, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/en/newsletter")({
  head: () => ({
    meta: buildSeo({
      path: "/en/newsletter",
      title: "Newsletter | G-Structure",
      description:
        "Subscribe to G-Structure notes: essays, G-Frame product updates, and writing on the I-R-O Method.",
      locale: "en_US",
    }),
    links: [
      { rel: "canonical", href: `${SITE_URL}/en/newsletter` },
      { rel: "alternate", hrefLang: "es", href: `${SITE_URL}/newsletter` },
      { rel: "alternate", hrefLang: "es-EC", href: `${SITE_URL}/newsletter` },
      { rel: "alternate", hrefLang: "en", href: `${SITE_URL}/en/newsletter` },
      { rel: "alternate", hrefLang: "x-default", href: `${SITE_URL}/newsletter` },
    ],
    scripts: [jsonLdScript(breadcrumbSchema([{ name: "Newsletter", path: "/en/newsletter" }]))],
  }),
  component: () => <NewsletterPage locale="en" />,
});
