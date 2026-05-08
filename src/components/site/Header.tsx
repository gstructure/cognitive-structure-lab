import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { LangSwitcher } from "@/components/site/LangSwitcher";
import { useT } from "@/lib/i18n";

export function Header() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const NAV = [
    { to: "/", label: t("nav.home"), exact: true },
    { to: "/enterprise", label: t("nav.enterprise") },
    { to: "/reestructura", label: t("nav.reestructura") },
    { to: "/g-struct", label: t("nav.gstruct") },
    { to: "/sobre-guillermo", label: t("nav.aboutGuillermo") },
    { to: "/contacto", label: t("nav.contact") },
  ] as const;

  return (
    <header className={`sticky top-0 z-50 border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70 transition-shadow duration-300 ${scrolled ? "border-border shadow-[0_8px_24px_-18px_rgba(5,50,90,0.25)]" : "border-transparent"}`}>
      <div className="container-x flex h-16 md:h-20 items-center justify-between gap-6">
        <Link to="/" className="shrink-0" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeProps={{ className: "text-foreground" }}
              inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
              activeOptions={{ exact: n.exact ?? false }}
              className="text-[13px] font-medium tracking-wide transition-colors"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <LangSwitcher />
          <Link
            to="/contacto"
            className="inline-flex items-center justify-center bg-foreground px-4 py-2.5 text-[13px] font-medium tracking-wide text-background transition-opacity hover:opacity-90"
          >
            {t("common.bookCall")}
          </Link>
        </div>

        <button
          type="button"
          aria-label="Menu"
          className="lg:hidden p-2 -mr-2 text-foreground"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open ? (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container-x py-4 flex flex-col">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                activeProps={{ className: "text-foreground" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                activeOptions={{ exact: n.exact ?? false }}
                className="py-3 text-sm font-medium border-b border-border last:border-0"
              >
                {n.label}
              </Link>
            ))}
            <div className="mt-4 flex items-center justify-between gap-3">
              <LangSwitcher />
              <Link
                to="/contacto"
                onClick={() => setOpen(false)}
                className="inline-flex flex-1 items-center justify-center bg-foreground px-4 py-3 text-sm font-medium text-background"
              >
                {t("common.bookCall")}
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
