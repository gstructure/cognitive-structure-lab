import { Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Section } from "@/components/site/Section";
import { SectionHeader } from "@/components/site/SectionHeader";
import { useLocale } from "@/lib/i18n";

export function SupportLaunchTeaser() {
  const { locale } = useLocale();
  const copy = locale === "en"
    ? {
        eyebrow: "EARLY-STAGE STARTUP SUPPORT",
        title: "Support the launch of G-Frame.",
        subtitle:
          "Help G-Structure move G-Frame from prototype to MVP through early validation, product development, and the July 14 launch inside Ecuador Tech Week.",
        note:
          "This is early startup support, not a donation campaign, investment offering, equity sale, or promise of financial return.",
        primary: "Support the launch",
        secondary: "See how support is used",
        to: "/en/support-the-launch",
      }
    : {
        eyebrow: "APOYO TEMPRANO DE STARTUP",
        title: "Apoya el lanzamiento de G-Frame.",
        subtitle:
          "Ayuda a G-Structure a llevar G-Frame del prototipo al MVP mediante validación temprana, desarrollo de producto y el lanzamiento del 14 de julio dentro de Ecuador Tech Week.",
        note:
          "Esto es apoyo temprano de startup: no es una campaña de donaciones, oferta de inversión, venta de equity ni promesa de retorno financiero.",
        primary: "Apoyar el lanzamiento",
        secondary: "Ver cómo se usa el apoyo",
        to: "/apoya-el-lanzamiento",
      };

  return (
    <Section tone="muted" id="support-launch">
      <div className="grid gap-8 border border-border bg-[color:var(--color-surface)] p-6 md:p-8 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <SectionHeader eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />
        </div>
        <div className="lg:col-span-5">
          <div className="border border-border bg-background p-5">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--color-brand)]" />
              <p className="text-sm leading-relaxed text-muted-foreground">{copy.note}</p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to={copy.to}
                className="inline-flex items-center justify-center gap-2 bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                {copy.primary}
                <ArrowRight size={15} />
              </Link>
              <Link
                to={copy.to}
                className="inline-flex items-center justify-center gap-2 border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-foreground"
              >
                {copy.secondary}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
