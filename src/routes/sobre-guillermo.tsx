import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { Eyebrow } from "@/components/site/Eyebrow";
import { CTALink, CTAExternal } from "@/components/site/CTAButton";
import { Timeline } from "@/components/site/Timeline";

export const Route = createFileRoute("/sobre-guillermo")({
  head: () => ({
    meta: [
      { title: "Sobre Guillermo Suco | Fundador de G-Structure" },
      {
        name: "description",
        content:
          "Guillermo Suco, CBT Coach Practitioner acreditado por CTAA, fundador de G-Structure. Psicología, intervención educativa y gerencia internacional de proyectos.",
      },
      { property: "og:title", content: "Sobre Guillermo Suco — G-Structure" },
      {
        property: "og:description",
        content: "Dirección metodológica de G-Structure y G-Struct.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-50" aria-hidden />
        <div className="container-x relative py-20 md:py-28 lg:py-32 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <Eyebrow>SOBRE GUILLERMO</Eyebrow>
            <h1 className="mt-6 font-display text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.05]">
              Guillermo Suco. Fundador de G-Structure y dirección metodológica del ecosistema.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Coach especializado en procesos cognitivo-conductuales aplicados a la ejecución, con
              formación en Psicología, experiencia educativa internacional y gerencia de proyectos
              en contextos multiculturales.
            </p>
          </div>
          <aside className="lg:col-span-4">
            <div className="aspect-square border border-border bg-[color:var(--color-brand-soft)]/40 p-6 flex flex-col justify-end">
              <p className="font-display text-2xl leading-tight text-foreground">Guillermo Suco</p>
              <p className="mt-1 text-sm text-muted-foreground">
                CBT Coach Practitioner · CTAA acreditado
              </p>
            </div>
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
              Como <strong className="text-foreground font-semibold">CBT Coach Practitioner acreditado por la Complementary Therapists Accredited Association</strong>,
              ha desarrollado G-Structure como una metodología orientada a identificar, reencuadrar y
              optimizar patrones que interfieren con la acción.
            </p>
            <p>
              Su experiencia en gerencia de proyectos a bordo del MV Logos Hope le permitió trabajar
              con equipos diversos en escenarios de alta exigencia, lo que más tarde se convertiría
              en parte del ADN de G-Structure: leer fricciones, intervenir patrones y construir
              ejecución sostenible incluso bajo presión real.
            </p>
            <p>
              Junto a <strong className="text-foreground font-semibold">ÉPICO</strong> participó en el desarrollo
              y prototipado de G-Struct, la capa tecnológica del ecosistema, como una extensión
              natural del método.
            </p>
          </div>

          <aside className="lg:col-span-5">
            <div className="border border-border bg-[color:var(--color-surface)] p-8">
              <p className="eyebrow mb-5">Trayectoria</p>
              <ul className="space-y-5">
                {[
                  { t: "CBT Coach Practitioner", d: "Acreditado por la Complementary Therapists Accredited Association (CTAA)." },
                  { t: "Psicología e Intervención", d: "Formación en Psicología e Intervención Psicológica en el Desarrollo y la Educación." },
                  { t: "Educación", d: "Experiencia en docencia, consejería estudiantil y formación nacional e internacional." },
                  { t: "Gerencia internacional", d: "Gerencia de proyectos a bordo del MV Logos Hope, en contextos multiculturales." },
                  { t: "G-Struct", d: "Desarrollo y prototipado junto a ÉPICO." },
                ].map((c) => (
                  <li key={c.t} className="border-b border-border pb-4 last:border-0 last:pb-0">
                    <p className="font-display text-sm font-semibold">{c.t}</p>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{c.d}</p>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
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
