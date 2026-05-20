import { Eyebrow } from "@/components/site/Eyebrow";
import { CTALink, CTAExternal } from "@/components/site/CTAButton";
import { Section } from "@/components/site/Section";
import { Check } from "lucide-react";
import gStructHomePreview from "@/assets/g-struct-home-preview.webp";
import guillermoPhoto from "@/assets/guillermo-suco.webp";
import type { Locale } from "@/lib/i18n";
import { trackConversion } from "@/lib/analytics";

type Copy = {
  hero: {
    eyebrow: string;
    h1: string;
    lead: { a: string; channels: string; b: string };
    phoneCaption: string;
    phoneAnnotTop: string;
    phoneAnnotBottom: string;
  };
  opportunity: {
    eyebrow: string;
    title: string;
    stats: { stat: string; title: string; body: string; source: string }[];
    priceCompareTitle: string;
    priceBars: { label: string; value: string; note?: string }[];
    priceFoot: string;
  };
  thesis: { label: string; title: string; body: string }[];
  product: {
    eyebrow: string;
    title: string;
    p1: string;
    p2: string;
    bullets: { highlight: string; rest: string }[];
  };
  traction: {
    eyebrow: string;
    title: string;
    progressLabel: string;
    progressCount: (done: number, total: number) => string;
    milestones: { tag: string; body: string; done: boolean }[];
    badgeDone: string;
    badgeNext: string;
  };
  round: {
    eyebrow: string;
    title: string;
    terms: { value: string; label: string }[];
    milestone: string;
  };
  team: {
    eyebrow: string;
    title: string;
    guillermo: { role: string; name: string; items: string[] };
    jericko: { role: string; name: string; items: string[] };
  };
  cta: {
    title: string;
    body: string;
    primary: string;
    secondary: string;
    disclaimer: string;
    mailSubject: string;
  };
};

