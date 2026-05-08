import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { Eyebrow } from "@/components/site/Eyebrow";
import { CTALink, CTAExternal } from "@/components/site/CTAButton";
import { buildSeo, canonicalLink, jsonLdScript, breadcrumbSchema } from "@/lib/seo";

const AREAS = [
  { t: "Product", d: "Design and definition of features for G-Struct, user research, and hypothesis validation." },
  { t: "Technology", d: "Development, prototyping, and architecture of the G-Struct app, alongside the ÉPICO technical team." },
  { t: "Sales", d: "B2B conversations with companies, founders, and teams to present Workshop, RESTRUCTURE Enterprise, and Continuity." },
  { t: "Marketing", d: "Brand strategy, editorial content, digital communication, and positioning of G-Structure and G-Struct." },
  { t: "International business", d: "Market opening, partnerships, and opportunities outside Ecuador for the ecosystem." },
];

export const Route = createFileRoute("/en/join-the-team")({
  head: () => ({
    meta: buildSeo({
      path: "/en/join-the-team",
      title: "Join the Team | G-Structure & G-Struct",
      description:
        "G-Structure is looking for volunteer collaborators in UI/UX, development, sales, marketing, and international business to build its next stage toward CodeLaunch 2026.",
      locale: "en_US",
    }),
    links: canonicalLink("/en/join-the-team"),
    scripts: [jsonLdScript(breadcrumbSchema([{ name: "Home", path: "/en" }, { name: "Join the team", path: "/en/join-the-team" }]))],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-50" aria-hidden />
        <div className="container-x relative py-20 md:py-28 lg:py-32">
          <Eyebrow>INITIAL TEAM</Eyebrow>
          <h1 className="mt-6 max-w-4xl font-display text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.05]">
            We are forming the team that will build the next stage of G-Structure.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            We are looking for volunteer collaborators in key areas to strengthen the next stage of
            the project: product, technology, sales, marketing, and international business.
          </p>
          <p className="mt-4 max-w-2xl text-base text-foreground/85 leading-relaxed">
            We aren’t looking for spectators. We’re looking for people with judgment, initiative, and
            the drive to build from an early stage.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <CTAExternal href="https://wa.me/593986875121" variant="primary">Talk to Guillermo</CTAExternal>
            <CTALink to="/en/contact" variant="outline">Send a message</CTALink>
          </div>
        </div>
      </section>
      <Section tone="muted">
        <h2 className="font-display text-3xl md:text-4xl leading-[1.08]">Areas where we’re looking for collaborators.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {AREAS.map((a) => (
            <div key={a.t} className="border border-border bg-background p-7">
              <h3 className="font-display text-lg font-semibold">{a.t}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{a.d}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 max-w-3xl text-sm text-muted-foreground leading-relaxed">
          Initial collaboration is voluntary, focused on real building, portfolio, applied learning,
          and possible continuity as the project advances.
        </p>
      </Section>
    </>
  );
}
