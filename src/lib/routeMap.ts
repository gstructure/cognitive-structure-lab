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
  // Order: G-Struct · Enterprise · Método (home anchor) · Inversores · Nosotros · Contacto.
  // "Método" is rendered as a virtual nav item below since it's a hash on home.
  const mainKeys = [
    "/g-struct",
    "/enterprise",
    "/inversores",
    "/sobre-guillermo",
    "/contacto",
  ];
  const items = ROUTES.filter((r) => mainKeys.includes(r.es))
    // Preserve mainKeys order
    .sort((a, b) => mainKeys.indexOf(a.es) - mainKeys.indexOf(b.es))
    .map((r) => ({
      to: r[locale],
      label: r.label[locale],
      exact: false,
      highlight: r.es === "/g-struct",
    }));

  // Insert "Método" after Enterprise (index 2)
  const metodo = {
    to: locale === "en" ? "/en#metodo" : "/#metodo",
    label: locale === "en" ? "Method" : "Método",
    exact: false,
    highlight: false,
  };
  items.splice(2, 0, metodo);
  return items;
}

export function opportunitiesForLocale(locale: Locale) {
  const keys = ["/aliados-etw-2026", "/unete-al-equipo", "/g-struct"];
  return ROUTES.filter((r) => keys.includes(r.es)).map((r) => ({
    to: r[locale],
    label: r.label[locale],
  }));
}
