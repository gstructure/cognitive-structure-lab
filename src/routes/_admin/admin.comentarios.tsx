import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Check, Loader2, RefreshCcw, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  adminListArticleComments,
  adminUpdateArticleCommentStatus,
} from "@/lib/article-comment.functions";
import { ARTICLES, EN_ARTICLES } from "@/lib/articles";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_admin/admin/comentarios")({
  component: AdminArticleComments,
  head: () => ({
    meta: [
      { title: "Comentarios | Admin G-Structure" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
});

type Status = "all" | "pending" | "approved" | "rejected";

interface CommentRow {
  id: string;
  article_slug: string;
  author_name: string;
  author_email: string;
  body: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  approved_at: string | null;
}

const STATUS_LABELS: Record<Status, string> = {
  all: "Todos",
  pending: "Pendientes",
  approved: "Aprobados",
  rejected: "Rechazados",
};

const STATUS_STYLES: Record<CommentRow["status"], string> = {
  pending: "bg-amber-100 text-amber-900 border-amber-300",
  approved: "bg-emerald-100 text-emerald-900 border-emerald-300",
  rejected: "bg-zinc-100 text-zinc-700 border-zinc-300",
};

function AdminArticleComments() {
  const list = useServerFn(adminListArticleComments);
  const updateStatus = useServerFn(adminUpdateArticleCommentStatus);
  const [rows, setRows] = useState<CommentRow[]>([]);
  const [status, setStatus] = useState<Status>("pending");
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const articleTitles = useMemo(() => {
    return new Map([...ARTICLES, ...EN_ARTICLES].map((article) => [article.slug, article.title]));
  }, []);

  const refresh = async (nextStatus = status) => {
    setLoading(true);
    setError(null);
    const result = await list({ data: { status: nextStatus } });
    if (result.ok) {
      setRows(((result.rows ?? []) as unknown) as CommentRow[]);
    } else {
      setRows([]);
      setError(result.error ?? "No se pudieron cargar los comentarios.");
    }
    setLoading(false);
  };

  useEffect(() => {
    refresh(status);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const setCommentStatus = async (id: string, nextStatus: CommentRow["status"]) => {
    setSavingId(id);
    setError(null);
    const result = await updateStatus({ data: { id, status: nextStatus } });
    setSavingId(null);
    if (!result.ok) {
      setError(result.error ?? "No se pudo actualizar el comentario.");
      return;
    }
    await refresh(status);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Moderación de comentarios</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Aprueba los comentarios que deben publicarse en los artículos.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(STATUS_LABELS) as Status[]).map((item) => (
              <Button
                key={item}
                type="button"
                size="sm"
                variant={status === item ? "default" : "outline"}
                onClick={() => setStatus(item)}
              >
                {STATUS_LABELS[item]}
              </Button>
            ))}
            <Button type="button" size="sm" variant="outline" onClick={() => refresh()}>
              <RefreshCcw className="w-4 h-4 mr-1" />
              Refrescar
            </Button>
          </div>
        </header>

        {error && (
          <div className="mb-4 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {loading ? (
          <div className="py-12 text-center text-sm text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin inline mr-2" />
            Cargando comentarios...
          </div>
        ) : (
          <div className="space-y-3">
            {rows.map((comment) => (
              <article key={comment.id} className="rounded-lg border bg-card p-5">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-medium">{comment.author_name}</h2>
                      <span className={`rounded-full border px-2 py-0.5 text-xs ${STATUS_STYLES[comment.status]}`}>
                        {comment.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {comment.author_email} · {new Date(comment.created_at).toLocaleString("es-EC")}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Artículo: {articleTitles.get(comment.article_slug) ?? comment.article_slug}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => setCommentStatus(comment.id, "approved")}
                      disabled={savingId === comment.id || comment.status === "approved"}
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Aprobar
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => setCommentStatus(comment.id, "rejected")}
                      disabled={savingId === comment.id || comment.status === "rejected"}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Rechazar
                    </Button>
                  </div>
                </div>
                <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed">{comment.body}</p>
              </article>
            ))}

            {rows.length === 0 && (
              <div className="rounded-lg border bg-card p-8 text-center text-sm text-muted-foreground">
                No hay comentarios en este estado.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
