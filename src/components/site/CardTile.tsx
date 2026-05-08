export function CardTile({
  title,
  children,
  number,
  className,
}: {
  title: React.ReactNode;
  children?: React.ReactNode;
  number?: string;
  className?: string;
}) {
  return (
    <div
      className={`group relative flex flex-col gap-3 border border-border bg-[color:var(--color-surface)] p-6 md:p-8 transition-colors hover:border-foreground/40 ${className ?? ""}`}
    >
      {number ? (
        <span className="font-display text-xs font-semibold tracking-[0.22em] text-muted-foreground">
          {number}
        </span>
      ) : null}
      <h3 className="font-display text-lg md:text-xl font-semibold text-foreground leading-snug">
        {title}
      </h3>
      {children ? <div className="text-sm md:text-[15px] text-muted-foreground leading-relaxed">{children}</div> : null}
    </div>
  );
}
