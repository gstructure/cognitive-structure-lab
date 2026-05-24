// Bidirectional ES<->EN route map for G-Structure.

import type { Locale } from "./i18n";

export type RouteEntry = {
  es: string;
  en: string;
  label: { es: string; en: string };
};

export const ROUTES: RouteEntry[] = [
  { es: "/", en: "/en", label: { es: "Inicio", en: "Home" } },
  { es: "/g-struct", en: "/en/g-struct", label: { es: "G-Struct", en: "G-Struct" } },
  { es: "/articulos", en: "/en/articles", label: { es: "Artículos", en: "Articles" } },
  { es: "/newsletter", en: "/en/newsletter", label: { es: "Newsletter", en: "Newsletter" } },
  { es: "/apoya-el-lanzamiento", en: "/en/support-the-launch", label: { es: "Apoya el lanzamiento", en: "Support the Launch" } },
  { es: "/enterprise", en: "/en/enterprise", label: { es: "Enterprise", en: "Enterprise" } },
  { es: "/reestructura-1-1", en: "/en/restructure-1-1", label: { es: "REESTRUCTURA 1:1", en: "RESTRUCTURE 1:1" } },
  { es: "/inversores", en: "/en/investors", label: { es: "Inversores", en: "Investors" } },
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

  const articleSlugPairs = [
    { es: "g-structure-constituida-ecuador-sucostruct", en: "g-structure-legally-incorporated-ecuador-sucostruct" },
    { es: "g-struct-product-update-q3", en: "g-struct-product-update-q3" },
    { es: "la-crisis-de-la-ejecucion", en: "the-execution-crisis" },
    { es: "de-la-mediacion-cognitiva", en: "on-cognitive-mediation" },
    { es: "la-infraestructura-invisible-del-habito", en: "the-invisible-infrastructure-of-habit" },
  ];
  if (cleanPath.startsWith("/articulos/") && target === "en") {
    const slug = cleanPath.replace("/articulos/", "");
    const pair = articleSlugPairs.find((item) => item.es === slug);
    if (pair) return `/en/articles/${pair.en}`;
  }
  if (cleanPath.startsWith("/en/articles/") && target === "es") {
    const slug = cleanPath.replace("/en/articles/", "");
    const pair = articleSlugPairs.find((item) => item.en === slug);
    if (pair) return `/articulos/${pair.es}`;
  }

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
  const home = locale === "en" ? "/en" : "/";
  const items = [
    {
      to: locale === "en" ? "/en/g-struct" : "/g-struct",
      label: "G-Struct",
      exact: false,
      highlight: true,
    },
    {
      to: home,
      hash: "metodo",
      label: locale === "en" ? "I-R-O™ Method" : "Método I-R-O™",
      exact: false,
      highlight: false,
    },
    {
      to: locale === "en" ? "/en/articles" : "/articulos",
      label: locale === "en" ? "Articles" : "Artículos",
      exact: false,
      highlight: false,
    },
    {
      to: locale === "en" ? "/en/investors" : "/inversores",
      label: locale === "en" ? "Investors" : "Inversores",
      exact: false,
      highlight: false,
    },
    {
      to: locale === "en" ? "/en/about-guillermo" : "/sobre-guillermo",
      label: locale === "en" ? "About" : "Nosotros",
      exact: false,
      highlight: false,
    },
    {
      to: locale === "en" ? "/en/contact" : "/contacto",
      label: locale === "en" ? "Contact" : "Contacto",
      exact: false,
      highlight: false,
    },
  ];
  return items as Array<{ to: string; label: string; exact: boolean; highlight: boolean; hash?: string }>;
}

export function opportunitiesForLocale(locale: Locale) {
  const keys = ["/aliados-etw-2026", "/unete-al-equipo", "/g-struct"];
  return ROUTES.filter((r) => keys.includes(r.es)).map((r) => ({
    to: r[locale],
    label: r.label[locale],
  }));
}
