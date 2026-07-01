import { useEffect, useState, useCallback } from "react";
import { Eyebrow } from "@/components/site/Eyebrow";
import { Section } from "@/components/site/Section";
import {
  Check,
  ArrowRight,
  ChevronRight,
  Activity,
  Brain,
  Sun,
  BarChart3,
  Sparkles,
  Bot,
  ScanLine,
  FlaskConical,
  NotebookTabs,
} from "lucide-react";
import { toast } from "sonner";
import kaiProductHero from "@/assets/kai-product-hero.png";
import kaiSectionUpgrade from "@/assets/kai-section-upgrade.png";
import kaironMvpActionBridge from "@/assets/kairon-mvp-action-bridge.webp";
import kaironMvpFilter from "@/assets/kairon-mvp-filter.webp";
import kaironMvpProtocol from "@/assets/kairon-mvp-protocol.webp";
import kaironMvpScannerReport from "@/assets/kairon-mvp-scanner-report.webp";
import kaironMvpOnboarding from "@/assets/kairon-mvp-onboarding.webp";
import kaironMvpActionBridgeEn from "@/assets/kairon-mvp-action-bridge-en.webp";
import kaironMvpFilterEn from "@/assets/kairon-mvp-filter-en.webp";
import kaironMvpProtocolEn from "@/assets/kairon-mvp-protocol-en.webp";
import kaironMvpScannerReportEn from "@/assets/kairon-mvp-scanner-report-en.webp";
import kaironMvpOnboardingEn from "@/assets/kairon-mvp-onboarding-en.webp";
import { trackConversion, trackCtaClick } from "@/lib/analytics";
import type { Locale } from "@/lib/i18n";

type Copy = {
  hero: {
    eyebrow: string;
    h1: string;
    body: string;
    disclaimer: string;
    cta: string;
    counter: (n: string) => string;
    launchNote: string;
    osLabel: string;
    iro: string;
    version: string;
    imgAlt: string;
    captions: string[];
  };
  engine: {
    eyebrow: string;
    h2: string;
    body: string;
    steps: { n: string; t: string; d: string; ai: boolean }[];
  };
  features: {
    eyebrow: string;
    h2: string;
    items: { t: string; d: string; ai: boolean }[];
  };
  prototype: {
    eyebrow: string;
    h2: string;
    body: string;
    items: { title: string; description: string; alt: string }[];
  };
  plans: {
    eyebrow: string;
    h2: string;
    featuredBadge: string;
    cards: {
      name: string;
      price: string;
      items: string[];
      ctaLabel: string;
      variant: "primary" | "outline" | "ghost-light";
      featured?: boolean;
    }[];
  };
  waitlist: {
    h2: string;
    body: string;
    emailLabel: string;
    emailPlaceholder: string;
    submitIdle: string;
    submitDone: string;
    submitLoading: string;
    foot: string;
    successToast: string;
    errorToast: string;
    invalidToast: string;
  };
  note: {
    label: string;
    body: string;
  };
  counterText: (n: string) => string;
  aiBadge: string;
};

