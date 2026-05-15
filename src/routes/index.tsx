import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Handshake, Users, Calendar, MapPin, ExternalLink, Sparkles } from "lucide-react";
import { Section } from "@/components/site/Section";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Eyebrow } from "@/components/site/Eyebrow";
import { Reveal } from "@/components/site/Reveal";
import { MethodTabs } from "@/components/site/MethodTabs";
import { FAQ } from "@/components/site/FAQ";
import { BriefDownloadCard } from "@/components/site/BriefDownloadCard";
import { FrictionQuiz } from "@/components/site/FrictionQuiz";
import { WaitlistForm } from "@/components/site/WaitlistForm";
import { SocialProofBar } from "@/components/site/SocialProofBar";

import { CTALink, CTAExternal } from "@/components/site/CTAButton";
import { BrandMark } from "@/components/brand/Logo";
import { GuillermoPortrait } from "@/components/site/GuillermoPortrait";
import { useT } from "@/lib/i18n";
import logoCube from "@/assets/g-structure-cube.png";
import gStructHomePreview from "@/assets/g-struct-home-preview.png";
import etwBadge from "@/assets/etw-2026-badge.png";
import { buildSeo, canonicalLink, jsonLdScript, faqSchema, breadcrumbSchema } from "@/lib/seo";

const ETW_URL = "https://luma.com/lm4njhiu";

const HOME_FAQ = [
  { q: "¿Qué es G-Structure?", a: "Una iniciativa de coaching cognitivo-conductual aplicado a la ejecución, para líderes, profesionales y equipos que necesitan superar procrastinación, perfeccionismo improductivo, sobreanálisis y autosabotaje." },
  { q: "¿G-Structure ofrece terapia?", a: "No. G-Structure es coaching cognitivo-conductual aplicado a contextos de ejecución profesional. No sustituye atención clínica ni psicoterapia." },
  { q: "¿Qué es el método I-R-O?", a: "Identificar, Reencuadrar y Optimizar: una secuencia para detectar patrones que bloquean la acción, reformularlos y traducirlos en conducta funcional sostenida." },
  { q: "¿Qué es G-Struct?", a: "La capa tecnológica del método G-Structure: una herramienta digital en desarrollo para registrar patrones, estructurar ejercicios y sostener la práctica entre sesiones." },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: buildSeo({
      path: "/",
      title: "G-Structure | Metodología I-R-O · G-Struct App · Coaching Cognitivo-Conductual para Ejecución",
      description:
        "G-Structure aplica metodología CBT coaching para eliminar la fricción que bloquea la ejecución de líderes, emprendedores y equipos en Ecuador y LATAM. G-Struct es el producto digital. Enterprise es la solución para equipos.",
      image: gStructHomePreview,
    }),
    links: canonicalLink("/"),
    scripts: [
      jsonLdScript(faqSchema(HOME_FAQ)),
      jsonLdScript(breadcrumbSchema([{ name: "Inicio", path: "/" }])),
    ],
  }),
  component: Index,
});

