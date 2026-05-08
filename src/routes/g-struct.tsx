import { createFileRoute } from "@tanstack/react-router";
import { Eyebrow } from "@/components/site/Eyebrow";
import { CTALink, CTAExternal } from "@/components/site/CTAButton";
import { BrandMark } from "@/components/brand/Logo";
import { Check } from "lucide-react";
import { Timeline } from "@/components/site/Timeline";
import gStructEcosystem from "@/assets/g-struct-ecosystem.png";

export const Route = createFileRoute("/g-struct")({
  head: () => ({
    meta: [
      { title: "G-Struct | Capa tecnológica del método G-Structure" },
      {
        name: "description",
        content:
          "G-Struct es la herramienta digital en desarrollo del ecosistema G-Structure: registrar patrones, estructurar ejercicios CBT y sostener la práctica entre sesiones.",
      },
      { property: "og:title", content: "G-Struct | App del método I-R-O" },
      {
        property: "og:description",
        content:
          "La capa tecnológica del método G-Structure. Identificar, reencuadrar y optimizar, también desde una app.",
      },
    ],
  }),
  component: Page,
});

// G-Struct page uses brand blue + white as primary palette.

function Page() {
  return (
    <div className="bg-[color:var(--color-brand)] text-[color:var(--color-background)]">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[color:var(--color-background)]/15">
        <div className="absolute inset-0 grid-bg opacity-10" aria-hidden />
        <div className="container-x relative py-24 md:py-32 lg:py-40 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="text-[color:var(--color-background)]">
              <Eyebrow>
                <span className="text-[color:var(--color-background)]/70">G-STRUCT · EN DESARROLLO</span>
              </Eyebrow>
            </div>
            <h1 className="mt-6 font-display text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05]">
              La capa tecnológica del método G-Structure.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-[color:var(--color-background)]/80 leading-relaxed">
              G-Struct ayuda a registrar patrones, estructurar ejercicios cognitivo-conductuales,
              monitorear avances y sostener la práctica entre sesiones o programas.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <CTALink to="/contacto" variant="inverse">Sumarme a la lista de espera</CTALink>
              <CTAExternal
                href="https://wa.me/593986875121"
                variant="ghost"
                className="text-[color:var(--color-background)] hover:bg-[color:var(--color-background)]/10"
              >
                Hablar con el equipo
              </CTAExternal>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative border border-[color:var(--color-background)]/20 bg-[color:var(--color-brand-deep)] p-6 md:p-7">
              <div className="absolute inset-0 grid-bg opacity-15" aria-hidden />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BrandMark size={22} color="currentColor" />
                  <span className="font-display text-[10px] font-semibold tracking-[0.22em] opacity-80">
                    G-STRUCT · COGNITIVE OS
                  </span>
                </div>
                <span className="text-[10px] tracking-[0.22em] opacity-70">v0.1 · BETA</span>
              </div>
              <img
                src={gStructEcosystem}
                alt="Ecosistema de G-Struct: app móvil del Motor de Reestructuración, dashboard del Cognitive OS y vistas de KPI, radar y plan de acción."
                loading="lazy"
                width={1600}
                height={1100}
                className="relative mt-5 w-full h-auto object-contain"
              />
              <div className="relative mt-4 flex items-center justify-between border-t border-[color:var(--color-background)]/15 pt-4 text-[10px] tracking-[0.22em] opacity-80">
                <span>IDENTIFY · REFRAME · OPTIMIZE</span>
                <span>PROTOTYPE IN PROGRESS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IT IS */}
      <section className="bg-[color:var(--color-background)] text-[color:var(--color-foreground)] py-20 md:py-28">
        <div className="container-x">
          <div className="max-w-3xl">
            <Eyebrow>QUÉ ES G-STRUCT</Eyebrow>
            <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.08]">
              No es una app de productividad. Es la continuidad digital de un método.
            </h2>
            <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              G-Struct lleva la lógica del método I-R-O a una herramienta diaria. Está diseñada para
              acompañar el trabajo entre sesiones, ordenar la práctica cognitivo-conductual y dar
              continuidad real a los procesos individuales y de equipo.
            </p>
            <p className="mt-4 text-base md:text-lg text-foreground/85 leading-relaxed">
              La app no reemplaza el proceso humano. Lo extiende, lo ordena y lo vuelve más
              escalable.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-[color:var(--color-background)] text-[color:var(--color-foreground)] pb-24">
        <div className="container-x">
          <div className="grid gap-px bg-border md:grid-cols-2 border border-border">
            {[
              { t: "Registro de patrones", d: "Captura los pensamientos automáticos, creencias rígidas y conductas que interfieren con tu ejecución." },
              { t: "Ejercicios CBT estructurados", d: "Reencuadre cognitivo guiado, paso a paso, dentro del marco I-R-O." },
              { t: "Monitoreo de avances", d: "Seguimiento de fricciones recurrentes y consolidación de cambios sostenidos." },
              { t: "Continuidad entre sesiones", d: "Conecta el trabajo individual o de equipo con el proceso de coaching activo." },
            ].map((f) => (
              <div key={f.t} className="bg-[color:var(--color-surface)] p-7 md:p-9">
                <h3 className="font-display text-lg md:text-xl font-semibold">{f.t}</h3>
                <p className="mt-3 text-sm md:text-[15px] text-muted-foreground leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATUS + WAITLIST */}
      <section className="py-20 md:py-28 border-t border-[color:var(--color-background)]/15">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow>
              <span className="text-[color:var(--color-background)]/70">ESTADO ACTUAL</span>
            </Eyebrow>
            <h2 className="mt-4 font-display text-3xl md:text-4xl leading-[1.08]">
              Actualmente en desarrollo, junto a ÉPICO.
            </h2>
            <p className="mt-5 max-w-xl text-base md:text-lg text-[color:var(--color-background)]/80 leading-relaxed">
              G-Struct está siendo prototipada y construida como parte del ecosistema G-Structure.
              Si quieres ser parte temprana del producto, te abrimos un espacio en la lista de
              espera.
            </p>
            <div className="mt-8">
              <CTALink to="/contacto" variant="inverse">Sumarme a la lista de espera</CTALink>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="border border-[color:var(--color-background)]/25 p-8">
              <p className="text-[10px] tracking-[0.22em] text-[color:var(--color-background)]/70">ROADMAP</p>
              <ul className="mt-5 space-y-4 text-sm text-[color:var(--color-background)]/85">
                <li className="flex gap-3"><Check size={16} className="mt-0.5 shrink-0" /><span>Diseño de arquitectura cognitivo-conductual.</span></li>
                <li className="flex gap-3"><Check size={16} className="mt-0.5 shrink-0" /><span>Prototipo funcional inicial junto a ÉPICO.</span></li>
                <li className="flex gap-3 opacity-80"><span className="mt-1 h-2 w-2 shrink-0 border border-[color:var(--color-background)]/70" /><span>Beta cerrada con primeros usuarios y equipos.</span></li>
                <li className="flex gap-3 opacity-60"><span className="mt-1 h-2 w-2 shrink-0 border border-[color:var(--color-background)]/40" /><span>Lanzamiento público de v1.</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
