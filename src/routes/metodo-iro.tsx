import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { SectionHeader } from "@/components/site/SectionHeader";
import { MethodTabs } from "@/components/site/MethodTabs";
import { buildSeo, breadcrumbSchema, canonicalLink, jsonLdScript } from "@/lib/seo";
import logoCube from "@/assets/g-structure-cube.webp";

export const Route = createFileRoute("/metodo-iro")({
  head: () => ({
    meta: buildSeo({
      path: "/metodo-iro",
      title: "Método I-R-O™ | G-Structure",
      description:
        "I-R-O™ es el método propietario que impulsa G-Frame: Identificar, Reencuadrar y Optimizar la fricción cognitivo-conductual antes de ejecutar.",
    }),
    links: canonicalLink("/metodo-iro"),
    scripts: [jsonLdScript(breadcrumbSchema([{ name: "Método I-R-O™", path: "/metodo-iro" }]))],
  }),
  component: () => <IroMethodPage locale="es" />,
});

export function IroMethodPage({ locale }: { locale: "es" | "en" }) {
  const copy = locale === "en"
    ? {
        eyebrow: "THE PROPRIETARY METHOD",
        title: "I-R-O™: Identify. Reframe. Optimize.",
        subtitle:
          "The framework behind G-Frame: a structured sequence for turning cognitive-behavioral friction into functional action.",
        note:
          "I-R-O™ is based on cognitive-behavioral principles adapted to professional execution contexts. It is not therapy and does not replace clinical care.",
      }
    : {
        eyebrow: "EL MÉTODO PROPIETARIO",
        title: "I-R-O™: Identificar. Reencuadrar. Optimizar.",
        subtitle:
          "El framework que impulsa G-Frame: una secuencia estructurada para convertir fricción cognitivo-conductual en acción funcional.",
        note:
          "I-R-O™ está basado en principios cognitivo-conductuales adaptados a contextos de ejecución profesional. No constituye terapia ni sustituye atención clínica.",
      };

  return (
    <Section tone="deep" className="relative overflow-hidden">
      <div className="absolute inset-0 dot-bg-inverse opacity-[0.07] pointer-events-none" aria-hidden />
      <img
        src={logoCube}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-20 -bottom-20 h-[420px] w-[420px] opacity-[0.05] invert brightness-200 select-none"
      />
      <div className="relative">
        <SectionHeader eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />
        <MethodTabs />
        <p className="mt-10 max-w-3xl text-xs md:text-[13px] text-[color:var(--color-background)]/60 leading-relaxed">
          {copy.note}
        </p>
      </div>
    </Section>
  );
}
