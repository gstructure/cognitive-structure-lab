import { KaironDocHeader, KaironDocFooter } from "@/components/site/KaironDocChrome";
import { trackAcquisitionEvent, trackOutboundAppOpened } from "@/lib/analytics";
import { getLaunchPhase, kaironAppUrl } from "@/lib/launchConfig";
import { KAIRON_THEME } from "@/lib/kaironTheme";
import type { Locale } from "@/lib/i18n";

/**
 * Canonical /indice-friccion (and /en/friction-index) page — full
 * dark-theme recreation of the "Indice de Friccion.dc.html" design
 * handoff prototype: the Execution Friction Index research page.
 * Standalone (own header/footer, see the isStandalone check in
 * __root.tsx). See the note on MetodoIroPage.tsx for the translation
 * rules the English copy follows — notably, the handoff's rule 5 changes
 * the acronym itself: "Índice de Fricción de Ejecución" (IFE) becomes
 * "Execution Friction Index (EFI)" in English, not a literal IFE.
 *
 * Both the pilot-sample warning and the 38/29/21/12 distribution figures
 * are provisional per the handoff — it explicitly calls these out as
 * placeholders to be replaced with the real KAIRON panel export before
 * publishing, dated to a real data cutoff. Left as-is here (in both
 * languages); do not treat as real data.
 */

const ORANGE = KAIRON_THEME.accent;

type Band = { range: string; label: string; desc: string; highlight: boolean };
type Variable = { id: string; name: string; desc: string };
type DistRow = { name: string; pct: number };

type Copy = {
  breadcrumbSection: string;
  kicker: string;
  title: string;
  subtitle: string;
  warningKicker: string;
  warningBody: string;
  measuresTitle: string;
  measuresBody: string;
  bands: Band[];
  calcTitle: string;
  calcBody: string;
  variables: Variable[];
  privacyNote: string;
  distTitle: string;
  distBody: string;
  distribution: DistRow[];
  distNote: string;
  citeTitle: string;
  citation: string;
  usageNote: string;
  finalTitle: string;
  finalSub: string;
  cta: string;
};

