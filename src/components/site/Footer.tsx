import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";
import { SocialLinks } from "@/components/site/SocialLinks";
import { useLocale, useT } from "@/lib/i18n";

type FooterLink = { to: string; label: string; external?: boolean; download?: boolean };

export function Footer() {
  const { locale } = useLocale();
  const t = useT();

  const gStructBase = locale === "en" ? "/en/g-frame" : "/g-frame";

  const productoLinks: FooterLink[] = [
    { to: gStructBase, label: "G-Frame" },
    { to: locale === "en" ? "/en/articles" : "/articulos", label: locale === "en" ? "Articles" : "Artículos" },
    { to: locale === "en" ? "/en/newsletter" : "/newsletter", label: "Newsletter" },
    { to: locale === "en" ? "/en/support-the-launch" : "/apoya-el-lanzamiento", label: locale === "en" ? "Support G-Structure" : "Apoya G-Structure" },
    { to: gStructBase + "#waitlist", label: locale === "en" ? "Waitlist" : "Lista de espera" },
    { to: "/diagnostico-friccion-ejecutiva", label: locale === "en" ? "Execution Diagnostic" : "Diagnóstico de Ejecución" },
  ];

  const validationLinks: FooterLink[] = [
    { to: locale === "en" ? "/en/iro-method" : "/metodo-iro", label: locale === "en" ? "I-R-O™ Method" : "Método I-R-O™" },
    { to: locale === "en" ? "/en/enterprise" : "/enterprise", label: "Enterprise pilot" },
    { to: locale === "en" ? "/en/restructure-1-1" : "/reestructura-1-1", label: locale === "en" ? "RESTRUCTURE 1:1" : "REESTRUCTURA 1:1" },
    { to: locale === "en" ? "/en/etw-2026-partners" : "/aliados-etw-2026", label: "Workshop ETW 2026" },
  ];

  const companiaLinks: FooterLink[] = [
    { to: locale === "en" ? "/en/about-guillermo" : "/sobre-guillermo", label: locale === "en" ? "About" : "Nosotros" },
    { to: locale === "en" ? "/en/investors" : "/inversores", label: locale === "en" ? "Investors" : "Inversores" },
    { to: locale === "en" ? "/en/etw-2026-partners" : "/aliados-etw-2026", label: locale === "en" ? "ETW 2026 Partners" : "Aliados ETW 2026" },
    { to: locale === "en" ? "/en/join-the-team" : "/unete-al-equipo", label: locale === "en" ? "Join the team" : "Únete al equipo" },
    { to: locale === "en" ? "/en/contact" : "/contacto", label: locale === "en" ? "Contact" : "Contacto" },
  ];

  const COLS = [
    { title: locale === "en" ? "Product" : "Producto", links: productoLinks },
    { title: locale === "en" ? "Validation" : "Validación", links: validationLinks },
    { title: locale === "en" ? "Company" : "Compañía", links: companiaLinks },
  ];

  return (
    <footer className="border-t border-border bg-background">
      <div className="container-x py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-3">
            <Logo />
            <p className="mt-5 max-w-sm text-sm text-muted-foreground leading-relaxed">
              {t("footer.tagline")}
            </p>
          </div>

          {COLS.map((col) => (
            <div key={col.title} className="md:col-span-2">
              <p className="eyebrow mb-4">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={`${col.title}-${l.to}-${l.label}`}>
                    {l.external ? (
                      <a
                        href={l.to}
                        target="_blank"
                        rel="noopener"
                        download={l.download}
                        className="text-sm text-foreground/80 hover:text-foreground transition-colors"
                      >
                        {l.label}
                      </a>
                    ) : l.to.includes("#") ? (
                      <a
                        href={l.to}
                        className="text-sm text-foreground/80 hover:text-foreground transition-colors"
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link
                        to={l.to as string}
                        className="text-sm text-foreground/80 hover:text-foreground transition-colors"
                      >
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-3">
            <p className="eyebrow mb-4">{t("nav.contactCol")}</p>
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
              <li className="text-muted-foreground">g-structure.co</li>
            </ul>
            <div className="mt-5">
              <SocialLinks only={["instagram", "facebook", "linkedin", "whatsapp"]} />
            </div>
          </div>
        </div>

        <p className="mt-14 max-w-3xl text-xs text-muted-foreground leading-relaxed">
          {t("common.legal")}
        </p>

        <div className="mt-6 border-t border-border pt-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-xs text-muted-foreground lg:shrink-0">
              © {new Date().getFullYear()} G-Structure. {t("common.rightsReserved")}
            </p>
            <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground lg:justify-center">
              <Link to="/politicas-legales" className="hover:text-foreground">Políticas Legales</Link>
              <a href="/politicas-legales#privacidad" className="hover:text-foreground">Privacidad</a>
              <a href="/politicas-legales#terminos" className="hover:text-foreground">Términos</a>
              <a href="/politicas-legales#cookies" className="hover:text-foreground">Cookies</a>
            </nav>
            <p className="text-xs text-muted-foreground tracking-wide lg:shrink-0 lg:text-right">
              {t("footer.irO")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

