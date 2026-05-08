import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";

const COLS = [
  {
    title: "Servicios",
    links: [
      { to: "/enterprise", label: "Enterprise" },
      { to: "/reestructura", label: "REESTRUCTURA 1:1" },
      { to: "/g-struct", label: "G-Struct" },
    ],
  },
  {
    title: "Marca",
    links: [
      { to: "/sobre-guillermo", label: "Sobre Guillermo" },
      { to: "/aliados-etw-2026", label: "Aliados ETW 2026" },
      { to: "/unete-al-equipo", label: "Únete al equipo" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-x py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-5 max-w-sm text-sm text-muted-foreground leading-relaxed">
              Ingeniería de resultados cognitivo-conductuales. Coaching cognitivo-conductual
              aplicado a la ejecución en contextos profesionales de alta exigencia.
            </p>
          </div>

          {COLS.map((col) => (
            <div key={col.title} className="md:col-span-2">
              <p className="eyebrow mb-4">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-sm text-foreground/80 hover:text-foreground transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-3">
            <p className="eyebrow mb-4">Contacto</p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="mailto:guillermo@g-structure.co" className="text-foreground/80 hover:text-foreground">
                  guillermo@g-structure.co
                </a>
              </li>
              <li>
                <a href="https://wa.me/593986875121" className="text-foreground/80 hover:text-foreground">
                  +593 98 687 5121
                </a>
              </li>
              <li className="text-muted-foreground">www.g-structure.co</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-border flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} G-Structure. Todos los derechos reservados.
          </p>
          <p className="text-xs text-muted-foreground tracking-wide">
            Identificar · Reencuadrar · Optimizar
          </p>
        </div>
      </div>
    </footer>
  );
}
