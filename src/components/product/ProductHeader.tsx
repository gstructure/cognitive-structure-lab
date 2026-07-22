import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { KaironMark } from "@/components/brand/kairon/KaironMark";
import { LangSwitcher } from "@/components/site/LangSwitcher";
import { useLocale } from "@/lib/i18n";
import { kaironAppUrl, getLaunchPhase, launchCopy } from "@/lib/launchConfig";

/**
 * KAIRON product-surface header.
 * Dark background, gold mark, product navigation.
 * Spec: [KAIRON mark] KAIRON | How it works | Features | Proof | Pricing | [Start diagnostic]
 * Small utility: "A product by G-Structure"
 */
export function ProductHeader() {
  const { locale } = useLocale();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile nav on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const phase = getLaunchPhase();
  const campaign = launchCopy(locale, phase);
  const ctaUrl = kaironAppUrl(locale, "header", phase);
  const isSpanish = locale === "es";

  const NAV = [
    { href: "#how-it-works", label: isSpanish ? "Cómo funciona" : "How it works" },
    { href: "#features", label: isSpanish ? "Funciones" : "Features" },
    { href: "#proof", label: isSpanish ? "Validación" : "Proof" },
    { href: "#pricing", label: isSpanish ? "Precio" : "Pricing" },
  ];

  const kaironRoute = isSpanish ? "/kairon" : "/en/kairon";

  return (
    <header
      className="product-header"
      data-scrolled={scrolled || undefined}
    >
      <div className="product-header__inner">
        {/* Logo area */}
        <Link to={kaironRoute} className="product-header__brand" onClick={() => setOpen(false)}>
          <KaironMark title="KAIRON" width={24} height={24} style={{ color: "#EFA831" }} />
          <span className="product-header__wordmark">KAIRON</span>
        </Link>

        {/* Desktop nav */}
        <nav className="product-header__nav">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="product-header__link"
            >
              {n.label}
            </a>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="product-header__actions">
          <span className="product-header__utility">
            {isSpanish ? "Un producto de " : "A product by "}
            <Link to={isSpanish ? "/" : "/en"} className="product-header__utility-link">
              G-Structure
            </Link>
          </span>
          <LangSwitcher />
          <a
            href={ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="product-header__cta"
          >
            {isSpanish ? "Iniciar diagnóstico" : "Start diagnostic"}
          </a>
        </div>

        {/* Mobile toggle */}
        <div className="product-header__mobile-actions">
          <a
            href={ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="product-header__cta product-header__cta--mobile"
            aria-label={campaign.primaryCta}
          >
            {isSpanish ? "Iniciar" : "Start"}
          </a>
          <button
            type="button"
            aria-label="Menu"
            className="product-header__menu-btn"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="product-header__drawer">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="product-header__drawer-link"
              onClick={() => setOpen(false)}
            >
              {n.label}
            </a>
          ))}
          <div className="product-header__drawer-footer">
            <LangSwitcher />
            <span className="product-header__utility">
              {isSpanish ? "Un producto de " : "A product by "}
              <Link to={isSpanish ? "/" : "/en"} className="product-header__utility-link">
                G-Structure
              </Link>
            </span>
          </div>
        </div>
      )}

      <style>{`
        .product-header {
          position: sticky;
          top: 0;
          z-index: 50;
          border-bottom: 1px solid rgb(239 168 49 / 12%);
          background: rgba(17, 12, 8, 0.88);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: box-shadow 0.3s ease;
        }
        .product-header[data-scrolled] {
          box-shadow: 0 8px 24px -18px rgba(239, 168, 49, 0.12);
        }

        .product-header__inner {
          max-width: 1280px;
          margin-inline: auto;
          padding-inline: clamp(1.25rem, 5vw, 4.5rem);
          height: 4rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
        }

        @media (min-width: 768px) {
          .product-header__inner { height: 5rem; }
        }

        .product-header__brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          flex-shrink: 0;
        }

        .product-header__wordmark {
          font-family: var(--font-display, "Manrope", sans-serif);
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #F8F1E8;
        }

        .product-header__nav {
          display: none;
          align-items: center;
          gap: 1.5rem;
        }
        @media (min-width: 1024px) {
          .product-header__nav { display: flex; }
        }

        .product-header__link {
          font-size: 0.8125rem;
          font-weight: 500;
          color: #BDB0A3;
          text-decoration: none;
          letter-spacing: 0.02em;
          transition: color 0.15s ease;
        }
        .product-header__link:hover {
          color: #F8F1E8;
        }

        .product-header__actions {
          display: none;
          align-items: center;
          gap: 1rem;
        }
        @media (min-width: 1024px) {
          .product-header__actions { display: flex; }
        }

        .product-header__utility {
          font-size: 0.6875rem;
          color: #BDB0A3;
          letter-spacing: 0.02em;
        }
        .product-header__utility-link {
          color: #F8F1E8;
          text-decoration: none;
          font-weight: 500;
        }
        .product-header__utility-link:hover {
          text-decoration: underline;
        }

        .product-header__cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem 1rem;
          background: #EFA831;
          color: #110C08;
          font-size: 0.8125rem;
          font-weight: 700;
          text-decoration: none;
          letter-spacing: 0.02em;
          transition: opacity 0.15s ease;
        }
        .product-header__cta:hover { opacity: 0.9; }

        .product-header__mobile-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        @media (min-width: 1024px) {
          .product-header__mobile-actions { display: none; }
        }

        .product-header__cta--mobile {
          padding: 0.4rem 0.75rem;
          font-size: 0.75rem;
        }

        .product-header__menu-btn {
          padding: 0.5rem;
          color: #F8F1E8;
          background: none;
          border: none;
          cursor: pointer;
        }

        .product-header__drawer {
          border-top: 1px solid rgb(239 168 49 / 12%);
          background: #110C08;
          padding: 1rem clamp(1.25rem, 5vw, 4.5rem);
          display: flex;
          flex-direction: column;
        }
        @media (min-width: 1024px) {
          .product-header__drawer { display: none; }
        }

        .product-header__drawer-link {
          padding: 0.75rem 0;
          font-size: 0.875rem;
          font-weight: 500;
          color: #BDB0A3;
          text-decoration: none;
          border-bottom: 1px solid rgb(239 168 49 / 10%);
        }
        .product-header__drawer-link:last-of-type { border-bottom: none; }

        .product-header__drawer-footer {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgb(239 168 49 / 12%);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }
      `}</style>
    </header>
  );
}
