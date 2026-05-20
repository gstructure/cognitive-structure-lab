import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { articlePath, formatArticleDate, type Article } from "@/lib/articles";
import { useLocale } from "@/lib/i18n";

export function ArticleCard({ article }: { article: Article }) {
  const { locale } = useLocale();
  const path = articlePath(article, locale);
  const readLabel = locale === "en" ? "Read article" : "Leer artículo";

  return (
    <article className="group border border-border bg-[color:var(--color-surface)] p-6 md:p-7">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted-foreground">
        <span className="eyebrow text-[10px]">{article.category}</span>
        <span aria-hidden>·</span>
        <time dateTime={article.publishedAt}>{formatArticleDate(article.publishedAt, locale)}</time>
        <span aria-hidden>·</span>
        <span>{article.readMinutes} min</span>
      </div>
      <h3 className="mt-5 font-display text-2xl leading-tight text-foreground">
        <Link to={path as string} className="outline-none">
          {article.title}
        </Link>
      </h3>
      {article.subtitle ? (
        <p className="mt-2 text-sm font-medium text-foreground/70">{article.subtitle}</p>
      ) : null}
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{article.excerpt}</p>
      <Link
        to={path as string}
        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-[color:var(--color-primary)]"
      >
        {readLabel} <ArrowUpRight size={15} />
      </Link>
    </article>
  );
}