function Hero() {
  const t = useT();
  const steps = [
    { n: "01", t: t("home.hero.step1.t"), d: t("home.hero.step1.d") },
    { n: "02", t: t("home.hero.step2.t"), d: t("home.hero.step2.d") },
    { n: "03", t: t("home.hero.step3.t"), d: t("home.hero.step3.d") },
  ];
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden="true" />
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(1200px 600px at 85% 10%, color-mix(in oklch, var(--color-brand) 10%, transparent), transparent 60%), radial-gradient(900px 500px at 0% 100%, color-mix(in oklch, var(--color-brand-deep) 8%, transparent), transparent 55%)",
        }}
      />
      <div
        className="absolute left-0 right-0 top-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, color-mix(in oklch, var(--color-brand) 30%, transparent), transparent)" }}
        aria-hidden="true"
      />

      <div className="container-x relative py-16 md:py-24 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10 lg:items-center">
          <div className="lg:col-span-7">
            <a
              href={ETW_URL}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 border border-foreground/15 bg-[color:var(--color-surface)]/85 backdrop-blur px-3.5 py-2.5 shadow-[0_1px_0_0_rgba(5,50,90,0.04),0_8px_24px_-12px_rgba(5,50,90,0.18)] transition-all hover:border-foreground/35 hover:-translate-y-0.5"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--color-brand)] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--color-brand)]" />
              </span>
              <span className="text-[10px] font-semibold tracking-[0.22em] text-foreground">
                {t("home.hero.pillTitle")}
              </span>
              <span className="hidden sm:inline text-[11px] tracking-wide text-muted-foreground">
                {t("home.hero.pillSub")}
              </span>
              <ArrowUpRight size={14} className="text-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <Eyebrow className="mt-8">{t("home.hero.eyebrow")}</Eyebrow>
            <h1 className="mt-5 max-w-2xl text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.04] text-foreground">
              {t("home.hero.h1")}
            </h1>
            <p className="mt-5 max-w-xl text-base md:text-lg text-foreground/85 leading-relaxed">
              {t("home.hero.lead")}
            </p>
            <p className="mt-5 max-w-xl text-[15px] md:text-base text-muted-foreground leading-relaxed">
              {t("home.hero.sub")}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <CTALink to="/g-struct" variant="primary">{t("home.hero.ctaPrimary")}</CTALink>
              <CTALink to="/inversores" variant="outline">{t("home.hero.ctaSecondary")}</CTALink>
            </div>

            <ul className="mt-8 grid gap-2 text-[13.5px] sm:grid-cols-2 max-w-xl">
              <li>
                <Link to="/" hash="quiz" className="group inline-flex items-center gap-2 text-foreground/85 hover:text-foreground">
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  Identifica tu patrón de ejecución
                </Link>
              </li>
              <li>
                <Link to="/" hash="lista-de-espera" className="group inline-flex items-center gap-2 text-foreground/85 hover:text-foreground">
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  Únete a la waitlist de G-Struct
                </Link>
              </li>
              <li>
                <Link to="/enterprise" className="group inline-flex items-center gap-2 text-foreground/85 hover:text-foreground">
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  Soluciones para equipos · Enterprise
                </Link>
              </li>
              <li>
                <Link to="/inversores" className="group inline-flex items-center gap-2 text-foreground/85 hover:text-foreground">
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  Oportunidad de inversión · Pre-seed
                </Link>
              </li>
            </ul>

            <div className="mt-12 grid gap-3 sm:grid-cols-3">
              {steps.map((s) => (
                <div
                  key={s.n}
                  className="group relative border border-border bg-[color:var(--color-surface)] p-4 transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-18px_rgba(5,50,90,0.35)]"
                >
                  <div
                    className="absolute left-0 top-0 h-px w-8"
                    style={{ background: "var(--color-brand)" }}
                    aria-hidden="true"
                  />
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-[11px] font-semibold tracking-[0.22em] text-muted-foreground">
                      {s.n}
                    </span>
                    <span className="font-display text-sm font-semibold text-foreground">
                      {s.t}
                    </span>
                  </div>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-muted-foreground">{s.d}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative lg:col-span-5 hidden lg:block">
            <HeroVisual />
          </div>
        </div>

        <div className="mt-14 lg:hidden">
          <HeroVisual compact />
        </div>
      </div>
    </section>
  );
}

function HeroVisual({ compact = false }: { compact?: boolean }) {
  // System mockup: stacked I-R-O panels presented as a working product surface.
  return (
    <div className={`relative ${compact ? "h-[460px]" : "h-[600px]"} w-full`}>
      {/* Ambient backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(420px 280px at 75% 12%, color-mix(in oklch, var(--color-brand) 16%, transparent), transparent 70%), radial-gradient(360px 260px at 10% 95%, color-mix(in oklch, var(--color-brand-deep) 14%, transparent), transparent 70%)",
        }}
      />
      <div className="absolute inset-0 grid-bg opacity-30" aria-hidden />

      {/* Top frame badge */}
      <div className="absolute left-0 right-0 top-0 flex items-center justify-between text-[10px] tracking-[0.22em] text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 bg-[color:var(--color-brand)]" />
          G-STRUCTURE · COGNITIVE OS
        </span>
        <span>v0.1 · LIVE</span>
      </div>

      {/* Panel 03 — Optimizar (back) */}
      <div className="absolute right-0 top-10 w-[78%] border border-border bg-[color:var(--color-surface)]/95 backdrop-blur shadow-elev-2 p-5 rotate-[1.5deg]">
        <div className="flex items-center justify-between">
          <span className="font-display text-[10px] font-semibold tracking-[0.22em] text-muted-foreground">03 · OPTIMIZAR</span>
          <span className="text-[10px] tracking-wide text-muted-foreground">Plan de acción</span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {["Decidir", "Ejecutar", "Sostener"].map((b) => (
            <div key={b} className="border border-border bg-background px-2 py-2 text-[11px] text-foreground/80">{b}</div>
          ))}
        </div>
        <div className="mt-3 h-1.5 w-full bg-border overflow-hidden">
          <div className="h-full w-[72%] bg-[color:var(--color-brand)]" />
        </div>
        <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
          <span>Continuidad</span><span className="text-foreground font-semibold">72%</span>
        </div>
      </div>

      {/* Panel 02 — Reencuadrar (mid) */}
      <div className="absolute right-6 top-32 w-[82%] border border-border bg-[color:var(--color-surface)] shadow-elev-3 p-5 -rotate-[1deg]">
        <div className="flex items-center justify-between">
          <span className="font-display text-[10px] font-semibold tracking-[0.22em] text-[color:var(--color-brand)]">02 · REENCUADRAR</span>
          <span className="text-[10px] text-muted-foreground">Patrón cognitivo</span>
        </div>
        <p className="mt-3 text-[13px] leading-snug text-foreground">
          “Si no es perfecto, no lo entrego.” → <span className="font-semibold">Avanzar con criterio reduce el costo de no decidir.</span>
        </p>
        <div className="mt-4 flex items-center gap-2 text-[10px] tracking-[0.18em] text-muted-foreground">
          <span className="border border-border px-2 py-1">PERFECCIONISMO</span>
          <span className="border border-border px-2 py-1">EVITACIÓN</span>
        </div>
      </div>

      {/* Panel 01 — Identificar (front, focus) */}
      <div className="absolute left-0 bottom-4 w-[88%] border border-foreground/15 bg-[color:var(--color-brand-deep)] text-[color:var(--color-background)] shadow-[0_30px_60px_-22px_rgba(5,50,90,0.45)] p-5">
        <div className="flex items-center justify-between">
          <span className="font-display text-[10px] font-semibold tracking-[0.22em] text-[color:var(--color-background)]/70">01 · IDENTIFICAR</span>
          <span className="text-[10px] text-[color:var(--color-background)]/60">Sesión activa</span>
        </div>
        <p className="mt-3 text-[14px] leading-snug">
          Patrón detectado: <span className="font-semibold">postergación bajo presión de decisión estratégica.</span>
        </p>
        <div className="mt-4 grid grid-cols-3 gap-3 text-[10px] tracking-wide text-[color:var(--color-background)]/75">
          <div>
            <p className="text-[color:var(--color-background)]/55">Fricción</p>
            <p className="mt-1 text-[color:var(--color-background)] font-display text-base font-semibold">Alta</p>
          </div>
          <div>
            <p className="text-[color:var(--color-background)]/55">Recurrencia</p>
            <p className="mt-1 text-[color:var(--color-background)] font-display text-base font-semibold">7d</p>
          </div>
          <div>
            <p className="text-[color:var(--color-background)]/55">Salida</p>
            <p className="mt-1 text-[color:var(--color-background)] font-display text-base font-semibold">Diseño</p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-[color:var(--color-background)]/15 pt-3">
          <span className="text-[10px] tracking-[0.22em] text-[color:var(--color-background)]/60">I → R → O</span>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold">
            Reencuadrar <ArrowRight size={12} />
          </span>
        </div>
      </div>

      {/* Floating mark */}
      <div className="absolute right-2 bottom-2 inline-flex items-center gap-2 border border-border bg-[color:var(--color-surface)] px-2.5 py-1.5 shadow-elev-1">
        <img src={logoCube} alt="" aria-hidden className="h-4 w-4 object-contain" />
        <span className="font-display text-[10px] font-semibold tracking-[0.22em] text-foreground">SISTEMA I-R-O</span>
      </div>
    </div>
  );
}

function ETWBanner() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            "linear-gradient(135deg, var(--color-brand-deep) 0%, var(--color-brand) 55%, color-mix(in oklch, var(--color-brand) 70%, #d4a90a) 100%)",
        }}
      />
      <div className="absolute inset-0 dot-bg-inverse opacity-[0.12]" aria-hidden />
      <div
        className="absolute -left-20 top-1/2 -translate-y-1/2 h-[420px] w-[420px] rounded-full opacity-30 blur-3xl"
        aria-hidden
        style={{ background: "radial-gradient(closest-side, #ffd400, transparent)" }}
      />

      <div className="container-x relative py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5 lg:col-span-4">
            <Reveal>
              <div className="relative">
                <div
                  className="absolute -inset-4 opacity-40 blur-2xl"
                  aria-hidden
                  style={{ background: "radial-gradient(closest-side, #ffd400, transparent)" }}
                />
                <a href={ETW_URL} target="_blank" rel="noreferrer" className="block">
                  <img
                    src={etwBadge}
                    alt="Badge oficial Host Ecuador Tech Week 2026 — G-Structure"
                    width={1080}
                    height={1350}
                    className="relative w-full max-w-[360px] mx-auto md:mx-0 h-auto shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55)] ring-1 ring-white/15"
                  />
                </a>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-7 lg:col-span-8 text-[color:var(--color-background)]">
            <div className="inline-flex items-center gap-2 border border-white/30 bg-white/10 backdrop-blur px-2.5 py-1 text-[10px] font-semibold tracking-[0.22em]">
              <Sparkles size={12} /> ANUNCIO OFICIAL · ETW 2026
            </div>
            <h2 className="mt-5 font-display text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.05]">
              G-Structure es Host de Ecuador Tech Week 2026.
            </h2>
            <p className="mt-4 max-w-2xl text-base md:text-lg text-white/85 leading-relaxed">
              Presentamos el <strong className="text-white">Workshop de Diagnóstico de Ejecución</strong> dentro
              de Ecuador Tech Week® powered by Startup Grind. Una experiencia curada para identificar
              patrones que bloquean la acción en profesionales, founders y equipos.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/85">
              <span className="inline-flex items-center gap-2"><Calendar size={14} /> 11–19 Julio, 2026</span>
              <span className="inline-flex items-center gap-2"><MapPin size={14} /> Guayaquil, Ecuador</span>
              <span className="inline-flex items-center gap-2 text-white/70">Powered by Startup Grind</span>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={ETW_URL}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 bg-white px-5 py-3 text-[13px] font-semibold tracking-wide text-[color:var(--color-brand-deep)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.4)]"
              >
                Ver evento oficial
                <ExternalLink size={14} className="transition-transform group-hover:translate-x-0.5" />
              </a>
              <Link
                to="/aliados-etw-2026"
                className="inline-flex items-center gap-2 border border-white/40 px-5 py-3 text-[13px] font-medium text-white transition-colors hover:bg-white/10"
              >
                Quiero ser aliado <ArrowRight size={14} />
              </Link>
            </div>
            <p className="mt-4 text-[11px] tracking-wide text-white/60">
              #SoyHost · Compartimos el propósito de hacer del Ecuador un referente tecnológico regional.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


