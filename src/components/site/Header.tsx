import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { LangSwitcher } from "@/components/site/LangSwitcher";
import { useLocale, useT } from "@/lib/i18n";
import { navForLocale } from "@/lib/routeMap";
import { trackConversion } from "@/lib/analytics";

export function Header() {
  const { locale } = useLocale();
  const t = useT();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const NAV = navForLocale(locale);
  const homeTo = locale === "en" ? "/en" : "/";
  const contactTo = locale === "en" ? "/en/contact" : "/contacto";

  return (
    <header className={`sticky top-0 z-50 border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70 transition-shadow duration-300 ${scrolled ? "border-border shadow-[0_8px_24px_-18px_rgba(5,50,90,0.25)]" : "border-transparent"}`}>
      <div className="container-x flex h-16 md:h-20 items-center justify-between gap-6">
        <Link to={homeTo as string} className="shrink-0" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {NAV.map((n) => {
            const baseClass = "text-[13px] font-medium tracking-wide transition-colors";
            const highlightClass = n.highlight
              ? "border border-foreground/40 px-3 py-1.5 text-foreground hover:bg-foreground/5"
              : "";
            return (
              <Link
                key={`${n.to}-${n.label}`}
                to={n.to as string}
                hash={n.hash}
                activeProps={{ className: "text-foreground" }}
                inactiveProps={{ className: n.highlight ? "text-foreground" : "text-muted-foreground hover:text-foreground" }}
                activeOptions={{ exact: n.exact ?? false }}
                className={`${baseClass} ${highlightClass}`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <LangSwitcher />
          <Link
            to={contactTo as string}
            onClick={() => trackConversion("contact_click", { source: "header_desktop" })}
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
                key={`${n.to}-${n.label}`}
                to={n.to as string}
                hash={n.hash}
                onClick={() => setOpen(false)}
                activeProps={{ className: "text-foreground" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                activeOptions={{ exact: n.exact ?? false }}
                className={`py-3 text-sm font-medium border-b border-border last:border-0 ${n.highlight ? "text-foreground" : ""}`}
              >
                {n.label}
                {n.highlight ? <span className="ml-2 text-[10px] tracking-[0.22em] text-muted-foreground">PRODUCTO</span> : null}
              </Link>
            ))}
            <div className="mt-4 flex items-center justify-between gap-3">
              <LangSwitcher />
              <Link
                to={contactTo as string}
                onClick={() => {
                  setOpen(false);
                  trackConversion("contact_click", { source: "header_mobile" });
                }}
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
