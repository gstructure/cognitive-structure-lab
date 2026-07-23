"use client";

import { useEffect, useState, type CSSProperties } from "react";

/**
 * KaironProofDashboard — an interactive bento panel that shows the
 * I-R-O engine "running" instead of describing it in bullet points.
 *
 * Three tabs (Identify / Reframe / Optimize) drive a live-looking
 * readout panel. Auto-advances on an interval, but is directly
 * clickable so high-intent users can control the pace themselves.
 *
 * This is the "Interactive Proof" pattern: abstract cognitive-behavioral
 * software made tangible through a dashboard, not adjectives.
 */

type StageKey = "identify" | "reframe" | "optimize";

type Stage = {
  key: StageKey;
  label: { es: string; en: string };
  tag: { es: string; en: string };
  readout: { es: string; en: string };
  metricLabel: { es: string; en: string };
  metricValue: string;
  accent: string;
};

const STAGES: Stage[] = [
  {
    key: "identify",
    label: { es: "Identificar", en: "Identify" },
    tag: { es: "SESIÓN ACTIVA", en: "ACTIVE SESSION" },
    readout: {
      es: "Patrón detectado: postergación bajo presión de decisión estratégica.",
      en: "Pattern detected: postponement under strategic decision pressure.",
    },
    metricLabel: { es: "Fricción", en: "Friction" },
    metricValue: "Alta",
    accent: "#EFA831",
  },
  {
    key: "reframe",
    label: { es: "Reencuadrar", en: "Reframe" },
    tag: { es: "PATRÓN COGNITIVO", en: "COGNITIVE PATTERN" },
    readout: {
      es: "\u201cSi no es perfecto, no lo entrego.\u201d \u2192 Avanzar con criterio reduce el costo de no decidir.",
      en: "\u201cIf it's not perfect, I won't ship it.\u201d \u2192 Moving forward with judgment reduces the cost of not deciding.",
    },
    metricLabel: { es: "Patrón", en: "Pattern" },
    metricValue: "Perfeccionismo",
    accent: "#3A2E8C",
  },
  {
    key: "optimize",
    label: { es: "Optimizar", en: "Optimize" },
    tag: { es: "PLAN DE ACCIÓN", en: "ACTION PLAN" },
    readout: {
      es: "Siguiente movimiento: enviar el borrador en 5 minutos, sin revisión adicional.",
      en: "Next move: send the draft in 5 minutes, no additional review.",
    },
    metricLabel: { es: "Salida", en: "Output" },
    metricValue: "Diseño",
    accent: "#F0A046",
  },
];

type KaironProofDashboardProps = {
  locale: "es" | "en";
};

export function KaironProofDashboard({ locale }: KaironProofDashboardProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % STAGES.length);
    }, 4200);
    return () => clearInterval(id);
  }, [paused]);

  const stage = STAGES[activeIndex];

  return (
    <div
      className="kairon-bento kairon-bento--glow proof-dashboard"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Tab rail */}
      <div className="proof-dashboard__rail">
        {STAGES.map((s, i) => (
          <button
            key={s.key}
            type="button"
            onClick={() => setActiveIndex(i)}
            className="proof-dashboard__tab"
            data-active={i === activeIndex || undefined}
            style={{ "--tab-accent": s.accent } as CSSProperties}
          >
            <span className="proof-dashboard__tab-index">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="proof-dashboard__tab-label">{s.label[locale]}</span>
          </button>
        ))}
      </div>

      {/* Live readout */}
      <div className="proof-dashboard__body">
        <div className="proof-dashboard__meta">
          <span className="kairon-pulse-dot" style={{ background: stage.accent }} />
          <span className="proof-dashboard__tag">{stage.tag[locale]}</span>
        </div>

        <p key={stage.key} className="proof-dashboard__readout">
          {stage.readout[locale]}
        </p>

        <div className="proof-dashboard__footer">
          <div className="proof-dashboard__metric">
            <span className="proof-dashboard__metric-label">{stage.metricLabel[locale]}</span>
            <span className="proof-dashboard__metric-value" style={{ color: stage.accent }}>
              {stage.metricValue}
            </span>
          </div>
          <div className="proof-dashboard__progress">
            {STAGES.map((s, i) => (
              <span
                key={s.key}
                className="proof-dashboard__progress-seg"
                data-filled={i <= activeIndex || undefined}
                style={{ "--seg-accent": s.accent } as CSSProperties}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .proof-dashboard {
          padding: 0;
          overflow: hidden;
        }

        .proof-dashboard__rail {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-bottom: 1px solid rgb(239 168 49 / 14%);
        }

        .proof-dashboard__tab {
          appearance: none;
          background: transparent;
          border: none;
          border-right: 1px solid rgb(239 168 49 / 10%);
          padding: 1rem 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          align-items: flex-start;
          cursor: pointer;
          transition: background-color 0.25s ease;
          position: relative;
        }
        .proof-dashboard__tab:last-child { border-right: none; }
        .proof-dashboard__tab:hover { background: rgb(255 255 255 / 3%); }
        .proof-dashboard__tab[data-active] {
          background: rgb(255 255 255 / 4%);
        }
        .proof-dashboard__tab[data-active]::after {
          content: "";
          position: absolute;
          left: 0; right: 0; bottom: -1px;
          height: 2px;
          background: var(--tab-accent);
        }

        .proof-dashboard__tab-index {
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: #7A6C5E;
        }
        .proof-dashboard__tab[data-active] .proof-dashboard__tab-index {
          color: var(--tab-accent);
        }

        .proof-dashboard__tab-label {
          font-family: var(--font-display, "Manrope", sans-serif);
          font-size: 0.9375rem;
          font-weight: 600;
          color: #F8F1E8;
        }

        .proof-dashboard__body {
          padding: 1.75rem;
          min-height: 220px;
          display: flex;
          flex-direction: column;
        }

        .proof-dashboard__meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .proof-dashboard__tag {
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: #BDB0A3;
          text-transform: uppercase;
        }

        .proof-dashboard__readout {
          margin-top: 1.25rem;
          font-family: var(--font-display, "Manrope", sans-serif);
          font-size: clamp(1.1rem, 2vw, 1.4rem);
          line-height: 1.4;
          color: #F8F1E8;
          flex: 1;
          animation: proof-fade-in 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }

        @keyframes proof-fade-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .proof-dashboard__footer {
          margin-top: 1.5rem;
          padding-top: 1.25rem;
          border-top: 1px solid rgb(239 168 49 / 12%);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .proof-dashboard__metric {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .proof-dashboard__metric-label {
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #7A6C5E;
        }

        .proof-dashboard__metric-value {
          font-family: var(--font-display, "Manrope", sans-serif);
          font-size: 1rem;
          font-weight: 700;
        }

        .proof-dashboard__progress {
          display: flex;
          gap: 0.3rem;
        }

        .proof-dashboard__progress-seg {
          width: 28px;
          height: 3px;
          background: rgb(239 168 49 / 14%);
          transition: background-color 0.4s ease;
        }
        .proof-dashboard__progress-seg[data-filled] {
          background: var(--seg-accent);
        }

        @media (prefers-reduced-motion: reduce) {
          .proof-dashboard__readout { animation: none; }
        }
      `}</style>
    </div>
  );
}
