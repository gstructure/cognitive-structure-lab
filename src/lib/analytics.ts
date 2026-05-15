// Google Ads / gtag helpers.
// The base gtag.js + config('AW-18154152582') are injected globally from
// src/routes/__root.tsx. Here we expose typed helpers for sending custom
// events and Google Ads conversions.
//
// IMPORTANT: Conversions must only fire on successful actions, never on
// page view or simple clicks. See trackConversion() and trackBriefDownload().

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
  | "booking_request"
  | "gstruct_waitlist_signup";

// Google Ads conversion labels. `undefined` means: fire GA4 event only,
// do NOT fire a Google Ads conversion.
const CONVERSION_LABELS: Record<ConversionKey, string | undefined> = {
  contact_click: undefined,
  contact_form_submit: "AW-18154152582/aTpmCJKjhqscEIbFydBD",
  brief_pdf_download: "AW-18154152582/hLADCJWjhqscEIbFydBD",
  booking_request: "AW-18154152582/zzaxCI-jhqscEIbFydBD",
  // No Ads label yet — connect once Google Ads conversion is created.
  gstruct_waitlist_signup: undefined,
};

const isDev =
  typeof import.meta !== "undefined" && (import.meta as { env?: { DEV?: boolean } }).env?.DEV;

function safeGtag(...args: unknown[]) {
  if (typeof window === "undefined") return false;
  if (typeof window.gtag !== "function") return false;
  try {
    window.gtag(...args);
    return true;
  } catch {
    return false;
  }
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  safeGtag("event", name, params);
}

export function trackConversion(
  key: ConversionKey,
  params: Record<string, unknown> = {},
) {
  // Always fire a named GA4 / debug event.
  trackEvent(key, params);
  const label = CONVERSION_LABELS[key];
  if (label) {
    safeGtag("event", "conversion", { send_to: label, ...params });
    if (isDev) console.info(`[gtag] conversion fired: ${key} (${label})`);
  } else if (isDev) {
    console.info(`[gtag] event fired (no Ads conversion): ${key}`);
  }
}

/**
 * Fires the brief PDF download conversion and then navigates / triggers the
 * download. Uses Google Ads `event_callback` with an 800 ms safety fallback so
 * navigation always happens even if gtag is blocked or slow.
 *
 * Usage in an onClick:
 *   onClick={(e) => { e.preventDefault(); trackBriefDownload(PDF_HREF); }}
 */
export function trackBriefDownload(url: string, extra: Record<string, unknown> = {}) {
  // Always fire a debug event for GA4.
  trackEvent("brief_pdf_download", extra);

  const label = CONVERSION_LABELS.brief_pdf_download;
  let navigated = false;
  const go = () => {
    if (navigated) return;
    navigated = true;
    if (typeof window !== "undefined") window.location.href = url;
  };

  if (!label || typeof window === "undefined" || typeof window.gtag !== "function") {
    go();
    return;
  }

  try {
    window.gtag("event", "conversion", {
      send_to: label,
      event_callback: go,
      ...extra,
    });
    if (isDev) console.info(`[gtag] conversion fired: brief_pdf_download (${label})`);
  } catch {
    go();
    return;
  }
  // Safety fallback in case event_callback never fires.
  setTimeout(go, 800);
}
