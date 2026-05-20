import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Eyebrow } from "@/components/site/Eyebrow";
import { CTALink, CTAExternal } from "@/components/site/CTAButton";
import { Check, ArrowRight, X } from "lucide-react";
import reestructuraLogo from "@/assets/reestructura-1-1-logo.webp";
import { buildSeo, canonicalLink, jsonLdScript, breadcrumbSchema } from "@/lib/seo";
import { BookingDialog } from "@/components/booking/BookingDialog";
import { findPackage, type BookablePackage } from "@/lib/booking-catalog";

export const Route = createFileRoute("/reestructura-1-1")({
  head: () => ({
    meta: buildSeo({
      path: "/reestructura-1-1",
      title: "REESTRUCTURA 1:1 | Validación individual del método I-R-O",
      description:
        "Canal individual de validación de G-Structure para aplicar el método I-R-O con profesionales, líderes y emprendedores mientras alimenta el desarrollo de G-Struct.",
      image: reestructuraLogo,
    }),
    links: canonicalLink("/reestructura-1-1"),
    scripts: [
      jsonLdScript(breadcrumbSchema([
        { name: "Inicio", path: "/" },
        { name: "REESTRUCTURA 1:1", path: "/reestructura-1-1" },
      ])),
    ],
  }),
  component: Page,
});

