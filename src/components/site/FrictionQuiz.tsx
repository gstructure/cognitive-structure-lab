import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, RotateCcw } from "lucide-react";
import { Section } from "./Section";
import { trackEvent } from "@/lib/analytics";
import { useLocale } from "@/lib/i18n";

type Letter = "A" | "B" | "C" | "D";

const QUESTIONS_ES: { q: string; options: { letter: Letter; text: string }[] }[] = [
  {
    q: "Cuando tienes una tarea importante pendiente, ¿qué pasa primero?",
    options: [
      { letter: "A", text: 'La postergo hasta que "el momento sea perfecto"' },
      { letter: "B", text: "La empiezo pero no la termino — me pierdo en los detalles" },
      { letter: "C", text: "La analizo tanto que nunca decido cómo comenzar" },
      { letter: "D", text: "Sé que debo hacerla pero hago otra cosa menos importante" },
    ],
  },
  {
    q: "Cuando algo no sale como esperabas, ¿cuál es tu reacción más frecuente?",
    options: [
      { letter: "A", text: "Me digo que debí haberlo hecho mejor — siempre" },
      { letter: "B", text: "Evito hablar del tema o pensar en ello" },
      { letter: "C", text: "Lo analizo en exceso buscando qué salió mal" },
      { letter: "D", text: 'Siento que confirma algo que ya "sabía" de mí' },
    ],
  },
  {
    q: "¿Qué frase te describe mejor en momentos de alta exigencia?",
    options: [
      { letter: "A", text: '"Cuando esté listo, lo hago"' },
      { letter: "B", text: '"Tiene que estar perfecto antes de salir"' },
      { letter: "C", text: '"Necesito pensar esto más antes de decidir"' },
      { letter: "D", text: '"No sé si soy la persona indicada para esto"' },
    ],
  },
];

const QUESTIONS_EN: { q: string; options: { letter: Letter; text: string }[] }[] = [
  {
    q: "When you have an important pending task, what happens first?",
    options: [
      { letter: "A", text: 'I postpone it until "the moment is perfect"' },
      { letter: "B", text: "I start but don't finish — I get lost in the details" },
      { letter: "C", text: "I analyze it so much I never decide how to begin" },
      { letter: "D", text: "I know I should do it but I do something less important instead" },
    ],
  },
  {
    q: "When something doesn't go as expected, what's your most frequent reaction?",
    options: [
      { letter: "A", text: "I tell myself I should have done it better — always" },
      { letter: "B", text: "I avoid talking about it or thinking about it" },
      { letter: "C", text: "I over-analyze, searching for what went wrong" },
      { letter: "D", text: 'It feels like confirmation of something I already "knew" about myself' },
    ],
  },
  {
    q: "Which phrase best describes you in high-pressure moments?",
    options: [
      { letter: "A", text: '"When I\'m ready, I\'ll do it"' },
      { letter: "B", text: '"It has to be perfect before it ships"' },
      { letter: "C", text: '"I need to think this through more before deciding"' },
      { letter: "D", text: '"I\'m not sure I\'m the right person for this"' },
    ],
  },
];

const RESULTS_ES: Record<Letter, { label: string; title: string; body: string }> = {
  A: {
    label: "PROCRASTINACIÓN",
    title: "Tu patrón principal es la procrastinación.",
    body: "No es pereza. Es un mecanismo de protección cognitiva: posponer reduce la ansiedad a corto plazo — y bloquea la ejecución a largo plazo. El Motor de Reestructuración de G-Struct está diseñado específicamente para este patrón.",
  },
  B: {
    label: "PERFECCIONISMO IMPRODUCTIVO",
    title: "Tu patrón principal es el perfeccionismo improductivo.",
    body: "El estándar elevado no es el problema — el problema es cuando ese estándar se convierte en una excusa elegante para no entregar. G-Struct te ayuda a distinguir entre criterio y evitación.",
  },
  C: {
    label: "SOBREANÁLISIS",
    title: "Tu patrón principal es el sobreanálisis.",
    body: "Pensar más dejó de aclarar — y empezó a paralizar. Este patrón tiene raíces cognitivas específicas que el método I-R-O puede mapear y reencuadrar.",
  },
  D: {
    label: "IMPOSTOR PATTERN",
    title: "Tu patrón principal es el impostor pattern.",
    body: "No es falta de capacidad — es una lectura distorsionada de tu propia evidencia. El 75% de los high-performers en LATAM lo experimentan. G-Struct trabaja directamente sobre este patrón con metodología CBT coaching.",
  },
};

