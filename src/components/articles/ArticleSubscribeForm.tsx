import { FormEvent, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useLocale } from "@/lib/i18n";

type Status = "idle" | "loading" | "success" | "duplicate" | "error";

export function ArticleSubscribeForm() {
  const { locale } = useLocale();
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/public/newsletter-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          website,
          source: "articles_subscription",
          locale,
        }),
      });

      if (response.status === 409) {
        setStatus("duplicate");
        return;
      }
      if (!response.ok) throw new Error("subscribe_failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  const copy = locale === "en"
    ? {
        eyebrow: "Subscription",
        title: "Get new essays and build notes.",
        body: "Updates on G-Frame, the I-R-O™ Method, and cognitive-behavioral execution.",
        placeholder: "you@email.com",
        aria: "Subscribe",
        success: "Done. Welcome email sent. We will let you know when new notes are published.",
        duplicate: "That email is already subscribed to the notes.",
        error: "We could not register the email. Try again.",
      }
    : {
        eyebrow: "Suscripción",
        title: "Recibe nuevos artículos y notas de construcción.",
        body: "Updates sobre G-Frame, el Método I-R-O™ y la ejecución cognitivo-conductual.",
        placeholder: "tu@email.com",
        aria: "Suscribirme",
        success: "Listo. Te enviamos el correo de bienvenida y te avisaremos cuando publiquemos nuevas notas.",
        duplicate: "Ese correo ya está suscrito a las notas.",
        error: "No pudimos registrar el correo. Inténtalo otra vez.",
      };

  return (
    <form onSubmit={onSubmit} className="border border-border bg-[color:var(--color-surface)] p-5">
      <p className="eyebrow mb-3 text-[10px]">{copy.eyebrow}</p>
      <h2 className="font-display text-xl leading-tight">{copy.title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {copy.body}
      </p>
      <div className="mt-5 flex gap-2">
        <label className="sr-only" htmlFor="article-subscribe-email">Email</label>
        <input
          id="article-subscribe-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={copy.placeholder}
          className="min-w-0 flex-1 border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
        />
        <input
          type="text"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          aria-label={copy.aria}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center bg-foreground text-background transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          <ArrowRight size={16} />
        </button>
      </div>
      {status === "success" ? <p className="mt-3 text-xs text-foreground">{copy.success}</p> : null}
      {status === "duplicate" ? <p className="mt-3 text-xs text-foreground">{copy.duplicate}</p> : null}
      {status === "error" ? <p className="mt-3 text-xs text-destructive">{copy.error}</p> : null}
    </form>
  );
}
