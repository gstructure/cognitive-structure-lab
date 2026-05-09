import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Eyebrow } from "@/components/site/Eyebrow";
import { CTALink } from "@/components/site/CTAButton";
import { Check } from "lucide-react";
import { buildSeo, canonicalLink, jsonLdScript, breadcrumbSchema } from "@/lib/seo";

export const Route = createFileRoute("/reestructura-1-1")({
  head: () => ({
    meta: buildSeo({
      path: "/reestructura-1-1",
      title: "REESTRUCTURA 1:1 | Coaching para Procrastinación y Ejecución",
      description:
        "Proceso individual de coaching cognitivo-conductual para profesionales y líderes que necesitan trabajar procrastinación, perfeccionismo, sobreanálisis y autosabotaje.",
    }),
    links: canonicalLink("/reestructura-1-1"),
    scripts: [
      jsonLdScript(breadcrumbSchema([
        { name: "Inicio", path: "/" },
        { name: "REESTRUCTURA 1:1", path: "/reestructura-1-1" },
      ])),
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-50" aria-hidden />
        <div className="container-x relative py-20 md:py-28 lg:py-36">
          <Eyebrow>REESTRUCTURA 1:1</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.05]">
            Trabaja tu propio patrón de ejecución, con método.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Un proceso individual de coaching cognitivo-conductual para profesionales, líderes y
            emprendedores que necesitan intervenir los patrones que bloquean su acción.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <CTALink to="/contacto" variant="primary">Agendar conversación inicial</CTALink>
            <CTALink to="/reestructura-1-1" hash="proceso" variant="outline">Ver el proceso</CTALink>
          </div>
        </div>
      </section>

      <Section tone="muted">
        <SectionHeader
          eyebrow="PARA QUIÉN"
          title="Para profesionales que ya saben qué deberían hacer, pero algo se interpone."
          subtitle="REESTRUCTURA 1:1 está diseñado para personas con alta carga de decisión que enfrentan procrastinación, perfeccionismo, sobreanálisis o autosabotaje en su práctica profesional."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="border border-border bg-[color:var(--color-surface)] p-7">
            <p className="eyebrow mb-4">Es para ti si</p>
            <ul className="space-y-3 text-sm text-foreground/85">
              {[
                "Postergas tareas críticas a pesar de tener claridad sobre su importancia.",
                "Tu nivel de exigencia se vuelve un obstáculo más que un estándar.",
                "Sientes que pensar más empieza a paralizarte.",
                "Tomas decisiones que contradicen lo que dices querer.",
                "Necesitas pasar de la intención a la conducta de forma sostenible.",
              ].map((i) => (
                <li key={i} className="flex gap-3"><Check size={16} className="mt-0.5 text-foreground shrink-0" /><span>{i}</span></li>
              ))}
            </ul>
          </div>
          <div className="border border-border bg-[color:var(--color-surface)] p-7">
            <p className="eyebrow mb-4">No es para ti si</p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>Buscas charlas motivacionales o frases de autoayuda.</li>
              <li>Esperas resultados sin trabajo metodológico.</li>
              <li>Necesitas atención clínica de salud mental: este es un proceso de coaching, no de terapia.</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section id="proceso" tone="deep">
        <div className="max-w-3xl">
          <p className="eyebrow text-[color:var(--color-background)]/70">EL PROCESO</p>
          <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.08]">
            Cuatro fases. Una secuencia clara.
          </h2>
          <p className="mt-5 text-base md:text-lg text-[color:var(--color-background)]/75 leading-relaxed">
            Identificar. Reencuadrar. Optimizar. Sostener. Aplicado a tu caso, en sesiones individuales con trabajo aplicado entre encuentros.
          </p>
        </div>
        <div className="mt-12 grid gap-px bg-[color:var(--color-background)]/15 md:grid-cols-2 lg:grid-cols-4 border border-[color:var(--color-background)]/15">
          {[
            { n: "01", t: "Diagnóstico personal", d: "Mapeamos los patrones cognitivo-conductuales que están interfiriendo con tu ejecución actual." },
            { n: "02", t: "Reencuadre estructurado", d: "Aplicamos herramientas CBT para reorganizar interpretaciones, creencias rígidas y respuestas automáticas." },
            { n: "03", t: "Acción optimizada", d: "Diseñamos rutinas, decisiones y conductas concretas que sostengan el cambio en tu día a día profesional." },
            { n: "04", t: "Consolidación", d: "Cerramos con un plan de continuidad y métricas para sostener el cambio más allá del proceso." },
          ].map((s) => (
            <div key={s.n} className="relative bg-[color:var(--color-brand-deep)] p-8 transition-colors hover:bg-[color:var(--color-brand)]">
              <span className="absolute left-0 top-0 h-px w-10 bg-[color:var(--color-background)]" aria-hidden />
              <span className="font-display text-[10px] font-semibold tracking-[0.22em] text-[color:var(--color-background)]/60">
                {s.n} — FASE
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold">{s.t}</h3>
              <p className="mt-4 text-sm text-[color:var(--color-background)]/75 leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeader
              eyebrow="QUÉ INCLUYE"
              title="Un proceso breve, estructurado y profundamente personal."
              subtitle="REESTRUCTURA 1:1 combina sesiones individuales con trabajo aplicado entre sesiones para que el cambio se traduzca en conducta real."
            />
            <div className="mt-8">
              <CTALink to="/contacto">Conversar antes de empezar</CTALink>
            </div>
          </div>
          <div className="lg:col-span-6 border border-border bg-[color:var(--color-surface)] p-8">
            <ul className="space-y-3.5 text-sm text-foreground/85">
              {[
                "Sesiones individuales de coaching cognitivo-conductual.",
                "Diagnóstico inicial de patrones de ejecución.",
                "Material de trabajo entre sesiones.",
                "Ejercicios CBT estructurados según tu contexto.",
                "Plan de optimización conductual al cierre.",
                "Opción de continuidad o seguimiento posterior.",
              ].map((i) => (
                <li key={i} className="flex gap-3"><Check size={16} className="mt-0.5 text-foreground shrink-0" /><span>{i}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}
