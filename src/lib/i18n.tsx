import { createContext, useContext, useEffect, useMemo, useCallback } from "react";
import { useRouterState, useNavigate } from "@tanstack/react-router";
import { dictionaries, type Dict } from "./translations";
import { localeFromPath, swapLocalePath } from "./routeMap";

export type Locale = "es" | "en";

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string, fallback?: string) => string;
  dict: Dict;
};

const LocaleContext = createContext<Ctx | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();

  const locale: Locale = localeFromPath(pathname);

  // Reflect locale on <html lang>
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.setAttribute("lang", locale);
  }, [locale]);

  const setLocale = useCallback(
    (l: Locale) => {
      const target = swapLocalePath(pathname, l);
      navigate({ to: target as string, replace: false });
    },
    [pathname, navigate],
  );

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
    [dict],
  );

  const value = useMemo<Ctx>(() => ({ locale, setLocale, t, dict }), [locale, setLocale, t, dict]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): Ctx {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
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
