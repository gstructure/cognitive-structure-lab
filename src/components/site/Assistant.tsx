import { useEffect, useState } from "react";
import { X, Sparkles, ArrowRight, RotateCcw } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useT, useLocale } from "@/lib/i18n";
import { buildWaUrl } from "./WhatsAppFAB";

type IntentKey = "enterprise" | "individual" | "gstruct" | "allies" | "team" | "other";

// Map assistant intent -> WhatsApp intent key used by buildWaUrl
const waIntentMap: Record<IntentKey, string> = {
  enterprise: "enterprise",
  individual: "reestructura",
  gstruct: "gstruct",
  allies: "allies",
  team: "team",
  other: "enterprise",
};

export function Assistant({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const t = useT();
  const { locale } = useLocale();
  const [intent, setIntent] = useState<IntentKey | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onOpenChange]);

  useEffect(() => {
    if (!open) setIntent(null);
  }, [open]);

  if (!open) return null;

  const options: IntentKey[] = ["enterprise", "individual", "gstruct", "allies", "team", "other"];

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-end md:items-stretch">
      <button
        type="button"
        aria-label={t("assistant.close")}
        onClick={() => onOpenChange(false)}
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={t("assistant.title")}
        className="relative ml-auto flex h-[88vh] md:h-full w-full md:w-[460px] flex-col border-l border-border bg-[color:var(--color-surface)] shadow-[0_24px_60px_-18px_rgba(5,50,90,0.5)] animate-in slide-in-from-right"
      >
        <header className="border-b border-border bg-[color:var(--color-brand-deep)] px-6 py-5 text-[color:var(--color-background)]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.22em] opacity-80">
                <Sparkles size={12} /> G-STRUCTURE
              </p>
              <h2 className="mt-1.5 font-display text-lg font-semibold">{t("assistant.title")}</h2>
              <p className="mt-1 text-[12.5px] opacity-80 leading-relaxed">
                {t("assistant.subtitle")}
              </p>
            </div>
            <button
              type="button"
              aria-label={t("assistant.close")}
              onClick={() => onOpenChange(false)}
              className="text-[color:var(--color-background)]/80 hover:text-[color:var(--color-background)]"
            >
              <X size={18} />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {!intent ? (
            <>
              <p className="font-display text-[15px] font-semibold text-foreground">
                {t("assistant.q1")}
              </p>
              <ul className="mt-4 space-y-2">
                {options.map((k) => (
                  <li key={k}>
                    <button
                      type="button"
                      onClick={() => setIntent(k)}
                      className="group flex w-full items-center justify-between gap-3 border border-border bg-background px-4 py-3 text-left text-[13.5px] text-foreground hover:border-foreground/60"
                    >
                      <span>{t(`assistant.options.${k}`)}</span>
                      <ArrowRight
                        size={14}
                        className="text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div>
              <p className="text-[10px] font-semibold tracking-[0.22em] text-muted-foreground">
                {t(`assistant.options.${intent}`)}
              </p>
              <p className="mt-3 text-[14px] text-foreground leading-relaxed">
                {t(`assistant.rec.${intent}`)}
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={buildWaUrl(waIntentMap[intent], locale)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-foreground px-4 py-3 text-[13px] font-medium text-background hover:opacity-90"
                >
                  {t("assistant.cta")} <ArrowRight size={14} />
                </a>
                <Link
                  to={(locale === "en" ? "/en/contact" : "/contacto") as string}
                  onClick={() => onOpenChange(false)}
                  className="inline-flex items-center justify-center gap-2 border border-foreground/30 px-4 py-3 text-[13px] font-medium text-foreground hover:border-foreground"
                >
                  {t("assistant.secondary")}
                </Link>
                <button
                  type="button"
                  onClick={() => setIntent(null)}
                  className="mt-1 inline-flex items-center justify-center gap-2 text-[12px] text-muted-foreground hover:text-foreground"
                >
                  <RotateCcw size={12} /> {t("assistant.restart")}
                </button>
              </div>
            </div>
          )}
        </div>

        <footer className="border-t border-border bg-[color:var(--color-brand-soft)]/30 px-6 py-4">
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            {t("assistant.disclaimer")}
          </p>
        </footer>
      </aside>
    </div>
  );
}
