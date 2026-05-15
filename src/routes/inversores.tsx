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
    <div className="group relative border border-border bg-[color:var(--color-surface)] p-7 md:p-9 flex flex-col transition-shadow duration-200 hover:shadow-elev-1 focus-within:shadow-elev-1">
      <span
        className="absolute inset-x-0 top-0 h-[3px] bg-[color:var(--color-brand)]"
        aria-hidden
      />
      <p className="font-display text-5xl md:text-6xl lg:text-[4rem] font-medium text-foreground leading-none tracking-tight">
        {stat}
      </p>
      <p className="mt-5 text-xs font-semibold tracking-[0.18em] uppercase text-foreground/70">
        {title}
      </p>
      <p className="mt-3 text-sm text-foreground/85 leading-relaxed">{body}</p>
      {source ? (
        <p className="mt-6 pt-4 border-t border-border/60 text-[11px] tracking-wide text-muted-foreground">
          {source}
        </p>
      ) : null}
    </div>
  );
}

function TermCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="border border-border bg-[color:var(--color-surface)] p-8 transition-shadow duration-200 hover:shadow-elev-1">
      <p className="font-display text-4xl md:text-5xl font-medium text-foreground leading-none tracking-tight">
        {value}
      </p>
      <p className="mt-4 text-xs tracking-wide text-muted-foreground">{label}</p>
    </div>
  );
}

function TimelineNode({
  tag,
  body,
  done,
  isLast,
}: {
  tag: string;
  body: string;
  done: boolean;
  isLast: boolean;
}) {
  return (
    <li className="relative grid grid-cols-[auto_1fr] gap-x-6 pb-10 last:pb-0">
      {/* line */}
      {!isLast && (
        <span
          className={`absolute left-[11px] top-6 bottom-0 w-px ${
            done
              ? "bg-[color:var(--color-brand)]"
              : "border-l border-dashed border-border"
          }`}
          aria-hidden
        />
      )}
      {/* node */}
      <span
        className={`relative z-10 mt-1 h-6 w-6 rounded-full border-2 ${
          done
            ? "bg-[color:var(--color-brand)] border-[color:var(--color-brand)]"
            : "bg-background border-dashed border-border"
        }`}
        aria-hidden
      />
      <div className={done ? "" : "opacity-75"}>
        <p
          className={`font-display text-[11px] font-semibold tracking-[0.22em] uppercase ${
            done ? "text-[color:var(--color-brand)]" : "text-muted-foreground"
          }`}
        >
          {tag}
        </p>
        <p className="mt-3 text-base md:text-[17px] text-foreground/85 leading-relaxed">
          {body}
        </p>
      </div>
    </li>
  );
}

