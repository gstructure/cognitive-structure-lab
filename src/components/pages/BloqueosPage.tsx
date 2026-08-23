import { KaironDocHeader, KaironDocFooter } from "@/components/site/KaironDocChrome";
import { trackAcquisitionEvent, trackOutboundAppOpened } from "@/lib/analytics";
import { getLaunchPhase, kaironAppUrl } from "@/lib/launchConfig";
import { KAIRON_THEME } from "@/lib/kaironTheme";
import type { Locale } from "@/lib/i18n";

/**
 * Canonical /bloqueos (and /en/execution-blocks) page — full dark-theme
 * recreation of the "Bloqueos.dc.html" design handoff prototype: the
 * open taxonomy of the four execution-block patterns. Standalone (own
 * header/footer, see the isStandalone check in __root.tsx). See the note
 * on MetodoIroPage.tsx for the translation rules the English copy
 * follows. English pattern anchors use English slugs (procrastination,
 * perfectionism, self-sabotage, impostor) rather than the Spanish ones.
 *
 * Production note from the handoff: each pattern should eventually also
 * get its own URL (`/bloqueos/procrastinacion/` etc.) with this page
 * acting as the hub. Not done here — this page currently is both the hub
 * and the full content, addressed via in-page anchors.
 */

const ORANGE = KAIRON_THEME.accent;

type BlockPattern = { n: string; anchor: string; name: string; lede: string; signals: string[]; distinction: string; intervention: string };
type DiffRow = { name: string; where: string; protects: string };

type Copy = {
  breadcrumbSection: string;
  kicker: string;
  title: string;
  subtitle: string;
  frictionKicker: string;
  frictionBody: string;
  citation: string;
  signalsLabel: string;
  distinctionLabel: string;
  interventionLabel: string;
  blocks: BlockPattern[];
  diffTitle: string;
  diffIntro: string;
  diffPattern: string;
  diffWhere: string;
  diffProtects: string;
  diff: DiffRow[];
  diffNote: string;
  finalTitle: string;
  finalSub: string;
  cta: string;
  finalNote: string;
  espejoHref: string;
};

