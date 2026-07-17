import { createFileRoute } from "@tanstack/react-router";
import { LegalDocumentPage } from "@/components/pages/LegalDocumentPage";
import { privacyEs } from "@/lib/legalDocuments";
import { buildSeo, breadcrumbSchema, canonicalLink, jsonLdScript } from "@/lib/seo";

export const Route = createFileRoute("/legal/politica-de-privacidad")({
  head: () => ({
    meta: buildSeo({
      path: "/legal/politica-de-privacidad",
      title: "Política de Privacidad de KAIRON | G-Structure",
      description:
        "Política de Privacidad y Protección de Datos Personales de KAIRON, producto de SUCOSTRUCT S.A.S. B.I.C.",
    }),
    links: canonicalLink("/legal/politica-de-privacidad"),
    scripts: [
      jsonLdScript(
        breadcrumbSchema([
          { name: "Inicio", path: "/" },
          { name: "Política de Privacidad", path: "/legal/politica-de-privacidad" },
        ]),
      ),
    ],
  }),
  component: () => <LegalDocumentPage document={privacyEs} />,
});
