import { useMemo, useState } from "react";
import { Check, Copy, Linkedin, Mail, MessageCircle } from "lucide-react";
import { articleUrl, type Article } from "@/lib/articles";

export function ArticleShare({ article }: { article: Article }) {
  const [copied, setCopied] = useState(false);
  const url = articleUrl(article);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(article.title);

  const links = useMemo(
    () => [
      {
        label: "LinkedIn",
        icon: Linkedin,
        href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      },
      {
        label: "WhatsApp",
        icon: MessageCircle,
        href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      },
      {
        label: "Email",
        icon: Mail,
        href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
      },
    ],
    [encodedTitle, encodedUrl],
  );

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="border border-border bg-[color:var(--color-surface)] p-5">
      <p className="eyebrow mb-4 text-[10px]">Compartir</p>
      <div className="flex flex-wrap gap-2">
        {links.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Compartir en ${label}`}
            className="inline-flex h-10 w-10 items-center justify-center border border-border bg-background text-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            <Icon size={16} />
          </a>
        ))}
        <button
          type="button"
          onClick={onCopy}
          aria-label="Copiar enlace"
          className="inline-flex h-10 w-10 items-center justify-center border border-border bg-background text-foreground transition-colors hover:bg-foreground hover:text-background"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>
    </div>
  );
}
