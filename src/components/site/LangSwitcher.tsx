import { useLocale, type Locale } from "@/lib/i18n";

export function LangSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useLocale();
  const items: Locale[] = ["es", "en"];
  return (
    <div
      role="group"
      aria-label="Language"
      className={`inline-flex items-center border border-border bg-[color:var(--color-surface)] ${className ?? ""}`}
    >
      {items.map((l) => {
        const active = locale === l;
        return (
          <button
            key={l}
            type="button"
            aria-pressed={active}
            onClick={() => setLocale(l)}
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
