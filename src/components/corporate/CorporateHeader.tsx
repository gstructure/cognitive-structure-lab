import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { LangSwitcher } from "@/components/site/LangSwitcher";
import { useLocale } from "@/lib/i18n";

/**
 * G-Structure corporate-surface header.
 * Light background, corporate palette, company navigation.
 * Spec: G-Structure | Method | Enterprise | Insights | Company | [Explore KAIRON]
 */
export function CorporateHeader() {
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

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const isSpanish = locale === "es";
  const homeTo = isSpanish ? "/" : "/en";

  const NAV = isSpanish
    ? [
        { to: "/metodo-iro", label: "Método I-R-O™" },
        { to: "/enterprise", label: "Enterprise" },
        { to: "/articulos", label: "Artículos" },
        { to: "/sobre-guillermo", label: "Nosotros" },
      ]
    : [
        { to: "/en/iro-method", label: "I-R-O™ Method" },
        { to: "/en/enterprise", label: "Enterprise" },
        { to: "/en/articles", label: "Articles" },
        { to: "/en/about-guillermo", label: "About" },
      ];

  const kaironRoute = isSpanish ? "/kairon" : "/en/kairon";
  const kaironLabel = isSpanish ? "Explorar KAIRON" : "Explore KAIRON";

  return (
    <header
      className="corp-header"
      data-scrolled={scrolled || undefined}
    >
      <div className="corp-header__inner">
        {/* Logo */}
        <Link to={homeTo as string} className="corp-header__brand" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        {/* Desktop nav */}
        <nav className="corp-header__nav">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to as string}
              className="corp-header__link"
              activeProps={{ className: "corp-header__link--active" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="corp-header__actions">
          <LangSwitcher />
          <Link to={kaironRoute} className="corp-header__cta">
            {kaironLabel}
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Mobile */}
        <div className="corp-header__mobile-actions">
          <Link to={kaironRoute} className="corp-header__cta corp-header__cta--mobile" aria-label={kaironLabel}>
            <ArrowUpRight size={16} />
          </Link>
          <button
            type="button"
            aria-label="Menu"
            className="corp-header__menu-btn"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="corp-header__drawer">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to as string}
              className="corp-header__drawer-link"
              onClick={() => setOpen(false)}
            >
              {n.label}
            </Link>
          ))}
          <Link
            to={kaironRoute}
            className="corp-header__drawer-link corp-header__drawer-link--highlight"
            onClick={() => setOpen(false)}
          >
            {kaironLabel}
          </Link>
          <div className="corp-header__drawer-footer">
            <LangSwitcher />
          </div>
        </div>
      )}

      <style>{`
        .corp-header {
          position: sticky;
          top: 0;
          z-index: 50;
          border-bottom: 1px solid transparent;
          background: rgba(250, 250, 247, 0.88);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .corp-header[data-scrolled] {
          border-color: #E2E8EE;
          box-shadow: 0 8px 24px -18px rgba(5, 50, 90, 0.18);
        }

        .corp-header__inner {
          max-width: 1200px;
          margin-inline: auto;
          padding-inline: 1.25rem;
          height: 4rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
        }
        @media (min-width: 768px) {
          .corp-header__inner {
            height: 5rem;
            padding-inline: 2rem;
          }
        }

        .corp-header__brand {
          flex-shrink: 0;
          text-decoration: none;
        }

        .corp-header__nav {
          display: none;
          align-items: center;
          gap: 1.75rem;
        }
        @media (min-width: 1024px) {
          .corp-header__nav { display: flex; }
        }

        .corp-header__link {
          font-size: 0.8125rem;
          font-weight: 500;
          color: #697783;
          text-decoration: none;
          letter-spacing: 0.02em;
          transition: color 0.15s ease;
        }
        .corp-header__link:hover,
        .corp-header__link--active {
          color: #193550;
        }

        .corp-header__actions {
          display: none;
          align-items: center;
          gap: 0.75rem;
        }
        @media (min-width: 1024px) {
          .corp-header__actions { display: flex; }
        }

        .corp-header__cta {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.5rem 1rem;
          background: #193550;
          color: #FAFAF7;
          font-size: 0.8125rem;
          font-weight: 600;
          text-decoration: none;
          letter-spacing: 0.02em;
          transition: opacity 0.15s ease;
        }
        .corp-header__cta:hover { opacity: 0.9; }

        .corp-header__mobile-actions {
          display: flex;
          align-items: center;
          gap: 0.375rem;
        }
        @media (min-width: 1024px) {
          .corp-header__mobile-actions { display: none; }
        }

        .corp-header__cta--mobile {
          width: 2.25rem;
          height: 2.25rem;
          padding: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .corp-header__menu-btn {
          padding: 0.5rem;
          margin-right: -0.5rem;
          color: #193550;
          background: none;
          border: none;
          cursor: pointer;
        }

        .corp-header__drawer {
          border-top: 1px solid #E2E8EE;
          background: #FAFAF7;
          padding: 1rem 1.25rem;
          display: flex;
          flex-direction: column;
        }
        @media (min-width: 768px) {
          .corp-header__drawer { padding-inline: 2rem; }
        }
        @media (min-width: 1024px) {
          .corp-header__drawer { display: none; }
        }

        .corp-header__drawer-link {
          padding: 0.75rem 0;
          font-size: 0.875rem;
          font-weight: 500;
          color: #697783;
          text-decoration: none;
          border-bottom: 1px solid #E2E8EE;
        }
        .corp-header__drawer-link:last-of-type { border-bottom: none; }
        .corp-header__drawer-link--highlight {
          color: #193550;
          font-weight: 600;
        }

        .corp-header__drawer-footer {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #E2E8EE;
          display: flex;
          align-items: center;
        }
      `}</style>
    </header>
  );
}
