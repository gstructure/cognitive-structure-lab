import { createFileRoute } from "@tanstack/react-router";
import { LegalDocumentPage } from "@/components/pages/LegalDocumentPage";
import { termsEn } from "@/lib/legalDocuments";
import { buildSeo, breadcrumbSchema, canonicalLink, jsonLdScript } from "@/lib/seo";

export const Route = createFileRoute("/en/legal/terms-and-conditions")({
  head: () => ({
    meta: buildSeo({
      path: "/en/legal/terms-and-conditions",
      title: "KAIRON Terms and Conditions of Use | G-Structure",
      description:
        "Terms and Conditions of Use for KAIRON, a product of SUCOSTRUCT S.A.S. B.I.C., effective July 16, 2026.",
      locale: "en_US",
    }),
    links: canonicalLink("/en/legal/terms-and-conditions"),
    scripts: [
      jsonLdScript(
        breadcrumbSchema([
          { name: "Home", path: "/en" },
          { name: "Terms and Conditions", path: "/en/legal/terms-and-conditions" },
        ]),
      ),
    ],
  }),
  component: () => <LegalDocumentPage document={termsEn} />,
});
