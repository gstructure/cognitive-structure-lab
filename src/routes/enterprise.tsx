import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";
import { Section } from "@/components/site/Section";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Eyebrow } from "@/components/site/Eyebrow";
import { CTALink, CTAExternal } from "@/components/site/CTAButton";
import etwBadge from "@/assets/etw-2026-badge.webp";
import { buildSeo, canonicalLink, jsonLdScript, breadcrumbSchema } from "@/lib/seo";
import { BookingDialog } from "@/components/booking/BookingDialog";
import { findPackage } from "@/lib/booking-catalog";

export const Route = createFileRoute("/enterprise")({
  head: () => ({
    meta: buildSeo({
      path: "/enterprise",
      title: "Workshop de Diagnóstico de Ejecución | G-Structure Enterprise",
      description:
        "Workshop B2B de G-Structure para diagnosticar fricción de ejecución en equipos y abrir una ruta clara hacia KAIRON.",
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

      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-50" aria-hidden />
        <div className="container-x relative py-20 md:py-28 lg:py-32">
          <div className="max-w-4xl">
            <Eyebrow>G-STRUCTURE ENTERPRISE</Eyebrow>
            <h1 className="mt-6 text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.05]">
              La fricción de ejecución también aparece en equipos.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Un equipo puede tener talento, objetivos y reuniones constantes, pero seguir
              atrapado en ciclos de postergación, sobreanálisis, perfeccionismo o decisiones
              que no se traducen en acción.
            </p>
            <p className="mt-4 max-w-2xl text-sm md:text-base text-muted-foreground/90 leading-relaxed">
              El Workshop de Diagnóstico de Ejecución es la puerta de entrada B2B de
              G-Structure: ayuda a leer el patrón del equipo, detectar fricciones reales y
              conectar ese aprendizaje con KAIRON.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setBookingOpen(true)}
                className="group inline-flex items-center justify-center gap-2 px-5 py-3 text-[13px] font-medium tracking-wide bg-foreground text-background hover:opacity-90 transition-opacity"
              >
                Solicitar workshop
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </button>
              <CTAExternal href="https://wa.me/593986875121" variant="outline">
                Hablar con Guillermo
              </CTAExternal>
            </div>
          </div>
        </div>
      </section>

      <Section tone="muted">
        <SectionHeader
          eyebrow="EL PROBLEMA"
          title="Cuando el equipo no ejecuta, el problema no siempre es la estrategia."
          subtitle="A veces la fricción vive en cómo el equipo interpreta presión, decide prioridades, evita conversaciones difíciles o convierte claridad en seguimiento."
        />
        <div className="mt-12 grid gap-px bg-border md:grid-cols-3 border border-border">
          {[
            "Reuniones sin salida conductual",
            "Decisiones postergadas",
            "Perfeccionismo que retrasa entregables",
            "Sobreanálisis estratégico",
            "Falta de seguimiento",
            "Evitación de conversaciones difíciles",
          ].map((item) => (
            <div key={item} className="bg-[color:var(--color-surface)] p-6">
              <h3 className="font-display text-base font-semibold">{item}</h3>
            </div>
          ))}
        </div>
      </Section>

      <Section id="workshop">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeader
              eyebrow="WORKSHOP B2B"
              title="Workshop de Diagnóstico de Ejecución"
              subtitle="Una sesión estratégica para identificar patrones que interfieren con la ejecución del equipo, mapear fricciones cognitivas y conductuales, y definir una ruta de intervención clara."
            />
            <div className="mt-8">
              <button
                type="button"
                onClick={() => setBookingOpen(true)}
                className="group inline-flex items-center justify-center gap-2 px-5 py-3 text-[13px] font-medium tracking-wide bg-foreground text-background hover:opacity-90 transition-opacity"
              >
                Solicitar workshop
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </button>
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
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-foreground/85">
                    <Check size={16} className="mt-0.5 shrink-0 text-foreground" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16 items-center">
          <div className="lg:col-span-8">
            <Eyebrow>SIGUIENTE PASO</Eyebrow>
            <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-[2.5rem] leading-[1.08]">
              Antes de intervenir al equipo, hay que entender el patrón.
            </h2>
            <p className="mt-5 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
              El workshop permite identificar dónde se está generando la fricción:
              inicio, decisión, priorización, seguimiento o cierre.
            </p>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <button
              type="button"
              onClick={() => setBookingOpen(true)}
              className="group inline-flex items-center justify-center gap-2 px-5 py-3 text-[13px] font-medium tracking-wide bg-foreground text-background hover:opacity-90 transition-opacity"
            >
              Reservar workshop
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </Section>
    </>
  );
}
