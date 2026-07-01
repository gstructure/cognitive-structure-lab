import { Eyebrow } from "@/components/site/Eyebrow";
import { CTALink, CTAExternal } from "@/components/site/CTAButton";
import { Section } from "@/components/site/Section";
import { Check } from "lucide-react";
import kaironLogo from "@/assets/kairon-logo.webp";
import kaiMascot from "@/assets/kai-mascot.webp";
import mockupOnboarding from "@/assets/kairon-mvp-onboarding.webp";
import mockupScannerReport from "@/assets/kairon-mvp-scanner-report.webp";
import mockupFilter from "@/assets/kairon-mvp-filter.webp";
import mockupProtocol from "@/assets/kairon-mvp-protocol.webp";
import mockupActionBridge from "@/assets/kairon-mvp-action-bridge.webp";
import mockupOnboardingEn from "@/assets/kairon-mvp-onboarding-en.webp";
import mockupScannerReportEn from "@/assets/kairon-mvp-scanner-report-en.webp";
import mockupFilterEn from "@/assets/kairon-mvp-filter-en.webp";
import mockupProtocolEn from "@/assets/kairon-mvp-protocol-en.webp";
import mockupActionBridgeEn from "@/assets/kairon-mvp-action-bridge-en.webp";
import guillermoPhoto from "@/assets/guillermo-suco.webp";
import nathanaelPhoto from "@/assets/nathanael-guy.webp";
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
    kaiTitle: string;
    kaiBody: string;
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
    nathanael: { role: string; name: string; items: string[] };
  };
  support: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
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
      eyebrow: "INVERSORES · PRE-SEED 2026 · CORE ASSET: KAIRON",
      h1: "G-Structure está construyendo KAIRON: un Cognitive OS para convertir fricción mental en ejecución.",
      lead: {
        a: "KAIRON convierte el método I-R-O™ en un sistema operativo cognitivo-conductual guiado por Kai. Los canales ",
        channels: "1:1, Enterprise, Workshop y apoyo temprano",
        b: " existen para validar casos reales, generar revenue temprano y alimentar el MVP.",
      },
      phoneCaption: "KAIRON · MVP activo · Kai como capa operativa",
      phoneAnnotTop: "Escáner de\nEjecución",
      phoneAnnotBottom: "Kai guía el\nsiguiente movimiento",
    },
    opportunity: {
      eyebrow: "POR QUÉ AHORA",
      title: "La oportunidad.",
      stats: [
        { stat: "$67.94B", title: "Mercado global de software de productividad en 2024.", body: "Proyectado a $149.74B para 2030, con crecimiento anual estimado de 14.1%.", source: "Grand View Research, 2024" },
        { stat: "33.37%", title: "Tasa de actividad emprendedora en Ecuador, #1 en LATAM.", body: "3.3 millones de ecuatorianos emprendiendo activamente: un mercado natural para herramientas de ejecución.", source: "GEM Ecuador, 2024-2025" },
        { stat: "Q3 2026", title: "Ventana de lanzamiento y validación.", body: "Workshop en Ecuador Tech Week, cohort de testers y preparación para CodeLaunch LATAM 2026.", source: "Roadmap G-Structure" },
      ],
      priceCompareTitle: "Comparación de acceso · ejecución guiada por IA",
      priceBars: [
        { label: "BetterUp", value: "$279/mes" },
        { label: "Woebot (B2C cerrado)", value: "N/A" },
        { label: "Calm / Headspace", value: "$14/mes", note: "Bienestar, no ejecución guiada." },
        { label: "KAIRON", value: "$20/mes", note: "Cognitive OS · LATAM · móvil · guiado por Kai." },
      ],
      priceFoot: "BetterUp requiere sponsor corporativo. KAIRON apunta a acceso individual directo y a pilotos de equipo.",
    },
    thesis: [
      { label: "Problema", title: "La ejecución se rompe antes de la tarea.", body: "La mayoría de herramientas organiza lo externo. KAIRON interviene la fricción interna: pensamientos, reglas, bloqueos y costo mental antes de actuar." },
      { label: "Método", title: "I-R-O™ es el motor propietario.", body: "Identificar, Reencuadrar y Optimizar traduce metodología cognitivo-conductual en una secuencia repetible para software." },
      { label: "Producto", title: "Kai convierte método en experiencia.", body: "Kai no es un chatbot decorativo. Es la capa operativa que interpreta, guía, ordena y convierte insight en siguiente movimiento." },
      { label: "Escala", title: "KAIRON nace desde Ecuador para LATAM.", body: "Servicios, workshops y Enterprise validan la categoría; el negocio escalable es el Cognitive OS de ejecución." },
    ],
    product: {
      eyebrow: "QUÉ CONSTRUIMOS",
      title: "KAIRON es el producto.",
      p1: "KAIRON es un Cognitive Operating System para ejecución. Ayuda a founders, profesionales y equipos a escanear su fricción mental, filtrar pensamientos bloqueantes, trabajar patrones repetidos y cerrar cada sesión con un Puente de Acción de 5 minutos.",
      p2: "No es un task manager, no es journaling genérico y no es terapia. Es infraestructura cognitivo-conductual aplicada a productividad, claridad y ejecución profesional.",
      bullets: [
        { highlight: "Kai", rest: " funciona como coach de ejecución dentro del producto: pregunta, interpreta, ordena y guía sin convertirse en terapeuta." },
        { highlight: "El loop I-R-O™", rest: " convierte fricción en acción: Identificar el patrón, Reencuadrar la lectura y Optimizar la salida conductual." },
        { highlight: "La ventaja regional", rest: " es construir esta categoría en español, desde Ecuador, para un mercado LATAM que ya compra productividad, coaching y bienestar." },
      ],
      kaiTitle: "Kai es la interfaz de confianza.",
      kaiBody: "El usuario no entra a KAIRON para llenar otra lista. Entra para que Kai le ayude a leer la fricción, escoger la herramienta correcta y salir con un movimiento accionable.",
    },
    traction: {
      eyebrow: "ESTADO ACTUAL",
      title: "Tracción y hoja de ruta.",
      progressLabel: "Progreso de validación",
      progressCount: (d, t) => `${d} de ${t} hitos completados`,
      milestones: [
        { tag: "✓ Completado", body: "Método I-R-O™ validado en sesiones reales con emprendedores, profesionales y perfiles de alta exigencia en Ecuador.", done: true },
        { tag: "✓ Activo", body: "MVP de KAIRON activo con onboarding, reporte de Escáner, Filtro, Protocolo, Acción Puente y presencia de Kai.", done: true },
        { tag: "Julio 14, 2026", body: "Workshop de Diagnóstico de Ejecución dentro de Ecuador Tech Week: validación pública de categoría, lenguaje y disposición a pagar.", done: false },
        { tag: "Q3 2026", body: "Lanzamiento inicial de KAIRON en Ecuador con primeros testers, lista de espera y medición de activación, retención y conversión.", done: false },
      ],
      badgeDone: "Completado",
      badgeNext: "Próximo",
    },
    round: {
      eyebrow: "LA RONDA",
      title: "Los términos.",
      terms: [
        { value: "$110,000", label: "Monto a levantar. Pre-seed para 12 meses." },
        { value: "$990,000", label: "Valoración pre-money." },
        { value: "10%", label: "Equity ofrecido." },
      ],
      milestone: "Milestone a 12 meses: MVP lanzado · 500 suscriptores de pago · $10,000 MRR · 3 pilotos Enterprise · modelo validado para expansión a Colombia y México.",
    },
    team: {
      eyebrow: "QUIÉNES SOMOS",
      title: "El equipo.",
      guillermo: {
        role: "Founder & CEO",
        name: "Guillermo Suco",
        items: [
          "CBT Coach Practitioner · CTAA",
          "Estudios en Psicología · Máster en Intervención Psicológica en Desarrollo y Educación",
          "Ex Project Manager, GBA Ships",
          "Investigador publicado: MLS Pedagogy, Culture & Innovation (2025) · Recimundo (2025)",
          "Docente y orientador escolar en Ecuador y Estados Unidos",
          "Creador del método I-R-O™ y del concepto de KAIRON",
        ],
      },
      nathanael: {
        role: "Co-Founder & Head of Customer Discovery",
        name: "Nathanael Guy",
        items: [
          "Graduado de Temple University en Educación Secundaria",
          "Experiencia en docencia, servicio al cliente y liderazgo de proyectos",
          "Lidera customer discovery, conversaciones con usuarios y validación cualitativa",
          "Aporta experiencia directa sobre procrastinación y patrones de impostor",
          "Ayuda a mantener KAIRON conectado con usuarios reales, fricción real y problemas de ejecución que vale la pena resolver",
        ],
      },
    },
    support: {
      eyebrow: "APOYO TEMPRANO",
      title: "Apoya el lanzamiento antes de una ronda formal de inversión.",
      body: "Para early believers que quieren ayudar a validar el workshop, fortalecer el MVP de KAIRON y sostener la siguiente etapa sin recibir equity ni retorno financiero.",
      cta: "Apoya G-Structure",
    },
    cta: {
      title: "¿Quieres conocer más?",
      body: "Si quieres revisar el deck completo, las proyecciones financieras o conversar sobre la ronda pre-seed, escríbenos directamente.",
      primary: "Solicitar deck de inversión",
      secondary: "Agendar conversación",
      disclaimer: "Esta página contiene información preliminar para inversores calificados. No constituye una oferta pública de valores.",
      mailSubject: "Solicitud%20deck%20de%20inversi%C3%B3n%20KAIRON",
    },
  },
  en: {
    hero: {
      eyebrow: "INVESTORS · PRE-SEED 2026 · CORE ASSET: KAIRON",
      h1: "G-Structure is building KAIRON: a Cognitive OS for turning mental friction into execution.",
      lead: {
        a: "KAIRON turns the I-R-O™ Method into an AI-guided cognitive-behavioral operating system. The ",
        channels: "1:1, Enterprise, Workshop, and early support",
        b: " channels validate real cases, generate early revenue, and feed the MVP.",
      },
      phoneCaption: "KAIRON · Live MVP · Kai as the operating layer",
      phoneAnnotTop: "Execution\nScanner",
      phoneAnnotBottom: "Kai guides the\nnext movement",
    },
    opportunity: {
      eyebrow: "WHY NOW",
      title: "The opportunity.",
      stats: [
        { stat: "$67.94B", title: "Global productivity software market in 2024.", body: "Projected at $149.74B by 2030, with estimated 14.1% annual growth.", source: "Grand View Research, 2024" },
        { stat: "33.37%", title: "Entrepreneurial activity rate in Ecuador, #1 in LATAM.", body: "3.3 million Ecuadorians actively building businesses: a natural market for execution tools.", source: "GEM Ecuador, 2024-2025" },
        { stat: "Q3 2026", title: "Launch and validation window.", body: "Ecuador Tech Week workshop, tester cohort, and preparation for CodeLaunch LATAM 2026.", source: "G-Structure roadmap" },
      ],
      priceCompareTitle: "Access comparison · AI-guided execution",
      priceBars: [
        { label: "BetterUp", value: "$279/month" },
        { label: "Woebot (B2C closed)", value: "N/A" },
        { label: "Calm / Headspace", value: "$14/month", note: "Wellness, not guided execution." },
        { label: "KAIRON", value: "$20/month", note: "Cognitive OS · LATAM · mobile · guided by Kai." },
      ],
      priceFoot: "BetterUp requires a corporate sponsor. KAIRON targets direct individual access and team pilots.",
    },
    thesis: [
      { label: "Problem", title: "Execution breaks before the task.", body: "Most tools organize the outside. KAIRON intervenes the inside: thoughts, rules, blocks, and mental cost before action." },
      { label: "Method", title: "I-R-O™ is the proprietary engine.", body: "Identify, Reframe, and Optimize turns cognitive-behavioral methodology into a repeatable software sequence." },
      { label: "Product", title: "Kai turns method into experience.", body: "Kai is not a decorative chatbot. It is the operating layer that interprets, guides, orders, and converts insight into the next movement." },
      { label: "Scale", title: "KAIRON is built from Ecuador for LATAM.", body: "Services, workshops, and Enterprise validate the category; the scalable business is the Cognitive OS for execution." },
    ],
    product: {
      eyebrow: "WHAT WE BUILD",
      title: "KAIRON is the product.",
      p1: "KAIRON is a Cognitive Operating System for execution. It helps founders, professionals, and teams scan mental friction, filter blocking thoughts, work repeated patterns, and close each session with a 5-minute Action Bridge.",
      p2: "It is not a task manager, generic journaling, or therapy. It is cognitive-behavioral infrastructure applied to productivity, clarity, and professional execution.",
      bullets: [
        { highlight: "Kai", rest: " works as an execution coach inside the product: asking, interpreting, ordering, and guiding without becoming a therapist." },
        { highlight: "The I-R-O™ loop", rest: " turns friction into action: Identify the pattern, Reframe the reading, and Optimize the behavioral output." },
        { highlight: "The regional edge", rest: " is building this category in Spanish, from Ecuador, for a LATAM market already buying productivity, coaching, and wellness." },
      ],
      kaiTitle: "Kai is the trust interface.",
      kaiBody: "The user does not open KAIRON to fill another list. They open it so Kai can read the friction, choose the right tool, and help them leave with an actionable movement.",
    },
    traction: {
      eyebrow: "CURRENT STATE",
      title: "Traction and roadmap.",
      progressLabel: "Validation progress",
      progressCount: (d, t) => `${d} of ${t} milestones completed`,
      milestones: [
        { tag: "✓ Completed", body: "I-R-O™ Method validated through real sessions with entrepreneurs, professionals, and high-demand profiles in Ecuador.", done: true },
        { tag: "✓ Active", body: "KAIRON live MVP with onboarding, Scanner report, Filter, Protocol, Action Bridge, and Kai presence.", done: true },
        { tag: "July 14, 2026", body: "Execution Diagnostic Workshop inside Ecuador Tech Week: public validation of category, language, and willingness to pay.", done: false },
        { tag: "Q3 2026", body: "Initial KAIRON launch in Ecuador with first testers, waitlist, and measurement of activation, retention, and conversion.", done: false },
      ],
      badgeDone: "Completed",
      badgeNext: "Next",
    },
    round: {
      eyebrow: "THE ROUND",
      title: "The terms.",
      terms: [
        { value: "$110,000", label: "Amount to raise. 12-month pre-seed." },
        { value: "$990,000", label: "Pre-money valuation." },
        { value: "10%", label: "Equity offered." },
      ],
      milestone: "12-month milestone: MVP launched · 500 paying subscribers · $10,000 MRR · 3 Enterprise pilots · model validated for expansion to Colombia and Mexico.",
    },
    team: {
      eyebrow: "WHO WE ARE",
      title: "The team.",
      guillermo: {
        role: "Founder & CEO",
        name: "Guillermo Suco",
        items: [
          "CBT Coach Practitioner · CTAA",
          "Studies in Psychology · Master's in Psychological Intervention in Development and Education",
          "Former Project Manager, GBA Ships",
          "Published researcher: MLS Pedagogy, Culture & Innovation (2025) · Recimundo (2025)",
          "Teacher and school counselor in Ecuador and the United States",
          "Creator of the I-R-O™ Method and the KAIRON concept",
        ],
      },
      nathanael: {
        role: "Co-Founder & Head of Customer Discovery",
        name: "Nathanael Guy",
        items: [
          "Temple University graduate in Secondary Education",
          "Experience in teaching, customer service, and project leadership",
          "Leads customer discovery, user conversations, and qualitative validation",
          "Brings firsthand insight into procrastination and impostor patterns",
          "Helps keep KAIRON grounded in real users, real friction, and execution problems worth solving",
        ],
      },
    },
    support: {
      eyebrow: "EARLY SUPPORT",
      title: "Support the launch before the formal investment round.",
      body: "For early believers who want to help validate the workshop, strengthen the KAIRON MVP, and support the next stage without receiving equity or financial return.",
      cta: "Support G-Structure",
    },
    cta: {
      title: "Want to learn more?",
      body: "If you want to review the full deck, projected financials, or discuss the pre-seed round, write to us directly.",
      primary: "Request investor deck",
      secondary: "Book a conversation",
      disclaimer: "This page contains preliminary information for qualified investors. It does not constitute a public offering of securities.",
      mailSubject: "KAIRON%20investor%20deck%20request",
    },
  },
};

