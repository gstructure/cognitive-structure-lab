/**
 * Shared design tokens for the dark KAIRON marketing pages (Home, Teams,
 * and the remaining pages from the "design_handoff_gstructure_site"
 * package: Método I-R-O, Bloqueos, Índice de Fricción, KAIRON vs Notion).
 * Values match the handoff's Design Tokens table verbatim — this is the
 * single source of truth, don't hardcode these hex values in a page
 * component. Hard rule from the handoff: one accent color site-wide
 * (`accent`), reserved for CTAs, kickers, and the one number that matters.
 */
export const KAIRON_THEME = {
  bg: "#0A0A0B",
  bgAlt: "#0E0E0F",
  surface: "#101011",
  surface2: "#141415",
  footerBg: "#070708",
  text: "#F5F3F0",
  text70: "rgba(245,243,240,0.72)",
  text60: "rgba(245,243,240,0.6)",
  text40: "rgba(245,243,240,0.4)",
  border: "rgba(245,243,240,0.09)",
  borderStrong: "rgba(245,243,240,0.12)",
  accent: "#F0A046",
  accentHover: "#F7BE7B",
  accentFg: "#1A1000",
  accentTint: "rgba(240,160,70,0.28)",
} as const;
