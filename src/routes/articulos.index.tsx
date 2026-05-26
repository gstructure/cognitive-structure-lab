import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { ArticleSubscribeForm } from "@/components/articles/ArticleSubscribeForm";
import { Section } from "@/components/site/Section";
import { SectionHeader } from "@/components/site/SectionHeader";
import { articlesForLocale } from "@/lib/articles";
import { buildSeo, jsonLdScript, breadcrumbSchema, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/articulos/")({
  head: () => ({
    meta: buildSeo({
      path: "/articulos",
      title: "Artículos | G-Structure",
      description:
        "Artículos, founder notes y updates sobre G-Frame, el método I-R-O™ y la ejecución cognitivo-conductual.",
    }),
    links: [
      { rel: "canonical", href: `${SITE_URL}/articulos` },
      { rel: "alternate", hrefLang: "es", href: `${SITE_URL}/articulos` },
      { rel: "alternate", hrefLang: "es-EC", href: `${SITE_URL}/articulos` },
      { rel: "alternate", hrefLang: "en", href: `${SITE_URL}/en/articles` },
      { rel: "alternate", hrefLang: "x-default", href: `${SITE_URL}/articulos` },
    ],
    scripts: [jsonLdScript(breadcrumbSchema([{ name: "Artículos", path: "/articulos" }]))],
  }),
  component: ArticlesIndex,
});

function ArticlesIndex() {
  const articles = articlesForLocale("es");
  const [primary, ...rest] = articles;

  return (
    <>
      <Section className="pt-14 md:pt-20">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="eyebrow">G-STRUCTURE ARTICLES</p>
            <h1 className="mt-5 max-w-4xl font-display text-4xl leading-[1.05] md:text-6xl">
              Ideas sobre ejecución, patrones cognitivos y el producto que estamos construyendo.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Esta sección concentra el pensamiento detrás de G-Frame: notas de producto, ensayos del método I-R-O™ y aprendizajes de construcción.
            </p>
          </div>
          <ArticleSubscribeForm />
        </div>
      </Section>

      <Section tone="muted">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
          <article className="border border-border bg-background p-6 md:p-8">
            <p className="eyebrow text-[10px]">Artículo destacado</p>
            <h2 className="mt-5 font-display text-3xl leading-tight md:text-4xl">{primary.title}</h2>
            {primary.subtitle ? <p className="mt-2 text-sm font-medium text-foreground/70">{primary.subtitle}</p> : null}
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">{primary.excerpt}</p>
            <Link
              to="/articulos/$slug"
              params={{ slug: primary.slug }}
              className="mt-7 inline-flex items-center gap-2 bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Leer ahora <ArrowRight size={15} />
            </Link>
          </article>
          <div className="grid gap-4">
            {rest.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="ARCHIVO"
          title="Todos los artículos"
          subtitle="Una biblioteca inicial para que usuarios e inversionistas entiendan el corazón intelectual de G-Frame."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </Section>
    </>
  );
}
