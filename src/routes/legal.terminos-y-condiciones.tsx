import { createFileRoute } from "@tanstack/react-router";
import { LegalDocumentPage } from "@/components/pages/LegalDocumentPage";
import { termsEs } from "@/lib/legalDocuments";
import { buildSeo, breadcrumbSchema, canonicalLink, jsonLdScript } from "@/lib/seo";

export const Route = createFileRoute("/legal/terminos-y-condiciones")({
  head: () => ({
    meta: buildSeo({
      path: "/legal/terminos-y-condiciones",
      title: "Términos y Condiciones de Uso de KAIRON | G-Structure",
      description:
        "Términos y Condiciones de Uso de KAIRON, producto de SUCOSTRUCT S.A.S. B.I.C., con vigencia desde el 16 de julio de 2026.",
    }),
    links: canonicalLink("/legal/terminos-y-condiciones"),
    scripts: [
      jsonLdScript(
        breadcrumbSchema([
          { name: "Inicio", path: "/" },
          { name: "Términos y Condiciones", path: "/legal/terminos-y-condiciones" },
        ]),
      ),
    ],
  }),
  component: () => <LegalDocumentPage document={termsEs} />,
});
