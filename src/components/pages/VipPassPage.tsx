import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";
import kaiImg from "@/assets/kai-hero-transparent.png";

type Locale = "es" | "en";

const content = {
  es: {
    toggleTo: "EN",
    toggleHref: "/en/vip-pass",
    eyebrow: "ACCESO RESTRINGIDO",
    title: "COHORTE FUNDADORA KAIRON",
    subtitle: "Pase de Arquitectura VIP",
    intro:
      "Tu línea base de ejecución ha sido calibrada con éxito. Como participante pionero en el diagnóstico del prototipo Kairon, tu correo electrónico ha sido incluido en la lista blanca de nuestra Cohorte Fundadora. Cuando la beta de Kairon se despliegue oficialmente, este pase garantiza tu primer mes actualizado al Nivel VIP (Valor de $150) a costo cero.",
    sectionHeader: "Tu Desbloqueo VIP Incluye:",
    benefits: [
      {
        t: "Dosieres de Casos Automatizados",
        d: "El sistema de Kairon rastreará tus puntos de fricción a lo largo del tiempo, construyendo un perfil conductual que predice tus bloqueos antes de que los enfrentes.",
      },
      {
        t: "Bóvedas de Puntos Ciegos",
        d: "Herramientas avanzadas de reestructuración cognitiva reservadas para cuellos de botella complejos y de múltiples variables.",
      },
      {
        t: "Asesoría de Ejecución 1-a-1",
        d: "Una sincronización táctica mensual de 45 minutos con un coach conductual humano para auditar tus sistemas, reescribir tus protocolos y forzar la responsabilidad.",
      },
    ],
    claimHeader: "Cómo Reclamarlo:",
    claimText:
      "Tu acceso está vinculado al correo electrónico que proporcionaste en la auditoría. Guarda este código de despliegue seguro. En el lanzamiento oficial, ingresa este código en el portal de Kairon para eludir el muro de pago e inicializar tu arquitectura VIP al instante.",
    ticketLabel: "Código de despliegue seguro",
    status: "Estado: Lista Blanca. Listo para despliegue.",
    copy: "Copiar",
    copied: "¡Copiado!",
    kaiAlt: "Kai, la mascota de Kairon",
  },
  en: {
    toggleTo: "ES",
    toggleHref: "/vip-pass",
    eyebrow: "RESTRICTED ACCESS",
    title: "KAIRON FOUNDING COHORT",
    subtitle: "VIP Architecture Pass",
    intro:
      "Your execution baseline has been successfully calibrated. As an early participant in the Kairon prototype testing, your email has been whitelisted for our Founding Cohort. When the Kairon beta officially deploys, this pass guarantees your first month fully upgraded to the VIP Tier ($150 Value) at zero cost.",
    sectionHeader: "Your VIP Unlock Includes:",
    benefits: [
      {
        t: "Automated Case Dossiers",
        d: "Kairon's system will track your friction points over time, building a personalized behavioral profile that predicts your roadblocks before you hit them.",
      },
      {
        t: "The Blindspot Vaults",
        d: "Advanced cognitive reframing tools reserved for complex, multi-variable startup bottlenecks.",
      },
      {
        t: "1-on-1 Execution Advisory",
        d: "A monthly, 45-minute tactical sync with a human behavioral coach to audit your systems, rewrite your protocols, and force accountability.",
      },
    ],
    claimHeader: "How to Claim:",
    claimText:
      "Your access is tethered to the email address you provided in the diagnostic audit. Save this secure deployment code. Upon official launch, enter this code at Kairon's checkout portal to bypass the paywall and instantly initialize your VIP architecture.",
    ticketLabel: "Secure deployment code",
    status: "Status: Whitelisted. Ready for deployment.",
    copy: "Copy",
    copied: "Copied!",
    kaiAlt: "Kai, the Kairon mascot",
  },
} satisfies Record<Locale, unknown>;

const PROMO_CODE = "KAIRON-ETW26";

