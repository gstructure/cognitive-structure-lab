import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Eyebrow } from "@/components/site/Eyebrow";
import { CTALink, CTAExternal } from "@/components/site/CTAButton";

export const Route = createFileRoute("/unete-al-equipo")({
  head: () => ({
    meta: [
      { title: "Únete al equipo | G-Structure & G-Struct" },
      {
        name: "description",
        content:
          "Buscamos colaboradores voluntarios para construir la siguiente etapa de G-Structure y G-Struct: producto, tecnología, ventas, marketing y negocios internacionales.",
      },
      { property: "og:title", content: "Únete al equipo G-Structure" },
      {
        property: "og:description",
        content: "Construye desde una etapa temprana el ecosistema G-Structure y G-Struct.",
      },
    ],
  }),
  component: Page,
});

const AREAS = [
  { t: "Producto", d: "Diseño y definición de funcionalidades para G-Struct, investigación con usuarios y validación de hipótesis." },
  { t: "Tecnología", d: "Desarrollo, prototipado y arquitectura de la app G-Struct, junto al equipo técnico de ÉPICO." },
  { t: "Ventas", d: "Conversaciones B2B con empresas, founders y equipos para presentar Workshop, REESTRUCTURA Enterprise y Continuidad." },
  { t: "Marketing", d: "Estrategia de marca, contenido editorial, comunicación digital y posicionamiento de G-Structure y G-Struct." },
  { t: "Negocios internacionales", d: "Apertura de mercados, alianzas y oportunidades fuera de Ecuador para el ecosistema." },
];

function Page() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-50" aria-hidden />
        <div className="container-x relative py-20 md:py-28 lg:py-32">
          <Eyebrow>EQUIPO INICIAL</Eyebrow>
          <h1 className="mt-6 max-w-4xl font-display text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.05]">
            Estamos formando el equipo que construirá G-Structure y G-Struct.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Buscamos colaboradores voluntarios en áreas clave para fortalecer la siguiente etapa del
            proyecto: producto, tecnología, ventas, marketing y negocios internacionales.
          </p>
          <p className="mt-4 max-w-2xl text-base text-foreground/85 leading-relaxed">
            No buscamos espectadores. Buscamos personas con criterio, iniciativa y ganas de
            construir desde una etapa temprana.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <CTALink to="/contacto" variant="primary">Quiero unirme al equipo</CTALink>
            <CTAExternal href="https://wa.me/593986875121" variant="outline">WhatsApp directo</CTAExternal>
          </div>
        </div>
      </section>

      <Section tone="muted">
        <SectionHeader eyebrow="ÁREAS ABIERTAS" title="Cinco frentes donde estamos sumando personas." />
        <div className="mt-12 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3 border border-border">
          {AREAS.map((a, i) => (
            <div key={a.t} className="bg-[color:var(--color-surface)] p-7">
              <span className="font-display text-xs font-semibold tracking-[0.22em] text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-lg md:text-xl font-semibold">{a.t}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{a.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeader
              eyebrow="QUÉ BUSCAMOS"
              title="Criterio, iniciativa y enfoque."
              subtitle="Personas que entiendan que construir desde temprano significa hacer, no solo opinar. Que valoren la metodología, la calidad del trabajo y el tipo de cultura que estamos construyendo."
            />
          </div>
          <div className="lg:col-span-6 border border-border bg-[color:var(--color-surface)] p-8">
            <p className="eyebrow mb-5">Qué se ofrece</p>
            <ul className="space-y-4 text-sm text-foreground/85">
              <li><strong className="text-foreground font-semibold">Construcción real.</strong> Trabajo aplicado sobre un proyecto en marcha.</li>
              <li><strong className="text-foreground font-semibold">Portafolio.</strong> Material y resultados verificables para tu trayectoria.</li>
              <li><strong className="text-foreground font-semibold">Aprendizaje aplicado.</strong> Exposición a metodología CBT, producto, marca y operación.</li>
              <li><strong className="text-foreground font-semibold">Posible continuidad.</strong> Espacios pagados o de equity conforme el proyecto avance.</li>
              <li><strong className="text-foreground font-semibold">Cultura sobria.</strong> Trabajo serio, sin ruido, con criterio profesional.</li>
            </ul>
          </div>
        </div>
        <p className="mt-10 max-w-3xl text-sm text-muted-foreground leading-relaxed">
          Participación inicial voluntaria, con enfoque en construcción real, portafolio,
          aprendizaje aplicado y posible continuidad conforme el proyecto avance.
        </p>
        <div className="mt-8">
          <CTALink to="/contacto" variant="primary">Postular ahora</CTALink>
        </div>
      </Section>
    </>
  );
}
