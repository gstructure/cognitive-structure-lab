import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { LangSwitcher } from "@/components/site/LangSwitcher";
import { useLocale } from "@/lib/i18n";
import { navForLocale } from "@/lib/routeMap";
import { trackAcquisitionEvent, trackOutboundAppOpened } from "@/lib/analytics";
import { getLaunchPhase, kaironAppUrl, launchCopy } from "@/lib/launchConfig";

export function Header() {
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

  const NAV = navForLocale(locale);
  const homeTo = locale === "en" ? "/en" : "/";
  const phase = getLaunchPhase();
  const campaignCopy = launchCopy(locale, phase);
  const ctaLabel = campaignCopy.primaryCta;
  const appUrl = kaironAppUrl(locale, "header", phase);

  // Hide persistent product CTA on investor pages; that flow uses email/deck requests.
  const hideProductCTA = location.pathname.startsWith("/inversores") || location.pathname.startsWith("/en/investors");

  const onCtaClick = () => {
    trackAcquisitionEvent("hero_cta_clicked", { cta_location: "header", language: locale, campaign: "aug11_launch" });
    trackOutboundAppOpened({ cta_location: "header", language: locale, campaign: "aug11_launch" });
  };

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
          {!hideProductCTA && (
            <a
              href={appUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onCtaClick}
              className="inline-flex items-center justify-center bg-foreground px-4 py-2.5 text-[13px] font-medium tracking-wide text-background transition-opacity hover:opacity-90"
            >
              {ctaLabel}
            </a>
          )}
        </div>

        <div className="lg:hidden flex items-center gap-2">
          {!hideProductCTA && (
            <a
              href={appUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                setOpen(false);
                onCtaClick();
              }}
              aria-label={ctaLabel}
              className="inline-flex h-9 w-9 items-center justify-center bg-foreground text-background"
            >
              <ArrowUpRight size={16} />
            </a>
          )}
          <button
            type="button"
            aria-label="Menu"
            className="p-2 -mr-2 text-foreground"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
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
              {!hideProductCTA && (
                <a
                  href={appUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    setOpen(false);
                    onCtaClick();
                  }}
                  className="inline-flex flex-1 items-center justify-center bg-foreground px-4 py-3 text-sm font-medium text-background"
                >
                  {ctaLabel}
                </a>
              )}
            </div>
          </div>
        </div>
      ) : null}
      {!hideProductCTA ? (
        <a
          href={appUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onCtaClick}
          className="fixed inset-x-4 z-40 inline-flex min-h-12 items-center justify-center rounded-full bg-foreground px-5 text-sm font-semibold text-background shadow-[0_18px_45px_-22px_rgba(5,50,90,0.75)] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[color:var(--color-brand)] lg:hidden"
          style={{ bottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
        >
          {ctaLabel}
        </a>
      ) : null}
    </header>
  );
}
