import { createFileRoute } from "@tanstack/react-router";
import { Eyebrow } from "@/components/site/Eyebrow";
import { CTALink, CTAExternal } from "@/components/site/CTAButton";
import { Section } from "@/components/site/Section";
import { Check } from "lucide-react";
import { buildSeo, canonicalLink, jsonLdScript, breadcrumbSchema } from "@/lib/seo";

export const Route = createFileRoute("/inversores")({
  head: () => ({
    meta: buildSeo({
      path: "/inversores",
      title: "Inversores | G-Structure",
      description:
        "G-Struct es el primer OS cognitivo-conductual para high-performers en LATAM. Pre-seed en curso. Información para inversores calificados.",
    }),
    links: canonicalLink("/inversores"),
    scripts: [
      jsonLdScript(breadcrumbSchema([
        { name: "Inicio", path: "/" },
        { name: "Inversores", path: "/inversores" },
      ])),
    ],
  }),
  component: Page,
});

function StatCard({ stat, title, body, source }: { stat: string; title: string; body: string; source?: string }) {
  return (
    <div className="border border-border bg-[color:var(--color-surface)] p-7 md:p-8">
      <p className="font-display text-4xl md:text-5xl font-semibold text-foreground leading-none">{stat}</p>
      <p className="mt-4 font-display text-base md:text-lg font-semibold text-foreground">{title}</p>
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{body}</p>
      {source ? <p className="mt-4 text-[11px] tracking-wide text-muted-foreground/80">{source}</p> : null}
    </div>
  );
}