const COPY: Record<Locale, Copy> = {
  es: {
    hero: {
      eyebrow: "INVERSORES · PRE-SEED 2026 · CORE ASSET: G-STRUCT",
      h1: "G-Structure no es una firma de servicios. Es una tech startup construyendo G-Struct.",
      lead: {
        a: "G-Struct convierte el método I-R-O™ en una plataforma cognitivo-conductual escalable para LATAM. Los servicios ",
        channels: "1:1, Enterprise y Workshop",
        b: " operan como canales de validación, datos cualitativos y revenue temprano para construir el producto principal.",
      },
      phoneCaption: "G-Struct · Prototipo activo · v0.1",
      phoneAnnotTop: "Motor de\nReestructuración",
      phoneAnnotBottom: "Diagnóstico\nde Ejecución",
    },
    opportunity: {
      eyebrow: "POR QUÉ AHORA",
      title: "La oportunidad.",
      stats: [
        { stat: "$67.94B", title: "Mercado global de software de productividad en 2024.", body: "Proyectado a $149.74B para 2030 — creciendo al 14.1% anual.", source: "Grand View Research, 2024" },
        { stat: "75%", title: "De mujeres high-performers en LATAM reportan impostor pattern.", body: "70% con ansiedad asociada. 50% con insomnio.", source: "Martínez Moreno, PUCP, 2026" },
        { stat: "33.37%", title: "Tasa de actividad emprendedora en Ecuador — #1 en LATAM.", body: "3.3 millones de ecuatorianos activamente emprendiendo.", source: "GEM Ecuador, 2024–2025" },
      ],
      priceCompareTitle: "Comparación de precio · Coaching CBT para individuos",
      priceBars: [
        { label: "BetterUp", value: "$279/mes" },
        { label: "Woebot (descontinuado)", value: "N/A — salió del mercado B2C" },
        { label: "Calm / Headspace", value: "$14/mes", note: "Bienestar — no coaching de ejecución" },
        { label: "G-Struct", value: "$20/mes", note: "CBT coaching · LATAM · móvil" },
      ],
      priceFoot: "BetterUp requiere sponsor corporativo. G-Struct es acceso individual directo.",
    },
    thesis: [
      { label: "Problema", title: "La ejecución se rompe antes de la tarea.", body: "El mercado ya compra productividad, coaching y bienestar, pero falta una capa cognitivo-conductual práctica para convertir fricción en acción." },
      { label: "Método", title: "I-R-O™ es el motor propietario.", body: "Identificar, Reencuadrar y Optimizar traduce principios CBT a una secuencia repetible que puede vivir en software." },
      { label: "Validación", title: "1:1 y Enterprise alimentan producto.", body: "Los canales de servicio no son el negocio final: generan revenue temprano, casos reales y datos cualitativos para G-Struct." },
      { label: "Escala", title: "G-Struct convierte el método en plataforma.", body: "El lanzamiento Q3 2026 apunta a un producto freemium de bajo costo para profesionales y equipos en LATAM." },
    ],
    product: {
      eyebrow: "QUÉ CONSTRUIMOS",
      title: "El producto.",
      p1: "G-Struct es una app móvil freemium que aplica el método I-R-O™ — Identificar, Reencuadrar, Optimizar — para ayudar a emprendedores y high-performers a identificar los patrones cognitivos que bloquean su ejecución y convertirlos en acción.",
      p2: "No es una app de bienestar. No es terapia. Es infraestructura de rendimiento cognitivo para el profesional latinoamericano.",
      bullets: [
        { highlight: "Woebot", rest: " cerró su versión consumer en junio 2025 — dejando un vacío directo en el mercado CBT B2C." },
        { highlight: "BetterUp", rest: " cobra desde $279/mes y requiere sponsor corporativo. G-Struct cuesta $20/mes." },
        { highlight: "Somos los únicos", rest: " construyendo esta categoría específicamente para LATAM, en español, desde Ecuador." },
      ],
    },
    traction: {
      eyebrow: "ESTADO ACTUAL",
      title: "Tracción y hoja de ruta.",
      progressLabel: "Progreso de validación",
      progressCount: (d, t) => `${d} de ${t} hitos completados`,
      milestones: [
        { tag: "✓ Completado", body: "Método I-R-O™ validado a través de sesiones de coaching reales con emprendedores y profesionales en Ecuador.", done: true },
        { tag: "✓ Activo", body: "Prototipo funcional construido. Primera cohorte de 8–10 testers en curso.", done: true },
        { tag: "Julio 14, 2026", body: "Evento de validación con 30 emprendedores, founders y estudiantes. Primera data estructurada de NPS, disposición a pagar y fit de categoría.", done: false },
        { tag: "Q3 2026", body: "Lanzamiento público en Ecuador. Primeros 1,000 usuarios en plataforma freemium.", done: false },
      ],
      badgeDone: "Completado",
      badgeNext: "Próximo",
    },
    round: {
      eyebrow: "LA RONDA",
      title: "Los términos.",
      terms: [
        { value: "$75,000", label: "Monto a levantar. Pre-seed." },
        { value: "$750,000", label: "Valoración pre-money." },
        { value: "10%", label: "Equity ofrecido." },
      ],
      milestone: "Milestone a 18 meses: 500 suscriptores de pago · $11,000 MRR · Modelo validado para expansión a Colombia y México.",
    },
    team: {
      eyebrow: "QUIÉNES SOMOS",
      title: "El equipo.",
      guillermo: {
        role: "Fundador & CEO",
        name: "Guillermo Suco",
        items: [
          "CBT Coach Practitioner · CTAA",
          "Estudios en Psicología e Intervención Educativa",
          "Ex Project Manager, GBA Ships",
          "Investigador publicado — MLS Pedagogy, Culture & Innovation (2025) · Recimundo (2025)",
          "Docente y orientador escolar en Ecuador y Estados Unidos",
          "Creador del prototipo G-Struct",
        ],
      },
      jericko: {
        role: "Desarrollador",
        name: "Jericko Solórzano",
        items: [
          "Python developer con portfolio activo en GitHub",
          "Formación en JavaScript, Java, C#",
          "SQL y arquitectura de datos en desarrollo activo",
          "Git, Figma — flujo de trabajo colaborativo",
          "Universidad de Guayaquil — etapa de fundación por equity",
        ],
      },
    },
    cta: {
      title: "¿Quieres conocer más?",
      body: "Si estás interesado en conocer el deck completo, los estados financieros proyectados o agendar una conversación con el equipo, escríbenos directamente.",
      primary: "Solicitar deck de inversión",
      secondary: "Agendar conversación",
      disclaimer: "Esta página contiene información preliminar para inversores calificados. No constituye una oferta pública de valores.",
      mailSubject: "Solicitud%20deck%20de%20inversi%C3%B3n%20G-Struct",
    },
  },
  en: {
    hero: {
      eyebrow: "INVESTORS · PRE-SEED 2026 · CORE ASSET: G-STRUCT",
      h1: "G-Structure is not a services firm. It is a tech startup building G-Struct.",
      lead: {
        a: "G-Struct turns the I-R-O™ Method into a scalable cognitive-behavioral platform for LATAM. The ",
        channels: "1:1, Enterprise, and Workshop",
        b: " services operate as validation, qualitative data, and early revenue channels to build the main product.",
      },
      phoneCaption: "G-Struct · Active prototype · v0.1",
      phoneAnnotTop: "Restructuring\nEngine",
      phoneAnnotBottom: "Execution\nDiagnostic",
    },
    opportunity: {
      eyebrow: "WHY NOW",
      title: "The opportunity.",
      stats: [
        { stat: "$67.94B", title: "Global productivity software market in 2024.", body: "Projected at $149.74B by 2030 — growing 14.1% annually.", source: "Grand View Research, 2024" },
        { stat: "75%", title: "Of LATAM women high-performers report impostor pattern.", body: "70% with associated anxiety. 50% with insomnia.", source: "Martínez Moreno, PUCP, 2026" },
        { stat: "33.37%", title: "Entrepreneurial activity rate in Ecuador — #1 in LATAM.", body: "3.3 million Ecuadorians actively building businesses.", source: "GEM Ecuador, 2024–2025" },
      ],
      priceCompareTitle: "Price comparison · CBT coaching for individuals",
      priceBars: [
        { label: "BetterUp", value: "$279/month" },
        { label: "Woebot (discontinued)", value: "N/A — exited B2C market" },
        { label: "Calm / Headspace", value: "$14/month", note: "Wellness — not execution coaching" },
        { label: "G-Struct", value: "$20/month", note: "CBT coaching · LATAM · mobile" },
      ],
      priceFoot: "BetterUp requires a corporate sponsor. G-Struct is direct individual access.",
    },
    thesis: [
      { label: "Problem", title: "Execution breaks before the task.", body: "The market already buys productivity, coaching, and wellness, but lacks a practical cognitive-behavioral layer for turning friction into action." },
      { label: "Method", title: "I-R-O™ is the proprietary engine.", body: "Identify, Reframe, and Optimize turns CBT principles into a repeatable sequence that can live inside software." },
      { label: "Validation", title: "1:1 and Enterprise feed the product.", body: "The service channels are not the end business: they create early revenue, real cases, and qualitative data for G-Struct." },
      { label: "Scale", title: "G-Struct turns the method into a platform.", body: "The Q3 2026 launch targets a low-cost freemium product for professionals and teams across LATAM." },
    ],
    product: {
      eyebrow: "WHAT WE BUILD",
      title: "The product.",
      p1: "G-Struct is a freemium mobile app that applies the I-R-O™ Method — Identify, Reframe, Optimize — to help entrepreneurs and high-performers spot the cognitive patterns blocking their execution and turn them into action.",
      p2: "It is not a wellness app. It is not therapy. It is cognitive performance infrastructure for the Latin American professional.",
      bullets: [
        { highlight: "Woebot", rest: " shut down its consumer version in June 2025 — leaving a direct gap in the CBT B2C market." },
        { highlight: "BetterUp", rest: " charges from $279/month and requires a corporate sponsor. G-Struct costs $20/month." },
        { highlight: "We are the only ones", rest: " building this category specifically for LATAM, in Spanish, from Ecuador." },
      ],
    },
    traction: {
      eyebrow: "CURRENT STATE",
      title: "Traction and roadmap.",
      progressLabel: "Validation progress",
      progressCount: (d, t) => `${d} of ${t} milestones completed`,
      milestones: [
        { tag: "✓ Completed", body: "I-R-O™ Method validated through real coaching sessions with entrepreneurs and professionals in Ecuador.", done: true },
        { tag: "✓ Active", body: "Functional prototype built. First cohort of 8–10 testers in progress.", done: true },
        { tag: "July 14, 2026", body: "Validation event with 30 entrepreneurs, founders, and students. First structured data on NPS, willingness to pay, and category fit.", done: false },
        { tag: "Q3 2026", body: "Public launch in Ecuador. First 1,000 users on the freemium platform.", done: false },
      ],
      badgeDone: "Completed",
      badgeNext: "Next",
    },
    round: {
      eyebrow: "THE ROUND",
      title: "The terms.",
      terms: [
        { value: "$75,000", label: "Amount to raise. Pre-seed." },
        { value: "$750,000", label: "Pre-money valuation." },
        { value: "10%", label: "Equity offered." },
      ],
      milestone: "18-month milestone: 500 paying subscribers · $11,000 MRR · Model validated for expansion to Colombia and Mexico.",
    },
    team: {
      eyebrow: "WHO WE ARE",
      title: "The team.",
      guillermo: {
        role: "Founder & CEO",
        name: "Guillermo Suco",
        items: [
          "CBT Coach Practitioner · CTAA",
          "Studies in Psychology and Educational Intervention",
          "Former Project Manager, GBA Ships",
          "Published researcher — MLS Pedagogy, Culture & Innovation (2025) · Recimundo (2025)",
          "Teacher and school counselor in Ecuador and the United States",
          "Creator of the G-Struct prototype",
        ],
      },
      jericko: {
        role: "Developer",
        name: "Jericko Solórzano",
        items: [
          "Python developer with an active GitHub portfolio",
          "Background in JavaScript, Java, C#",
          "SQL and data architecture in active development",
          "Git, Figma — collaborative workflow",
          "Universidad de Guayaquil — founding-stage equity collaborator",
        ],
      },
    },
    cta: {
      title: "Want to learn more?",
      body: "If you’re interested in the full deck, projected financials, or scheduling a conversation with the team, write to us directly.",
      primary: "Request investor deck",
      secondary: "Book a conversation",
      disclaimer: "This page contains preliminary information for qualified investors. It does not constitute a public offering of securities.",
      mailSubject: "G-Struct%20investor%20deck%20request",
    },
  },
};

