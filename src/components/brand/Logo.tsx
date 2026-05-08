type LogoProps = {
  variant?: "default" | "inverse";
  className?: string;
};

export function Logo({ variant = "default", className }: LogoProps) {
  const color = variant === "inverse" ? "var(--color-background)" : "var(--color-brand)";
  return (
    <div className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <BrandMark size={22} color={color} />
      <span
        className="font-display text-[15px] font-semibold tracking-[0.18em]"
        style={{ color }}
      >
        G&#8209;STRUCTURE
      </span>
    </div>
  );
}

export function BrandMark({
  size = 28,
  color = "var(--color-brand)",
  className,
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect x="1" y="1" width="30" height="30" rx="2" stroke={color} strokeWidth="1.5" />
      <path d="M22 11h-7a4 4 0 0 0-4 4v2a4 4 0 0 0 4 4h4v-4h-3" stroke={color} strokeWidth="1.75" strokeLinecap="square" />
    </svg>
  );
}
