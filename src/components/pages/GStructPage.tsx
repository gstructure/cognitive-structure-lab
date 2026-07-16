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
import { trackAcquisitionEvent, trackConversion, trackCtaClick, trackOutboundAppOpened } from "@/lib/analytics";
import { getLaunchPhase, kaironAppUrl, launchCopy } from "@/lib/launchConfig";
import type { Locale } from "@/lib/i18n";

type Copy = {
  hero: {
    eyebrow: string;
    h1: string;
    body: string;
    disclaimer: string;
    cta: string;
    launchNote: string;
    osLabel: string;
    iro: string;
    version: string;
    imgAlt: string;
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
  aiBadge: string;
};

const COPY: Record<Locale, Copy> = {
  es: {
    hero: {
      eyebrow: "PRODUCTO PRINCIPAL DE G-STRUCTURE · MVP ACTIVO · AUG 2026",
      h1: "Kai convierte fricción mental en ejecución.",
      body: "KAIRON es una herramienta de coaching cognitivo con IA: Kai te ayuda a separar situación, emoción e interpretación, llegar a una lectura más precisa y convertirla en una acción concreta en menos de 12 minutos.",
      disclaimer: "Diseñado para ejecución profesional, claridad cognitiva y acción estructurada en momentos de bloqueo.",
      cta: "Probar KAIRON",
      launchNote: "KAIRON ya está activo como MVP para usuarios tempranos. Puedes probar la versión actual, compartir feedback y ayudarnos a preparar el lanzamiento comercial.",
      osLabel: "KAIRON · COGNITIVE OS",
      iro: "I-R-O™ · IDENTIFICAR · REENCUADRAR · OPTIMIZAR",
      version: "KAI · AI EXECUTION COACH",
      imgAlt: "Kai, coach de ejecución con IA de KAIRON.",
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
    waitlist: {
      h2: "¿No estás listo para crear cuenta todavía?",
      body: "La ruta principal es probar KAIRON ahora. Si prefieres recibir updates antes de entrar, deja tu correo como reserva secundaria.",
      emailLabel: "Correo electrónico",
      emailPlaceholder: "tu@correo.com",
      submitIdle: "Recibir updates de acceso",
      submitDone: "Gracias ✓",
      submitLoading: "Enviando…",
      foot: "Formulario secundario · Si quieres usar KAIRON ahora, usa el botón principal de acceso.",
      successToast: "Listo. Te enviaremos los siguientes pasos de acceso.",
      errorToast: "No pudimos guardar tu correo. Intenta de nuevo.",
      invalidToast: "Correo inválido. Revisa el formato.",
    },
    note: {
      label: "Nota metodológica",
      body: "KAIRON traduce estructuras cognitivo-conductuales y REBT a lenguaje aplicado para trabajo, proyectos, ejecución y toma de decisiones. Su foco es ayudar al usuario a procesar fricción mental y salir con una acción más clara.",
    },
    aiBadge: "IA",
  },
  en: {
    hero: {
      eyebrow: "G-STRUCTURE'S MAIN PRODUCT · LIVE MVP · AUG 2026",
      h1: "Kai turns mental friction into execution.",
      body: "KAIRON is an AI cognitive coaching tool: Kai helps you separate the situation, emotion, and interpretation, reach a more precise reading, and turn it into a concrete action in under 12 minutes.",
      disclaimer: "Designed for professional execution, cognitive clarity, and structured action in moments of friction.",
      cta: "Try KAIRON",
      launchNote: "KAIRON is currently live as an MVP for early users. You can try the current version, share feedback, and help shape the commercial launch.",
      osLabel: "KAIRON · COGNITIVE OS",
      iro: "I-R-O™ · IDENTIFY · REFRAME · OPTIMIZE",
      version: "KAI · AI EXECUTION COACH",
      imgAlt: "Kai, KAIRON's AI execution coach.",
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
    waitlist: {
      h2: "Not ready to create an account yet?",
      body: "The main path is to try KAIRON now. If you prefer updates before entering, leave your email as a secondary reservation.",
      emailLabel: "Email",
      emailPlaceholder: "you@email.com",
      submitIdle: "Get access updates",
      submitDone: "Thanks ✓",
      submitLoading: "Sending…",
      foot: "Secondary form · If you want to use KAIRON now, use the main access button.",
      successToast: "Done. We'll send you the next access steps.",
      errorToast: "We couldn't save your email. Please try again.",
      invalidToast: "Invalid email. Check the format.",
    },
    note: {
      label: "Methodological note",
      body: "KAIRON translates cognitive-behavioral and REBT structures into applied language for work, projects, execution, and decision-making. Its focus is helping the user process mental friction and leave with a clearer action.",
    },
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

export function GStructPage({ locale }: { locale: Locale }) {
  const waitlist = useWaitlistCount();
  return (
    <>
      <Hero locale={locale} />
      <KaiSection locale={locale} />
      <ProductScreens locale={locale} />
      <Engine locale={locale} />
      <Features locale={locale} />
      <Waitlist locale={locale} refetchCount={waitlist.refetch} />
      <Note locale={locale} />
    </>
  );
}

function Hero({ locale }: { locale: Locale }) {
  const c = COPY[locale].hero;
  const phase = getLaunchPhase();
  const campaign = launchCopy(locale, phase);
  const appUrl = kaironAppUrl(locale, "kairon_product_hero", phase);
  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
      <div className="container-x relative py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <h1 className="mx-auto mt-6 max-w-3xl font-display text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.04] text-foreground">
            {c.h1}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">{c.body}</p>
          <p className="mx-auto mt-3 max-w-2xl text-xs text-muted-foreground leading-relaxed">{c.disclaimer}</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href={appUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackCtaClick("kairon_hero_try_mvp", { source: "kairon_page" });
                trackAcquisitionEvent("hero_cta_clicked", { cta_location: "kairon_product_hero", language: locale });
                trackOutboundAppOpened({ cta_location: "kairon_product_hero", language: locale });
              }}
              className="group inline-flex items-center justify-center gap-2 bg-foreground px-5 min-h-11 py-3 text-[13px] font-medium tracking-wide text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-[color:var(--color-brand)]"
            >
              {campaign.primaryCta}
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
          <p className="mx-auto mt-4 max-w-xl text-xs text-muted-foreground">{campaign.helper}</p>
        </div>
        <div className="mx-auto mt-12 max-w-2xl">
          <div className="relative min-h-[360px] overflow-hidden md:min-h-[460px]">
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
        </div>
      </div>
    </section>
  );
}

function KaiSection({ locale }: { locale: Locale }) {
  const copy = locale === "en"
    ? {
        eyebrow: "MEET KAI",
        title: "Kai is the operating layer.",
        body: "Kai gives the user a guided starting point: product structure, active project, protocol route, and the next logical action are already part of the experience.",
        items: [
          "Explains each step before asking the user to act.",
          "Turns messy input into a usable thought, emotion, rule, or action.",
          "Routes the user to Filter, Workshop, Protocol, or the Execution Diary.",
          "Keeps the user anchored to the project and pushes toward evidence.",
        ],
      }
    : {
        eyebrow: "CONOCE A KAI",
        title: "Kai es la capa operativa.",
        body: "Kai le da al usuario un punto de partida guiado: la estructura del producto, el proyecto activo, la ruta de protocolo y la siguiente acción lógica ya forman parte de la experiencia.",
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
              ? "The MVP is live and already shows the product path: diagnose, reframe, structure, execute."
              : "El MVP ya está activo y muestra la ruta de producto: diagnosticar, reencuadrar, estructurar, ejecutar."}
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

function Waitlist({
  locale,
  refetchCount,
}: {
  locale: Locale;
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
