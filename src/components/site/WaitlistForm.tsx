import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Section } from "./Section";
import { trackConversion, trackCtaClick } from "@/lib/analytics";
import { useLocale } from "@/lib/i18n";

const COPY = {
  es: {
    eyebrow: "ACCESO ANTICIPADO",
    title: "Sé parte del primer grupo.",
    lead: "G-Frame está en prototipo activo con primeros testers en Ecuador. Los usuarios de la lista de espera tendrán acceso anticipado, precio de fundadores y la oportunidad de dar forma al producto.",
    micro: "Lanzamiento Q3 2026 · Solo Ecuador en primera fase.",
    successTitle: "Estás en la lista.",
    successBody: "Te escribimos cuando G-Frame esté listo para ti.",
    label: "Tu correo electrónico",
    placeholder: "tu@correo.com",
    submit: "Quiero acceso anticipado",
    sending: "Enviando…",
    noSpam: "Sin spam. Solo actualizaciones del producto cuando haya algo real que decir.",
    error: "Algo salió mal. Por favor intenta de nuevo o escríbenos:\nhola@g-structure.co",
    duplicate: "Ya estás en la lista. Te avisamos cuando G-Frame esté listo.",
  },
  en: {
    eyebrow: "EARLY ACCESS",
    title: "Be part of the first cohort.",
    lead: "G-Frame is in active prototype with first testers in Ecuador. Waitlist users get early access, founder pricing, and the chance to shape the product.",
    micro: "Launch Q3 2026 · Ecuador only in the first phase.",
    successTitle: "You’re on the list.",
    successBody: "We’ll write to you when G-Frame is ready for you.",
    label: "Your email address",
    placeholder: "you@email.com",
    submit: "I want early access",
    sending: "Sending…",
    noSpam: "No spam. Only product updates when there’s something real to say.",
    error: "Something went wrong. Please try again or write to us:\nhola@g-structure.co",
    duplicate: "You’re already on the list. We’ll let you know when G-Frame is ready.",
  },
} as const;

export function WaitlistForm({ source = "home" }: { source?: string } = {}) {
  const { locale } = useLocale();
  const t = COPY[locale];
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "duplicate" | "error">("idle");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    trackCtaClick("gstruct_waitlist_submit_attempt", { source });
    setStatus("loading");
    try {
      const res = await fetch("/api/public/gstruct-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website, source, locale }),
      });
      if (res.status === 409) {
        setStatus("duplicate");
        return;
      }
      if (!res.ok) {
        setStatus("error");
        return;
      }
      trackConversion("gstruct_waitlist_signup", { source });
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <Section id="waitlist" tone="white">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
        <div className="lg:col-span-6">
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.08]">
            {t.title}
          </h2>
          <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
            {t.lead}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">{t.micro}</p>
        </div>
        <div className="lg:col-span-6">
          {status === "success" ? (
            <div className="border border-foreground bg-[color:var(--color-brand-soft)]/40 p-7 md:p-8">
              <div className="inline-flex h-9 w-9 items-center justify-center bg-foreground text-background">
                <Check size={18} />
              </div>
              <p className="mt-5 font-display text-xl md:text-2xl text-foreground leading-snug">
                {t.successTitle}
              </p>
              <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                {t.successBody}
              </p>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="border border-border bg-[color:var(--color-surface)] p-7 md:p-8"
            >
              <label htmlFor="waitlist-email" className="eyebrow">
                {t.label}
              </label>
              <div className="mt-3 flex flex-col sm:flex-row gap-3">
                <input
                  id="waitlist-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.placeholder}
                  className="flex-1 border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
                />
                {/* Honeypot */}
                <input
                  type="text"
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center justify-center gap-2 bg-foreground px-5 py-3 text-[13px] font-semibold tracking-wide text-background transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {status === "loading" ? t.sending : t.submit}
                  <ArrowRight size={14} />
                </button>
              </div>
              <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
                {t.noSpam}
              </p>
              {status === "error" && (
                <p className="mt-3 text-xs text-destructive whitespace-pre-line">
                  {t.error}
                </p>
              )}
              {status === "duplicate" && (
                <p className="mt-3 text-xs text-muted-foreground">
                  {t.duplicate}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}
