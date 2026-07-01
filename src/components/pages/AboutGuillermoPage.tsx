import { Section } from "@/components/site/Section";
import { Eyebrow } from "@/components/site/Eyebrow";
import { CTALink, CTAExternal } from "@/components/site/CTAButton";
import { SocialLinks } from "@/components/site/SocialLinks";
import ecuadorMap from "@/assets/ecuador-south-america-map.webp";
import guillermoPhoto from "@/assets/guillermo-suco.webp";
import nathanaelPhoto from "@/assets/nathanael-guy.webp";
import type { Locale } from "@/lib/i18n";

type TeamMember = {
  name: string;
  role: string;
  photo: string;
  bio: string;
  facts: string[];
};

type StoryMoment = {
  date: string;
  title: string;
  body: string;
};

const COPY = {
  es: {
    eyebrow: "NOSOTROS",
    heroTitle: "Conoce al equipo detrás de KAIRON",
    heroBody:
      "Un equipo de profesionales, educadores y practitioners de coaching cognitivo-conductual construyendo herramientas para ayudar a las personas a desbloquear fricción mental y convertirla en ejecución clara.",
    quote:
      "A veces tienes que dejar de soñar para otros y empezar a construir para ti. Aun si tu mente te dice que no eres el indicado.",
    quoteBy: "Guillermo Suco",
    teamEyebrow: "EQUIPO FUNDADOR",
    teamTitle: "Dos miradas, un mismo problema: ejecución real.",
    members: [
      {
        name: "Guillermo Suco",
        role: "Fundador & CEO",
        photo: guillermoPhoto,
        bio:
          "Creador de KAIRON y del método I-R-O™. Integra formación en Psicología, estudios en Intervención Psicológica en el Desarrollo y la Educación, experiencia docente, gerencia de proyectos multiculturales y desarrollo de producto.",
        facts: [
          "CBT Coach Practitioner · CTAA",
          "Miembro de la Red de Gestores Educativos de CapacítateEC",
          "Dirección metodológica, producto y narrativa",
        ],
      },
      {
        name: "Nathanael Guy",
        role: "Líder Fundador de Descubrimiento de Clientes",
        photo: nathanaelPhoto,
        bio:
          "Graduado de Temple University en Educación Secundaria, con experiencia en enseñanza, atención al cliente y liderazgo de proyectos. Nathanael ayuda a KAIRON a mantenerse cerca de usuarios reales y de los patrones de ejecución que el producto busca resolver.",
        facts: [
          "Customer discovery y aprendizaje con usuarios",
          "Insight directo sobre procrastinación e impostor",
          "Puente entre experiencia educativa y validación de producto",
        ],
      },
    ] satisfies TeamMember[],
    storyEyebrow: "NUESTRA HISTORIA",
    storyTitle: "De una pregunta incómoda a un MVP activo.",
    storyIntro:
      "KAIRON nació de una pregunta simple: ¿qué pasaría si una persona pudiera tener guía cognitiva justo en el momento en que un pensamiento bloquea su ejecución?",
    moments: [
      {
        date: "Abril 2026",
        title: "La primera idea",
        body:
          "Guillermo imaginó una herramienta capaz de acompañar a una persona cuando una idea, miedo o pensamiento automático aparece en el peor momento. Esa intuición tomó forma en un sprint de prototipado con ÉPICO.",
      },
      {
        date: "Mayo 2026",
        title: "La primera prueba",
        body:
          "La idea mostró potencial, pero la experiencia no era suficiente. El aprendizaje fue claro: no bastaba con explicar el método; había que convertirlo en una ruta simple, usable y cercana.",
      },
      {
        date: "Junio 2026",
        title: "Customer discovery real",
        body:
          "Nathanael se sumó al equipo y lideró una segunda prueba con usuarios en Estados Unidos. La respuesta fue mejor, pero todavía había fricción. El producto volvió a pivotar.",
      },
      {
        date: "Julio 2026",
        title: "MVP activo",
        body:
          "KAIRON ya existe como MVP activo, alojado en AWS y listo para validarse con usuarios reales dentro del Workshop de Diagnóstico de Ejecución en Ecuador Tech Week.",
      },
    ] satisfies StoryMoment[],
    placeEyebrow: "DESDE ECUADOR",
    placeTitle: "Construido en Guayaquil para una región que necesita ejecutar mejor.",
    placeBody:
      "G-Structure nace en Guayaquil, Ecuador, dentro de una región con fuerte energía emprendedora y una necesidad clara: más estructura, más claridad y mejores herramientas para sostener la acción cuando la mente se bloquea.",
    placeNote:
      "KAIRON no intenta copiar productividad genérica. Parte de una realidad latinoamericana: muchas personas emprenden, lideran y crean bajo presión, pero necesitan apoyo práctico para pasar del insight al siguiente movimiento.",
    connectEyebrow: "CONECTA",
    connectTitle: "Sigue el desarrollo de G-Structure y KAIRON.",
    channels: "Canales",
    finalTitle: "¿Quieres conversar con nosotros?",
    finalBody:
      "Podemos revisar tu contexto y definir una ruta clara: KAIRON, workshop, proceso individual, intervención Enterprise, alianza o inversión.",
    finalCta: "Agendar conversación",
    whatsapp: "WhatsApp directo",
    contactTo: "/contacto",
  },
  en: {
    eyebrow: "ABOUT",
    heroTitle: "Meet the team behind KAIRON",
    heroBody:
      "A team of professionals, educators, and cognitive-behavioral coaching practitioners building tools that help people unlock mental friction and turn it into clear execution.",
    quote:
      "Sometimes you have to stop dreaming for others and start building for yourself. Even if your mind tells you you are not the one.",
    quoteBy: "Guillermo Suco",
    teamEyebrow: "FOUNDING TEAM",
    teamTitle: "Two perspectives, one real problem: execution.",
    members: [
      {
        name: "Guillermo Suco",
        role: "Founder & CEO",
        photo: guillermoPhoto,
        bio:
          "Creator of KAIRON and the I-R-O™ Method. His work combines training in Psychology, studies in Psychological Intervention in Development and Education, teaching experience, multicultural project management, and product development.",
        facts: [
          "CBT Coach Practitioner · CTAA",
          "Member of the CapacítateEC Network of Educational Managers",
          "Methodology, product, and narrative direction",
        ],
      },
      {
        name: "Nathanael Guy",
        role: "Founding Head of Customer Discovery",
        photo: nathanaelPhoto,
        bio:
          "A Temple University graduate in Secondary Education with experience in teaching, customer service, and project leadership. Nathanael helps KAIRON stay close to real users and the execution patterns the product is designed to solve.",
        facts: [
          "Customer discovery and user learning",
          "Firsthand insight into procrastination and impostor patterns",
          "Bridge between education experience and product validation",
        ],
      },
    ] satisfies TeamMember[],
    storyEyebrow: "OUR STORY",
    storyTitle: "From an uncomfortable question to a live MVP.",
    storyIntro:
      "KAIRON began with a simple question: what if a person could receive cognitive guidance exactly when a thought blocks execution?",
    moments: [
      {
        date: "April 2026",
        title: "The first idea",
        body:
          "Guillermo imagined a tool that could support someone when an idea, fear, or automatic thought appears at the worst possible moment. That intuition became a prototype sprint with ÉPICO.",
      },
      {
        date: "May 2026",
        title: "The first test",
        body:
          "The idea showed potential, but the experience was not enough. The learning was clear: explaining the method was not enough; it had to become a simple, usable, human route.",
      },
      {
        date: "June 2026",
        title: "Real customer discovery",
        body:
          "Nathanael joined the team and led a second test with users in the United States. The response was stronger, but friction remained. The product pivoted again.",
      },
      {
        date: "July 2026",
        title: "Live MVP",
        body:
          "KAIRON now exists as a live MVP, hosted on AWS and ready to be validated with real users inside the Execution Diagnostic Workshop at Ecuador Tech Week.",
      },
    ] satisfies StoryMoment[],
    placeEyebrow: "FROM ECUADOR",
    placeTitle: "Built in Guayaquil for a region that needs better execution.",
    placeBody:
      "G-Structure was born in Guayaquil, Ecuador, within a region with strong entrepreneurial energy and a clear need: more structure, more clarity, and better tools to sustain action when the mind gets blocked.",
    placeNote:
      "KAIRON is not trying to copy generic productivity. It starts from a Latin American reality: many people build, lead, and create under pressure, but need practical support to move from insight to the next action.",
    connectEyebrow: "CONNECT",
    connectTitle: "Follow the development of G-Structure and KAIRON.",
    channels: "Channels",
    finalTitle: "Want to talk with us?",
    finalBody:
      "We can review your context and define a clear path: KAIRON, workshop, individual process, Enterprise intervention, partnership, or investment.",
    finalCta: "Book a conversation",
    whatsapp: "Direct WhatsApp",
    contactTo: "/en/contact",
  },
} as const;

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <article className="group relative overflow-hidden border border-border bg-[color:var(--color-surface)] shadow-elev-1">
      <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-[color:var(--color-brand-deep)] p-4">
        <img
          src={member.photo}
          alt={member.name}
          width={720}
          height={540}
          loading="lazy"
          className="h-full w-full object-contain object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-6 md:p-7">
        <p className="eyebrow">{member.role}</p>
        <h3 className="mt-3 font-display text-2xl leading-tight md:text-3xl">{member.name}</h3>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">{member.bio}</p>
        <ul className="mt-6 space-y-2 text-sm text-foreground/85">
          {member.facts.map((fact) => (
            <li key={fact} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-foreground" />
              <span>{fact}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function StoryTimeline({ moments }: { moments: readonly StoryMoment[] }) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-2 hidden h-[calc(100%-1rem)] w-px bg-border md:left-1/2 md:block" aria-hidden />
      <div className="space-y-8">
        {moments.map((moment, index) => (
          <article
            key={moment.date}
            className={`relative grid gap-4 md:grid-cols-2 md:gap-10 ${index % 2 === 1 ? "md:[&>*:first-child]:col-start-2" : ""}`}
          >
            <div className={index % 2 === 1 ? "md:text-left" : "md:text-right"}>
              <div className="inline-flex border border-border bg-background px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {moment.date}
              </div>
              <h3 className="mt-3 font-display text-2xl leading-tight">{moment.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{moment.body}</p>
            </div>
            <span
              className="absolute left-4 top-2 hidden h-3 w-3 -translate-x-1/2 border border-foreground bg-background md:left-1/2 md:block"
              aria-hidden
            />
          </article>
        ))}
      </div>
    </div>
  );
}

export function AboutGuillermoPage({ locale }: { locale: Locale }) {
  const c = COPY[locale];

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-50" aria-hidden />
        <div className="container-x relative py-20 text-center md:py-28 lg:py-32">
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <h1 className="mx-auto mt-6 max-w-4xl font-display text-4xl leading-[1.02] md:text-6xl lg:text-7xl">
            {c.heroTitle}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-xl">
            {c.heroBody}
          </p>
        </div>
      </section>

      <Section>
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <Eyebrow>{c.teamEyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-3xl leading-[1.08] md:text-4xl">{c.teamTitle}</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {c.members.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>{c.storyEyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-3xl leading-[1.08] md:text-5xl">{c.storyTitle}</h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">{c.storyIntro}</p>
        </div>
        <div className="mx-auto mt-14 max-w-5xl">
          <StoryTimeline moments={c.moments} />
        </div>
        <figure className="mx-auto mt-14 max-w-2xl border-y border-border py-8 text-center">
          <blockquote className="font-display text-2xl leading-snug text-foreground md:text-3xl">
            "{c.quote}"
          </blockquote>
          <figcaption className="mt-4 text-sm text-muted-foreground">- {c.quoteBy}</figcaption>
        </figure>
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>{c.placeEyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-3xl leading-[1.08] md:text-5xl">{c.placeTitle}</h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">{c.placeBody}</p>
          <p className="mt-4 text-base leading-relaxed text-foreground/85">{c.placeNote}</p>
        </div>
        <div className="relative mx-auto mt-12 max-w-6xl overflow-hidden border border-border bg-[color:var(--color-brand-deep)] shadow-[0_34px_70px_-34px_rgba(5,50,90,0.55)]">
          <img
            src={ecuadorMap}
            alt={locale === "en" ? "South America map highlighting Ecuador and Guayaquil" : "Mapa de Sudamérica destacando Ecuador y Guayaquil"}
            loading="lazy"
            width={1920}
            height={914}
            className="block w-full object-cover"
          />
        </div>
      </Section>

      <Section tone="muted">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <Eyebrow>{c.connectEyebrow}</Eyebrow>
            <h2 className="mt-4 font-display text-3xl leading-[1.08] md:text-4xl">{c.connectTitle}</h2>
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