const RESULTS_EN: Record<Letter, { label: string; title: string; body: string }> = {
  A: {
    label: "PROCRASTINATION",
    title: "Your main pattern is procrastination.",
    body: "It's not laziness. It's a cognitive protection mechanism: postponing reduces anxiety short-term — and blocks execution long-term. G-Struct's Restructuring Engine is designed specifically for this pattern.",
  },
  B: {
    label: "UNPRODUCTIVE PERFECTIONISM",
    title: "Your main pattern is unproductive perfectionism.",
    body: "A high standard isn't the problem — the problem is when that standard becomes an elegant excuse not to ship. G-Struct helps you distinguish criterion from avoidance.",
  },
  C: {
    label: "OVERTHINKING",
    title: "Your main pattern is overthinking.",
    body: "Thinking more stopped clarifying — and started to paralyze. This pattern has specific cognitive roots the I-R-O method can map and reframe.",
  },
  D: {
    label: "IMPOSTOR PATTERN",
    title: "Your main pattern is the impostor pattern.",
    body: "It's not lack of capacity — it's a distorted reading of your own evidence. 75% of high-performers in LATAM experience it. G-Struct works directly on this pattern with CBT coaching methodology.",
  },
};

const UI_COPY = {
  es: {
    eyebrow: "FASE 01 · IDENTIFICAR",
    title: "Empieza identificando tu patrón de ejecución.",
    lead: "Antes de optimizar tu ejecución, necesitas entender qué tipo de fricción está interfiriendo con tu acción.",
    sub: "Este diagnóstico breve te ayuda a reconocer si tu bloqueo está más relacionado con procrastinación, perfeccionismo, sobreanálisis, evitación, saturación mental o autosabotaje. Al finalizar, podrás unirte a la lista de espera de G-Struct y recibir acceso temprano a la plataforma.",
    disclaimer: "Este diagnóstico no es clínico y no sustituye atención psicológica. Es una herramienta de autoobservación orientada a patrones de ejecución.",
    questionOf: (i: number, n: number) => `PREGUNTA ${i} DE ${n}`,
    dominantPattern: "TU PATRÓN DOMINANTE",
    closingLine: (
      <>
        Tu patrón de ejecución es el punto de partida. <strong className="text-[color:var(--color-background)]">G-Struct</strong> está siendo diseñado para ayudarte a trabajar ese patrón con herramientas de reencuadre, claridad y acción estructurada.
      </>
    ),
    ctaWaitlist: "Únete a la lista de espera de G-Struct",
    ctaRestructure: "Conocer REESTRUCTURA 1:1",
    restart: "Volver a empezar",
  },
  en: {
    eyebrow: "PHASE 01 · IDENTIFY",
    title: "Start by identifying your execution pattern.",
    lead: "Before optimizing your execution, you need to understand what kind of friction is interfering with your action.",
    sub: "This short diagnostic helps you recognize whether your block is more related to procrastination, perfectionism, overthinking, avoidance, mental saturation, or self-sabotage. When you finish, you can join the G-Struct waitlist and get early access to the platform.",
    disclaimer: "This diagnostic is not clinical and does not replace psychological care. It's a self-observation tool focused on execution patterns.",
    questionOf: (i: number, n: number) => `QUESTION ${i} OF ${n}`,
    dominantPattern: "YOUR DOMINANT PATTERN",
    closingLine: (
      <>
        Your execution pattern is the starting point. <strong className="text-[color:var(--color-background)]">G-Struct</strong> is being designed to help you work that pattern with reframing tools, clarity, and structured action.
      </>
    ),
    ctaWaitlist: "Join the G-Struct waitlist",
    ctaRestructure: "Learn about RESTRUCTURE 1:1",
    restart: "Start over",
  },
} as const;

function majority(answers: Letter[]): Letter {
  const counts: Record<Letter, number> = { A: 0, B: 0, C: 0, D: 0 };
  answers.forEach((a) => (counts[a] += 1));
  return (Object.keys(counts) as Letter[]).sort((a, b) => counts[b] - counts[a])[0];
}

