import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Eyebrow } from "@/components/site/Eyebrow";
import { CTALink, CTAExternal } from "@/components/site/CTAButton";
import { Check } from "lucide-react";

export const Route = createFileRoute("/aliados-etw-2026")({
  head: () => ({
    meta: [
      { title: "Aliados ETW 2026 | Workshop de Diagnóstico — G-Structure" },
      {
        name: "description",
        content:
          "G-Structure abre alianzas para el Workshop de Diagnóstico de Ejecución durante Ecuador Tech Week 2026. Marcas, instituciones y empresas alineadas con ejecución, claridad y tecnología.",
      },
      { property: "og:title", content: "Aliados ETW 2026 — G-Structure" },
      {
        property: "og:description",
        content: "Sé parte del Workshop de Diagnóstico de Ejecución en Ecuador Tech Week 2026.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-[color:var(--color-brand-soft)]/30">
        <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
        <div className="container-x relative py-20 md:py-28 lg:py-32">
          <div className="inline-flex items-center gap-2 border border-foreground/20 px-2.5 py-1 text-[10px] font-semibold tracking-[0.22em]">
            <span className="h-1.5 w-1.5 bg-foreground" /> ALIADOS · ETW 2026
          </div>
          <h1 className="mt-6 max-w-4xl font-display text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.05]">
            Sé parte del Workshop de Diagnóstico de Ejecución en Ecuador Tech Week 2026.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            G-Structure está abriendo oportunidades de alianza para marcas, instituciones y empresas
            que quieran vincularse al Workshop de Diagnóstico de Ejecución durante Ecuador Tech Week
            2026.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <CTALink to="/contacto" variant="primary">Quiero ser aliado</CTALink>
            <CTAExternal href="https://wa.me/593986875121" variant="outline">WhatsApp</CTAExternal>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeader
          eyebrow="EL CONTEXTO"
          title="Una conversación seria sobre ejecución, claridad y tecnología."
          subtitle="El 14 de julio, G-Structure presentará el Workshop de Diagnóstico de Ejecución como parte de Ecuador Tech Week 2026: una experiencia diseñada para identificar patrones que bloquean la acción en profesionales, emprendedores y equipos."
        />
        <div className="mt-10 max-w-3xl text-base md:text-lg text-foreground/85 leading-relaxed">
          Buscamos aliados que entiendan el valor de apoyar conversaciones serias sobre ejecución,
          claridad, tecnología, emprendimiento y desarrollo profesional. No es un evento masivo: es
          una experiencia curada con asistentes calificados.
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeader
          eyebrow="MODALIDADES DE ALIANZA"
          title="Cuatro formas de vincularse al workshop."
        />
        <div className="mt-12 grid gap-px bg-border md:grid-cols-2 border border-border">
          {[
            { t: "Marca aliada", d: "Vinculación de marca al evento, comunicación previa, presencia visual y mención en materiales oficiales." },
            { t: "Sede o experiencia", d: "Aporte de sede, espacio, producción o experiencia en sitio para el workshop o actividades vinculadas." },
            { t: "Contenido", d: "Participación en contenido pre o post-evento: contenido editorial, casos, datos o investigación." },
            { t: "Auspicio estratégico", d: "Aporte económico para producción, materiales y experiencia de los asistentes, con visibilidad acordada." },
          ].map((m) => (
            <div key={m.t} className="bg-[color:var(--color-surface)] p-7 md:p-9">
              <h3 className="font-display text-lg md:text-xl font-semibold">{m.t}</h3>
              <p className="mt-3 text-sm md:text-[15px] text-muted-foreground leading-relaxed">{m.d}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-xs text-muted-foreground">
          Espacios limitados para aliados estratégicos, experiencia, sede o contenido.
        </p>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeader
              eyebrow="CRITERIOS"
              title="Buscamos aliados con propósito, no solo logos."
              subtitle="Priorizamos marcas e instituciones cuyas conversaciones se intersecten con ejecución, tecnología, emprendimiento, liderazgo y desarrollo profesional serio."
            />
            <div className="mt-8">
              <CTALink to="/contacto">Solicitar dossier de alianza</CTALink>
            </div>
          </div>
          <div className="lg:col-span-6 border border-border bg-[color:var(--color-surface)] p-8">
            <ul className="space-y-3.5 text-sm text-foreground/85">
              {[
                "Alineación temática con ejecución, tecnología o desarrollo profesional.",
                "Audiencia o comunidad relevante para el workshop.",
                "Capacidad de aportar marca, sede, contenido o auspicio.",
                "Disposición a co-construir más allá de un patrocinio transaccional.",
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
