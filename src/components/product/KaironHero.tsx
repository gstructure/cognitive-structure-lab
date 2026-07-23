import { KaiAvatar } from "@/components/brand/kairon/KaiAvatar";
import { KaironMark } from "@/components/brand/kairon/KaironMark";
import { kaironAppUrl, getLaunchPhase, launchCopy } from "@/lib/launchConfig";
import type { Locale } from "@/lib/i18n";

type KaironHeroProps = {
  locale: Locale;
};

/**
 * KAIRON product hero — "Hero Shock" implementation.
 *
 * Moves away from the generic headline+subhead+two-buttons template:
 * Kai is rendered oversized and bleeding into the copy column, the
 * headline uses a gradient-text emphasis word, and the whole section
 * sits on the gradient mesh with a single glow focal point behind Kai.
 *
 * Fully server-renderable (no client fetch on first paint).
 */
export function KaironHero({ locale }: KaironHeroProps) {
  const isSpanish = locale === "es";
  const phase = getLaunchPhase();
  const campaign = launchCopy(locale, phase);
  const ctaUrl = kaironAppUrl(locale, "hero", phase);

  return (
    <section className="kairon-hero kairon-mesh" aria-labelledby="kairon-title">
      {/* Single focal glow — sits behind Kai, the one bright point in this viewport */}
      <div className="kairon-hero__glow" aria-hidden="true" />

      <div className="kairon-hero__copy">
        <div className="kairon-hero__eyebrow">
          <KaironMark title="" width={22} height={22} style={{ color: "#EFA831" }} />
          <span>
            {isSpanish ? "COACH DE EJECUCIÓN COGNITIVA" : "COGNITIVE EXECUTION COACH"}
          </span>
          <span className="kairon-hero__eyebrow-dot" aria-hidden="true" />
          <span className="kairon-hero__eyebrow-live">
            <span className="kairon-pulse-dot" />
            {isSpanish ? "MVP ACTIVO" : "LIVE MVP"}
          </span>
        </div>

        <h1 id="kairon-title">
          {isSpanish ? (
            <>
              Convierte <span className="kairon-gradient-text">fricción mental</span> en tu siguiente acción concreta.
            </>
          ) : (
            <>
              Turn <span className="kairon-gradient-text">mental friction</span> into your next concrete action.
            </>
          )}
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
          position: relative;
          min-height: min(920px, 94svh);
          max-width: 1280px;
          margin-inline: auto;
          padding: clamp(7rem, 12vw, 11rem) clamp(1.25rem, 5vw, 4.5rem) 5rem;
          display: grid;
          grid-template-columns: minmax(0, 1.12fr) minmax(320px, 0.88fr);
          gap: clamp(1.5rem, 5vw, 4rem);
          align-items: center;
        }

        /* The single focal glow of this viewport — sits behind Kai */
        .kairon-hero__glow {
          position: absolute;
          top: 8%;
          right: 2%;
          width: min(46vw, 620px);
          height: min(46vw, 620px);
          background: radial-gradient(circle, rgb(239 168 49 / 20%) 0%, rgb(58 46 140 / 10%) 45%, transparent 72%);
          filter: blur(20px);
          pointer-events: none;
          z-index: 0;
        }

        .kairon-hero__eyebrow {
          position: relative;
          z-index: 1;
          color: #EFA831;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.75rem;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-family: var(--font-display, "Manrope", sans-serif);
        }

        .kairon-hero__eyebrow-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #7A6C5E;
        }

        .kairon-hero__eyebrow-live {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #BDB0A3;
          font-size: 0.6875rem;
        }

        .kairon-hero h1 {
          position: relative;
          z-index: 1;
          max-width: 15ch;
          margin: 1.5rem 0 1.25rem;
          color: #F8F1E8;
          font-size: clamp(3rem, 6.4vw, 6.75rem);
          line-height: 0.95;
          letter-spacing: -0.055em;
          font-family: var(--font-display, "Manrope", sans-serif);
          font-weight: 700;
        }

        .kairon-hero__lead {
          position: relative;
          z-index: 1;
          max-width: 56ch;
          color: #BDB0A3;
          font-size: clamp(1.05rem, 1.6vw, 1.28rem);
          line-height: 1.65;
        }

        .kairon-hero__actions {
          position: relative;
          z-index: 1;
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-top: 2rem;
        }

        .kairon-hero__trust {
          position: relative;
          z-index: 1;
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
          position: relative;
          z-index: 1;
          min-height: 560px;
          display: grid;
          place-items: center;
          /* No border here — Kai bleeds toward the edge, not boxed in */
        }

        .kairon-hero__kai {
          width: min(128%, 560px);
        }

        @media (max-width: 800px) {
          .kairon-hero {
            min-height: auto;
            grid-template-columns: 1fr;
            padding-top: 7rem;
          }
          .kairon-hero__glow {
            width: 90vw;
            height: 90vw;
            top: -6%;
            right: -20%;
          }
          .kairon-hero h1 {
            font-size: clamp(2.8rem, 13vw, 4.6rem);
            max-width: none;
          }
          .kairon-hero__visual {
            min-height: 380px;
          }
          .kairon-hero__kai {
            width: min(84vw, 380px);
          }
        }
      `}</style>
    </section>
  );
}
