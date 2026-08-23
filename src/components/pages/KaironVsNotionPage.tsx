import { KaironDocHeader, KaironDocFooter } from "@/components/site/KaironDocChrome";
import { trackAcquisitionEvent, trackOutboundAppOpened } from "@/lib/analytics";
import { getLaunchPhase, kaironAppUrl } from "@/lib/launchConfig";
import { KAIRON_THEME } from "@/lib/kaironTheme";
import type { Locale } from "@/lib/i18n";

/**
 * Canonical /kairon/vs/notion (and /en/kairon/vs/notion) page — full
 * dark-theme recreation of the "KAIRON vs Notion.dc.html" design handoff
 * prototype: a BoFu comparison that opens by conceding what
 * Notion/ClickUp/Todoist do better. Per the handoff, that concession is
 * deliberate and must not be softened or inverted — the honesty is what
 * makes the page citable by generative engines, in both languages.
 * Standalone (own header/footer, see the isStandalone check in
 * __root.tsx). See the note on MetodoIroPage.tsx for the translation
 * rules the English copy follows.
 */

const ORANGE = KAIRON_THEME.accent;

type MomentRow = { moment: string; organizers: string; kairon: string; kaironStrong: boolean };
type Faq = { q: string; a: string };

type Copy = {
  breadcrumbKairon: string;
  breadcrumbSection: string;
  kicker: string;
  title: string;
  subtitle: string;
  betterTitle: string;
  betterP1: string;
  betterP2: string;
  quote: string;
  whereTitle: string;
  whereBody: string;
  colMoment: string;
  colOrganizers: string;
  colKairon: string;
  moments: MomentRow[];
  whichTitle: string;
  organizerCardTitle: string;
  organizerSigns: string[];
  kaironCardTitle: string;
  kaironSigns: string[];
  whichNote: string;
  faqTitle: string;
  faq: Faq[];
  finalTitle: string;
  finalSub: string;
  cta: string;
  legalNote: string;
};