function PhoneMockup({
  copy,
  className = "",
  widthClass = "w-[220px]",
}: {
  copy: Copy["hero"];
  className?: string;
  widthClass?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="hidden lg:flex absolute -left-[140px] top-[18%] items-center gap-2 w-[200px] justify-end">
        <span className="text-[11px] tracking-wide text-muted-foreground text-right leading-tight whitespace-pre-line">
          {copy.phoneAnnotTop}
        </span>
        <span className="block h-px w-10 bg-border" aria-hidden />
      </div>
      <div className="hidden lg:flex absolute -right-[140px] bottom-[22%] items-center gap-2 w-[200px]">
        <span className="block h-px w-10 bg-border" aria-hidden />
        <span className="text-[11px] tracking-wide text-muted-foreground leading-tight whitespace-pre-line">
          {copy.phoneAnnotBottom}
        </span>
      </div>
      <div className={`${widthClass} mx-auto`}>
        <div className="relative aspect-[9/19] rounded-[34px] bg-[#1A1A1A] p-[10px] shadow-none">
          <div className="absolute left-1/2 top-[10px] -translate-x-1/2 h-[18px] w-[78px] rounded-full bg-[#0a0a0a] z-10" aria-hidden />
          <div className="relative h-full w-full overflow-hidden rounded-[26px] bg-background">
            <img src={gStructHomePreview} alt="G-Struct" className="h-full w-full object-cover object-top" loading="lazy" />
            <span className="pointer-events-none absolute inset-0 rounded-[26px] border border-white/10" aria-hidden />
          </div>
        </div>
        <p className="mt-4 text-center text-[11px] tracking-wide text-muted-foreground">{copy.phoneCaption}</p>
      </div>
    </div>
  );
}