const COPY: Record<Locale, Copy> = {
  es: {
    hero: {
      eyebrow: "PRODUCTO PRINCIPAL DE G-STRUCTURE · MVP ACTIVO · LANZAMIENTO Q3 2026",
      h1: "Kai convierte fricción mental en ejecución.",
      body: "KAIRON no es un gestor de tareas, una app de journaling ni un chatbot genérico. Es un Cognitive Operating System para ejecución: detecta los pensamientos, reglas y patrones que bloquean la acción, los trabaja con el método I-R-O™ y los convierte en un Puente de Acción validado.",
      disclaimer: "KAIRON es un sistema de coaching de ejecución, no un servicio clínico. No diagnostica, no trata y no reemplaza atención psicológica, médica o psiquiátrica.",
      cta: "Únete a la lista de espera",
      counter: (n) => `${n} personas ya están en la lista de espera.`,
      launchNote: "KAIRON ya pasó de prototipo a MVP. Los primeros usuarios ayudarán a validar el producto real en Ecuador.",
      osLabel: "KAIRON · COGNITIVE OS",
      iro: "I-R-O™ · IDENTIFICAR · REENCUADRAR · OPTIMIZAR",
      version: "KAI · AI EXECUTION COACH",
      imgAlt: "Kai, coach de ejecución con IA de KAIRON.",
      captions: ["Escáner", "Filtro", "Taller", "Protocolo"],
    },
    engine: {
      eyebrow: "CÓMO FUNCIONA",
      h2: "KAIRON empieza antes que una lista de tareas: en el momento en que te bloqueas.",
      body: "La mayoría de herramientas asume que ya tienes claridad emocional y cognitiva. KAIRON trabaja la capa anterior: identifica la fricción, la reencuadra con Kai y la convierte en una acción pequeña que puedes validar hoy.",
      steps: [
        { n: "I", t: "Identificar", d: "Define tu misión, detecta el patrón dominante y nombra la fricción real.", ai: false },
        { n: "R", t: "Reencuadrar", d: "Kai distingue hechos de interpretaciones y cuestiona reglas internas que bloquean la acción.", ai: true },
        { n: "O", t: "Optimizar", d: "Convierte el reencuadre en un Puente de Acción de 5 minutos y registra evidencia.", ai: false },
      ],
    },
    features: {
      eyebrow: "EL SISTEMA OPERATIVO",
      h2: "Una arquitectura guiada por Kai.",
      items: [
        { t: "Escáner", d: "Mapea tu patrón de ejecución dominante y activa la ruta de protocolo adecuada.", ai: false },
        { t: "Filtro", d: "Un reset cognitivo de 2 a 5 minutos para pensamientos urgentes, bloqueo o sobreanálisis.", ai: true },
        { t: "Taller", d: "Espacio profundo para trabajar patrones repetidos, creencias y herramientas tácticas.", ai: true },
        { t: "Protocolo", d: "Programa de 8 semanas alrededor de tu proyecto para convertir claridad en evidencia repetida.", ai: false },
        { t: "Bitácora de Ejecución", d: "Registro vivo de pensamientos, acciones y pruebas para medir progreso real.", ai: false },
        { t: "Biblioteca", d: "Lecturas, principios y recursos que sostienen el flujo de coaching sin saturarte.", ai: false },
      ],
    },
    prototype: {
      eyebrow: "MVP EN PANTALLA",
      h2: "El producto actual: de la fricción ejecutiva a una acción puente.",
      body: "Estos mockups ya no representan solo una dirección visual. Son pantallas del MVP: onboarding, Escáner con reporte, Filtro guiado por Kai, Protocolo de Reestructuración y Modo Ejecución para cerrar con una acción de 5 minutos.",
      items: [
        { title: "Onboarding", description: "La entrada al Cognitive OS: una promesa clara, enfocada en desbloquear pensamiento, acción y progreso.", alt: "Mockup de onboarding del MVP de KAIRON." },
        { title: "Escáner + reporte", description: "El usuario visualiza su nivel de fricción, mapa de patrones y lectura dominante.", alt: "Mockup del reporte del Escáner de KAIRON." },
        { title: "Filtro", description: "Kai guía un reencuadre en tiempo real para destrabar lo que frena al usuario.", alt: "Mockup del Filtro de KAIRON." },
        { title: "Protocolo", description: "Un programa guiado para reestructurar patrones con módulos y continuidad.", alt: "Mockup del Protocolo de KAIRON." },
        { title: "Acción Puente", description: "Modo ejecución convierte el insight en una acción concreta de 5 minutos.", alt: "Mockup de Acción Puente de KAIRON." },
      ],
    },
    plans: {
      eyebrow: "POR QUÉ ENTRAR A LA WAITLIST",
      h2: "Los primeros usuarios van a moldear cómo Kai coachéa.",
      featuredBadge: "DESTACADO",
      cards: [
        {
          name: "FREE",
          price: "Gratis",
          items: [
            "Acceso inicial a flujos guiados por Kai",
            "Primeras pruebas del Scanner y Filter",
            "Updates de producto durante la validación",
            "Oportunidad de influir en el producto",
          ],
          ctaLabel: "Acceso gratuito al lanzar",
          variant: "outline",
        },
        {
          name: "PLUS",
          price: "$20/mes",
          featured: true,
          items: [
            "Acceso prioritario al Cognitive OS",
            "Filtro y Taller guiados por Kai",
            "Protocolo de 8 semanas cuando esté disponible",
            "Bitácora de Ejecución para registrar evidencia",
            "Founder pricing para early users",
          ],
          ctaLabel: "Unirme con Plus",
          variant: "primary",
        },
        {
          name: "VIP",
          price: "$50/mes",
          items: [
            "Todo lo de Plus",
            "Sesión mensual de calibración con coach humano",
            "Auditoría mensual de patrones de ejecución",
            "Feedback directo para mejorar Kai",
            "Comunidad privada de builders y high-performers",
          ],
          ctaLabel: "Unirme con VIP",
          variant: "outline",
        },
      ],
    },
    waitlist: {
      h2: "Sé parte del primer grupo.",
      body: "KAIRON ya existe como MVP. Los primeros usuarios tendrán acceso anticipado, precio de fundadores y la oportunidad de ayudar a entrenar una nueva categoría: ejecución guiada por control cognitivo, no por más tareas.",
      emailLabel: "Correo electrónico",
      emailPlaceholder: "tu@correo.com",
      submitIdle: "Quiero acceso anticipado",
      submitDone: "Gracias ✓",
      submitLoading: "Enviando…",
      foot: "Lanzamiento Q3 2026 · Ecuador en primera fase · Sin spam, solo updates reales de producto.",
      successToast: "Listo. Te avisaremos del lanzamiento.",
      errorToast: "No pudimos guardar tu correo. Intenta de nuevo.",
      invalidToast: "Correo inválido. Revisa el formato.",
    },
    note: {
      label: "Nota metodológica",
      body: "KAIRON traduce estructuras cognitivo-conductuales y REBT a lenguaje no clínico enfocado en trabajo, proyectos, ejecución y toma de decisiones. Es coaching de ejecución: no diagnostica, no trata y no reemplaza atención profesional especializada.",
    },
    counterText: (n) => `${n} personas ya están en la lista de espera.`,
    aiBadge: "IA",
  },
  en: {
    hero: {
      eyebrow: "G-STRUCTURE'S MAIN PRODUCT · LIVE MVP · LAUNCH Q3 2026",
      h1: "Kai turns mental friction into execution.",
      body: "KAIRON is not a task manager, a journaling app, or a generic chatbot. It is a Cognitive Operating System for execution: it detects the thoughts, rules, and patterns that block action, works them through the I-R-O™ Method, and turns them into a validated Action Bridge.",
      disclaimer: "KAIRON is an execution-coaching system, not a clinical service. It does not diagnose, treat, or replace psychological, medical, or psychiatric care.",
      cta: "Join the waitlist",
      counter: (n) => `${n} people are already on the waitlist.`,
      launchNote: "KAIRON has moved from prototype to MVP. Early users will validate the real product in Ecuador.",
      osLabel: "KAIRON · COGNITIVE OS",
      iro: "I-R-O™ · IDENTIFY · REFRAME · OPTIMIZE",
      version: "KAI · AI EXECUTION COACH",
      imgAlt: "Kai, KAIRON's AI execution coach.",
      captions: ["Scanner", "Filter", "Workshop", "Protocol"],
    },
    engine: {
      eyebrow: "HOW IT WORKS",
      h2: "KAIRON starts before the task list: at the moment you get blocked.",
      body: "Most tools assume you already have cognitive and emotional clarity. KAIRON works one layer earlier: it identifies the friction, reframes it with Kai, and turns it into a small action you can validate today.",
      steps: [
        { n: "I", t: "Identify", d: "Define your mission, detect the dominant pattern, and name the real friction.", ai: false },
        { n: "R", t: "Reframe", d: "Kai separates facts from interpretations and challenges internal rules that block action.", ai: true },
        { n: "O", t: "Optimize", d: "Turn the reframe into a 5-minute Action Bridge and register evidence.", ai: false },
      ],
    },
    features: {
      eyebrow: "THE OPERATING SYSTEM",
      h2: "An architecture guided by Kai.",
      items: [
        { t: "Scanner", d: "Maps your dominant execution pattern and activates the right protocol route.", ai: false },
        { t: "Filter", d: "A 2-5 minute cognitive reset for urgent thoughts, blocks, or overthinking.", ai: true },
        { t: "Workshop", d: "A deeper space for recurring patterns, beliefs, and tactical cognitive tools.", ai: true },
        { t: "Protocol", d: "An 8-week program around your project to turn clarity into repeated evidence.", ai: false },
        { t: "Execution Diary", d: "A live log of thoughts, actions, and proof to measure real progress.", ai: false },
        { t: "Biblioteca", d: "Readings, principles, and resources that support the coaching flow without overwhelming you.", ai: false },
      ],
    },
    prototype: {
      eyebrow: "MVP SCREENS",
      h2: "The current product: from execution friction to an action bridge.",
      body: "These mockups no longer represent only a visual direction. They are MVP screens: onboarding, Scanner report, Kai-guided Filter, Restructuring Protocol, and Execution Mode to close with a 5-minute action.",
      items: [
        { title: "Onboarding", description: "The entry into the Cognitive OS: a clear promise focused on unlocking thought, action, and progress.", alt: "KAIRON MVP onboarding mockup." },
        { title: "Scanner + report", description: "The user visualizes friction level, pattern map, and dominant reading.", alt: "KAIRON Scanner report mockup." },
        { title: "Filter", description: "Kai guides a real-time reframe to unlock what is slowing the user down.", alt: "KAIRON Filter mockup." },
        { title: "Protocol", description: "A guided program to restructure patterns with modules and continuity.", alt: "KAIRON Protocol mockup." },
        { title: "Action Bridge", description: "Execution Mode turns the insight into a concrete 5-minute action.", alt: "KAIRON Action Bridge mockup." },
      ],
    },
    plans: {
      eyebrow: "WHY JOIN THE WAITLIST",
      h2: "Early users will shape how Kai coaches.",
      featuredBadge: "FEATURED",
      cards: [
        {
          name: "FREE",
          price: "Free",
          items: [
            "Initial access to Kai-guided flows",
            "First tests of Scanner and Filter",
            "Product updates during validation",
            "Opportunity to influence the product",
          ],
          ctaLabel: "Free access at launch",
          variant: "outline",
        },
        {
          name: "PLUS",
          price: "$20/mo",
          featured: true,
          items: [
            "Priority access to the Cognitive OS",
            "Kai-guided Filter and Workshop",
            "8-week Protocol when available",
            "Execution Diary for evidence logging",
            "Founder pricing for early users",
          ],
          ctaLabel: "Join with Plus",
          variant: "primary",
        },
        {
          name: "VIP",
          price: "$50/mo",
          items: [
            "Everything in Plus",
            "Monthly calibration session with a human coach",
            "Monthly audit of execution patterns",
            "Direct feedback loop to improve Kai",
            "Private community of builders and high-performers",
          ],
          ctaLabel: "Join with VIP",
          variant: "outline",
        },
      ],
    },
    waitlist: {
      h2: "Be part of the first cohort.",
      body: "KAIRON is in active construction. Early users will get early access, founder pricing, and the chance to help shape a new category: execution guided by cognitive control, not more tasks.",
      emailLabel: "Email",
      emailPlaceholder: "you@email.com",
      submitIdle: "I want early access",
      submitDone: "Thanks ✓",
      submitLoading: "Sending…",
      foot: "Launch Q3 2026 · Ecuador in the first phase · No spam, only real product updates.",
      successToast: "Done. We'll let you know at launch.",
      errorToast: "We couldn't save your email. Please try again.",
      invalidToast: "Invalid email. Check the format.",
    },
    note: {
      label: "Methodological note",
      body: "KAIRON translates cognitive-behavioral and REBT structures into non-clinical language focused on work, projects, execution, and decision-making. It is execution coaching: it does not diagnose, treat, or replace specialized professional care.",
    },
    counterText: (n) => `${n} people are already on the waitlist.`,
    aiBadge: "AI",
  },
};

