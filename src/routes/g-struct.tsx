import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Eyebrow } from "@/components/site/Eyebrow";
import { CTALink } from "@/components/site/CTAButton";
import { Section } from "@/components/site/Section";
import { BrandMark } from "@/components/brand/Logo";
import { Check, ArrowRight } from "lucide-react";
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

function Page() {
  return (
    <>
      <Hero />
      <Engine />
      <Features />
      <Plans />
      <Waitlist />
      <Note />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
      <div className="container-x relative py-24 md:py-32 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <Eyebrow>G-STRUCT · PROTOTIPO ACTIVO · LANZAMIENTO Q3 2026</Eyebrow>
          <h1 className="mt-6 font-display text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.04] text-foreground">
            El coach CBT en tu bolsillo. 24/7.
          </h1>
          <p className="mt-6 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
            G-Struct identifica la fricción cognitivo-conductual que bloquea tu ejecución, te ayuda
            a reencuadrarla usando metodología CBT coaching, y optimiza tu acción. No para que te
            sientas mejor. Para que ejecutes mejor.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#lista-de-espera"
              className="group inline-flex items-center justify-center gap-2 bg-foreground px-5 py-3 text-[13px] font-medium tracking-wide text-background transition-opacity hover:opacity-90"
            >
              Únete a la lista de espera
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
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
        </div>
      </div>
    </section>
  );
}