function PriceBar({
  label, value, widthPct, variant = "muted", note, dashed = false,
}: { label: string; value: string; widthPct: number; variant?: "muted" | "brand"; note?: string; dashed?: boolean }) {
  const isBrand = variant === "brand";
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 mb-2">
        <p className={`text-[13px] ${isBrand ? "font-semibold text-foreground" : "text-foreground/85"}`}>{label}</p>
        <p className={`text-[12px] tabular-nums ${isBrand ? "font-semibold text-[color:var(--color-brand-deep)]" : "text-muted-foreground"}`}>{value}</p>
      </div>
      <div className="h-3 w-full bg-border/40">
        <div
          className={`h-full ${dashed ? "border border-dashed border-border bg-transparent" : isBrand ? "bg-[color:var(--color-brand)]" : "bg-foreground/35"}`}
          style={{ width: `${Math.max(widthPct, dashed ? 30 : 4)}%` }}
          aria-hidden
        />
      </div>
      {note ? <p className="mt-2 text-[11px] text-muted-foreground">{note}</p> : null}
    </div>
  );
}

function PriceComparison({ copy }: { copy: Copy["opportunity"] }) {
  const max = 279;
  // value->numeric for bar width
  const widths = [279, 0, 14, 20];
  const variants: ("muted" | "brand")[] = ["muted", "muted", "muted", "brand"];
  const dashed = [false, true, false, false];
  return (
    <div className="mt-12 border border-border bg-[color:var(--color-surface)] p-7 md:p-9">
      <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-muted-foreground">{copy.priceCompareTitle}</p>
      <div className="mt-6 space-y-6">
        {copy.priceBars.map((b, i) => (
          <PriceBar
            key={b.label}
            label={b.label}
            value={b.value}
            widthPct={(widths[i] / max) * 100}
            variant={variants[i]}
            note={b.note}
            dashed={dashed[i]}
          />
        ))}
      </div>
      <p className="mt-7 pt-5 border-t border-border/60 text-[12px] text-muted-foreground leading-relaxed">{copy.priceFoot}</p>
    </div>
  );
}