function useWaitlistCount() {
  const [count, setCount] = useState<number | null>(null);
  const fetchCount = useCallback(async () => {
    try {
      const r = await fetch("/api/public/gstruct-waitlist-count", { cache: "no-store" });
      if (!r.ok) return;
      const data = await r.json();
      if (typeof data?.count === "number" && data.count > 0) setCount(data.count);
    } catch { /* ignore */ }
  }, []);
  useEffect(() => {
    fetchCount();
    let cancelled = false;
    let channel: ReturnType<typeof import("@/integrations/supabase/client").supabase.channel> | null = null;
    (async () => {
      const { supabase } = await import("@/integrations/supabase/client");
      if (cancelled) return;
      channel = supabase
        .channel("gstruct-waitlist")
        .on("broadcast", { event: "joined" }, () => {
          setCount((c) => (c == null ? c : c + 1));
        })
        .subscribe();
    })();
    return () => {
      cancelled = true;
      if (channel) {
        import("@/integrations/supabase/client").then(({ supabase }) => {
          supabase.removeChannel(channel!);
        });
      }
    };
  }, [fetchCount]);
  return { count, refetch: fetchCount };
}

function WaitlistCounter({
  count,
  locale,
  tone = "light",
  className,
}: {
  count: number | null;
  locale: Locale;
  tone?: "light" | "dark";
  className?: string;
}) {
  if (!count || count <= 0) return null;
  const color = tone === "dark"
    ? "text-[color:var(--color-background)]/70"
    : "text-muted-foreground";
  const formatted = count.toLocaleString(locale === "es" ? "es-EC" : "en-US");
  return (
    <p className={`text-[13px] ${color} ${className ?? ""}`}>
      <span className="inline-block h-1.5 w-1.5 rounded-full mr-2 align-middle bg-[color:var(--color-brand)]" aria-hidden />
      {COPY[locale].counterText(formatted)}
    </p>
  );
}

