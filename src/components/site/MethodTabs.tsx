import { useState } from "react";
import { useLocale } from "@/lib/i18n";

export type MethodStep = {
  n: string;
  t: string;
  headline: string;
  d: string;
  micro: string;
};

const STEPS_ES: MethodStep[] = [
  {
    n: "01",
    t: "Identificar",
    headline: "KAIRON detecta tu patrón específico antes de intervenir.",
    d: "KAIRON detecta tu patrón específico antes de intervenir — sin cuestionarios genéricos.",
    micro: "Una lectura más precisa crea una salida más clara.",
  },
  {
    n: "02",
    t: "Reencuadrar",
    headline: "Kai te ayuda a ver la situación desde otro ángulo.",
    d: "Kai te ayuda a ver la situación desde otro ángulo, en tiempo real, sin que tengas que explicar todo desde cero.",
    micro: "El objetivo es desbloquear la lectura, no decorar el problema.",
  },
  {
    n: "03",
    t: "Optimizar",
    headline: "Cada sesión termina en una acción concreta.",
    d: "Cada sesión termina en una acción concreta — no en una reflexión que se queda ahí.",
    micro: "La claridad cuenta cuando se convierte en movimiento.",
  },
];

const STEPS_EN: MethodStep[] = [
  {
    n: "01",
    t: "Identify",
    headline: "KAIRON detects your specific pattern before intervening.",
    d: "KAIRON detects your specific pattern before intervening — without generic questionnaires.",
    micro: "A more precise reading creates a clearer exit.",
  },
  {
    n: "02",
    t: "Reframe",
    headline: "Kai helps you see the situation from another angle.",
    d: "Kai helps you see the situation from another angle, in real time, without making you explain everything from scratch.",
    micro: "The goal is to unlock the reading, not decorate the problem.",
  },
  {
    n: "03",
    t: "Optimize",
    headline: "Every session ends in a concrete action.",
    d: "Every session ends in a concrete action — not a reflection that stays there.",
    micro: "Clarity matters when it becomes movement.",
  },
];

export function MethodTabs({ steps }: { steps?: MethodStep[] } = {}) {
  const { locale } = useLocale();
  const STEPS = steps ?? (locale === "en" ? STEPS_EN : STEPS_ES);
  const [active, setActive] = useState(0);
  const step = STEPS[active];
  const tablistLabel = locale === "en" ? "I-R-O™ Method steps" : "Pasos del método I-R-O™";
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
            <p className="mt-7 pt-5 border-t border-[color:var(--color-background)]/15 text-xs italic text-[color:var(--color-background)]/65">
              {step.micro}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