function StatCard({ stat, title, body, source }: { stat: string; title: string; body: string; source?: string }) {
  return (
    <div className="group relative border border-border bg-[color:var(--color-surface)] p-7 md:p-9 flex flex-col transition-shadow duration-200 hover:shadow-elev-1 focus-within:shadow-elev-1">
      <span className="absolute inset-x-0 top-0 h-[3px] bg-[color:var(--color-brand)]" aria-hidden />
      <p className="font-display text-5xl md:text-6xl lg:text-[4rem] font-medium text-foreground leading-none tracking-tight">{stat}</p>
      <p className="mt-5 text-xs font-semibold tracking-[0.18em] uppercase text-foreground/70">{title}</p>
      <p className="mt-3 text-sm text-foreground/85 leading-relaxed">{body}</p>
      {source ? <p className="mt-6 pt-4 border-t border-border/60 text-[11px] tracking-wide text-muted-foreground">{source}</p> : null}
    </div>
  );
}

function TermCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="border border-border bg-[color:var(--color-surface)] p-8 transition-shadow duration-200 hover:shadow-elev-1">
      <p className="font-display text-4xl md:text-5xl font-medium text-foreground leading-none tracking-tight">{value}</p>
      <p className="mt-4 text-xs tracking-wide text-muted-foreground">{label}</p>
    </div>
  );
}

