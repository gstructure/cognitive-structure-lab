import type { Locale } from "./i18n";

export type LaunchPhase = "EARLY_ACCESS" | "LAUNCH_WEEK" | "LIVE";

type PhaseCopy = {
  announcement: string;
  primaryCta: string;
  secondaryCta: string;
  helper: string;
};

const LAUNCH_DATE = new Date("2026-08-11T00:00:00-05:00");
const LAUNCH_WEEK_DATE = new Date("2026-08-04T00:00:00-05:00");

const manualPhaseOverride = (import.meta.env.VITE_KAIRON_LAUNCH_PHASE_OVERRIDE || "").trim() as LaunchPhase | "";

export const KAIRON_PRICING = {
  latamMonthlyUsd: 9.99,
  usMonthlyUsd: 18.99,
  trialDays: 7,
  trialStarts: "2026-08-11",
  cardRequiredWhenLive: true,
};

export const KAIRON_VOICE_LIMITS = {
  monthlyKaiVoiceMinutes: 60,
  nocturnoVoiceSessionsPerWeek: 3,
  nocturnoVoiceCountsTowardMonthlyMinutes: true,
};

export function getLaunchPhase(now = new Date()): LaunchPhase {
  if (manualPhaseOverride === "EARLY_ACCESS" || manualPhaseOverride === "LAUNCH_WEEK" || manualPhaseOverride === "LIVE") {
    return manualPhaseOverride;
  }
  if (now >= LAUNCH_DATE) return "LIVE";
  if (now >= LAUNCH_WEEK_DATE) return "LAUNCH_WEEK";
  return "EARLY_ACCESS";
}

export function daysUntilLaunch(now = new Date()) {
  const diff = LAUNCH_DATE.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / 86_400_000));
}

const copy: Record<Locale, Record<LaunchPhase, PhaseCopy>> = {
  es: {
    EARLY_ACCESS: {
      announcement: "Acceso anticipado abierto · Lanzamiento de KAIRON Pro: 11 de agosto · 52 usuarios ya lo probaron",
      primaryCta: "Probar KAIRON gratis ahora",
      secondaryCta: "Ver cómo funciona",
      helper: "Acceso anticipado al MVP. No necesitas tarjeta hoy. KAIRON Pro abre el 11 de agosto.",
    },
    LAUNCH_WEEK: {
      announcement: "Semana de lanzamiento · KAIRON Pro abre el 11 de agosto · Asegura acceso fundador",
      primaryCta: "Entrar ahora y asegurar acceso fundador",
      secondaryCta: "Ver cómo funciona",
      helper: "Acceso fundador antes del lanzamiento comercial. La prueba Pro se abre el 11 de agosto.",
    },
    LIVE: {
      announcement: "KAIRON Pro ya está disponible · Prueba de 7 días · Coaching cognitivo con Kai",
      primaryCta: "Empezar mi prueba Pro de 7 días",
      secondaryCta: "Ver cómo funciona",
      helper: "Prueba Pro de 7 días. Se requiere tarjeta cuando inicia el checkout comercial.",
    },
  },
  en: {
    EARLY_ACCESS: {
      announcement: "Early access is open · KAIRON Pro launches August 11 · Already tested by 52 users",
      primaryCta: "Try KAIRON free now",
      secondaryCta: "See how it works",
      helper: "Early access to the MVP. No card required today. KAIRON Pro launches August 11.",
    },
    LAUNCH_WEEK: {
      announcement: "Launch week · KAIRON Pro opens August 11 · Secure founder access",
      primaryCta: "Join now and secure founder access",
      secondaryCta: "See how it works",
      helper: "Founder access before commercial launch. The Pro trial opens August 11.",
    },
    LIVE: {
      announcement: "KAIRON Pro is live · 7-day trial · Cognitive coaching with Kai",
      primaryCta: "Start my 7-day Pro trial",
      secondaryCta: "See how it works",
      helper: "Seven-day Pro trial. Card required when commercial checkout opens.",
    },
  },
};

export function launchCopy(locale: Locale, phase = getLaunchPhase()) {
  return copy[locale][phase];
}

export function kaironAppUrl(locale: Locale, content: string, phase = getLaunchPhase()) {
  const params = new URLSearchParams({
    source: "gstructure",
    campaign: "aug11_launch",
    cohort: "aug11_early_access",
    language: locale,
    utm_source: "gstructure",
    utm_medium: "website",
    utm_campaign: "aug11_launch",
    utm_content: content,
    phase: phase.toLowerCase(),
  });
  return `https://getkairon.app/start?${params.toString()}`;
}

