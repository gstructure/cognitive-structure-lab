import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, ArrowRight, Sparkles } from "lucide-react";
import { useLocation } from "@tanstack/react-router";
import { useT, useLocale } from "@/lib/i18n";
import { Assistant } from "./Assistant";
import { trackContactClick, trackCtaClick } from "@/lib/analytics";
import { hasIntercomAppId, showIntercomMessenger } from "@/lib/intercom";
import kaiFab from "@/assets/kai-fab.png";

const WA_NUMBER = "593986875121";

const messagesES: Record<string, string> = {
  enterprise:
    "Hola Guillermo, vi G-Structure y quiero información sobre Enterprise / Workshop de Diagnóstico.",
  gstruct: "Hola Guillermo, quiero información sobre KAIRON.",
  team: "Hola Guillermo, quiero información sobre cómo unirme al equipo inicial de G-Structure.",
};
const messagesEN: Record<string, string> = {
  enterprise:
    "Hi Guillermo, I saw G-Structure and would like info about Enterprise / Diagnostic Workshop.",
  gstruct: "Hi Guillermo, I'd like info about KAIRON.",
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
  const [intercomError, setIntercomError] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const hidden = location.pathname.startsWith("/inversores");
  const intercomEnabled = hasIntercomAppId() && !intercomError;

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
    { key: "gstruct", label: t("fab.options.gstruct") },
    { key: "team", label: t("fab.options.team") },
  ];

  if (hidden) return null;
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
                  KAI · CONTACT FALLBACK
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
                    onClick={() => {
                      trackContactClick("whatsapp", { source: "fab", intent: it.key });
                      trackCtaClick("whatsapp_fab_intent", { intent: it.key });
                      setOpen(false);
                    }}
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
          id="kai-intercom-fab"
          aria-label={intercomEnabled ? t("fab.openIntercom") : t("fab.open")}
          onClick={async () => {
            if (intercomEnabled) {
              trackCtaClick("kai_intercom_fab_open", { source: "fab" });
              try {
                await showIntercomMessenger(locale);
              } catch {
                setIntercomError(true);
                setOpen(true);
              }
              return;
            }
            trackCtaClick("whatsapp_fab_toggle", { state: open ? "close" : "open" });
            setOpen((v) => !v);
          }}
          className={`group relative inline-flex h-[68px] w-[68px] items-center justify-center rounded-full border border-cyan-200/70 bg-[radial-gradient(circle_at_50%_28%,#ffffff_0%,#dffbff_34%,#11bdd4_65%,#05325a_100%)] text-[color:var(--color-background)] shadow-[0_22px_46px_-16px_rgba(5,50,90,0.68)] transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-cyan-300 ${
            open && !intercomEnabled ? "rotate-90" : "motion-safe:animate-[kaiFabFloat_4.8s_ease-in-out_infinite]"
          }`}
        >
          <style>
            {`
              @keyframes kaiFabFloat {
                0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
                50% { transform: translate3d(0, -5px, 0) scale(1.015); }
              }
              @keyframes kaiFabGlow {
                0%, 100% { opacity: 0.34; transform: scale(0.94); }
                50% { opacity: 0.74; transform: scale(1.1); }
              }
              @keyframes kaiFabPing {
                0%, 100% { opacity: 0.65; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.16); }
              }
            `}
          </style>
          <span
            className="pointer-events-none absolute -inset-3 rounded-full bg-cyan-300/35 blur-xl motion-safe:animate-[kaiFabGlow_3.6s_ease-in-out_infinite]"
            aria-hidden
          />
          <span
            className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/70"
            aria-hidden
          />
          {open && !intercomEnabled ? (
            <X size={20} className="relative z-10" />
          ) : (
            <img
              src={kaiFab}
              alt=""
              aria-hidden
              width={1280}
              height={1280}
              className="relative z-10 h-[78px] w-[78px] max-w-none translate-y-1 scale-[1.18] object-contain object-center drop-shadow-[0_0_16px_rgba(34,211,238,0.55)] transition-transform duration-300 group-hover:scale-[1.24]"
            />
          )}
          {!open && (
            <>
              <span
                className="pointer-events-none absolute -inset-1 rounded-full border border-cyan-300/45"
                aria-hidden
              />
              <span
                className="pointer-events-none absolute right-1 top-1 z-20 h-3 w-3 rounded-full border-2 border-white bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.95)] motion-safe:animate-[kaiFabPing_2.4s_ease-in-out_infinite]"
                aria-hidden
              />
            </>
          )}
        </button>
      </div>

      <Assistant open={showAssistant} onOpenChange={setShowAssistant} />
    </>
  );
}
