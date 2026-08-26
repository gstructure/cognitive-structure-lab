import { KaironDocHeader, KaironDocFooter, MobileStickyCta } from "@/components/site/KaironDocChrome";
import { trackAcquisitionEvent, trackOutboundAppOpened } from "@/lib/analytics";
import { getLaunchPhase, kaironAppUrl } from "@/lib/launchConfig";
import { KAIRON_THEME } from "@/lib/kaironTheme";
import type { Locale } from "@/lib/i18n";

/**
 * Canonical /metodo-iro (and /en/iro-method) page — full dark-theme
 * recreation of the "Metodo I-R-O.dc.html" design handoff prototype.
 * This URL never moves and is not fragmented (see
 * design_handoff_gstructure_site/README.md). Standalone (own
 * header/footer, see the isStandalone check in __root.tsx).
 *
 * English copy translates intent, not words, per the handoff's
 * translation rules: KAIRON/G-Structure/Kai untranslated, "Método I-R-O™"
 * → "I-R-O™ Method" (initials kept so the acronym still works), the
 * three phases as Identify/Restructure/Optimize, the four patterns as
 * Procrastination/Perfectionism/Self-sabotage/Impostor syndrome.
 */

const ORANGE = KAIRON_THEME.accent;

type Phase = { letter: string; title: string; body: string; input: string; output: string; error: string };
type NotItem = { strong: string; rest: string };
type Pattern = { n: string; name: string; desc: string; anchor: string };
type Faq = { q: string; a: string };

type Copy = {
  breadcrumbSection: string;
  kicker: string;
  title: string;
  subtitle: string;
  byline: string;
  defKicker: string;
  defBody: string;
  originTitle: string;
  originP1: string;
  originP2: string;
  quote: string;
  phasesTitle: string;
  phases: Phase[];
  inputLabel: string;
  outputLabel: string;
  errorLabel: string;
  notTitle: string;
  notIntro: string;
  notItems: NotItem[];
  actsOnTitle: string;
  actsOnBody: string;
  patterns: Pattern[];
  bloqueosPath: string;
  faqTitle: string;
  faq: Faq[];
  finalTitle: string;
  finalSub: string;
  cta: string;
};