export const VS_NOTION_COPY: Record<Locale, Copy> = {
  es: {
    breadcrumbKairon: "KAIRON",
    breadcrumbSection: "Comparativas",
    kicker: "Comparativa",
    title: "KAIRON frente a Notion, ClickUp y Todoist",
    subtitle: "La respuesta corta: no compiten. Si tu problema es que el trabajo está desordenado, ninguna de estas páginas debería convencerte de cambiar de herramienta. Si tu problema es que está perfectamente ordenado y aun así no avanza, sigue leyendo.",
    betterTitle: "Lo que Notion hace mejor",
    betterP1: "Notion es una herramienta excelente y KAIRON no la sustituye en nada. Estructura información compleja mejor que cualquier alternativa, permite construir sistemas de trabajo a medida sin escribir código, y su modelo de bases de datos relacionadas no tiene equivalente. Lo mismo aplica, en su terreno, a ClickUp para gestión de proyectos y a Todoist para captura rápida de tareas.",
    betterP2: "Si estás evaluando cuál de esas tres adoptar, KAIRON no es una cuarta opción. Es otra categoría, y la mayoría de nuestros usuarios usa una de ellas al mismo tiempo.",
    quote: "Ninguna herramienta de organización falla por organizar mal. Fallan cuando el problema nunca fue de organización.",
    whereTitle: "Dónde actúa cada una",
    whereBody: "El trabajo tiene cuatro momentos. Las herramientas de organización cubren tres. El cuarto está vacío.",
    colMoment: "Momento", colOrganizers: "Notion / ClickUp / Todoist", colKairon: "KAIRON",
    moments: [
      { moment: "Capturar lo que hay que hacer", organizers: "Sí, es su función central", kairon: "No", kaironStrong: false },
      { moment: "Priorizar y planificar", organizers: "Sí", kairon: "No", kaironStrong: false },
      { moment: "Coordinar al equipo", organizers: "Sí", kairon: "No", kaironStrong: false },
      { moment: "Empezar la tarea que llevas tres días evitando", organizers: "No", kairon: "Sí, es su función central", kaironStrong: true },
      { moment: "Entregar algo que consideras aún no perfecto", organizers: "No", kairon: "Sí", kaironStrong: true },
      { moment: "Identificar por qué se repite el mismo bloqueo", organizers: "No", kairon: "Sí", kaironStrong: true },
    ],
    whichTitle: "Cuál necesitas",
    organizerCardTitle: "Una herramienta de organización",
    organizerSigns: [
      "Pierdes información entre canales y documentos.",
      "Nadie sabe con certeza quién está haciendo qué.",
      "Las prioridades cambian y el equipo se entera tarde.",
    ],
    kaironCardTitle: "KAIRON",
    kaironSigns: [
      "El sistema está impecable y las tareas importantes siguen sin moverse.",
      "Reorganizar la lista se ha convertido en una forma de no empezar.",
      "El mismo tipo de entregable se atasca una y otra vez, con distinta justificación.",
    ],
    whichNote: "Si te reconoces en las dos columnas, el orden importa: primero resuelve la organización, después la fricción. KAIRON sobre un sistema caótico atribuye a un bloqueo cognitivo lo que en realidad es falta de claridad.",
    faqTitle: "Preguntas frecuentes",
    faq: [
      { q: "¿Puedo usar KAIRON junto a Notion?", a: "Es el escenario habitual. Notion sostiene el sistema de trabajo; KAIRON interviene en el momento en que una tarea concreta de ese sistema no arranca." },
      { q: "¿Notion no tiene ya IA integrada?", a: "Sí, y está orientada a producir contenido y resumir información más rápido. Es asistencia de ejecución, no intervención sobre el bloqueo. Un asistente que redacta el documento por ti no desactiva la razón por la que llevas tres días sin abrirlo." },
      { q: "¿Por qué no usar ChatGPT para esto?", a: "Los asistentes generalistas están ajustados para ser útiles y agradables, y eso significa aceptar tu marco. Cuando dices que no es el momento, coinciden contigo. Kai está construido para no hacerlo." },
      { q: "¿Cuánto cuesta comparado con esas herramientas?", a: "KAIRON tiene precio diferenciado por región y siete días de prueba sin tarjeta. Como no sustituye a tu gestor de tareas, la comparación relevante no es de precio entre ambas, sino de qué añade sobre lo que ya pagas." },
    ],
    finalTitle: "Tu sistema está bien. El problema es otro.",
    finalSub: "Siete días de KAIRON, sin tarjeta. Deja el gestor de tareas donde está.",
    cta: "Empezar prueba de 7 días",
    legalNote: "Notion, ClickUp y Todoist son marcas de sus respectivos propietarios. Esta comparación es independiente.",
  },
  en: {
    breadcrumbKairon: "KAIRON",
    breadcrumbSection: "Comparisons",
    kicker: "Comparison",
    title: "KAIRON vs. Notion, ClickUp, and Todoist",
    subtitle: "The short answer: they don't compete. If your problem is that work is disorganized, nothing on this page should convince you to switch tools. If your problem is that it's perfectly organized and still isn't moving, keep reading.",
    betterTitle: "What Notion does better",
    betterP1: "Notion is an excellent tool, and KAIRON doesn't replace any part of it. It structures complex information better than any alternative, lets you build custom work systems without writing code, and its relational database model has no equivalent. The same applies, in its own territory, to ClickUp for project management and Todoist for quick task capture.",
    betterP2: "If you're deciding which of those three to adopt, KAIRON isn't a fourth option. It's a different category, and most of our users run one of them alongside KAIRON.",
    quote: "No organization tool fails by organizing badly. They fail when the problem was never organization in the first place.",
    whereTitle: "Where each one operates",
    whereBody: "Work has four moments. Organization tools cover three. The fourth is empty.",
    colMoment: "Moment", colOrganizers: "Notion / ClickUp / Todoist", colKairon: "KAIRON",
    moments: [
      { moment: "Capturing what needs to get done", organizers: "Yes, it's their core function", kairon: "No", kaironStrong: false },
      { moment: "Prioritizing and planning", organizers: "Yes", kairon: "No", kaironStrong: false },
      { moment: "Coordinating the team", organizers: "Yes", kairon: "No", kaironStrong: false },
      { moment: "Starting the task you've been avoiding for three days", organizers: "No", kairon: "Yes, it's its core function", kaironStrong: true },
      { moment: "Shipping something you still consider not perfect", organizers: "No", kairon: "Yes", kaironStrong: true },
      { moment: "Identifying why the same block keeps repeating", organizers: "No", kairon: "Yes", kaironStrong: true },
    ],
    whichTitle: "Which one you need",
    organizerCardTitle: "An organization tool",
    organizerSigns: [
      "You lose information across channels and documents.",
      "No one knows for sure who's doing what.",
      "Priorities change and the team finds out late.",
    ],
    kaironCardTitle: "KAIRON",
    kaironSigns: [
      "The system is flawless and important tasks still aren't moving.",
      "Reorganizing the list has become a way of not starting.",
      "The same type of deliverable gets stuck over and over, with a different justification each time.",
    ],
    whichNote: "If you recognize yourself in both columns, order matters: fix the organization first, then the friction. Running KAIRON on a chaotic system attributes to a cognitive block what's actually a lack of clarity.",
    faqTitle: "Frequently asked questions",
    faq: [
      { q: "Can I use KAIRON alongside Notion?", a: "That's the usual setup. Notion holds the work system; KAIRON steps in the moment a specific task within that system won't start." },
      { q: "Doesn't Notion already have AI built in?", a: "Yes, and it's built to produce content and summarize information faster. That's execution assistance, not intervention on the block itself. An assistant that drafts the document for you doesn't disarm the reason you've gone three days without opening it." },
      { q: "Why not just use ChatGPT for this?", a: "General-purpose assistants are tuned to be helpful and agreeable, and that means accepting your framing. When you say it's not the right time, they agree with you. Kai is built not to." },
      { q: "How much does it cost compared to those tools?", a: "KAIRON has region-differentiated pricing and a seven-day trial with no card required. Since it doesn't replace your task manager, the relevant comparison isn't price between the two — it's what KAIRON adds on top of what you're already paying for." },
    ],
    finalTitle: "Your system is fine. The problem is something else.",
    finalSub: "Seven days of KAIRON, no card required. Leave your task manager right where it is.",
    cta: "Start 7-day trial",
    legalNote: "Notion, ClickUp, and Todoist are trademarks of their respective owners. This comparison is independent.",
  },
};