function Engine() {
  const steps = [
    { n: "01", t: "SITUACIÓN", d: "¿Qué desencadenó la fricción?" },
    { n: "02", t: "EMOCIÓN", d: "Nómbrala. Mide su intensidad del 1 al 10." },
    { n: "03", t: "CREENCIA NÚCLEO", d: "¿Qué dice este pensamiento sobre ti?" },
    { n: "04", t: "LABORATORIO DE PENSAMIENTOS", d: "Con IA, reencuadra el pensamiento automático en uno funcional." },
    { n: "05", t: "OPTIMIZAR", d: "Traduce el pensamiento reencuadrado en acción concreta." },
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
      <ol className="mt-12 grid gap-px bg-border md:grid-cols-5 border border-border">
        {steps.map((s) => (
          <li key={s.n} className="bg-[color:var(--color-surface)] p-6">
            <p className="font-display text-[11px] font-semibold tracking-[0.22em] text-[color:var(--color-brand)]">
              {s.n}
            </p>
            <p className="mt-3 font-display text-sm font-semibold text-foreground tracking-wide">{s.t}</p>
            <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed">{s.d}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function Features() {
  const items = [
    { t: "Motor de Reestructuración", d: "Registra situaciones, mide emociones, llega a la creencia núcleo. Convierte lo subjetivo en medible." },
    { t: "Laboratorio de Pensamientos con IA", d: "Asistencia inteligente para reencuadrar pensamientos automáticos con metodología CBT coaching. Aprende mientras lo haces." },
    { t: "Activador Matutino", d: "Rutina diaria de activación cognitiva para preparar la ejecución antes de que empiece la fricción." },
    { t: "Diagnóstico de Ejecución", d: "Identifica tus patrones recurrentes. Entiende si tu fricción principal es procrastinación, perfeccionismo, autosabotaje o impostor pattern. Trabaja directamente sobre el patrón." },
  ];
  return (
    <Section>
      <Eyebrow>QUÉ INCLUYE G-STRUCT</Eyebrow>
      <h2 className="mt-4 max-w-3xl font-display text-3xl md:text-4xl leading-[1.08]">
        Funcionalidades clave.
      </h2>
      <div className="mt-12 grid gap-px bg-border md:grid-cols-2 border border-border">
        {items.map((f) => (
          <div key={f.t} className="bg-[color:var(--color-surface)] p-7 md:p-9">
            <h3 className="font-display text-lg md:text-xl font-semibold">{f.t}</h3>
            <p className="mt-3 text-sm md:text-[15px] text-muted-foreground leading-relaxed">{f.d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function PlanCard({ name, price, featured, items }: { name: string; price: string; featured?: boolean; items: string[] }) {
  return (
    <div
      className={`relative border p-7 md:p-8 ${featured ? "border-foreground bg-[color:var(--color-brand-deep)] text-[color:var(--color-background)]" : "border-border bg-[color:var(--color-surface)]"}`}
    >
      {featured ? (
        <span className="absolute -top-3 left-7 inline-flex items-center bg-foreground px-2.5 py-1 text-[10px] font-semibold tracking-[0.22em] text-background">
          DESTACADO
        </span>
      ) : null}
      <p className={`font-display text-[11px] font-semibold tracking-[0.22em] ${featured ? "text-[color:var(--color-background)]/70" : "text-muted-foreground"}`}>
        {name}
      </p>
      <p className={`mt-4 font-display text-4xl md:text-5xl font-semibold ${featured ? "text-[color:var(--color-background)]" : "text-foreground"}`}>
        {price}
      </p>
      <ul className="mt-6 space-y-3">
        {items.map((it) => (
          <li key={it} className="flex gap-2.5 text-sm leading-relaxed">
            <Check size={16} className={`mt-0.5 shrink-0 ${featured ? "text-[color:var(--color-background)]" : "text-foreground"}`} />
            <span className={featured ? "text-[color:var(--color-background)]/90" : "text-foreground/85"}>{it}</span>
          </li>
        ))}
      </ul>
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
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <PlanCard
          name="FREE"
          price="Gratis"
          items={[
            "3 registros en el Motor de Reestructuración",
            "5 Activadores Matutinos por mes",
            "Fase 1 de la Guía CBT coaching",
            "Recursos base",
          ]}
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
        />
      </div>
    </Section>
  );
}

function Waitlist() {
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
        toast.error(data?.error === "validation_failed" ? "Correo inválido. Revisa el formato." : "No pudimos guardar tu correo. Intenta de nuevo.");
        return;
      }
      trackConversion("gstruct_waitlist_signup", { source: "gstruct_page" });
      setDone(true);
      toast.success("Listo. Te avisaremos del lanzamiento.");
    } catch {
      toast.error("Error de red. Intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Section id="lista-de-espera" tone="deep">
      <div className="max-w-3xl">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05]">
          Sé parte del primer grupo.
        </h2>
        <p className="mt-6 text-base md:text-lg text-[color:var(--color-background)]/80 leading-relaxed">
          G-Struct está en prototipo activo. Los primeros usuarios en Ecuador tendrán acceso
          anticipado, precio de fundadores y la oportunidad de dar forma al producto con su
          feedback.
        </p>
        <form onSubmit={onSubmit} className="mt-10 flex flex-col sm:flex-row gap-3 max-w-xl">
          <input
            type="email"
            required
            placeholder="Tu correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={done}
            className="flex-1 bg-[color:var(--color-background)]/10 border border-[color:var(--color-background)]/30 px-4 py-3 text-[14px] text-[color:var(--color-background)] placeholder:text-[color:var(--color-background)]/50 focus:outline-none focus:border-[color:var(--color-background)]"
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
            className="inline-flex items-center justify-center gap-2 bg-[color:var(--color-background)] px-6 py-3 text-[13px] font-semibold tracking-wide text-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {done ? "Gracias ✓" : submitting ? "Enviando…" : "Quiero acceso anticipado"}
            {!done && !submitting ? <ArrowRight size={15} /> : null}
          </button>
        </form>
        <p className="mt-6 text-xs text-[color:var(--color-background)]/60 max-w-xl leading-relaxed">
          Lanzamiento Q3 2026 · Solo en Ecuador en primera fase · Sin spam, solo actualizaciones del producto.
        </p>
      </div>
    </Section>
  );
}

function Note() {
  return (
    <Section>
      <p className="max-w-3xl text-sm md:text-[15px] text-muted-foreground leading-relaxed">
        G-Struct es una herramienta de coaching de ejecución, no una aplicación clínica. No
        diagnostica, no trata y no reemplaza la psicoterapia, la psicología clínica ni la
        psiquiatría. Aplica metodología CBT coaching — el mismo framework utilizado por coaches
        ejecutivos a nivel global — para ayudarte a identificar y reencuadrar los patrones
        cognitivos que bloquean tu ejecución.
      </p>
    </Section>
  );
}
