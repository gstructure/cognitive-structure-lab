import { KaironDocHeader, KaironDocFooter } from "@/components/site/KaironDocChrome";
import { trackAcquisitionEvent, trackOutboundAppOpened } from "@/lib/analytics";
import { getLaunchPhase, kaironAppUrl } from "@/lib/launchConfig";
import { KAIRON_THEME } from "@/lib/kaironTheme";

/**
 * Canonical /indice-friccion page — full dark-theme recreation of the
 * "Indice de Friccion.dc.html" design handoff prototype: the Execution
 * Friction Index (IFE) research page. Standalone (own header/footer, see
 * the isStandalone check in __root.tsx). Spanish only for now — see the
 * note on MetodoIroPage.tsx for why the English translation is a
 * separate, later task.
 *
 * Both the pilot-sample warning and the 38/29/21/12 distribution figures
 * are provisional per the handoff — it explicitly calls these out as
 * placeholders to be replaced with the real KAIRON panel export before
 * publishing, dated to a real data cutoff. Left as-is here; do not treat
 * as real data.
 */

const ORANGE = KAIRON_THEME.accent;

const BANDS = [
  { range: "0 – 25", label: "Baja", desc: "La ejecución sigue a la decisión sin resistencia apreciable.", highlight: false },
  { range: "26 – 50", label: "Moderada", desc: "Retrasos frecuentes en tareas concretas, sin patrón estable.", highlight: false },
  { range: "51 – 75", label: "Alta", desc: "Un patrón identificable bloquea de forma recurrente el mismo tipo de tarea.", highlight: true },
  { range: "76 – 100", label: "Crítica", desc: "La intención deja de ser un predictor útil de la conducta.", highlight: false },
];

const VARIABLES = [
  { id: "V1", name: "Tasa de conversión de intención", desc: "Proporción de acciones acordadas al cierre de una sesión I-R-O que se confirman como ejecutadas en el siguiente contacto." },
  { id: "V2", name: "Latencia de inicio", desc: "Tiempo transcurrido entre la decisión de actuar y el primer movimiento verificable, normalizado por el tipo de tarea." },
  { id: "V3", name: "Recurrencia de patrón", desc: "Número de veces que el mismo patrón cognitivo se identifica sobre el mismo tipo de tarea dentro de un periodo de 30 días." },
];

export const DISTRIBUTION = [
  { name: "Perfeccionismo", pct: 38 },
  { name: "Procrastinación", pct: 29 },
  { name: "Síndrome del impostor", pct: 21 },
  { name: "Autosabotaje", pct: 12 },
];

function trackCta(location: string) {
  trackAcquisitionEvent("section_cta_clicked", { cta_location: location, language: "es" });
  trackOutboundAppOpened({ cta_location: location, language: "es" });
}

