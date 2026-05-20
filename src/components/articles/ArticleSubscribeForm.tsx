import { FormEvent, useState } from "react";
import { ArrowRight } from "lucide-react";

type Status = "idle" | "loading" | "success" | "duplicate" | "error";

export function ArticleSubscribeForm() {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/public/gstruct-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          website,
          source: "articles_subscription",
          locale: "es",
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

  return (
    <form onSubmit={onSubmit} className="border border-border bg-[color:var(--color-surface)] p-5">
      <p className="eyebrow mb-3 text-[10px]">Suscripción</p>
      <h2 className="font-display text-xl leading-tight">Recibe nuevos artículos y notas de construcción.</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Updates sobre G-Struct, el método I-R-O™ y la ejecución cognitivo-conductual.
      </p>
      <div className="mt-5 flex gap-2">
        <label className="sr-only" htmlFor="article-subscribe-email">Email</label>
        <input
          id="article-subscribe-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="tu@email.com"
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
          aria-label="Suscribirme"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center bg-foreground text-background transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          <ArrowRight size={16} />
        </button>
      </div>
      {status === "success" ? <p className="mt-3 text-xs text-foreground">Listo. Te avisaremos cuando publiquemos nuevas notas.</p> : null}
      {status === "duplicate" ? <p className="mt-3 text-xs text-foreground">Ese correo ya está registrado.</p> : null}
      {status === "error" ? <p className="mt-3 text-xs text-destructive">No pudimos registrar el correo. Inténtalo otra vez.</p> : null}
    </form>
  );
}
