import { createFileRoute } from "@tanstack/react-router";
import { Eyebrow } from "@/components/site/Eyebrow";
import { CTALink, CTAExternal } from "@/components/site/CTAButton";
import { Section } from "@/components/site/Section";
import { Check } from "lucide-react";
import { buildSeo, canonicalLink, jsonLdScript, breadcrumbSchema } from "@/lib/seo";
import gStructHomePreview from "@/assets/g-struct-home-preview.png";
import guillermoPhoto from "@/assets/guillermo-suco.png";

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

function PhoneMockup({ className = "", widthClass = "w-[220px]" }: { className?: string; widthClass?: string }) {
  return (
    <div className={`relative ${className}`}>
      {/* Annotation: top */}
      <div className="hidden lg:flex absolute -left-[140px] top-[18%] items-center gap-2 w-[200px] justify-end">
        <span className="text-[11px] tracking-wide text-muted-foreground text-right leading-tight">
          Motor de<br />Reestructuración
        </span>
        <span className="block h-px w-10 bg-border" aria-hidden />
      </div>
      {/* Annotation: bottom */}
      <div className="hidden lg:flex absolute -right-[140px] bottom-[22%] items-center gap-2 w-[200px]">
        <span className="block h-px w-10 bg-border" aria-hidden />
        <span className="text-[11px] tracking-wide text-muted-foreground leading-tight">
          Diagnóstico<br />de Ejecución
        </span>
      </div>

      <div className={`${widthClass} mx-auto`}>
        {/* Phone frame */}
        <div className="relative aspect-[9/19] rounded-[34px] bg-[#1A1A1A] p-[10px] shadow-none">
          {/* Notch */}
          <div className="absolute left-1/2 top-[10px] -translate-x-1/2 h-[18px] w-[78px] rounded-full bg-[#0a0a0a] z-10" aria-hidden />
          {/* Screen */}
          <div className="relative h-full w-full overflow-hidden rounded-[26px] bg-background">
            <img
              src={gStructHomePreview}
              alt="Pantalla de G-Struct"
              className="h-full w-full object-cover object-top"
              loading="lazy"
            />
            {/* Subtle inner border / reflection */}
            <span
              className="pointer-events-none absolute inset-0 rounded-[26px] border border-white/10"
              aria-hidden
            />
          </div>
        </div>
        <p className="mt-4 text-center text-[11px] tracking-wide text-muted-foreground">
          G-Struct · Prototipo activo · v0.1
        </p>
      </div>
    </div>
  );
}

function PriceBar({
  label,
  value,
  widthPct,
  variant = "muted",
  note,
  dashed = false,
}: {
  label: string;
  value: string;
  widthPct: number;
  variant?: "muted" | "brand";
  note?: string;
  dashed?: boolean;
}) {
  const isBrand = variant === "brand";
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 mb-2">
        <p
          className={`text-[13px] ${
            isBrand
              ? "font-semibold text-foreground"
              : "text-foreground/85"
          }`}
        >
          {label}
        </p>
        <p
          className={`text-[12px] tabular-nums ${
            isBrand ? "font-semibold text-[color:var(--color-brand-deep)]" : "text-muted-foreground"
          }`}
        >
          {value}
        </p>
      </div>
      <div className="h-3 w-full bg-border/40">
        <div
          className={`h-full ${
            dashed
              ? "border border-dashed border-border bg-transparent"
              : isBrand
                ? "bg-[color:var(--color-brand)]"
                : "bg-foreground/35"
          }`}
          style={{ width: `${Math.max(widthPct, dashed ? 30 : 4)}%` }}
          aria-hidden
        />
      </div>
      {note ? (
        <p className="mt-2 text-[11px] text-muted-foreground">{note}</p>
      ) : null}
    </div>
  );
}

function PriceComparison() {
  // Reference: $279 = 100%
  const max = 279;
  return (
    <div className="mt-12 border border-border bg-[color:var(--color-surface)] p-7 md:p-9">
      <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-muted-foreground">
        Comparación de precio · Coaching CBT para individuos
      </p>
      <div className="mt-6 space-y-6">
        <PriceBar label="BetterUp" value="$279/mes" widthPct={(279 / max) * 100} />
        <PriceBar
          label="Woebot (descontinuado)"
          value="N/A — salió del mercado B2C"
          widthPct={0}
          dashed
        />
        <PriceBar
          label="Calm / Headspace"
          value="$14/mes"
          widthPct={(14 / max) * 100}
          note="Bienestar — no coaching de ejecución"
        />
        <PriceBar
          label="G-Struct"
          value="$20/mes"
          widthPct={(20 / max) * 100}
          variant="brand"
          note="CBT coaching · LATAM · móvil"
        />
      </div>
      <p className="mt-7 pt-5 border-t border-border/60 text-[12px] text-muted-foreground leading-relaxed">
        BetterUp requiere sponsor corporativo. G-Struct es acceso individual directo.
      </p>
    </div>
  );
}

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

