import { Section } from "@/components/site/Section";
import { Eyebrow } from "@/components/site/Eyebrow";
import { CTALink, CTAExternal } from "@/components/site/CTAButton";
import { Timeline } from "@/components/site/Timeline";
import { GuillermoPortrait } from "@/components/site/GuillermoPortrait";
import { SocialLinks } from "@/components/site/SocialLinks";
import nathanaelPhoto from "@/assets/nathanael-guy.webp";
import type { Locale } from "@/lib/i18n";

const COPY = {
  es: {
    eyebrow: "NOSOTROS",
    role: "Fundador & CEO · G-Structure",
    creator: "Creador de KAIRON y del método I-R-O™",
    intro:
      "G-Structure es una tech startup ecuatoriana que construye KAIRON: un MVP activo de coaching cognitivo para ejecución profesional, impulsado por el método I-R-O™.",
    intro2:
      "La compañía combina metodología cognitivo-conductual, customer discovery, validación con usuarios y desarrollo de producto para ayudar a profesionales, founders y equipos a convertir fricción mental en acción clara.",
    quote:
      "A veces tienes que dejar de soñar para otros y empezar a construir para ti. Aun si tu mente te dice que no eres el indicado.",
    quoteBy: "Guillermo Suco",
    talk: "Conversar con Guillermo",
    linkedin: "Conectar en LinkedIn",
    body: [
      <>
        El trabajo de Guillermo integra <strong className="text-foreground font-semibold">formación en Psicología</strong>,
        estudios en <strong className="text-foreground font-semibold">Intervención Psicológica en el Desarrollo y la Educación</strong>,
        experiencia docente nacional e internacional, acompañamiento individual y gerencia de proyectos en contextos multiculturales.
      </>,
      <>
        Como <strong className="text-foreground font-semibold">creador de KAIRON y del método I-R-O™</strong>,
        desarrolla G-Structure como una compañía de producto que usa principios cognitivo-conductuales para identificar,
        reencuadrar y optimizar patrones que interfieren con la acción.
      </>,
      <>
        También es miembro de la <strong className="text-foreground font-semibold">Red de Gestores Educativos de CapacítateEC</strong>,
        una conexión pertinente para una compañía que cruza educación, tecnología, ejecución y cambio conductual aplicado.
      </>,
      <>
        Su experiencia en gerencia de proyectos a bordo del MV Logos Hope le permitió trabajar con equipos diversos en escenarios de alta exigencia,
        lo que más tarde se convertiría en parte del ADN de G-Structure: leer fricciones, intervenir patrones y construir ejecución sostenible incluso bajo presión real.
      </>,
    ],
    timelineTitle: "Trayectoria",
    timeline: [
      { n: "FORMACIÓN", t: "Psicología e Intervención", d: "Formación en Psicología e Intervención Psicológica en el Desarrollo y la Educación.", status: "done" as const },
      { n: "ACREDITACIÓN", t: "CBT Coach Practitioner", d: "Acreditado por la Complementary Therapists Accredited Association (CTAA).", status: "done" as const },
      { n: "EDUCACIÓN", t: "Docencia y gestión educativa", d: "Experiencia en docencia, consejería estudiantil, formación internacional y red de gestores educativos.", status: "done" as const },
      { n: "INTERNACIONAL", t: "MV Logos Hope", d: "Gerencia de proyectos a bordo, en contextos multiculturales y de alta exigencia.", status: "done" as const },
      { n: "ACTUAL", t: "G-Structure & KAIRON", d: "Dirección metodológica del ecosistema y desarrollo del MVP de KAIRON.", status: "active" as const },
    ],
    teamEyebrow: "EQUIPO FUNDADOR",
    teamTitle: "Construimos cerca del problema real.",
    teamBody:
      "KAIRON no se está construyendo desde una idea abstracta de productividad. Se alimenta de investigación con usuarios, patrones reales de ejecución, señales de mercado y aprendizaje directo con personas que viven procrastinación, impostor, perfeccionismo y autosabotaje.",
    guillermoTitle: "Fundador & CEO",
    guillermoBio:
      "Dirige la visión metodológica, producto y narrativa de G-Structure. Su foco es convertir principios cognitivo-conductuales en una experiencia clara, escalable y útil para ejecución profesional.",
    nathanaelTitle: "Líder Fundador de Descubrimiento de Clientes",
    nathanaelBio:
      "Graduado de Temple University en Educación Secundaria, con experiencia en enseñanza, atención al cliente y liderazgo de proyectos. Nathanael aporta criterio humano, curiosidad analítica e insight directo sobre procrastinación e impostor para mantener a KAIRON cerca de los usuarios reales.",
    connectEyebrow: "CONECTA CON G-STRUCTURE",
    connectTitle: "Sigue el desarrollo del ecosistema desde sus canales oficiales.",
    connectBody:
      "Puedes seguir el desarrollo de G-Structure, KAIRON y las próximas iniciativas del ecosistema a través de los canales oficiales.",
    channels: "Canales",
    finalTitle: "¿Quieres conversar directamente con nosotros?",
    finalBody:
      "Una conversación inicial sirve para revisar tu contexto, definir si G-Structure es adecuado y proponer una ruta clara: KAIRON, workshop, proceso individual, intervención Enterprise o alianza.",
    finalCta: "Agendar conversación",
    whatsapp: "WhatsApp directo",
    contactTo: "/contacto",
  },
  en: {
    eyebrow: "ABOUT",
    role: "Founder & CEO · G-Structure",
    creator: "Creator of KAIRON and the I-R-O™ Method",
    intro:
      "G-Structure is an Ecuadorian tech startup building KAIRON: a live MVP for cognitive execution coaching, powered by the I-R-O™ Method.",
    intro2:
      "The company combines cognitive-behavioral methodology, customer discovery, user validation, and product development to help professionals, founders, and teams turn mental friction into clear action.",
    quote:
      "Sometimes you have to stop dreaming for others and start building for yourself. Even if your mind tells you you are not the one.",
    quoteBy: "Guillermo Suco",
    talk: "Talk to Guillermo",
    linkedin: "Connect on LinkedIn",
    body: [
      <>
        Guillermo's work brings together <strong className="text-foreground font-semibold">training in Psychology</strong>,
        studies in <strong className="text-foreground font-semibold">Psychological Intervention in Development and Education</strong>,
        national and international teaching experience, individual support, and project management in multicultural contexts.
      </>,
      <>
        As the <strong className="text-foreground font-semibold">creator of KAIRON and the I-R-O™ Method</strong>,
        he is building G-Structure as a product company that uses cognitive-behavioral principles to identify,
        reframe, and optimize patterns that interfere with action.
      </>,
      <>
        He is also a member of the <strong className="text-foreground font-semibold">CapacítateEC Network of Educational Managers</strong>,
        a relevant bridge for a company working across education, technology, execution, and applied behavioral change.
      </>,
      <>
        His project-management experience aboard the MV Logos Hope exposed him to diverse teams in high-pressure environments.
        That later became part of G-Structure's DNA: reading friction, intervening patterns, and building sustainable execution under real pressure.
      </>,
    ],
    timelineTitle: "Background",
    timeline: [
      { n: "TRAINING", t: "Psychology and Intervention", d: "Training in Psychology and Psychological Intervention in Development and Education.", status: "done" as const },
      { n: "ACCREDITATION", t: "CBT Coach Practitioner", d: "Accredited by the Complementary Therapists Accredited Association (CTAA).", status: "done" as const },
      { n: "EDUCATION", t: "Teaching and education management", d: "Experience in teaching, student counseling, international education, and educational management networks.", status: "done" as const },
      { n: "INTERNATIONAL", t: "MV Logos Hope", d: "Project management aboard ship in multicultural, high-demand environments.", status: "done" as const },
      { n: "CURRENT", t: "G-Structure & KAIRON", d: "Methodological direction of the ecosystem and development of the KAIRON MVP.", status: "active" as const },
    ],
    teamEyebrow: "FOUNDING TEAM",
    teamTitle: "We build close to the real problem.",
    teamBody:
      "KAIRON is not being built from an abstract idea of productivity. It is informed by user research, real execution patterns, market signals, and direct learning with people who experience procrastination, impostor thoughts, perfectionism, and self-sabotage.",
    guillermoTitle: "Founder & CEO",
    guillermoBio:
      "Leads G-Structure's methodological vision, product direction, and narrative. His focus is turning cognitive-behavioral principles into a clear, scalable, useful execution experience.",
    nathanaelTitle: "Founding Head of Customer Discovery",
    nathanaelBio:
      "A Temple University graduate in Secondary Education with experience in teaching, customer service, and project leadership. Nathanael brings strong people skills, analytical curiosity, and firsthand insight into procrastination and impostor patterns, helping KAIRON stay close to real users.",
    connectEyebrow: "CONNECT WITH G-STRUCTURE",
    connectTitle: "Follow the ecosystem's development through its official channels.",
    connectBody:
      "You can follow the development of G-Structure, KAIRON, and upcoming ecosystem initiatives through the official channels.",
    channels: "Channels",
    finalTitle: "Want to talk directly with us?",
    finalBody:
      "An initial conversation helps review your context, decide whether G-Structure is a fit, and define a clear path: KAIRON, workshop, individual process, Enterprise intervention, or partnership.",
    finalCta: "Book a conversation",
    whatsapp: "Direct WhatsApp",
    contactTo: "/en/contact",
  },
} as const;

