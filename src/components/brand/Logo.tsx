import logoCube from "@/assets/g-structure-cube.png";

type LogoProps = {
  variant?: "default" | "inverse";
  className?: string;
};

export function Logo({ variant = "default", className }: LogoProps) {
  const color = variant === "inverse" ? "var(--color-background)" : "var(--color-brand)";
  return (
    <div className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <img
        src={logoCube}
        alt="G-Structure"
        className={`h-7 w-7 md:h-8 md:w-8 object-contain ${variant === "inverse" ? "invert brightness-200" : ""}`}
      />
      <span
        className="font-display text-[14px] md:text-[15px] font-semibold tracking-[0.2em]"
        style={{ color }}
      >
        G&#8209;STRUCTURE
      </span>
    </div>
  );
}

export function BrandMark({
  size = 28,
  color,
  className,
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  // Kept as inline SVG fallback for sections that need a vector mark in brand color.
  const stroke = color ?? "var(--color-brand)";
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
      <rect x="1" y="1" width="30" height="30" rx="2" stroke={stroke} strokeWidth="1.5" />
      <path d="M22 11h-7a4 4 0 0 0-4 4v2a4 4 0 0 0 4 4h4v-4h-3" stroke={stroke} strokeWidth="1.75" strokeLinecap="square" />
    </svg>
  );
}
