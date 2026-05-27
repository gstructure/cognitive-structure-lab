// Centralized SEO helpers for G-Structure
// Builds meta arrays (OG, Twitter, canonical) and JSON-LD blocks.
import { ROUTES } from "./routeMap";

export const SITE_URL = "https://g-structure.co";
export const SITE_NAME = "G-Structure";

type ImgInput = string | { src: string };

function resolveImage(img?: ImgInput) {
  if (!img) return `${SITE_URL}/og-default.jpg`;
  const src = typeof img === "string" ? img : img.src;
  if (src.startsWith("http")) return src;
  return `${SITE_URL}${src.startsWith("/") ? src : `/${src}`}`;
}

export type SeoInput = {
  path: string; // e.g. "/enterprise"
  title: string;
  description: string;
  image?: ImgInput;
  type?: "website" | "article" | "profile";
  locale?: "es_EC" | "en_US";
};

export function buildSeo({
  path,
  title,
  description,
  image,
  type = "website",
  locale = "es_EC",
}: SeoInput) {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  const img = resolveImage(image);
  return [
    { title },
    { name: "description", content: description },
    { name: "robots", content: "index,follow,max-image-preview:large" },
    { name: "author", content: SITE_NAME },

    { property: "og:site_name", content: SITE_NAME },
    { property: "og:type", content: type },
    { property: "og:locale", content: locale },
    { property: "og:url", content: url },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: img },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },

    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: img },
  ];
}

// Builds canonical + hreflang alternates. Uses ROUTES map to resolve the
// ES/EN counterpart so /enterprise and /en/enterprise cross-reference each
// other correctly (instead of the legacy ?lang=en hack).
export function canonicalLink(path: string) {
  const clean = path.split(/[?#]/)[0] || "/";
  const abs = (p: string) => `${SITE_URL}${p === "/" ? "" : p}`;

  const entry = ROUTES.find((r) => r.es === clean || r.en === clean);
  const esPath = entry?.es ?? (clean.startsWith("/en/") ? clean.slice(3) || "/" : clean === "/en" ? "/" : clean);
  const enPath = entry?.en ?? (clean.startsWith("/en") ? clean : `/en${clean === "/" ? "" : clean}`);

  return [
    { rel: "canonical", href: abs(clean) },
    { rel: "alternate", hrefLang: "es", href: abs(esPath) },
    { rel: "alternate", hrefLang: "es-EC", href: abs(esPath) },
    { rel: "alternate", hrefLang: "en", href: abs(enPath) },
    { rel: "alternate", hrefLang: "x-default", href: abs(esPath) },
  ];
}

export function jsonLdScript(data: Record<string, unknown> | Record<string, unknown>[]) {
  return {
    type: "application/ld+json",
    children: JSON.stringify(data),
  };
}

// ----- Reusable schema fragments -----

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/og-default.jpg`,
  email: "guillermo@g-structure.co",
  telephone: "+593986875121",
  areaServed: ["EC", "LATAM"],
  founder: {
    "@type": "Person",
    name: "Guillermo Suco",
    url: `${SITE_URL}/sobre-guillermo`,
  },
  sameAs: [
    "https://www.instagram.com/g.structurecbc/",
    "https://www.facebook.com/gstructurecbc",
    "https://www.linkedin.com/in/guillermosuco",
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: ["es", "en"],
  publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
};

export const personGuillermoSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Guillermo Suco",
  jobTitle: "Founder & CEO",
  description: "Creator of G-Frame and the I-R-O™ Method.",
  worksFor: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  url: `${SITE_URL}/sobre-guillermo`,
  sameAs: ["https://www.linkedin.com/in/guillermosuco"],
};

export function gStructSoftwareSchema(locale: "es" | "en" = "es") {
  const isEs = locale === "es";
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "G-Frame",
    applicationCategory: "ProductivityApplication",
    operatingSystem: "iOS, Android, Web",
    url: `${SITE_URL}${isEs ? "/g-frame" : "/en/g-frame"}`,
    inLanguage: isEs ? "es" : "en",
    description: isEs
      ? "Plataforma cognitivo-conductual de ejecución profesional impulsada por el método I-R-O."
      : "Cognitive-behavioral execution platform powered by the I-R-O Method.",
    brand: { "@type": "Brand", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    creator: { "@type": "Person", name: "Guillermo Suco" },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/PreOrder",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path === "/" ? "" : it.path}`,
    })),
  };
}

export function faqSchema(qa: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qa.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}
