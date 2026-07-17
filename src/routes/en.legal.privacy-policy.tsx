import { createFileRoute } from "@tanstack/react-router";
import { LegalDocumentPage } from "@/components/pages/LegalDocumentPage";
import { privacyEn } from "@/lib/legalDocuments";
import { buildSeo, breadcrumbSchema, canonicalLink, jsonLdScript } from "@/lib/seo";

export const Route = createFileRoute("/en/legal/privacy-policy")({
  head: () => ({
    meta: buildSeo({
      path: "/en/legal/privacy-policy",
      title: "KAIRON Privacy Policy | G-Structure",
      description:
        "Privacy and Personal Data Protection Policy for KAIRON, a product of SUCOSTRUCT S.A.S. B.I.C.",
      locale: "en_US",
    }),
    links: canonicalLink("/en/legal/privacy-policy"),
    scripts: [
      jsonLdScript(
        breadcrumbSchema([
          { name: "Home", path: "/en" },
          { name: "Privacy Policy", path: "/en/legal/privacy-policy" },
        ]),
      ),
    ],
  }),
  component: () => <LegalDocumentPage document={privacyEn} />,
});
