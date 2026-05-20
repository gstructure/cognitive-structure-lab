import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { ArticleComments } from "@/components/articles/ArticleComments";
import { ArticleShare } from "@/components/articles/ArticleShare";
import { ArticleSubscribeForm } from "@/components/articles/ArticleSubscribeForm";
import { Section } from "@/components/site/Section";
import { articleSchema, formatArticleDate, getArticleBySlug } from "@/lib/articles";
import { buildSeo, breadcrumbSchema, jsonLdScript, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/articulos/$slug")({
  head: ({ params }) => {
    const article = getArticleBySlug(params.slug);
    if (!article) {
      return {
        meta: buildSeo({
          path: "/articulos",
          title: "Artículo no encontrado | G-Structure",
          description: "El artículo solicitado no está disponible.",
        }),
      };
    }

    return {
      meta: buildSeo({
        path: `/articulos/${article.slug}`,
        title: `${article.title} | G-Structure`,
        description: article.excerpt,
        type: "article",
      }),
      links: [{ rel: "canonical", href: `${SITE_URL}/articulos/${article.slug}` }],
      scripts: [
        jsonLdScript(articleSchema(article)),
        jsonLdScript(
          breadcrumbSchema([
            { name: "Artículos", path: "/articulos" },
            { name: article.title, path: `/articulos/${article.slug}` },
          ]),
        ),
      ],
    };
  },
  component: ArticleDetail,
});

function ArticleDetail() {
  const { slug } = Route.useParams();
  const article = getArticleBySlug(slug);

  if (!article) {
    return (
      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Artículo no encontrado</p>
          <h1 className="mt-4 font-display text-4xl">No encontramos esa nota.</h1>
          <Link to="/articulos" className="mt-8 inline-flex items-center gap-2 text-sm font-medium">
            <ArrowLeft size={15} /> Volver a artículos
          </Link>
        </div>
      </Section>
    );
  }

  return (
    <>
      <Section className="pt-12 md:pt-18">
        <div className="mx-auto max-w-5xl">
          <Link to="/articulos" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
            <ArrowLeft size={15} /> Artículos
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
            <article>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted-foreground">
                <span className="eyebrow text-[10px]">{article.category}</span>
                <span aria-hidden>·</span>
                <time dateTime={article.publishedAt}>{formatArticleDate(article.publishedAt)}</time>
                <span aria-hidden>·</span>
                <span>{article.readMinutes} min</span>
              </div>
              <h1 className="mt-5 font-display text-4xl leading-[1.05] md:text-6xl">{article.title}</h1>
              {article.subtitle ? <p className="mt-4 text-lg font-medium text-foreground/70">{article.subtitle}</p> : null}
              <p className="mt-7 max-w-3xl text-lg leading-relaxed text-muted-foreground">{article.excerpt}</p>

              <div className="mt-12 space-y-6 text-[17px] leading-[1.85] text-foreground/82">
                {article.blocks.map((block, index) => {
                  if (block.type === "h2") {
                    return (
                      <h2 key={`${block.text}-${index}`} className="pt-8 font-display text-3xl leading-tight text-foreground">
                        {block.text}
                      </h2>
                    );
                  }
                  if (block.type === "quote") {
                    return (
                      <blockquote key={`${block.text}-${index}`} className="border-l-2 border-foreground bg-[color:var(--color-surface)] px-6 py-5 font-display text-2xl leading-snug text-foreground">
                        {block.text}
                      </blockquote>
                    );
                  }
                  return <p key={`${block.text}-${index}`}>{block.text}</p>;
                })}
              </div>

              <ArticleComments slug={article.slug} />
            </article>

            <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
              <ArticleShare article={article} />
              <ArticleSubscribeForm />
            </aside>
          </div>
        </div>
      </Section>
    </>
  );
}
