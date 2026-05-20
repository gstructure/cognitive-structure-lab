import { FormEvent, useEffect, useState } from "react";
import { useLocale } from "@/lib/i18n";

type Comment = {
  id: string;
  author_name: string;
  body: string;
  created_at: string;
};

type Status = "idle" | "loading" | "success" | "error";

export function ArticleComments({ slug }: { slug: string }) {
  const { locale } = useLocale();
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/public/article-comments?slug=${encodeURIComponent(slug)}`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : { comments: [] }))
      .then((data) => {
        if (!cancelled) setComments(Array.isArray(data.comments) ? data.comments : []);
      })
      .catch(() => {
        if (!cancelled) setComments([]);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/public/article-comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, authorName: name, email, body, website, locale }),
      });
      if (!response.ok) throw new Error("comment_failed");
      setStatus("success");
      setName("");
      setEmail("");
      setBody("");
    } catch {
      setStatus("error");
    }
  };

  const copy = locale === "en"
    ? {
        eyebrow: "Comments",
        title: "Moderated conversation",
        intro: "Comments are reviewed before publication to keep the discussion useful and focused.",
        empty: "There are no approved comments yet. You can open the conversation.",
        name: "Name",
        comment: "Comment",
        privacy: "Your email is not published.",
        sending: "Sending...",
        submit: "Send comment",
        success: "Received. We will review it before publishing.",
        error: "We could not send the comment. Try again.",
      }
    : {
        eyebrow: "Comentarios",
        title: "Conversación moderada",
        intro: "Los comentarios se revisan antes de publicarse para mantener la discusión útil y enfocada.",
        empty: "Todavía no hay comentarios aprobados. Puedes abrir la conversación.",
        name: "Nombre",
        comment: "Comentario",
        privacy: "Tu email no se publica.",
        sending: "Enviando...",
        submit: "Enviar comentario",
        success: "Recibido. Lo revisaremos antes de publicarlo.",
        error: "No pudimos enviar el comentario. Inténtalo otra vez.",
      };

  return (
    <section id="comentarios" className="mt-16 border-t border-border pt-10">
      <div className="flex flex-col gap-2">
        <p className="eyebrow text-[10px]">{copy.eyebrow}</p>
        <h2 className="font-display text-2xl leading-tight">{copy.title}</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {copy.intro}
        </p>
      </div>

      <div className="mt-8 space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <article key={comment.id} className="border border-border bg-[color:var(--color-surface)] p-5">
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <strong className="text-foreground">{comment.author_name}</strong>
                <span aria-hidden>·</span>
                <time dateTime={comment.created_at}>
                  {new Intl.DateTimeFormat(locale === "en" ? "en-US" : "es-EC", { day: "numeric", month: "short", year: "numeric" }).format(new Date(comment.created_at))}
                </time>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-foreground/80">{comment.body}</p>
            </article>
          ))
        ) : (
          <p className="border border-dashed border-border p-5 text-sm text-muted-foreground">
            {copy.empty}
          </p>
        )}
      </div>

      <form onSubmit={onSubmit} className="mt-8 grid gap-4 border border-border bg-[color:var(--color-surface)] p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium">
            {copy.name}
            <input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              maxLength={120}
              className="border border-border bg-background px-3 py-2.5 text-sm font-normal outline-none transition-colors focus:border-foreground"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Email
            <input
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              maxLength={255}
              className="border border-border bg-background px-3 py-2.5 text-sm font-normal outline-none transition-colors focus:border-foreground"
            />
          </label>
        </div>
        <label className="grid gap-2 text-sm font-medium">
            {copy.comment}
          <textarea
            required
            value={body}
            onChange={(event) => setBody(event.target.value)}
            minLength={12}
            maxLength={1200}
            rows={5}
            className="resize-y border border-border bg-background px-3 py-2.5 text-sm font-normal outline-none transition-colors focus:border-foreground"
          />
        </label>
        <input
          type="text"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">{copy.privacy}</p>
          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex items-center justify-center bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {status === "loading" ? copy.sending : copy.submit}
          </button>
        </div>
        {status === "success" ? <p className="text-sm text-foreground">{copy.success}</p> : null}
        {status === "error" ? <p className="text-sm text-destructive">{copy.error}</p> : null}
      </form>
    </section>
  );
}
