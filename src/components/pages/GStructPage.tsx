import { useEffect, useState, useCallback } from "react";
import { Eyebrow } from "@/components/site/Eyebrow";
import { Section } from "@/components/site/Section";
import { BrandMark } from "@/components/brand/Logo";
import {
  Check,
  ArrowRight,
  ChevronRight,
  Activity,
  Brain,
  Sun,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import mockupInicio from "@/assets/g-frame-mockups/01-inicio.webp";
import mockupRutaIro from "@/assets/g-frame-mockups/02-ruta-iro.webp";
import mockupMotor from "@/assets/g-frame-mockups/03-motor-reestructuracion.webp";
import mockupQuickReframe from "@/assets/g-frame-mockups/04-quick-reframe.webp";
import mockupRestructureLab from "@/assets/g-frame-mockups/05-restructure-lab.webp";
import mockupActivador from "@/assets/g-frame-mockups/06-activador-matutino.webp";
import { trackConversion, trackCtaClick } from "@/lib/analytics";
import type { Locale } from "@/lib/i18n";

type Copy = {
  hero: {
    eyebrow: string;
    h1: string;
    leadA: string;
    leadB: string;
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
      eyebrow: "PRODUCTO PRINCIPAL DE G-STRUCTURE · MÉTODO I-R-O™ · LANZAMIENTO Q3 2026",
      h1: "G-Frame convierte el método I-R-O™ en una plataforma de ejecución.",
      leadA: "Identifica, reencuadra y optimiza tu ejecución",
      leadB: "con metodología CBT coaching aplicada.",
      body: "G-Frame identifica la fricción cognitivo-conductual que bloquea tu ejecución, te ayuda a reencuadrarla con el método I-R-O™, y optimiza tu acción. No para que te sientas mejor — para que ejecutes mejor.",
      disclaimer: "No somos terapia. No diagnóstico clínico. G-Frame es una herramienta de coaching, psicoeducación y optimización de ejecución basada en principios cognitivo-conductuales.",
      cta: "Únete a la lista de espera",
      counter: (n) => `${n} personas ya están en la lista de espera.`,
      launchNote: "Primeros accesos disponibles para Ecuador. Lanzamiento Q3 2026.",
      osLabel: "G-FRAME · COGNITIVE OS",
      iro: "I-R-O™ · IDENTIFICAR · REENCUADRAR · OPTIMIZAR",
      version: "v0.1 · BETA",
      imgAlt: "Mock-up de la pantalla de inicio de G-Frame.",
      captions: ["Motor de Reestructuración", "Diagnóstico de Ejecución", "Activador Matutino"],
    },
    engine: {
      eyebrow: "EL MÉTODO I-R-O™ DENTRO DE LA APP",
      h2: "Si puedes identificarlo, puedes reencuadrarlo. Si puedes reencuadrarlo, puedes optimizarlo.",
      body: "La mayoría de las apps de productividad organizan tus tareas. G-Frame trabaja una capa más profunda: los patrones cognitivos que generan la procrastinación, el perfeccionismo y el autosabotaje en primer lugar.",
      steps: [
        { n: "01", t: "Situación", d: "¿Qué desencadenó la fricción?", ai: false },
        { n: "02", t: "Emoción", d: "Nómbrala. Mide su intensidad del 1 al 10.", ai: false },
        { n: "03", t: "Creencia núcleo", d: "¿Qué dice este pensamiento sobre ti?", ai: false },
        { n: "04", t: "Laboratorio de pensamientos", d: "Con IA, reencuadra el pensamiento automático en uno funcional.", ai: true },
        { n: "05", t: "Optimizar", d: "Traduce el pensamiento reencuadrado en acción concreta.", ai: false },
      ],
    },
    features: {
      eyebrow: "QUÉ INCLUYE G-FRAME",
      h2: "Funcionalidades clave.",
      items: [
        { t: "Motor de Reestructuración", d: "Registra situaciones, mide emociones, llega a la creencia núcleo. Convierte lo subjetivo en medible.", ai: false },
        { t: "Laboratorio de Pensamientos con IA", d: "Asistencia inteligente para reencuadrar pensamientos automáticos con metodología CBT coaching. Aprende mientras lo haces.", ai: true },
        { t: "Activador Matutino", d: "Rutina diaria de activación cognitiva para preparar la ejecución antes de que empiece la fricción.", ai: false },
        { t: "Diagnóstico de Ejecución", d: "Identifica tus patrones recurrentes. Entiende si tu fricción principal es procrastinación, perfeccionismo, autosabotaje o impostor pattern. Trabaja directamente sobre el patrón.", ai: false },
      ],
    },
    prototype: {
      eyebrow: "PROTOTIPO EN PANTALLA",
      h2: "Una ruta corta para entender qué te bloquea y convertirlo en acción.",
      body: "Estos mock-ups muestran la experiencia actual de G-Frame: una pantalla de inicio orientada a la acción, una ruta I-R-O clara y módulos específicos para reencuadrar, profundizar o activar el día.",
      items: [
        { title: "Inicio", description: "La puerta de entrada: rutas cortas, estado de sesión y próximos pasos.", alt: "Mock-up de Inicio de G-Frame." },
        { title: "Ruta I-R-O", description: "El usuario no revisa todo: sigue una secuencia guiada para identificar, reencuadrar y optimizar.", alt: "Mock-up de la Ruta I-R-O de G-Frame." },
        { title: "Motor de Reestructuración", description: "Dos rutas para trabajar un pensamiento: rápido cuando hay bloqueo, profundo cuando el patrón se repite.", alt: "Mock-up del Motor de Reestructuración de G-Frame." },
        { title: "Quick Reframe", description: "Una intervención breve para ordenar un pensamiento bloqueante y convertirlo en una acción concreta.", alt: "Mock-up de Quick Reframe de G-Frame." },
        { title: "Restructure Lab", description: "Un flujo más profundo para formular, examinar y reencuadrar patrones recurrentes.", alt: "Mock-up de Restructure Lab de G-Frame." },
        { title: "Activador matutino", description: "Una decisión de ejecución diaria para preparar el sistema antes de que aparezca la fricción.", alt: "Mock-up del Activador matutino de G-Frame." },
      ],
    },
    plans: {
      eyebrow: "ELIGE TU ACCESO",
      h2: "Planes.",
      featuredBadge: "DESTACADO",
      cards: [
        {
          name: "FREE",
          price: "Gratis",
          items: [
            "3 registros en el Motor de Reestructuración",
            "5 Activadores Matutinos por mes",
            "Fase 1 de la Guía CBT coaching",
            "Recursos base",
          ],
          ctaLabel: "Acceso gratuito al lanzar",
          variant: "outline",
        },
        {
          name: "PLUS",
          price: "$20/mes",
          featured: true,
          items: [
            "Motor de Reestructuración ilimitado",
            "Activadores Matutinos ilimitados",
            "Guía CBT coaching completa — todas las fases",
            "Laboratorio de Pensamientos con IA — acceso completo",
            "Plataforma de Diagnóstico de Ejecución",
          ],
          ctaLabel: "Unirme con Plus",
          variant: "primary",
        },
        {
          name: "VIP",
          price: "$50/mes",
          items: [
            "Todo lo de Plus",
            "Sesión mensual con coach humano",
            "Auditoría mensual de tus patrones cognitivos",
            "Foro privado de comunidad VIP",
            "Masterclasses premium de ejecución",
          ],
          ctaLabel: "Unirme con VIP",
          variant: "outline",
        },
      ],
    },
    waitlist: {
      h2: "Sé parte del primer grupo.",
      body: "G-Frame está en prototipo activo. Los primeros usuarios en Ecuador tendrán acceso anticipado, precio de fundadores y la oportunidad de dar forma al producto con su feedback.",
      emailLabel: "Correo electrónico",
      emailPlaceholder: "tu@correo.com",
      submitIdle: "Quiero acceso anticipado",
      submitDone: "Gracias ✓",
      submitLoading: "Enviando…",
      foot: "Lanzamiento Q3 2026 · Solo en Ecuador en primera fase · Sin spam, solo actualizaciones del producto.",
      successToast: "Listo. Te avisaremos del lanzamiento.",
      errorToast: "No pudimos guardar tu correo. Intenta de nuevo.",
      invalidToast: "Correo inválido. Revisa el formato.",
    },
    note: {
      label: "Nota metodológica",
      body: "G-Frame es una herramienta de coaching de ejecución, no una aplicación clínica. No diagnostica, no trata y no reemplaza la psicoterapia, la psicología clínica ni la psiquiatría. Aplica el método I-R-O™ con metodología CBT coaching para ayudarte a identificar, reencuadrar y optimizar los patrones cognitivos que bloquean tu ejecución.",
    },
    counterText: (n) => `${n} personas ya están en la lista de espera.`,
    aiBadge: "IA",
  },
  en: {
    hero: {
      eyebrow: "G-STRUCTURE'S MAIN PRODUCT · I-R-O™ METHOD · LAUNCH Q3 2026",
      h1: "G-Frame turns the I-R-O™ Method into an execution platform.",
      leadA: "Identify, reframe, and optimize your execution",
      leadB: "with applied CBT coaching methodology.",
      body: "G-Frame identifies the cognitive-behavioral friction blocking your execution, helps you reframe it with the I-R-O™ Method, and optimizes your action. Not to make you feel better — to make you execute better.",
      disclaimer: "We are not therapy. Not clinical diagnosis. G-Frame is a coaching, psychoeducation and execution-optimization tool based on cognitive-behavioral principles.",
      cta: "Join the waitlist",
      counter: (n) => `${n} people are already on the waitlist.`,
      launchNote: "Early access available for Ecuador first. Launch Q3 2026.",
      osLabel: "G-FRAME · COGNITIVE OS",
      iro: "I-R-O™ · IDENTIFY · REFRAME · OPTIMIZE",
      version: "v0.1 · BETA",
      imgAlt: "Mock-up of the G-Frame home screen.",
      captions: ["Restructuring Engine", "Execution Diagnostic", "Morning Activator"],
    },
    engine: {
      eyebrow: "THE I-R-O™ METHOD INSIDE THE APP",
      h2: "If you can identify it, you can reframe it. If you can reframe it, you can optimize it.",
      body: "Most productivity apps organize your tasks. G-Frame works one layer deeper: the cognitive patterns that generate procrastination, perfectionism and self-sabotage in the first place.",
      steps: [
        { n: "01", t: "Situation", d: "What triggered the friction?", ai: false },
        { n: "02", t: "Emotion", d: "Name it. Rate its intensity from 1 to 10.", ai: false },
        { n: "03", t: "Core belief", d: "What does this thought say about you?", ai: false },
        { n: "04", t: "Thought Lab", d: "With AI, reframe the automatic thought into a functional one.", ai: true },
        { n: "05", t: "Optimize", d: "Translate the reframed thought into concrete action.", ai: false },
      ],
    },
    features: {
      eyebrow: "WHAT G-FRAME INCLUDES",
      h2: "Key features.",
      items: [
        { t: "Restructuring Engine", d: "Log situations, measure emotions, reach the core belief. Turn the subjective into the measurable.", ai: false },
        { t: "AI Thought Lab", d: "Intelligent assistance to reframe automatic thoughts with CBT coaching methodology. Learn while you do it.", ai: true },
        { t: "Morning Activator", d: "Daily cognitive-activation routine to prepare execution before friction begins.", ai: false },
        { t: "Execution Diagnostic", d: "Identify your recurring patterns. Understand whether your main friction is procrastination, perfectionism, self-sabotage or the impostor pattern. Work directly on the pattern.", ai: false },
      ],
    },
    prototype: {
      eyebrow: "PROTOTYPE SCREENS",
      h2: "A short route to understand what blocks you and turn it into action.",
      body: "These mock-ups show the current G-Frame experience: an action-oriented home screen, a clear I-R-O route, and specific modules to reframe, go deeper, or activate the day.",
      items: [
        { title: "Home", description: "The entry point: short routes, active session state, and next steps.", alt: "G-Frame Home mock-up." },
        { title: "I-R-O Route", description: "The user does not review everything: they follow a guided sequence to identify, reframe, and optimize.", alt: "G-Frame I-R-O Route mock-up." },
        { title: "Restructuring Engine", description: "Two paths for working with a thought: quick when blocked, deeper when the pattern repeats.", alt: "G-Frame Restructuring Engine mock-up." },
        { title: "Quick Reframe", description: "A brief intervention to organize a blocking thought and turn it into a concrete action.", alt: "G-Frame Quick Reframe mock-up." },
        { title: "Restructure Lab", description: "A deeper flow to formulate, examine, and reframe recurring patterns.", alt: "G-Frame Restructure Lab mock-up." },
        { title: "Morning Activator", description: "A daily execution decision to prepare the system before friction appears.", alt: "G-Frame Morning Activator mock-up." },
      ],
    },
    plans: {
      eyebrow: "CHOOSE YOUR ACCESS",
      h2: "Plans.",
      featuredBadge: "FEATURED",
      cards: [
        {
          name: "FREE",
          price: "Free",
          items: [
            "3 entries in the Restructuring Engine",
            "5 Morning Activators per month",
            "Phase 1 of the CBT coaching guide",
            "Base resources",
          ],
          ctaLabel: "Free access at launch",
          variant: "outline",
        },
        {
          name: "PLUS",
          price: "$20/mo",
          featured: true,
          items: [
            "Unlimited Restructuring Engine",
            "Unlimited Morning Activators",
            "Full CBT coaching guide — all phases",
            "AI Thought Lab — full access",
            "Execution Diagnostic platform",
          ],
          ctaLabel: "Join with Plus",
          variant: "primary",
        },
        {
          name: "VIP",
          price: "$50/mo",
          items: [
            "Everything in Plus",
            "Monthly session with a human coach",
            "Monthly audit of your cognitive patterns",
            "Private VIP community forum",
            "Premium execution masterclasses",
          ],
          ctaLabel: "Join with VIP",
          variant: "outline",
        },
      ],
    },
    waitlist: {
      h2: "Be part of the first cohort.",
      body: "G-Frame is in active prototype. Early users in Ecuador will get early access, founder pricing and the chance to shape the product with their feedback.",
      emailLabel: "Email",
      emailPlaceholder: "you@email.com",
      submitIdle: "I want early access",
      submitDone: "Thanks ✓",
      submitLoading: "Sending…",
      foot: "Launch Q3 2026 · Ecuador-only in the first phase · No spam, only product updates.",
      successToast: "Done. We'll let you know at launch.",
      errorToast: "We couldn't save your email. Please try again.",
      invalidToast: "Invalid email. Check the format.",
    },
    note: {
      label: "Methodological note",
      body: "G-Frame is an execution-coaching tool, not a clinical application. It does not diagnose, treat, or replace psychotherapy, clinical psychology, or psychiatry. It applies the I-R-O™ Method with CBT coaching methodology to help you identify, reframe, and optimize the cognitive patterns blocking your execution.",
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
      <Engine locale={locale} />
      <Features locale={locale} />
      <PrototypeGallery locale={locale} />
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
          <p className="mt-5 max-w-xl font-display text-lg md:text-xl italic text-foreground/70 leading-snug">
            {c.leadA}
            <br className="hidden sm:block" />
            {c.leadB}
          </p>
          <p className="mt-6 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">{c.body}</p>
          <p className="mt-3 max-w-xl text-xs text-muted-foreground leading-relaxed">{c.disclaimer}</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#waitlist"
              onClick={() => trackCtaClick("gstruct_hero_waitlist", { source: "gstruct_page" })}
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
          <div className="relative border border-[color:var(--color-brand-deep)] bg-[color:var(--color-brand-deep)] p-6 md:p-8">
            <div className="absolute inset-0 grid-bg opacity-25" aria-hidden />
            <div className="relative flex items-center justify-between">
              <span className="font-display text-[10px] font-semibold tracking-[0.22em] text-[color:var(--color-background)]/70">
                {c.osLabel}
              </span>
              <BrandMark size={20} />
            </div>
            <img
              src={mockupInicio}
              alt={c.imgAlt}
              loading="lazy"
              width={900}
              height={1125}
              className="relative mt-5 w-full h-auto object-contain"
            />
            <div className="relative mt-3 flex items-center justify-between border-t border-[color:var(--color-background)]/20 pt-3 text-[10px] tracking-[0.22em] text-[color:var(--color-background)]/70">
              <span>{c.iro}</span>
              <span>{c.version}</span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 divide-x divide-border border border-border bg-[color:var(--color-surface)] text-center">
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

const PROTOTYPE_IMAGES = [
  mockupInicio,
  mockupRutaIro,
  mockupMotor,
  mockupQuickReframe,
  mockupRestructureLab,
  mockupActivador,
];

function PrototypeGallery({ locale }: { locale: Locale }) {
  const c = COPY[locale].prototype;
  return (
    <Section tone="white">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <h2 className="mt-4 max-w-3xl font-display text-3xl md:text-4xl leading-[1.08]">{c.h2}</h2>
          <p className="mt-5 max-w-3xl text-base md:text-lg text-muted-foreground leading-relaxed">{c.body}</p>
        </div>
        <div className="lg:col-span-5 border-l-2 border-[color:var(--color-brand)] pl-5">
          <p className="text-sm md:text-[15px] text-foreground/80 leading-relaxed">
            {locale === "en"
              ? "The product is still in prototype, but the interaction model is already visible: diagnose, reframe, then leave with a concrete next action."
              : "El producto sigue en prototipo, pero el modelo de interacción ya es visible: diagnosticar, reencuadrar y salir con una siguiente acción concreta."}
          </p>
        </div>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {c.items.map((item, index) => (
          <figure key={item.title} className="group border border-border bg-[color:var(--color-surface)] overflow-hidden">
            <div className="bg-[color:var(--color-brand-deep)]">
              <img
                src={PROTOTYPE_IMAGES[index]}
                alt={item.alt}
                loading="lazy"
                width={900}
                height={1125}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.015]"
              />
            </div>
            <figcaption className="p-5 md:p-6">
              <p className="font-display text-[10px] font-semibold tracking-[0.22em] text-[color:var(--color-brand)]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 font-display text-base md:text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
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
  const icons = [Activity, Brain, Sun, BarChart3];
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
      onClick={() => trackCtaClick("gstruct_plan_waitlist", { plan: String(children) })}
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
    trackCtaClick("gstruct_waitlist_submit_attempt", { source: "gstruct_page" });
    setSubmitting(true);
    try {
      const res = await fetch("/api/public/gstruct-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website, source: "gstruct_page", locale }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(data?.error === "validation_failed" ? c.invalidToast : c.errorToast);
        return;
      }
      trackConversion("gstruct_waitlist_signup", { source: "gstruct_page" });
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
