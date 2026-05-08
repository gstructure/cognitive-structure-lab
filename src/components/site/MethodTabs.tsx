import { useState } from "react";
import { useLocale } from "@/lib/i18n";

export type MethodStep = {
  n: string;
  t: string;
  headline: string;
  d: string;
  micro: string;
  bullets: string[];
};

const STEPS_ES: MethodStep[] = [
  {
    n: "01",
    t: "Identificar",
    headline: "Detectamos el patrón antes de intervenir.",
    d: "Mapeamos pensamientos automáticos, creencias rígidas, evitación, estándares disfuncionales, ciclos de postergación y errores de procesamiento que interfieren con la ejecución.",
    micro: "Primero se entiende el sistema. Luego se interviene.",
    bullets: ["Lectura del contexto", "Mapeo de fricciones", "Hipótesis cognitivo-conductual"],
  },
  {
    n: "02",
    t: "Reencuadrar",
    headline: "Reorganizamos la lectura del problema.",
    d: "Aplicamos metodología cognitivo-conductual para cuestionar interpretaciones improductivas y construir respuestas más funcionales sin caer en pensamiento positivo superficial.",
    micro: "No se trata de pensar positivo. Se trata de pensar con más precisión.",
    bullets: ["Reencuadre estructurado", "Trabajo sobre creencias", "Lectura funcional del riesgo"],
  },
  {
    n: "03",
    t: "Optimizar",
    headline: "Traducimos claridad en conducta sostenible.",
    d: "Diseñamos decisiones, rutinas y protocolos que sostienen el cambio en el día a día profesional. El objetivo es generar una salida clara hacia la acción.",
    micro: "La claridad debe terminar en conducta.",
    bullets: ["Diseño conductual", "Protocolos de decisión", "Métricas de continuidad"],
  },
];

const STEPS_EN: MethodStep[] = [
  {
    n: "01",
    t: "Identify",
    headline: "We map the pattern before we intervene.",
    d: "We surface automatic thoughts, rigid beliefs, avoidance, dysfunctional standards, postponement loops, and processing errors that interfere with execution.",
    micro: "Understand the system first. Then intervene.",
    bullets: ["Context reading", "Friction mapping", "Cognitive-behavioral hypothesis"],
  },
  {
    n: "02",
    t: "Reframe",
    headline: "We reorganize how the problem is read.",
    d: "We apply cognitive-behavioral methodology to challenge unproductive interpretations and build more functional responses — without falling into shallow positive thinking.",
    micro: "It’s not about thinking positive. It’s about thinking with more precision.",
    bullets: ["Structured reframing", "Belief work", "Functional risk reading"],
  },
  {
    n: "03",
    t: "Optimize",
    headline: "We translate clarity into sustainable behavior.",
    d: "We design decisions, routines, and protocols that sustain the change in day-to-day professional life. The goal is a clean exit toward action.",
    micro: "Clarity must end in behavior.",
    bullets: ["Behavioral design", "Decision protocols", "Continuity metrics"],
  },
];

export function MethodTabs({ steps }: { steps?: MethodStep[] } = {}) {
  const { locale } = useLocale();
  const STEPS = steps ?? (locale === "en" ? STEPS_EN : STEPS_ES);
  const [active, setActive] = useState(0);
  const step = STEPS[active];
  const tablistLabel = locale === "en" ? "I-R-O method steps" : "Pasos del método I-R-O";
  return (
    <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-4">
        <div role="tablist" aria-label={tablistLabel} className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">
          {STEPS.map((s, i) => {
            const isActive = i === active;
            return (
              <button
                key={s.n}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(i)}
                className={`group relative flex-1 lg:flex-none text-left border p-5 lg:p-6 transition-all min-w-[200px] ${
                  isActive
                    ? "border-[color:var(--color-background)] bg-[color:var(--color-background)]/5"
                    : "border-[color:var(--color-background)]/20 hover:border-[color:var(--color-background)]/50"
                }`}
              >
                <span
                  className={`absolute left-0 top-0 h-full w-[2px] transition-opacity ${
                    isActive ? "bg-[color:var(--color-background)] opacity-100" : "opacity-0"
                  }`}
                  aria-hidden
                />
                <span className="block font-display text-[10px] font-semibold tracking-[0.22em] text-[color:var(--color-background)]/60">
                  {s.n}
                </span>
                <span className="mt-2 block font-display text-lg lg:text-xl font-semibold">
                  {s.t}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="lg:col-span-8">
        <div className="border border-[color:var(--color-background)]/15 bg-[color:var(--color-brand-deep)] p-8 md:p-10 min-h-[320px]">
          <div key={step.n} className="animate-in fade-in duration-500">
            <p className="font-display text-[11px] font-semibold tracking-[0.22em] text-[color:var(--color-background)]/60">
              {step.n} — {step.t.toUpperCase()}
            </p>
            <h3 className="mt-4 font-display text-2xl md:text-3xl leading-snug">
              {step.headline}
            </h3>
            <p className="mt-5 text-base text-[color:var(--color-background)]/80 leading-relaxed">
              {step.d}
            </p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-3">
              {step.bullets.map((b) => (
                <li
                  key={b}
                  className="border border-[color:var(--color-background)]/15 px-3 py-2.5 text-[12px] tracking-wide text-[color:var(--color-background)]/85"
                >
                  {b}
                </li>
              ))}
            </ul>
            <p className="mt-7 pt-5 border-t border-[color:var(--color-background)]/15 text-xs italic text-[color:var(--color-background)]/65">
              {step.micro}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
