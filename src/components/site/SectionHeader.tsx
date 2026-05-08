import { Eyebrow } from "./Eyebrow";

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-3xl ${alignment} ${className ?? ""}`}>
      {eyebrow ? <Eyebrow className="mb-4">{eyebrow}</Eyebrow> : null}
      <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.08] text-foreground">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">{subtitle}</p>
      ) : null}
    </div>
  );
}
