import { createFileRoute } from "@tanstack/react-router";
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
import gStructHomePreview from "@/assets/g-struct-home-preview.png";
import { buildSeo, canonicalLink, jsonLdScript, breadcrumbSchema } from "@/lib/seo";
import { trackConversion } from "@/lib/analytics";

export const Route = createFileRoute("/g-struct")({
  head: () => ({
    meta: buildSeo({
      path: "/g-struct",
      title: "G-Struct | El OS Cognitivo-Conductual para High-Performers",
      description:
        "G-Struct es la primera app móvil que aplica metodología CBT coaching para identificar la fricción que bloquea tu ejecución, reencuadrarla y optimizar tu acción. Disponible en Ecuador y LATAM.",
      image: gStructHomePreview,
    }),
    links: canonicalLink("/g-struct"),
    scripts: [
      jsonLdScript(breadcrumbSchema([
        { name: "Inicio", path: "/" },
        { name: "G-Struct", path: "/g-struct" },
      ])),
    ],
  }),
  component: Page,
});

// ----- shared waitlist count hook -----
function useWaitlistCount() {
  const [count, setCount] = useState<number | null>(null);
  const fetchCount = useCallback(async () => {
    try {
      const r = await fetch("/api/public/gstruct-waitlist-count", { cache: "no-store" });
      if (!r.ok) return;
      const data = await r.json();
      if (typeof data?.count === "number" && data.count > 0) setCount(data.count);
    } catch {
      /* ignore */
    }
  }, []);
  useEffect(() => {
    fetchCount();
    const id = setInterval(fetchCount, 30_000);
    return () => clearInterval(id);
  }, [fetchCount]);
  return { count, refetch: fetchCount };
}

function WaitlistCounter({
  count,
  tone = "light",
  className,
}: {
  count: number | null;
  tone?: "light" | "dark";
  className?: string;
}) {
  if (!count || count <= 0) return null;
  const color =
    tone === "dark"
      ? "text-[color:var(--color-background)]/70"
      : "text-muted-foreground";
  return (
    <p className={`text-[13px] ${color} ${className ?? ""}`}>
      <span
        className={`inline-block h-1.5 w-1.5 rounded-full mr-2 align-middle bg-[color:var(--color-brand)]`}
        aria-hidden
      />
      {count.toLocaleString("es-EC")} personas ya están en la lista de espera.
    </p>
  );
}

function Page() {
  const waitlist = useWaitlistCount();
  return (
    <>
      <Hero count={waitlist.count} />
      <Engine />
      <Features />
      <Plans />
      <Waitlist count={waitlist.count} refetchCount={waitlist.refetch} />
      <Note />
    </>
  );
}

