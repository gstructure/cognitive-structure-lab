import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { Eyebrow } from "@/components/site/Eyebrow";
import { CTALink, CTAExternal } from "@/components/site/CTAButton";
import { Timeline } from "@/components/site/Timeline";
import { GuillermoPortrait } from "@/components/site/GuillermoPortrait";
import { SocialLinks } from "@/components/site/SocialLinks";
import portrait from "@/assets/guillermo-suco.png";
import { buildSeo, canonicalLink, jsonLdScript, personGuillermoSchema, breadcrumbSchema } from "@/lib/seo";

export const Route = createFileRoute("/sobre-guillermo")({
  head: () => ({
    meta: buildSeo({
      path: "/sobre-guillermo",
      title: "Guillermo Suco | Fundador & CEO de G-Structure",
      description:
        "Guillermo Suco, Fundador & CEO de G-Structure, creador de G-Struct y del método I-R-O™. CBT Coach Practitioner acreditado por CTAA.",
      image: portrait,
      type: "profile",
    }),
    links: canonicalLink("/sobre-guillermo"),
    scripts: [
      jsonLdScript(personGuillermoSchema),
      jsonLdScript(breadcrumbSchema([
        { name: "Inicio", path: "/" },
        { name: "Sobre Guillermo", path: "/sobre-guillermo" },
      ])),
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-50" aria-hidden />
        <div className="container-x relative py-20 md:py-28 lg:py-32 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <Eyebrow>FUNDADOR & CEO</Eyebrow>
            <h1 className="mt-6 font-display text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.05]">
              Guillermo Suco
            </h1>
            <p className="mt-3 font-display text-lg md:text-xl text-foreground/80">
              Fundador & CEO · G-Structure
              <span className="block text-sm md:text-base text-muted-foreground">
                Creador de G-Struct y del método I-R-O™
              </span>
            </p>
            <p className="mt-6 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
              Guillermo Suco es fundador y CEO de G-Structure, la tech startup que construye
              G-Struct: una plataforma cognitivo-conductual de ejecución profesional impulsada
              por el método I-R-O™.
            </p>
            <p className="mt-4 max-w-2xl text-base text-muted-foreground leading-relaxed">
              Su trabajo integra formación en Psicología, Intervención Psicológica en el Desarrollo
              y la Educación, experiencia docente nacional e internacional, validación con usuarios,
              gerencia de proyectos multiculturales y desarrollo de producto digital.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <CTAExternal href="https://wa.me/593986875121" variant="primary">Conversar con Guillermo</CTAExternal>
              <CTAExternal href="https://www.linkedin.com/in/guillermosuco" variant="outline">Conectar en LinkedIn</CTAExternal>
            </div>
            <div className="mt-8">
              <SocialLinks only={["linkedin", "instagram", "whatsapp", "email"]} />
            </div>
          </div>
          <aside className="lg:col-span-5 flex justify-center lg:justify-end">
            <GuillermoPortrait size="lg" subcaption="Fundador & CEO · G-Struct" />
          </aside>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7 space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
            <p>
              El trabajo de Guillermo integra <strong className="text-foreground font-semibold">formación en Psicología</strong>,
              estudios en <strong className="text-foreground font-semibold">Intervención Psicológica en el Desarrollo y la Educación</strong>,
              experiencia docente nacional e internacional, acompañamiento individual y gerencia de
              proyectos en contextos multiculturales.
            </p>
            <p>
              Como <strong className="text-foreground font-semibold">creador de G-Struct y del método I-R-O™</strong>,
              ha desarrollado G-Structure como una compañía de producto que usa principios
              cognitivo-conductuales para identificar, reencuadrar y optimizar patrones que interfieren
              con la acción.
            </p>
            <p>
              Su experiencia en gerencia de proyectos a bordo del MV Logos Hope le permitió trabajar
              con equipos diversos en escenarios de alta exigencia, lo que más tarde se convertiría
              en parte del ADN de G-Structure: leer fricciones, intervenir patrones y construir
              ejecución sostenible incluso bajo presión real.
            </p>
            <p>
              Junto a <strong className="text-foreground font-semibold">ÉPICO</strong> participó en el desarrollo
              y prototipado de G-Struct, el producto principal de G-Structure, como una extensión
              tecnológica del método I-R-O™.
            </p>
          </div>

          <aside className="lg:col-span-5">
            <div className="border border-border bg-[color:var(--color-surface)] p-8 shadow-elev-1">
              <p className="eyebrow mb-6">Trayectoria</p>
              <Timeline
                items={[
                  { n: "FORMACIÓN", t: "Psicología e Intervención", d: "Formación en Psicología e Intervención Psicológica en el Desarrollo y la Educación.", status: "done" },
                  { n: "ACREDITACIÓN", t: "CBT Coach Practitioner", d: "Acreditado por la Complementary Therapists Accredited Association (CTAA).", status: "done" },
                  { n: "EDUCACIÓN", t: "Docencia y consejería", d: "Experiencia en docencia, consejería estudiantil y formación nacional e internacional.", status: "done" },
                  { n: "INTERNACIONAL", t: "MV Logos Hope", d: "Gerencia de proyectos a bordo, en contextos multiculturales y de alta exigencia.", status: "done" },
                  { n: "ACTUAL", t: "G-Structure & G-Struct", d: "Dirección metodológica del ecosistema. Desarrollo de G-Struct junto a ÉPICO.", status: "active" },
                ]}
              />
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="muted">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <Eyebrow>CONECTA CON GUILLERMO</Eyebrow>
            <h2 className="mt-4 font-display text-3xl md:text-4xl leading-[1.08]">
              Sigue el desarrollo del ecosistema desde sus canales oficiales.
            </h2>
            <p className="mt-5 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
              Puedes seguir el desarrollo de G-Structure, G-Struct y las próximas iniciativas del
              ecosistema a través de los canales oficiales de Guillermo.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="border border-border bg-[color:var(--color-surface)] p-8">
              <p className="eyebrow mb-5">Canales</p>
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
          <h2 className="font-display text-3xl md:text-4xl leading-[1.08]">
            ¿Quieres conversar directamente con Guillermo?
          </h2>
          <p className="mt-5 text-base md:text-lg text-[color:var(--color-background)]/80 leading-relaxed">
            Una conversación inicial sirve para revisar tu contexto, definir si G-Structure es
            adecuado y proponer una ruta clara: workshop, proceso individual, intervención
            Enterprise o continuidad.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CTALink to="/contacto" variant="inverse">Agendar conversación</CTALink>
            <CTAExternal
              href="https://wa.me/593986875121"
              variant="ghost"
              className="text-[color:var(--color-background)] hover:bg-[color:var(--color-background)]/10"
            >
              WhatsApp directo
            </CTAExternal>
          </div>
        </div>
      </Section>
    </>
  );
}
