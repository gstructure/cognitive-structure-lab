import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/site/Section";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Eyebrow } from "@/components/site/Eyebrow";

import { CTALink, CTAExternal } from "@/components/site/CTAButton";
import { BrandMark } from "@/components/brand/Logo";
import logoCube from "@/assets/g-structure-cube.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "G-Structure | Coaching Cognitivo-Conductual para Ejecución" },
      {
        name: "description",
        content:
          "Coaching cognitivo-conductual para líderes, profesionales y equipos que buscan superar procrastinación, perfeccionismo y bloqueos de ejecución.",
      },
      { property: "og:title", content: "G-Structure | Coaching Cognitivo-Conductual para Ejecución" },
      {
        property: "og:description",
        content:
          "Identificar, reencuadrar y optimizar los patrones que bloquean la acción. Coaching aplicado a la ejecución.",
      },
    ],
  }),
  component: Index,
});

function Hero() {
  const steps = [
    { n: "01", t: "Identificar", d: "Patrones que bloquean la acción." },
    { n: "02", t: "Reencuadrar", d: "Lectura cognitivo-conductual aplicada." },
    { n: "03", t: "Optimizar", d: "Decisiones traducidas en conducta." },
  ];
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden="true" />
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(1200px 600px at 85% 10%, color-mix(in oklch, var(--color-brand) 10%, transparent), transparent 60%), radial-gradient(900px 500px at 0% 100%, color-mix(in oklch, var(--color-brand-deep) 8%, transparent), transparent 55%)",
        }}
      />
      <div
        className="absolute left-0 right-0 top-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, color-mix(in oklch, var(--color-brand) 30%, transparent), transparent)" }}
        aria-hidden="true"
      />

      <div className="container-x relative py-16 md:py-24 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10 lg:items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex flex-col items-start gap-1.5 border border-foreground/15 bg-[color:var(--color-surface)]/80 backdrop-blur px-3.5 py-2.5 shadow-[0_1px_0_0_rgba(5,50,90,0.04),0_8px_24px_-12px_rgba(5,50,90,0.18)]">
              <span className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.22em] text-foreground">
                <span className="h-1.5 w-1.5 bg-foreground" />
                HOST · ECUADOR TECH WEEK 2026
              </span>
              <span className="text-[11px] tracking-wide text-muted-foreground">
                Workshop de Diagnóstico de Ejecución · Julio 2026
              </span>
            </div>

            <Eyebrow className="mt-8">G-STRUCTURE</Eyebrow>
            <h1 className="mt-5 max-w-2xl text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.04] text-foreground">
              La ejecución no falla solo por falta de disciplina.
            </h1>
            <p className="mt-6 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
              G-Structure aplica coaching cognitivo-conductual para ayudar a líderes, profesionales y
              equipos a identificar, reencuadrar y optimizar los patrones que bloquean la acción.
            </p>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground/90 leading-relaxed">
              Procrastinación, perfeccionismo, sobreanálisis, autosabotaje y bloqueo de ejecución en
              contextos profesionales de alta exigencia.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <CTALink to="/contacto" variant="primary">Agendar conversación inicial</CTALink>
              <CTALink to="/" hash="metodo" variant="outline">Conocer el método I-R-O</CTALink>
            </div>

            <div className="mt-12 grid gap-3 sm:grid-cols-3">
              {steps.map((s) => (
                <div
                  key={s.n}
                  className="group relative border border-border bg-[color:var(--color-surface)] p-4 transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-18px_rgba(5,50,90,0.35)]"
                >
                  <div
                    className="absolute left-0 top-0 h-px w-8"
                    style={{ background: "var(--color-brand)" }}
                    aria-hidden="true"
                  />
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-[11px] font-semibold tracking-[0.22em] text-muted-foreground">
                      {s.n}
                    </span>
                    <span className="font-display text-sm font-semibold text-foreground">
                      {s.t}
                    </span>
                  </div>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-muted-foreground">{s.d}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative lg:col-span-5 hidden lg:block">
            <HeroVisual />
          </div>
        </div>

        <div className="mt-14 lg:hidden">
          <HeroVisual compact />
        </div>
      </div>
    </section>
  );
}

function HeroVisual({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`relative ${compact ? "h-[360px]" : "h-[520px]"} w-full`}>
      <div className="absolute inset-0 border border-border bg-[color:var(--color-surface)]/60 backdrop-blur-sm" aria-hidden="true" />
      {[
        "top-2 left-2 border-t border-l",
        "top-2 right-2 border-t border-r",
        "bottom-2 left-2 border-b border-l",
        "bottom-2 right-2 border-b border-r",
      ].map((p) => (
        <span
          key={p}
          className={`pointer-events-none absolute h-3 w-3 border-foreground/40 ${p}`}
          aria-hidden="true"
        />
      ))}

      <div className="absolute inset-0 grid-bg opacity-50" aria-hidden="true" />

      <div
        className="absolute inset-x-6 top-6 h-[60%] rounded-full opacity-[0.18] blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--color-brand), transparent)" }}
        aria-hidden="true"
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={logoCube}
          alt=""
          aria-hidden="true"
          className={`${compact ? "h-44 w-44" : "h-72 w-72"} object-contain drop-shadow-[0_24px_40px_rgba(5,50,90,0.25)]`}
        />
      </div>

      <div className="absolute left-4 top-6 border border-border bg-[color:var(--color-surface)] px-2.5 py-1.5 shadow-[0_8px_24px_-16px_rgba(5,50,90,0.4)]">
        <span className="font-display text-[10px] font-semibold tracking-[0.22em] text-foreground">
          SISTEMA · I-R-O
        </span>
      </div>
      <div className="absolute right-4 top-16 border border-border bg-[color:var(--color-surface)] px-2.5 py-1.5 shadow-[0_8px_24px_-16px_rgba(5,50,90,0.4)]">
        <span className="font-display text-[10px] font-semibold tracking-[0.22em] text-foreground">
          COGNITIVO · CONDUCTUAL
        </span>
      </div>
      <div className="absolute bottom-6 left-6 border border-border bg-[color:var(--color-surface)] px-3 py-2 shadow-[0_8px_24px_-16px_rgba(5,50,90,0.4)]">
        <span className="block font-display text-[10px] font-semibold tracking-[0.22em] text-muted-foreground">
          EJECUCIÓN
        </span>
        <span className="block text-[12px] font-medium text-foreground">Patrones · Decisiones · Conducta</span>
      </div>
      <div className="absolute bottom-10 right-4 border border-foreground/20 bg-[color:var(--color-brand-deep)] px-3 py-2 text-[color:var(--color-background)] shadow-[0_12px_28px_-14px_rgba(5,50,90,0.55)]">
        <span className="block font-display text-[10px] font-semibold tracking-[0.22em] opacity-70">
          ETW 2026
        </span>
        <span className="block text-[12px] font-medium">Workshop · 14 Julio</span>
      </div>

      <svg className="absolute inset-0 h-full w-full pointer-events-none" aria-hidden="true">
        <defs>
          <linearGradient id="lineGrad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--color-brand)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--color-brand)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="22%" y1="20%" x2="50%" y2="50%" stroke="url(#lineGrad)" strokeWidth="1" />
        <line x1="78%" y1="28%" x2="50%" y2="50%" stroke="url(#lineGrad)" strokeWidth="1" />
        <line x1="28%" y1="82%" x2="50%" y2="50%" stroke="url(#lineGrad)" strokeWidth="1" />
        <line x1="80%" y1="78%" x2="50%" y2="50%" stroke="url(#lineGrad)" strokeWidth="1" />
      </svg>
    </div>
  );
}