function Hero({ count }: { count: number | null }) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
      <div className="container-x relative py-24 md:py-32 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <Eyebrow>G-STRUCT · PROTOTIPO ACTIVO · LANZAMIENTO Q3 2026</Eyebrow>
          <h1 className="mt-6 font-display text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.04] text-foreground">
            El coach CBT en tu bolsillo. 24/7.
          </h1>
          <p className="mt-5 max-w-xl font-display text-lg md:text-xl italic text-foreground/70 leading-snug">
            Si sabes exactamente lo que tienes que hacer
            <br className="hidden sm:block" />
            y aun así no lo haces — esto es para ti.
          </p>
          <p className="mt-6 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
            G-Struct identifica la fricción cognitivo-conductual que bloquea tu ejecución, te ayuda
            a reencuadrarla usando metodología CBT coaching, y optimiza tu acción. No para que te
            sientas mejor. Para que ejecutes mejor.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#lista-de-espera"
              className="group inline-flex items-center justify-center gap-2 bg-foreground px-5 min-h-11 py-3 text-[13px] font-medium tracking-wide text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-[color:var(--color-brand)]"
            >
              Únete a la lista de espera
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
          <WaitlistCounter count={count} className="mt-4" />
          <p className="mt-2 text-xs text-muted-foreground">
            Primeros accesos disponibles para Ecuador. Lanzamiento Q3 2026.
          </p>
        </div>
        <div className="lg:col-span-5">
          <div className="relative border border-border bg-[color:var(--color-surface)] p-6 md:p-8">
            <div className="absolute inset-0 grid-bg opacity-25" aria-hidden />
            <div className="relative flex items-center justify-between">
              <span className="font-display text-[10px] font-semibold tracking-[0.22em] text-muted-foreground">
                G-STRUCT · COGNITIVE OS
              </span>
              <BrandMark size={20} />
            </div>
            <img
              src={gStructHomePreview}
              alt="Vista previa de la app G-Struct mostrando el Motor de Reestructuración."
              loading="lazy"
              width={1024}
              height={1024}
              className="relative mt-4 w-full h-auto object-contain"
            />
            <div className="relative mt-3 flex items-center justify-between border-t border-border pt-3 text-[10px] tracking-[0.22em] text-muted-foreground">
              <span>IDENTIFICAR · REENCUADRAR · OPTIMIZAR</span>
              <span>v0.1 · BETA</span>
            </div>
          </div>
          {/* Caption row (Fix 7) */}
          <div className="mt-4 grid grid-cols-3 divide-x divide-border border border-border bg-[color:var(--color-surface)] text-center">
            {[
              "Motor de Reestructuración",
              "Diagnóstico de Ejecución",
              "Activador Matutino",
            ].map((t) => (
              <p
                key={t}
                className="px-2 py-3 text-[10.5px] font-display font-semibold tracking-[0.14em] uppercase text-foreground/75"
              >
                {t}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Engine() {
  const steps = [
    { n: "01", t: "Situación", d: "¿Qué desencadenó la fricción?", ai: false },
    { n: "02", t: "Emoción", d: "Nómbrala. Mide su intensidad del 1 al 10.", ai: false },
    { n: "03", t: "Creencia núcleo", d: "¿Qué dice este pensamiento sobre ti?", ai: false },
    {
      n: "04",
      t: "Laboratorio de pensamientos",
      d: "Con IA, reencuadra el pensamiento automático en uno funcional.",
      ai: true,
    },
    { n: "05", t: "Optimizar", d: "Traduce el pensamiento reencuadrado en acción concreta.", ai: false },
  ];
  return (
    <Section tone="muted">
      <Eyebrow>EL MOTOR DE REESTRUCTURACIÓN</Eyebrow>
      <h2 className="mt-4 max-w-3xl font-display text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.08]">
        Si puedes medirlo, puedes optimizarlo.
      </h2>
      <p className="mt-6 max-w-3xl text-base md:text-lg text-muted-foreground leading-relaxed">
        La mayoría de las apps de productividad organizan tus tareas. G-Struct trabaja una capa más
        profunda: los patrones cognitivos que generan la procrastinación, el perfeccionismo y el
        autosabotaje en primer lugar.
      </p>

      {/* Desktop: horizontal flow with arrows */}
      <ol className="mt-12 hidden md:flex items-stretch gap-3">
        {steps.map((s, i) => (
          <>
            <li
              key={s.n}
              className={`flex-1 relative bg-[color:var(--color-surface)] p-5 lg:p-6 border ${
                s.ai
                  ? "border-[color:var(--color-brand)] shadow-elev-1"
                  : "border-border"
              }`}
            >
              {s.ai && (
                <span className="absolute -top-2.5 right-4 inline-flex items-center gap-1 bg-[color:var(--color-brand)] text-[color:var(--color-background)] px-2 py-0.5 text-[10px] font-semibold tracking-[0.18em]">
                  <Sparkles size={10} aria-hidden /> IA
                </span>
              )}
              <p className="font-display text-[11px] font-semibold tracking-[0.22em] text-[color:var(--color-brand)]">
                {s.n}
              </p>
              <p className="mt-3 font-display text-sm font-semibold text-foreground">{s.t}</p>
              <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed">{s.d}</p>
            </li>
            {i < steps.length - 1 && (
              <li
                key={`arrow-${s.n}`}
                className="flex items-center justify-center text-[color:var(--color-brand)]"
                aria-hidden
              >
                <ChevronRight size={20} strokeWidth={2.25} />
              </li>
            )}
          </>
        ))}
      </ol>

      {/* Mobile: vertical timeline */}
      <ol className="mt-10 md:hidden relative pl-6">
        <span
          className="absolute left-[10px] top-2 bottom-2 w-px bg-[color:var(--color-brand)]/40"
          aria-hidden
        />
        {steps.map((s) => (
          <li key={s.n} className="relative pb-6 last:pb-0">
            <span
              className={`absolute -left-6 top-2 h-3 w-3 rounded-full ${
                s.ai
                  ? "bg-[color:var(--color-brand)] ring-4 ring-[color:var(--color-brand)]/20"
                  : "bg-[color:var(--color-brand)]"
              }`}
              aria-hidden
            />
            <div
              className={`bg-[color:var(--color-surface)] p-5 border ${
                s.ai ? "border-[color:var(--color-brand)]" : "border-border"
              }`}
            >
              {s.ai && (
                <span className="inline-flex items-center gap-1 bg-[color:var(--color-brand)] text-[color:var(--color-background)] px-2 py-0.5 text-[10px] font-semibold tracking-[0.18em] mb-2">
                  <Sparkles size={10} aria-hidden /> IA
                </span>
              )}
              <p className="font-display text-[11px] font-semibold tracking-[0.22em] text-[color:var(--color-brand)]">
                {s.n}
              </p>
              <p className="mt-2 font-display text-sm font-semibold">{s.t}</p>
              <p className="mt-1.5 text-[13px] text-muted-foreground leading-relaxed">{s.d}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function Features() {
  const items = [
    {
      Icon: Activity,
      t: "Motor de Reestructuración",
      d: "Registra situaciones, mide emociones, llega a la creencia núcleo. Convierte lo subjetivo en medible.",
      ai: false,
    },
    {
      Icon: Brain,
      t: "Laboratorio de Pensamientos con IA",
      d: "Asistencia inteligente para reencuadrar pensamientos automáticos con metodología CBT coaching. Aprende mientras lo haces.",
      ai: true,
    },
    {
      Icon: Sun,
      t: "Activador Matutino",
      d: "Rutina diaria de activación cognitiva para preparar la ejecución antes de que empiece la fricción.",
      ai: false,
    },
    {
      Icon: BarChart3,
      t: "Diagnóstico de Ejecución",
      d: "Identifica tus patrones recurrentes. Entiende si tu fricción principal es procrastinación, perfeccionismo, autosabotaje o impostor pattern. Trabaja directamente sobre el patrón.",
      ai: false,
    },
  ];
  return (
    <Section>
      <Eyebrow>QUÉ INCLUYE G-STRUCT</Eyebrow>
      <h2 className="mt-4 max-w-3xl font-display text-3xl md:text-4xl leading-[1.08]">
        Funcionalidades clave.
      </h2>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {items.map(({ Icon, t, d, ai }) => (
          <div
            key={t}
            className={`relative bg-[color:var(--color-surface)] p-7 md:p-8 border transition-shadow duration-200 hover:shadow-elev-1 ${
              ai ? "border-[color:var(--color-brand)]" : "border-border"
            }`}
          >
            {ai && (
              <span className="absolute top-5 right-5 inline-flex items-center gap-1 bg-[color:var(--color-brand)] text-[color:var(--color-background)] px-2 py-0.5 text-[10px] font-semibold tracking-[0.18em]">
                <Sparkles size={10} aria-hidden /> IA
              </span>
            )}
            <span
              className="inline-flex h-11 w-11 items-center justify-center border border-border bg-background text-[color:var(--color-brand)]"
              aria-hidden
            >
              <Icon size={22} strokeWidth={1.6} />
            </span>
            <h3 className="mt-5 font-display text-[15px] md:text-base font-medium">{t}</h3>
            <p className="mt-3 text-sm md:text-[15px] text-muted-foreground leading-relaxed">{d}</p>
          </div>
        ))}
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
      href="#lista-de-espera"
      className={`group mt-7 inline-flex w-full items-center justify-center gap-2 px-5 min-h-11 py-3 text-[13px] font-medium tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[color:var(--color-brand)] ${
        variant === "ghost-light"
          ? "focus-visible:ring-offset-[color:var(--color-brand-deep)]"
          : "focus-visible:ring-offset-background"
      } ${styles}`}
    >
      {children}
      <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}

function PlanCard({
  name,
  price,
  featured,
  items,
  cta,
}: {
  name: string;
  price: string;
  featured?: boolean;
  items: string[];
  cta: { label: string; variant: "primary" | "outline" | "ghost-light" };
}) {
  return (
    <div
      className={`relative border p-7 md:p-8 flex flex-col ${
        featured
          ? "border-foreground bg-[color:var(--color-brand-deep)] text-[color:var(--color-background)]"
          : "border-border bg-[color:var(--color-surface)]"
      }`}
    >
      {featured ? (
        <span className="absolute -top-3 left-7 inline-flex items-center bg-foreground px-2.5 py-1 text-[10px] font-semibold tracking-[0.22em] text-background">
          DESTACADO
        </span>
      ) : null}
      <p
        className={`font-display text-[11px] font-semibold tracking-[0.22em] ${
          featured ? "text-[color:var(--color-background)]/70" : "text-muted-foreground"
        }`}
      >
        {name}
      </p>
      <p
        className={`mt-4 font-display text-4xl md:text-5xl font-semibold ${
          featured ? "text-[color:var(--color-background)]" : "text-foreground"
        }`}
      >
        {price}
      </p>
      <ul className="mt-6 space-y-3 flex-1">
        {items.map((it) => (
          <li key={it} className="flex gap-2.5 text-sm leading-relaxed">
            <Check
              size={16}
              className={`mt-0.5 shrink-0 ${
                featured ? "text-[color:var(--color-background)]" : "text-[color:var(--color-brand)]"
              }`}
            />
            <span
              className={
                featured ? "text-[color:var(--color-background)]/90" : "text-foreground/85"
              }
            >
              {it}
            </span>
          </li>
        ))}
      </ul>
      <PlanCTA variant={cta.variant}>{cta.label}</PlanCTA>
    </div>
  );
}

function Plans() {
  return (
    <Section id="planes" tone="muted">
      <Eyebrow>ELIGE TU ACCESO</Eyebrow>
      <h2 className="mt-4 max-w-3xl font-display text-3xl md:text-4xl leading-[1.08]">
        Planes.
      </h2>
      <div className="mt-12 grid gap-6 md:grid-cols-3 items-stretch">
        <PlanCard
          name="FREE"
          price="Gratis"
          items={[
            "3 registros en el Motor de Reestructuración",
            "5 Activadores Matutinos por mes",
            "Fase 1 de la Guía CBT coaching",
            "Recursos base",
          ]}
          cta={{ label: "Acceso gratuito al lanzar", variant: "outline" }}
        />
        <PlanCard
          name="PLUS"
          price="$20/mes"
          featured
          items={[
            "Motor de Reestructuración ilimitado",
            "Activadores Matutinos ilimitados",
            "Guía CBT coaching completa — todas las fases",
            "Laboratorio de Pensamientos con IA — acceso completo",
            "Plataforma de Diagnóstico de Ejecución",
          ]}
          cta={{ label: "Unirme con Plus", variant: "primary" }}
        />
        <PlanCard
          name="VIP"
          price="$50/mes"
          items={[
            "Todo lo de Plus",
            "Sesión mensual con coach humano",
            "Auditoría mensual de tus patrones cognitivos",
            "Foro privado de comunidad VIP",
            "Masterclasses premium de ejecución",
          ]}
          cta={{ label: "Unirme con VIP", variant: "outline" }}
        />
      </div>
    </Section>
  );
}

function Waitlist({
  count,
  refetchCount,
}: {
  count: number | null;
  refetchCount: () => void;
}) {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting || done) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/public/gstruct-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website, source: "gstruct_page", locale: "es" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(
          data?.error === "validation_failed"
            ? "Correo inválido. Revisa el formato."
            : "No pudimos guardar tu correo. Intenta de nuevo.",
        );
        return;
      }
      trackConversion("gstruct_waitlist_signup", { source: "gstruct_page" });
      setDone(true);
      toast.success("Listo. Te avisaremos del lanzamiento.");
      refetchCount();
    } catch {
      toast.error("Error de red. Intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Section id="lista-de-espera" tone="deep">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05]">
          Sé parte del primer grupo.
        </h2>
        <p className="mx-auto mt-6 text-base md:text-lg text-[color:var(--color-background)]/85 leading-relaxed">
          G-Struct está en prototipo activo. Los primeros usuarios en Ecuador tendrán acceso
          anticipado, precio de fundadores y la oportunidad de dar forma al producto con su
          feedback.
        </p>
        <form
          onSubmit={onSubmit}
          className="mx-auto mt-10 flex flex-col sm:flex-row gap-3 max-w-xl text-left"
        >
          <label htmlFor="waitlist-email" className="sr-only">
            Correo electrónico
          </label>
          <input
            id="waitlist-email"
            type="email"
            required
            placeholder="tu@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={done}
            autoComplete="email"
            inputMode="email"
            className="flex-1 min-h-12 bg-[color:var(--color-background)] border border-foreground/20 px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[color:var(--color-brand)] focus:ring-2 focus:ring-[color:var(--color-brand)]/40 disabled:opacity-70"
          />
          {/* Honeypot */}
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
            {done ? "Gracias ✓" : submitting ? "Enviando…" : "Quiero acceso anticipado"}
            {!done && !submitting ? <ArrowRight size={15} /> : null}
          </button>
        </form>
        <WaitlistCounter count={count} tone="dark" className="mt-5" />
        <p className="mx-auto mt-4 max-w-xl text-xs text-[color:var(--color-background)]/70 leading-relaxed">
          Lanzamiento Q3 2026 · Solo en Ecuador en primera fase · Sin spam, solo actualizaciones del
          producto.
        </p>
      </div>
    </Section>
  );
}

function Note() {
  return (
    <Section>
      <div className="max-w-3xl">
        <hr className="mb-6 border-t border-border" />
        <div className="border-l-2 border-[color:var(--color-brand)] bg-[color:var(--color-brand-soft)]/30 px-5 py-4">
          <p className="font-display text-[10px] font-semibold tracking-[0.22em] uppercase text-muted-foreground">
            Nota metodológica
          </p>
          <p className="mt-2 text-xs md:text-[13px] text-muted-foreground leading-relaxed">
            G-Struct es una herramienta de coaching de ejecución, no una aplicación clínica. No
            diagnostica, no trata y no reemplaza la psicoterapia, la psicología clínica ni la
            psiquiatría. Aplica metodología CBT coaching — el mismo framework utilizado por coaches
            ejecutivos a nivel global — para ayudarte a identificar y reencuadrar los patrones
            cognitivos que bloquean tu ejecución.
          </p>
        </div>
      </div>
    </Section>
  );
}
