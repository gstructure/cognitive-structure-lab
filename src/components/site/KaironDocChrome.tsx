import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import gsLogoLight from "@/assets/gslogolight.webp";
import { KAIRON_THEME } from "@/lib/kaironTheme";
import { swapLocalePath } from "@/lib/routeMap";
import type { Locale } from "@/lib/i18n";

const ORANGE = KAIRON_THEME.accent;
const ORANGE_HOVER = KAIRON_THEME.accentHover;

/**
 * Shared dark-theme header/footer for the KAIRON "documentation" pages
 * from the design handoff (Método I-R-O, Bloqueos, Índice de Fricción,
 * KAIRON vs IA generativa — all four share this exact header per the
 * handoff's "Header (compartido)" spec, in both languages). Has the two
 * click-to-open dropdowns ("Producto"/"Product" and "Metodología"/
 * "Methodology"): opens on click, closes on outside click or Escape, one
 * panel open at a time, keyboard-operable via native <button>/<a>
 * semantics, and collapses to a <details> accordion on mobile. Which
 * dropdown shows as "active" (current-section styling) depends on
 * `current` — vs-ia-generativa lives under Producto, the other three under
 * Metodología.
 *
 * `DocDropdown` is also exported standalone — HomePage.tsx's own header
 * uses it directly for a "Metodología" menu, since Home's header has
 * enough real behavioral differences (nav CTA scrolls to #precio instead
 * of linking out to the app, no mobile hamburger, an extra "El Espejo"
 * link) that swapping it wholesale for KaironDocHeader would silently
 * change that behavior.
 *
 * The language switcher links to the translation of the *same* page (per
 * the handoff's English-translation task list), not to the home page —
 * it resolves the target via routeMap's swapLocalePath, same mechanism
 * as the site-wide LangSwitcher.
 */

export type DocNavItem = { label: string; href?: string; to?: string; current?: boolean };

function productoItems(locale: Locale, current?: DocPage): DocNavItem[] {
  const home = locale === "en" ? "/en" : "/";
  return locale === "en"
    ? [
        { label: "KAIRON", href: `${home}#producto` },
        { label: "Pricing", href: `${home}#precio` },
        { label: "KAIRON for Teams", to: "/teams" },
        { label: "KAIRON vs generative AI", href: "/en/vs-generative-ai", current: current === "vs-ia-generativa" },
      ]
    : [
        { label: "KAIRON", href: `${home}#producto` },
        { label: "Precio", href: `${home}#precio` },
        { label: "KAIRON for Teams", to: "/teams" },
        { label: "KAIRON vs IA generativa", href: "/vs-ia-generativa", current: current === "vs-ia-generativa" },
      ];
}

function metodologiaItems(locale: Locale, current?: DocPage): DocNavItem[] {
  return locale === "en"
    ? [
        { label: "I-R-O™ Method", href: "/en/iro-method", current: current === "metodo-iro" },
        { label: "Execution blocks", href: "/en/execution-blocks", current: current === "bloqueos" },
        { label: "Friction Index", href: "/en/friction-index", current: current === "indice-friccion" },
      ]
    : [
        { label: "Método I-R-O™", href: "/metodo-iro", current: current === "metodo-iro" },
        { label: "Bloqueos de ejecución", href: "/bloqueos", current: current === "bloqueos" },
        { label: "Índice de Fricción", href: "/indice-friccion", current: current === "indice-friccion" },
      ];
}

export type DocPage = "metodo-iro" | "bloqueos" | "indice-friccion" | "vs-ia-generativa";

/**
 * Flat mobile nav order, per the "Diseño Mobile KAIRON" handoff (Tarea 1):
 * the desktop Producto/Metodología dropdown split collapses to a single
 * list in this exact order — no submenus or accordions inside the mobile
 * sheet. Precio is intentionally not included (it's a Home anchor, not a
 * standalone page); Teams is deliberately last.
 */
