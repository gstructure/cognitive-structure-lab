import { ArrowRight, Check, Brain, Users, LineChart, ShieldCheck } from "lucide-react";
import { Eyebrow } from "@/components/site/Eyebrow";
import { Section } from "@/components/site/Section";
import { SectionHeader } from "@/components/site/SectionHeader";
import { CTALink, CTAExternal } from "@/components/site/CTAButton";

const blockers = [
  "Procrastinación en tareas críticas",
  "Perfeccionismo que retrasa entregables",
  "Autosabotaje en momentos de alta visibilidad",
  "Síndrome del impostor en roles nuevos",
  "Sobreanálisis en la toma de decisiones",
  "Evitación de conversaciones difíciles",
];

const pilot = [
  "Diagnóstico inicial de fricción de ejecución del equipo.",
  "Acceso a KAIRON para el grupo piloto.",
  "Acompañamiento del método I-R-O aplicado al contexto real.",
  "Lectura agregada y anónima de patrones del equipo.",
  "Sesión de cierre con hallazgos y recomendaciones accionables.",
];

const forWho = [
  { icon: Users, t: "Talento humano", d: "Programas de desarrollo con evidencia conductual, no solo satisfacción." },
  { icon: Brain, t: "People & Culture", d: "Herramientas concretas para trabajar hábitos de ejecución y claridad." },
  { icon: LineChart, t: "Desarrollo organizacional", d: "Lectura de patrones que frenan la ejecución en equipos clave." },
  { icon: ShieldCheck, t: "Liderazgo", d: "Menos fricción entre decisión y acción en los roles de mayor impacto." },
];

export function KaironForTeamsPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-50" aria-hidden />
        <div className="container-x relative py-20 md:py-28 lg:py-32">
          <div className="max-w-4xl">
            <Eyebrow>KAIRON FOR TEAMS</Eyebrow>
            <h1 className="mt-6 text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.05]">
              Coaching cognitivo con IA para equipos que necesitan ejecutar.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              KAIRON ayuda a identificar y trabajar los bloqueos que aparecen antes de la
              acción: procrastinación, perfeccionismo, autosabotaje y síndrome del impostor.
            </p>
            <p className="mt-4 max-w-2xl text-sm md:text-base text-muted-foreground/90 leading-relaxed">
              El Corporate Pilot es el formato de entrada para áreas de talento humano,
              people &amp; culture y desarrollo organizacional que quieren probar KAIRON con un
              grupo real antes de escalar.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <CTALink to="/contacto" analyticsLabel="kairon_teams_hero_contact">
                Solicitar Corporate Pilot
              </CTALink>
              <CTAExternal href="https://wa.me/593986875121" variant="outline">
                Hablar con Guillermo
              </CTAExternal>
            </div>
          </div>
        </div>
      </section>

      <Section tone="muted">
        <SectionHeader
          eyebrow="EL PROBLEMA"
          title="El equipo sabe qué hacer. La fricción aparece justo antes de hacerlo."
          subtitle="No es falta de estrategia ni de talento: es lo que ocurre entre la decisión y la acción."
        />
        <div className="mt-12 grid gap-px bg-border md:grid-cols-3 border border-border">
          {blockers.map((item) => (
            <div key={item} className="bg-[color:var(--color-surface)] p-6">
              <h3 className="font-display text-base font-semibold">{item}</h3>
            </div>
          ))}
        </div>
      </Section>

      <Section id="corporate-pilot">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeader
              eyebrow="CORPORATE PILOT"
              title="Un piloto acotado, con lectura real del equipo."
              subtitle="Un grupo definido usa KAIRON durante el piloto mientras acompañamos la aplicación del método Identificar → Reencuadrar → Optimizar."
            />
            <div className="mt-8">
              <CTALink to="/contacto" analyticsLabel="kairon_teams_pilot_contact">
                Solicitar Corporate Pilot
              </CTALink>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="border border-border bg-[color:var(--color-surface)] p-8">
              <p className="eyebrow mb-5">Incluye</p>
              <ul className="space-y-3.5">
                {pilot.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-foreground/85">
                    <Check size={16} className="mt-0.5 shrink-0 text-foreground" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeader
          eyebrow="PARA QUIÉN"
          title="Diseñado para las áreas que responden por la ejecución de otros."
        />
        <div className="mt-12 grid gap-px bg-border sm:grid-cols-2 border border-border">
          {forWho.map(({ icon: Icon, t, d }) => (
            <div key={t} className="bg-[color:var(--color-surface)] p-6">
              <Icon size={18} className="text-foreground" />
              <h3 className="mt-4 font-display text-base font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16 items-center">
          <div className="lg:col-span-8">
            <Eyebrow>SIGUIENTE PASO</Eyebrow>
            <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-[2.5rem] leading-[1.08]">
              Empecemos por entender el patrón de ejecución de tu equipo.
            </h2>
            <p className="mt-5 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
              Conversamos el contexto, definimos el grupo piloto y acordamos qué se va a medir.
            </p>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <CTALink to="/contacto" analyticsLabel="kairon_teams_footer_contact">
              Agendar conversación
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </CTALink>
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <p className="max-w-3xl text-xs text-muted-foreground leading-relaxed">
          KAIRON es una herramienta de psicoeducación y coaching cognitivo-conductual aplicada a
          productividad profesional. No constituye diagnóstico, tratamiento ni atención clínica
          ni sustituye acompañamiento psicológico o médico.
        </p>
      </Section>
    </>
  );
}