function Page() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border bg-background">
        <div className="absolute inset-0 grid-bg opacity-30" aria-hidden />
        <div className="container-x relative py-24 md:py-32">
          <Eyebrow>INVERSORES · PRE-SEED 2026</Eyebrow>
          <h1 className="mt-6 max-w-3xl font-display text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.05] text-foreground">
            El primer OS cognitivo-conductual para LATAM está levantando su primera ronda.
          </h1>
          <p className="mt-6 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
            G-Struct combina metodología CBT coaching validada, inteligencia artificial y un modelo
            freemium para llevar coaching de ejecución de alto nivel al emprendedor latinoamericano —
            a una fracción del costo de las alternativas globales.
          </p>
        </div>
      </section>

      {/* OPORTUNIDAD */}
      <Section tone="muted">
        <Eyebrow>POR QUÉ AHORA</Eyebrow>
        <h2 className="mt-4 max-w-3xl font-display text-3xl md:text-4xl leading-[1.08]">
          La oportunidad.
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <StatCard
            stat="$67.94B"
            title="Mercado global de software de productividad en 2024."
            body="Proyectado a $149.74B para 2030 — creciendo al 14.1% anual."
            source="Grand View Research, 2024"
          />
          <StatCard
            stat="75%"
            title="De mujeres high-performers en LATAM reportan impostor pattern."
            body="70% con ansiedad asociada. 50% con insomnio."
            source="Martínez Moreno, PUCP, 2026"
          />
          <StatCard
            stat="33.37%"
            title="Tasa de actividad emprendedora en Ecuador — #1 en LATAM."
            body="3.3 millones de ecuatorianos activamente emprendiendo."
            source="GEM Ecuador, 2024–2025"
          />
        </div>
      </Section>

      {/* PRODUCTO */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow>QUÉ CONSTRUIMOS</Eyebrow>
            <h2 className="mt-4 font-display text-3xl md:text-4xl leading-[1.08]">El producto.</h2>
            <div className="mt-6 space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                G-Struct es una app móvil freemium que aplica el método I-R-O — Identificar,
                Reencuadrar, Optimizar — para ayudar a emprendedores y high-performers a identificar
                los patrones cognitivos que bloquean su ejecución y convertirlos en acción.
              </p>
              <p className="text-foreground/85">
                No es una app de bienestar. No es terapia. Es infraestructura de rendimiento
                cognitivo para el profesional latinoamericano.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5">
            <ul className="space-y-4">
              {[
                "Woebot cerró su versión consumer en junio 2025 — dejando un vacío directo en el mercado CBT B2C.",
                "BetterUp cobra desde $279/mes y requiere sponsor corporativo. G-Struct cuesta $20/mes.",
                "Somos los únicos construyendo esta categoría específicamente para LATAM, en español, desde Ecuador.",
              ].map((d) => (
                <li key={d} className="flex gap-3 border-l-2 border-foreground pl-4 py-1">
                  <span className="text-sm md:text-[15px] text-foreground/85 leading-relaxed">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* TRACCIÓN */}
      <Section tone="muted">
        <Eyebrow>ESTADO ACTUAL</Eyebrow>
        <h2 className="mt-4 max-w-3xl font-display text-3xl md:text-4xl leading-[1.08]">
          Tracción y hoja de ruta.
        </h2>
        <ol className="mt-12 space-y-5 max-w-3xl">
          {[
            { tag: "✓ COMPLETADO", body: "Metodología I-R-O validada a través de sesiones de coaching reales con emprendedores y profesionales en Ecuador." },
            { tag: "✓ ACTIVO", body: "Prototipo funcional construido. Primera cohorte de 8–10 testers en curso." },
            { tag: "→ JULIO 14, 2026", body: "Evento de validación con 30 emprendedores, founders y estudiantes. Primera data estructurada de NPS, disposición a pagar y fit de categoría." },
            { tag: "→ Q3 2026", body: "Lanzamiento público en Ecuador. Primeros 1,000 usuarios en plataforma freemium." },
          ].map((m) => (
            <li key={m.tag} className="border border-border bg-[color:var(--color-surface)] p-6">
              <p className="font-display text-[11px] font-semibold tracking-[0.22em] text-[color:var(--color-brand)]">{m.tag}</p>
              <p className="mt-3 text-base text-foreground/85 leading-relaxed">{m.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* RONDA */}
      <Section>
        <Eyebrow>LA RONDA</Eyebrow>
        <h2 className="mt-4 max-w-3xl font-display text-3xl md:text-4xl leading-[1.08]">
          Los términos.
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="border border-border bg-[color:var(--color-surface)] p-7">
            <p className="font-display text-5xl font-semibold text-foreground">$75,000</p>
            <p className="mt-3 text-sm text-muted-foreground">Monto a levantar. Pre-seed.</p>
          </div>
          <div className="border border-border bg-[color:var(--color-surface)] p-7">
            <p className="font-display text-5xl font-semibold text-foreground">$750,000</p>
            <p className="mt-3 text-sm text-muted-foreground">Valoración pre-money.</p>
          </div>
          <div className="border border-border bg-[color:var(--color-surface)] p-7">
            <p className="font-display text-5xl font-semibold text-foreground">10%</p>
            <p className="mt-3 text-sm text-muted-foreground">Equity ofrecido.</p>
          </div>
        </div>
        <p className="mt-8 max-w-3xl text-base text-foreground/85 leading-relaxed">
          Milestone a 18 meses: 500 suscriptores de pago · $11,000 MRR · Modelo validado para
          expansión a Colombia y México.
        </p>
      </Section>

      {/* EQUIPO */}
      <Section tone="muted">
        <Eyebrow>QUIÉNES SOMOS</Eyebrow>
        <h2 className="mt-4 max-w-3xl font-display text-3xl md:text-4xl leading-[1.08]">
          El equipo.
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="border border-border bg-[color:var(--color-surface)] p-8">
            <p className="eyebrow">FUNDADOR &amp; CEO</p>
            <h3 className="mt-3 font-display text-2xl font-semibold">Guillermo Suco</h3>
            <ul className="mt-5 space-y-2.5 text-sm text-foreground/85 leading-relaxed">
              <li>· CBT Coach Practitioner · CTAA</li>
              <li>· Estudios en Psicología e Intervención Educativa</li>
              <li>· Ex Project Manager, GBA Ships</li>
              <li>· Investigador publicado — MLS Pedagogy, Culture &amp; Innovation (2025) · Recimundo (2025)</li>
              <li>· Docente y orientador escolar en Ecuador y Estados Unidos</li>
              <li>· Creador del prototipo G-Struct</li>
            </ul>
          </div>
          <div className="border border-border bg-[color:var(--color-surface)] p-8">
            <p className="eyebrow">DESARROLLADOR</p>
            <h3 className="mt-3 font-display text-2xl font-semibold">Jericko Solórzano</h3>
            <ul className="mt-5 space-y-2.5 text-sm text-foreground/85 leading-relaxed">
              <li>· Python developer con portfolio activo en GitHub</li>
              <li>· Formación en JavaScript, Java, C#</li>
              <li>· SQL y arquitectura de datos en desarrollo activo</li>
              <li>· Git, Figma — flujo de trabajo colaborativo</li>
              <li>· Universidad de Guayaquil — etapa de fundación por equity</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* CTA FINAL */}
      <Section tone="deep">
        <div className="max-w-3xl">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05]">
            ¿Quieres conocer más?
          </h2>
          <p className="mt-6 text-base md:text-lg text-[color:var(--color-background)]/80 leading-relaxed">
            Si estás interesado en conocer el deck completo, los estados financieros proyectados o
            agendar una conversación con el equipo, escríbenos directamente.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <CTAExternal
              href="mailto:guillermo@g-structure.co?subject=Solicitud%20deck%20de%20inversi%C3%B3n%20G-Struct"
              variant="inverse"
            >
              Solicitar deck de inversión
            </CTAExternal>
            <CTALink to="/contacto" variant="ghost" className="text-[color:var(--color-background)] hover:bg-[color:var(--color-background)]/10">
              Agendar conversación
            </CTALink>
          </div>
          <p className="mt-10 text-xs text-[color:var(--color-background)]/60 max-w-2xl leading-relaxed">
            Esta página contiene información preliminar para inversores calificados. No constituye
            una oferta pública de valores.
          </p>
        </div>
      </Section>
    </>
  );
}
