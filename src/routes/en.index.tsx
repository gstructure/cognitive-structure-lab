import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/site/Section";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Eyebrow } from "@/components/site/Eyebrow";
import { CTALink } from "@/components/site/CTAButton";
import { MethodTabs } from "@/components/site/MethodTabs";
import { FAQ } from "@/components/site/FAQ";
import { buildSeo, canonicalLink, jsonLdScript, faqSchema, breadcrumbSchema } from "@/lib/seo";
import gStructHomePreview from "@/assets/g-struct-home-preview.png";

const HOME_FAQ_EN = [
  { q: "What is G-Structure?", a: "A cognitive-behavioral coaching practice applied to execution, for leaders, professionals, and teams who need to move past procrastination, perfectionism, overthinking, and self-sabotage." },
  { q: "Does G-Structure offer therapy?", a: "No. G-Structure is cognitive-behavioral coaching applied to professional execution. It does not replace clinical care or psychotherapy." },
  { q: "What is the I-R-O method?", a: "Identify, Reframe, and Optimize: a sequence to surface patterns that block action, reformulate them, and translate them into sustained functional behavior." },
  { q: "What is G-Struct?", a: "The technological layer of the G-Structure method: a digital tool in development for logging patterns, structuring exercises, and sustaining practice between sessions." },
];

export const Route = createFileRoute("/en/")({
  head: () => ({
    meta: buildSeo({
      path: "/en",
      title: "G-Structure | Cognitive-Behavioral Coaching for Execution",
      description:
        "Cognitive-behavioral coaching for leaders, professionals, and teams in Ecuador and LATAM. Identify, reframe, and optimize the patterns that block action.",
      image: gStructHomePreview,
      locale: "en_US",
    }),
    links: canonicalLink("/en"),
    scripts: [
      jsonLdScript(faqSchema(HOME_FAQ_EN)),
      jsonLdScript(breadcrumbSchema([{ name: "Home", path: "/en" }])),
    ],
  }),
  component: EnHome,
});

function EnHome() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
        <div className="container-x relative py-20 md:py-28 lg:py-32">
          <Eyebrow>G-STRUCTURE</Eyebrow>
          <h1 className="mt-5 max-w-3xl text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.04]">
            Execution does not fail only because of lack of discipline.
          </h1>
          <p className="mt-6 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
            G-Structure applies cognitive-behavioral coaching to help leaders, professionals, and
            teams identify, reframe, and optimize the patterns that block action.
          </p>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground/90 leading-relaxed">
            Procrastination, perfectionism, overthinking, self-sabotage, and execution blocks in
            high-demand professional contexts.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <CTALink to="/en/contact" variant="primary">Book an initial conversation</CTALink>
            <CTALink to="/en" hash="method" variant="outline">Explore the I-R-O method</CTALink>
          </div>
        </div>
      </section>

      <Section tone="muted">
        <SectionHeader
          eyebrow="THE PROBLEM"
          title="Capacity is not always missing. Friction is often the surplus."
          subtitle="Most professionals and teams know what they should do. They have goals, resources, information, and experience. But between intention and action there is an interference zone: rigid thinking, distorted risk reading, unproductive perfectionism, avoidance, decisions that get postponed too long."
        />
        <p className="mt-6 max-w-3xl text-base md:text-lg text-foreground leading-relaxed">
          G-Structure works exactly there: where cognition, emotion, and behavior begin to block
          execution.
        </p>
      </Section>

      <Section id="method" tone="deep" className="relative overflow-hidden">
        <div className="relative max-w-3xl">
          <p className="eyebrow text-[color:var(--color-background)]/70">THE METHOD</p>
          <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.05] text-[color:var(--color-background)]">
            We treat the mind as an operating system.
          </h2>
          <p className="mt-5 text-base md:text-lg text-[color:var(--color-background)]/80 leading-relaxed">
            We do not train motivation. We restructure the patterns that block action.
            Identify. Reframe. Optimize.
          </p>
        </div>
        <MethodTabs />
      </Section>

      <Section>
        <SectionHeader
          eyebrow="WHAT WE OFFER"
          title="Structured interventions for people and teams that need to execute better."
          subtitle="G-Structure operates through diagnostics, short programs, and continuity processes designed for high-demand professional contexts."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { t: "Enterprise", d: "Diagnostic Workshop, RESTRUCTURE Enterprise, and continuity for teams and organizations.", to: "/en/enterprise" as const },
            { t: "RESTRUCTURE 1:1", d: "Individual cognitive-behavioral process for professionals, leaders, and entrepreneurs.", to: "/en/restructure-1-1" as const },
            { t: "G-Struct", d: "Technological layer of the method: a tool in development with ÉPICO toward CodeLaunch 2026.", to: "/en/g-struct" as const },
          ].map((c) => (
            <Link
              key={c.t}
              to={c.to as string}
              className="group lift relative flex h-full flex-col border border-border bg-[color:var(--color-surface)] p-7 md:p-8 overflow-hidden"
            >
              <span className="absolute left-0 top-0 h-px w-12" style={{ background: "var(--color-brand)" }} aria-hidden />
              <h3 className="font-display text-xl font-semibold">{c.t}</h3>
              <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed">{c.d}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-foreground">
                Learn more <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeader eyebrow="MOMENTUM" title="Building the next stage of G-Structure." />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Link to="/en/etw-2026-partners" className="lift border border-border bg-background p-7">
            <p className="eyebrow">ETW 2026 PARTNERS</p>
            <h3 className="mt-4 font-display text-lg font-semibold">Partners for the Execution Diagnostic Workshop</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              We are opening partnership opportunities for brands and institutions joining the
              workshop during Ecuador Tech Week 2026 in Guayaquil.
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-foreground">
              Become a partner <ArrowRight size={14} />
            </span>
          </Link>
          <Link to="/en/join-the-team" className="lift border border-border bg-background p-7">
            <p className="eyebrow">INITIAL TEAM</p>
            <h3 className="mt-4 font-display text-lg font-semibold">We are forming the team that will build G-Structure and G-Struct</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Volunteer collaborators in product, technology, sales, marketing, and international
              business to build from an early stage.
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-foreground">
              Join the team <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="FREQUENT QUESTIONS"
          title="Before you book, this usually comes up."
          subtitle="Brief answers about the method, the processes, and the app."
        />
        <div className="mt-10">
          <FAQ />
        </div>
      </Section>

      <Section tone="deep">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] text-[color:var(--color-background)]">
              Let’s have a serious conversation about your execution.
            </h2>
            <p className="mt-5 max-w-2xl text-[color:var(--color-background)]/80 leading-relaxed">
              An initial conversation reviews your context and proposes the right path: diagnostic,
              individual process, Enterprise intervention, or continuity.
            </p>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <CTALink to="/en/contact" variant="inverse">Book an initial conversation</CTALink>
          </div>
        </div>
      </Section>
    </>
  );
}
