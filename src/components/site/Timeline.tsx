type Item = { n?: string; t: string; d: string; status?: "done" | "active" | "next" };

export function Timeline({ items, tone = "light" }: { items: readonly Item[]; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  const lineColor = dark
    ? "bg-[color:var(--color-background)]/20"
    : "bg-border";
  const dotBase = dark
    ? "border-[color:var(--color-background)]/40 bg-[color:var(--color-brand-deep)]"
    : "border-foreground/40 bg-background";
  const dotActive = dark
    ? "border-[color:var(--color-background)] bg-[color:var(--color-background)]"
    : "border-foreground bg-foreground";
  const eyebrow = dark ? "text-[color:var(--color-background)]/60" : "text-muted-foreground";
  const title = dark ? "text-[color:var(--color-background)]" : "text-foreground";
  const body = dark ? "text-[color:var(--color-background)]/75" : "text-muted-foreground";

  return (
    <ol className="relative">
      <span className={`absolute left-[10px] top-2 bottom-2 w-px ${lineColor}`} aria-hidden />
      {items.map((it, i) => {
        const filled = it.status === "done" || it.status === "active";
        return (
          <li key={i} className="relative pl-10 pb-10 last:pb-0">
            <span
              className={`absolute left-0 top-1 h-5 w-5 border-2 ${filled ? dotActive : dotBase} ${
                it.status === "active" ? "ring-4 ring-[color:var(--color-brand)]/15" : ""
              }`}
              aria-hidden
            />
            {it.n ? (
              <p className={`font-display text-[10px] font-semibold tracking-[0.22em] ${eyebrow}`}>
                {it.n}
              </p>
            ) : null}
            <h3 className={`mt-1 font-display text-lg md:text-xl font-semibold ${title}`}>
              {it.t}
            </h3>
            <p className={`mt-2 text-sm md:text-[15px] leading-relaxed ${body}`}>{it.d}</p>
          </li>
        );
      })}
    </ol>
  );
}
