import { KaiAvatar } from "@/components/brand/kairon/KaiAvatar";
import { KaironMark } from "@/components/brand/kairon/KaironMark";
import { kaironAppUrl, getLaunchPhase, launchCopy } from "@/lib/launchConfig";
import type { Locale } from "@/lib/i18n";

type KaironHeroProps = {
  locale: Locale;
};

/**
 * KAIRON product hero — spec wireframe implementation.
 * Copy left, kinetic Kai right. Primary CTA → getkairon.app/start.
 * Fully server-renderable (no client fetch on first paint).
 */
export function KaironHero({ locale }: KaironHeroProps) {
  const isSpanish = locale === "es";
  const phase = getLaunchPhase();
  const campaign = launchCopy(locale, phase);
  const ctaUrl = kaironAppUrl(locale, "hero", phase);

  return (
    <section className="kairon-hero" aria-labelledby="kairon-title">
      <div className="kairon-hero__copy">
        <div className="kairon-hero__eyebrow">
          <KaironMark title="" width={28} height={28} style={{ color: "#EFA831" }} />
          <span>
            {isSpanish ? "COACH DE EJECUCIÓN COGNITIVA" : "COGNITIVE EXECUTION COACH"}
          </span>
        </div>

        <h1 id="kairon-title">
          {isSpanish
            ? "Convierte fricción mental en tu siguiente acción concreta."
            : "Turn mental friction into your next concrete action."}
        </h1>

        <p className="kairon-hero__lead">
          {isSpanish
            ? "KAIRON identifica el pensamiento que está bloqueando tu ejecución, lo reencuadra contigo y cierra con un movimiento que puedes probar hoy."
            : "KAIRON identifies the thought blocking execution, reframes it with you, and closes with a move you can test today."}
        </p>

        <div className="kairon-hero__actions">
          <a
            className="btn-primary"
            href={ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {campaign.primaryCta}
          </a>
          <a className="btn-secondary" href="#how-it-works">
            {isSpanish ? "Ver cómo funciona" : "See how it works"}
          </a>
        </div>

        <ul
          className="kairon-hero__trust"
          aria-label={isSpanish ? "Características" : "Characteristics"}
        >
          <li>{isSpanish ? "Basado en principios CBT" : "CBT-informed"}</li>
          <li>{isSpanish ? "No clínico" : "Non-clinical"}</li>
          <li>{isSpanish ? "5–12 minutos" : "5–12 minutes"}</li>
          <li>{isSpanish ? "ES / EN" : "ES / EN"}</li>
        </ul>
      </div>

      <div className="kairon-hero__visual">
        <KaiAvatar className="kairon-hero__kai" />
      </div>

      <style>{`
        .kairon-hero {
          min-height: min(900px, 92svh);
          max-width: 1280px;
          margin-inline: auto;
          padding: clamp(7rem, 12vw, 11rem) clamp(1.25rem, 5vw, 4.5rem) 5rem;
          display: grid;
          grid-template-columns: minmax(0, 1.08fr) minmax(300px, 0.92fr);
          gap: clamp(2rem, 7vw, 7rem);
          align-items: center;
        }

        .kairon-hero__eyebrow {
          color: #EFA831;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-family: var(--font-display, "Manrope", sans-serif);
        }

        .kairon-hero h1 {
          max-width: 15ch;
          margin: 1.5rem 0 1.25rem;
          color: #F8F1E8;
          font-size: clamp(3rem, 6.2vw, 6.75rem);
          line-height: 0.95;
          letter-spacing: -0.055em;
          font-family: var(--font-display, "Manrope", sans-serif);
          font-weight: 700;
        }

        .kairon-hero__lead {
          max-width: 60ch;
          color: #BDB0A3;
          font-size: clamp(1.05rem, 1.6vw, 1.28rem);
          line-height: 1.65;
        }

        .kairon-hero__actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-top: 2rem;
        }

        .kairon-hero__trust {
          margin: 2rem 0 0;
          padding: 1rem 0 0;
          border-top: 1px solid rgb(239 168 49 / 22%);
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem 1.5rem;
          color: #BDB0A3;
          list-style: none;
          font-size: 0.875rem;
        }

        .kairon-hero__visual {
          min-height: 520px;
          display: grid;
          place-items: center;
          border-left: 1px solid rgb(239 168 49 / 22%);
        }

        .kairon-hero__kai {
          width: min(100%, 420px);
        }

        @media (max-width: 800px) {
          .kairon-hero {
            min-height: auto;
            grid-template-columns: 1fr;
            padding-top: 7rem;
          }
          .kairon-hero h1 {
            font-size: clamp(2.8rem, 13vw, 4.6rem);
            max-width: none;
          }
          .kairon-hero__visual {
            min-height: 360px;
            border-left: 0;
            border-top: 1px solid rgb(239 168 49 / 22%);
            padding-top: 2rem;
          }
          .kairon-hero__kai {
            width: min(76vw, 330px);
          }
        }
      `}</style>
    </section>
  );
}