const productScreens: Record<Locale, { src: string; title: string; body: string }[]> = {
  es: [
    { src: mockupOnboarding, title: "Onboarding", body: "La entrada al Cognitive OS y la promesa central de ejecución." },
    { src: mockupScannerReport, title: "Escáner + reporte", body: "Visualiza fricción, mapa de patrones y lectura dominante." },
    { src: mockupFilter, title: "Filtro", body: "Kai guía el reencuadre en tiempo real para destrabar la siguiente acción." },
    { src: mockupProtocol, title: "Protocolo", body: "Programa guiado para reestructurar patrones con continuidad." },
    { src: mockupActionBridge, title: "Acción Puente", body: "Convierte insight en una acción concreta de 5 minutos." },
  ],
  en: [
    { src: mockupOnboardingEn, title: "Onboarding", body: "The entry into the Cognitive OS and its core execution promise." },
    { src: mockupScannerReportEn, title: "Scanner + report", body: "Shows friction, pattern map, and the dominant reading." },
    { src: mockupFilterEn, title: "Filter", body: "Kai guides real-time reframing to unlock the next action." },
    { src: mockupProtocolEn, title: "Protocol", body: "A guided program to restructure patterns with continuity." },
    { src: mockupActionBridgeEn, title: "Action Bridge", body: "Turns insight into a concrete 5-minute action." },
  ],
};
function PhoneMockup({
  copy,
  className = "",
  widthClass = "w-[240px]",
}: {
  copy: Copy["hero"];
  className?: string;
  widthClass?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="hidden lg:flex absolute -left-[150px] top-[18%] items-center gap-2 w-[210px] justify-end">
        <span className="text-[11px] tracking-wide text-muted-foreground text-right leading-tight whitespace-pre-line">
          {copy.phoneAnnotTop}
        </span>
        <span className="block h-px w-10 bg-border" aria-hidden />
      </div>
      <div className="hidden lg:flex absolute -right-[150px] bottom-[22%] items-center gap-2 w-[210px]">
        <span className="block h-px w-10 bg-border" aria-hidden />
        <span className="text-[11px] tracking-wide text-muted-foreground leading-tight whitespace-pre-line">
          {copy.phoneAnnotBottom}
        </span>
      </div>
      <div className={`${widthClass} mx-auto`}>
        <div className="relative overflow-hidden border border-[color:var(--color-brand-deep)] bg-[color:var(--color-brand-deep)] shadow-none">
          <img src={copy.phoneCaption.includes("Live MVP") ? mockupOnboardingEn : mockupOnboarding} alt="KAIRON MVP onboarding screen" className="h-auto w-full object-cover" loading="eager" width={945} height={1680} />
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

function ProductGallery({ locale }: { locale: Locale }) {
  return (
    <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {productScreens[locale].map((screen) => (
        <figure key={screen.title} className="overflow-hidden border border-border bg-[color:var(--color-surface)]">
          <img
            src={screen.src}
            alt={`${screen.title} KAIRON MVP screen`}
            loading="lazy"
            width={1600}
            height={900}
            className="aspect-video w-full object-cover"
          />
          <figcaption className="border-t border-border/70 p-5">
            <p className="font-display text-sm font-semibold tracking-wide text-foreground">{screen.title}</p>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{screen.body}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function InvestorsPage({ locale, contactTo }: { locale: Locale; contactTo: string }) {
  const c = COPY[locale];
  const doneCount = c.traction.milestones.filter((m) => m.done).length;
  const nextIndex = c.traction.milestones.findIndex((m) => !m.done);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-background">
        <div className="absolute inset-0 grid-bg opacity-30" aria-hidden />
        <div className="container-x relative py-24 md:py-32">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="mb-8 flex items-center gap-4">
                <img src={kaironLogo} alt="KAIRON" className="h-14 w-auto object-contain" width={500} height={500} />
                <div className="h-10 w-px bg-border" aria-hidden />
                <p className="max-w-[180px] text-[11px] uppercase tracking-[0.18em] text-muted-foreground leading-relaxed">
                  Cognitive OS for execution
                </p>
              </div>
              <div className="border-l-2 border-[color:var(--color-brand)] pl-4">
                <Eyebrow className="!mt-0">{c.hero.eyebrow}</Eyebrow>
              </div>
              <h1 className="mt-8 max-w-4xl font-display text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.05] text-foreground">
                {c.hero.h1}
              </h1>
              <div className="mt-10 h-px w-24 bg-[color:var(--color-brand)]" aria-hidden />
              <p className="mt-10 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
                {c.hero.lead.a}
                <strong className="text-foreground">{c.hero.lead.channels}</strong>
                {c.hero.lead.b}
              </p>
            </div>
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <PhoneMockup copy={c.hero} className="md:px-[150px] lg:px-0" widthClass="w-[280px] md:w-[360px]" />
            </div>
          </div>
        </div>
      </section>

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
            <div className="border border-border bg-[color:var(--color-surface)] p-6">
              <div className="grid grid-cols-[92px_1fr] items-center gap-5">
                <img src={kaiMascot} alt="Kai, KAIRON execution coach" className="h-auto w-full object-contain" loading="lazy" width={768} height={1024} />
                <div>
                  <h3 className="font-display text-xl leading-tight text-foreground">{c.product.kaiTitle}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{c.product.kaiBody}</p>
                </div>
              </div>
            </div>
            <ul className="mt-4 space-y-3">
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
        <ProductGallery locale={locale} />
      </Section>

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

      <Section tone="muted" className="!py-20 md:!py-32">
        <Eyebrow>{c.team.eyebrow}</Eyebrow>
        <h2 className="mt-4 max-w-3xl font-display text-3xl md:text-4xl leading-[1.08]">{c.team.title}</h2>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <TeamCard role={c.team.guillermo.role} name={c.team.guillermo.name} items={c.team.guillermo.items} photo={guillermoPhoto} />
          <TeamCard role={c.team.nathanael.role} name={c.team.nathanael.name} items={c.team.nathanael.items} photo={nathanaelPhoto} />
        </div>
      </Section>

      <Section className="!py-16 md:!py-20">
        <div className="border border-border bg-[color:var(--color-surface)] p-7 md:p-8">
          <Eyebrow>{c.support.eyebrow}</Eyebrow>
          <h2 className="mt-3 max-w-3xl font-display text-2xl md:text-3xl leading-tight">{c.support.title}</h2>
          <p className="mt-4 max-w-3xl text-sm md:text-base text-muted-foreground leading-relaxed">{c.support.body}</p>
          <CTALink
            to={locale === "en" ? "/en/support-the-launch" : "/apoya-el-lanzamiento"}
            variant="outline"
            className="mt-6"
          >
            {c.support.cta}
          </CTALink>
        </div>
      </Section>

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
