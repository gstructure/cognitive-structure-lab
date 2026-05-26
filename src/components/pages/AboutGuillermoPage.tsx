import { Section } from "@/components/site/Section";
import { Eyebrow } from "@/components/site/Eyebrow";
import { CTALink, CTAExternal } from "@/components/site/CTAButton";
import { Timeline } from "@/components/site/Timeline";
import { GuillermoPortrait } from "@/components/site/GuillermoPortrait";
import { SocialLinks } from "@/components/site/SocialLinks";
import type { Locale } from "@/lib/i18n";

const COPY = {
  es: {
    eyebrow: "FUNDADOR & CEO",
    role: "Fundador & CEO · G-Structure",
    creator: "Creador de G-Frame y del método I-R-O™",
    intro:
      "Guillermo Suco es fundador y CEO de G-Structure, la tech startup que construye G-Frame: una plataforma cognitivo-conductual de ejecución profesional impulsada por el método I-R-O™.",
    intro2:
      "Su trabajo integra formación en Psicología, Intervención Psicológica en el Desarrollo y la Educación, experiencia docente nacional e internacional, validación con usuarios, gerencia de proyectos multiculturales y desarrollo de producto digital.",
    talk: "Conversar con Guillermo",
    linkedin: "Conectar en LinkedIn",
    body: [
      <>
        El trabajo de Guillermo integra <strong className="text-foreground font-semibold">formación en Psicología</strong>,
        estudios en <strong className="text-foreground font-semibold">Intervención Psicológica en el Desarrollo y la Educación</strong>,
        experiencia docente nacional e internacional, acompañamiento individual y gerencia de proyectos en contextos multiculturales.
      </>,
      <>
        Como <strong className="text-foreground font-semibold">creador de G-Frame y del método I-R-O™</strong>,
        ha desarrollado G-Structure como una compañía de producto que usa principios cognitivo-conductuales para identificar, reencuadrar y optimizar patrones que interfieren con la acción.
      </>,
      <>
        Su experiencia en gerencia de proyectos a bordo del MV Logos Hope le permitió trabajar con equipos diversos en escenarios de alta exigencia, lo que más tarde se convertiría en parte del ADN de G-Structure: leer fricciones, intervenir patrones y construir ejecución sostenible incluso bajo presión real.
      </>,
      <>
        Junto a <strong className="text-foreground font-semibold">ÉPICO</strong> participó en el desarrollo y prototipado de G-Frame, el producto principal de G-Structure, como una extensión tecnológica del método I-R-O™.
      </>,
    ],
    timelineTitle: "Trayectoria",
    timeline: [
      { n: "FORMACIÓN", t: "Psicología e Intervención", d: "Formación en Psicología e Intervención Psicológica en el Desarrollo y la Educación.", status: "done" as const },
      { n: "ACREDITACIÓN", t: "CBT Coach Practitioner", d: "Acreditado por la Complementary Therapists Accredited Association (CTAA).", status: "done" as const },
      { n: "EDUCACIÓN", t: "Docencia y consejería", d: "Experiencia en docencia, consejería estudiantil y formación nacional e internacional.", status: "done" as const },
      { n: "INTERNACIONAL", t: "MV Logos Hope", d: "Gerencia de proyectos a bordo, en contextos multiculturales y de alta exigencia.", status: "done" as const },
      { n: "ACTUAL", t: "G-Structure & G-Frame", d: "Dirección metodológica del ecosistema. Desarrollo de G-Frame junto a ÉPICO.", status: "active" as const },
    ],
    connectEyebrow: "CONECTA CON GUILLERMO",
    connectTitle: "Sigue el desarrollo del ecosistema desde sus canales oficiales.",
    connectBody:
      "Puedes seguir el desarrollo de G-Structure, G-Frame y las próximas iniciativas del ecosistema a través de los canales oficiales de Guillermo.",
    channels: "Canales",
    finalTitle: "¿Quieres conversar directamente con Guillermo?",
    finalBody:
      "Una conversación inicial sirve para revisar tu contexto, definir si G-Structure es adecuado y proponer una ruta clara: workshop, proceso individual, intervención Enterprise o continuidad.",
    finalCta: "Agendar conversación",
    whatsapp: "WhatsApp directo",
    contactTo: "/contacto",
  },
  en: {
    eyebrow: "FOUNDER & CEO",
    role: "Founder & CEO · G-Structure",
    creator: "Creator of G-Frame and the I-R-O™ Method",
    intro:
      "Guillermo Suco is the founder and CEO of G-Structure, the tech startup building G-Frame: a cognitive-behavioral execution platform powered by the I-R-O™ Method.",
    intro2:
      "His work combines training in Psychology, Psychological Intervention in Development and Education, national and international teaching experience, user validation, multicultural project management, and digital product development.",
    talk: "Talk to Guillermo",
    linkedin: "Connect on LinkedIn",
    body: [
      <>
        Guillermo’s work brings together <strong className="text-foreground font-semibold">training in Psychology</strong>,
        studies in <strong className="text-foreground font-semibold">Psychological Intervention in Development and Education</strong>,
        national and international teaching experience, individual support, and project management in multicultural contexts.
      </>,
      <>
        As the <strong className="text-foreground font-semibold">creator of G-Frame and the I-R-O™ Method</strong>,
        he is building G-Structure as a product company that uses cognitive-behavioral principles to identify, reframe, and optimize patterns that interfere with action.
      </>,
      <>
        His project-management experience aboard the MV Logos Hope exposed him to diverse teams in high-pressure environments. That later became part of G-Structure’s DNA: reading friction, intervening patterns, and building sustainable execution under real pressure.
      </>,
      <>
        Together with <strong className="text-foreground font-semibold">ÉPICO</strong>, he worked on the development and prototyping of G-Frame, G-Structure’s main product, as a technological extension of the I-R-O™ Method.
      </>,
    ],
    timelineTitle: "Background",
    timeline: [
      { n: "TRAINING", t: "Psychology and Intervention", d: "Training in Psychology and Psychological Intervention in Development and Education.", status: "done" as const },
      { n: "ACCREDITATION", t: "CBT Coach Practitioner", d: "Accredited by the Complementary Therapists Accredited Association (CTAA).", status: "done" as const },
      { n: "EDUCATION", t: "Teaching and counseling", d: "Experience in teaching, student counseling, and national and international education.", status: "done" as const },
      { n: "INTERNATIONAL", t: "MV Logos Hope", d: "Project management aboard ship in multicultural, high-demand environments.", status: "done" as const },
      { n: "CURRENT", t: "G-Structure & G-Frame", d: "Methodological direction of the ecosystem. Development of G-Frame alongside ÉPICO.", status: "active" as const },
    ],
    connectEyebrow: "CONNECT WITH GUILLERMO",
    connectTitle: "Follow the ecosystem’s development through his official channels.",
    connectBody:
      "You can follow the development of G-Structure, G-Frame, and upcoming ecosystem initiatives through Guillermo’s official channels.",
    channels: "Channels",
    finalTitle: "Want to talk directly with Guillermo?",
    finalBody:
      "An initial conversation helps review your context, decide whether G-Structure is a fit, and define a clear path: workshop, individual process, Enterprise intervention, or continuity.",
    finalCta: "Book a conversation",
    whatsapp: "Direct WhatsApp",
    contactTo: "/en/contact",
  },
} as const;

