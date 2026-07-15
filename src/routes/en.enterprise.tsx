import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";
import { Section } from "@/components/site/Section";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Eyebrow } from "@/components/site/Eyebrow";
import { CTAExternal } from "@/components/site/CTAButton";
import { buildSeo, canonicalLink, jsonLdScript, breadcrumbSchema } from "@/lib/seo";
import etwBadge from "@/assets/etw-2026-badge.webp";
import { BookingDialog } from "@/components/booking/BookingDialog";
import { findPackage } from "@/lib/booking-catalog";

export const Route = createFileRoute("/en/enterprise")({
  head: () => ({
    meta: buildSeo({
      path: "/en/enterprise",
      title: "Execution Diagnostic Workshop | G-Structure Enterprise",
      description:
        "G-Structure's B2B workshop to diagnose execution friction in teams and open a clear path toward KAIRON.",
      image: etwBadge,
      locale: "en_US",
    }),
    links: canonicalLink("/en/enterprise"),
    scripts: [
      jsonLdScript(breadcrumbSchema([
        { name: "Home", path: "/en" },
        { name: "Enterprise", path: "/en/enterprise" },
      ])),
    ],
  }),
  component: Page,
});

function Page() {
  const workshopPkg = findPackage("enterprise-workshop") ?? null;
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <BookingDialog pkg={workshopPkg} open={bookingOpen} onOpenChange={setBookingOpen} />

      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-50" aria-hidden />
        <div className="container-x relative py-20 md:py-28 lg:py-32">
          <div className="max-w-4xl">
            <Eyebrow>G-STRUCTURE ENTERPRISE</Eyebrow>
            <h1 className="mt-6 text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.05]">
              Execution friction shows up inside teams too.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              A team can have talent, goals, and constant meetings while still getting
              caught in procrastination, overanalysis, perfectionism, or decisions that
              never become action.
            </p>
            <p className="mt-4 max-w-2xl text-sm md:text-base text-muted-foreground/90 leading-relaxed">
              The Execution Diagnostic Workshop is G-Structure's B2B entry point: it
              helps read the team's pattern, detect real friction, and connect those
              learnings back to KAIRON.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setBookingOpen(true)}
                className="group inline-flex items-center justify-center gap-2 px-5 py-3 text-[13px] font-medium tracking-wide bg-foreground text-background hover:opacity-90 transition-opacity"
              >
                Request workshop
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </button>
              <CTAExternal href="https://wa.me/593986875121" variant="outline">
                Talk to Guillermo
              </CTAExternal>
            </div>
          </div>
        </div>
      </section>

      <Section tone="muted">
        <SectionHeader
          eyebrow="THE PROBLEM"
          title="When a team is not executing, the problem is not always the strategy."
          subtitle="Sometimes the friction lives in how the team interprets pressure, decides priorities, avoids hard conversations, or turns clarity into follow-through."
        />
        <div className="mt-12 grid gap-px bg-border md:grid-cols-3 border border-border">
          {[
            "Meetings without behavioral output",
            "Delayed decisions",
            "Perfectionism that slows delivery",
            "Strategic overanalysis",
            "Lack of follow-through",
            "Avoidance of difficult conversations",
          ].map((item) => (
            <div key={item} className="bg-[color:var(--color-surface)] p-6">
              <h3 className="font-display text-base font-semibold">{item}</h3>
            </div>
          ))}
        </div>
      </Section>

      <Section id="workshop">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeader
              eyebrow="B2B WORKSHOP"
              title="Execution Diagnostic Workshop"
              subtitle="A strategic session to identify patterns that interfere with team execution, map cognitive and behavioral friction, and define a clear intervention path."
            />
            <div className="mt-8">
              <button
                type="button"
                onClick={() => setBookingOpen(true)}
                className="group inline-flex items-center justify-center gap-2 px-5 py-3 text-[13px] font-medium tracking-wide bg-foreground text-background hover:opacity-90 transition-opacity"
              >
                Request workshop
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="border border-border bg-[color:var(--color-surface)] p-8">
              <p className="eyebrow mb-5">Includes</p>
              <ul className="space-y-3.5">
                {[
                  "Initial context reading.",
                  "Identification of blocking patterns.",
                  "Execution friction mapping.",
                  "Guided team discussion.",
                  "Recommended intervention path.",
                  "Closing document with actionable findings.",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-foreground/85">
                    <Check size={16} className="mt-0.5 shrink-0 text-foreground" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16 items-center">
          <div className="lg:col-span-8">
            <Eyebrow>NEXT STEP</Eyebrow>
            <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-[2.5rem] leading-[1.08]">
              Before intervening in the team, we need to understand the pattern.
            </h2>
            <p className="mt-5 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
              The workshop helps identify where friction is emerging: starting,
              deciding, prioritizing, following through, or closing.
            </p>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <button
              type="button"
              onClick={() => setBookingOpen(true)}
              className="group inline-flex items-center justify-center gap-2 px-5 py-3 text-[13px] font-medium tracking-wide bg-foreground text-background hover:opacity-90 transition-opacity"
            >
              Book workshop
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </Section>
    </>
  );
}
