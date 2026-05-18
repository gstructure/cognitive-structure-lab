import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { Eyebrow } from "@/components/site/Eyebrow";
import { CTALink, CTAExternal } from "@/components/site/CTAButton";
import etwBadge from "@/assets/etw-2026-badge.webp";
import { buildSeo, canonicalLink, jsonLdScript, breadcrumbSchema, SITE_URL } from "@/lib/seo";

const eventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Execution Diagnostic Workshop by G-Structure",
  description:
    "Workshop curated by G-Structure within Ecuador Tech Week 2026 to identify cognitive-behavioral patterns that block execution in professionals, founders, and teams.",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  url: "https://luma.com/lm4njhiu",
  location: { "@type": "Place", name: "Ecuador Tech Week 2026", address: { "@type": "PostalAddress", addressLocality: "Guayaquil", addressCountry: "EC" } },
  organizer: { "@type": "Organization", name: "G-Structure", url: SITE_URL },
};

export const Route = createFileRoute("/en/etw-2026-partners")({
  head: () => ({
    meta: buildSeo({
      path: "/en/etw-2026-partners",
      title: "ETW 2026 Partners | Diagnostic Workshop — G-Structure",
      description:
        "Partnership opportunities for brands, institutions, and companies in the G-Structure Execution Diagnostic Workshop during Ecuador Tech Week 2026 in Guayaquil.",
      image: etwBadge,
      locale: "en_US",
    }),
    links: canonicalLink("/en/etw-2026-partners"),
    scripts: [jsonLdScript(eventSchema), jsonLdScript(breadcrumbSchema([{ name: "Home", path: "/en" }, { name: "ETW 2026 Partners", path: "/en/etw-2026-partners" }]))],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-[color:var(--color-brand-soft)]/30">
        <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
        <div className="container-x relative py-20 md:py-28 lg:py-32">
          <div className="inline-flex items-center gap-2 border border-foreground/20 px-2.5 py-1 text-[10px] font-semibold tracking-[0.22em]">
            <span className="h-1.5 w-1.5 bg-foreground" /> PARTNERS · ETW 2026
          </div>
          <h1 className="mt-6 max-w-4xl font-display text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.05]">
            Be part of the Execution Diagnostic Workshop at Ecuador Tech Week 2026.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            G-Structure is opening partnership opportunities for brands, institutions, and companies
            that want to join the Execution Diagnostic Workshop during Ecuador Tech Week 2026 in Guayaquil.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <CTALink to="/en/contact" variant="primary">Become a partner</CTALink>
            <CTAExternal href="https://wa.me/593986875121" variant="outline">Talk to Guillermo</CTAExternal>
            <CTAExternal href="https://luma.com/lm4njhiu" variant="ghost">See official event ↗</CTAExternal>
          </div>
        </div>
      </section>
      <Section tone="muted">
        <h2 className="font-display text-3xl md:text-4xl leading-[1.08]">A serious conversation about execution, technology, and clarity.</h2>
        <p className="mt-5 max-w-3xl text-base md:text-lg text-muted-foreground leading-relaxed">
          On July 14, 2026, G-Structure will present the Execution Diagnostic Workshop as part of
          Ecuador Tech Week 2026: an experience designed to identify patterns that block action in
          professionals, entrepreneurs, and teams.
        </p>
      </Section>
    </>
  );
}