function trackCta(locale: Locale, location: string) {
  trackAcquisitionEvent("section_cta_clicked", { cta_location: location, language: locale });
  trackOutboundAppOpened({ cta_location: location, language: locale });
}

export function KaironVsNotionPage({ locale = "es" }: { locale?: Locale }) {
  const c = VS_NOTION_COPY[locale];
  const navHref = kaironAppUrl(locale, "vs_nav", getLaunchPhase());
  const finalHref = kaironAppUrl(locale, "vs_final", getLaunchPhase());
  const homePath = locale === "en" ? "/en" : "/";

  return (
    <div style={{ background: KAIRON_THEME.bg, color: KAIRON_THEME.text, overflowX: "hidden" }}>
      <KaironDocHeader locale={locale} current="vs-notion" ctaHref={navHref} onCtaClick={() => trackCta(locale, "vs_nav")} />

      <section style={{ padding: "clamp(56px,8vw,110px) clamp(18px,5vw,40px) clamp(40px,5vw,60px)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 9, alignItems: "center", fontSize: "12.5px", color: "rgba(245,243,240,0.4)", flexWrap: "wrap", whiteSpace: "nowrap" }}>
            <a href={homePath} className="vsn-link">G-Structure</a>
            <span>/</span>
            <span>{c.breadcrumbKairon}</span>
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

      <section style={{ padding: "0 clamp(18px,5vw,40px) clamp(56px,7vw,90px)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(26px,3.4vw,38px)", lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0 }}>{c.betterTitle}</h2>
          <p style={{ fontSize: "clamp(16px,1.7vw,18.5px)", lineHeight: 1.7, color: "rgba(245,243,240,0.72)", margin: "20px 0 0" }}>
            {c.betterP1}
          </p>
          <p style={{ fontSize: "clamp(16px,1.7vw,18.5px)", lineHeight: 1.7, color: "rgba(245,243,240,0.72)", margin: "16px 0 0" }}>
            {c.betterP2}
          </p>
          <div style={{ borderLeft: "2px solid rgba(240,160,70,0.5)", paddingLeft: 22, margin: "30px 0 0" }}>
            <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "clamp(18px,2.1vw,22px)", lineHeight: 1.5, color: "rgba(245,243,240,0.86)", margin: 0, fontStyle: "italic" }}>
              {c.quote}
            </p>
          </div>
        </div>
      </section>

      <section style={{ background: KAIRON_THEME.bgAlt, borderTop: `1px solid ${KAIRON_THEME.border}`, borderBottom: `1px solid ${KAIRON_THEME.border}`, padding: "clamp(56px,7vw,90px) clamp(18px,5vw,40px)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(26px,3.4vw,38px)", lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0 }}>{c.whereTitle}</h2>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: "rgba(245,243,240,0.6)", margin: "14px 0 0", maxWidth: "42em" }}>
            {c.whereBody}
          </p>
          <div style={{ overflowX: "auto", marginTop: 32 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15, minWidth: 620 }}>
              <thead>
                <tr style={{ textAlign: "left", borderBottom: "1px solid rgba(245,243,240,0.2)" }}>
                  <th style={{ padding: "12px 14px 12px 0", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(245,243,240,0.5)" }}>{c.colMoment}</th>
                  <th style={{ padding: "12px 14px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(245,243,240,0.5)" }}>{c.colOrganizers}</th>
                  <th style={{ padding: "12px 0 12px 14px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase", color: ORANGE }}>{c.colKairon}</th>
                </tr>
              </thead>
              <tbody>
                {c.moments.map((row, i) => (
                  <tr key={row.moment} style={i < c.moments.length - 1 ? { borderBottom: "1px solid rgba(245,243,240,0.08)" } : undefined}>
                    <td style={{ padding: "14px 14px 14px 0", fontWeight: 500 }}>{row.moment}</td>
                    <td style={{ padding: "14px", color: "rgba(245,243,240,0.68)" }}>{row.organizers}</td>
                    <td style={{ padding: "14px 0 14px 14px", color: row.kaironStrong ? ORANGE : "rgba(245,243,240,0.45)" }}>{row.kairon}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section style={{ padding: "clamp(56px,7vw,90px) clamp(18px,5vw,40px)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(26px,3.4vw,38px)", lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0 }}>{c.whichTitle}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20, marginTop: 32 }}>
            <div style={{ background: KAIRON_THEME.surface, border: `1px solid ${KAIRON_THEME.border}`, borderRadius: 16, padding: "clamp(24px,3vw,32px)" }}>
              <h3 className="font-display" style={{ fontSize: 19, fontWeight: 600, margin: 0 }}>{c.organizerCardTitle}</h3>
              <div style={{ display: "grid", gap: 12, marginTop: 20 }}>
                {c.organizerSigns.map((s) => (
                  <div key={s} style={{ display: "flex", gap: 12, fontSize: "15.5px", lineHeight: 1.55, color: "rgba(245,243,240,0.7)" }}>
                    <span aria-hidden="true" style={{ color: "rgba(245,243,240,0.35)" }}>—</span><span>{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: KAIRON_THEME.surface, border: "1px solid rgba(240,160,70,0.4)", borderRadius: 16, padding: "clamp(24px,3vw,32px)" }}>
              <h3 className="font-display" style={{ fontSize: 19, fontWeight: 600, margin: 0 }}>{c.kaironCardTitle}</h3>
              <div style={{ display: "grid", gap: 12, marginTop: 20 }}>
                {c.kaironSigns.map((s) => (
                  <div key={s} style={{ display: "flex", gap: 12, fontSize: "15.5px", lineHeight: 1.55, color: "rgba(245,243,240,0.7)" }}>
                    <span aria-hidden="true" style={{ color: ORANGE }}>—</span><span>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p style={{ fontSize: 16, lineHeight: 1.65, color: "rgba(245,243,240,0.6)", margin: "26px 0 0", maxWidth: "44em" }}>
            {c.whichNote}
          </p>
        </div>
      </section>

      <section style={{ padding: "0 clamp(18px,5vw,40px) clamp(56px,7vw,90px)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(24px,3vw,34px)", lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0 }}>{c.faqTitle}</h2>
          <div style={{ display: "grid", gap: 26, marginTop: 28 }}>
            {c.faq.map((item) => (
              <div key={item.q}>
                <h3 className="font-display" style={{ fontWeight: 600, fontSize: 18, margin: 0 }}>{item.q}</h3>
                <p style={{ fontSize: 16, lineHeight: 1.65, color: "rgba(245,243,240,0.68)", margin: "10px 0 0" }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "0 clamp(18px,5vw,40px) clamp(70px,9vw,120px)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center", borderTop: `1px solid ${KAIRON_THEME.border}`, paddingTop: "clamp(48px,6vw,72px)" }}>
          <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(28px,4vw,46px)", lineHeight: 1.08, letterSpacing: "-0.025em", margin: 0 }}>{c.finalTitle}</h2>
          <p style={{ fontSize: "clamp(16px,1.8vw,19px)", lineHeight: 1.6, color: "rgba(245,243,240,0.6)", margin: "20px auto 0", maxWidth: "32em" }}>
            {c.finalSub}
          </p>
          <a
            href={finalHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCta(locale, "vs_final")}
            className="vsn-cta-pill"
            style={{ display: "inline-block", marginTop: 30, background: ORANGE, color: "#1A1000", fontWeight: 600, fontSize: 16, padding: "17px 30px", borderRadius: 999 }}
          >
            {c.cta}
          </a>
        </div>
      </section>

      <KaironDocFooter locale={locale} legalNote={c.legalNote} />

      <style>{`
        .vsn-link { color: rgba(245,243,240,0.4); }
        .vsn-link:hover { color: ${ORANGE}; }
        .vsn-cta-pill:hover { background: ${KAIRON_THEME.accentHover}; }
        .vsn-link:focus-visible, .vsn-cta-pill:focus-visible {
          outline: 2px solid ${ORANGE}; outline-offset: 3px; border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
