import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { Eyebrow } from "@/components/site/Eyebrow";
import { CTALink } from "@/components/site/CTAButton";
import { buildSeo, canonicalLink, jsonLdScript, breadcrumbSchema } from "@/lib/seo";

export const Route = createFileRoute("/en/restructure-1-1")({
  head: () => ({
    meta: buildSeo({
      path: "/en/restructure-1-1",
      title: "RESTRUCTURE 1:1 | Individual validation of the I-R-O Method",
      description:
        "G-Structure's individual validation channel for applying the I-R-O Method with professionals, leaders, and entrepreneurs while feeding the development of G-Struct.",
      locale: "en_US",
    }),
    links: canonicalLink("/en/restructure-1-1"),
    scripts: [jsonLdScript(breadcrumbSchema([{ name: "Home", path: "/en" }, { name: "RESTRUCTURE 1:1", path: "/en/restructure-1-1" }]))],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-50" aria-hidden />
        <div className="container-x relative py-20 md:py-28 lg:py-36">
          <Eyebrow>RESTRUCTURE 1:1</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.05]">
            An individual process to intervene the patterns blocking your action.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            RESTRUCTURE 1:1 is a cognitive-behavioral coaching process for professionals, leaders,
            and entrepreneurs who need to work on their own execution patterns in a structured way.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <CTALink to="/en/contact" variant="primary">Book an initial conversation</CTALink>
          </div>
        </div>
      </section>
      <Section tone="muted">
        <h2 className="font-display text-3xl md:text-4xl leading-[1.08]">This is not therapy. It’s not surface-level motivation either.</h2>
        <p className="mt-5 max-w-3xl text-base md:text-lg text-muted-foreground leading-relaxed">
          RESTRUCTURE 1:1 combines individual sessions with applied work between sessions so the
          change translates into real behavior. The focus is professional execution, not clinical care.
        </p>
      </Section>
    </>
  );
}