function MilestoneBadge({ kind }: { kind: "done" | "next" }) {
  if (kind === "done") {
    return (
      <span className="inline-block px-2 py-0.5 text-[10px] font-semibold tracking-[0.14em] uppercase rounded-full bg-[color:var(--color-brand)] text-[color:var(--color-background)]">
        Completado
      </span>
    );
  }
  return (
    <span className="inline-block px-2 py-0.5 text-[10px] font-semibold tracking-[0.14em] uppercase rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/40">
      Próximo
    </span>
  );
}

function TimelineNode({
  tag,
  body,
  done,
  isNext,
  isLast,
}: {
  tag: string;
  body: string;
  done: boolean;
  isNext: boolean;
  isLast: boolean;
}) {
  return (
    <li className="relative grid grid-cols-[auto_1fr] gap-x-6 pb-10 last:pb-0">
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
      <span
        className={`relative z-10 mt-1 h-6 w-6 rounded-full border-2 ${
          done
            ? "bg-[color:var(--color-brand)] border-[color:var(--color-brand)]"
            : "bg-background border-[color:var(--color-brand)]"
        }`}
        aria-hidden
      />
      <div className={done ? "" : "opacity-90"}>
        <div className="flex flex-wrap items-center gap-2">
          <p
            className={`font-display text-[11px] font-semibold tracking-[0.22em] uppercase ${
              done ? "text-[color:var(--color-brand)]" : "text-muted-foreground"
            }`}
          >
            {tag}
          </p>
          {done ? <MilestoneBadge kind="done" /> : null}
          {isNext ? <MilestoneBadge kind="next" /> : null}
        </div>
        <p className="mt-3 text-base md:text-[17px] text-foreground/85 leading-relaxed">
          {body}
        </p>
      </div>
    </li>
  );
}

function ValidationProgress({ done, total }: { done: number; total: number }) {
  const pct = Math.round((done / total) * 100);
  return (
    <div className="mt-10 max-w-3xl">
      <div className="flex items-center justify-between gap-4 mb-3">
        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-muted-foreground">
          Progreso de validación
        </p>
        <p className="text-[12px] tabular-nums text-foreground/85">
          {done} de {total} hitos completados
        </p>
      </div>
      <div className="h-2 w-full bg-border/50 overflow-hidden">
        <div
          className="h-full bg-[color:var(--color-brand)] transition-[width] duration-500"
          style={{ width: `${pct}%` }}
          aria-hidden
        />
      </div>
    </div>
  );
}

function TeamCard({
  initials,
  role,
  name,
  items,
  photo,
}: {
  initials: string;
  role: string;
  name: string;
  items: string[];
  photo?: string;
}) {
  return (
    <div className="border border-border bg-[color:var(--color-surface)] p-8 transition-shadow duration-200 hover:shadow-elev-1">
      <div className="flex items-start gap-4">
        {photo ? (
          <img
            src={photo}
            alt={name}
            className="h-16 w-16 rounded-full object-cover border border-border"
            loading="lazy"
          />
        ) : (
          <span
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--color-brand)] text-[color:var(--color-background)] font-display text-sm font-semibold tracking-wider"
            aria-hidden
          >
            {initials}
          </span>
        )}
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

  const milestones = [
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
  ];
  const doneCount = milestones.filter((m) => m.done).length;
  const nextIndex = milestones.findIndex((m) => !m.done);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border bg-background">
        <div className="absolute inset-0 grid-bg opacity-30" aria-hidden />
        <div className="container-x relative py-24 md:py-32">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-12 items-center">
            <div className="lg:col-span-8">
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
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <PhoneMockup
                className="md:px-[140px] lg:px-0"
                widthClass="w-[160px] md:w-[220px]"
              />
            </div>
          </div>
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
        <PriceComparison />
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
        <ValidationProgress done={doneCount} total={milestones.length} />
        <ol className="mt-12 max-w-3xl">
          {milestones.map((m, i, arr) => (
            <TimelineNode
              key={m.tag}
              tag={m.tag}
              body={m.body}
              done={m.done}
              isNext={i === nextIndex}
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
            photo={guillermoPhoto}
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
          <p className="mx-auto mt-12 max-w-2xl text-xs text-[color:var(--color-background)]/75 leading-relaxed">
            Esta página contiene información preliminar para inversores calificados. No constituye
            una oferta pública de valores.
          </p>
        </div>
      </Section>
    </>
  );
}
