import { createFileRoute } from "@tanstack/react-router";
import { Eyebrow } from "@/components/site/Eyebrow";
import { CTALink, CTAExternal } from "@/components/site/CTAButton";
import { buildSeo, canonicalLink, jsonLdScript, breadcrumbSchema } from "@/lib/seo";
import gStructEcosystem from "@/assets/g-struct-ecosystem.png";

export const Route = createFileRoute("/en/g-struct")({
  head: () => ({
    meta: buildSeo({
      path: "/en/g-struct",
      title: "G-Struct | Digital Tool for Cognitive-Behavioral Coaching",
      description:
        "G-Struct is the app of the G-Structure method (I-R-O), a prototype in development with ÉPICO toward CodeLaunch LATAM 2026.",
      image: gStructEcosystem,
      locale: "en_US",
    }),
    links: canonicalLink("/en/g-struct"),
    scripts: [jsonLdScript(breadcrumbSchema([{ name: "Home", path: "/en" }, { name: "G-Struct", path: "/en/g-struct" }]))],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="bg-[color:var(--color-brand)] text-[color:var(--color-background)]">
      <section className="relative overflow-hidden border-b border-[color:var(--color-background)]/15">
        <div className="absolute inset-0 grid-bg opacity-10" aria-hidden />
        <div className="container-x relative py-24 md:py-32 lg:py-40 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <Eyebrow><span className="text-[color:var(--color-background)]/70">G-STRUCT · IN DEVELOPMENT</span></Eyebrow>
            <h1 className="mt-6 font-display text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05]">
              The technological layer of the G-Structure method.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-[color:var(--color-background)]/80 leading-relaxed">
              G-Struct helps log patterns, structure cognitive-behavioral exercises, monitor progress,
              and sustain practice between sessions or programs.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <CTALink to="/en/join-the-team" variant="inverse">Join the team</CTALink>
              <CTAExternal href="https://wa.me/593986875121" variant="outline">Talk to Guillermo</CTAExternal>
            </div>
          </div>
          <div className="lg:col-span-5">
            <img src={gStructEcosystem} alt="G-Struct ecosystem: mobile Restructuring Engine, Cognitive OS dashboard with KPIs, radar, and action plan." loading="lazy" className="w-full h-auto" />
          </div>
        </div>
      </section>
    </div>
  );
}
