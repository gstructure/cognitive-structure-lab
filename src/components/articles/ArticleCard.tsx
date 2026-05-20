import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { formatArticleDate, type Article } from "@/lib/articles";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group border border-border bg-[color:var(--color-surface)] p-6 md:p-7">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted-foreground">
        <span className="eyebrow text-[10px]">{article.category}</span>
        <span aria-hidden>·</span>
        <time dateTime={article.publishedAt}>{formatArticleDate(article.publishedAt)}</time>
        <span aria-hidden>·</span>
        <span>{article.readMinutes} min</span>
      </div>
      <h3 className="mt-5 font-display text-2xl leading-tight text-foreground">
        <Link to="/articulos/$slug" params={{ slug: article.slug }} className="outline-none">
          {article.title}
        </Link>
      </h3>
      {article.subtitle ? (
        <p className="mt-2 text-sm font-medium text-foreground/70">{article.subtitle}</p>
      ) : null}
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{article.excerpt}</p>
      <Link
        to="/articulos/$slug"
        params={{ slug: article.slug }}
        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-[color:var(--color-primary)]"
      >
        Leer artículo <ArrowUpRight size={15} />
      </Link>
    </article>
  );
}