export function VipPassPage({ locale }: { locale: Locale }) {
  const c = content[locale];
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PROMO_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[color:var(--color-brand-deep,#05325a)] text-[color:var(--color-background,#f8f8f4)]">
      {/* Technical grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #f8f8f4 1px, transparent 1px), linear-gradient(to bottom, #f8f8f4 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(248,248,244,0.16), transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-3xl flex-col px-5 py-6 sm:px-8">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <div className="invert brightness-200">
            <Logo lockup="compact" />
          </div>
          <Link
            to={c.toggleHref}
            className="inline-flex items-center gap-1 border border-[color:rgba(248,248,244,0.35)] px-3 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-[color:var(--color-background,#f8f8f4)] transition-colors hover:bg-[color:rgba(248,248,244,0.1)]"
            aria-label={locale === "es" ? "Switch to English" : "Cambiar a español"}
          >
            {c.toggleTo}
          </Link>
        </div>

        {/* Header */}
        <header className="mt-12 text-center sm:mt-16">
          <p className="text-[11px] font-semibold tracking-[0.32em] text-[color:rgba(248,248,244,0.6)]">
            {c.eyebrow}
          </p>
          <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {c.title}
          </h1>
          <p className="mt-2 text-lg font-medium tracking-wide text-[color:rgba(248,248,244,0.85)]">
            {c.subtitle}
          </p>
        </header>

        {/* Ticket */}
        <div className="relative mt-10">
          <img
            src={kaiImg}
            alt={c.kaiAlt}
            className="pointer-events-none absolute -top-16 -right-2 z-20 h-28 w-auto select-none drop-shadow-2xl sm:-right-6 sm:h-36"
          />
          <div className="relative overflow-hidden rounded-xl border border-[color:rgba(248,248,244,0.25)] bg-[color:rgba(248,248,244,0.06)] p-6 backdrop-blur-sm sm:p-8">
            {/* perforation accents */}
            <span className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-[color:var(--color-brand-deep,#05325a)]" />
            <span className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-[color:var(--color-brand-deep,#05325a)]" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[color:rgba(248,248,244,0.55)]">
              {c.ticketLabel}
            </p>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <code className="font-mono text-2xl font-bold tracking-[0.12em] text-[#f8f8f4] sm:text-3xl">
                {PROMO_CODE}
              </code>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex shrink-0 items-center justify-center bg-[#f8f8f4] px-5 py-2.5 text-sm font-semibold tracking-wide text-[#05325a] transition-opacity hover:opacity-90"
              >
                {copied ? c.copied : c.copy}
              </button>
            </div>
            <div className="mt-5 flex items-center gap-2 border-t border-dashed border-[color:rgba(248,248,244,0.25)] pt-4">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              <p className="font-mono text-xs tracking-wide text-[color:rgba(248,248,244,0.8)]">
                {c.status}
              </p>
            </div>
          </div>
        </div>

        {/* Intro */}
        <p className="mt-12 text-[15px] leading-relaxed text-[color:rgba(248,248,244,0.82)]">
          {c.intro}
        </p>

        {/* Benefits */}
        <section className="mt-10">
          <h2 className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:rgba(248,248,244,0.6)]">
            {c.sectionHeader}
          </h2>
          <ul className="mt-5 space-y-4">
            {c.benefits.map((b, i) => (
              <li
                key={b.t}
                className="border-l-2 border-[color:rgba(248,248,244,0.4)] pl-4"
              >
                <p className="flex items-baseline gap-2 font-display text-base font-semibold">
                  <span className="font-mono text-xs text-[color:rgba(248,248,244,0.5)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {b.t}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[color:rgba(248,248,244,0.75)]">
                  {b.d}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Claim */}
        <section className="mt-10 rounded-xl border border-[color:rgba(248,248,244,0.18)] bg-[color:rgba(248,248,244,0.04)] p-6">
          <h2 className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:rgba(248,248,244,0.6)]">
            {c.claimHeader}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[color:rgba(248,248,244,0.8)]">
            {c.claimText}
          </p>
        </section>

        <div className="flex-1" />
        <footer className="mt-12 flex items-center justify-center gap-2 py-6 text-[11px] tracking-[0.2em] text-[color:rgba(248,248,244,0.4)]">
          <span>G-STRUCTURE</span>
          <span>·</span>
          <span>KAIRON</span>
        </footer>
      </div>
    </main>
  );
}
