import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";
import { SocialLinks } from "@/components/site/SocialLinks";
import { useLocale, useT } from "@/lib/i18n";
import { navForLocale, opportunitiesForLocale } from "@/lib/routeMap";

export function Footer() {
  const { locale } = useLocale();
  const t = useT();
  const COLS = [
    { title: t("nav.navigation"), links: navForLocale(locale).map((n) => ({ to: n.to, label: n.label })) },
    { title: t("nav.opportunities"), links: opportunitiesForLocale(locale) },
  ] as const;
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-x py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
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
                    <Link
                      to={l.to as string}
                      className="text-sm text-foreground/80 hover:text-foreground transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-4">
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
          <p className="text-xs text-muted-foreground tracking-wide">
            {t("footer.irO")}
          </p>
        </div>
      </div>
    </footer>
  );
}