function Announcements() {
  return (
    <Section>
      <SectionHeader
        eyebrow="MOMENTUM"
        title="Construyendo la siguiente etapa de G-Structure."
        subtitle="Estamos abriendo espacios estratégicos para aliados y colaboradores que quieran ser parte del crecimiento inicial del ecosistema G-Structure."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <Reveal>
          <AnnouncementCard
            icon={<Handshake size={20} />}
            tag="ALIADOS ETW 2026"
            title="Aliados para el Workshop de Diagnóstico de Ejecución"
            body="G-Structure está abriendo oportunidades de alianza para marcas, instituciones y empresas que quieran vincularse al Workshop de Diagnóstico de Ejecución durante Ecuador Tech Week 2026."
            short="Buscamos aliados que entiendan el valor de apoyar conversaciones serias sobre ejecución, claridad, tecnología, emprendimiento y desarrollo profesional."
            cta="Quiero ser aliado"
            to="/aliados-etw-2026"
            micro="Espacios limitados para aliados estratégicos, experiencia, sede o contenido."
          />
        </Reveal>
        <Reveal delay={120}>
          <AnnouncementCard
            icon={<Users size={20} />}
            tag="EQUIPO INICIAL"
            title="Estamos formando el equipo que construirá G-Structure y G-Struct"
            body="Buscamos colaboradores voluntarios en áreas clave para fortalecer la siguiente etapa del proyecto: producto, tecnología, ventas, marketing y negocios internacionales."
            short="No buscamos espectadores. Buscamos personas con criterio, iniciativa y ganas de construir desde una etapa temprana."
            cta="Quiero unirme al equipo"
            to="/unete-al-equipo"
            micro="Participación inicial voluntaria, con enfoque en construcción real, portafolio, aprendizaje aplicado y posible continuidad conforme el proyecto avance."
          />
        </Reveal>
      </div>
    </Section>
  );
}

