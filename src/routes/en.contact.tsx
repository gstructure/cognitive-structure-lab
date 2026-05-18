import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/components/pages/ContactPage";
import { buildSeo, canonicalLink, jsonLdScript, breadcrumbSchema } from "@/lib/seo";

export const Route = createFileRoute("/en/contact")({
  head: () => ({
    meta: buildSeo({
      path: "/en/contact",
      title: "Contact | G-Structure",
      description:
        "Let’s talk about your context: diagnostic, RESTRUCTURE 1:1, Enterprise intervention, partnerships, or team. Email, WhatsApp, and a direct form with G-Structure.",
      locale: "en_US",
    }),
    links: canonicalLink("/en/contact"),
    scripts: [
      jsonLdScript(breadcrumbSchema([
        { name: "Home", path: "/en" },
        { name: "Contact", path: "/en/contact" },
      ])),
    ],
  }),
  component: () => <ContactPage locale="en" />,
});
