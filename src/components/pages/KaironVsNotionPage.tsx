import { KaironDocHeader, KaironDocFooter } from "@/components/site/KaironDocChrome";
import { trackAcquisitionEvent, trackOutboundAppOpened } from "@/lib/analytics";
import { getLaunchPhase, kaironAppUrl } from "@/lib/launchConfig";
import { KAIRON_THEME } from "@/lib/kaironTheme";

/**
 * Canonical /kairon/vs/notion page — full dark-theme recreation of the
 * "KAIRON vs Notion.dc.html" design handoff prototype: a BoFu comparison
 * that opens by conceding what Notion/ClickUp/Todoist do better. Per the
 * handoff, that concession is deliberate and must not be softened or
 * inverted — the honesty is what makes the page citable by generative
 * engines. Standalone (own header/footer, see the isStandalone check in
 * __root.tsx). Spanish only for now — see the note on MetodoIroPage.tsx
 * for why the English translation is a separate, later task.
 */

const ORANGE = KAIRON_THEME.accent;

const MOMENTS = [
  { moment: "Capturar lo que hay que hacer", organizers: "Sí, es su función central", organizersStrong: false, kairon: "No", kaironStrong: false },
  { moment: "Priorizar y planificar", organizers: "Sí", organizersStrong: false, kairon: "No", kaironStrong: false },
  { moment: "Coordinar al equipo", organizers: "Sí", organizersStrong: false, kairon: "No", kaironStrong: false },
  { moment: "Empezar la tarea que llevas tres días evitando", organizers: "No", organizersStrong: false, kairon: "Sí, es su función central", kaironStrong: true },
  { moment: "Entregar algo que consideras aún no perfecto", organizers: "No", organizersStrong: false, kairon: "Sí", kaironStrong: true },
  { moment: "Identificar por qué se repite el mismo bloqueo", organizers: "No", organizersStrong: false, kairon: "Sí", kaironStrong: true },
];

const ORGANIZER_SIGNS = [
  "Pierdes información entre canales y documentos.",
  "Nadie sabe con certeza quién está haciendo qué.",
  "Las prioridades cambian y el equipo se entera tarde.",
];

const KAIRON_SIGNS = [
  "El sistema está impecable y las tareas importantes siguen sin moverse.",
  "Reorganizar la lista se ha convertido en una forma de no empezar.",
  "El mismo tipo de entregable se atasca una y otra vez, con distinta justificación.",
];

export const VS_NOTION_FAQ = [
  { q: "¿Puedo usar KAIRON junto a Notion?", a: "Es el escenario habitual. Notion sostiene el sistema de trabajo; KAIRON interviene en el momento en que una tarea concreta de ese sistema no arranca." },
  { q: "¿Notion no tiene ya IA integrada?", a: "Sí, y está orientada a producir contenido y resumir información más rápido. Es asistencia de ejecución, no intervención sobre el bloqueo. Un asistente que redacta el documento por ti no desactiva la razón por la que llevas tres días sin abrirlo." },
  { q: "¿Por qué no usar ChatGPT para esto?", a: "Los asistentes generalistas están ajustados para ser útiles y agradables, y eso significa aceptar tu marco. Cuando dices que no es el momento, coinciden contigo. Kai está construido para no hacerlo." },
  { q: "¿Cuánto cuesta comparado con esas herramientas?", a: "KAIRON tiene precio diferenciado por región y siete días de prueba sin tarjeta. Como no sustituye a tu gestor de tareas, la comparación relevante no es de precio entre ambas, sino de qué añade sobre lo que ya pagas." },
];

function trackCta(location: string) {
  trackAcquisitionEvent("section_cta_clicked", { cta_location: location, language: "es" });
  trackOutboundAppOpened({ cta_location: location, language: "es" });
}

