import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/components/pages/ContactPage";
import { buildSeo, canonicalLink, jsonLdScript, breadcrumbSchema } from "@/lib/seo";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: buildSeo({
      path: "/contacto",
      title: "Contacto | G-Structure",
      description:
        "Conversemos sobre tu contexto: diagnóstico, REESTRUCTURA 1:1, intervención Enterprise, alianzas o equipo. Email, WhatsApp y formulario directo con G-Structure.",
    }),
    links: canonicalLink("/contacto"),
    scripts: [
      jsonLdScript(breadcrumbSchema([
        { name: "Inicio", path: "/" },
        { name: "Contacto", path: "/contacto" },
      ])),
    ],
  }),
  component: () => <ContactPage locale="es" />,
});