function ETWBanner() {
  return (
    <section className="border-b border-border bg-[color:var(--color-brand-soft)]/30">
      <div className="container-x py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <div className="inline-flex items-center gap-2 border border-foreground/20 px-2.5 py-1 text-[10px] font-semibold tracking-[0.22em] text-foreground">
              <span className="h-1.5 w-1.5 bg-foreground" /> HOST 2026
            </div>
            <h2 className="mt-4 font-display text-2xl md:text-3xl font-semibold leading-tight">
              G-Structure será host de Ecuador Tech Week 2026.
            </h2>
            <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed">
              El 14 de julio, G-Structure presentará el Workshop de Diagnóstico de Ejecución como
              parte de Ecuador Tech Week 2026: una experiencia diseñada para identificar patrones
              que bloquean la acción en profesionales, emprendedores y equipos.
            </p>
          </div>
          <div className="md:col-span-4 flex flex-wrap gap-3 md:justify-end">
            <CTALink to="/enterprise" variant="primary">Conocer Enterprise</CTALink>
            <CTALink to="/contacto" variant="ghost">Info del workshop</CTALink>
          </div>
        </div>
      </div>
    </section>
  );
}

function Announcements() {
  return (
    <Section>
      <SectionHeader
        eyebrow="MOMENTUM"
        title="Construyendo la siguiente etapa de G-Structure."
        subtitle="Estamos abriendo espacios estratégicos para aliados y colaboradores que quieran ser parte del crecimiento inicial del ecosistema G-Structure."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <AnnouncementCard
          tag="ALIADOS ETW 2026"
          title="Aliados para el Workshop de Diagnóstico de Ejecución"
          body="G-Structure está abriendo oportunidades de alianza para marcas, instituciones y empresas que quieran vincularse al Workshop de Diagnóstico de Ejecución durante Ecuador Tech Week 2026."
          short="Buscamos aliados que entiendan el valor de apoyar conversaciones serias sobre ejecución, claridad, tecnología, emprendimiento y desarrollo profesional."
          cta="Quiero ser aliado"
          to="/aliados-etw-2026"
          micro="Espacios limitados para aliados estratégicos, experiencia, sede o contenido."
        />
        <AnnouncementCard
          tag="EQUIPO INICIAL"
          title="Estamos formando el equipo que construirá G-Structure y G-Struct"
          body="Buscamos colaboradores voluntarios en áreas clave para fortalecer la siguiente etapa del proyecto: producto, tecnología, ventas, marketing y negocios internacionales."
          short="No buscamos espectadores. Buscamos personas con criterio, iniciativa y ganas de construir desde una etapa temprana."
          cta="Quiero unirme al equipo"
          to="/unete-al-equipo"
          micro="Participación inicial voluntaria, con enfoque en construcción real, portafolio, aprendizaje aplicado y posible continuidad conforme el proyecto avance."
        />
      </div>
    </Section>
  );
}

