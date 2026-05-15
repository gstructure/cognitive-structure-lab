type SectionProps = {
  children: React.ReactNode;
  id?: string;
  tone?: "default" | "muted" | "deep" | "white";
  className?: string;
};

const toneClass: Record<NonNullable<SectionProps["tone"]>, string> = {
  default: "bg-background",
  muted: "bg-[color:var(--color-brand-soft)]/40",
  white: "bg-[color:var(--color-surface)]",
  deep: "bg-[color:var(--color-brand-deep)] text-[color:var(--color-background)]",
};

export function Section({ children, id, tone = "default", className }: SectionProps) {
  return (
    <section id={id} className={`relative py-12 md:py-28 ${toneClass[tone]} ${className ?? ""}`}>
      <div className="container-x">{children}</div>
    </section>
  );
}
