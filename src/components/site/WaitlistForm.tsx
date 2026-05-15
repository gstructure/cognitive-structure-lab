import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Section } from "./Section";
import { trackConversion } from "@/lib/analytics";

export function WaitlistForm({ source = "home" }: { source?: string } = {}) {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "duplicate" | "error">("idle");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/public/gstruct-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website, source, locale: "es" }),
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
    <Section id="lista-de-espera" tone="white">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
        <div className="lg:col-span-6">
          <p className="eyebrow">ACCESO ANTICIPADO</p>
          <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.08]">
            Sé parte del primer grupo.
          </h2>
          <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
            G-Struct está en prototipo activo con primeros testers en Ecuador. Los usuarios de la
            lista de espera tendrán acceso anticipado, precio de fundadores y la oportunidad de dar
            forma al producto.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Lanzamiento Q3 2026 · Solo Ecuador en primera fase.
          </p>
        </div>
        <div className="lg:col-span-6">
          {status === "success" ? (
            <div className="border border-foreground bg-[color:var(--color-brand-soft)]/40 p-7 md:p-8">
              <div className="inline-flex h-9 w-9 items-center justify-center bg-foreground text-background">
                <Check size={18} />
              </div>
              <p className="mt-5 font-display text-xl md:text-2xl text-foreground leading-snug">
                Estás en la lista.
              </p>
              <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                Te escribimos cuando G-Struct esté listo para ti.
              </p>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="border border-border bg-[color:var(--color-surface)] p-7 md:p-8"
            >
              <label htmlFor="waitlist-email" className="eyebrow">
                Tu correo electrónico
              </label>
              <div className="mt-3 flex flex-col sm:flex-row gap-3">
                <input
                  id="waitlist-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
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
                  {status === "loading" ? "Enviando…" : "Quiero acceso anticipado"}
                  <ArrowRight size={14} />
                </button>
              </div>
              <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
                Sin spam. Solo actualizaciones del producto cuando haya algo real que decir.
              </p>
              {status === "error" && (
                <p className="mt-3 text-xs text-destructive">
                  No pudimos guardar tu correo ({errorMsg}). Intenta de nuevo.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}