export const INDICE_FRICCION_COPY: Record<Locale, Copy> = {
  es: {
    breadcrumbSection: "Investigación",
    kicker: "Edición preliminar · Agosto 2026",
    title: "Índice de Fricción de Ejecución",
    subtitle: "Cuánta distancia hay, en entornos profesionales reales, entre decidir hacer algo y hacerlo. Una medida abierta, construida sobre las sesiones anonimizadas de KAIRON.",
    warningKicker: "Advertencia sobre esta edición",
    warningBody: "Esta primera edición se publica con una muestra piloto de 52 participantes. No es representativa a nivel poblacional y no debe leerse como estadística nacional o sectorial. Se publica igualmente porque la metodología es lo que se somete a escrutinio, y porque la única forma de mejorar la muestra es abrir el instrumento.",
    measuresTitle: "Qué mide",
    measuresBody: "El IFE es un valor de 0 a 100 que expresa la proporción de intenciones declaradas que no se convierten en acción dentro de su ventana prevista, ponderada por la relevancia que la propia persona asigna a cada intención. Un valor bajo indica que lo que se decide hacer efectivamente se hace; uno alto, que la intención y la ejecución están sistemáticamente desacopladas.",
    bands: [
      { range: "0 – 25", label: "Baja", desc: "La ejecución sigue a la decisión sin resistencia apreciable.", highlight: false },
      { range: "26 – 50", label: "Moderada", desc: "Retrasos frecuentes en tareas concretas, sin patrón estable.", highlight: false },
      { range: "51 – 75", label: "Alta", desc: "Un patrón identificable bloquea de forma recurrente el mismo tipo de tarea.", highlight: true },
      { range: "76 – 100", label: "Crítica", desc: "La intención deja de ser un predictor útil de la conducta.", highlight: false },
    ],
    calcTitle: "Cómo se calcula",
    calcBody: "Tres variables, recogidas en la propia sesión de KAIRON sin cuestionario añadido. La metodología completa es pública para que cualquiera pueda replicarla o refutarla.",
    variables: [
      { id: "V1", name: "Tasa de conversión de intención", desc: "Proporción de acciones acordadas al cierre de una sesión I-R-O que se confirman como ejecutadas en el siguiente contacto." },
      { id: "V2", name: "Latencia de inicio", desc: "Tiempo transcurrido entre la decisión de actuar y el primer movimiento verificable, normalizado por el tipo de tarea." },
      { id: "V3", name: "Recurrencia de patrón", desc: "Número de veces que el mismo patrón cognitivo se identifica sobre el mismo tipo de tarea dentro de un periodo de 30 días." },
    ],
    privacyNote: "Los datos se agregan de forma anónima y ninguna organización recibe información individual de sus colaboradores. La separación entre datos personales y datos agregados es estructural, no una política revisable.",
    distTitle: "Distribución de patrones en la muestra piloto",
    distBody: "Qué patrón se identificó con más frecuencia en las sesiones registradas. Los porcentajes suman más de 100 porque una misma persona activa patrones distintos según la situación.",
    distribution: [
      { name: "Perfeccionismo", pct: 38 },
      { name: "Procrastinación", pct: 29 },
      { name: "Síndrome del impostor", pct: 21 },
      { name: "Autosabotaje", pct: 12 },
    ],
    distNote: "Cifras provisionales pendientes de confirmación con la muestra completa. Antes de publicar, sustituir por los valores reales exportados del panel de KAIRON y fechar el corte de datos.",
    citeTitle: "Cómo citar este índice",
    citation: "G-Structure (2026). Índice de Fricción de Ejecución, edición preliminar. Guayaquil, Ecuador. Disponible en g-structure.co/indice-friccion",
    usageNote: "El instrumento y la metodología son de uso libre, incluida su aplicación por parte de terceros con fines de investigación. Para acceder a los datos agregados en formato estructurado, escribe a",
    finalTitle: "Mide la fricción de tu equipo",
    finalSub: "El Execution Diagnostic aplica el mismo instrumento sobre una cohorte real y entrega el resultado agregado en 30 días.",
    cta: "Ver KAIRON for Teams",
  },
  en: {
    breadcrumbSection: "Research",
    kicker: "Preliminary edition · August 2026",
    title: "Execution Friction Index",
    subtitle: "How much distance there is, in real professional settings, between deciding to do something and doing it. An open measure, built on KAIRON's anonymized sessions.",
    warningKicker: "A note on this edition",
    warningBody: "This first edition is published with a pilot sample of 52 participants. It isn't representative at the population level and shouldn't be read as national or sector-wide statistics. It's published anyway because the methodology is what's meant to be scrutinized, and because the only way to improve the sample is to open up the instrument.",
    measuresTitle: "What it measures",
    measuresBody: "The EFI is a value from 0 to 100 that expresses the proportion of declared intentions that don't turn into action within their expected window, weighted by how relevant the person themselves rates each intention. A low value means what gets decided actually gets done; a high one means intention and execution are systematically decoupled.",
    bands: [
      { range: "0 – 25", label: "Low", desc: "Execution follows the decision with no appreciable resistance.", highlight: false },
      { range: "26 – 50", label: "Moderate", desc: "Frequent delays on specific tasks, with no stable pattern.", highlight: false },
      { range: "51 – 75", label: "High", desc: "An identifiable pattern recurrently blocks the same type of task.", highlight: true },
      { range: "76 – 100", label: "Critical", desc: "Intention stops being a useful predictor of behavior.", highlight: false },
    ],
    calcTitle: "How it's calculated",
    calcBody: "Three variables, collected within the KAIRON session itself, with no added questionnaire. The full methodology is public so anyone can replicate or challenge it.",
    variables: [
      { id: "V1", name: "Intention conversion rate", desc: "Proportion of actions agreed on at the close of an I-R-O session that get confirmed as done at the next contact." },
      { id: "V2", name: "Start latency", desc: "Time elapsed between the decision to act and the first verifiable move, normalized by task type." },
      { id: "V3", name: "Pattern recurrence", desc: "Number of times the same cognitive pattern gets identified on the same type of task within a 30-day period." },
    ],
    privacyNote: "Data is aggregated anonymously, and no organization receives individual information about its people. The separation between personal data and aggregated data is structural, not a revisable policy.",
    distTitle: "Pattern distribution in the pilot sample",
    distBody: "Which pattern was identified most often across recorded sessions. Percentages add up to more than 100 because the same person activates different patterns depending on the situation.",
    distribution: [
      { name: "Perfectionism", pct: 38 },
      { name: "Procrastination", pct: 29 },
      { name: "Impostor syndrome", pct: 21 },
      { name: "Self-sabotage", pct: 12 },
    ],
    distNote: "Provisional figures, pending confirmation with the full sample. Before publishing, replace with the real values exported from the KAIRON panel and date the data cutoff.",
    citeTitle: "How to cite this index",
    citation: "G-Structure (2026). Execution Friction Index, preliminary edition. Guayaquil, Ecuador. Available at g-structure.co/en/friction-index",
    usageNote: "The instrument and methodology are free to use, including application by third parties for research purposes. To access the aggregated data in structured format, write to",
    finalTitle: "Measure your team's friction",
    finalSub: "The Execution Diagnostic applies the same instrument to a real cohort and delivers the aggregated result in 30 days.",
    cta: "See KAIRON for Teams",
  },
};

function trackCta(locale: Locale, location: string) {
  trackAcquisitionEvent("section_cta_clicked", { cta_location: location, language: locale });
  trackOutboundAppOpened({ cta_location: location, language: locale });
}

