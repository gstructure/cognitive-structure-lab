import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { dictionaries, type Dict } from "./translations";

export type Locale = "es" | "en";

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string, fallback?: string) => string;
  dict: Dict;
};

const LocaleContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "g-structure:locale";

function readInitialLocale(): Locale {
  if (typeof window === "undefined") return "es";
  const url = new URL(window.location.href);
  const q = url.searchParams.get("lang");
  if (q === "en" || q === "es") return q;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "es") return stored as Locale;
  const nav = window.navigator?.language?.toLowerCase() ?? "";
  return nav.startsWith("en") ? "en" : "es";
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("es");

  useEffect(() => {
    const initial = readInitialLocale();
    setLocaleState(initial);
  }, []);

  // Reflect locale on <html lang> + URL ?lang= and persist
  useEffect(() => {
    if (typeof window === "undefined") return;
    document.documentElement.setAttribute("lang", locale);
    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {}
    const url = new URL(window.location.href);
    if (locale === "en") {
      if (url.searchParams.get("lang") !== "en") {
        url.searchParams.set("lang", "en");
        window.history.replaceState({}, "", url.toString());
      }
    } else {
      if (url.searchParams.has("lang")) {
        url.searchParams.delete("lang");
        window.history.replaceState({}, "", url.toString());
      }
    }
  }, [locale]);

  const setLocale = useCallback((l: Locale) => setLocaleState(l), []);

  const dict = dictionaries[locale];

  const t = useCallback(
    (key: string, fallback?: string) => {
      const path = key.split(".");
      let cur: unknown = dict;
      for (const p of path) {
        if (cur && typeof cur === "object" && p in (cur as Record<string, unknown>)) {
          cur = (cur as Record<string, unknown>)[p];
        } else {
          cur = undefined;
          break;
        }
      }
      if (typeof cur === "string") return cur;
      // fallback to ES
      let es: unknown = dictionaries.es;
      for (const p of path) {
        if (es && typeof es === "object" && p in (es as Record<string, unknown>)) {
          es = (es as Record<string, unknown>)[p];
        } else {
          es = undefined;
          break;
        }
      }
      if (typeof es === "string") return es;
      return fallback ?? key;
    },
    [dict]
  );

  const value = useMemo<Ctx>(() => ({ locale, setLocale, t, dict }), [locale, setLocale, t, dict]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): Ctx {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    // SSR-safe fallback
    return {
      locale: "es",
      setLocale: () => {},
      dict: dictionaries.es,
      t: (k, f) => f ?? k,
    };
  }
  return ctx;
}

export function useT() {
  return useLocale().t;
}
