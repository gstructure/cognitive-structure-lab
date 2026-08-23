import { createFileRoute } from "@tanstack/react-router";
import { KaironForTeamsPage } from "@/components/pages/KaironForTeamsPage";
import { buildSeo, canonicalLink, jsonLdScript, breadcrumbSchema } from "@/lib/seo";

export const Route = createFileRoute("/teams")({
  head: () => ({
    meta: buildSeo({
      path: "/teams",
      title: "KAIRON for Teams — Coaching cognitivo con IA para equipos | G-Structure",
      description:
        "KAIRON ayuda a identificar y trabajar bloqueos como procrastinación, perfeccionismo, autosabotaje y síndrome del impostor. Corporate Pilot para talento humano, people & culture y desarrollo organizacional.",
    }),
    links: canonicalLink("/teams"),
    scripts: [
      jsonLdScript(breadcrumbSchema([
        { name: "Inicio", path: "/" },
        { name: "KAIRON for Teams", path: "/teams" },
      ])),
    ],
  }),
  component: () => <KaironForTeamsPage />,
});