export function KaironVsNotionPage() {
  const navHref = kaironAppUrl("es", "vs_nav", getLaunchPhase());
  const finalHref = kaironAppUrl("es", "vs_final", getLaunchPhase());

  return (
    <div style={{ background: KAIRON_THEME.bg, color: KAIRON_THEME.text, overflowX: "hidden" }}>
      <KaironDocHeader current="vs-notion" ctaHref={navHref} onCtaClick={() => trackCta("vs_nav")} />

      <section style={{ padding: "clamp(56px,8vw,110px) clamp(18px,5vw,40px) clamp(40px,5vw,60px)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 9, alignItems: "center", fontSize: "12.5px", color: "rgba(245,243,240,0.4)", flexWrap: "wrap", whiteSpace: "nowrap" }}>
            <a href="/" className="vsn-link">G-Structure</a>
            <span>/</span>
            <span>KAIRON</span>
            <span>/</span>
            <span>Comparativas</span>
          </div>
          <div style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: ORANGE, marginTop: 26 }}>Comparativa</div>
          <h1 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(32px,5.2vw,58px)", lineHeight: 1.05, letterSpacing: "-0.025em", margin: "16px 0 0" }}>
            KAIRON frente a Notion, ClickUp y Todoist
          </h1>
          <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "clamp(19px,2.3vw,26px)", lineHeight: 1.5, color: "rgba(245,243,240,0.8)", margin: "24px 0 0" }}>
            La respuesta corta: no compiten. Si tu problema es que el trabajo está desordenado, ninguna de estas páginas debería convencerte de cambiar de herramienta. Si tu problema es que está perfectamente ordenado y aun así no avanza, sigue leyendo.
          </p>
        </div>
      </section>

      <section style={{ padding: "0 clamp(18px,5vw,40px) clamp(56px,7vw,90px)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(26px,3.4vw,38px)", lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0 }}>Lo que Notion hace mejor</h2>
          <p style={{ fontSize: "clamp(16px,1.7vw,18.5px)", lineHeight: 1.7, color: "rgba(245,243,240,0.72)", margin: "20px 0 0" }}>
            Notion es una herramienta excelente y KAIRON no la sustituye en nada. Estructura información compleja mejor que cualquier alternativa, permite construir sistemas de trabajo a medida sin escribir código, y su modelo de bases de datos relacionadas no tiene equivalente. Lo mismo aplica, en su terreno, a ClickUp para gestión de proyectos y a Todoist para captura rápida de tareas.
          </p>
          <p style={{ fontSize: "clamp(16px,1.7vw,18.5px)", lineHeight: 1.7, color: "rgba(245,243,240,0.72)", margin: "16px 0 0" }}>
            Si estás evaluando cuál de esas tres adoptar, KAIRON no es una cuarta opción. Es otra categoría, y la mayoría de nuestros usuarios usa una de ellas al mismo tiempo.
          </p>
          <div style={{ borderLeft: "2px solid rgba(240,160,70,0.5)", paddingLeft: 22, margin: "30px 0 0" }}>
            <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "clamp(18px,2.1vw,22px)", lineHeight: 1.5, color: "rgba(245,243,240,0.86)", margin: 0, fontStyle: "italic" }}>
              Ninguna herramienta de organización falla por organizar mal. Fallan cuando el problema nunca fue de organización.
            </p>
          </div>
        </div>
      </section>

      <section style={{ background: KAIRON_THEME.bgAlt, borderTop: `1px solid ${KAIRON_THEME.border}`, borderBottom: `1px solid ${KAIRON_THEME.border}`, padding: "clamp(56px,7vw,90px) clamp(18px,5vw,40px)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(26px,3.4vw,38px)", lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0 }}>Dónde actúa cada una</h2>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: "rgba(245,243,240,0.6)", margin: "14px 0 0", maxWidth: "42em" }}>
            El trabajo tiene cuatro momentos. Las herramientas de organización cubren tres. El cuarto está vacío.
          </p>
          <div style={{ overflowX: "auto", marginTop: 32 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15, minWidth: 620 }}>
              <thead>
                <tr style={{ textAlign: "left", borderBottom: "1px solid rgba(245,243,240,0.2)" }}>
                  <th style={{ padding: "12px 14px 12px 0", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(245,243,240,0.5)" }}>Momento</th>
                  <th style={{ padding: "12px 14px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(245,243,240,0.5)" }}>Notion / ClickUp / Todoist</th>
                  <th style={{ padding: "12px 0 12px 14px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase", color: ORANGE }}>KAIRON</th>
                </tr>
              </thead>
              <tbody>
                {MOMENTS.map((row, i) => (
                  <tr key={row.moment} style={i < MOMENTS.length - 1 ? { borderBottom: "1px solid rgba(245,243,240,0.08)" } : undefined}>
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
          <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(26px,3.4vw,38px)", lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0 }}>Cuál necesitas</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20, marginTop: 32 }}>
            <div style={{ background: KAIRON_THEME.surface, border: `1px solid ${KAIRON_THEME.border}`, borderRadius: 16, padding: "clamp(24px,3vw,32px)" }}>
              <h3 className="font-display" style={{ fontSize: 19, fontWeight: 600, margin: 0 }}>Una herramienta de organización</h3>
              <div style={{ display: "grid", gap: 12, marginTop: 20 }}>
                {ORGANIZER_SIGNS.map((s) => (
                  <div key={s} style={{ display: "flex", gap: 12, fontSize: "15.5px", lineHeight: 1.55, color: "rgba(245,243,240,0.7)" }}>
                    <span aria-hidden="true" style={{ color: "rgba(245,243,240,0.35)" }}>—</span><span>{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: KAIRON_THEME.surface, border: "1px solid rgba(240,160,70,0.4)", borderRadius: 16, padding: "clamp(24px,3vw,32px)" }}>
              <h3 className="font-display" style={{ fontSize: 19, fontWeight: 600, margin: 0 }}>KAIRON</h3>
              <div style={{ display: "grid", gap: 12, marginTop: 20 }}>
                {KAIRON_SIGNS.map((s) => (
                  <div key={s} style={{ display: "flex", gap: 12, fontSize: "15.5px", lineHeight: 1.55, color: "rgba(245,243,240,0.7)" }}>
                    <span aria-hidden="true" style={{ color: ORANGE }}>—</span><span>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p style={{ fontSize: 16, lineHeight: 1.65, color: "rgba(245,243,240,0.6)", margin: "26px 0 0", maxWidth: "44em" }}>
            Si te reconoces en las dos columnas, el orden importa: primero resuelve la organización, después la fricción. KAIRON sobre un sistema caótico atribuye a un bloqueo cognitivo lo que en realidad es falta de claridad.
          </p>
        </div>
      </section>

      <section style={{ padding: "0 clamp(18px,5vw,40px) clamp(56px,7vw,90px)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(24px,3vw,34px)", lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0 }}>Preguntas frecuentes</h2>
          <div style={{ display: "grid", gap: 26, marginTop: 28 }}>
            {VS_NOTION_FAQ.map((item) => (
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
          <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(28px,4vw,46px)", lineHeight: 1.08, letterSpacing: "-0.025em", margin: 0 }}>Tu sistema está bien. El problema es otro.</h2>
          <p style={{ fontSize: "clamp(16px,1.8vw,19px)", lineHeight: 1.6, color: "rgba(245,243,240,0.6)", margin: "20px auto 0", maxWidth: "32em" }}>
            Siete días de KAIRON, sin tarjeta. Deja el gestor de tareas donde está.
          </p>
          <a
            href={finalHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCta("vs_final")}
            className="vsn-cta-pill"
            style={{ display: "inline-block", marginTop: 30, background: ORANGE, color: "#1A1000", fontWeight: 600, fontSize: 16, padding: "17px 30px", borderRadius: 999 }}
          >
            Empezar prueba de 7 días
          </a>
        </div>
      </section>

      <KaironDocFooter legalNote="Notion, ClickUp y Todoist son marcas de sus respectivos propietarios. Esta comparación es independiente." />

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
