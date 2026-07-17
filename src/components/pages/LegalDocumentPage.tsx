import { Link } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { Eyebrow } from "@/components/site/Eyebrow";
import type { LegalDocument } from "@/lib/legalDocuments";

export function LegalDocumentPage({ document }: { document: LegalDocument }) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-background">
        <div className="absolute inset-0 grid-bg opacity-50" aria-hidden />
        <div className="container-x relative py-16 md:py-24">
          <Eyebrow>{document.eyebrow}</Eyebrow>
          <h1 className="mt-6 max-w-4xl font-display text-3xl leading-[1.05] md:text-5xl">
            {document.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {document.subtitle}
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-[0.18em] text-foreground/70">
            <span className="border border-border bg-[color:var(--color-surface)] px-3 py-2">
              {document.effectiveDate}
            </span>
            <span className="border border-border bg-[color:var(--color-surface)] px-3 py-2">
              Versión {document.version}
            </span>
          </div>
          {document.bindingNotice ? (
            <p className="mt-6 max-w-3xl border-l-2 border-[color:var(--color-brand)] pl-4 text-sm leading-relaxed text-foreground/80">
              {document.bindingNotice}
            </p>
          ) : null}
        </div>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <p className="eyebrow mb-4">Contenido</p>
              <nav className="divide-y divide-border border border-border bg-[color:var(--color-surface)]">
                {document.sections.map((section, index) => (
                  <a
                    key={section.title}
                    href={`#section-${index + 1}`}
                    className="block px-4 py-3 text-sm text-foreground/80 transition-colors hover:bg-[color:var(--color-brand-soft)]/40 hover:text-foreground"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <article className="lg:col-span-8">
            <div className="space-y-12 text-[15px] leading-relaxed text-foreground/90">
              {document.sections.map((section, index) => (
                <section key={section.title} id={`section-${index + 1}`} className="scroll-mt-28">
                  <h2 className="mb-4 font-display text-xl font-semibold text-foreground md:text-2xl">
                    {section.title}
                  </h2>
                  <div className="space-y-3">
                    {section.body?.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {section.items ? (
                      <ul className="list-disc space-y-2 pl-5">
                        {section.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </section>
              ))}

              <section className="scroll-mt-28 border-t border-border pt-10">
                <h2 className="mb-4 font-display text-xl font-semibold text-foreground md:text-2xl">
                  {document.sourcesTitle}
                </h2>
                <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                  {document.sources.map((source) => (
                    <li key={source}>{source}</li>
                  ))}
                </ul>
              </section>

              <div className="border border-border bg-[color:var(--color-surface)] p-5 text-sm">
                <p>{document.contactLabel}</p>
                <Link to={document.backPath} className="mt-4 inline-block underline underline-offset-4">
                  {document.backLabel}
                </Link>
              </div>
            </div>
          </article>
        </div>
      </Section>
    </>
  );
}
