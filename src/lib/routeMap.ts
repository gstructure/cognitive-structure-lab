// Bidirectional ES↔EN route map for G-Structure.

import type { Locale } from "./i18n";

export type RouteEntry = {
  es: string;
  en: string;
  label: { es: string; en: string };
};

export const ROUTES: RouteEntry[] = [
  { es: "/", en: "/en", label: { es: "Inicio", en: "Home" } },
  { es: "/g-struct", en: "/en/g-struct", label: { es: "G-Struct", en: "G-Struct" } },
  { es: "/enterprise", en: "/en/enterprise", label: { es: "Enterprise", en: "Enterprise" } },
  { es: "/reestructura-1-1", en: "/en/restructure-1-1", label: { es: "REESTRUCTURA 1:1", en: "RESTRUCTURE 1:1" } },
  { es: "/inversores", en: "/inversores", label: { es: "Inversores", en: "Investors" } },
  { es: "/sobre-guillermo", en: "/en/about-guillermo", label: { es: "Nosotros", en: "About" } },
  { es: "/contacto", en: "/en/contact", label: { es: "Contacto", en: "Contact" } },
  { es: "/aliados-etw-2026", en: "/en/etw-2026-partners", label: { es: "Aliados ETW 2026", en: "ETW 2026 Partners" } },
  { es: "/unete-al-equipo", en: "/en/join-the-team", label: { es: "Únete al equipo", en: "Join the team" } },
];

export function localeFromPath(pathname: string): Locale {
  if (!pathname) return "es";
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  return "es";
}

export function swapLocalePath(pathname: string, target: Locale): string {
  const current: Locale = localeFromPath(pathname);
  if (current === target) return pathname;
  const cleanPath = pathname.split(/[?#]/)[0];
  for (const r of ROUTES) {
    if (r[current] === cleanPath) return r[target];
  }
  if (target === "es" && cleanPath.startsWith("/en/")) {
    const tail = cleanPath.slice(3);
    return tail || "/";
  }
  if (target === "en" && cleanPath !== "/") {
    return `/en${cleanPath}`;
  }
  return target === "en" ? "/en" : "/";
}

export function navForLocale(locale: Locale) {
  // New jerarquía: G-Struct (producto) primero, seguido por canales de validación,
  // inversión, aliados, nosotros y contacto. G-Struct se destaca como "producto".
  const mainKeys = [
    "/g-struct",
    "/enterprise",
    "/reestructura-1-1",
    "/inversores",
    "/aliados-etw-2026",
    "/sobre-guillermo",
    "/contacto",
  ];
  const items = ROUTES.filter((r) => mainKeys.includes(r.es))
    .sort((a, b) => mainKeys.indexOf(a.es) - mainKeys.indexOf(b.es))
    .map((r) => ({
      to: r[locale],
      label: r.label[locale],
      exact: false,
      highlight: r.es === "/g-struct",
    }));
  return items as Array<{ to: string; label: string; exact: boolean; highlight: boolean; hash?: string }>;
}

export function opportunitiesForLocale(locale: Locale) {
  const keys = ["/aliados-etw-2026", "/unete-al-equipo", "/g-struct"];
  return ROUTES.filter((r) => keys.includes(r.es)).map((r) => ({
    to: r[locale],
    label: r.label[locale],
  }));
}
