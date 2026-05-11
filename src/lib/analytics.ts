// Google Ads / gtag helpers.
// The base gtag.js + config('AW-18154152582') are injected globally from
// src/routes/__root.tsx. Here we expose typed helpers for sending custom
// events and conversions.
//
// To wire a real Google Ads conversion, replace `undefined` in the
// CONVERSION_LABELS map with the labels generated in Google Ads
// (format: "AW-18154152582/XXXXXXXXXXXX"). While a label is missing, we
// still fire a generic `event` so it shows up in GA4 / Tag Assistant.

export const GADS_ID = "AW-18154152582";

type GtagFn = (...args: unknown[]) => void;
declare global {
  interface Window {
    gtag?: GtagFn;
    dataLayer?: unknown[];
  }
}

export type ConversionKey =
  | "contact_click"
  | "contact_form_submit"
  | "brief_pdf_download"
  | "booking_request";

// Replace with Google Ads conversion labels when available, e.g.
// contact_form_submit: "AW-18154152582/AbCdEfGhIjK".
const CONVERSION_LABELS: Record<ConversionKey, string | undefined> = {
  contact_click: "AW-18154152582/zzaxCI-jhqscEIbFydBD",
  contact_form_submit: "AW-18154152582/aTpmCJKjhqscEIbFydBD",
  brief_pdf_download: "AW-18154152582/hLADCJWjhqscEIbFydBD",
  booking_request: undefined,
};

function safeGtag(...args: unknown[]) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  try {
    window.gtag(...args);
  } catch {
    // never let analytics crash the UI
  }
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  safeGtag("event", name, params);
}

export function trackConversion(
  key: ConversionKey,
  params: Record<string, unknown> = {},
) {
  // Always fire a named event for GA4 / debugging.
  trackEvent(key, params);
  // Fire the Google Ads conversion if a label is configured.
  const label = CONVERSION_LABELS[key];
  if (label) {
    safeGtag("event", "conversion", { send_to: label, ...params });
  }
}