export function IndiceFriccionPage({ locale = "es" }: { locale?: Locale }) {
  const c = INDICE_FRICCION_COPY[locale];
  const navHref = kaironAppUrl(locale, "ife_nav", getLaunchPhase());
  const homePath = locale === "en" ? "/en" : "/";

  return (
    <div style={{ background: KAIRON_THEME.bg, color: KAIRON_THEME.text, overflowX: "hidden" }}>
      <KaironDocHeader locale={locale} current="indice-friccion" ctaHref={navHref} onCtaClick={() => trackCta(locale, "ife_nav")} />

      <section style={{ padding: "clamp(56px,8vw,110px) clamp(18px,5vw,40px) clamp(40px,5vw,60px)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 9, alignItems: "center", fontSize: "12.5px", color: "rgba(245,243,240,0.4)", flexWrap: "wrap", whiteSpace: "nowrap" }}>
            <a href={homePath} className="ife-link">G-Structure</a>
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
          <div style={{ background: KAIRON_THEME.surface, border: `1px solid rgba(240,160,70,0.3)`, borderRadius: 16, padding: "clamp(24px,3.4vw,36px)" }}>
            <div style={{ fontSize: "11.5px", letterSpacing: "0.16em", textTransform: "uppercase", color: ORANGE }}>{c.warningKicker}</div>
            <p style={{ fontSize: "16.5px", lineHeight: 1.65, color: "rgba(245,243,240,0.78)", margin: "14px 0 0" }}>
              {c.warningBody}
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: "0 clamp(18px,5vw,40px) clamp(56px,7vw,90px)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(26px,3.4vw,38px)", lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0 }}>{c.measuresTitle}</h2>
          <p style={{ fontSize: "clamp(16px,1.7vw,18.5px)", lineHeight: 1.7, color: "rgba(245,243,240,0.72)", margin: "20px 0 0", maxWidth: "44em" }}>
            {c.measuresBody}
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginTop: 34 }}>
            {c.bands.map((b) => (
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
          <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(26px,3.4vw,38px)", lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0 }}>{c.calcTitle}</h2>
          <p style={{ fontSize: "clamp(16px,1.7vw,18.5px)", lineHeight: 1.7, color: "rgba(245,243,240,0.68)", margin: "18px 0 0", maxWidth: "44em" }}>
            {c.calcBody}
          </p>
          <div style={{ display: "grid", gap: 18, marginTop: 32 }}>
            {c.variables.map((v) => (
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
            {c.privacyNote}
          </p>
        </div>
      </section>

      <section style={{ padding: "clamp(56px,7vw,90px) clamp(18px,5vw,40px)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(26px,3.4vw,38px)", lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0 }}>{c.distTitle}</h2>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: "rgba(245,243,240,0.6)", margin: "14px 0 0", maxWidth: "42em" }}>
            {c.distBody}
          </p>
          <div style={{ display: "grid", gap: 20, marginTop: 34, maxWidth: 720 }}>
            {c.distribution.map((d) => (
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
            {c.distNote}
          </p>
        </div>
      </section>

      <section style={{ padding: "0 clamp(18px,5vw,40px) clamp(56px,7vw,90px)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(24px,3vw,34px)", lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0 }}>{c.citeTitle}</h2>
          <div style={{ background: KAIRON_THEME.surface, border: `1px solid ${KAIRON_THEME.border}`, borderRadius: 14, padding: 24, marginTop: 20 }}>
            <p style={{ fontSize: "15.5px", lineHeight: 1.65, color: "rgba(245,243,240,0.74)", margin: 0 }}>
              {c.citation}
            </p>
          </div>
          <p style={{ fontSize: "15.5px", lineHeight: 1.65, color: "rgba(245,243,240,0.6)", margin: "20px 0 0" }}>
            {c.usageNote}{" "}
            <a href="mailto:guillermo@g-structure.co" className="ife-mail-link" style={{ color: ORANGE }}>guillermo@g-structure.co</a>.
          </p>
        </div>
      </section>

      <section style={{ padding: "0 clamp(18px,5vw,40px) clamp(70px,9vw,120px)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center", borderTop: `1px solid ${KAIRON_THEME.border}`, paddingTop: "clamp(48px,6vw,72px)" }}>
          <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(28px,4vw,46px)", lineHeight: 1.08, letterSpacing: "-0.025em", margin: 0 }}>{c.finalTitle}</h2>
          <p style={{ fontSize: "clamp(16px,1.8vw,19px)", lineHeight: 1.6, color: "rgba(245,243,240,0.6)", margin: "20px auto 0", maxWidth: "32em" }}>
            {c.finalSub}
          </p>
          <a
            href="/teams"
            onClick={() => trackCta(locale, "ife_final_teams")}
            className="ife-cta-pill"
            style={{ display: "inline-block", marginTop: 30, background: ORANGE, color: "#1A1000", fontWeight: 600, fontSize: 16, padding: "17px 30px", borderRadius: 999 }}
          >
            {c.cta}
          </a>
        </div>
      </section>

      <KaironDocFooter locale={locale} />

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