function AnnouncementCard({
  icon, tag, title, body, short, cta, to, micro,
}: { icon: React.ReactNode; tag: string; title: string; body: string; short: string; cta: string; to: string; micro: string }) {
  return (
    <div className="lift relative flex h-full flex-col border border-border bg-[color:var(--color-surface)] p-8 md:p-10 overflow-hidden">
      <span
        className="absolute left-0 top-0 h-px w-16"
        style={{ background: "var(--color-brand)" }}
        aria-hidden
      />
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-[0.05]" style={{ background: "radial-gradient(closest-side, var(--color-brand), transparent)" }} aria-hidden />
      <div className="flex items-center gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center border border-border bg-[color:var(--color-brand-soft)]/40 text-foreground">
          {icon}
        </span>
        <span className="eyebrow">{tag}</span>
      </div>
      <h3 className="mt-5 font-display text-xl md:text-2xl font-semibold leading-snug">{title}</h3>
      <p className="mt-4 text-sm md:text-[15px] text-muted-foreground leading-relaxed">{body}</p>
      <p className="mt-3 text-sm md:text-[15px] text-foreground/80 leading-relaxed">{short}</p>
      <div className="mt-8 flex-1" />
      <div className="flex items-center justify-between gap-4 border-t border-border pt-6">
        <p className="text-xs text-muted-foreground max-w-[58%]">{micro}</p>
        <Link
          to={to}
          className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-foreground"
        >
          {cta} <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}

function Problem() {
  const cards = [
    {
      t: "Procrastinación",
      d: "Cuando la acción se posterga aunque la tarea sea importante.",
      reveal: "¿Lo pospones aunque sabes que es importante? G-Struct trabaja este patrón.",
    },
    {
      t: "Perfeccionismo improductivo",
      d: "Cuando el estándar se vuelve una excusa elegante para no avanzar.",
      reveal: "¿El estándar se volvió una excusa elegante? Hay un patrón detrás de eso.",
    },
    {
      t: "Sobreanálisis",
      d: "Cuando pensar más deja de aclarar y empieza a paralizar.",
      reveal: "¿Pensar más dejó de ayudar? Eso tiene una estructura cognitiva específica.",
    },
    {
      t: "Autosabotaje",
      d: "Cuando la conducta contradice el objetivo que la persona dice querer.",
      reveal: "¿Tu conducta contradice tu objetivo? El Motor de Reestructuración mapea por qué.",
    },
    {
      t: "Bloqueo de ejecución",
      d: "Cuando hay intención, pero no hay salida funcional a la acción.",
      reveal: "¿Hay intención pero no hay salida? G-Struct convierte eso en acción.",
    },
  ];
  return (
    <Section tone="muted">
      <SectionHeader
        eyebrow="EL PROBLEMA"
        title="No siempre falta capacidad. A veces sobra fricción."
        subtitle="Muchos profesionales y equipos saben lo que tienen que hacer. Tienen objetivos, recursos, información y experiencia. Pero entre la intención y la acción aparece una zona de interferencia: pensamientos rígidos, lectura distorsionada del riesgo, perfeccionismo improductivo, evitación o decisiones que se postergan demasiado."
      />
      <p className="mt-6 max-w-3xl text-base md:text-lg text-foreground leading-relaxed">
        G-Structure trabaja precisamente en esa zona: donde la cognición, la emoción y la conducta
        empiezan a bloquear la ejecución.
      </p>
      <div className="mt-12 grid gap-px bg-border md:grid-cols-3 lg:grid-cols-5 border border-border">
        {cards.map((c) => (
          <div
            key={c.t}
            className="group relative bg-[color:var(--color-surface)] p-6 transition-colors hover:bg-[color:var(--color-brand-soft)]/40 focus-within:bg-[color:var(--color-brand-soft)]/40"
            tabIndex={0}
          >
            <h3 className="font-display text-base font-semibold">{c.t}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.d}</p>
            <div className="mt-3 max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-40 group-hover:opacity-100 group-focus-within:max-h-40 group-focus-within:opacity-100">
              <p className="text-xs text-foreground/80 leading-relaxed">{c.reveal}</p>
              <Link
                to="/"
                hash="quiz"
                className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-medium text-foreground"
              >
                <ArrowRight size={12} /> Haz el diagnóstico
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function MentalOS() {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <SectionHeader
            eyebrow="NUESTRA LECTURA"
            title="Tratamos la mente como un sistema operativo."
          />
          <div className="mt-8 space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
            <p>
              En contextos de alta exigencia, el problema no siempre está en la meta. Muchas veces
              está en el procesamiento: cómo se interpreta la presión, cómo se anticipa el error,
              cómo se evalúa el riesgo y cómo se convierte una decisión en conducta.
            </p>
            <p>
              Cuando ese sistema entra en fricción, la acción se distorsiona. G-Structure interviene
              sobre esos patrones para que la persona o el equipo pueda pensar con más claridad,
              decidir con más precisión y actuar con mayor consistencia.
            </p>
          </div>
        </div>
        <aside className="lg:col-span-5 flex">
          <blockquote className="relative flex-1 border-l-2 border-foreground p-8 md:p-10 bg-[color:var(--color-brand-soft)]/30">
            <BrandMark size={28} className="opacity-60" />
            <p className="mt-6 font-display text-xl md:text-2xl leading-snug text-foreground">
              El orden mental no es un lujo. Es la base de una acción clara, funcional y sostenible.
            </p>
          </blockquote>
        </aside>
      </div>
    </Section>
  );
}

function Method() {
  return (
    <Section id="metodo" tone="deep" className="relative overflow-hidden">
      <div className="absolute inset-0 dot-bg-inverse opacity-[0.07] pointer-events-none" aria-hidden />
      <img
        src={logoCube}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-20 -bottom-20 h-[420px] w-[420px] opacity-[0.05] invert brightness-200 select-none"
      />
      <div className="relative max-w-3xl">
        <p className="eyebrow text-[color:var(--color-background)]/70">EL MÉTODO</p>
        <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.08]">
          Identificar. Reencuadrar. Optimizar.
        </h2>
        <p className="mt-5 text-base md:text-lg text-[color:var(--color-background)]/75 leading-relaxed">
          Un framework estructurado para convertir fricción cognitivo-conductual en acción funcional.
          Selecciona cada fase para ver el detalle.
        </p>
      </div>
      <div className="relative">
        <MethodTabs />
      </div>
      <p className="relative mt-10 max-w-3xl text-xs md:text-[13px] text-[color:var(--color-background)]/60 leading-relaxed">
        El método I-R-O está basado en principios de la Terapia Cognitivo-Conductual (CBT), adaptados
        a contextos de ejecución profesional. No constituye terapia ni sustituye atención clínica.
      </p>
    </Section>
  );
}

function FAQSection() {
  return (
    <Section tone="muted">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeader
            eyebrow="PREGUNTAS FRECUENTES"
            title="Antes de agendar, esto suele aparecer."
            subtitle="Respuestas breves a las preguntas más comunes sobre el método, los procesos y la app."
          />
          <div className="mt-8">
            <CTALink to="/contacto" variant="outline">Tengo otra pregunta</CTALink>
          </div>
        </div>
        <div className="lg:col-span-7">
          <FAQ />
        </div>
      </div>
    </Section>
  );
}

function Solutions() {
  const items = [
    {
      t: "Workshop de Diagnóstico",
      d: "Sesión estratégica para identificar fricciones de ejecución en profesionales, líderes o equipos.",
      ideal: "Empresas, founders o equipos que necesitan entender qué está bloqueando la acción antes de diseñar una intervención.",
      cta: "Explorar workshop", to: "/enterprise",
    },
    {
      t: "REESTRUCTURA Enterprise",
      d: "Programa piloto de 4 semanas para trabajar patrones de procrastinación, perfeccionismo, sobreanálisis y autosabotaje en equipos.",
      ideal: "Organizaciones que necesitan mejorar claridad, toma de decisiones y consistencia conductual.",
      cta: "Solicitar información", to: "/enterprise",
    },
    {
      t: "REESTRUCTURA 1:1",
      d: "Proceso individual de coaching cognitivo-conductual para profesionales que necesitan intervenir sus propios bloqueos de ejecución.",
      ideal: "Líderes, emprendedores y profesionales que quieren trabajar su patrón personal de acción.",
      cta: "Conocer proceso individual", to: "/reestructura-1-1",
    },
    {
      t: "Continuidad Enterprise",
      d: "Seguimiento mensual o trimestral para consolidar avances, revisar patrones recurrentes y sostener cambios en la ejecución.",
      ideal: "Equipos que necesitan mantener el trabajo después de una intervención inicial.",
      cta: "Diseñar continuidad", to: "/enterprise",
    },
  ] as const;
  return (
    <Section>
      <SectionHeader
        eyebrow="SOLUCIONES"
        title="Intervenciones estructuradas para personas y equipos que necesitan ejecutar mejor."
        subtitle="G-Structure opera a través de diagnósticos, programas breves y procesos de continuidad diseñados para contextos profesionales de alta exigencia."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {items.map((it, idx) => (
          <Reveal key={it.t} delay={idx * 80}>
            <div className="lift relative flex h-full flex-col border border-border bg-[color:var(--color-surface)] p-7 md:p-9 overflow-hidden">
              <span className="absolute left-0 top-0 h-px w-12" style={{ background: "var(--color-brand)" }} aria-hidden />
              <span className="font-display text-[10px] font-semibold tracking-[0.22em] text-muted-foreground">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-xl md:text-2xl font-semibold">{it.t}</h3>
              <p className="mt-3 text-sm md:text-[15px] text-muted-foreground leading-relaxed">{it.d}</p>
              <div className="mt-5 border-t border-border pt-4">
                <p className="eyebrow mb-2">Ideal para</p>
                <p className="text-sm text-foreground/80 leading-relaxed">{it.ideal}</p>
              </div>
              <div className="mt-auto pt-6">
                <Link to={it.to} className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-foreground">
                  {it.cta} <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function ForWhom() {
  const a = [
    "Profesionales con alta carga de decisión.",
    "Líderes que necesitan mayor claridad de acción.",
    "Founders que viven bajo presión constante.",
    "Equipos que postergan decisiones importantes.",
    "Organizaciones que quieren intervenir fricciones de ejecución sin caer en charlas motivacionales.",
  ];
  const b = [
    "Procrastinación en tareas críticas.",
    "Reuniones que no se traducen en acción.",
    "Perfeccionismo que retrasa entregables.",
    "Sobreanálisis en decisiones estratégicas.",
    "Desgaste por falta de claridad operativa.",
    "Patrones repetidos de bloqueo, evitación o autosabotaje.",
  ];
  return (
    <Section tone="muted">
      <SectionHeader
        eyebrow="APLICACIÓN"
        title="Diseñado para contextos donde pensar bien no basta: hay que ejecutar."
      />
      <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-16">
        <List title="G-Structure es para:" items={a} />
        <List title="Es especialmente útil cuando aparecen:" items={b} />
      </div>
      <p className="mt-12 max-w-3xl font-display text-xl md:text-2xl leading-snug text-foreground">
        El objetivo no es hacer más por hacer más. Es pensar, decidir y actuar con mayor precisión.
      </p>
    </Section>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="eyebrow mb-5">{title}</p>
      <ul className="space-y-4">
        {items.map((i) => (
          <li key={i} className="flex gap-3 border-b border-border pb-4">
            <span className="mt-2 h-1 w-3 shrink-0 bg-foreground" />
            <span className="text-sm md:text-[15px] text-foreground/85 leading-relaxed">{i}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function GStructBridge() {
  const features = [
    { t: "Motor de Reestructuración", d: "Identifica la situación, nombra la emoción, mide su intensidad, llega a la creencia núcleo. Si puedes medirlo, puedes optimizarlo." },
    { t: "Laboratorio de Pensamientos con IA", d: "Con asistencia de inteligencia artificial, aprende a reencuadrar el pensamiento automático en uno funcional que habilite la acción." },
    { t: "Diagnóstico de Ejecución", d: "Identifica tus patrones recurrentes — procrastinación, perfeccionismo, autosabotaje — y trabaja directamente sobre ellos." },
  ];
  return (
    <Section tone="white" id="producto">
      <div className="flex flex-wrap items-center gap-3">
        <span className="eyebrow">EL PRODUCTO · G-STRUCT</span>
        <span className="border border-border px-2.5 py-1 text-[10px] font-semibold tracking-[0.22em] text-muted-foreground">
          PROTOTIPO ACTIVO · LANZAMIENTO Q3 2026
        </span>
      </div>
      <h2 className="mt-4 max-w-3xl font-display text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.08]">
        G-Struct es el producto principal de G-Structure.
      </h2>
      <p className="mt-5 max-w-3xl text-base md:text-lg text-muted-foreground leading-relaxed">
        Una app diseñada para convertir el método <strong className="text-foreground">Identificar → Reencuadrar → Optimizar</strong> en
        una herramienta diaria de ejecución para profesionales, founders y equipos.
      </p>
      <p className="mt-3 max-w-3xl text-xs md:text-[13px] text-muted-foreground leading-relaxed">
        No somos una app de terapia. No hacemos diagnóstico clínico. G-Struct es una herramienta de
        coaching, psicoeducación y optimización de ejecución basada en principios cognitivo-conductuales.
      </p>

      <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-7 space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
          <p>
            G-Struct lleva el método I-R-O a tu bolsillo. Una app móvil diseñada para identificar la
            fricción que bloquea tu ejecución, reencuadrarla con metodología CBT coaching, y optimizar
            tu acción — disponible 24/7.
          </p>
          <p className="text-foreground/85">
            No es una app de bienestar. No es un diario de pensamientos. No es otra lista de tareas.
            Es la herramienta que separa a quienes saben lo que hay que hacer de quienes realmente lo
            hacen.
          </p>
        </div>
        <div className="lg:col-span-5">
          <div className="relative border border-border bg-[color:var(--color-surface)] p-6">
            <img
              src={gStructHomePreview}
              alt="Vista previa de la app G-Struct."
              loading="lazy"
              width={1024}
              height={1024}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-px bg-border md:grid-cols-3 border border-border">
        {features.map((f) => (
          <div key={f.t} className="bg-[color:var(--color-surface)] p-7">
            <h3 className="font-display text-base md:text-lg font-semibold">{f.t}</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <p className="eyebrow">PLANES</p>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div className="border border-border bg-[color:var(--color-surface)] p-7">
            <p className="font-display text-[11px] font-semibold tracking-[0.22em] text-muted-foreground">FREE</p>
            <p className="mt-3 font-display text-3xl font-semibold">Gratis</p>
            <ul className="mt-5 space-y-2 text-sm text-foreground/85 leading-relaxed">
              <li>· 3 registros en el Motor de Reestructuración</li>
              <li>· 5 Activadores Matutinos por mes</li>
              <li>· Fase 1 de la Guía CBT</li>
              <li>· Recursos base</li>
            </ul>
          </div>
          <div className="relative border border-foreground bg-[color:var(--color-brand-deep)] text-[color:var(--color-background)] p-7">
            <span className="absolute -top-3 left-7 inline-flex items-center bg-foreground px-2.5 py-1 text-[10px] font-semibold tracking-[0.22em] text-background">DESTACADO</span>
            <p className="font-display text-[11px] font-semibold tracking-[0.22em] text-[color:var(--color-background)]/70">PLUS</p>
            <p className="mt-3 font-display text-3xl font-semibold">$20 / mes</p>
            <ul className="mt-5 space-y-2 text-sm text-[color:var(--color-background)]/90 leading-relaxed">
              <li>· Motor de Reestructuración ilimitado</li>
              <li>· Activadores Matutinos ilimitados</li>
              <li>· Guía CBT completa</li>
              <li>· Laboratorio de Pensamientos con IA</li>
              <li>· Plataforma de Diagnóstico de Ejecución</li>
            </ul>
          </div>
          <div className="border border-border bg-[color:var(--color-surface)] p-7">
            <p className="font-display text-[11px] font-semibold tracking-[0.22em] text-muted-foreground">VIP</p>
            <p className="mt-3 font-display text-3xl font-semibold">$50 / mes</p>
            <ul className="mt-5 space-y-2 text-sm text-foreground/85 leading-relaxed">
              <li>· Sesión mensual con coach humano</li>
              <li>· Auditoría mensual de patrones</li>
              <li>· Foro privado de comunidad</li>
              <li>· Masterclasses premium</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center text-center gap-3">
        <CTALink to="/g-struct" variant="primary">Únete a la lista de espera</CTALink>
        <p className="text-sm text-muted-foreground">
          Sé parte del primer grupo que accede a G-Struct en Ecuador.
        </p>
      </div>
    </Section>
  );
}

function Founder() {
  const credentials = [
    "CBT Coach Practitioner · CTAA",
    "Psicología & Intervención Educativa",
    "Docencia internacional",
    "MV Logos Hope · gerencia de proyectos",
    "G-Struct con ÉPICO",
  ];
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
        <aside className="lg:col-span-4 lg:order-1 order-2 flex justify-center lg:justify-start">
          <GuillermoPortrait size="md" />
        </aside>
        <div className="lg:col-span-8 lg:order-2 order-1">
          <SectionHeader
            eyebrow="QUIÉN ESTÁ DETRÁS"
            title="Dirección metodológica con experiencia educativa, cognitivo-conductual y de proyectos."
          />
          <div className="mt-6 space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
            <p>
              <strong className="text-foreground font-semibold">Guillermo Suco</strong> es fundador
              de G-Structure y Coach especializado en procesos cognitivo-conductuales aplicados a la
              ejecución. Su trabajo integra Psicología, intervención educativa, gerencia de
              proyectos multiculturales y desarrollo de producto digital.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {credentials.map((c) => (
              <span
                key={c}
                className="border border-border bg-[color:var(--color-surface)] px-3 py-1.5 text-[11.5px] tracking-wide text-foreground/80"
              >
                {c}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <CTAExternal href="https://wa.me/593986875121" variant="primary">Conversar con Guillermo</CTAExternal>
            <CTALink to="/sobre-guillermo" variant="outline">Ver perfil</CTALink>
          </div>
        </div>
      </div>
    </Section>
  );
}

function FinalCTA() {
  return (
    <Section tone="deep">
      <div className="max-w-3xl">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05]">
          La fricción no se resuelve sola. Y el tiempo que pierdes hoy no lo recuperas mañana.
        </h2>
        <p className="mt-6 text-base md:text-lg text-[color:var(--color-background)]/80 leading-relaxed">
          Si eres un profesional o emprendedor que quiere ejecutar mejor, únete a G-Struct. Si lideras
          un equipo u organización donde la fricción está costando resultados, hablemos de Enterprise.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <CTALink to="/g-struct" variant="inverse">Únete a G-Struct</CTALink>
          <CTALink to="/enterprise" variant="ghost" className="text-[color:var(--color-background)] hover:bg-[color:var(--color-background)]/10">
            Soluciones para equipos
          </CTALink>
        </div>
      </div>
    </Section>
  );
}

function Index() {
  return (
    <>
      <Hero />
      <SocialProofBar />
      <Problem />
      <Method />
      <FrictionQuiz />
      <GStructBridge />
      <WaitlistForm />
      <Solutions />
      <ETWBanner />
      <Founder />
      <Announcements />
      <Section tone="muted">
        <BriefDownloadCard />
      </Section>
      <FAQSection />
      <FinalCTA />
    </>
  );
}
