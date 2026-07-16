// Bidirectional ES<->EN route map for G-Structure.

import type { Locale } from "./i18n";

export type RouteEntry = {
  es: string;
  en: string;
  label: { es: string; en: string };
};

export const ROUTES: RouteEntry[] = [
  { es: "/", en: "/en", label: { es: "Inicio", en: "Home" } },
  { es: "/kairon", en: "/en/kairon", label: { es: "KAIRON", en: "KAIRON" } },
  { es: "/precios", en: "/en/pricing", label: { es: "Precio", en: "Pricing" } },
  { es: "/metodo-iro", en: "/en/iro-method", label: { es: "M\u00e9todo I-R-O\u2122", en: "I-R-O\u2122 Method" } },
  { es: "/articulos", en: "/en/articles", label: { es: "Art\u00edculos", en: "Articles" } },
  { es: "/newsletter", en: "/en/newsletter", label: { es: "Newsletter", en: "Newsletter" } },
  { es: "/apoya-el-lanzamiento", en: "/en/support-the-launch", label: { es: "Apoya el lanzamiento", en: "Support the Launch" } },
  { es: "/enterprise", en: "/en/enterprise", label: { es: "Enterprise", en: "Enterprise" } },
  { es: "/inversores", en: "/en/investors", label: { es: "Inversores", en: "Investors" } },
  { es: "/sobre-guillermo", en: "/en/about-guillermo", label: { es: "Nosotros", en: "About" } },
  { es: "/contacto", en: "/en/contact", label: { es: "Contacto", en: "Contact" } },
  { es: "/unete-al-equipo", en: "/en/join-the-team", label: { es: "\u00danete al equipo", en: "Join the team" } },
];

const LEGACY_ROUTE_PAIRS: Record<string, string> = {
  "/g-frame": "/kairon",
  "/g-struct": "/kairon",
  "/en/g-frame": "/en/kairon",
  "/en/g-struct": "/en/kairon",
};

export function localeFromPath(pathname: string): Locale {
  if (!pathname) return "es";
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  return "es";
}

export function swapLocalePath(pathname: string, target: Locale): string {
  const current: Locale = localeFromPath(pathname);
  const cleanPath = pathname.split(/[?#]/)[0];
  const normalizedPath = LEGACY_ROUTE_PAIRS[cleanPath] ?? cleanPath;
  if (current === target && normalizedPath === cleanPath) return pathname;

  const articleSlugPairs = [
    { es: "g-structure-constituida-ecuador-sucostruct", en: "g-structure-legally-incorporated-ecuador-sucostruct" },
    { es: "g-structure-seleccionada-codelaunch-latam-2026", en: "g-structure-selected-codelaunch-latam-2026" },
    { es: "g-frame-product-update-q3", en: "g-frame-product-update-q3" },
    { es: "la-crisis-de-la-ejecucion", en: "the-execution-crisis" },
    { es: "de-la-mediacion-cognitiva", en: "on-cognitive-mediation" },
    { es: "la-infraestructura-invisible-del-habito", en: "the-invisible-infrastructure-of-habit" },
  ];
  if (normalizedPath.startsWith("/articulos/") && target === "en") {
    const slug = normalizedPath.replace("/articulos/", "");
    const pair = articleSlugPairs.find((item) => item.es === slug);
    if (pair) return `/en/articles/${pair.en}`;
  }
  if (normalizedPath.startsWith("/en/articles/") && target === "es") {
    const slug = normalizedPath.replace("/en/articles/", "");
    const pair = articleSlugPairs.find((item) => item.en === slug);
    if (pair) return `/articulos/${pair.es}`;
  }

  for (const r of ROUTES) {
    if (r[current] === normalizedPath) return r[target];
  }
  if (target === "es" && normalizedPath.startsWith("/en/")) {
    const tail = normalizedPath.slice(3);
    return tail || "/";
  }
  if (target === "en" && normalizedPath !== "/") {
    return `/en${normalizedPath === "/en" ? "" : normalizedPath}`;
  }
  return target === "en" ? "/en" : "/";
}

export function navForLocale(locale: Locale) {
  const home = locale === "en" ? "/en" : "/";
  const items = [
    {
      to: locale === "en" ? "/en/kairon" : "/kairon",
      label: "KAIRON",
      exact: false,
      highlight: true,
    },
    {
      to: home,
      hash: "como-funciona",
      label: locale === "en" ? "How it works" : "C\u00f3mo funciona",
      exact: false,
      highlight: false,
    },
    {
      to: home,
      hash: "testimonios",
      label: locale === "en" ? "Testimonials" : "Testimonios",
      exact: false,
      highlight: false,
    },
    {
      to: locale === "en" ? "/en/pricing" : "/precios",
      label: locale === "en" ? "Pricing" : "Precio",
      exact: false,
      highlight: false,
    },
    {
      to: locale === "en" ? "/en/articles" : "/articulos",
      label: locale === "en" ? "Articles" : "Art\u00edculos",
      exact: false,
      highlight: false,
    },
  ];
  return items as Array<{ to: string; label: string; exact: boolean; highlight: boolean; hash?: string }>;
}

export function opportunitiesForLocale(locale: Locale) {
  const keys = ["/unete-al-equipo", "/kairon"];
  return ROUTES.filter((r) => keys.includes(r.es)).map((r) => ({
    to: r[locale],
    label: r.label[locale],
  }));
}
