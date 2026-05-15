// Catalog of bookable packages — used by both UI and server validation.
export type PackageKind = "1on1" | "enterprise";

export interface BookablePackage {
  slug: string;
  name: string;
  kind: PackageKind;
  sessions: string;
  duration: string;
  priceUsd: number | null;
  priceLabel: string;
  description: string;
}

export const PACKAGES: BookablePackage[] = [
  {
    slug: "foco-4",
    name: "REESTRUCTURA 1:1 — Foco",
    kind: "1on1",
    sessions: "4 sesiones",
    duration: "4 semanas",
    priceUsd: 320,
    priceLabel: "USD 320",
    description: "Intervención breve. 4 videollamadas individuales de 60 min, una por semana.",
  },
  {
    slug: "reencuadre-6",
    name: "REESTRUCTURA 1:1 — Reencuadre",
    kind: "1on1",
    sessions: "6 sesiones",
    duration: "6 semanas",
    priceUsd: 480,
    priceLabel: "USD 480",
    description: "El más recomendado. 6 videollamadas individuales de 60 min, una por semana.",
  },
  {
    slug: "estructura-8",
    name: "REESTRUCTURA 1:1 — Estructura",
    kind: "1on1",
    sessions: "8 sesiones",
    duration: "8 semanas",
    priceUsd: 360,
    priceLabel: "USD 360",
    description: "Cambio profundo. 8 videollamadas + sesión de revisión a los 30 días.",
  },
  {
    slug: "enterprise-workshop",
    name: "REESTRUCTURA Enterprise — Workshop de Diagnóstico",
    kind: "enterprise",
    sessions: "1 sesión",
    duration: "90 min",
    priceUsd: null,
    priceLabel: "A coordinar",
    description: "Sesión de diagnóstico inicial para equipos. Definición de patrones y propuesta.",
  },
];

export function findPackage(slug: string): BookablePackage | undefined {
  return PACKAGES.find((p) => p.slug === slug);
}

// Time zone for slot generation
export const BOOKING_TZ = "America/Guayaquil"; // UTC-5

// Available hours (local time, 24h). Mon-Fri.
export const SLOT_HOURS = [9, 10, 11, 15, 16, 17];

// How many days in advance a user can book
export const BOOKING_WINDOW_DAYS = 60;
// Minimum notice in hours
export const MIN_NOTICE_HOURS = 24;
