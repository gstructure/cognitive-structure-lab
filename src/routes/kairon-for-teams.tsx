import { createFileRoute } from "@tanstack/react-router";
import { KaironForTeamsPage } from "@/components/pages/KaironForTeamsPage";
import { buildSeo, canonicalLink, jsonLdScript, breadcrumbSchema } from "@/lib/seo";

export const Route = createFileRoute("/kairon-for-teams")({
  head: () => ({
    meta: buildSeo({
      path: "/kairon-for-teams",
      title: "KAIRON for Teams — Coaching cognitivo con IA para equipos | G-Structure",
      description:
        "KAIRON ayuda a identificar y trabajar bloqueos como procrastinación, perfeccionismo, autosabotaje y síndrome del impostor. Corporate Pilot para talento humano, people & culture y desarrollo organizacional.",
    }),
    links: canonicalLink("/kairon-for-teams"),
    scripts: [
      jsonLdScript(breadcrumbSchema([
        { name: "Inicio", path: "/" },
        { name: "KAIRON for Teams", path: "/kairon-for-teams" },
      ])),
    ],
  }),
  component: () => <KaironForTeamsPage />,
});
