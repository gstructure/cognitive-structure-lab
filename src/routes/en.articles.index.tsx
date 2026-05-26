import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { ArticleSubscribeForm } from "@/components/articles/ArticleSubscribeForm";
import { Section } from "@/components/site/Section";
import { SectionHeader } from "@/components/site/SectionHeader";
import { articlesForLocale } from "@/lib/articles";
import { buildSeo, breadcrumbSchema, jsonLdScript, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/en/articles/")({
  head: () => ({
    meta: buildSeo({
      path: "/en/articles",
      title: "Articles | G-Structure",
      description:
        "Articles, founder notes, and product updates about G-Frame, the I-R-O™ method, and cognitive-behavioral execution.",
      locale: "en_US",
    }),
    links: [
      { rel: "canonical", href: `${SITE_URL}/en/articles` },
      { rel: "alternate", hrefLang: "es", href: `${SITE_URL}/articulos` },
      { rel: "alternate", hrefLang: "es-EC", href: `${SITE_URL}/articulos` },
      { rel: "alternate", hrefLang: "en", href: `${SITE_URL}/en/articles` },
      { rel: "alternate", hrefLang: "x-default", href: `${SITE_URL}/articulos` },
    ],
    scripts: [jsonLdScript(breadcrumbSchema([{ name: "Articles", path: "/en/articles" }]))],
  }),
  component: ArticlesIndexEn,
});

function ArticlesIndexEn() {
  const articles = articlesForLocale("en");
  const [primary, ...rest] = articles;

  return (
    <>
      <Section className="pt-14 md:pt-20">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="eyebrow">G-STRUCTURE ARTICLES</p>
            <h1 className="mt-5 max-w-4xl font-display text-4xl leading-[1.05] md:text-6xl">
              Ideas on execution, cognitive patterns, and the product we are building.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              This section gathers the thinking behind G-Frame: product notes, essays on the I-R-O™ method, and build-stage learnings.
            </p>
          </div>
          <ArticleSubscribeForm />
        </div>
      </Section>

      <Section tone="muted">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
          <article className="border border-border bg-background p-6 md:p-8">
            <p className="eyebrow text-[10px]">Featured article</p>
            <h2 className="mt-5 font-display text-3xl leading-tight md:text-4xl">{primary.title}</h2>
            {primary.subtitle ? <p className="mt-2 text-sm font-medium text-foreground/70">{primary.subtitle}</p> : null}
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">{primary.excerpt}</p>
            <Link
              to="/en/articles/$slug"
              params={{ slug: primary.slug }}
              className="mt-7 inline-flex items-center gap-2 bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Read now <ArrowRight size={15} />
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
          eyebrow="ARCHIVE"
          title="All articles"
          subtitle="An initial library for users and investors to understand the intellectual core of G-Frame."
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
