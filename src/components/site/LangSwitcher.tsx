import { useRouterState, useNavigate } from "@tanstack/react-router";
import { localeFromPath, swapLocalePath } from "@/lib/routeMap";
import type { Locale } from "@/lib/i18n";

export function LangSwitcher({ className }: { className?: string }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hash = useRouterState({ select: (s) => s.location.hash });
  const search = useRouterState({ select: (s) => s.location.searchStr });
  const navigate = useNavigate();
  const current: Locale = localeFromPath(pathname);
  const items: Locale[] = ["es", "en"];
  return (
    <div
      role="group"
      aria-label="Language"
      className={`inline-flex items-center border border-border bg-[color:var(--color-surface)] ${className ?? ""}`}
    >
      {items.map((l) => {
        const active = current === l;
        const targetPath = swapLocalePath(pathname, l);
        const searchSuffix = search ? (search.startsWith("?") ? search : `?${search}`) : "";
        const hashSuffix = hash ? (hash.startsWith("#") ? hash : `#${hash}`) : "";
        const target = `${targetPath}${searchSuffix}${hashSuffix}`;
        return (
          <button
            key={l}
            type="button"
            aria-pressed={active}
            aria-label={l === "es" ? "Cambiar a español" : "Switch to English"}
            onClick={() => {
              if (active) return;
              navigate({ to: target });
            }}
            className={`px-2.5 py-1 text-[11px] font-semibold tracking-[0.18em] transition-colors ${
              active
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {l.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
