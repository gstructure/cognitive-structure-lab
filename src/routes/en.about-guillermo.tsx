import { createFileRoute } from "@tanstack/react-router";
import { Eyebrow } from "@/components/site/Eyebrow";
import { CTALink, CTAExternal } from "@/components/site/CTAButton";
import { GuillermoPortrait } from "@/components/site/GuillermoPortrait";
import { SocialLinks } from "@/components/site/SocialLinks";
import portrait from "@/assets/guillermo-suco.png";
import { buildSeo, canonicalLink, jsonLdScript, personGuillermoSchema, breadcrumbSchema } from "@/lib/seo";

export const Route = createFileRoute("/en/about-guillermo")({
  head: () => ({
    meta: buildSeo({
      path: "/en/about-guillermo",
      title: "Guillermo Suco | Founder of G-Structure",
      description:
        "Guillermo Suco, CBT Coach Practitioner accredited by CTAA and founder of G-Structure. Psychology, educational intervention, and international project management.",
      image: portrait,
      type: "profile",
      locale: "en_US",
    }),
    links: canonicalLink("/en/about-guillermo"),
    scripts: [jsonLdScript(personGuillermoSchema), jsonLdScript(breadcrumbSchema([{ name: "Home", path: "/en" }, { name: "About Guillermo", path: "/en/about-guillermo" }]))],
  }),
  component: Page,
});

function Page() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 grid-bg opacity-50" aria-hidden />
      <div className="container-x relative py-20 md:py-28 lg:py-32 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-7">
          <Eyebrow>FOUNDER</Eyebrow>
          <h1 className="mt-6 font-display text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.05]">Guillermo Suco</h1>
          <p className="mt-3 font-display text-lg md:text-xl text-foreground/80">Founder & Coach · G-Structure</p>
          <p className="mt-6 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
            Guillermo Suco is the founder of G-Structure, an initiative focused on cognitive-behavioral
            coaching applied to execution in high-demand contexts.
          </p>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground leading-relaxed">
            His work integrates training in Psychology, Psychological Intervention in Development and
            Education, national and international teaching experience, individual coaching, multicultural
            project management, and digital product development.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CTAExternal href="https://wa.me/593986875121" variant="primary">Talk to Guillermo</CTAExternal>
            <CTALink to="/en/contact" variant="outline">Send a message</CTALink>
          </div>
          <div className="mt-8">
            <SocialLinks only={["instagram", "facebook", "linkedin", "whatsapp"]} />
          </div>
        </div>
        <div className="lg:col-span-5">
          <GuillermoPortrait caption="Guillermo Suco" subcaption="Founder · G-Structure" />
        </div>
      </div>
    </section>
  );
}