export const METODO_IRO_COPY: Record<Locale, Copy> = {
  es: {
    breadcrumbSection: "Metodología",
    kicker: "Documento de referencia",
    title: "El Método I-R-O™",
    subtitle: "Identificar, Reestructurar, Optimizar. El marco de tres fases con el que KAIRON interviene sobre la fricción de ejecución: la distancia entre saber qué hacer y hacerlo.",
    byline: "Desarrollado por Guillermo Suco, fundador de G-Structure · Última revisión: agosto de 2026",
    defKicker: "Definición",
    defBody: "El Método I-R-O™ es un protocolo de tres fases que interviene sobre el pensamiento que sostiene un bloqueo de ejecución, en el momento en que el bloqueo aparece. Primero identifica el patrón cognitivo activo, después reestructura la interpretación que lo mantiene, y finalmente convierte esa reestructuración en una acción concreta y verificable.",
    originTitle: "De dónde viene",
    originP1: "El método no inventa psicología. Toma tres operaciones que la terapia cognitivo-conductual documenta desde hace décadas —identificación de pensamientos automáticos, reestructuración cognitiva y activación conductual— y las traslada a un contexto donde nunca habían operado: el momento exacto del trabajo en que una persona se detiene.",
    originP2: "La aportación de I-R-O no es el contenido clínico. Es la latencia. Una sesión de terapia o de coaching ocurre días después del bloqueo, cuando la persona ya racionalizó lo que pasó y el material original se perdió. I-R-O se ejecuta en menos de cinco minutos, mientras el pensamiento todavía está disponible.",
    quote: "Un bloqueo de ejecución no se resuelve con más disciplina. Se resuelve desactivando la interpretación que lo hace razonable.",
    phasesTitle: "Las tres fases",
    phases: [
      {
        letter: "I", title: "Identificar",
        body: "La persona describe la situación en sus propias palabras. Kai no acepta la descripción superficial —\"no tengo tiempo\", \"todavía no está listo\"— y hace preguntas hasta llegar al pensamiento que realmente está operando debajo. El resultado de esta fase es un nombre: cuál de los cuatro patrones está activo y qué creencia específica lo sostiene.",
        input: "Una situación concreta en la que la persona se detuvo.",
        output: "El patrón nombrado y la creencia explícita que lo mantiene.",
        error: "Quedarse en la primera explicación. Casi nunca es la real.",
      },
      {
        letter: "R", title: "Reestructurar",
        body: "La creencia identificada se somete a prueba. No se sustituye por una afirmación positiva, se contrasta con evidencia: qué la sostiene, qué la contradice, qué pasaría realmente si fuera falsa. El objetivo no es que la persona se sienta mejor, es que la interpretación deje de resultarle obvia.",
        input: "La creencia nombrada en la fase anterior.",
        output: "Una lectura alternativa que la persona reconoce como más precisa.",
        error: "Confundir reestructuración con motivación. No son lo mismo.",
      },
      {
        letter: "O", title: "Optimizar",
        body: "La claridad que no se convierte en movimiento se disipa en horas. La fase final cierra con una acción de cinco minutos: concreta, verificable, y lo bastante pequeña como para que la excusa anterior ya no aplique. No es la tarea completa. Es el primer movimiento que rompe la inercia.",
        input: "La lectura alternativa validada.",
        output: "Una acción de cinco minutos, ejecutable ahora.",
        error: "Proponer una acción demasiado grande y reactivar el bloqueo.",
      },
    ],
    inputLabel: "Entrada", outputLabel: "Salida", errorLabel: "Error frecuente",
    notTitle: "Qué no es el Método I-R-O",
    notIntro: "Delimitar el alcance es parte de la definición. Un método que dice servir para todo no sirve para nada en particular.",
    notItems: [
      { strong: "No es terapia.", rest: " No trata trastornos, no sustituye atención clínica y no está indicado para cuadros de ansiedad o depresión diagnosticados. Interviene sobre conducta de ejecución en personas funcionales." },
      { strong: "No es gestión de tareas.", rest: " No organiza el trabajo ni prioriza. Asume que la persona ya sabe qué tiene que hacer, porque en la mayoría de los casos lo sabe." },
      { strong: "No es motivación.", rest: " No apela a la voluntad ni refuerza con frases de aliento. Un pensamiento que resiste la evidencia no cede ante el entusiasmo." },
      { strong: "No es un cuestionario.", rest: " No hay test de personalidad ni tipología fija. El patrón se identifica en cada situación, y la misma persona puede activar patrones distintos según el contexto." },
    ],
    actsOnTitle: "Sobre qué actúa",
    actsOnBody: "El método opera sobre cuatro patrones de bloqueo. Cada uno tiene una lógica interna distinta y requiere una reestructuración diferente.",
    patterns: [
      { n: "01", name: "Procrastinación", desc: "La tarea es clara, el inicio se posterga.", anchor: "procrastinacion" },
      { n: "02", name: "Perfeccionismo", desc: "Nada se entrega hasta que sea impecable.", anchor: "perfeccionismo" },
      { n: "03", name: "Autosabotaje", desc: "Decisiones que frenan el propio avance.", anchor: "autosabotaje" },
      { n: "04", name: "Síndrome del impostor", desc: "Capacidad real, confianza en duda.", anchor: "impostor" },
    ],
    bloqueosPath: "/bloqueos",
    faqTitle: "Preguntas frecuentes",
    faq: [
      { q: "¿Cuánto dura una sesión de I-R-O?", a: "Entre tres y cinco minutos. Si se alarga más, normalmente significa que la fase de identificación no cerró y conviene reiniciar el ciclo con una situación más específica." },
      { q: "¿Se puede aplicar sin KAIRON?", a: "Sí. El método es público y esta página lo documenta completo. KAIRON aporta lo que una persona sola no puede hacerse a sí misma: sostener las preguntas cuando la primera explicación resulta cómoda, y estar disponible en el momento del bloqueo y no cuando ya pasó." },
      { q: "¿Qué diferencia hay con la terapia cognitivo-conductual?", a: "El fundamento es compartido; el alcance y el contexto no. La TCC trata cuadros clínicos en sesiones programadas con un profesional. I-R-O interviene sobre conducta de ejecución laboral, en el momento, y sin diagnóstico de por medio." },
      { q: "¿Con qué frecuencia debería usarse?", a: "Cuando aparece el bloqueo, no en horario fijo. El método pierde efecto si se convierte en rutina programada: su valor está en la proximidad al momento en que la persona se detuvo." },
    ],
    finalTitle: "Leerlo es una cosa. Aplicarlo sobre tu propio bloqueo es otra.",
    finalSub: "Siete días de KAIRON, sin tarjeta. El método corriendo sobre tus situaciones reales.",
    cta: "Empezar prueba de 7 días",
  },
  en: {
    breadcrumbSection: "Methodology",
    kicker: "Reference document",
    title: "The I-R-O™ Method",
    subtitle: "Identify, Restructure, Optimize. The three-phase framework KAIRON uses to intervene on execution friction: the gap between knowing what to do and doing it.",
    byline: "Developed by Guillermo Suco, founder of G-Structure · Last revised: August 2026",
    defKicker: "Definition",
    defBody: "The I-R-O™ Method is a three-phase protocol that intervenes on the thought sustaining an execution block, at the moment the block appears. It first identifies the active cognitive pattern, then restructures the interpretation that maintains it, and finally turns that restructuring into a concrete, verifiable action.",
    originTitle: "Where it comes from",
    originP1: "The method doesn't invent psychology. It takes three operations cognitive-behavioral therapy has documented for decades — identifying automatic thoughts, cognitive restructuring, and behavioral activation — and moves them into a context where they'd never operated before: the exact moment in someone's work where they stop.",
    originP2: "I-R-O's contribution isn't clinical content. It's latency. A therapy or coaching session happens days after the block, once the person has already rationalized what happened and the original material is gone. I-R-O runs in under five minutes, while the thought is still available.",
    quote: "An execution block isn't solved with more discipline. It's solved by disarming the interpretation that makes it seem reasonable.",
    phasesTitle: "The three phases",
    phases: [
      {
        letter: "I", title: "Identify",
        body: "The person describes the situation in their own words. Kai doesn't accept the surface-level explanation — \"I don't have time,\" \"it's not ready yet\" — and keeps asking until it reaches the thought that's actually operating underneath. This phase ends with a name: which of the four patterns is active, and what specific belief is holding it up.",
        input: "A concrete situation where the person stopped.",
        output: "The named pattern and the explicit belief sustaining it.",
        error: "Stopping at the first explanation. It's almost never the real one.",
      },
      {
        letter: "R", title: "Restructure",
        body: "The identified belief gets tested. It isn't swapped for a positive affirmation — it's weighed against evidence: what supports it, what contradicts it, what would actually happen if it were false. The goal isn't for the person to feel better. It's for the interpretation to stop feeling obvious.",
        input: "The belief named in the previous phase.",
        output: "An alternative reading the person recognizes as more accurate.",
        error: "Confusing restructuring with motivation. They aren't the same thing.",
      },
      {
        letter: "O", title: "Optimize",
        body: "Clarity that doesn't turn into movement dissipates within hours. The final phase closes with a five-minute action: concrete, verifiable, and small enough that the earlier excuse no longer applies. It isn't the whole task. It's the first move that breaks the inertia.",
        input: "The validated alternative reading.",
        output: "A five-minute action, executable right now.",
        error: "Proposing an action too big, which reactivates the block.",
      },
    ],
    inputLabel: "Input", outputLabel: "Output", errorLabel: "Common error",
    notTitle: "What the I-R-O Method isn't",
    notIntro: "Defining the scope is part of the definition. A method that claims to work for everything doesn't work for anything in particular.",
    notItems: [
      { strong: "It isn't therapy.", rest: " It doesn't treat disorders, doesn't replace clinical care, and isn't indicated for diagnosed anxiety or depression. It intervenes on execution behavior in functional people." },
      { strong: "It isn't task management.", rest: " It doesn't organize work or set priorities. It assumes the person already knows what they need to do — because in most cases, they do." },
      { strong: "It isn't motivation.", rest: " It doesn't appeal to willpower or reinforce with encouragement. A thought that resists evidence doesn't give way to enthusiasm." },
      { strong: "It isn't a questionnaire.", rest: " There's no personality test or fixed typology. The pattern gets identified situation by situation, and the same person can activate different patterns depending on context." },
    ],
    actsOnTitle: "What it acts on",
    actsOnBody: "The method operates on four block patterns. Each has a distinct internal logic and requires a different restructuring.",
    patterns: [
      { n: "01", name: "Procrastination", desc: "The task is clear, starting keeps getting pushed back.", anchor: "procrastination" },
      { n: "02", name: "Perfectionism", desc: "Nothing ships until it's flawless.", anchor: "perfectionism" },
      { n: "03", name: "Self-sabotage", desc: "Decisions that stall your own progress.", anchor: "self-sabotage" },
      { n: "04", name: "Impostor syndrome", desc: "Real ability, confidence in doubt.", anchor: "impostor" },
    ],
    bloqueosPath: "/en/execution-blocks",
    faqTitle: "Frequently asked questions",
    faq: [
      { q: "How long does an I-R-O session take?", a: "Between three and five minutes. If it runs longer, that usually means the identification phase didn't close, and it's worth restarting the cycle with a more specific situation." },
      { q: "Can it be applied without KAIRON?", a: "Yes. The method is public, and this page documents it in full. What KAIRON adds is what a person can't do for themselves: holding the questions open when the first explanation is comfortable, and being available in the moment the block happens, not after it's already passed." },
      { q: "How is this different from cognitive-behavioral therapy?", a: "The foundation is shared; the scope and context aren't. CBT treats clinical conditions in scheduled sessions with a professional. I-R-O intervenes on work-execution behavior, in the moment, with no diagnosis involved." },
      { q: "How often should it be used?", a: "Whenever a block shows up, not on a fixed schedule. The method loses its effect if it becomes a scheduled routine: its value lies in how close it stays to the moment the person stopped." },
    ],
    finalTitle: "Reading it is one thing. Applying it to your own block is another.",
    finalSub: "Seven days of KAIRON, no card required. The method running on your real situations.",
    cta: "Start 7-day trial",
  },
};