export const BLOQUEOS_COPY: Record<Locale, Copy> = {
  es: {
    breadcrumbSection: "Bloqueos de ejecución",
    kicker: "Taxonomía abierta",
    title: "Los cuatro bloqueos de ejecución",
    subtitle: "Sabes exactamente qué tienes que hacer y no lo haces. Eso no es un fallo de disciplina: es un patrón cognitivo con una lógica interna concreta. Hay cuatro, y no se resuelven igual.",
    frictionKicker: "Fricción de ejecución",
    frictionBody: "Resistencia interna que separa la intención de la acción en una persona que ya tiene la información, los recursos y la capacidad necesarios para actuar. No es falta de tiempo ni de motivación: es una interpretación activa que vuelve razonable no empezar.",
    citation: "Esta taxonomía es de uso libre. Puede citarse indicando la fuente: G-Structure, Taxonomía de bloqueos de ejecución, 2026.",
    signalsLabel: "Señales observables",
    distinctionLabel: "Cómo se distingue",
    interventionLabel: "Intervención I-R-O",
    blocks: [
      {
        n: "01", anchor: "procrastinacion", name: "Procrastinación",
        lede: "La tarea está definida y el inicio se posterga. El aplazamiento no busca evitar el trabajo: busca evitar el malestar que anticipa el primer minuto de ese trabajo. Por eso funciona sustituir la tarea por otra igualmente productiva pero menos incómoda.",
        signals: [
          "La tarea se reorganiza en la lista en lugar de empezarse.",
          "Se ejecutan tareas menores con urgencia desproporcionada.",
          "La justificación cambia cada día y siempre es plausible.",
        ],
        distinction: "Del perfeccionismo: aquí el trabajo no ha empezado. En el perfeccionismo está empezado y no se cierra. Si hay borradores acumulados, no es procrastinación.",
        intervention: "Reducir el primer movimiento hasta un tamaño en el que la anticipación del malestar deje de justificar el aplazamiento. Cinco minutos, no la tarea entera.",
      },
      {
        n: "02", anchor: "perfeccionismo", name: "Perfeccionismo",
        lede: "El trabajo avanza pero no se entrega. El estándar aplicado no es el que la situación requiere, sino el que protegería a la persona de cualquier crítica posible. Como ese estándar no existe, la entrega se aplaza indefinidamente y el trabajo se vuelve refinamiento.",
        signals: [
          "Múltiples versiones sin diferencias funcionales entre ellas.",
          "Se pide una revisión más antes de cada envío previsto.",
          "El tiempo invertido supera con mucho el impacto del entregable.",
        ],
        distinction: "Del síndrome del impostor: aquí la persona confía en su criterio, desconfía del resultado. En el impostor desconfía de sí misma, aunque el resultado sea bueno.",
        intervention: "Explicitar el estándar que la situación realmente exige, separado del estándar defensivo, y fijar un criterio de cierre antes de seguir trabajando.",
      },
      {
        n: "03", anchor: "autosabotaje", name: "Autosabotaje",
        lede: "La persona toma decisiones que reducen sus propias probabilidades de éxito, y las toma justo cuando el éxito se vuelve probable. El mecanismo es protector: si el resultado falla por una causa externa y elegida, no puede interpretarse como una falta de capacidad.",
        signals: [
          "Compromisos nuevos asumidos justo antes de un hito importante.",
          "Preparación deliberadamente insuficiente en algo que sí importa.",
          "Conflictos que aparecen en el peor momento posible, de forma recurrente.",
        ],
        distinction: "De la procrastinación: aquí hay acción, pero dirigida en contra del objetivo. La procrastinación es ausencia de acción, no acción contraproducente.",
        intervention: "Nombrar qué protege la decisión. Mientras la función protectora permanezca implícita, el patrón se repite con una justificación distinta cada vez.",
      },
      {
        n: "04", anchor: "impostor", name: "Síndrome del impostor",
        lede: "La capacidad es real y verificable; la atribución no. Los logros se explican por suerte, ayuda o momento favorable, nunca por competencia propia. El efecto sobre la ejecución es una prudencia excesiva: la persona no toma el espacio que su rol requiere.",
        signals: [
          "Se aportan datos de respaldo desproporcionados para afirmaciones simples.",
          "Opiniones retenidas en reuniones donde se es la persona más informada.",
          "Oportunidades declinadas por sentirse no del todo lista.",
        ],
        distinction: "Del perfeccionismo: el impostor duda de la persona, el perfeccionismo duda del entregable. La prueba está en si un elogio genuino alivia o incomoda.",
        intervention: "Contrastar la atribución con evidencia acumulada. Las afirmaciones de confianza no funcionan: el patrón las descarta como cortesía.",
      },
    ],
    diffTitle: "Diferenciación rápida",
    diffIntro: "Los cuatro patrones producen el mismo resultado visible —algo importante no avanza— y por eso se confunden. La distinción está en dónde se detiene el proceso.",
    diffPattern: "Patrón", diffWhere: "Dónde se detiene", diffProtects: "Qué protege",
    diff: [
      { name: "Procrastinación", where: "Antes de empezar", protects: "Del malestar del primer minuto" },
      { name: "Perfeccionismo", where: "Antes de entregar", protects: "De la crítica al trabajo" },
      { name: "Autosabotaje", where: "Antes del resultado", protects: "De un fracaso atribuible a uno mismo" },
      { name: "Impostor", where: "Antes de ocupar el espacio", protects: "De ser descubierto" },
    ],
    diffNote: "Una misma persona activa patrones distintos según el contexto. No son tipos de personalidad y no conviene tratarlos como etiqueta fija: el patrón se identifica situación por situación.",
    finalTitle: "¿Cuál está operando ahora mismo?",
    finalSub: "Escribe la excusa que te estás dando y Kai identifica el patrón. Sin registro, en el navegador.",
    cta: "Probar El Espejo",
    finalNote: "Después, si tiene sentido, hay siete días de prueba sin tarjeta.",
    espejoHref: "/#espejo",
  },
  en: {
    breadcrumbSection: "Execution blocks",
    kicker: "Open taxonomy",
    title: "The four execution blocks",
    subtitle: "You know exactly what you need to do, and you don't do it. That's not a failure of discipline: it's a cognitive pattern with its own internal logic. There are four, and they don't resolve the same way.",
    frictionKicker: "Execution friction",
    frictionBody: "Internal resistance that separates intention from action in someone who already has the information, resources, and ability needed to act. It isn't a lack of time or motivation: it's an active interpretation that makes not starting feel reasonable.",
    citation: "This taxonomy is free to use. It can be cited by naming the source: G-Structure, Execution Blocks Taxonomy, 2026.",
    signalsLabel: "Observable signals",
    distinctionLabel: "How to tell it apart",
    interventionLabel: "I-R-O intervention",
    blocks: [
      {
        n: "01", anchor: "procrastination", name: "Procrastination",
        lede: "The task is defined, and starting keeps getting pushed back. The delay isn't about avoiding the work: it's about avoiding the discomfort that anticipates the first minute of that work. That's why swapping the task for an equally productive but less uncomfortable one works so well.",
        signals: [
          "The task gets reorganized on the list instead of started.",
          "Minor tasks get done with disproportionate urgency.",
          "The justification changes daily and is always plausible.",
        ],
        distinction: "From perfectionism: here the work hasn't started. In perfectionism it has started and won't close. If there are accumulated drafts, it isn't procrastination.",
        intervention: "Shrink the first move down to a size where anticipating discomfort no longer justifies the delay. Five minutes, not the whole task.",
      },
      {
        n: "02", anchor: "perfectionism", name: "Perfectionism",
        lede: "The work moves forward but doesn't ship. The standard being applied isn't what the situation requires — it's the one that would protect the person from any possible criticism. Since that standard doesn't exist, delivery gets postponed indefinitely and the work turns into endless refinement.",
        signals: [
          "Multiple versions with no functional difference between them.",
          "One more revision gets requested before every planned send.",
          "Time invested far exceeds the deliverable's actual impact.",
        ],
        distinction: "From impostor syndrome: here the person trusts their judgment, but distrusts the result. In impostor syndrome they distrust themselves, even when the result is good.",
        intervention: "Spell out the standard the situation actually requires, separate from the defensive one, and set a closing criterion before continuing to work.",
      },
      {
        n: "03", anchor: "self-sabotage", name: "Self-sabotage",
        lede: "The person makes decisions that reduce their own odds of success, and makes them right when success becomes likely. The mechanism is protective: if the outcome fails for an external, chosen reason, it can't be read as a lack of ability.",
        signals: [
          "New commitments taken on right before an important milestone.",
          "Deliberately insufficient preparation for something that actually matters.",
          "Conflicts that keep showing up at the worst possible moment, recurrently.",
        ],
        distinction: "From procrastination: here there's action, but aimed against the goal. Procrastination is the absence of action, not counterproductive action.",
        intervention: "Name what the decision is protecting. As long as the protective function stays implicit, the pattern repeats with a different justification each time.",
      },
      {
        n: "04", anchor: "impostor", name: "Impostor syndrome",
        lede: "The ability is real and verifiable; the attribution isn't. Achievements get explained away by luck, help, or good timing — never by actual competence. The effect on execution is excessive caution: the person doesn't take up the space their role requires.",
        signals: [
          "Disproportionate supporting data gets offered for simple statements.",
          "Opinions held back in meetings where they're the most informed person in the room.",
          "Opportunities declined for not feeling fully ready.",
        ],
        distinction: "From perfectionism: impostor syndrome doubts the person, perfectionism doubts the deliverable. The test is whether genuine praise brings relief or discomfort.",
        intervention: "Weigh the attribution against accumulated evidence. Confidence-boosting statements don't work: the pattern dismisses them as courtesy.",
      },
    ],
    diffTitle: "Quick differentiation",
    diffIntro: "All four patterns produce the same visible outcome — something important doesn't move forward — which is why they get confused with each other. The distinction is in where the process stops.",
    diffPattern: "Pattern", diffWhere: "Where it stops", diffProtects: "What it protects",
    diff: [
      { name: "Procrastination", where: "Before starting", protects: "From the discomfort of the first minute" },
      { name: "Perfectionism", where: "Before delivering", protects: "From criticism of the work" },
      { name: "Self-sabotage", where: "Before the outcome", protects: "From a failure attributable to oneself" },
      { name: "Impostor", where: "Before taking up the space", protects: "From being found out" },
    ],
    diffNote: "The same person activates different patterns depending on context. These aren't personality types, and they shouldn't be treated as a fixed label: the pattern gets identified situation by situation.",
    finalTitle: "Which one is running right now?",
    finalSub: "Write down the excuse you're giving yourself and Kai identifies the pattern. No sign-up, right in the browser.",
    cta: "Try The Mirror",
    finalNote: "After that, if it makes sense, there's a seven-day trial, no card required.",
    espejoHref: "/en#espejo",
  },
};