function AnnouncementCard({
  tag, title, body, short, cta, to, micro,
}: { tag: string; title: string; body: string; short: string; cta: string; to: string; micro: string }) {
  return (
    <div className="flex flex-col border border-border bg-[color:var(--color-surface)] p-8 md:p-10">
      <span className="eyebrow">{tag}</span>
      <h3 className="mt-4 font-display text-xl md:text-2xl font-semibold leading-snug">{title}</h3>
      <p className="mt-4 text-sm md:text-[15px] text-muted-foreground leading-relaxed">{body}</p>
      <p className="mt-3 text-sm md:text-[15px] text-foreground/80 leading-relaxed">{short}</p>
      <div className="mt-8 flex-1" />
      <div className="flex items-center justify-between gap-4 border-t border-border pt-6">
        <p className="text-xs text-muted-foreground max-w-[60%]">{micro}</p>
        <Link
          to={to}
          className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-foreground"
        >
          {cta} <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}

function Problem() {
  const cards = [
    { t: "Procrastinación", d: "Cuando la acción se posterga aunque la tarea sea importante." },
    { t: "Perfeccionismo improductivo", d: "Cuando el estándar se vuelve una excusa elegante para no avanzar." },
    { t: "Sobreanálisis", d: "Cuando pensar más deja de aclarar y empieza a paralizar." },
    { t: "Autosabotaje", d: "Cuando la conducta contradice el objetivo que la persona dice querer." },
    { t: "Bloqueo de ejecución", d: "Cuando hay intención, pero no hay salida funcional a la acción." },
  ];
  return (
    <Section tone="muted">
      <SectionHeader
        eyebrow="EL PROBLEMA"
        title="No siempre falta capacidad. A veces sobra fricción."
        subtitle="Muchos profesionales y equipos saben lo que tienen que hacer. Tienen objetivos, recursos, información y experiencia. Pero entre la intención y la acción aparece una zona de interferencia: pensamientos rígidos, lectura distorsionada del riesgo, perfeccionismo improductivo, evitación o decisiones que se postergan demasiado."
      />
      <p className="mt-6 max-w-3xl text-base md:text-lg text-foreground leading-relaxed">
        G-Structure trabaja precisamente en esa zona: donde la cognición, la emoción y la conducta
        empiezan a bloquear la ejecución.
      </p>
      <div className="mt-12 grid gap-px bg-border md:grid-cols-3 lg:grid-cols-5 border border-border">
        {cards.map((c) => (
          <div key={c.t} className="bg-[color:var(--color-surface)] p-6">
            <h3 className="font-display text-base font-semibold">{c.t}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function MentalOS() {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <SectionHeader
            eyebrow="NUESTRA LECTURA"
            title="Tratamos la mente como un sistema operativo."
          />
          <div className="mt-8 space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
            <p>
              En contextos de alta exigencia, el problema no siempre está en la meta. Muchas veces
              está en el procesamiento: cómo se interpreta la presión, cómo se anticipa el error,
              cómo se evalúa el riesgo y cómo se convierte una decisión en conducta.
            </p>
            <p>
              Cuando ese sistema entra en fricción, la acción se distorsiona. G-Structure interviene
              sobre esos patrones para que la persona o el equipo pueda pensar con más claridad,
              decidir con más precisión y actuar con mayor consistencia.
            </p>
          </div>
        </div>
        <aside className="lg:col-span-5 flex">
          <blockquote className="relative flex-1 border-l-2 border-foreground p-8 md:p-10 bg-[color:var(--color-brand-soft)]/30">
            <BrandMark size={28} className="opacity-60" />
            <p className="mt-6 font-display text-xl md:text-2xl leading-snug text-foreground">
              El orden mental no es un lujo. Es la base de una acción clara, funcional y sostenible.
            </p>
          </blockquote>
        </aside>
      </div>
    </Section>
  );
}

function Method() {
  const steps = [
    {
      n: "01",
      t: "Identificar",
      d: "Detectamos los patrones que interfieren con la ejecución: pensamientos automáticos, creencias rígidas, evitación, estándares disfuncionales, ciclos de postergación y errores de procesamiento.",
      micro: "Primero se entiende el sistema. Luego se interviene.",
    },
    {
      n: "02",
      t: "Reencuadrar",
      d: "Aplicamos metodología cognitivo-conductual para reorganizar la lectura del problema, cuestionar interpretaciones improductivas y construir respuestas más funcionales.",
      micro: "No se trata de pensar positivo. Se trata de pensar con más precisión.",
    },
    {
      n: "03",
      t: "Optimizar",
      d: "Traducimos el ajuste cognitivo en decisiones, acciones y rutinas sostenibles. El objetivo no es solo entender el bloqueo, sino generar una salida clara hacia la acción.",
      micro: "La claridad debe terminar en conducta.",
    },
  ];
  return (
    <Section id="metodo" tone="deep">
      <div className="max-w-3xl">
        <p className="eyebrow text-[color:var(--color-background)]/70">EL MÉTODO</p>
        <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.08]">
          Identificar. Reencuadrar. Optimizar.
        </h2>
        <p className="mt-5 text-base md:text-lg text-[color:var(--color-background)]/75 leading-relaxed">
          Un framework estructurado para convertir fricción cognitivo-conductual en acción funcional.
        </p>
      </div>
      <div className="mt-14 grid gap-px bg-[color:var(--color-background)]/15 md:grid-cols-3 border border-[color:var(--color-background)]/15">
        {steps.map((s) => (
          <div key={s.n} className="bg-[color:var(--color-brand-deep)] p-8 md:p-10">
            <span className="font-display text-xs font-semibold tracking-[0.22em] text-[color:var(--color-background)]/60">
              {s.n} — {s.t.toUpperCase()}
            </span>
            <h3 className="mt-5 font-display text-2xl font-semibold">{s.t}</h3>
            <p className="mt-4 text-sm md:text-[15px] text-[color:var(--color-background)]/75 leading-relaxed">{s.d}</p>
            <p className="mt-6 pt-5 border-t border-[color:var(--color-background)]/15 text-xs italic text-[color:var(--color-background)]/60">
              {s.micro}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Solutions() {
  const items = [
    {
      t: "Workshop de Diagnóstico",
      d: "Sesión estratégica para identificar fricciones de ejecución en profesionales, líderes o equipos.",
      ideal: "Empresas, founders o equipos que necesitan entender qué está bloqueando la acción antes de diseñar una intervención.",
      cta: "Explorar workshop", to: "/enterprise",
    },
    {
      t: "REESTRUCTURA Enterprise",
      d: "Programa piloto de 4 semanas para trabajar patrones de procrastinación, perfeccionismo, sobreanálisis y autosabotaje en equipos.",
      ideal: "Organizaciones que necesitan mejorar claridad, toma de decisiones y consistencia conductual.",
      cta: "Solicitar información", to: "/enterprise",
    },
    {
      t: "REESTRUCTURA 1:1",
      d: "Proceso individual de coaching cognitivo-conductual para profesionales que necesitan intervenir sus propios bloqueos de ejecución.",
      ideal: "Líderes, emprendedores y profesionales que quieren trabajar su patrón personal de acción.",
      cta: "Conocer proceso individual", to: "/reestructura",
    },
    {
      t: "Continuidad Enterprise",
      d: "Seguimiento mensual o trimestral para consolidar avances, revisar patrones recurrentes y sostener cambios en la ejecución.",
      ideal: "Equipos que necesitan mantener el trabajo después de una intervención inicial.",
      cta: "Diseñar continuidad", to: "/enterprise",
    },
  ] as const;
  return (
    <Section>
      <SectionHeader
        eyebrow="SOLUCIONES"
        title="Intervenciones estructuradas para personas y equipos que necesitan ejecutar mejor."
        subtitle="G-Structure opera a través de diagnósticos, programas breves y procesos de continuidad diseñados para contextos profesionales de alta exigencia."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {items.map((it) => (
          <div key={it.t} className="flex flex-col border border-border bg-[color:var(--color-surface)] p-7 md:p-9">
            <h3 className="font-display text-xl md:text-2xl font-semibold">{it.t}</h3>
            <p className="mt-3 text-sm md:text-[15px] text-muted-foreground leading-relaxed">{it.d}</p>
            <div className="mt-5 border-t border-border pt-4">
              <p className="eyebrow mb-2">Ideal para</p>
              <p className="text-sm text-foreground/80 leading-relaxed">{it.ideal}</p>
            </div>
            <div className="mt-6 pt-2">
              <Link to={it.to} className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-foreground">
                {it.cta} <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function ForWhom() {
  const a = [
    "Profesionales con alta carga de decisión.",
    "Líderes que necesitan mayor claridad de acción.",
    "Founders que viven bajo presión constante.",
    "Equipos que postergan decisiones importantes.",
    "Organizaciones que quieren intervenir fricciones de ejecución sin caer en charlas motivacionales.",
  ];
  const b = [
    "Procrastinación en tareas críticas.",
    "Reuniones que no se traducen en acción.",
    "Perfeccionismo que retrasa entregables.",
    "Sobreanálisis en decisiones estratégicas.",
    "Desgaste por falta de claridad operativa.",
    "Patrones repetidos de bloqueo, evitación o autosabotaje.",
  ];
  return (
    <Section tone="muted">
      <SectionHeader
        eyebrow="APLICACIÓN"
        title="Diseñado para contextos donde pensar bien no basta: hay que ejecutar."
      />
      <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-16">
        <List title="G-Structure es para:" items={a} />
        <List title="Es especialmente útil cuando aparecen:" items={b} />
      </div>
      <p className="mt-12 max-w-3xl font-display text-xl md:text-2xl leading-snug text-foreground">
        El objetivo no es hacer más por hacer más. Es pensar, decidir y actuar con mayor precisión.
      </p>
    </Section>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="eyebrow mb-5">{title}</p>
      <ul className="space-y-4">
        {items.map((i) => (
          <li key={i} className="flex gap-3 border-b border-border pb-4">
            <span className="mt-2 h-1 w-3 shrink-0 bg-foreground" />
            <span className="text-sm md:text-[15px] text-foreground/85 leading-relaxed">{i}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function GStructBridge() {
  return (
    <Section tone="white">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <SectionHeader
            eyebrow="CONTINUIDAD Y ESCALABILIDAD"
            title="G-Struct: la capa tecnológica del método."
          />
          <div className="mt-8 space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
            <p>
              G-Struct es la herramienta digital en desarrollo que acompaña la continuidad del modelo
              G-Structure. Su propósito es ayudar a registrar patrones, estructurar ejercicios
              cognitivo-conductuales, monitorear avances y sostener la práctica entre sesiones o
              programas.
            </p>
            <p>La app no reemplaza el proceso humano. Lo extiende, lo ordena y lo vuelve más escalable.</p>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <CTALink to="/g-struct" variant="primary">Conocer G-Struct</CTALink>
            <p className="text-xs text-muted-foreground">
              Actualmente en desarrollo como parte del ecosistema G-Structure.
            </p>
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="relative aspect-[4/5] border border-border bg-[color:var(--color-brand)] p-8 overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-10" aria-hidden="true" />
            <div className="relative flex h-full flex-col justify-between text-[color:var(--color-background)]">
              <BrandMark size={36} color="currentColor" />
              <div>
                <p className="text-[10px] tracking-[0.22em] opacity-70">G-STRUCT · v0.1</p>
                <p className="mt-3 font-display text-2xl md:text-3xl leading-tight">
                  Identificar. Reencuadrar. Optimizar. Ahora también en una capa digital.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Founder() {
  const credentials = [
    "CBT Coach Practitioner acreditado por CTAA.",
    "Formación en Psicología e Intervención Psicológica en el Desarrollo y la Educación.",
    "Experiencia en docencia, consejería estudiantil y formación.",
    "Experiencia en gerencia de proyectos internacionales a bordo del MV Logos Hope.",
    "Desarrollo y prototipado de G-Struct junto a ÉPICO.",
  ];
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <SectionHeader
            eyebrow="QUIÉN ESTÁ DETRÁS"
            title="Dirección metodológica con experiencia educativa, cognitivo-conductual y de proyectos."
          />
          <div className="mt-8 space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
            <p>
              <strong className="text-foreground font-semibold">Guillermo Suco</strong> es fundador
              de G-Structure y Coach especializado en procesos cognitivo-conductuales aplicados a la
              ejecución. Su trabajo integra formación en Psicología, Intervención Psicológica en el
              Desarrollo y la Educación, experiencia docente nacional e internacional, acompañamiento
              individual y gerencia de proyectos en contextos multiculturales.
            </p>
            <p>
              Como CBT Coach Practitioner acreditado por la Complementary Therapists Accredited
              Association, ha desarrollado G-Structure como una metodología orientada a identificar,
              reencuadrar y optimizar patrones que interfieren con la acción. También participó en el
              desarrollo y prototipado de G-Struct junto a ÉPICO, como parte de la visión tecnológica
              del ecosistema.
            </p>
          </div>
          <div className="mt-8">
            <CTALink to="/sobre-guillermo" variant="outline">Conversar con Guillermo</CTALink>
          </div>
        </div>
        <aside className="lg:col-span-5">
          <div className="border border-border bg-[color:var(--color-surface)] p-8">
            <p className="eyebrow mb-5">Credenciales</p>
            <ul className="space-y-4">
              {credentials.map((c) => (
                <li key={c} className="flex gap-3 text-sm text-foreground/85 leading-relaxed border-b border-border pb-4 last:border-0 last:pb-0">
                  <span className="mt-2 h-1 w-3 shrink-0 bg-foreground" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </Section>
  );
}

function FinalCTA() {
  return (
    <Section tone="deep">
      <div className="max-w-3xl">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05]">
          Antes de intervenir la ejecución, hay que entender el patrón.
        </h2>
        <p className="mt-6 text-base md:text-lg text-[color:var(--color-background)]/80 leading-relaxed">
          Si tú, tu equipo o tu organización están enfrentando procrastinación, perfeccionismo,
          sobreanálisis o bloqueo de ejecución, el primer paso no es una charla motivacional. Es un
          diagnóstico claro.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <CTALink to="/contacto" variant="inverse">Agendar conversación inicial</CTALink>
          <CTAExternal href="https://wa.me/593986875121" variant="ghost" className="text-[color:var(--color-background)] hover:bg-[color:var(--color-background)]/10">
            Solicitar info por WhatsApp
          </CTAExternal>
        </div>
        <p className="mt-8 text-xs text-[color:var(--color-background)]/60 max-w-xl leading-relaxed">
          Una conversación inicial permite revisar si G-Structure es adecuado para tu contexto y qué
          ruta tendría más sentido: diagnóstico, proceso individual, intervención Enterprise o
          continuidad.
        </p>
      </div>
    </Section>
  );
}

function Index() {
  return (
    <>
      <Hero />
      <ETWBanner />
      <Announcements />
      <Problem />
      <MentalOS />
      <Method />
      <Solutions />
      <ForWhom />
      <GStructBridge />
      <Founder />
      <FinalCTA />
    </>
  );
}
