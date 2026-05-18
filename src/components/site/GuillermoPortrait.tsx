import portrait from "@/assets/guillermo-suco.webp";

type Props = {
  caption?: string;
  subcaption?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizes: Record<NonNullable<Props["size"]>, string> = {
  sm: "max-w-[260px]",
  md: "max-w-[360px]",
  lg: "max-w-[440px]",
};

export function GuillermoPortrait({
  caption = "Guillermo Suco",
  subcaption = "Fundador & CEO · G-Struct",
  className,
  size = "md",
}: Props) {
  return (
    <figure className={`relative w-full ${sizes[size]} ${className ?? ""}`}>
      {/* Soft brand glow */}
      <div
        className="pointer-events-none absolute -inset-6 -z-10 opacity-60 blur-3xl"
        aria-hidden
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklch, var(--color-brand-deep) 22%, transparent), transparent 70%)",
        }}
      />
      <div
        className="relative border border-border bg-[color:var(--color-brand-deep)] p-2 shadow-[0_30px_60px_-22px_rgba(5,50,90,0.45)]"
      >
        <div className="relative overflow-hidden">
          <img
            src={portrait}
            alt={`${caption} — ${subcaption}`}
            className="block h-auto w-full object-cover [aspect-ratio:4/5]"
            loading="lazy"
          />
          {/* Subtle gradient blend with brand */}
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden
            style={{
              background:
                "linear-gradient(180deg, transparent 60%, color-mix(in oklch, var(--color-brand-deep) 28%, transparent))",
            }}
          />
          <span
            className="absolute left-3 top-3 inline-flex items-center gap-2 border border-white/25 bg-black/20 px-2 py-1 text-[10px] font-semibold tracking-[0.22em] text-white backdrop-blur"
          >
            <span className="h-1 w-1 bg-white" /> FUNDADOR
          </span>
        </div>
      </div>
      {(caption || subcaption) && (
        <figcaption className="mt-4 flex items-baseline justify-between gap-3">
          <span className="font-display text-sm font-semibold text-foreground">{caption}</span>
          <span className="text-[11px] tracking-wide text-muted-foreground">{subcaption}</span>
        </figcaption>
      )}
    </figure>
  );
}