function MilestoneBadge({ kind, copy }: { kind: "done" | "next"; copy: Copy["traction"] }) {
  if (kind === "done") {
    return (
      <span className="inline-block px-2 py-0.5 text-[10px] font-semibold tracking-[0.14em] uppercase rounded-full bg-[color:var(--color-brand)] text-[color:var(--color-background)]">
        {copy.badgeDone}
      </span>
    );
  }
  return (
    <span className="inline-block px-2 py-0.5 text-[10px] font-semibold tracking-[0.14em] uppercase rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/40">
      {copy.badgeNext}
    </span>
  );
}

function TimelineNode({
  tag, body, done, isNext, isLast, copy,
}: { tag: string; body: string; done: boolean; isNext: boolean; isLast: boolean; copy: Copy["traction"] }) {
  return (
    <li className="relative grid grid-cols-[auto_1fr] gap-x-6 pb-10 last:pb-0">
      {!isLast && (
        <span
          className={`absolute left-[11px] top-6 bottom-0 w-px ${done ? "bg-[color:var(--color-brand)]" : "border-l border-dashed border-border"}`}
          aria-hidden
        />
      )}
      <span
        className={`relative z-10 mt-1 h-6 w-6 rounded-full border-2 ${done ? "bg-[color:var(--color-brand)] border-[color:var(--color-brand)]" : "bg-background border-[color:var(--color-brand)]"}`}
        aria-hidden
      />
      <div className={done ? "" : "opacity-90"}>
        <div className="flex flex-wrap items-center gap-2">
          <p className={`font-display text-[11px] font-semibold tracking-[0.22em] uppercase ${done ? "text-[color:var(--color-brand)]" : "text-muted-foreground"}`}>{tag}</p>
          {done ? <MilestoneBadge kind="done" copy={copy} /> : null}
          {isNext ? <MilestoneBadge kind="next" copy={copy} /> : null}
        </div>
        <p className="mt-3 text-base md:text-[17px] text-foreground/85 leading-relaxed">{body}</p>
      </div>
    </li>
  );
}

function ValidationProgress({ done, total, copy }: { done: number; total: number; copy: Copy["traction"] }) {
  const pct = Math.round((done / total) * 100);
  return (
    <div className="mt-10 max-w-3xl">
      <div className="flex items-center justify-between gap-4 mb-3">
        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-muted-foreground">{copy.progressLabel}</p>
        <p className="text-[12px] tabular-nums text-foreground/85">{copy.progressCount(done, total)}</p>
      </div>
      <div className="h-2 w-full bg-border/50 overflow-hidden">
        <div className="h-full bg-[color:var(--color-brand)] transition-[width] duration-500" style={{ width: `${pct}%` }} aria-hidden />
      </div>
    </div>
  );
}

function TeamCard({ role, name, items, photo }: { role: string; name: string; items: string[]; photo?: string }) {
  return (
    <div className="border border-border bg-[color:var(--color-surface)] p-8 transition-shadow duration-200 hover:shadow-elev-1">
      <div className="flex items-start gap-4">
        {photo ? (
          <img src={photo} alt={name} className="h-16 w-16 rounded-full object-cover border border-border" loading="lazy" />
        ) : (
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--color-brand)] text-[color:var(--color-background)] font-display text-sm font-semibold tracking-wider" aria-hidden>
            {name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
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
          <li key={i} className={`py-2.5 ${i < items.length - 1 ? "border-b border-border/50" : ""}`}>{it}</li>
        ))}
      </ul>
    </div>
  );
}

