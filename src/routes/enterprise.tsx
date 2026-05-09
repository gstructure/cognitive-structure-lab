import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Eyebrow } from "@/components/site/Eyebrow";
import { CTALink, CTAExternal } from "@/components/site/CTAButton";
import { Check, ArrowRight } from "lucide-react";
import etwBadge from "@/assets/etw-2026-badge.png";
import reestructuraLogo from "@/assets/reestructura-enterprise-logo.png";
import { buildSeo, canonicalLink, jsonLdScript, breadcrumbSchema } from "@/lib/seo";
import { BookingDialog } from "@/components/booking/BookingDialog";
import { findPackage } from "@/lib/booking-catalog";

export const Route = createFileRoute("/enterprise")({
  head: () => ({
    meta: buildSeo({
      path: "/enterprise",
      title: "G-Structure Enterprise | Coaching para Equipos y Ejecución",
      description:
        "Diagnóstico, workshops y programas de coaching cognitivo-conductual para equipos y empresas en Ecuador. Reduce fricción interna y sostén la ejecución.",
      image: etwBadge,
    }),
    links: canonicalLink("/enterprise"),
    scripts: [
      jsonLdScript(breadcrumbSchema([
        { name: "Inicio", path: "/" },
        { name: "Enterprise", path: "/enterprise" },
      ])),
    ],
  }),
  component: Enterprise,
});

