import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { Link } from "@tanstack/react-router";
import gsLogoLight from "@/assets/gslogolight.webp";
import { KAIRON_THEME } from "@/lib/kaironTheme";

const ORANGE = KAIRON_THEME.accent;
const ORANGE_HOVER = KAIRON_THEME.accentHover;

/**
 * Shared dark-theme header/footer for the KAIRON "documentation" pages
 * from the design handoff (Método I-R-O, Bloqueos, Índice de Fricción,
 * KAIRON vs Notion — all four share this exact header per the handoff's
 * "Header (compartido)" spec). Unlike Home/Teams' flat nav, this one has
 * the two click-to-open dropdowns ("Producto" and "Metodología"): opens
 * on click, closes on outside click or Escape, one panel open at a time,
 * keyboard-operable via native <button>/<a> semantics, and collapses to
 * a <details> accordion on mobile. Which dropdown shows as "active"
 * (current-section styling) depends on `current` — vs-notion lives under
 * Producto, the other three under Metodología.
 */

type DocNavItem = { label: string; href?: string; to?: string; current?: boolean };

function productoItems(current?: DocPage): DocNavItem[] {
  return [
    { label: "KAIRON", href: "/#producto" },
    { label: "Precio", href: "/#precio" },
    { label: "KAIRON for Teams", to: "/teams" },
    { label: "KAIRON vs Notion", href: "/kairon/vs/notion", current: current === "vs-notion" },
  ];
}

function metodologiaItems(current?: DocPage): DocNavItem[] {
  return [
    { label: "Método I-R-O™", href: "/metodo-iro", current: current === "metodo-iro" },
    { label: "Bloqueos de ejecución", href: "/bloqueos", current: current === "bloqueos" },
    { label: "Índice de Fricción", href: "/indice-friccion", current: current === "indice-friccion" },
  ];
}

export type DocPage = "metodo-iro" | "bloqueos" | "indice-friccion" | "vs-notion";