export function FrictionQuiz() {
  const { locale } = useLocale();
  const QUESTIONS = locale === "en" ? QUESTIONS_EN : QUESTIONS_ES;
  const RESULTS = locale === "en" ? RESULTS_EN : RESULTS_ES;
  const ui = UI_COPY[locale];
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Letter[]>([]);

  const reset = () => {
    setStep(0);
    setAnswers([]);
  };

  const onSelect = (letter: Letter) => {
    const next = [...answers, letter];
    setAnswers(next);
    if (step + 1 < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      trackEvent("friction_quiz_complete", { result: majority(next) });
    }
  };

  const done = answers.length === QUESTIONS.length;
  const result = done ? RESULTS[majority(answers)] : null;
  const current = QUESTIONS[step];

  return (
    <Section id="quiz" tone="muted">
      <div className="max-w-3xl">
        <p className="eyebrow">{ui.eyebrow}</p>
        <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-[2.5rem] leading-[1.08]">
          {ui.title}
        </h2>
        <p className="mt-5 text-base md:text-lg text-foreground/85 leading-relaxed">
          {ui.lead}
        </p>
        <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
          {ui.sub}
        </p>
        <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
          {ui.disclaimer}
        </p>
      </div>

      <div className="mt-10 max-w-2xl">
        {!done && current ? (
          <div key={step} className="border border-border bg-[color:var(--color-surface)] p-6 md:p-8">
            <div className="flex items-center justify-between">
              <span className="font-display text-[11px] font-semibold tracking-[0.22em] text-muted-foreground">
                {ui.questionOf(step + 1, QUESTIONS.length)}
              </span>
              <div className="flex gap-1.5">
                {QUESTIONS.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1 w-8 ${i <= step ? "bg-foreground" : "bg-border"}`}
                  />
                ))}
              </div>
            </div>
            <h3 className="mt-5 font-display text-xl md:text-2xl text-foreground leading-snug">
              {current.q}
            </h3>
            <div className="mt-6 grid gap-3">
              {current.options.map((opt) => (
                <button
                  key={opt.letter}
                  type="button"
                  onClick={() => onSelect(opt.letter)}
                  className="group flex min-h-[56px] items-center gap-4 border border-border bg-background px-5 py-4 text-left text-[15px] text-foreground/90 transition-all hover:border-foreground hover:bg-[color:var(--color-brand-soft)]/40 hover:-translate-y-0.5"
                >
                  <span className="font-display text-xs font-semibold tracking-[0.22em] text-muted-foreground group-hover:text-foreground">
                    {opt.letter}
                  </span>
                  <span className="flex-1 leading-snug">{opt.text}</span>
                  <ArrowRight size={16} className="text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
                </button>
              ))}
            </div>
          </div>
        ) : result ? (
          <div className="border border-foreground bg-[color:var(--color-brand-deep)] text-[color:var(--color-background)] p-6 md:p-8">
            <span className="font-display text-[10px] font-semibold tracking-[0.22em] text-[color:var(--color-background)]/70">
              {ui.dominantPattern} · {result.label}
            </span>
            <h3 className="mt-4 font-display text-2xl md:text-3xl leading-snug">{result.title}</h3>
            <p className="mt-5 text-[15px] md:text-base leading-relaxed text-[color:var(--color-background)]/85 whitespace-pre-line">
              {result.body}
            </p>
            <p className="mt-6 text-sm text-[color:var(--color-background)]/85 leading-relaxed">
              {ui.closingLine}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                to="/"
                hash="lista-de-espera"
                className="inline-flex items-center gap-2 bg-[color:var(--color-background)] px-5 py-3 text-[13px] font-semibold tracking-wide text-[color:var(--color-brand-deep)] hover:opacity-90"
              >
                {ui.ctaWaitlist} <ArrowRight size={14} />
              </Link>
              <Link
                to={locale === "en" ? "/en/restructure-1-1" : "/reestructura-1-1"}
                className="inline-flex items-center gap-2 border border-[color:var(--color-background)]/50 px-5 py-3 text-[13px] font-medium text-[color:var(--color-background)] hover:bg-[color:var(--color-background)]/10"
              >
                {ui.ctaRestructure} <ArrowRight size={14} />
              </Link>
            </div>
            <button
              type="button"
              onClick={reset}
              className="mt-6 inline-flex items-center gap-2 text-[12px] tracking-wide text-[color:var(--color-background)]/70 hover:text-[color:var(--color-background)]"
            >
              <RotateCcw size={12} /> {ui.restart}
            </button>
          </div>
        ) : null}
      </div>
    </Section>
  );
}