function TeamCard({
  image,
  name,
  role,
  body,
}: {
  image?: string;
  name: string;
  role: string;
  body: string;
}) {
  return (
    <article className="border border-border bg-[color:var(--color-surface)] p-5 shadow-elev-1">
      <div className="flex flex-col gap-5 sm:flex-row">
        <div className="shrink-0">
          {image ? (
            <img
              src={image}
              alt={name}
              width={180}
              height={180}
              loading="lazy"
              className="h-32 w-32 border border-border object-cover sm:h-36 sm:w-36"
            />
          ) : (
            <GuillermoPortrait size="sm" subcaption="" />
          )}
        </div>
        <div>
          <p className="eyebrow">{role}</p>
          <h3 className="mt-2 font-display text-2xl leading-tight">{name}</h3>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{body}</p>
        </div>
      </div>
    </article>
  );
}

export function AboutGuillermoPage({ locale }: { locale: Locale }) {
  const c = COPY[locale];

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-50" aria-hidden />
        <div className="container-x relative grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:items-center lg:gap-16 lg:py-32">
          <div className="lg:col-span-7">
            <Eyebrow>{c.eyebrow}</Eyebrow>
            <h1 className="mt-6 font-display text-4xl leading-[1.05] md:text-5xl lg:text-[3.25rem]">
              G-Structure
            </h1>
            <p className="mt-3 font-display text-lg text-foreground/80 md:text-xl">
              {c.role}
              <span className="block text-sm text-muted-foreground md:text-base">{c.creator}</span>
            </p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">{c.intro}</p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{c.intro2}</p>
            <figure className="mt-8 max-w-2xl border-l-2 border-foreground pl-5">
              <blockquote className="font-display text-xl leading-snug text-foreground md:text-2xl">
                "{c.quote}"
              </blockquote>
              <figcaption className="mt-3 text-sm text-muted-foreground">- {c.quoteBy}</figcaption>
            </figure>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <CTAExternal href="https://wa.me/593986875121" variant="primary">{c.talk}</CTAExternal>
              <CTAExternal href="https://www.linkedin.com/in/guillermosuco" variant="outline">{c.linkedin}</CTAExternal>
            </div>
          </div>
          <aside className="flex justify-center lg:col-span-5 lg:justify-end">
            <GuillermoPortrait size="lg" subcaption={locale === "en" ? "Founder & CEO · G-Structure" : "Fundador & CEO · G-Structure"} />
          </aside>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg lg:col-span-7">
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
        <div className="mb-10 max-w-3xl">
          <Eyebrow>{c.teamEyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-3xl leading-[1.08] md:text-4xl">{c.teamTitle}</h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">{c.teamBody}</p>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          <TeamCard
            name="Guillermo Suco"
            role={c.guillermoTitle}
            body={c.guillermoBio}
          />
          <TeamCard
            image={nathanaelPhoto}
            name="Nathanael Guy"
            role={c.nathanaelTitle}
            body={c.nathanaelBio}
          />
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <Eyebrow>{c.connectEyebrow}</Eyebrow>
            <h2 className="mt-4 font-display text-3xl leading-[1.08] md:text-4xl">{c.connectTitle}</h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">{c.connectBody}</p>
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
          <h2 className="font-display text-3xl leading-[1.08] md:text-4xl">{c.finalTitle}</h2>
          <p className="mt-5 text-base leading-relaxed text-[color:var(--color-background)]/80 md:text-lg">{c.finalBody}</p>
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