export function KaironDocHeader({
  current,
  ctaHref,
  onCtaClick,
}: {
  current: DocPage;
  ctaHref: string;
  onCtaClick?: () => void;
}) {
  const [menu, setMenu] = useState<"producto" | "metodologia" | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const producto = productoItems(current);
  const metodologia = metodologiaItems(current);
  const productoActive = current === "vs-notion";

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
        <Link to="/" style={{ display: "flex", alignItems: "center", flex: "none" }}>
          <img src={gsLogoLight} alt="G-Structure" style={{ height: 30, width: "auto", display: "block" }} />
        </Link>

        <nav aria-label="Principal" className="kdh-nav-desktop" style={{ display: "flex", alignItems: "center", gap: "clamp(14px,2.2vw,28px)", flexWrap: "wrap", justifyContent: "flex-end" }}>
          <DocDropdown label="Producto" items={producto} open={menu === "producto"} onToggle={toggle("producto")} active={productoActive} />
          <DocDropdown label="Metodología" items={metodologia} open={menu === "metodologia"} onToggle={toggle("metodologia")} active={!productoActive} />
          <Link to="/teams" className="kdh-link">Equipos</Link>
          <a href={ctaHref} target="_blank" rel="noopener noreferrer" onClick={onCtaClick} className="kdh-cta">Empezar prueba de 7 días</a>
        </nav>

        <button
          type="button"
          className="kdh-hamburger"
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileOpen}
          onClick={(e) => { e.stopPropagation(); setMobileOpen((v) => !v); }}
        >
          <span aria-hidden="true">{mobileOpen ? "✕" : "☰"}</span>
        </button>
      </div>

      {mobileOpen ? (
        <div className="kdh-mobile-panel">
          <MobileGroup title="Producto" items={producto} onNavigate={() => setMobileOpen(false)} />
          <MobileGroup title="Metodología" items={metodologia} onNavigate={() => setMobileOpen(false)} />
          <Link to="/teams" className="kdh-mobile-link" onClick={() => setMobileOpen(false)}>Equipos</Link>
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => { onCtaClick?.(); setMobileOpen(false); }}
            className="kdh-mobile-cta"
          >
            Empezar prueba de 7 días
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
        .kdh-link:focus-visible, .kdh-cta:focus-visible, .kdh-trigger:focus-visible, .kdh-item:focus-visible,
        .kdh-hamburger:focus-visible, .kdh-mobile-link:focus-visible, .kdh-mobile-cta:focus-visible {
          outline: 2px solid ${ORANGE}; outline-offset: 3px; border-radius: 4px;
        }
        .kdh-hamburger { display: none; border: 0; background: none; color: #F5F3F0; font-size: 19px; padding: 6px; cursor: pointer; line-height: 1; }
        .kdh-mobile-panel { display: none; }
        @media (max-width: 860px) {
          .kdh-nav-desktop { display: none; }
          .kdh-hamburger { display: inline-flex; }
          .kdh-mobile-panel { display: flex; flex-direction: column; gap: 2px; padding: 6px clamp(18px,5vw,40px) 20px; border-top: 1px solid ${KAIRON_THEME.border}; }
        }
        .kdh-mobile-group summary { cursor: pointer; padding: 12px 4px; font-size: 14px; color: #F5F3F0; list-style: none; display: flex; justify-content: space-between; align-items: center; }
        .kdh-mobile-group summary::-webkit-details-marker { display: none; }
        .kdh-mobile-link, .kdh-mobile-group a { display: block; padding: 10px 4px; font-size: 14px; color: rgba(245,243,240,0.72); }
        .kdh-mobile-group a[aria-current="page"] { color: ${ORANGE}; }
        .kdh-mobile-cta { display: inline-flex; justify-content: center; margin-top: 10px; background: ${ORANGE}; color: #1A1000; font-weight: 600; font-size: 14px; padding: 12px 20px; border-radius: 999px; }
      `}</style>
    </header>
  );
}

function DocDropdown({
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

function MobileGroup({ title, items, onNavigate }: { title: string; items: DocNavItem[]; onNavigate: () => void }) {
  return (
    <details className="kdh-mobile-group">
      <summary>
        {title} <span aria-hidden="true" style={{ fontSize: 9, opacity: 0.65 }}>▼</span>
      </summary>
      <div style={{ display: "grid" }}>
        {items.map((item) =>
          item.to ? (
            <Link key={item.label} to={item.to as string} onClick={onNavigate}>{item.label}</Link>
          ) : (
            <a key={item.label} href={item.href} aria-current={item.current ? "page" : undefined} onClick={onNavigate}>
              {item.label}
            </a>
          ),
        )}
      </div>
    </details>
  );
}

export function KaironDocFooter({
  legalNote = "KAIRON no sustituye atención psicológica ni médica profesional.",
}: {
  legalNote?: string;
} = {}) {
  return (
    <footer style={{ background: KAIRON_THEME.footerBg, borderTop: `1px solid ${KAIRON_THEME.border}`, padding: "clamp(46px,6vw,76px) clamp(18px,5vw,40px)" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 34 }}>
        <div>
          <img src={gsLogoLight} alt="G-Structure" style={{ height: 28, width: "auto", display: "block" }} />
          <p style={{ fontSize: 14, lineHeight: 1.6, color: "rgba(245,243,240,0.5)", margin: "16px 0 0", maxWidth: "24em" }}>
            Infraestructura cognitiva para gente que ya sabe qué hacer.
          </p>
        </div>
        <div style={{ display: "grid", gap: 9, fontSize: 14, alignContent: "start" }}>
          <div className="kdh-foot-label">Metodología</div>
          <a href="/metodo-iro" className="kdh-foot-link">Método I-R-O™</a>
          <a href="/bloqueos" className="kdh-foot-link">Bloqueos de ejecución</a>
          <a href="/indice-friccion" className="kdh-foot-link">Índice de Fricción</a>
        </div>
        <div style={{ display: "grid", gap: 9, fontSize: 14, alignContent: "start" }}>
          <div className="kdh-foot-label">Producto</div>
          <a href="/#producto" className="kdh-foot-link">KAIRON</a>
          <Link to="/teams" className="kdh-foot-link">KAIRON for Teams</Link>
          <a href="/kairon/vs/notion" className="kdh-foot-link">KAIRON vs Notion</a>
        </div>
        <div style={{ display: "grid", gap: 9, fontSize: 14, alignContent: "start" }}>
          <div className="kdh-foot-label">Contacto</div>
          <a href="mailto:guillermo@g-structure.co" className="kdh-foot-link">guillermo@g-structure.co</a>
          <a href="https://wa.me/593986875121" className="kdh-foot-link">+593 98 687 5121</a>
        </div>
      </div>
      <div style={{ maxWidth: 1240, margin: "44px auto 0", paddingTop: 22, borderTop: `1px solid ${KAIRON_THEME.border}`, fontSize: "12.5px", color: "rgba(245,243,240,0.32)", display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "space-between" }}>
        <span>© 2026 G-Structure. Guayaquil, Ecuador.</span>
        <span style={{ maxWidth: "44em" }}>{legalNote}</span>
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
