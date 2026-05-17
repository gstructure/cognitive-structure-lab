import { useLocale } from "@/lib/i18n";

export function SocialProofBar() {
  const { locale } = useLocale();
  const items =
    locale === "en"
      ? [
          "CBT Coach Practitioner · CTAA",
          "Published research · MLS Journal 2025",
          "Host · Ecuador Tech Week 2026",
        ]
      : [
          "CBT Coach Practitioner · CTAA",
          "Investigación publicada · MLS Journal 2025",
          "Host · Ecuador Tech Week 2026",
        ];
  return (
    <div className="border-b border-border bg-[color:var(--color-brand-soft)]/30">
      <div className="container-x flex flex-wrap items-center justify-center gap-x-8 gap-y-2 py-3 text-center">
        {items.map((item, i) => (
          <span
            key={item}
            className="inline-flex items-center gap-3 text-[11px] tracking-wide text-muted-foreground"
          >
            {i > 0 && <span aria-hidden className="hidden sm:inline text-muted-foreground/50">|</span>}
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
