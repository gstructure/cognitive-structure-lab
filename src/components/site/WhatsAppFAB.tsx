import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, ArrowRight, Sparkles } from "lucide-react";
import { useLocation } from "@tanstack/react-router";
import { useT, useLocale } from "@/lib/i18n";
import { Assistant } from "./Assistant";

const WA_NUMBER = "593986875121";

const messagesES: Record<string, string> = {
  enterprise:
    "Hola Guillermo, vi G-Structure y quiero información sobre Enterprise / Workshop de Diagnóstico.",
  reestructura: "Hola Guillermo, quiero información sobre REESTRUCTURA 1:1.",
  gstruct: "Hola Guillermo, quiero información sobre G-Struct.",
  allies: "Hola Guillermo, quiero conversar sobre una posible alianza para ETW 2026.",
  team: "Hola Guillermo, quiero información sobre cómo unirme al equipo inicial de G-Structure.",
};
const messagesEN: Record<string, string> = {
  enterprise:
    "Hi Guillermo, I saw G-Structure and would like info about Enterprise / Diagnostic Workshop.",
  reestructura: "Hi Guillermo, I'd like info about RESTRUCTURE 1:1.",
  gstruct: "Hi Guillermo, I'd like info about G-Struct.",
  allies: "Hi Guillermo, I'd like to discuss a possible partnership for ETW 2026.",
  team: "Hi Guillermo, I'd like info about joining the initial G-Structure team.",
};

export function buildWaUrl(intent: string, locale: "es" | "en") {
  const map = locale === "en" ? messagesEN : messagesES;
  const text = map[intent] ?? map.enterprise;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function WhatsAppFAB() {
  const t = useT();
  const { locale } = useLocale();
  const [open, setOpen] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const hidden = location.pathname.startsWith("/inversores");

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!panelRef.current) return;
      if (!panelRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const intents = [
    { key: "enterprise", label: t("fab.options.enterprise") },
    { key: "reestructura", label: t("fab.options.reestructura") },
    { key: "gstruct", label: t("fab.options.gstruct") },
    { key: "allies", label: t("fab.options.allies") },
    { key: "team", label: t("fab.options.team") },
  ];

  return (
    <>
      <div className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-[60] flex flex-col items-end gap-3">
        {open && (
          <div
            ref={panelRef}
            role="dialog"
            aria-label={t("fab.title")}
            className="w-[min(92vw,360px)] origin-bottom-right border border-border bg-[color:var(--color-surface)] shadow-[0_24px_60px_-18px_rgba(5,50,90,0.45)]"
          >
            <div className="relative flex items-start justify-between gap-3 border-b border-border bg-[color:var(--color-brand-deep)] px-5 py-4 text-[color:var(--color-background)]">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.22em] opacity-80">
                  G-STRUCTURE · WHATSAPP
                </p>
                <p className="mt-1 font-display text-base font-semibold">{t("fab.title")}</p>
                <p className="mt-1 text-[12px] opacity-80">{t("fab.subtitle")}</p>
              </div>
              <button
                type="button"
                aria-label={t("assistant.close")}
                onClick={() => setOpen(false)}
                className="text-[color:var(--color-background)]/80 hover:text-[color:var(--color-background)]"
              >
                <X size={16} />
              </button>
            </div>
            <ul className="divide-y divide-border">
              {intents.map((it) => (
                <li key={it.key}>
                  <a
                    href={buildWaUrl(it.key, locale)}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-between gap-3 px-5 py-3 text-[13px] text-foreground/90 hover:bg-[color:var(--color-brand-soft)]/40"
                  >
                    <span>{it.label}</span>
                    <ArrowRight
                      size={14}
                      className="text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground"
                    />
                  </a>
                </li>
              ))}
            </ul>
            <div className="border-t border-border bg-[color:var(--color-brand-soft)]/30 px-5 py-3">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setShowAssistant(true);
                }}
                className="group inline-flex items-center gap-2 text-[12px] font-medium text-foreground"
              >
                <Sparkles size={14} /> {t("fab.openAssistant")}
                <ArrowRight
                  size={13}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </button>
              <p className="mt-2 text-[11px] tracking-wide text-muted-foreground">
                {t("fab.note")}
              </p>
            </div>
          </div>
        )}

        <button
          type="button"
          aria-label={t("fab.open")}
          onClick={() => setOpen((v) => !v)}
          className={`relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--color-brand-deep)] bg-[color:var(--color-brand-deep)] text-[color:var(--color-background)] shadow-[0_18px_36px_-12px_rgba(5,50,90,0.55)] transition-transform hover:-translate-y-0.5 ${
            open ? "rotate-90" : ""
          }`}
        >
          {open ? <X size={18} /> : <MessageCircle size={18} strokeWidth={1.75} />}
          {!open && (
            <span
              className="pointer-events-none absolute -inset-1 rounded-full opacity-50"
              aria-hidden
              style={{
                boxShadow: "0 0 0 4px color-mix(in oklch, var(--color-brand) 18%, transparent)",
              }}
            />
          )}
        </button>
      </div>

      <Assistant open={showAssistant} onOpenChange={setShowAssistant} />
    </>
  );
}