export function IndiceFriccionPage() {
  const navHref = kaironAppUrl("es", "ife_nav", getLaunchPhase());

  return (
    <div style={{ background: KAIRON_THEME.bg, color: KAIRON_THEME.text, overflowX: "hidden" }}>
      <KaironDocHeader locale="es" current="indice-friccion" ctaHref={navHref} onCtaClick={() => trackCta("ife_nav")} />

      <section style={{ padding: "clamp(56px,8vw,110px) clamp(18px,5vw,40px) clamp(40px,5vw,60px)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 9, alignItems: "center", fontSize: "12.5px", color: "rgba(245,243,240,0.4)", flexWrap: "wrap", whiteSpace: "nowrap" }}>
            <a href="/" className="ife-link">G-Structure</a>
            <span>/</span>
            <span>Investigación</span>
          </div>
          <div style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: ORANGE, marginTop: 26 }}>Edición preliminar · Agosto 2026</div>
          <h1 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(32px,5.2vw,58px)", lineHeight: 1.05, letterSpacing: "-0.025em", margin: "16px 0 0" }}>
            Índice de Fricción de Ejecución
          </h1>
          <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "clamp(19px,2.3vw,26px)", lineHeight: 1.5, color: "rgba(245,243,240,0.8)", margin: "24px 0 0" }}>
            Cuánta distancia hay, en entornos profesionales reales, entre decidir hacer algo y hacerlo. Una medida abierta, construida sobre las sesiones anonimizadas de KAIRON.
          </p>
        </div>
      </section>

      <section style={{ padding: "0 clamp(18px,5vw,40px) clamp(50px,6vw,80px)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={{ background: KAIRON_THEME.surface, border: `1px solid rgba(240,160,70,0.3)`, borderRadius: 16, padding: "clamp(24px,3.4vw,36px)" }}>
            <div style={{ fontSize: "11.5px", letterSpacing: "0.16em", textTransform: "uppercase", color: ORANGE }}>Advertencia sobre esta edición</div>
            <p style={{ fontSize: "16.5px", lineHeight: 1.65, color: "rgba(245,243,240,0.78)", margin: "14px 0 0" }}>
              Esta primera edición se publica con una muestra piloto de 52 participantes. No es representativa a nivel poblacional y no debe leerse como estadística nacional o sectorial. Se publica igualmente porque la metodología es lo que se somete a escrutinio, y porque la única forma de mejorar la muestra es abrir el instrumento.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: "0 clamp(18px,5vw,40px) clamp(56px,7vw,90px)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(26px,3.4vw,38px)", lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0 }}>Qué mide</h2>
          <p style={{ fontSize: "clamp(16px,1.7vw,18.5px)", lineHeight: 1.7, color: "rgba(245,243,240,0.72)", margin: "20px 0 0", maxWidth: "44em" }}>
            El IFE es un valor de 0 a 100 que expresa la proporción de intenciones declaradas que no se convierten en acción dentro de su ventana prevista, ponderada por la relevancia que la propia persona asigna a cada intención. Un valor bajo indica que lo que se decide hacer efectivamente se hace; uno alto, que la intención y la ejecución están sistemáticamente desacopladas.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginTop: 34 }}>
            {BANDS.map((b) => (
              <div
                key={b.range}
                style={{
                  background: KAIRON_THEME.surface,
                  border: b.highlight ? "1px solid rgba(240,160,70,0.4)" : `1px solid ${KAIRON_THEME.border}`,
                  borderRadius: 14, padding: 24,
                }}
              >
                <div className="font-display" style={{ fontSize: 13, color: b.highlight ? ORANGE : "rgba(245,243,240,0.45)" }}>{b.range}</div>
                <div className="font-display" style={{ fontSize: 18, fontWeight: 600, marginTop: 10 }}>{b.label}</div>
                <p style={{ fontSize: "14.5px", lineHeight: 1.55, color: "rgba(245,243,240,0.58)", margin: "8px 0 0" }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: KAIRON_THEME.bgAlt, borderTop: `1px solid ${KAIRON_THEME.border}`, borderBottom: `1px solid ${KAIRON_THEME.border}`, padding: "clamp(56px,7vw,90px) clamp(18px,5vw,40px)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(26px,3.4vw,38px)", lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0 }}>Cómo se calcula</h2>
          <p style={{ fontSize: "clamp(16px,1.7vw,18.5px)", lineHeight: 1.7, color: "rgba(245,243,240,0.68)", margin: "18px 0 0", maxWidth: "44em" }}>
            Tres variables, recogidas en la propia sesión de KAIRON sin cuestionario añadido. La metodología completa es pública para que cualquiera pueda replicarla o refutarla.
          </p>
          <div style={{ display: "grid", gap: 18, marginTop: 32 }}>
            {VARIABLES.map((v) => (
              <div key={v.id} style={{ display: "flex", gap: 20, alignItems: "flex-start", background: KAIRON_THEME.surface2, border: `1px solid ${KAIRON_THEME.border}`, borderRadius: 14, padding: 24 }}>
                <span className="font-display" style={{ fontSize: 15, color: ORANGE, flex: "none" }}>{v.id}</span>
                <div>
                  <h3 className="font-display" style={{ fontSize: 17, fontWeight: 600, margin: 0 }}>{v.name}</h3>
                  <p style={{ fontSize: "15.5px", lineHeight: 1.6, color: "rgba(245,243,240,0.66)", margin: "8px 0 0" }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.65, color: "rgba(245,243,240,0.5)", margin: "26px 0 0", maxWidth: "44em" }}>
            Los datos se agregan de forma anónima y ninguna organización recibe información individual de sus colaboradores. La separación entre datos personales y datos agregados es estructural, no una política revisable.
          </p>
        </div>
      </section>

      <section style={{ padding: "clamp(56px,7vw,90px) clamp(18px,5vw,40px)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(26px,3.4vw,38px)", lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0 }}>Distribución de patrones en la muestra piloto</h2>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: "rgba(245,243,240,0.6)", margin: "14px 0 0", maxWidth: "42em" }}>
            Qué patrón se identificó con más frecuencia en las sesiones registradas. Los porcentajes suman más de 100 porque una misma persona activa patrones distintos según la situación.
          </p>
          <div style={{ display: "grid", gap: 20, marginTop: 34, maxWidth: 720 }}>
            {DISTRIBUTION.map((d) => (
              <div key={d.name}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", fontSize: "15.5px" }}>
                  <span style={{ fontWeight: 500 }}>{d.name}</span>
                  <span className="font-display" style={{ color: ORANGE }}>{d.pct}%</span>
                </div>
                <div style={{ height: 6, background: "rgba(245,243,240,0.08)", borderRadius: 999, marginTop: 9, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${d.pct}%`, background: ORANGE, borderRadius: 999 }} />
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: "rgba(245,243,240,0.42)", margin: "24px 0 0", maxWidth: "44em" }}>
            Cifras provisionales pendientes de confirmación con la muestra completa. Antes de publicar, sustituir por los valores reales exportados del panel de KAIRON y fechar el corte de datos.
          </p>
        </div>
      </section>

      <section style={{ padding: "0 clamp(18px,5vw,40px) clamp(56px,7vw,90px)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(24px,3vw,34px)", lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0 }}>Cómo citar este índice</h2>
          <div style={{ background: KAIRON_THEME.surface, border: `1px solid ${KAIRON_THEME.border}`, borderRadius: 14, padding: 24, marginTop: 20 }}>
            <p style={{ fontSize: "15.5px", lineHeight: 1.65, color: "rgba(245,243,240,0.74)", margin: 0 }}>
              G-Structure (2026). <em>Índice de Fricción de Ejecución, edición preliminar</em>. Guayaquil, Ecuador. Disponible en g-structure.co/indice-friccion
            </p>
          </div>
          <p style={{ fontSize: "15.5px", lineHeight: 1.65, color: "rgba(245,243,240,0.6)", margin: "20px 0 0" }}>
            El instrumento y la metodología son de uso libre, incluida su aplicación por parte de terceros con fines de investigación. Para acceder a los datos agregados en formato estructurado, escribe a{" "}
            <a href="mailto:guillermo@g-structure.co" className="ife-mail-link" style={{ color: ORANGE }}>guillermo@g-structure.co</a>.
          </p>
        </div>
      </section>

      <section style={{ padding: "0 clamp(18px,5vw,40px) clamp(70px,9vw,120px)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center", borderTop: `1px solid ${KAIRON_THEME.border}`, paddingTop: "clamp(48px,6vw,72px)" }}>
          <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(28px,4vw,46px)", lineHeight: 1.08, letterSpacing: "-0.025em", margin: 0 }}>Mide la fricción de tu equipo</h2>
          <p style={{ fontSize: "clamp(16px,1.8vw,19px)", lineHeight: 1.6, color: "rgba(245,243,240,0.6)", margin: "20px auto 0", maxWidth: "32em" }}>
            El Execution Diagnostic aplica el mismo instrumento sobre una cohorte real y entrega el resultado agregado en 30 días.
          </p>
          <a
            href="/teams"
            onClick={() => trackCta("ife_final_teams")}
            className="ife-cta-pill"
            style={{ display: "inline-block", marginTop: 30, background: ORANGE, color: "#1A1000", fontWeight: 600, fontSize: 16, padding: "17px 30px", borderRadius: 999 }}
          >
            Ver KAIRON for Teams
          </a>
        </div>
      </section>

      <KaironDocFooter />

      <style>{`
        .ife-link { color: rgba(245,243,240,0.4); }
        .ife-link:hover { color: ${ORANGE}; }
        .ife-mail-link:hover { color: ${KAIRON_THEME.accentHover}; }
        .ife-cta-pill:hover { background: ${KAIRON_THEME.accentHover}; }
        .ife-link:focus-visible, .ife-mail-link:focus-visible, .ife-cta-pill:focus-visible {
          outline: 2px solid ${ORANGE}; outline-offset: 3px; border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
