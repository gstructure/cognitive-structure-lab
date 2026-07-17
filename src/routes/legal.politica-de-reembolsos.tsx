import { createFileRoute } from "@tanstack/react-router";
import { LegalDocumentPage } from "@/components/pages/LegalDocumentPage";
import { refundsEs } from "@/lib/legalDocuments";
import { buildSeo, breadcrumbSchema, canonicalLink, jsonLdScript } from "@/lib/seo";

export const Route = createFileRoute("/legal/politica-de-reembolsos")({
  head: () => ({
    meta: buildSeo({
      path: "/legal/politica-de-reembolsos",
      title: "Política de Reembolsos de KAIRON | G-Structure",
      description:
        "Política de Reembolsos y Cancelaciones de KAIRON, producto de SUCOSTRUCT S.A.S. B.I.C.",
    }),
    links: canonicalLink("/legal/politica-de-reembolsos"),
    scripts: [
      jsonLdScript(
        breadcrumbSchema([
          { name: "Inicio", path: "/" },
          { name: "Política de Reembolsos", path: "/legal/politica-de-reembolsos" },
        ]),
      ),
    ],
  }),
  component: () => <LegalDocumentPage document={refundsEs} />,
});
