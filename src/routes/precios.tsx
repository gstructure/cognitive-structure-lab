import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Section } from "@/components/site/Section";
import { Eyebrow } from "@/components/site/Eyebrow";
import { buildSeo, canonicalLink, jsonLdScript, breadcrumbSchema, gStructSoftwareSchema } from "@/lib/seo";
import { KAIRON_PRICING, KAIRON_VOICE_LIMITS, getLaunchPhase, kaironAppUrl, launchCopy } from "@/lib/launchConfig";
import { trackAcquisitionEvent, trackOutboundAppOpened } from "@/lib/analytics";

export const Route = createFileRoute("/precios")({
  head: () => ({
    meta: buildSeo({
      path: "/precios",
      title: "Precio de KAIRON Pro | G-Structure",
      description:
        "KAIRON Pro combina Filtro, Taller, Protocolo, Activador Diario, Nocturno y voz con Kai en un sistema de ejecucion cognitiva.",
    }),
    links: canonicalLink("/precios"),
    scripts: [
      jsonLdScript(breadcrumbSchema([
        { name: "Inicio", path: "/" },
        { name: "Precio", path: "/precios" },
      ])),
      jsonLdScript(gStructSoftwareSchema("es")),
    ],
  }),
  component: () => <PricingPage locale="es" />,
});

export function PricingPage({ locale }: { locale: "es" | "en" }) {
  const phase = getLaunchPhase();
  const copy = launchCopy(locale, phase);
  const appUrl = kaironAppUrl(locale, locale === "en" ? "pricing_page" : "pagina_precios", phase);
  const isEn = locale === "en";
  const groups = isEn
    ? [
        { title: "Reframe the block in the moment", items: ["10 Filter sessions per week", "5 Workshop sessions per week", `Voice with Kai: ${KAIRON_VOICE_LIMITS.monthlyKaiVoiceMinutes} minutes per month`] },
        { title: "Restructure the pattern", items: ["Complete eight-week program", "Module 0 orientation + Modules 1-8", "Personalized Daily Activator", "Structured memory between sessions"] },
        { title: "Turn clarity into follow-up", items: ["Action commitments with follow-up", "Weekly Execution Report", "Downloadable reports", "Priority support"] },
        { title: "Close the day", items: ["Unlimited written Night Mode", `${KAIRON_VOICE_LIMITS.nocturnoVoiceSessionsPerWeek} voice Night Mode sessions per week`] },
      ]
    : [
        { title: "Reencuadra el bloqueo en el momento", items: ["10 sesiones de Filtro por semana", "5 sesiones de Taller por semana", `Voz con Kai: ${KAIRON_VOICE_LIMITS.monthlyKaiVoiceMinutes} minutos por mes`] },
        { title: "Reestructura el patron", items: ["Programa completo de ocho semanas", "Modulo 0 de orientacion + Modulos 1-8", "Activador Diario personalizado", "Memoria estructurada entre sesiones"] },
        { title: "Convierte claridad en seguimiento", items: ["Compromisos de Accion con seguimiento", "Reporte Semanal de Ejecucion", "Reportes descargables", "Soporte prioritario"] },
        { title: "Cierra el dia", items: ["Nocturno escrito ilimitado", `${KAIRON_VOICE_LIMITS.nocturnoVoiceSessionsPerWeek} sesiones de Nocturno por voz por semana`] },
      ];

  return (
    <Section>
      <div className="mx-auto max-w-5xl">
        <div className="max-w-3xl">
          <Eyebrow>{isEn ? "KAIRON PRO" : "KAIRON PRO"}</Eyebrow>
          <h1 className="mt-4 font-display text-4xl md:text-5xl leading-[1.04]">
            {isEn
              ? "KAIRON Pro does not give you isolated sessions. It gives you an execution system."
              : "KAIRON Pro no te da sesiones sueltas. Te da un sistema de ejecucion."}
          </h1>
          <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
            {isEn
              ? "The MVP is open now. On August 11, Pro opens with a seven-day trial and the entitlements below."
              : "El MVP esta abierto ahora. El 11 de agosto, Pro abre con prueba de siete dias y los beneficios de abajo."}
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            {groups.map((group) => (
              <article key={group.title} className="border border-border bg-[color:var(--color-surface)] p-5">
                <h2 className="font-display text-lg font-semibold">{group.title}</h2>
                <ul className="mt-4 space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-muted-foreground">
                      <Check size={16} className="mt-0.5 shrink-0 text-[color:var(--color-brand)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <aside className="border border-foreground bg-background p-6 md:p-8 shadow-elev-1">
            <p className="eyebrow">{isEn ? "Recommended" : "Recomendado"}</p>
            <h2 className="mt-3 font-display text-3xl font-semibold">KAIRON Pro</h2>
            <div className="mt-6 grid gap-4">
              <div>
                <p className="text-sm text-muted-foreground">{isEn ? "Latin America" : "America Latina"}</p>
                <p className="font-display text-4xl font-semibold">${KAIRON_PRICING.latamMonthlyUsd}<span className="text-base text-muted-foreground">/mo</span></p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{isEn ? "United States / global" : "Estados Unidos / global"}</p>
                <p className="font-display text-4xl font-semibold">${KAIRON_PRICING.usMonthlyUsd}<span className="text-base text-muted-foreground">/mo</span></p>
              </div>
            </div>
            <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
              {isEn
                ? `Seven-day trial beginning August 11. Card required when commercial checkout opens. Night Mode voice sessions count toward the ${KAIRON_VOICE_LIMITS.monthlyKaiVoiceMinutes}-minute monthly Kai voice allowance.`
                : `Prueba de siete dias desde el 11 de agosto. Se requiere tarjeta cuando abra el checkout comercial. Las sesiones de Nocturno por voz cuentan dentro de los ${KAIRON_VOICE_LIMITS.monthlyKaiVoiceMinutes} minutos mensuales de voz con Kai.`}
            </p>
            <a
              href={appUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackAcquisitionEvent("pricing_viewed", { language: locale, cta_location: "pricing_page" });
                trackOutboundAppOpened({ language: locale, cta_location: "pricing_page" });
              }}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 bg-foreground px-5 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
            >
              {copy.primaryCta}
              <ArrowRight size={16} />
            </a>
            <p className="mt-3 text-xs text-muted-foreground">{copy.helper}</p>
          </aside>
        </div>
      </div>
    </Section>
  );
}
