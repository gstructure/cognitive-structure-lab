import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";

const NAV = [
  { to: "/", label: "Inicio" },
  { to: "/enterprise", label: "Enterprise" },
  { to: "/reestructura", label: "REESTRUCTURA 1:1" },
  { to: "/g-struct", label: "G-Struct" },
  { to: "/sobre-guillermo", label: "Sobre Guillermo" },
  { to: "/contacto", label: "Contacto" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
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
              activeOptions={{ exact: n.to === "/" }}
              className="text-[13px] font-medium tracking-wide transition-colors"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            to="/contacto"
            className="inline-flex items-center justify-center bg-foreground px-4 py-2.5 text-[13px] font-medium tracking-wide text-background transition-opacity hover:opacity-90"
          >
            Agendar conversación
          </Link>
        </div>

        <button
          type="button"
          aria-label="Abrir menú"
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
                activeOptions={{ exact: n.to === "/" }}
                className="py-3 text-sm font-medium border-b border-border last:border-0"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/contacto"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center justify-center bg-foreground px-4 py-3 text-sm font-medium text-background"
            >
              Agendar conversación
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
