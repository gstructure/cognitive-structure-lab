import { Instagram, Facebook, Linkedin, MessageCircle, Mail } from "lucide-react";

export const SOCIAL = {
  instagram: "https://www.instagram.com/g.structurecbc/",
  facebook: "https://www.facebook.com/gstructurecbc",
  linkedin: "https://www.linkedin.com/in/guillermosuco",
  whatsapp: "https://wa.me/593986875121",
  email: "mailto:guillermo@g-structure.co",
} as const;

type Variant = "default" | "inverse";

const items = [
  { key: "instagram", label: "Instagram", href: SOCIAL.instagram, Icon: Instagram },
  { key: "facebook", label: "Facebook", href: SOCIAL.facebook, Icon: Facebook },
  { key: "linkedin", label: "LinkedIn", href: SOCIAL.linkedin, Icon: Linkedin },
  { key: "whatsapp", label: "WhatsApp", href: SOCIAL.whatsapp, Icon: MessageCircle },
  { key: "email", label: "Email", href: SOCIAL.email, Icon: Mail },
] as const;

export function SocialLinks({
  variant = "default",
  size = 16,
  className,
  only,
}: {
  variant?: Variant;
  size?: number;
  className?: string;
  only?: ReadonlyArray<(typeof items)[number]["key"]>;
}) {
  const list = only ? items.filter((i) => only.includes(i.key)) : items;
  const base =
    variant === "inverse"
      ? "border-[color:var(--color-background)]/25 text-[color:var(--color-background)] hover:border-[color:var(--color-background)] hover:bg-[color:var(--color-background)]/10"
      : "border-border text-foreground/80 hover:text-foreground hover:border-foreground/60";
  return (
    <ul className={`flex flex-wrap items-center gap-2 ${className ?? ""}`}>
      {list.map(({ key, label, href, Icon }) => (
        <li key={key}>
          <a
            href={href}
            target={key === "email" ? undefined : "_blank"}
            rel={key === "email" ? undefined : "noreferrer"}
            aria-label={label}
            title={label}
            className={`inline-flex h-9 w-9 items-center justify-center border transition-all ${base}`}
          >
            <Icon size={size} strokeWidth={1.5} />
          </a>
        </li>
      ))}
    </ul>
  );
}
