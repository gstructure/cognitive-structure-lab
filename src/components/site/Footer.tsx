import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";
import { SocialLinks } from "@/components/site/SocialLinks";
import { useLocale, useT } from "@/lib/i18n";

type FooterLink = { to: string; label: string; external?: boolean; download?: boolean };

export function Footer() {
  const { locale } = useLocale();
  const t = useT();

  const productoLinks: FooterLink[] = [
    { to: locale === "en" ? "/en/g-struct" : "/g-struct", label: "G-Struct" },
    { to: (locale === "en" ? "/en/g-struct" : "/g-struct") + "#lista-de-espera", label: locale === "en" ? "Waitlist" : "Lista de espera" },
    { to: (locale === "en" ? "/en/g-struct" : "/g-struct") + "#planes", label: locale === "en" ? "Plans" : "Planes" },
  ];

  const enterpriseLinks: FooterLink[] = [
    { to: locale === "en" ? "/en/enterprise" : "/enterprise", label: locale === "en" ? "Diagnostic Workshop" : "Workshop de Diagnóstico" },
    { to: locale === "en" ? "/en/enterprise" : "/enterprise", label: "REESTRUCTURA Enterprise" },
    { to: locale === "en" ? "/en/restructure-1-1" : "/reestructura-1-1", label: locale === "en" ? "RESTRUCTURE 1:1" : "REESTRUCTURA 1:1" },
    { to: locale === "en" ? "/en/enterprise" : "/enterprise", label: locale === "en" ? "Continuity" : "Continuidad" },
  ];

  const ecosistemaLinks: FooterLink[] = [
    { to: "/inversores", label: locale === "en" ? "Investors" : "Inversores" },
    { to: locale === "en" ? "/en/etw-2026-partners" : "/aliados-etw-2026", label: locale === "en" ? "ETW 2026 Partners" : "Aliados ETW 2026" },
    { to: locale === "en" ? "/en/join-the-team" : "/unete-al-equipo", label: locale === "en" ? "Join the team" : "Únete al equipo" },
    { to: "/downloads/g-structure-brief-comercial.pdf", label: locale === "en" ? "Download brief" : "Descargar brief", external: true, download: true },
  ];

  const COLS = [
    { title: locale === "en" ? "Product" : "Producto", links: productoLinks },
    { title: "Enterprise", links: enterpriseLinks },
    { title: locale === "en" ? "Ecosystem" : "Ecosistema", links: ecosistemaLinks },
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
              <li className="text-muted-foreground">www.g-structure.co</li>
            </ul>
            <div className="mt-5">
              <SocialLinks only={["instagram", "facebook", "linkedin", "whatsapp"]} />
            </div>
          </div>
        </div>

        <p className="mt-14 max-w-3xl text-xs text-muted-foreground leading-relaxed">
          {t("common.legal")}
        </p>

        <div className="mt-6 pt-6 border-t border-border flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} G-Structure. {t("common.rightsReserved")} {t("common.initiativeOf")}
          </p>
          <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <Link to="/politicas-legales" className="hover:text-foreground">Políticas Legales</Link>
            <span aria-hidden>·</span>
            <a href="/politicas-legales#privacidad" className="hover:text-foreground">Privacidad</a>
            <span aria-hidden>·</span>
            <a href="/politicas-legales#terminos" className="hover:text-foreground">Términos</a>
            <span aria-hidden>·</span>
            <a href="/politicas-legales#cookies" className="hover:text-foreground">Cookies</a>
          </nav>
          <p className="text-xs text-muted-foreground tracking-wide">
            {t("footer.irO")}
          </p>
        </div>
      </div>
    </footer>
  );
}
