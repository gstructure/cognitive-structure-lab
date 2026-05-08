import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { Eyebrow } from "@/components/site/Eyebrow";
import { Mail, ArrowUpRight } from "lucide-react";
import { SocialLinks } from "@/components/site/SocialLinks";
import { buildSeo, canonicalLink, jsonLdScript, breadcrumbSchema } from "@/lib/seo";

export const Route = createFileRoute("/en/contact")({
  head: () => ({
    meta: buildSeo({
      path: "/en/contact",
      title: "Contact | G-Structure",
      description:
        "Let’s talk about your context: diagnostic, RESTRUCTURE 1:1, Enterprise intervention, partnerships, or team. Email, WhatsApp, and direct form with G-Structure.",
      locale: "en_US",
    }),
    links: canonicalLink("/en/contact"),
    scripts: [jsonLdScript(breadcrumbSchema([{ name: "Home", path: "/en" }, { name: "Contact", path: "/en/contact" }]))],
  }),
  component: Page,
});

function Page() {
  const ROUTES = [
    { t: "Enterprise", d: "Workshop, RESTRUCTURE Enterprise, continuity for teams.", to: "/en/enterprise" },
    { t: "RESTRUCTURE 1:1", d: "Individual cognitive-behavioral process.", to: "/en/restructure-1-1" },
    { t: "G-Struct", d: "App in development. Waitlist or collaboration.", to: "/en/g-struct" },
    { t: "ETW 2026 Partners", d: "Partnerships for the Diagnostic Workshop.", to: "/en/etw-2026-partners" },
    { t: "Join the team", d: "Volunteer collaborators for the next stage.", to: "/en/join-the-team" },
  ];
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-50" aria-hidden />
        <div className="container-x relative py-20 md:py-28">
          <Eyebrow>CONTACT</Eyebrow>
          <h1 className="mt-6 max-w-3xl font-display text-4xl md:text-5xl leading-[1.05]">
            Before we intervene, we talk.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            An initial conversation helps us see whether G-Structure fits your context and which path
            makes most sense: diagnostic, individual process, Enterprise intervention, or continuity.
          </p>
        </div>
      </section>

      <Section tone="muted">
        <p className="eyebrow">CHOOSE YOUR PATH</p>
        <h2 className="mt-3 font-display text-3xl md:text-4xl leading-[1.08]">What brings you to G-Structure?</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {ROUTES.map((r) => (
            <Link key={r.to} to={r.to as string} className="lift group border border-border bg-background p-5">
              <h3 className="font-display text-base font-semibold">{r.t}</h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{r.d}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-medium text-foreground">
                Open <ArrowUpRight size={13} />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section>
        <p className="eyebrow">DIRECT CHANNELS</p>
        <h2 className="mt-3 font-display text-3xl md:text-4xl leading-[1.08]">Talk to Guillermo directly.</h2>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a href="https://wa.me/593986875121" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-foreground px-5 py-3 text-[13px] font-medium text-background">
            Message on WhatsApp
          </a>
          <a href="mailto:guillermo@g-structure.co" className="inline-flex items-center gap-2 border border-foreground/30 px-5 py-3 text-[13px] font-medium text-foreground hover:border-foreground">
            <Mail size={14} /> guillermo@g-structure.co
          </a>
        </div>
        <div className="mt-8">
          <SocialLinks only={["instagram", "facebook", "linkedin", "whatsapp"]} />
        </div>
      </Section>
    </>
  );
}
