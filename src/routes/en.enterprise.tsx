import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { Eyebrow } from "@/components/site/Eyebrow";
import { CTALink, CTAExternal } from "@/components/site/CTAButton";
import { buildSeo, canonicalLink, jsonLdScript, breadcrumbSchema } from "@/lib/seo";
import etwBadge from "@/assets/etw-2026-badge.png";

export const Route = createFileRoute("/en/enterprise")({
  head: () => ({
    meta: buildSeo({
      path: "/en/enterprise",
      title: "Enterprise Pilot | B2B validation for G-Struct",
      description:
        "G-Structure's B2B validation channel: diagnostic workshops and Enterprise pilots to map team execution patterns and feed the development of G-Struct.",
      image: etwBadge,
      locale: "en_US",
    }),
    links: canonicalLink("/en/enterprise"),
    scripts: [jsonLdScript(breadcrumbSchema([{ name: "Home", path: "/en" }, { name: "Enterprise", path: "/en/enterprise" }]))],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-50" aria-hidden />
        <div className="container-x relative py-20 md:py-28 lg:py-36">
          <Eyebrow>G-STRUCTURE ENTERPRISE</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.05]">
            When a team isn’t executing, the problem isn’t always the strategy.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            G-Structure Enterprise helps organizations, founders, and teams identify cognitive-behavioral
            patterns that block execution and convert them into clearer decisions, actions, and follow-through.
          </p>
          <p className="mt-4 max-w-2xl text-sm md:text-base text-muted-foreground/90 leading-relaxed">
            We design diagnostic workshops, pilot programs, and continuity processes for teams that need
            to act with greater precision, reduce internal friction, and sustain results.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <CTALink to="/en/contact" variant="primary">Request the Diagnostic Workshop</CTALink>
            <CTAExternal href="https://wa.me/593986875121" variant="outline">Talk to Guillermo</CTAExternal>
            <CTAExternal
              href="/downloads/reestructura-enterprise-onepager.pdf"
              download
              variant="ghost"
              withArrow={false}
            >
              Download one-pager (PDF)
            </CTAExternal>
          </div>
        </div>
      </section>

      <Section tone="muted">
        <h2 className="font-display text-3xl md:text-4xl leading-[1.08]">Three Enterprise tracks.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { t: "Diagnostic Workshop", d: "A strategic session designed to identify patterns that interfere with team execution, map cognitive-behavioral friction, and define a clear intervention path." },
            { t: "RESTRUCTURE Enterprise", d: "Multi-week program for teams that need to operate with more clarity, decision-making, and follow-through. Combines group sessions, applied work, and individual support." },
            { t: "Enterprise Continuity", d: "Monthly or quarterly follow-up to consolidate progress, review recurring patterns, and sustain change in execution after an initial intervention." },
          ].map((c) => (
            <div key={c.t} className="border border-border bg-background p-7">
              <h3 className="font-display text-lg font-semibold">{c.t}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{c.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Link to="/en/etw-2026-partners" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-foreground underline-offset-4 hover:underline">
            See partnership opportunities for ETW 2026 →
          </Link>
        </div>
      </Section>
    </>
  );
}
