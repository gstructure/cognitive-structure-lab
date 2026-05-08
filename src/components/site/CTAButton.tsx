import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ComponentProps } from "react";

type Variant = "primary" | "ghost" | "outline" | "inverse";

const styles: Record<Variant, string> = {
  primary:
    "bg-foreground text-background hover:opacity-90",
  ghost:
    "text-foreground hover:bg-foreground/5",
  outline:
    "border border-foreground/30 text-foreground hover:border-foreground hover:bg-foreground/5",
  inverse:
    "bg-background text-foreground hover:opacity-90",
};

type BaseProps = {
  variant?: Variant;
  withArrow?: boolean;
  children: React.ReactNode;
  className?: string;
};

export function CTALink({
  to,
  variant = "primary",
  withArrow = true,
  children,
  className,
  ...rest
}: BaseProps & { to: ComponentProps<typeof Link>["to"] } & Omit<ComponentProps<typeof Link>, "children" | "className" | "to">) {
  return (
    <Link
      to={to}
      {...rest}
      className={`group inline-flex items-center justify-center gap-2 px-5 py-3 text-[13px] font-medium tracking-wide transition-all ${styles[variant]} ${className ?? ""}`}
    >
      {children}
      {withArrow ? (
        <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
      ) : null}
    </Link>
  );
}

export function CTAExternal({
  href,
  variant = "primary",
  withArrow = true,
  children,
  className,
  ...rest
}: BaseProps & { href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={href}
      {...rest}
      className={`group inline-flex items-center justify-center gap-2 px-5 py-3 text-[13px] font-medium tracking-wide transition-all ${styles[variant]} ${className ?? ""}`}
    >
      {children}
      {withArrow ? (
        <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
      ) : null}
    </a>
  );
}
