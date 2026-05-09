// Bidirectional ES↔EN route map for G-Structure.
// Used by LangSwitcher to swap to the equivalent page in the other locale,
// and by Header/Footer to render locale-aware navigation.

import type { Locale } from "./i18n";

export type RouteEntry = {
  es: string;
  en: string;
  // Localized labels for nav rendering
  label: { es: string; en: string };
};

export const ROUTES: RouteEntry[] = [
  { es: "/", en: "/en", label: { es: "Inicio", en: "Home" } },
  { es: "/enterprise", en: "/en/enterprise", label: { es: "Enterprise", en: "Enterprise" } },
  { es: "/reestructura-1-1", en: "/en/restructure-1-1", label: { es: "REESTRUCTURA 1:1", en: "RESTRUCTURE 1:1" } },
  { es: "/g-struct", en: "/en/g-struct", label: { es: "G-Struct", en: "G-Struct" } },
  { es: "/sobre-guillermo", en: "/en/about-guillermo", label: { es: "Sobre Guillermo", en: "About Guillermo" } },
  { es: "/contacto", en: "/en/contact", label: { es: "Contacto", en: "Contact" } },
  { es: "/aliados-etw-2026", en: "/en/etw-2026-partners", label: { es: "Aliados ETW 2026", en: "ETW 2026 Partners" } },
  { es: "/unete-al-equipo", en: "/en/join-the-team", label: { es: "Únete al equipo", en: "Join the team" } },
];

// Locale derived from the current URL pathname.
// Anything starting with /en (and /en exact) is English; everything else is Spanish.
export function localeFromPath(pathname: string): Locale {
  if (!pathname) return "es";
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  return "es";
}

// Equivalent path in the other locale. Falls back to home.
export function swapLocalePath(pathname: string, target: Locale): string {
  const current: Locale = localeFromPath(pathname);
  if (current === target) return pathname;
  // Strip query/hash for matching
  const cleanPath = pathname.split(/[?#]/)[0];
  for (const r of ROUTES) {
    if (r[current] === cleanPath) return r[target];
  }
  // Fallback: try to map /en/foo ↔ /foo* via prefix removal
  if (target === "es" && cleanPath.startsWith("/en/")) {
    const tail = cleanPath.slice(3); // keep leading slash
    return tail || "/";
  }
  if (target === "en" && cleanPath !== "/") {
    return `/en${cleanPath}`;
  }
  return target === "en" ? "/en" : "/";
}

export function navForLocale(locale: Locale) {
  // Main header nav (excludes ETW Allies and Join Team — those live elsewhere)
  const mainKeys = ["/", "/enterprise", "/reestructura-1-1", "/g-struct", "/sobre-guillermo", "/contacto"];
  return ROUTES.filter((r) => mainKeys.includes(r.es)).map((r) => ({
    to: r[locale],
    label: r.label[locale],
    exact: r.es === "/",
  }));
}

export function opportunitiesForLocale(locale: Locale) {
  const keys = ["/aliados-etw-2026", "/unete-al-equipo", "/g-struct"];
  return ROUTES.filter((r) => keys.includes(r.es)).map((r) => ({
    to: r[locale],
    label: r.label[locale],
  }));
}
