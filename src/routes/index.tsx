import { createFileRoute } from "@tanstack/react-router";
import { buildSeo, canonicalLink, jsonLdScript, faqSchema, breadcrumbSchema, organizationSchema, websiteSchema } from "@/lib/seo";
import gFrameLogo from "@/assets/kairon-logo.webp";
import { HomePage } from "@/components/pages/HomePage";

const HOME_FAQ = [
  { q: "¿Qué es G-Structure?", a: "Una tech startup construyendo KAIRON: una herramienta de coaching cognitivo con IA para ayudar a profesionales a procesar la fricción mental que bloquea su ejecución." },
  { q: "¿Cómo ayuda KAIRON a ejecutar?", a: "Kai guía al usuario para separar situación, emoción e interpretación, y convertir esa lectura en una siguiente acción concreta." },
  { q: "¿Qué es el método I-R-O™?", a: "Identificar, Reestructurar y Optimizar: el framework propietario que impulsa KAIRON y convierte fricción cognitivo-conductual en acción funcional." },
  { q: "¿Qué es KAIRON?", a: "El producto principal de G-Structure: un MVP activo guiado por Kai para separar situación, emoción e interpretación, llegar a una lectura más precisa y convertirla en una acción concreta en menos de 12 minutos." },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: buildSeo({
      path: "/",
      title: "G-Structure · KAIRON — Tu IA te está dando la razón. Kai no.",
      description:
        "KAIRON detecta el pensamiento que está frenando tu ejecución, lo desarma y te devuelve una acción de 5 minutos. Coaching cognitivo con IA de G-Structure.",
      image: gFrameLogo,
    }),
    links: canonicalLink("/"),
    scripts: [
      jsonLdScript(organizationSchema),
      jsonLdScript(websiteSchema),
      jsonLdScript(faqSchema(HOME_FAQ)),
      jsonLdScript(breadcrumbSchema([{ name: "Inicio", path: "/" }])),
    ],
  }),
  component: () => <HomePage locale="es" />,
});