export function GStructPage({ locale }: { locale: Locale }) {
  const waitlist = useWaitlistCount();
  return (
    <>
      <Hero locale={locale} count={waitlist.count} />
      <KaiSection locale={locale} />
      <ProductScreens locale={locale} />
      <Engine locale={locale} />
      <Features locale={locale} />
      <Plans locale={locale} />
      <Waitlist locale={locale} count={waitlist.count} refetchCount={waitlist.refetch} />
      <Note locale={locale} />
    </>
  );
}

function Hero({ locale, count }: { locale: Locale; count: number | null }) {
  const c = COPY[locale].hero;
  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
      <div className="container-x relative py-24 md:py-32 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <h1 className="mt-6 font-display text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.04] text-foreground">
            {c.h1}
          </h1>
          <p className="mt-6 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">{c.body}</p>
          <p className="mt-3 max-w-xl text-xs text-muted-foreground leading-relaxed">{c.disclaimer}</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#waitlist"
              onClick={() => trackCtaClick("kairon_hero_waitlist", { source: "kairon_page" })}
              className="group inline-flex items-center justify-center gap-2 bg-foreground px-5 min-h-11 py-3 text-[13px] font-medium tracking-wide text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-[color:var(--color-brand)]"
            >
              {c.cta}
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
          <WaitlistCounter locale={locale} count={count} className="mt-4" />
          <p className="mt-2 text-xs text-muted-foreground">{c.launchNote}</p>
        </div>
        <div className="lg:col-span-5">
          <div className="relative min-h-[420px] overflow-hidden">
            <style>
              {`
                @keyframes kaiProductFloat {
                  0%, 100% { transform: translate3d(0, 0, 0) rotate(-1deg); }
                  50% { transform: translate3d(0, -14px, 0) rotate(1deg); }
                }
                @keyframes kaiProductGlow {
                  0%, 100% { opacity: 0.62; transform: scale(0.96); }
                  50% { opacity: 0.92; transform: scale(1.05); }
                }
              `}
            </style>
            <div className="absolute inset-x-8 bottom-10 h-40 rounded-[100%] bg-cyan-300/25 blur-3xl motion-safe:animate-[kaiProductGlow_5.5s_ease-in-out_infinite]" aria-hidden />
            <div className="absolute left-1/2 top-10 h-64 w-64 -translate-x-1/2 rounded-full bg-[color:var(--color-brand)]/10 blur-3xl" aria-hidden />
            <img
              src={kaiProductHero}
              alt={c.imgAlt}
              loading="eager"
              width={1254}
              height={1254}
              className="relative z-10 mx-auto w-full max-w-[520px] object-contain drop-shadow-[0_36px_52px_rgba(5,50,90,0.26)] motion-safe:animate-[kaiProductFloat_6s_ease-in-out_infinite]"
            />
          </div>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 divide-x divide-border border border-border bg-[color:var(--color-surface)] text-center">
            {c.captions.map((t) => (
              <p key={t} className="px-2 py-3 text-[10.5px] font-display font-semibold tracking-[0.14em] uppercase text-foreground/75">
                {t}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function KaiSection({ locale }: { locale: Locale }) {
  const copy = locale === "en"
    ? {
        eyebrow: "MEET KAI",
        title: "Kai is not a chatbot. Kai is the operating layer.",
        body: "Most AI apps make the user start from a blank prompt. KAIRON does the opposite: Kai already knows the product structure, the active project, the protocol route, and the next logical action.",
        items: [
          "Explains each step before asking the user to act.",
          "Turns messy input into a usable thought, emotion, rule, or action.",
          "Routes the user to Filter, Workshop, Protocol, or the Execution Diary.",
          "Keeps the user anchored to the project and pushes toward evidence.",
        ],
      }
    : {
        eyebrow: "CONOCE A KAI",
        title: "Kai no es un chatbot. Kai es la capa operativa.",
        body: "La mayoría de apps con IA te dejan frente a una caja vacía. KAIRON hace lo contrario: Kai conoce la estructura del producto, el proyecto activo, la ruta de protocolo y la siguiente acción lógica.",
        items: [
          "Explica cada paso antes de pedirle actuar al usuario.",
          "Convierte entradas confusas en pensamiento, emoción, regla o acción usable.",
          "Enruta al usuario hacia Filtro, Taller, Protocolo o Bitácora de Ejecución.",
          "Mantiene el foco en el proyecto y empuja hacia evidencia.",
        ],
      };

  return (
    <Section tone="white">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <div className="relative overflow-hidden border border-border bg-[#f5f7fa] p-6">
            <div className="absolute inset-x-0 top-0 h-1 bg-[#00b4d8]" aria-hidden />
            <img
              src={kaiSectionUpgrade}
              alt={locale === "en" ? "Kai, KAIRON's AI execution coach." : "Kai, coach de ejecución con IA de KAIRON."}
              loading="lazy"
              width={1024}
              height={1365}
              className="mx-auto max-h-[520px] w-full object-contain"
            />
          </div>
        </div>
        <div className="lg:col-span-7">
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h2 className="mt-4 max-w-3xl font-display text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.08]">
            {copy.title}
          </h2>
          <p className="mt-6 max-w-3xl text-base md:text-lg text-muted-foreground leading-relaxed">
            {copy.body}
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {copy.items.map((item) => (
              <div key={item} className="border border-border bg-[color:var(--color-surface)] p-4">
                <Check size={16} className="mb-3 text-[color:var(--color-brand)]" aria-hidden />
                <p className="text-sm text-foreground/85 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function ProductScreens({ locale }: { locale: Locale }) {
  const copy = locale === "en"
    ? {
        eyebrow: "PRODUCT IN MOTION",
        title: "From Kai's guidance to a working MVP flow.",
        body: "These screens show the current KAIRON MVP: onboarding frames the promise, Scanner reads friction, Filter reframes in real time, Protocol structures deeper change, and Action Bridge moves the user into execution.",
        screens: [
          { title: "Onboarding", body: "The first screen positions KAIRON as cognitive coaching for better execution.", image: kaironMvpOnboardingEn, alt: "KAIRON MVP onboarding screen." },
          { title: "Scanner report", body: "The user sees their friction score, pattern map, and dominant execution reading.", image: kaironMvpScannerReportEn, alt: "KAIRON Scanner report MVP screen." },
          { title: "Filter", body: "Kai guides a real-time reframe when a thought is blocking the next move.", image: kaironMvpFilterEn, alt: "KAIRON Filter MVP screen." },
          { title: "Protocol", body: "A guided restructuring program gives continuity beyond the immediate block.", image: kaironMvpProtocolEn, alt: "KAIRON Protocol MVP screen." },
          { title: "Action Bridge", body: "Execution Mode closes the loop with a focused 5-minute action.", image: kaironMvpActionBridgeEn, alt: "KAIRON Action Bridge MVP screen." },
        ],
      }
    : {
        eyebrow: "PRODUCTO EN MOVIMIENTO",
        title: "De la guía de Kai a un flujo MVP funcional.",
        body: "Estas pantallas muestran el MVP actual de KAIRON: onboarding presenta la promesa, Escáner lee la fricción, Filtro reencuadra en tiempo real, Protocolo estructura el cambio profundo y Acción Puente lleva al usuario a ejecutar.",
        screens: [
          { title: "Onboarding", body: "La primera pantalla posiciona KAIRON como coaching cognitivo para ejecutar mejor.", image: kaironMvpOnboarding, alt: "Pantalla de onboarding del MVP de KAIRON." },
          { title: "Reporte de Escáner", body: "El usuario ve su índice de fricción, mapa de patrones y lectura dominante.", image: kaironMvpScannerReport, alt: "Pantalla de reporte del Escáner de KAIRON." },
          { title: "Filtro", body: "Kai guía un reencuadre en tiempo real cuando un pensamiento bloquea el siguiente movimiento.", image: kaironMvpFilter, alt: "Pantalla del Filtro del MVP de KAIRON." },
          { title: "Protocolo", body: "Un programa guiado de reestructuración da continuidad más allá del bloqueo inmediato.", image: kaironMvpProtocol, alt: "Pantalla del Protocolo del MVP de KAIRON." },
          { title: "Acción Puente", body: "Modo ejecución cierra el loop con una acción enfocada de 5 minutos.", image: kaironMvpActionBridge, alt: "Pantalla de Acción Puente del MVP de KAIRON." },
        ],
      };

  return (
    <Section tone="muted">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h2 className="mt-4 max-w-4xl font-display text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.08]">
            {copy.title}
          </h2>
          <p className="mt-5 max-w-3xl text-base md:text-lg text-muted-foreground leading-relaxed">
            {copy.body}
          </p>
        </div>
        <div className="lg:col-span-4 border-l-2 border-[color:var(--color-brand)] pl-5">
          <p className="text-sm md:text-[15px] text-foreground/80 leading-relaxed">
            {locale === "en"
              ? "The prototype validated the structure. The MVP now shows the product path: diagnose, reframe, structure, execute."
              : "El prototipo validó la estructura. El MVP ya muestra la ruta de producto: diagnosticar, reencuadrar, estructurar, ejecutar."}
          </p>
        </div>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {copy.screens.map((screen, index) => (
          <figure key={screen.title} className={index === 0 ? "sm:col-span-2 lg:col-span-1" : undefined}>
            <div className="overflow-hidden border border-border bg-white">
              <img
                src={screen.image}
                alt={screen.alt}
                loading="lazy"
                width={945}
                height={1680}
                className="w-full object-cover"
              />
            </div>
            <figcaption className="border-x border-b border-border bg-[color:var(--color-surface)] p-5">
              <p className="font-display text-[10px] font-semibold tracking-[0.22em] text-[color:var(--color-brand)]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 font-display text-lg font-semibold">{screen.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{screen.body}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

function Engine({ locale }: { locale: Locale }) {
  const c = COPY[locale].engine;
  const ai = COPY[locale].aiBadge;
  return (
    <Section tone="muted">
      <Eyebrow>{c.eyebrow}</Eyebrow>
      <h2 className="mt-4 max-w-3xl font-display text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.08]">
        {c.h2}
      </h2>
      <p className="mt-6 max-w-3xl text-base md:text-lg text-muted-foreground leading-relaxed">{c.body}</p>

      <ol className="mt-12 hidden md:flex items-stretch gap-3">
        {c.steps.flatMap((s, i) => {
          const card = (
            <li
              key={s.n}
              className={`flex-1 relative bg-[color:var(--color-surface)] p-5 lg:p-6 border ${
                s.ai ? "border-[color:var(--color-brand)] shadow-elev-1" : "border-border"
              }`}
            >
              {s.ai && (
                <span className="absolute -top-2.5 right-4 inline-flex items-center gap-1 bg-[color:var(--color-brand)] text-[color:var(--color-background)] px-2 py-0.5 text-[10px] font-semibold tracking-[0.18em]">
                  <Sparkles size={10} aria-hidden /> {ai}
                </span>
              )}
              <p className="font-display text-[11px] font-semibold tracking-[0.22em] text-[color:var(--color-brand)]">{s.n}</p>
              <p className="mt-3 font-display text-sm font-semibold text-foreground">{s.t}</p>
              <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed">{s.d}</p>
            </li>
          );
          if (i === c.steps.length - 1) return [card];
          return [
            card,
            <li key={`arrow-${s.n}`} className="flex items-center justify-center text-[color:var(--color-brand)]" aria-hidden>
              <ChevronRight size={20} strokeWidth={2.25} />
            </li>,
          ];
        })}
      </ol>

      <ol className="mt-10 md:hidden relative pl-6">
        <span className="absolute left-[10px] top-2 bottom-2 w-px bg-[color:var(--color-brand)]/40" aria-hidden />
        {c.steps.map((s) => (
          <li key={s.n} className="relative pb-6 last:pb-0">
            <span
              className={`absolute -left-6 top-2 h-3 w-3 rounded-full ${
                s.ai ? "bg-[color:var(--color-brand)] ring-4 ring-[color:var(--color-brand)]/20" : "bg-[color:var(--color-brand)]"
              }`}
              aria-hidden
            />
            <div className={`bg-[color:var(--color-surface)] p-5 border ${s.ai ? "border-[color:var(--color-brand)]" : "border-border"}`}>
              {s.ai && (
                <span className="inline-flex items-center gap-1 bg-[color:var(--color-brand)] text-[color:var(--color-background)] px-2 py-0.5 text-[10px] font-semibold tracking-[0.18em] mb-2">
                  <Sparkles size={10} aria-hidden /> {ai}
                </span>
              )}
              <p className="font-display text-[11px] font-semibold tracking-[0.22em] text-[color:var(--color-brand)]">{s.n}</p>
              <p className="mt-2 font-display text-sm font-semibold">{s.t}</p>
              <p className="mt-1.5 text-[13px] text-muted-foreground leading-relaxed">{s.d}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function Features({ locale }: { locale: Locale }) {
  const c = COPY[locale].features;
  const ai = COPY[locale].aiBadge;
  const icons = [ScanLine, Brain, FlaskConical, Activity, NotebookTabs, BarChart3];
  return (
    <Section>
      <Eyebrow>{c.eyebrow}</Eyebrow>
      <h2 className="mt-4 max-w-3xl font-display text-3xl md:text-4xl leading-[1.08]">{c.h2}</h2>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {c.items.map((item, idx) => {
          const Icon = icons[idx] ?? Activity;
          return (
            <div
              key={item.t}
              className={`relative bg-[color:var(--color-surface)] p-7 md:p-8 border transition-shadow duration-200 hover:shadow-elev-1 ${
                item.ai ? "border-[color:var(--color-brand)]" : "border-border"
              }`}
            >
              {item.ai && (
                <span className="absolute top-5 right-5 inline-flex items-center gap-1 bg-[color:var(--color-brand)] text-[color:var(--color-background)] px-2 py-0.5 text-[10px] font-semibold tracking-[0.18em]">
                  <Sparkles size={10} aria-hidden /> {ai}
                </span>
              )}
              <span className="inline-flex h-11 w-11 items-center justify-center border border-border bg-background text-[color:var(--color-brand)]" aria-hidden>
                <Icon size={22} strokeWidth={1.6} />
              </span>
              <h3 className="mt-5 font-display text-[15px] md:text-base font-medium">{item.t}</h3>
              <p className="mt-3 text-sm md:text-[15px] text-muted-foreground leading-relaxed">{item.d}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function PlanCTA({
  variant,
  children,
}: {
  variant: "primary" | "outline" | "ghost-light";
  children: React.ReactNode;
}) {
  const styles =
    variant === "primary"
      ? "bg-[color:var(--color-brand)] text-[color:var(--color-background)] hover:opacity-90"
      : variant === "outline"
        ? "border border-foreground/30 text-foreground hover:border-foreground hover:bg-foreground/5"
        : "border border-[color:var(--color-background)]/40 text-[color:var(--color-background)] hover:bg-[color:var(--color-background)]/10";
  return (
    <a
      href="#waitlist"
      onClick={() => trackCtaClick("kairon_plan_waitlist", { plan: String(children) })}
      className={`group mt-7 inline-flex w-full items-center justify-center gap-2 px-5 min-h-11 py-3 text-[13px] font-medium tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[color:var(--color-brand)] ${
        variant === "ghost-light" ? "focus-visible:ring-offset-[color:var(--color-brand-deep)]" : "focus-visible:ring-offset-background"
      } ${styles}`}
    >
      {children}
      <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}

function Plans({ locale }: { locale: Locale }) {
  const c = COPY[locale].plans;
  return (
    <Section id="planes" tone="muted">
      <Eyebrow>{c.eyebrow}</Eyebrow>
      <h2 className="mt-4 max-w-3xl font-display text-3xl md:text-4xl leading-[1.08]">{c.h2}</h2>
      <div className="mt-12 grid gap-6 md:grid-cols-3 items-stretch">
        {c.cards.map((card) => (
          <div
            key={card.name}
            className={`relative border p-7 md:p-8 flex flex-col ${
              card.featured
                ? "border-foreground bg-[color:var(--color-brand-deep)] text-[color:var(--color-background)]"
                : "border-border bg-[color:var(--color-surface)]"
            }`}
          >
            {card.featured ? (
              <span className="absolute -top-3 left-7 inline-flex items-center bg-foreground px-2.5 py-1 text-[10px] font-semibold tracking-[0.22em] text-background">
                {c.featuredBadge}
              </span>
            ) : null}
            <p className={`font-display text-[11px] font-semibold tracking-[0.22em] ${
              card.featured ? "text-[color:var(--color-background)]/70" : "text-muted-foreground"
            }`}>
              {card.name}
            </p>
            <p className={`mt-4 font-display text-4xl md:text-5xl font-semibold ${
              card.featured ? "text-[color:var(--color-background)]" : "text-foreground"
            }`}>
              {card.price}
            </p>
            <ul className="mt-6 space-y-3 flex-1">
              {card.items.map((it) => (
                <li key={it} className="flex gap-2.5 text-sm leading-relaxed">
                  <Check size={16} className={`mt-0.5 shrink-0 ${
                    card.featured ? "text-[color:var(--color-background)]" : "text-[color:var(--color-brand)]"
                  }`} />
                  <span className={card.featured ? "text-[color:var(--color-background)]/90" : "text-foreground/85"}>
                    {it}
                  </span>
                </li>
              ))}
            </ul>
            <PlanCTA variant={card.variant}>{card.ctaLabel}</PlanCTA>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Waitlist({
  locale,
  count,
  refetchCount,
}: {
  locale: Locale;
  count: number | null;
  refetchCount: () => void;
}) {
  const c = COPY[locale].waitlist;
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting || done) return;
    trackCtaClick("kairon_waitlist_submit_attempt", { source: "kairon_page" });
    setSubmitting(true);
    try {
      const res = await fetch("/api/public/gstruct-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website, source: "kairon_page", locale }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(data?.error === "validation_failed" ? c.invalidToast : c.errorToast);
        return;
      }
      trackConversion("kairon_waitlist_signup", { source: "kairon_page" });
      setDone(true);
      toast.success(c.successToast);
      refetchCount();
    } catch {
      toast.error(c.errorToast);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Section id="waitlist" tone="deep">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05]">{c.h2}</h2>
        <p className="mx-auto mt-6 text-base md:text-lg text-[color:var(--color-background)]/85 leading-relaxed">
          {c.body}
        </p>
        <form onSubmit={onSubmit} className="mx-auto mt-10 flex flex-col sm:flex-row gap-3 max-w-xl text-left">
          <label htmlFor="waitlist-email" className="sr-only">{c.emailLabel}</label>
          <input
            id="waitlist-email"
            type="email"
            required
            placeholder={c.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={done}
            autoComplete="email"
            inputMode="email"
            className="flex-1 min-h-12 bg-[color:var(--color-background)] border border-foreground/20 px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[color:var(--color-brand)] focus:ring-2 focus:ring-[color:var(--color-brand)]/40 disabled:opacity-70"
          />
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="hidden"
            aria-hidden
          />
          <button
            type="submit"
            disabled={submitting || done}
            className="inline-flex min-h-12 items-center justify-center gap-2 bg-[color:var(--color-brand)] px-6 py-3 text-[14px] font-semibold tracking-wide text-[color:var(--color-background)] transition-opacity hover:opacity-90 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-brand-deep)] focus-visible:ring-[color:var(--color-background)]"
          >
            {done ? c.submitDone : submitting ? c.submitLoading : c.submitIdle}
            {!done && !submitting ? <ArrowRight size={15} /> : null}
          </button>
        </form>
        <WaitlistCounter locale={locale} count={count} tone="dark" className="mt-5" />
        <p className="mx-auto mt-4 max-w-xl text-xs text-[color:var(--color-background)]/70 leading-relaxed">{c.foot}</p>
      </div>
    </Section>
  );
}

function Note({ locale }: { locale: Locale }) {
  const c = COPY[locale].note;
  return (
    <Section>
      <div className="max-w-3xl">
        <hr className="mb-6 border-t border-border" />
        <div className="border-l-2 border-[color:var(--color-brand)] bg-[color:var(--color-brand-soft)]/30 px-5 py-4">
          <p className="font-display text-[10px] font-semibold tracking-[0.22em] uppercase text-muted-foreground">{c.label}</p>
          <p className="mt-2 text-xs md:text-[13px] text-muted-foreground leading-relaxed">{c.body}</p>
        </div>
      </div>
    </Section>
  );
}