function Page() {
  const [bookingPkg, setBookingPkg] = useState<BookablePackage | null>(null);
  const openBooking = (slug: string) => setBookingPkg(findPackage(slug) ?? null);
  return (
    <>
      <BookingDialog
        pkg={bookingPkg}
        open={!!bookingPkg}
        onOpenChange={(o) => !o && setBookingPkg(null)}
      />
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-50" aria-hidden />
        <div className="container-x relative py-20 md:py-28 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <Eyebrow>REESTRUCTURA 1:1</Eyebrow>
              <h1 className="mt-6 max-w-3xl text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.05]">
                Intervén el patrón antes de exigirte más disciplina.
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
                Un proceso individual de coaching cognitivo-conductual para profesionales,
                líderes y emprendedores que enfrentan procrastinación, perfeccionismo,
                sobreanálisis o autosabotaje.
              </p>
              <p className="mt-4 max-w-2xl text-sm md:text-base text-muted-foreground/90 leading-relaxed">
                No se trata de motivarte por unos días. Se trata de entender cómo estás
                procesando la presión, el riesgo, el error y la acción, para construir una
                respuesta más clara y funcional.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <CTALink to="/contacto" variant="primary">Agendar conversación inicial</CTALink>
                <CTALink to="/reestructura-1-1" hash="proceso" variant="outline">
                  Ver cómo funciona
                </CTALink>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative">
                <div className="absolute -inset-3 border border-border" aria-hidden />
                <div className="absolute -bottom-3 -right-3 h-24 w-24 bg-[color:var(--color-brand-deep)]" aria-hidden />
                <div className="relative bg-[color:var(--color-surface)] border border-border p-6 md:p-8 shadow-elev-1">
                  <img
                    src={reestructuraLogo}
                    alt="REESTRUCTURA 1:1 — Programa de Ingeniería Conductual y Cognitiva by G-Structure"
                    className="w-full h-auto"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERVENCIÓN INDIVIDUAL — featured con imagen */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              <div className="absolute -top-3 -left-3 h-24 w-24 border-l-2 border-t-2 border-[color:var(--color-brand-deep)]" aria-hidden />
              <div className="absolute -bottom-3 -right-3 h-24 w-24 border-r-2 border-b-2 border-[color:var(--color-brand-deep)]" aria-hidden />
              <div className="relative bg-[color:var(--color-surface)] p-6 md:p-10 transition-transform hover:-translate-y-0.5 duration-300">
                <img
                  src={reestructuraLogo}
                  alt="REESTRUCTURA 1:1"
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2">
            <Eyebrow>REESTRUCTURA 1:1</Eyebrow>
            <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-[2.5rem] leading-[1.08]">
              Un proceso individual para intervenir la fricción que bloquea tu ejecución.
            </h2>
            <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              REESTRUCTURA 1:1 traduce el método I-R-O de G-Structure en un proceso individual
              de coaching cognitivo-conductual: identificar patrones personales de bloqueo,
              reencuadrar lecturas improductivas y convertir claridad en acciones concretas,
              sostenibles y funcionales.
            </p>
            <ul className="mt-8 space-y-3.5">
              {[
                "Identificación de patrones de procrastinación, perfeccionismo, sobreanálisis o autosabotaje.",
                "Reencuadre cognitivo-conductual aplicado a situaciones reales.",
                "Claridad para decidir y actuar.",
                "Plan de acción concreto.",
                "Seguimiento para sostener avance.",
              ].map((i) => (
                <li key={i} className="flex gap-3 text-sm md:text-[15px] text-foreground/85">
                  <Check size={18} className="mt-0.5 shrink-0 text-[color:var(--color-brand-deep)]" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <CTALink to="/contacto" variant="primary">Agendar conversación inicial</CTALink>
            </div>
          </div>
        </div>
      </Section>

      {/* MÉTODO I-R-O VISUAL */}
      <Section tone="muted">
        <SectionHeader
          eyebrow="EL MÉTODO APLICADO"
          title="Patrón → Reencuadre → Acción → Seguimiento."
          subtitle="Cuatro etapas conectadas que mueven tu sistema operativo personal desde el patrón improductivo hacia la acción consistente."
        />
        <div className="mt-12 grid gap-px bg-border md:grid-cols-4 border border-border">
          {[
            { n: "01", t: "Patrón", d: "Lectura del patrón cognitivo-conductual que bloquea tu acción." },
            { n: "02", t: "Reencuadre", d: "Intervención sobre creencias rígidas y lecturas improductivas." },
            { n: "03", t: "Acción", d: "Diseño conductual: decisiones, rutinas y compromisos." },
            { n: "04", t: "Seguimiento", d: "Consolidación del cambio y ajustes en el tiempo." },
          ].map((s) => (
            <div key={s.n} className="group relative bg-[color:var(--color-surface)] p-7 transition-colors hover:bg-background">
              <span className="font-display text-xs font-semibold tracking-[0.22em] text-[color:var(--color-brand-deep)]">
                {s.n}
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-foreground">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              <ArrowRight
                size={16}
                className="absolute top-7 right-6 text-muted-foreground/40 transition-transform group-hover:translate-x-1 group-hover:text-foreground"
                aria-hidden
              />
            </div>
          ))}
        </div>
      </Section>

      {/* PROCESO DE 4 PASOS — banner premium oscuro */}
      <Section id="proceso" tone="deep">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <p className="eyebrow text-[color:var(--color-background)]/70">EL PROCESO</p>
            <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-[2.5rem] leading-[1.08]">
              Cuatro fases. Una secuencia clara.
            </h2>
            <p className="mt-5 text-base md:text-lg text-[color:var(--color-background)]/80 leading-relaxed">
              Aplicado a tu caso, en sesiones individuales con trabajo aplicado entre encuentros.
              Cada fase construye sobre la anterior para que el cambio se traduzca en conducta real.
            </p>
            <div className="mt-8 bg-[color:var(--color-background)]/5 border border-[color:var(--color-background)]/15 p-6">
              <img
                src={reestructuraLogo}
                alt="REESTRUCTURA 1:1"
                className="w-full max-w-[260px] mx-auto h-auto"
                loading="lazy"
              />
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="grid gap-px bg-[color:var(--color-background)]/15 border border-[color:var(--color-background)]/20 sm:grid-cols-2">
              {[
                { n: "PASO 1", t: "Evaluación inicial", d: "Entendemos el patrón, el contexto y el tipo de bloqueo." },
                { n: "PASO 2", t: "Identificación", d: "Detectamos pensamientos, creencias y respuestas conductuales que interfieren con la acción." },
                { n: "PASO 3", t: "Reencuadre", d: "Trabajamos con metodología cognitivo-conductual para construir lecturas más funcionales del problema." },
                { n: "PASO 4", t: "Optimización conductual", d: "Traducimos la claridad en acciones concretas, seguimiento y ajustes." },
              ].map((w) => (
                <div key={w.n} className="bg-[color:var(--color-brand-deep)] p-7">
                  <p className="font-display text-[10px] font-semibold tracking-[0.22em] text-[color:var(--color-background)]/60">
                    {w.n}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-semibold text-[color:var(--color-background)]">
                    {w.t}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-background)]/75">
                    {w.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* PARA QUIÉN ES / NO ES */}
      <Section tone="white">
        <SectionHeader
          eyebrow="PARA QUIÉN"
          title="Puede ser para ti si estás enfrentando:"
          subtitle="REESTRUCTURA 1:1 está diseñado para personas con alta carga de decisión que necesitan intervenir patrones que se repiten."
        />
        <div className="mt-12 grid gap-px bg-border md:grid-cols-3 border border-border">
          {[
            "Procrastinación en tareas importantes.",
            "Perfeccionismo que retrasa decisiones.",
            "Sobreanálisis que paraliza.",
            "Autosabotaje ante oportunidades.",
            "Falta de claridad para ejecutar.",
            "Ciclos repetidos de avance y bloqueo.",
          ].map((t) => (
            <div key={t} className="bg-background p-6">
              <h3 className="font-display text-base font-semibold leading-snug">{t}</h3>
            </div>
          ))}
        </div>

        <div className="mt-12 border border-border bg-[color:var(--color-surface)] p-8 md:p-10">
          <p className="eyebrow text-muted-foreground">ESTO PROBABLEMENTE NO ES PARA TI SI…</p>
          <ul className="mt-5 grid gap-3 md:grid-cols-2">
            {[
              "Buscas una charla motivacional.",
              "Esperas soluciones mágicas o inmediatas.",
              "No estás dispuesto a observar tus propios patrones.",
              "Necesitas atención clínica especializada en este momento.",
            ].map((i) => (
              <li key={i} className="flex gap-3 text-sm text-foreground/80">
                <X size={16} className="mt-0.5 shrink-0 text-muted-foreground" />
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ACLARACIÓN PROFESIONAL */}
      <Section tone="muted">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <Eyebrow>ALCANCE DEL PROCESO</Eyebrow>
            <h2 className="mt-4 font-display text-2xl md:text-3xl leading-[1.12]">
              Esto no es terapia. Tampoco es motivación superficial.
            </h2>
          </div>
          <div className="lg:col-span-7">
            <div className="border-l-2 border-[color:var(--color-brand-deep)] pl-6 md:pl-8">
              <p className="text-base md:text-lg text-foreground/85 leading-relaxed">
                REESTRUCTURA 1:1 es un proceso de coaching y formación cognitivo-conductual
                aplicado a la ejecución. No sustituye atención psicológica, médica o
                psiquiátrica. Si una situación requiere tratamiento clínico, se recomendará
                buscar apoyo profesional especializado.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* QUÉ INCLUYE */}
      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeader
              eyebrow="QUÉ INCLUYE"
              title="Un proceso breve, estructurado y profundamente personal."
              subtitle="REESTRUCTURA 1:1 combina sesiones individuales con trabajo aplicado entre sesiones para que el cambio se traduzca en conducta real."
            />
            <div className="mt-8">
              <CTALink to="/contacto">Conversar antes de empezar</CTALink>
            </div>
          </div>
          <div className="lg:col-span-6 border border-border bg-[color:var(--color-surface)] p-8">
            <p className="eyebrow mb-5">Incluye</p>
            <ul className="space-y-3.5 text-sm text-foreground/85">
              {[
                "Sesiones individuales de coaching cognitivo-conductual.",
                "Diagnóstico inicial de patrones de ejecución.",
                "Material de trabajo entre sesiones.",
                "Ejercicios CBT estructurados según tu contexto.",
                "Plan de optimización conductual al cierre.",
                "Opción de continuidad o seguimiento posterior.",
              ].map((i) => (
                <li key={i} className="flex gap-3">
                  <Check size={16} className="mt-0.5 text-foreground shrink-0" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* PAQUETES DE TRABAJO */}
      <Section id="paquetes" tone="white">
        <SectionHeader
          eyebrow="PAQUETES DE TRABAJO"
          title="Elige el formato que se ajusta a tu momento."
          subtitle="Tres paquetes con la misma metodología cognitivo-conductual. Todos incluyen sesiones individuales online de 60 minutos, una vez por semana, con trabajo aplicado entre sesiones."
          align="center"
        />

        <div className="mt-14 grid gap-px bg-border border border-border md:grid-cols-3">
          {[
            {
              slug: "foco-4",
              name: "Foco",
              sessions: "4 sesiones",
              duration: "4 semanas",
              price: "USD 320",
              perSession: "USD 80 / sesión",
              tag: "Intervención breve",
              fit: "Para quien tiene un patrón puntual claro: una decisión bloqueada, un proyecto detenido o una etapa específica de procrastinación.",
              includes: [
                "4 videollamadas individuales de 60 min (1 por semana).",
                "Diagnóstico inicial de patrón.",
                "Workbook digital REESTRUCTURA 1:1.",
                "Ejercicios CBT entre sesiones.",
                "Plan de acción al cierre.",
              ],
              highlighted: false,
            },
            {
              slug: "reencuadre-6",
              name: "Reencuadre",
              sessions: "6 sesiones",
              duration: "6 semanas",
              price: "USD 480",
              perSession: "USD 80 / sesión",
              tag: "Más recomendado",
              fit: "Para quien necesita trabajar más de un patrón (perfeccionismo + sobreanálisis, autosabotaje + ejecución) y consolidar cambio sostenido.",
              includes: [
                "6 videollamadas individuales de 60 min (1 por semana).",
                "Diagnóstico ampliado de patrones.",
                "Workbook digital REESTRUCTURA 1:1.",
                "Guía digital complementaria de reencuadre cognitivo.",
                "Ejercicios CBT estructurados por sesión.",
                "Plan de optimización conductual al cierre.",
              ],
              highlighted: true,
            },
            {
              slug: "estructura-8",
              name: "Estructura",
              sessions: "8 sesiones",
              duration: "8 semanas",
              price: "USD 640",
              perSession: "USD 80 / sesión",
              tag: "Cambio profundo",
              fit: "Para profesionales y líderes que quieren intervenir patrones recurrentes y construir un sistema operativo personal sostenible.",
              includes: [
                "8 videollamadas individuales de 60 min (1 por semana).",
                "Diagnóstico profundo de patrones recurrentes.",
                "Workbook digital REESTRUCTURA 1:1.",
                "Guía digital complementaria de reencuadre cognitivo.",
                "Ejercicios CBT progresivos por fase.",
                "Plan de optimización conductual + ruta de seguimiento.",
                "1 sesión de revisión a los 30 días posteriores.",
              ],
              highlighted: false,
            },
          ].map((p) => (
            <div
              key={p.name}
              className={`relative flex flex-col p-8 ${
                p.highlighted
                  ? "bg-[color:var(--color-brand-deep)] text-[color:var(--color-background)]"
                  : "bg-background"
              }`}
            >
              <p
                className={`font-display text-[10px] font-semibold tracking-[0.22em] ${
                  p.highlighted
                    ? "text-[color:var(--color-background)]/70"
                    : "text-[color:var(--color-brand-deep)]"
                }`}
              >
                {p.tag.toUpperCase()}
              </p>
              <h3
                className={`mt-3 font-display text-2xl font-semibold ${
                  p.highlighted ? "text-[color:var(--color-background)]" : "text-foreground"
                }`}
              >
                {p.name}
              </h3>
              <p
                className={`mt-1 text-sm ${
                  p.highlighted
                    ? "text-[color:var(--color-background)]/75"
                    : "text-muted-foreground"
                }`}
              >
                {p.sessions} · {p.duration}
              </p>

              <div
                className={`mt-6 pb-6 border-b ${
                  p.highlighted ? "border-[color:var(--color-background)]/20" : "border-border"
                }`}
              >
                <p
                  className={`font-display text-4xl font-semibold ${
                    p.highlighted ? "text-[color:var(--color-background)]" : "text-foreground"
                  }`}
                >
                  {p.price}
                </p>
                <p
                  className={`mt-1 text-xs ${
                    p.highlighted
                      ? "text-[color:var(--color-background)]/70"
                      : "text-muted-foreground"
                  }`}
                >
                  {p.perSession}
                </p>
              </div>

              <p
                className={`mt-6 text-sm leading-relaxed ${
                  p.highlighted
                    ? "text-[color:var(--color-background)]/85"
                    : "text-foreground/80"
                }`}
              >
                <span
                  className={`block font-display text-[10px] font-semibold tracking-[0.22em] mb-2 ${
                    p.highlighted
                      ? "text-[color:var(--color-background)]/60"
                      : "text-muted-foreground"
                  }`}
                >
                  IDEAL PARA
                </span>
                {p.fit}
              </p>

              <ul className="mt-6 space-y-3 text-sm">
                {p.includes.map((i) => (
                  <li
                    key={i}
                    className={`flex gap-2.5 ${
                      p.highlighted
                        ? "text-[color:var(--color-background)]/90"
                        : "text-foreground/85"
                    }`}
                  >
                    <Check
                      size={15}
                      className={`mt-0.5 shrink-0 ${
                        p.highlighted
                          ? "text-[color:var(--color-background)]"
                          : "text-[color:var(--color-brand-deep)]"
                      }`}
                    />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-2">
                <button
                  type="button"
                  onClick={() => openBooking(p.slug)}
                  className={`group inline-flex w-full items-center justify-center gap-2 px-5 py-3 text-[13px] font-medium tracking-wide transition-all ${
                    p.highlighted
                      ? "bg-background text-foreground hover:opacity-90"
                      : "bg-foreground text-background hover:opacity-90"
                  }`}
                >
                  Reservar {p.name}
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Modalidad 100% online · Pago único o en dos partes · Reembolso disponible si tras la primera sesión decides no continuar.
        </p>
      </Section>

      {/* CIERRE COMERCIAL */}
      <Section tone="muted">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16 items-center">
          <div className="lg:col-span-8">
            <Eyebrow>SIGUIENTE PASO</Eyebrow>
            <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-[2.5rem] leading-[1.08]">
              Trabajemos el patrón antes de exigir más disciplina.
            </h2>
            <p className="mt-5 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
              Una conversación inicial permite entender tu contexto, revisar si REESTRUCTURA 1:1
              es adecuado para ti y definir una posible ruta de trabajo.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CTALink to="/contacto" variant="primary">Agendar conversación inicial</CTALink>
              <CTAExternal href="https://wa.me/593986875121" variant="outline">Hablar por WhatsApp</CTAExternal>
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="border border-border bg-background p-6 text-center">
              <img
                src={reestructuraLogo}
                alt="REESTRUCTURA 1:1"
                className="w-full max-w-[220px] mx-auto h-auto"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