function trackCta(locale: Locale, location: string) {
  trackAcquisitionEvent("section_cta_clicked", { cta_location: location, language: locale });
  trackOutboundAppOpened({ cta_location: location, language: locale });
}

export function BloqueosPage({ locale = "es" }: { locale?: Locale }) {
  const c = BLOQUEOS_COPY[locale];
  const navHref = kaironAppUrl(locale, "bloqueos_nav", getLaunchPhase());
  const homePath = locale === "en" ? "/en" : "/";

  return (
    <div style={{ background: KAIRON_THEME.bg, color: KAIRON_THEME.text, overflowX: "hidden" }}>
      <KaironDocHeader locale={locale} current="bloqueos" ctaHref={navHref} onCtaClick={() => trackCta(locale, "bloqueos_nav")} />

      <section style={{ padding: "clamp(56px,8vw,110px) clamp(18px,5vw,40px) clamp(40px,5vw,60px)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 9, alignItems: "center", fontSize: "12.5px", color: "rgba(245,243,240,0.4)", flexWrap: "wrap", whiteSpace: "nowrap" }}>
            <a href={homePath} className="blq-link">G-Structure</a>
            <span>/</span>
            <span>{c.breadcrumbSection}</span>
          </div>
          <div style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: ORANGE, marginTop: 26 }}>{c.kicker}</div>
          <h1 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(32px,5.2vw,58px)", lineHeight: 1.05, letterSpacing: "-0.025em", margin: "16px 0 0" }}>
            {c.title}
          </h1>
          <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "clamp(19px,2.3vw,26px)", lineHeight: 1.5, color: "rgba(245,243,240,0.8)", margin: "24px 0 0" }}>
            {c.subtitle}
          </p>
        </div>
      </section>

      <section style={{ padding: "0 clamp(18px,5vw,40px) clamp(50px,6vw,80px)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={{ background: KAIRON_THEME.surface, border: `1px solid ${KAIRON_THEME.accentTint}`, borderRadius: 16, padding: "clamp(24px,3.4vw,36px)" }}>
            <div style={{ fontSize: "11.5px", letterSpacing: "0.16em", textTransform: "uppercase", color: ORANGE }}>{c.frictionKicker}</div>
            <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "clamp(17px,2vw,22px)", lineHeight: 1.55, margin: "14px 0 0" }}>
              {c.frictionBody}
            </p>
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.65, color: "rgba(245,243,240,0.5)", margin: "20px 0 0" }}>
            {c.citation}
          </p>
        </div>
      </section>

      {c.blocks.map((b) => (
        <section key={b.anchor} id={b.anchor} style={{ scrollMarginTop: 80, padding: "0 clamp(18px,5vw,40px) clamp(48px,6vw,72px)" }}>
          <div style={{ maxWidth: 960, margin: "0 auto", borderTop: `1px solid rgba(245,243,240,0.1)`, paddingTop: "clamp(38px,5vw,58px)" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
              <span className="font-display" style={{ fontSize: 14, color: ORANGE }}>{b.n}</span>
              <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(26px,3.4vw,40px)", lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>{b.name}</h2>
            </div>
            <p style={{ fontSize: "clamp(16.5px,1.8vw,19px)", lineHeight: 1.65, color: "rgba(245,243,240,0.78)", margin: "20px 0 0", maxWidth: "44em" }}>{b.lede}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20, marginTop: 30 }}>
              <div style={{ background: KAIRON_THEME.surface, border: `1px solid ${KAIRON_THEME.border}`, borderRadius: 14, padding: 24 }}>
                <h3 className="font-display" style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(245,243,240,0.5)", margin: 0 }}>{c.signalsLabel}</h3>
                <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
                  {b.signals.map((s) => (
                    <div key={s} style={{ fontSize: 15, lineHeight: 1.55, color: "rgba(245,243,240,0.72)" }}>{s}</div>
                  ))}
                </div>
              </div>
              <div style={{ background: KAIRON_THEME.surface, border: `1px solid ${KAIRON_THEME.border}`, borderRadius: 14, padding: 24 }}>
                <h3 className="font-display" style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(245,243,240,0.5)", margin: 0 }}>{c.distinctionLabel}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: "rgba(245,243,240,0.72)", margin: "14px 0 0" }}>{b.distinction}</p>
              </div>
              <div style={{ background: KAIRON_THEME.surface, border: `1px solid ${KAIRON_THEME.border}`, borderRadius: 14, padding: 24 }}>
                <h3 className="font-display" style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(245,243,240,0.5)", margin: 0 }}>{c.interventionLabel}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: "rgba(245,243,240,0.72)", margin: "14px 0 0" }}>{b.intervention}</p>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section style={{ background: KAIRON_THEME.bgAlt, borderTop: `1px solid ${KAIRON_THEME.border}`, borderBottom: `1px solid ${KAIRON_THEME.border}`, padding: "clamp(56px,7vw,90px) clamp(18px,5vw,40px)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(24px,3vw,34px)", lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0 }}>{c.diffTitle}</h2>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: "rgba(245,243,240,0.6)", margin: "14px 0 0", maxWidth: "40em" }}>
            {c.diffIntro}
          </p>
          <div style={{ overflowX: "auto", marginTop: 30 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15, minWidth: 620 }}>
              <thead>
                <tr style={{ textAlign: "left", borderBottom: "1px solid rgba(245,243,240,0.2)" }}>
                  <th style={{ padding: "12px 14px 12px 0", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(245,243,240,0.5)" }}>{c.diffPattern}</th>
                  <th style={{ padding: "12px 14px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(245,243,240,0.5)" }}>{c.diffWhere}</th>
                  <th style={{ padding: "12px 0 12px 14px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(245,243,240,0.5)" }}>{c.diffProtects}</th>
                </tr>
              </thead>
              <tbody>
                {c.diff.map((row, i) => (
                  <tr key={row.name} style={i < c.diff.length - 1 ? { borderBottom: "1px solid rgba(245,243,240,0.08)" } : undefined}>
                    <td style={{ padding: "14px 14px 14px 0", fontWeight: 500 }}>{row.name}</td>
                    <td style={{ padding: "14px", color: "rgba(245,243,240,0.68)" }}>{row.where}</td>
                    <td style={{ padding: "14px 0 14px 14px", color: "rgba(245,243,240,0.68)" }}>{row.protects}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: "rgba(245,243,240,0.5)", margin: "24px 0 0", maxWidth: "44em" }}>
            {c.diffNote}
          </p>
        </div>
      </section>

      <section style={{ padding: "clamp(60px,8vw,100px) clamp(18px,5vw,40px)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center" }}>
          <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(28px,4vw,46px)", lineHeight: 1.08, letterSpacing: "-0.025em", margin: 0 }}>{c.finalTitle}</h2>
          <p style={{ fontSize: "clamp(16px,1.8vw,19px)", lineHeight: 1.6, color: "rgba(245,243,240,0.6)", margin: "20px auto 0", maxWidth: "32em" }}>
            {c.finalSub}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 13, justifyContent: "center", marginTop: 30 }}>
            <a
              href={c.espejoHref}
              onClick={() => trackCta(locale, "bloqueos_final_espejo")}
              className="blq-cta-pill"
              style={{ background: ORANGE, color: "#1A1000", fontWeight: 600, fontSize: 16, padding: "17px 30px", borderRadius: 999 }}
            >
              {c.cta}
            </a>
          </div>
          <div style={{ fontSize: 13, color: "rgba(245,243,240,0.4)", marginTop: 18 }}>{c.finalNote}</div>
        </div>
      </section>

      <KaironDocFooter locale={locale} />

      <style>{`
        .blq-link { color: rgba(245,243,240,0.4); }
        .blq-link:hover { color: ${ORANGE}; }
        .blq-cta-pill:hover { background: ${KAIRON_THEME.accentHover}; }
        .blq-link:focus-visible, .blq-cta-pill:focus-visible {
          outline: 2px solid ${ORANGE}; outline-offset: 3px; border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