export function mobileNavItems(locale: Locale, current?: DocPage): DocNavItem[] {
  const home = locale === "en" ? "/en" : "/";
  return locale === "en"
    ? [
        { label: "KAIRON", href: `${home}#producto` },
        { label: "KAIRON vs generative AI", href: "/en/vs-generative-ai", current: current === "vs-ia-generativa" },
        { label: "I-R-O™ Method", href: "/en/iro-method", current: current === "metodo-iro" },
        { label: "Execution blocks", href: "/en/execution-blocks", current: current === "bloqueos" },
        { label: "Friction Index", href: "/en/friction-index", current: current === "indice-friccion" },
        { label: "KAIRON for Teams", to: "/teams" },
      ]
    : [
        { label: "KAIRON", href: `${home}#producto` },
        { label: "KAIRON vs IA generativa", href: "/vs-ia-generativa", current: current === "vs-ia-generativa" },
        { label: "Método I-R-O™", href: "/metodo-iro", current: current === "metodo-iro" },
        { label: "Bloqueos de ejecución", href: "/bloqueos", current: current === "bloqueos" },
        { label: "Índice de Fricción", href: "/indice-friccion", current: current === "indice-friccion" },
        { label: "KAIRON for Teams", to: "/teams" },
      ];
}

export function KaironDocHeader({
  locale,
  current,
  ctaHref,
  onCtaClick,
}: {
  locale: Locale;
  current: DocPage;
  ctaHref: string;
  onCtaClick?: () => void;
}) {
  const [menu, setMenu] = useState<"producto" | "metodologia" | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const producto = productoItems(locale, current);
  const metodologia = metodologiaItems(locale, current);
  const mobileNav = mobileNavItems(locale, current);
  const productoActive = current === "vs-ia-generativa";
  const productoLabel = locale === "en" ? "Product" : "Producto";
  const metodologiaLabel = locale === "en" ? "Methodology" : "Metodología";
  const teamsLabel = locale === "en" ? "Teams" : "Equipos";
  const ctaLabel = locale === "en" ? "Start 7-day trial" : "Empezar prueba de 7 días";
  const homeTo = locale === "en" ? "/en" : "/";

  useEffect(() => {
    const onDocClick = (e: globalThis.MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setMenu(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const toggle = (name: "producto" | "metodologia") => (e: MouseEvent) => {
    e.stopPropagation();
    setMenu((m) => (m === name ? null : name));
  };

  return (
    <header
      ref={rootRef}
      style={{
        position: "sticky", top: 0, zIndex: 60,
        background: "rgba(10,10,11,0.82)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
        borderBottom: `1px solid ${KAIRON_THEME.border}`,
      }}
    >
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "13px clamp(18px,4vw,40px)", display: "flex", alignItems: "center", gap: "clamp(16px,3vw,40px)", justifyContent: "space-between" }}>
        <Link to={homeTo as string} style={{ display: "flex", alignItems: "center", flex: "none" }}>
          <img src={gsLogoLight} alt="G-Structure" style={{ height: 30, width: "auto", display: "block" }} />
        </Link>

        <nav aria-label={locale === "en" ? "Main" : "Principal"} className="kdh-nav-desktop" style={{ display: "flex", alignItems: "center", gap: "clamp(14px,2.2vw,28px)", flexWrap: "wrap", justifyContent: "flex-end" }}>
          <DocDropdown label={productoLabel} items={producto} open={menu === "producto"} onToggle={toggle("producto")} active={productoActive} />
          <DocDropdown label={metodologiaLabel} items={metodologia} open={menu === "metodologia"} onToggle={toggle("metodologia")} active={!productoActive} />
          <Link to="/teams" className="kdh-link">{teamsLabel}</Link>
          <DocLangSwitch locale={locale} />
          <a href={ctaHref} target="_blank" rel="noopener noreferrer" onClick={onCtaClick} className="kdh-cta">{ctaLabel}</a>
        </nav>

        <button
          type="button"
          className="kdh-hamburger"
          aria-label={mobileOpen ? (locale === "en" ? "Close menu" : "Cerrar menú") : (locale === "en" ? "Open menu" : "Abrir menú")}
          aria-expanded={mobileOpen}
          onClick={(e) => { e.stopPropagation(); setMobileOpen((v) => !v); }}
        >
          <span aria-hidden="true" className="kdh-burger-bar" data-open={mobileOpen} data-bar="top" />
          <span aria-hidden="true" className="kdh-burger-bar" data-open={mobileOpen} data-bar="mid" />
        </button>
      </div>

      {mobileOpen ? (
        <div className="kdh-mobile-panel">
          {mobileNav.map((item) =>
            item.to ? (
              <Link key={item.label} to={item.to as string} className="kdh-mobile-row" onClick={() => setMobileOpen(false)}>
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                aria-current={item.current ? "page" : undefined}
                className="kdh-mobile-row"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
                {item.current ? <span aria-hidden="true" className="kdh-mobile-dot" /> : null}
              </a>
            ),
          )}
          <div style={{ marginTop: 10 }}>
            <DocLangSwitch locale={locale} />
          </div>
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => { onCtaClick?.(); setMobileOpen(false); }}
            className="kdh-mobile-cta"
          >
            {ctaLabel}
          </a>
        </div>
      ) : null}

      <style>{`
        .kdh-link { color: rgba(245,243,240,0.62); font-size: 13.5px; white-space: nowrap; }
        .kdh-link:hover { color: #F5F3F0; }
        .kdh-cta { background: ${ORANGE}; color: #1A1000; font-weight: 600; font-size: 13.5px; padding: 10px 17px; border-radius: 999px; white-space: nowrap; }
        .kdh-cta:hover { background: ${ORANGE_HOVER}; }
        .kdh-trigger { background: none; border: 0; padding: 6px 0; font-size: 13.5px; cursor: pointer; display: flex; align-items: center; gap: 6px; white-space: nowrap; color: rgba(245,243,240,0.62); }
        .kdh-trigger:hover { color: #F5F3F0; }
        .kdh-trigger[data-active="true"] { color: #F5F3F0; }
        .kdh-panel { position: absolute; top: calc(100% + 14px); left: -14px; min-width: 244px; background: ${KAIRON_THEME.surface2}; border: 1px solid ${KAIRON_THEME.borderStrong}; border-radius: 14px; padding: 8px; display: grid; gap: 1px; box-shadow: 0 20px 46px rgba(0,0,0,0.6); z-index: 80; }
        .kdh-item { display: block; padding: 10px 12px; border-radius: 9px; font-size: 14px; color: rgba(245,243,240,0.74); }
        .kdh-item:hover { background: rgba(245,243,240,0.06); color: #F5F3F0; }
        .kdh-item[aria-current="page"] { color: ${ORANGE}; }
        .kdh-lang-btn { border: none; background: transparent; color: rgba(245,243,240,0.5); font-size: 11.5px; font-weight: 600; letter-spacing: 0.08em; padding: 8px 11px; cursor: pointer; }
        .kdh-lang-btn[data-active="true"] { background: rgba(240,160,70,0.16); color: ${ORANGE}; }
        .kdh-link:focus-visible, .kdh-cta:focus-visible, .kdh-trigger:focus-visible, .kdh-item:focus-visible,
        .kdh-hamburger:focus-visible, .kdh-mobile-row:focus-visible, .kdh-mobile-cta:focus-visible, .kdh-lang-btn:focus-visible {
          outline: 2px solid ${ORANGE}; outline-offset: 3px; border-radius: 4px;
        }
        .kdh-hamburger { display: none; width: 44px; height: 44px; margin-right: -10px; border: 0; background: none; flex-direction: column; align-items: center; justify-content: center; gap: 5px; cursor: pointer; }
        .kdh-burger-bar { width: 20px; height: 1.5px; background: #F5F3F0; transition: transform 200ms ease, opacity 200ms ease; }
        .kdh-burger-bar[data-bar="top"][data-open="true"] { transform: translateY(3.25px) rotate(45deg); }
        .kdh-burger-bar[data-bar="mid"][data-open="true"] { transform: translateY(-3.25px) rotate(-45deg); }
        .kdh-mobile-panel { display: none; }
        @media (max-width: 768px) {
          .kdh-nav-desktop { display: none; }
          .kdh-hamburger { display: flex; }
          .kdh-mobile-panel { display: flex; flex-direction: column; gap: 0; padding: 0 clamp(18px,5vw,40px) 20px; border-top: 1px solid ${KAIRON_THEME.border}; }
        }
        .kdh-mobile-row { display: flex; align-items: center; justify-content: space-between; min-height: 50px; font-size: 16.5px; color: #F5F3F0; border-bottom: 1px solid ${KAIRON_THEME.border}; }
        .kdh-mobile-dot { width: 6px; height: 6px; border-radius: 50%; background: ${ORANGE}; flex: none; }
        .kdh-mobile-cta { display: flex; align-items: center; justify-content: center; min-height: 52px; margin-top: 14px; background: ${ORANGE}; color: #1A1000; font-weight: 600; font-size: 16.5px; border-radius: 999px; }
      `}</style>
    </header>
  );
}

function DocLangSwitch({ locale }: { locale: Locale }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const items: Locale[] = ["es", "en"];
  return (
    <div role="group" aria-label="Language" style={{ display: "flex", border: `1px solid ${KAIRON_THEME.borderStrong}`, borderRadius: 999, overflow: "hidden", flex: "none" }}>
      {items.map((l) => {
        const active = locale === l;
        return (
          <button
            key={l}
            type="button"
            className="kdh-lang-btn"
            data-active={active ? "true" : "false"}
            aria-pressed={active}
            aria-label={l === "es" ? "Cambiar a español" : "Switch to English"}
            onClick={() => {
              if (active) return;
              navigate({ to: swapLocalePath(pathname, l) });
            }}
          >
            {l.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}

export function DocDropdown({
  label, items, open, onToggle, active,
}: {
  label: string; items: DocNavItem[]; open: boolean; onToggle: (e: MouseEvent) => void; active?: boolean;
}) {
  return (
    <div style={{ position: "relative", flex: "none" }}>
      <button
        type="button"
        className="kdh-trigger"
        data-active={active ? "true" : "false"}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={onToggle}
      >
        {label} <span aria-hidden="true" style={{ fontSize: 9, opacity: 0.65 }}>▼</span>
      </button>
      <div role="menu" aria-label={label} className="kdh-panel" hidden={!open}>
        {items.map((item) =>
          item.to ? (
            <Link key={item.label} role="menuitem" to={item.to as string} className="kdh-item">{item.label}</Link>
          ) : (
            <a key={item.label} role="menuitem" href={item.href} aria-current={item.current ? "page" : undefined} className="kdh-item">
              {item.label}
            </a>
          ),
        )}
      </div>
    </div>
  );
}

export function KaironDocFooter({
  locale = "es",
  legalNote,
}: {
  locale?: Locale;
  legalNote?: string;
} = {}) {
  const isEn = locale === "en";
  const note = legalNote ?? (isEn
    ? "Our content is not a substitute for psychological, medical or psychiatric care."
    : "KAIRON no sustituye atención psicológica ni médica profesional.");
  const home = isEn ? "/en" : "/";

  return (
    <footer style={{ background: KAIRON_THEME.footerBg, borderTop: `1px solid ${KAIRON_THEME.border}`, padding: "clamp(46px,6vw,76px) clamp(18px,5vw,40px)" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 34 }}>
        <div>
          <img src={gsLogoLight} alt="G-Structure" style={{ height: 28, width: "auto", display: "block" }} />
          <p style={{ fontSize: 14, lineHeight: 1.6, color: "rgba(245,243,240,0.5)", margin: "16px 0 0", maxWidth: "24em" }}>
            {isEn ? "Cognitive infrastructure for people who already know what to do." : "Infraestructura cognitiva para gente que ya sabe qué hacer."}
          </p>
        </div>
        <div style={{ display: "grid", gap: 9, fontSize: 14, alignContent: "start" }}>
          <div className="kdh-foot-label">{isEn ? "Methodology" : "Metodología"}</div>
          <a href={isEn ? "/en/iro-method" : "/metodo-iro"} className="kdh-foot-link">{isEn ? "I-R-O™ Method" : "Método I-R-O™"}</a>
          <a href={isEn ? "/en/execution-blocks" : "/bloqueos"} className="kdh-foot-link">{isEn ? "Execution blocks" : "Bloqueos de ejecución"}</a>
          <a href={isEn ? "/en/friction-index" : "/indice-friccion"} className="kdh-foot-link">{isEn ? "Friction Index" : "Índice de Fricción"}</a>
        </div>
        <div style={{ display: "grid", gap: 9, fontSize: 14, alignContent: "start" }}>
          <div className="kdh-foot-label">{isEn ? "Product" : "Producto"}</div>
          <a href={`${home}#producto`} className="kdh-foot-link">KAIRON</a>
          <Link to="/teams" className="kdh-foot-link">KAIRON for Teams</Link>
          <a href={isEn ? "/en/vs-generative-ai" : "/vs-ia-generativa"} className="kdh-foot-link">{isEn ? "KAIRON vs generative AI" : "KAIRON vs IA generativa"}</a>
        </div>
        <div style={{ display: "grid", gap: 9, fontSize: 14, alignContent: "start" }}>
          <div className="kdh-foot-label">{isEn ? "Contact" : "Contacto"}</div>
          <a href="mailto:guillermo@g-structure.co" className="kdh-foot-link">guillermo@g-structure.co</a>
          <a href="https://wa.me/593986875121" className="kdh-foot-link">+593 98 687 5121</a>
        </div>
      </div>
      <div style={{ maxWidth: 1240, margin: "44px auto 0", paddingTop: 22, borderTop: `1px solid ${KAIRON_THEME.border}`, fontSize: "12.5px", color: "rgba(245,243,240,0.32)", display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "space-between" }}>
        <span>© 2026 G-Structure. Guayaquil, Ecuador.</span>
        <span style={{ maxWidth: "44em" }}>{note}</span>
      </div>
      <style>{`
        .kdh-foot-label { font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(245,243,240,0.35); margin-bottom: 4px; }
        .kdh-foot-link { color: rgba(245,243,240,0.62); }
        .kdh-foot-link:hover { color: ${ORANGE}; }
        .kdh-foot-link:focus-visible { outline: 2px solid ${ORANGE}; outline-offset: 3px; border-radius: 4px; }
      `}</style>
    </footer>
  );
}

/**
 * Mobile-only sticky bottom CTA bar (Tarea 2 of the "Diseño Mobile KAIRON"
 * handoff) — new in mobile, doesn't exist in desktop at all. Rendered on
 * every page; hidden above the 768px breakpoint via CSS only (not a JS
 * conditional) so there's no hydration mismatch and no risk of a
 * flash-of-wrong-layout on desktop.
 */
export function MobileStickyCta({
  href,
  label,
  external,
  onClick,
}: {
  href: string;
  label: string;
  external?: boolean;
  onClick?: () => void;
}) {
  return (
    <div className="kdh-sticky-cta">
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        onClick={onClick}
        className="kdh-sticky-cta-btn"
      >
        {label}
      </a>
      <style>{`
        .kdh-sticky-cta { display: none; }
        @media (max-width: 768px) {
          .kdh-sticky-cta {
            display: block;
            position: sticky;
            bottom: 0;
            z-index: 80;
            background: rgba(10,10,11,0.92);
            backdrop-filter: blur(18px);
            -webkit-backdrop-filter: blur(18px);
            border-top: 1px solid rgba(245,243,240,0.09);
            padding: 12px 16px calc(12px + env(safe-area-inset-bottom));
          }
        }
        .kdh-sticky-cta-btn {
          display: flex; align-items: center; justify-content: center; min-height: 52px;
          background: ${ORANGE}; color: #1A1000; font-weight: 600; font-size: 16.5px; border-radius: 999px;
        }
        .kdh-sticky-cta-btn:hover { background: ${ORANGE_HOVER}; }
        .kdh-sticky-cta-btn:focus-visible { outline: 2px solid ${ORANGE}; outline-offset: 3px; }
      `}</style>
    </div>
  );
}