export function AboutGuillermoPage({ locale }: { locale: Locale }) {
  const c = COPY[locale];

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-50" aria-hidden />
        <div className="container-x relative py-20 md:py-28 lg:py-32 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <Eyebrow>{c.eyebrow}</Eyebrow>
            <h1 className="mt-6 font-display text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.05]">
              Guillermo Suco
            </h1>
            <p className="mt-3 font-display text-lg md:text-xl text-foreground/80">
              {c.role}
              <span className="block text-sm md:text-base text-muted-foreground">{c.creator}</span>
            </p>
            <p className="mt-6 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">{c.intro}</p>
            <p className="mt-4 max-w-2xl text-base text-muted-foreground leading-relaxed">{c.intro2}</p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <CTAExternal href="https://wa.me/593986875121" variant="primary">{c.talk}</CTAExternal>
              <CTAExternal href="https://www.linkedin.com/in/guillermosuco" variant="outline">{c.linkedin}</CTAExternal>
            </div>
            <div className="mt-8">
              <SocialLinks only={["linkedin", "instagram", "whatsapp", "email"]} />
            </div>
          </div>
          <aside className="lg:col-span-5 flex justify-center lg:justify-end">
            <GuillermoPortrait size="lg" subcaption={locale === "en" ? "Founder & CEO · G-Frame" : "Fundador & CEO · G-Frame"} />
          </aside>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7 space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
            {c.body.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          </div>
          <aside className="lg:col-span-5">
            <div className="border border-border bg-[color:var(--color-surface)] p-8 shadow-elev-1">
              <p className="eyebrow mb-6">{c.timelineTitle}</p>
              <Timeline items={c.timeline} />
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="muted">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <Eyebrow>{c.connectEyebrow}</Eyebrow>
            <h2 className="mt-4 font-display text-3xl md:text-4xl leading-[1.08]">{c.connectTitle}</h2>
            <p className="mt-5 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">{c.connectBody}</p>
          </div>
          <div className="lg:col-span-5">
            <div className="border border-border bg-[color:var(--color-surface)] p-8">
              <p className="eyebrow mb-5">{c.channels}</p>
              <SocialLinks only={["linkedin", "instagram", "whatsapp", "email"]} />
              <ul className="mt-6 space-y-2 text-sm text-foreground/85">
                <li><span className="text-muted-foreground">LinkedIn · </span>Guillermo Suco</li>
                <li><span className="text-muted-foreground">Instagram · </span>@g.structurecbc</li>
                <li><span className="text-muted-foreground">WhatsApp · </span>+593 98 687 5121</li>
                <li><span className="text-muted-foreground">Email · </span>guillermo@g-structure.co</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="deep">
        <div className="max-w-3xl">
          <h2 className="font-display text-3xl md:text-4xl leading-[1.08]">{c.finalTitle}</h2>
          <p className="mt-5 text-base md:text-lg text-[color:var(--color-background)]/80 leading-relaxed">{c.finalBody}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CTALink to={c.contactTo} variant="inverse">{c.finalCta}</CTALink>
            <CTAExternal
              href="https://wa.me/593986875121"
              variant="ghost"
              className="text-[color:var(--color-background)] hover:bg-[color:var(--color-background)]/10"
            >
              {c.whatsapp}
            </CTAExternal>
          </div>
        </div>
      </Section>
    </>
  );
}
