import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Eyebrow } from "@/components/site/Eyebrow";
import { CTALink, CTAExternal } from "@/components/site/CTAButton";
import { Timeline } from "@/components/site/Timeline";
import { Check } from "lucide-react";

export const Route = createFileRoute("/enterprise")({
  head: () => ({
    meta: [
      { title: "G-Structure Enterprise | Coaching para Equipos y Ejecución" },
      {
        name: "description",
        content:
          "Diagnóstico y programas de coaching cognitivo-conductual para equipos que enfrentan procrastinación, sobreanálisis, perfeccionismo y bloqueos de ejecución.",
      },
      { property: "og:title", content: "G-Structure Enterprise" },
      {
        property: "og:description",
        content:
          "Workshops de diagnóstico, programas piloto y procesos de continuidad para equipos de alta exigencia.",
      },
    ],
  }),
  component: Enterprise,
});

function Enterprise() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-50" aria-hidden />
        <div className="container-x relative py-20 md:py-28 lg:py-36">
          <Eyebrow>G-STRUCTURE ENTERPRISE</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.05]">
            Cuando un equipo no ejecuta, el problema no siempre es la estrategia.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            G-Structure Enterprise ayuda a organizaciones, founders y equipos a identificar
            patrones cognitivo-conductuales que bloquean la ejecución y convertirlos en decisiones,
            acciones y seguimiento más claros.
          </p>
          <p className="mt-4 max-w-2xl text-sm md:text-base text-muted-foreground/90 leading-relaxed">
            Diseñamos workshops de diagnóstico, programas piloto y procesos de continuidad para
            equipos que necesitan actuar con mayor precisión, reducir fricción interna y sostener
            resultados.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <CTALink to="/contacto" variant="primary">Solicitar Workshop de Diagnóstico</CTALink>
            <CTALink to="/enterprise" hash="reestructura" variant="outline">
              Conocer REESTRUCTURA Enterprise
            </CTALink>
          </div>
        </div>
      </section>

      <Section tone="muted">
        <SectionHeader
          eyebrow="EL PROBLEMA"
          title="La fricción de ejecución también aparece en equipos."
          subtitle="Un equipo puede tener talento, objetivos y reuniones constantes, pero seguir atrapado en ciclos de postergación, sobreanálisis, perfeccionismo o decisiones que no se traducen en acción."
        />
        <div className="mt-12 grid gap-px bg-border md:grid-cols-3 border border-border">
          {[
            "Reuniones sin salida conductual",
            "Decisiones postergadas",
            "Perfeccionismo que retrasa entregables",
            "Sobreanálisis estratégico",
            "Falta de seguimiento",
            "Evitación de conversaciones difíciles",
          ].map((t) => (
            <div key={t} className="bg-[color:var(--color-surface)] p-6">
              <h3 className="font-display text-base font-semibold">{t}</h3>
            </div>
          ))}
        </div>
      </Section>

      <Section id="workshop">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeader
              eyebrow="DIAGNÓSTICO"
              title="Workshop de Diagnóstico de Ejecución"
              subtitle="Una sesión estratégica diseñada para identificar patrones que interfieren con la ejecución del equipo, mapear fricciones cognitivas y conductuales, y definir una ruta de intervención clara."
            />
            <div className="mt-8">
              <CTALink to="/contacto">Solicitar workshop</CTALink>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="border border-border bg-[color:var(--color-surface)] p-8">
              <p className="eyebrow mb-5">Incluye</p>
              <ul className="space-y-3.5">
                {[
                  "Lectura inicial del contexto.",
                  "Identificación de patrones de bloqueo.",
                  "Mapeo de fricciones de ejecución.",
                  "Discusión guiada con el equipo.",
                  "Recomendación de ruta de intervención.",
                  "Documento de cierre con hallazgos accionables.",
                ].map((i) => (
                  <li key={i} className="flex gap-3 text-sm text-foreground/85">
                    <Check size={16} className="mt-0.5 shrink-0 text-foreground" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section id="reestructura" tone="deep">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="eyebrow text-[color:var(--color-background)]/70">PROGRAMA PILOTO</p>
            <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.08]">
              REESTRUCTURA Enterprise — 4 semanas.
            </h2>
            <p className="mt-5 text-base md:text-lg text-[color:var(--color-background)]/80 leading-relaxed">
              Un programa breve y estructurado para intervenir patrones de procrastinación,
              perfeccionismo, sobreanálisis y autosabotaje en equipos. Cuatro semanas para mover el
              sistema operativo del equipo desde la fricción hacia la ejecución consistente.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="border border-[color:var(--color-background)]/20 p-8">
              <p className="eyebrow text-[color:var(--color-background)]/70 mb-5">Estructura</p>
              <ul className="space-y-4 text-sm text-[color:var(--color-background)]/85">
                <li><strong className="text-[color:var(--color-background)]">Semana 1.</strong> Diagnóstico y mapa de patrones del equipo.</li>
                <li><strong className="text-[color:var(--color-background)]">Semana 2.</strong> Reencuadre cognitivo y trabajo sobre creencias rígidas.</li>
                <li><strong className="text-[color:var(--color-background)]">Semana 3.</strong> Diseño conductual: rutinas, protocolos y decisiones.</li>
                <li><strong className="text-[color:var(--color-background)]">Semana 4.</strong> Consolidación, métricas y plan de continuidad.</li>
              </ul>
              <div className="mt-8">
                <CTALink to="/contacto" variant="inverse">Solicitar información</CTALink>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeader
              eyebrow="CONTINUIDAD"
              title="Continuidad Enterprise"
              subtitle="Seguimiento mensual o trimestral para consolidar avances, revisar patrones recurrentes y sostener cambios en la ejecución después de una intervención inicial."
            />
            <div className="mt-8">
              <CTALink to="/contacto">Diseñar continuidad</CTALink>
            </div>
          </div>
          <div className="lg:col-span-6 border border-border bg-[color:var(--color-surface)] p-8">
            <p className="eyebrow mb-5">Formatos</p>
            <ul className="space-y-3.5 text-sm text-foreground/85">
              <li className="flex gap-3"><Check size={16} className="mt-0.5 text-foreground shrink-0" /><span>Sesiones mensuales con líderes clave.</span></li>
              <li className="flex gap-3"><Check size={16} className="mt-0.5 text-foreground shrink-0" /><span>Revisión trimestral con equipo extendido.</span></li>
              <li className="flex gap-3"><Check size={16} className="mt-0.5 text-foreground shrink-0" /><span>Diagnósticos periódicos de fricción.</span></li>
              <li className="flex gap-3"><Check size={16} className="mt-0.5 text-foreground shrink-0" /><span>Acompañamiento puntual ante decisiones críticas.</span></li>
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <div className="max-w-3xl">
          <h2 className="font-display text-3xl md:text-4xl leading-[1.08]">
            ¿Quieres entender qué está bloqueando la ejecución de tu equipo?
          </h2>
          <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
            Una conversación inicial permite definir si la ruta es un workshop puntual, un programa
            piloto de cuatro semanas o un proceso de continuidad.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CTALink to="/contacto" variant="primary">Agendar conversación</CTALink>
            <CTAExternal href="https://wa.me/593986875121" variant="outline">WhatsApp</CTAExternal>
          </div>
        </div>
      </Section>
    </>
  );
}