function Enterprise() {
  const workshopPkg = findPackage("enterprise-workshop") ?? null;
  const [bookingOpen, setBookingOpen] = useState(false);
  return (
    <>
      <BookingDialog pkg={workshopPkg} open={bookingOpen} onOpenChange={setBookingOpen} />
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-50" aria-hidden />
        <div className="container-x relative py-20 md:py-28 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <Eyebrow>REESTRUCTURA ENTERPRISE</Eyebrow>
              <h1 className="mt-6 max-w-3xl text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.05]">
                Equipos que piensan mejor, deciden con más claridad y ejecutan con más consistencia.
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
                Un programa piloto de 4 semanas para identificar y reencuadrar patrones
                cognitivo-conductuales que bloquean la ejecución en equipos y organizaciones.
              </p>
              <p className="mt-4 max-w-2xl text-sm md:text-base text-muted-foreground/90 leading-relaxed">
                No es una charla motivacional. Es una intervención estructurada para convertir
                fricción interna en decisiones, acciones y seguimiento.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <CTALink to="/contacto" variant="primary">Solicitar Workshop de Diagnóstico</CTALink>
                <CTALink to="/enterprise" hash="programa" variant="outline">
                  Ver estructura del programa
                </CTALink>
                <CTAExternal
                  href="/downloads/reestructura-enterprise-onepager.pdf"
                  download
                  variant="ghost"
                  withArrow={false}
                >
                  Descargar one-pager (PDF)
                </CTAExternal>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative">
                <div className="absolute -inset-3 border border-border" aria-hidden />
                <div className="absolute -bottom-3 -right-3 h-24 w-24 bg-[color:var(--color-brand-deep)]" aria-hidden />
                <div className="relative bg-[color:var(--color-surface)] border border-border p-6 md:p-8 shadow-elev-1">
                  <img
                    src={reestructuraLogo}
                    alt="REESTRUCTURA Enterprise — Programa de Ingeniería Conductual y Cognitiva by G-Structure"
                    className="w-full h-auto"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEMA */}
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

      {/* INTERVENCIÓN ESTRUCTURADA — featured con imagen */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              <div className="absolute -top-3 -left-3 h-24 w-24 border-l-2 border-t-2 border-[color:var(--color-brand-deep)]" aria-hidden />
              <div className="absolute -bottom-3 -right-3 h-24 w-24 border-r-2 border-b-2 border-[color:var(--color-brand-deep)]" aria-hidden />
              <div className="relative bg-[color:var(--color-surface)] p-6 md:p-10 transition-transform hover:-translate-y-0.5 duration-300">
                <img
                  src={reestructuraLogo}
                  alt="REESTRUCTURA Enterprise"
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2">
            <Eyebrow>REESTRUCTURA ENTERPRISE</Eyebrow>
            <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-[2.5rem] leading-[1.08]">
              Una intervención estructurada para equipos que necesitan ejecutar con más claridad.
            </h2>
            <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              REESTRUCTURA Enterprise traduce el método I-R-O de G-Structure en un proceso
              aplicado para equipos: identificar patrones de fricción, reencuadrar lecturas
              improductivas y convertir claridad en decisiones, acciones y seguimiento.
            </p>
            <ul className="mt-8 space-y-3.5">
              {[
                "Diagnóstico de patrones de ejecución.",
                "Reencuadre cognitivo-conductual aplicado al contexto del equipo.",
                "Priorización de decisiones y acciones.",
                "Seguimiento para consolidar avance.",
                "Ruta de continuidad si el equipo necesita sostener el cambio.",
              ].map((i) => (
                <li key={i} className="flex gap-3 text-sm md:text-[15px] text-foreground/85">
                  <Check size={18} className="mt-0.5 shrink-0 text-[color:var(--color-brand-deep)]" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <CTALink to="/contacto" variant="primary">Solicitar Workshop de Diagnóstico</CTALink>
            </div>
          </div>
        </div>
      </Section>

      {/* DIAGNÓSTICO → REENCUADRE → ACCIÓN → CONTINUIDAD */}
      <Section tone="muted">
        <SectionHeader
          eyebrow="EL MÉTODO APLICADO"
          title="De la fricción interna a la ejecución sostenida."
          subtitle="Cuatro etapas conectadas que mueven el sistema operativo del equipo desde el patrón improductivo hacia la acción consistente."
        />
        <div className="mt-12 grid gap-px bg-border md:grid-cols-4 border border-border">
          {[
            { n: "01", t: "Diagnóstico", d: "Lectura del patrón cognitivo-conductual del equipo." },
            { n: "02", t: "Reencuadre", d: "Intervención sobre creencias rígidas y lecturas improductivas." },
            { n: "03", t: "Acción", d: "Diseño conductual: decisiones, rutinas y compromisos." },
            { n: "04", t: "Continuidad", d: "Seguimiento y consolidación del cambio en el tiempo." },
          ].map((s) => (
            <div key={s.n} className="group relative bg-[color:var(--color-surface)] p-7 transition-colors hover:bg-background">
              <span className="font-display text-xs font-semibold tracking-[0.22em] text-[color:var(--color-brand-deep)]">
                {s.n}
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-foreground">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              <ArrowRight
                size={16}
                className="absolute top-7 right-6 text-muted-foreground/40 transition-transform group-hover:translate-x-1 group-hover:text-foreground"
                aria-hidden
              />
            </div>
          ))}
        </div>
      </Section>

      {/* WORKSHOP DE DIAGNÓSTICO */}
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

      {/* PROGRAMA 4 SEMANAS — banner premium */}
      <Section id="programa" tone="deep">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <p className="eyebrow text-[color:var(--color-background)]/70">PROGRAMA PILOTO</p>
            <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-[2.5rem] leading-[1.08]">
              REESTRUCTURA Enterprise — 4 semanas.
            </h2>
            <p className="mt-5 text-base md:text-lg text-[color:var(--color-background)]/80 leading-relaxed">
              Un programa breve y estructurado para intervenir patrones de procrastinación,
              perfeccionismo, sobreanálisis y autosabotaje en equipos. Cuatro semanas para mover el
              sistema operativo del equipo desde la fricción hacia la ejecución consistente.
            </p>
            <div className="mt-8 bg-[color:var(--color-background)]/5 border border-[color:var(--color-background)]/15 p-6">
              <img
                src={reestructuraLogo}
                alt="REESTRUCTURA Enterprise"
                className="w-full max-w-[280px] mx-auto h-auto"
                loading="lazy"
              />
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="grid gap-px bg-[color:var(--color-background)]/15 border border-[color:var(--color-background)]/20 sm:grid-cols-2">
              {[
                { n: "SEMANA 1", t: "Diagnóstico", d: "Lectura del patrón de ejecución y mapa de fricciones del equipo." },
                { n: "SEMANA 2", t: "Reencuadre", d: "Intervención cognitivo-conductual sobre creencias rígidas y lecturas improductivas." },
                { n: "SEMANA 3", t: "Acción", d: "Traducción a decisiones, compromisos, rutinas y protocolos." },
                { n: "SEMANA 4", t: "Continuidad", d: "Consolidación, métricas de seguimiento y ruta posterior." },
              ].map((w) => (
                <div key={w.n} className="bg-[color:var(--color-brand-deep)] p-7">
                  <p className="font-display text-[10px] font-semibold tracking-[0.22em] text-[color:var(--color-background)]/60">
                    {w.n}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-semibold text-[color:var(--color-background)]">
                    {w.t}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-background)]/75">
                    {w.d}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <CTALink to="/contacto" variant="inverse">Solicitar información del programa</CTALink>
            </div>
          </div>
        </div>
      </Section>

      {/* CONTINUIDAD */}
      <Section tone="white">
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
          <div className="lg:col-span-6 border border-border bg-background p-8">
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

      {/* CIERRE COMERCIAL */}
      <Section tone="muted">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16 items-center">
          <div className="lg:col-span-8">
            <Eyebrow>SIGUIENTE PASO</Eyebrow>
            <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-[2.5rem] leading-[1.08]">
              Antes de intervenir al equipo, hay que entender el patrón.
            </h2>
            <p className="mt-5 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
              El Workshop de Diagnóstico permite identificar dónde se está generando la fricción:
              inicio, decisión, priorización, seguimiento o cierre.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CTALink to="/contacto" variant="primary">Solicitar Workshop de Diagnóstico</CTALink>
              <CTAExternal href="https://wa.me/593986875121" variant="outline">Hablar por WhatsApp</CTAExternal>
              <CTAExternal
                href="/downloads/reestructura-enterprise-onepager.pdf"
                download
                variant="ghost"
                withArrow={false}
              >
                Descargar one-pager (PDF)
              </CTAExternal>
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="border border-border bg-background p-6 text-center">
              <img
                src={reestructuraLogo}
                alt="REESTRUCTURA Enterprise"
                className="w-full max-w-[220px] mx-auto h-auto"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