export function InvestorsPage({ locale, contactTo }: { locale: Locale; contactTo: string }) {
  const c = COPY[locale];
  const doneCount = c.traction.milestones.filter((m) => m.done).length;
  const nextIndex = c.traction.milestones.findIndex((m) => !m.done);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border bg-background">
        <div className="absolute inset-0 grid-bg opacity-30" aria-hidden />
        <div className="container-x relative py-24 md:py-32">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-12 items-center">
            <div className="lg:col-span-8">
              <div className="border-l-2 border-[color:var(--color-brand)] pl-4">
                <Eyebrow className="!mt-0">{c.hero.eyebrow}</Eyebrow>
              </div>
              <h1 className="mt-8 max-w-3xl font-display text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.05] text-foreground">
                {c.hero.h1}
              </h1>
              <div className="mt-10 h-px w-24 bg-[color:var(--color-brand)]" aria-hidden />
              <p className="mt-10 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
                {c.hero.lead.a}
                <strong className="text-foreground">{c.hero.lead.channels}</strong>
                {c.hero.lead.b}
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <PhoneMockup copy={c.hero} className="md:px-[140px] lg:px-0" widthClass="w-[160px] md:w-[220px]" />
            </div>
          </div>
        </div>
      </section>

      {/* OPPORTUNITY */}
      <Section className="!py-16 md:!py-24">
        <div className="grid gap-px border border-border bg-border md:grid-cols-4">
          {c.thesis.map((item) => (
            <div key={item.label} className="bg-[color:var(--color-surface)] p-6 md:p-7">
              <p className="font-display text-[10px] font-semibold tracking-[0.22em] uppercase text-[color:var(--color-brand)]">{item.label}</p>
              <h2 className="mt-3 font-display text-lg md:text-xl leading-tight text-foreground">{item.title}</h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* OPPORTUNITY */}
      <Section tone="muted" className="!py-20 md:!py-32">
        <Eyebrow>{c.opportunity.eyebrow}</Eyebrow>
        <h2 className="mt-4 max-w-3xl font-display text-3xl md:text-4xl leading-[1.08]">{c.opportunity.title}</h2>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {c.opportunity.stats.map((s) => (
            <StatCard key={s.stat} stat={s.stat} title={s.title} body={s.body} source={s.source} />
          ))}
        </div>
        <PriceComparison copy={c.opportunity} />
      </Section>

      {/* PRODUCT */}
      <Section className="!py-20 md:!py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow>{c.product.eyebrow}</Eyebrow>
            <h2 className="mt-4 font-display text-3xl md:text-4xl leading-[1.08]">{c.product.title}</h2>
            <div className="mt-6 space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>{c.product.p1}</p>
              <p className="text-foreground/85">{c.product.p2}</p>
            </div>
          </div>
          <div className="lg:col-span-5">
            <ul className="space-y-3">
              {c.product.bullets.map((d) => (
                <li key={d.highlight} className="flex gap-3 border border-border bg-[color:var(--color-surface)] px-5 py-4">
                  <Check className="mt-1 h-4 w-4 flex-none text-[color:var(--color-brand)]" aria-hidden />
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

      {/* TRACTION */}
      <Section tone="muted" className="!py-20 md:!py-32">
        <Eyebrow>{c.traction.eyebrow}</Eyebrow>
        <h2 className="mt-4 max-w-3xl font-display text-3xl md:text-4xl leading-[1.08]">{c.traction.title}</h2>
        <ValidationProgress done={doneCount} total={c.traction.milestones.length} copy={c.traction} />
        <ol className="mt-12 max-w-3xl">
          {c.traction.milestones.map((m, i, arr) => (
            <TimelineNode
              key={m.tag}
              tag={m.tag}
              body={m.body}
              done={m.done}
              isNext={i === nextIndex}
              isLast={i === arr.length - 1}
              copy={c.traction}
            />
          ))}
        </ol>
      </Section>

      {/* ROUND */}
      <Section className="!py-20 md:!py-32">
        <Eyebrow>{c.round.eyebrow}</Eyebrow>
        <h2 className="mt-4 max-w-3xl font-display text-3xl md:text-4xl leading-[1.08]">{c.round.title}</h2>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {c.round.terms.map((t) => (
            <TermCard key={t.label} value={t.value} label={t.label} />
          ))}
        </div>
        <div className="mt-10 max-w-3xl border-l-2 border-[color:var(--color-brand)] bg-[color:var(--color-brand-soft)]/40 px-6 py-5">
          <p className="text-base text-foreground/85 leading-relaxed">{c.round.milestone}</p>
        </div>
      </Section>

      {/* TEAM */}
      <Section tone="muted" className="!py-20 md:!py-32">
        <Eyebrow>{c.team.eyebrow}</Eyebrow>
        <h2 className="mt-4 max-w-3xl font-display text-3xl md:text-4xl leading-[1.08]">{c.team.title}</h2>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <TeamCard role={c.team.guillermo.role} name={c.team.guillermo.name} items={c.team.guillermo.items} photo={guillermoPhoto} />
          <TeamCard role={c.team.jericko.role} name={c.team.jericko.name} items={c.team.jericko.items} />
        </div>
      </Section>

      <Section className="!py-16 md:!py-20">
        <div className="border border-border bg-[color:var(--color-surface)] p-7 md:p-8">
          <Eyebrow>{locale === "en" ? "EARLY SUPPORT" : "APOYO TEMPRANO"}</Eyebrow>
          <h2 className="mt-3 max-w-3xl font-display text-2xl md:text-3xl leading-tight">
            {locale === "en" ? "Support the launch before the formal investment round." : "Apoya el lanzamiento antes de una ronda formal de inversion."}
          </h2>
          <p className="mt-4 max-w-3xl text-sm md:text-base text-muted-foreground leading-relaxed">
            {locale === "en"
              ? "For early believers who want to help validate the workshop, strengthen the prototype, and move G-Struct toward MVP without receiving equity or financial return."
              : "Para early believers que quieren ayudar a validar el workshop, fortalecer el prototipo y llevar G-Struct hacia MVP sin recibir equity ni retorno financiero."}
          </p>
          <CTALink
            to={locale === "en" ? "/en" : "/"}
            hash="support-launch"
            variant="outline"
            className="mt-6"
          >
            {locale === "en" ? "Support G-Structure" : "Apoya G-Structure"}
          </CTALink>
        </div>
      </Section>

      {/* FINAL CTA */}
      <Section tone="deep" className="!py-24 md:!py-36">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05]">{c.cta.title}</h2>
          <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg text-[color:var(--color-background)]/80 leading-relaxed">{c.cta.body}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <CTAExternal
              href={`mailto:guillermo@g-structure.co?subject=${c.cta.mailSubject}`}
              variant="inverse"
              analyticsLabel="investor_deck_request"
              onClick={() => trackConversion("investor_interest", { action: "deck_request", locale })}
            >
              {c.cta.primary}
            </CTAExternal>
            <CTALink
              to={contactTo}
              variant="ghost"
              analyticsLabel="investor_book_conversation"
              className="text-[color:var(--color-background)] hover:bg-[color:var(--color-background)]/10"
              onClick={() => trackConversion("investor_interest", { action: "book_conversation", locale })}
            >
              {c.cta.secondary}
            </CTALink>
          </div>
          <p className="mx-auto mt-12 max-w-2xl text-xs text-[color:var(--color-background)]/75 leading-relaxed">{c.cta.disclaimer}</p>
        </div>
      </Section>
    </>
  );
}