function TeamCard({
  initials,
  role,
  name,
  items,
}: {
  initials: string;
  role: string;
  name: string;
  items: string[];
}) {
  return (
    <div className="border border-border bg-[color:var(--color-surface)] p-8">
      <div className="flex items-start gap-4">
        <span
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--color-brand)] text-[color:var(--color-background)] font-display text-sm font-semibold tracking-wider"
          aria-hidden
        >
          {initials}
        </span>
        <div>
          <span className="inline-block px-2.5 py-1 text-[10px] font-semibold tracking-[0.18em] uppercase border border-[color:var(--color-brand-deep)]/30 bg-[color:var(--color-brand-soft)] text-[color:var(--color-brand-deep)]">
            {role}
          </span>
          <h3 className="mt-3 font-display text-lg font-medium">{name}</h3>
        </div>
      </div>
      <ul className="mt-6 space-y-0 text-[13px] text-foreground/85 leading-relaxed">
        {items.map((it, i) => (
          <li
            key={i}
            className={`py-2.5 ${i < items.length - 1 ? "border-b border-border/50" : ""}`}
          >
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Page() {
  const teamGuillermo = [
    "CBT Coach Practitioner · CTAA",
    "Estudios en Psicología e Intervención Educativa",
    "Ex Project Manager, GBA Ships",
    "Investigador publicado — MLS Pedagogy, Culture & Innovation (2025) · Recimundo (2025)",
    "Docente y orientador escolar en Ecuador y Estados Unidos",
    "Creador del prototipo G-Struct",
  ];
  const teamJericko = [
    "Python developer con portfolio activo en GitHub",
    "Formación en JavaScript, Java, C#",
    "SQL y arquitectura de datos en desarrollo activo",
    "Git, Figma — flujo de trabajo colaborativo",
    "Universidad de Guayaquil — etapa de fundación por equity",
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border bg-background">
        <div className="absolute inset-0 grid-bg opacity-30" aria-hidden />
        <div className="container-x relative py-28 md:py-36">
          <div className="border-l-2 border-[color:var(--color-brand)] pl-4">
            <Eyebrow className="!mt-0">INVERSORES · PRE-SEED 2026</Eyebrow>
          </div>
          <h1 className="mt-8 max-w-3xl font-display text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.05] text-foreground">
            El primer OS cognitivo-conductual para LATAM está levantando su primera ronda.
          </h1>
          <div className="mt-10 h-px w-24 bg-[color:var(--color-brand)]" aria-hidden />
          <p className="mt-10 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
            G-Struct combina metodología CBT coaching validada, inteligencia artificial y un modelo
            freemium para llevar coaching de ejecución de alto nivel al emprendedor latinoamericano —
            a una fracción del costo de las alternativas globales.
          </p>
        </div>
      </section>

      {/* OPORTUNIDAD */}
      <Section tone="muted" className="!py-20 md:!py-32">
        <Eyebrow>POR QUÉ AHORA</Eyebrow>
        <h2 className="mt-4 max-w-3xl font-display text-3xl md:text-4xl leading-[1.08]">
          La oportunidad.
        </h2>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
      <Section className="!py-20 md:!py-32">
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
            <ul className="space-y-3">
              {[
                {
                  highlight: "Woebot",
                  rest: " cerró su versión consumer en junio 2025 — dejando un vacío directo en el mercado CBT B2C.",
                },
                {
                  highlight: "BetterUp",
                  rest: " cobra desde $279/mes y requiere sponsor corporativo. G-Struct cuesta $20/mes.",
                },
                {
                  highlight: "Somos los únicos",
                  rest: " construyendo esta categoría específicamente para LATAM, en español, desde Ecuador.",
                },
              ].map((d) => (
                <li
                  key={d.highlight}
                  className="flex gap-3 border border-border bg-[color:var(--color-surface)] px-5 py-4"
                >
                  <Check
                    className="mt-1 h-4 w-4 flex-none text-[color:var(--color-brand)]"
                    aria-hidden
                  />
                  <span className="text-sm md:text-[15px] text-foreground/85 leading-relaxed">
                    <strong className="text-foreground font-semibold">{d.highlight}</strong>
                    {d.rest}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* TRACCIÓN */}
      <Section tone="muted" className="!py-20 md:!py-32">
        <Eyebrow>ESTADO ACTUAL</Eyebrow>
        <h2 className="mt-4 max-w-3xl font-display text-3xl md:text-4xl leading-[1.08]">
          Tracción y hoja de ruta.
        </h2>
        <ol className="mt-14 max-w-3xl">
          {[
            {
              tag: "✓ Completado",
              body: "Metodología I-R-O validada a través de sesiones de coaching reales con emprendedores y profesionales en Ecuador.",
              done: true,
            },
            {
              tag: "✓ Activo",
              body: "Prototipo funcional construido. Primera cohorte de 8–10 testers en curso.",
              done: true,
            },
            {
              tag: "Julio 14, 2026",
              body: "Evento de validación con 30 emprendedores, founders y estudiantes. Primera data estructurada de NPS, disposición a pagar y fit de categoría.",
              done: false,
            },
            {
              tag: "Q3 2026",
              body: "Lanzamiento público en Ecuador. Primeros 1,000 usuarios en plataforma freemium.",
              done: false,
            },
          ].map((m, i, arr) => (
            <TimelineNode
              key={m.tag}
              tag={m.tag}
              body={m.body}
              done={m.done}
              isLast={i === arr.length - 1}
            />
          ))}
        </ol>
      </Section>

      {/* RONDA */}
      <Section className="!py-20 md:!py-32">
        <Eyebrow>LA RONDA</Eyebrow>
        <h2 className="mt-4 max-w-3xl font-display text-3xl md:text-4xl leading-[1.08]">
          Los términos.
        </h2>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <TermCard value="$75,000" label="Monto a levantar. Pre-seed." />
          <TermCard value="$750,000" label="Valoración pre-money." />
          <TermCard value="10%" label="Equity ofrecido." />
        </div>
        <div className="mt-10 max-w-3xl border-l-2 border-[color:var(--color-brand)] bg-[color:var(--color-brand-soft)]/40 px-6 py-5">
          <p className="text-base text-foreground/85 leading-relaxed">
            Milestone a 18 meses: 500 suscriptores de pago · $11,000 MRR · Modelo validado para
            expansión a Colombia y México.
          </p>
        </div>
      </Section>

      {/* EQUIPO */}
      <Section tone="muted" className="!py-20 md:!py-32">
        <Eyebrow>QUIÉNES SOMOS</Eyebrow>
        <h2 className="mt-4 max-w-3xl font-display text-3xl md:text-4xl leading-[1.08]">
          El equipo.
        </h2>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <TeamCard
            initials="GS"
            role="Fundador & CEO"
            name="Guillermo Suco"
            items={teamGuillermo}
          />
          <TeamCard
            initials="JS"
            role="Desarrollador"
            name="Jericko Solórzano"
            items={teamJericko}
          />
        </div>
      </Section>

      {/* CTA FINAL */}
      <Section tone="deep" className="!py-24 md:!py-36">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05]">
            ¿Quieres conocer más?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg text-[color:var(--color-background)]/80 leading-relaxed">
            Si estás interesado en conocer el deck completo, los estados financieros proyectados o
            agendar una conversación con el equipo, escríbenos directamente.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <CTAExternal
              href="mailto:guillermo@g-structure.co?subject=Solicitud%20deck%20de%20inversi%C3%B3n%20G-Struct"
              variant="inverse"
            >
              Solicitar deck de inversión
            </CTAExternal>
            <CTALink
              to="/contacto"
              variant="ghost"
              className="text-[color:var(--color-background)] hover:bg-[color:var(--color-background)]/10"
            >
              Agendar conversación
            </CTALink>
          </div>
          <p className="mx-auto mt-12 max-w-2xl text-xs text-[color:var(--color-background)]/60 leading-relaxed">
            Esta página contiene información preliminar para inversores calificados. No constituye
            una oferta pública de valores.
          </p>
        </div>
      </Section>
    </>
  );
}