function trackCta(locale: Locale, location: string) {
  trackAcquisitionEvent("section_cta_clicked", { cta_location: location, language: locale });
  trackOutboundAppOpened({ cta_location: location, language: locale });
}

export function MetodoIroPage({ locale = "es" }: { locale?: Locale }) {
  const c = METODO_IRO_COPY[locale];
  const navHref = kaironAppUrl(locale, "metodo_nav", getLaunchPhase());
  const finalHref = kaironAppUrl(locale, "metodo_final", getLaunchPhase());
  const mobileHref = kaironAppUrl(locale, "mobile_sticky", getLaunchPhase());
  const homePath = locale === "en" ? "/en" : "/";

  return (
    <div style={{ background: KAIRON_THEME.bg, color: KAIRON_THEME.text, overflowX: "hidden" }}>
      <KaironDocHeader locale={locale} current="metodo-iro" ctaHref={navHref} onCtaClick={() => trackCta(locale, "metodo_nav")} />

      <section style={{ padding: "clamp(56px,8vw,110px) clamp(18px,5vw,40px) clamp(40px,5vw,64px)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 9, alignItems: "center", fontSize: "12.5px", color: "rgba(245,243,240,0.4)", flexWrap: "wrap", whiteSpace: "nowrap" }}>
            <a href={homePath} className="iro-link">G-Structure</a>
            <span>/</span>
            <span>{c.breadcrumbSection}</span>
          </div>
          <div style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: ORANGE, marginTop: 26 }}>{c.kicker}</div>
          <h1 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(34px,5.6vw,62px)", lineHeight: 1.04, letterSpacing: "-0.025em", margin: "16px 0 0" }}>
            {c.title}
          </h1>
          <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "clamp(19px,2.3vw,26px)", lineHeight: 1.5, color: "rgba(245,243,240,0.8)", margin: "24px 0 0" }}>
            {c.subtitle}
          </p>
          <div style={{ fontSize: 13, color: "rgba(245,243,240,0.4)", marginTop: 24 }}>
            {c.byline}
          </div>
        </div>
      </section>

      <section style={{ padding: "0 clamp(18px,5vw,40px) clamp(56px,7vw,90px)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={{ background: KAIRON_THEME.surface, border: `1px solid ${KAIRON_THEME.accentTint}`, borderRadius: 16, padding: "clamp(26px,4vw,40px)" }}>
            <div style={{ fontSize: "11.5px", letterSpacing: "0.16em", textTransform: "uppercase", color: ORANGE }}>{c.defKicker}</div>
            <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "clamp(18px,2.1vw,23px)", lineHeight: 1.55, margin: "16px 0 0" }}>
              {c.defBody}
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: "0 clamp(18px,5vw,40px) clamp(56px,7vw,90px)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(26px,3.4vw,38px)", lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0 }}>{c.originTitle}</h2>
          <p style={{ fontSize: "clamp(16px,1.7vw,18.5px)", lineHeight: 1.7, color: "rgba(245,243,240,0.72)", margin: "20px 0 0" }}>
            {c.originP1}
          </p>
          <p style={{ fontSize: "clamp(16px,1.7vw,18.5px)", lineHeight: 1.7, color: "rgba(245,243,240,0.72)", margin: "16px 0 0" }}>
            {c.originP2}
          </p>
          <div style={{ borderLeft: "2px solid rgba(240,160,70,0.5)", paddingLeft: 22, margin: "28px 0 0" }}>
            <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "clamp(18px,2.1vw,22px)", lineHeight: 1.5, color: "rgba(245,243,240,0.86)", margin: 0, fontStyle: "italic" }}>
              {c.quote}
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: "0 clamp(18px,5vw,40px) clamp(56px,7vw,90px)" }}>
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>
          <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(26px,3.4vw,38px)", lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0, maxWidth: "16em" }}>{c.phasesTitle}</h2>
          <div style={{ display: "grid", gap: 20, marginTop: 36 }}>
            {c.phases.map((p) => (
              <div key={p.letter} style={{ background: KAIRON_THEME.surface, border: `1px solid ${KAIRON_THEME.border}`, borderRadius: 18, padding: "clamp(26px,3.6vw,44px)" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
                  <span className="font-display" style={{ fontSize: "clamp(46px,6vw,72px)", fontWeight: 600, color: ORANGE, lineHeight: 0.9 }}>{p.letter}</span>
                  <h3 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(22px,2.6vw,30px)", letterSpacing: "-0.015em", margin: 0 }}>{p.title}</h3>
                </div>
                <p style={{ fontSize: "clamp(16px,1.7vw,18.5px)", lineHeight: 1.7, color: "rgba(245,243,240,0.74)", margin: "20px 0 0", maxWidth: "44em" }}>{p.body}</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 18, marginTop: 26, paddingTop: 24, borderTop: `1px solid ${KAIRON_THEME.border}` }}>
                  <div>
                    <div style={{ fontSize: "11.5px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,243,240,0.4)" }}>{c.inputLabel}</div>
                    <div style={{ fontSize: 15, lineHeight: 1.55, color: "rgba(245,243,240,0.72)", marginTop: 8 }}>{p.input}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "11.5px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,243,240,0.4)" }}>{c.outputLabel}</div>
                    <div style={{ fontSize: 15, lineHeight: 1.55, color: "rgba(245,243,240,0.72)", marginTop: 8 }}>{p.output}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "11.5px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,243,240,0.4)" }}>{c.errorLabel}</div>
                    <div style={{ fontSize: 15, lineHeight: 1.55, color: "rgba(245,243,240,0.72)", marginTop: 8 }}>{p.error}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "0 clamp(18px,5vw,40px) clamp(56px,7vw,90px)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(26px,3.4vw,38px)", lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0 }}>{c.notTitle}</h2>
          <p style={{ fontSize: "clamp(16px,1.7vw,18.5px)", lineHeight: 1.7, color: "rgba(245,243,240,0.72)", margin: "20px 0 0" }}>
            {c.notIntro}
          </p>
          <div style={{ display: "grid", gap: 14, marginTop: 26 }}>
            {c.notItems.map((item) => (
              <div key={item.strong} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <span aria-hidden="true" style={{ color: ORANGE, fontSize: 15, lineHeight: 1.7 }}>—</span>
                <p style={{ fontSize: 16, lineHeight: 1.65, color: "rgba(245,243,240,0.72)", margin: 0 }}>
                  <strong style={{ color: KAIRON_THEME.text }}>{item.strong}</strong>{item.rest}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: KAIRON_THEME.bgAlt, borderTop: `1px solid ${KAIRON_THEME.border}`, borderBottom: `1px solid ${KAIRON_THEME.border}`, padding: "clamp(56px,7vw,90px) clamp(18px,5vw,40px)" }}>
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>
          <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(26px,3.4vw,38px)", lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0 }}>{c.actsOnTitle}</h2>
          <p style={{ fontSize: "clamp(16px,1.7vw,18.5px)", lineHeight: 1.7, color: "rgba(245,243,240,0.66)", margin: "18px 0 0", maxWidth: "44em" }}>
            {c.actsOnBody}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 16, marginTop: 34 }}>
            {c.patterns.map((pat) => (
              <a key={pat.anchor} href={`${c.bloqueosPath}#${pat.anchor}`} className="iro-pattern-card">
                <div className="font-display" style={{ fontSize: 13, color: ORANGE }}>{pat.n}</div>
                <div className="font-display" style={{ fontSize: 19, fontWeight: 600, marginTop: 14 }}>{pat.name}</div>
                <p style={{ fontSize: "14.5px", lineHeight: 1.55, color: "rgba(245,243,240,0.58)", margin: "10px 0 0" }}>{pat.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "clamp(56px,7vw,90px) clamp(18px,5vw,40px)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(26px,3.4vw,38px)", lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0 }}>{c.faqTitle}</h2>
          <div style={{ display: "grid", gap: 26, marginTop: 30 }}>
            {c.faq.map((item) => (
              <div key={item.q}>
                <h3 className="font-display" style={{ fontWeight: 600, fontSize: 19, margin: 0 }}>{item.q}</h3>
                <p style={{ fontSize: 16, lineHeight: 1.65, color: "rgba(245,243,240,0.68)", margin: "10px 0 0" }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "0 clamp(18px,5vw,40px) clamp(70px,9vw,120px)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center", borderTop: `1px solid ${KAIRON_THEME.border}`, paddingTop: "clamp(48px,6vw,72px)" }}>
          <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(28px,4vw,46px)", lineHeight: 1.08, letterSpacing: "-0.025em", margin: 0 }}>
            {c.finalTitle}
          </h2>
          <p style={{ fontSize: "clamp(16px,1.8vw,19px)", lineHeight: 1.6, color: "rgba(245,243,240,0.6)", margin: "20px auto 0", maxWidth: "32em" }}>
            {c.finalSub}
          </p>
          <a
            href={finalHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCta(locale, "metodo_final")}
            className="iro-cta-pill"
            style={{ display: "inline-block", marginTop: 30, background: ORANGE, color: "#1A1000", fontWeight: 600, fontSize: 16, padding: "17px 30px", borderRadius: 999 }}
          >
            {c.cta}
          </a>
        </div>
      </section>

      <KaironDocFooter locale={locale} />
      <MobileStickyCta
        href={mobileHref}
        label={locale === "en" ? "Try KAIRON" : "Probar KAIRON"}
        external
        onClick={() => trackCta(locale, "mobile_sticky")}
      />

      <style>{`
        .iro-link { color: rgba(245,243,240,0.4); }
        .iro-link:hover { color: ${ORANGE}; }
        .iro-pattern-card {
          background: ${KAIRON_THEME.surface2}; border: 1px solid ${KAIRON_THEME.border}; border-radius: 14px;
          padding: 26px; display: block; color: inherit; text-decoration: none; transition: border-color 0.2s;
        }
        .iro-pattern-card:hover { border-color: rgba(240,160,70,0.7); }
        .iro-cta-pill:hover { background: ${KAIRON_THEME.accentHover}; }
        .iro-link:focus-visible, .iro-pattern-card:focus-visible, .iro-cta-pill:focus-visible {
          outline: 2px solid ${ORANGE}; outline-offset: 3px; border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
