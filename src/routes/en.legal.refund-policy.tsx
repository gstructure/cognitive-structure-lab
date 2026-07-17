import { createFileRoute } from "@tanstack/react-router";
import { LegalDocumentPage } from "@/components/pages/LegalDocumentPage";
import { refundsEn } from "@/lib/legalDocuments";
import { buildSeo, breadcrumbSchema, canonicalLink, jsonLdScript } from "@/lib/seo";

export const Route = createFileRoute("/en/legal/refund-policy")({
  head: () => ({
    meta: buildSeo({
      path: "/en/legal/refund-policy",
      title: "KAIRON Refund Policy | G-Structure",
      description:
        "Refunds and Cancellations Policy for KAIRON, a product of SUCOSTRUCT S.A.S. B.I.C.",
      locale: "en_US",
    }),
    links: canonicalLink("/en/legal/refund-policy"),
    scripts: [
      jsonLdScript(
        breadcrumbSchema([
          { name: "Home", path: "/en" },
          { name: "Refund Policy", path: "/en/legal/refund-policy" },
        ]),
      ),
    ],
  }),
  component: () => <LegalDocumentPage document={refundsEn} />,
});
