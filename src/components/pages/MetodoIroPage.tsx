import { KaironDocHeader, KaironDocFooter } from "@/components/site/KaironDocChrome";
import { trackAcquisitionEvent, trackOutboundAppOpened } from "@/lib/analytics";
import { getLaunchPhase, kaironAppUrl } from "@/lib/launchConfig";
import { KAIRON_THEME } from "@/lib/kaironTheme";

/**
 * Canonical /metodo-iro page — full dark-theme recreation of the
 * "Metodo I-R-O.dc.html" design handoff prototype. This URL never moves
 * and is not fragmented (see design_handoff_gstructure_site/README.md).
 * Standalone (own header/footer, see the isStandalone check in
 * __root.tsx). Spanish only for now — the English translation
 * (/en/iro-method) is tracked separately per the handoff's "Tarea
 * principal: versiones en inglés" and still serves the legacy
 * light-theme IroMethodPage in the meantime.
 */

const ORANGE = KAIRON_THEME.accent;

const PHASES = [
  {
    letter: "I",
    title: "Identificar",
    body: "La persona describe la situación en sus propias palabras. Kai no acepta la descripción superficial —\"no tengo tiempo\", \"todavía no está listo\"— y hace preguntas hasta llegar al pensamiento que realmente está operando debajo. El resultado de esta fase es un nombre: cuál de los cuatro patrones está activo y qué creencia específica lo sostiene.",
    input: "Una situación concreta en la que la persona se detuvo.",
    output: "El patrón nombrado y la creencia explícita que lo mantiene.",
    error: "Quedarse en la primera explicación. Casi nunca es la real.",
  },
  {
    letter: "R",
    title: "Reestructurar",
    body: "La creencia identificada se somete a prueba. No se sustituye por una afirmación positiva, se contrasta con evidencia: qué la sostiene, qué la contradice, qué pasaría realmente si fuera falsa. El objetivo no es que la persona se sienta mejor, es que la interpretación deje de resultarle obvia.",
    input: "La creencia nombrada en la fase anterior.",
    output: "Una lectura alternativa que la persona reconoce como más precisa.",
    error: "Confundir reestructuración con motivación. No son lo mismo.",
  },
  {
    letter: "O",
    title: "Optimizar",
    body: "La claridad que no se convierte en movimiento se disipa en horas. La fase final cierra con una acción de cinco minutos: concreta, verificable, y lo bastante pequeña como para que la excusa anterior ya no aplique. No es la tarea completa. Es el primer movimiento que rompe la inercia.",
    input: "La lectura alternativa validada.",
    output: "Una acción de cinco minutos, ejecutable ahora.",
    error: "Proponer una acción demasiado grande y reactivar el bloqueo.",
  },
];

const NOT_METHOD = [
  { strong: "No es terapia.", rest: " No trata trastornos, no sustituye atención clínica y no está indicado para cuadros de ansiedad o depresión diagnosticados. Interviene sobre conducta de ejecución en personas funcionales." },
  { strong: "No es gestión de tareas.", rest: " No organiza el trabajo ni prioriza. Asume que la persona ya sabe qué tiene que hacer, porque en la mayoría de los casos lo sabe." },
  { strong: "No es motivación.", rest: " No apela a la voluntad ni refuerza con frases de aliento. Un pensamiento que resiste la evidencia no cede ante el entusiasmo." },
  { strong: "No es un cuestionario.", rest: " No hay test de personalidad ni tipología fija. El patrón se identifica en cada situación, y la misma persona puede activar patrones distintos según el contexto." },
];

const PATTERNS = [
  { n: "01", name: "Procrastinación", desc: "La tarea es clara, el inicio se posterga.", anchor: "procrastinacion" },
  { n: "02", name: "Perfeccionismo", desc: "Nada se entrega hasta que sea impecable.", anchor: "perfeccionismo" },
  { n: "03", name: "Autosabotaje", desc: "Decisiones que frenan el propio avance.", anchor: "autosabotaje" },
  { n: "04", name: "Síndrome del impostor", desc: "Capacidad real, confianza en duda.", anchor: "impostor" },
];

export const IRO_FAQ = [
  { q: "¿Cuánto dura una sesión de I-R-O?", a: "Entre tres y cinco minutos. Si se alarga más, normalmente significa que la fase de identificación no cerró y conviene reiniciar el ciclo con una situación más específica." },
  { q: "¿Se puede aplicar sin KAIRON?", a: "Sí. El método es público y esta página lo documenta completo. KAIRON aporta lo que una persona sola no puede hacerse a sí misma: sostener las preguntas cuando la primera explicación resulta cómoda, y estar disponible en el momento del bloqueo y no cuando ya pasó." },
  { q: "¿Qué diferencia hay con la terapia cognitivo-conductual?", a: "El fundamento es compartido; el alcance y el contexto no. La TCC trata cuadros clínicos en sesiones programadas con un profesional. I-R-O interviene sobre conducta de ejecución laboral, en el momento, y sin diagnóstico de por medio." },
  { q: "¿Con qué frecuencia debería usarse?", a: "Cuando aparece el bloqueo, no en horario fijo. El método pierde efecto si se convierte en rutina programada: su valor está en la proximidad al momento en que la persona se detuvo." },
];

function trackCta(location: string) {
  trackAcquisitionEvent("section_cta_clicked", { cta_location: location, language: "es" });
  trackOutboundAppOpened({ cta_location: location, language: "es" });
}

export function MetodoIroPage() {
  const navHref = kaironAppUrl("es", "metodo_nav", getLaunchPhase());
  const finalHref = kaironAppUrl("es", "metodo_final", getLaunchPhase());

  return (
    <div style={{ background: KAIRON_THEME.bg, color: KAIRON_THEME.text, overflowX: "hidden" }}>
      <KaironDocHeader current="metodo-iro" ctaHref={navHref} onCtaClick={() => trackCta("metodo_nav")} />

      <section style={{ padding: "clamp(56px,8vw,110px) clamp(18px,5vw,40px) clamp(40px,5vw,64px)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 9, alignItems: "center", fontSize: "12.5px", color: "rgba(245,243,240,0.4)", flexWrap: "wrap", whiteSpace: "nowrap" }}>
            <a href="/" className="iro-link">G-Structure</a>
            <span>/</span>
            <span>Metodología</span>
          </div>
          <div style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: ORANGE, marginTop: 26 }}>Documento de referencia</div>
          <h1 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(34px,5.6vw,62px)", lineHeight: 1.04, letterSpacing: "-0.025em", margin: "16px 0 0" }}>
            El Método I-R-O™
          </h1>
          <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "clamp(19px,2.3vw,26px)", lineHeight: 1.5, color: "rgba(245,243,240,0.8)", margin: "24px 0 0" }}>
            Identificar, Reestructurar, Optimizar. El marco de tres fases con el que KAIRON interviene sobre la fricción de ejecución: la distancia entre saber qué hacer y hacerlo.
          </p>
          <div style={{ fontSize: 13, color: "rgba(245,243,240,0.4)", marginTop: 24 }}>
            Desarrollado por Guillermo Suco, fundador de G-Structure · Última revisión: agosto de 2026
          </div>
        </div>
      </section>

      <section style={{ padding: "0 clamp(18px,5vw,40px) clamp(56px,7vw,90px)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={{ background: KAIRON_THEME.surface, border: `1px solid ${KAIRON_THEME.accentTint}`, borderRadius: 16, padding: "clamp(26px,4vw,40px)" }}>
            <div style={{ fontSize: "11.5px", letterSpacing: "0.16em", textTransform: "uppercase", color: ORANGE }}>Definición</div>
            <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "clamp(18px,2.1vw,23px)", lineHeight: 1.55, margin: "16px 0 0" }}>
              El Método I-R-O™ es un protocolo de tres fases que interviene sobre el pensamiento que sostiene un bloqueo de ejecución, en el momento en que el bloqueo aparece. Primero identifica el patrón cognitivo activo, después reestructura la interpretación que lo mantiene, y finalmente convierte esa reestructuración en una acción concreta y verificable.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: "0 clamp(18px,5vw,40px) clamp(56px,7vw,90px)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(26px,3.4vw,38px)", lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0 }}>De dónde viene</h2>
          <p style={{ fontSize: "clamp(16px,1.7vw,18.5px)", lineHeight: 1.7, color: "rgba(245,243,240,0.72)", margin: "20px 0 0" }}>
            El método no inventa psicología. Toma tres operaciones que la terapia cognitivo-conductual documenta desde hace décadas —identificación de pensamientos automáticos, reestructuración cognitiva y activación conductual— y las traslada a un contexto donde nunca habían operado: el momento exacto del trabajo en que una persona se detiene.
          </p>
          <p style={{ fontSize: "clamp(16px,1.7vw,18.5px)", lineHeight: 1.7, color: "rgba(245,243,240,0.72)", margin: "16px 0 0" }}>
            La aportación de I-R-O no es el contenido clínico. Es la latencia. Una sesión de terapia o de coaching ocurre días después del bloqueo, cuando la persona ya racionalizó lo que pasó y el material original se perdió. I-R-O se ejecuta en menos de cinco minutos, mientras el pensamiento todavía está disponible.
          </p>
          <div style={{ borderLeft: "2px solid rgba(240,160,70,0.5)", paddingLeft: 22, margin: "28px 0 0" }}>
            <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "clamp(18px,2.1vw,22px)", lineHeight: 1.5, color: "rgba(245,243,240,0.86)", margin: 0, fontStyle: "italic" }}>
              Un bloqueo de ejecución no se resuelve con más disciplina. Se resuelve desactivando la interpretación que lo hace razonable.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: "0 clamp(18px,5vw,40px) clamp(56px,7vw,90px)" }}>
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>
          <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(26px,3.4vw,38px)", lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0, maxWidth: "16em" }}>Las tres fases</h2>
          <div style={{ display: "grid", gap: 20, marginTop: 36 }}>
            {PHASES.map((p) => (
              <div key={p.letter} style={{ background: KAIRON_THEME.surface, border: `1px solid ${KAIRON_THEME.border}`, borderRadius: 18, padding: "clamp(26px,3.6vw,44px)" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
                  <span className="font-display" style={{ fontSize: "clamp(46px,6vw,72px)", fontWeight: 600, color: ORANGE, lineHeight: 0.9 }}>{p.letter}</span>
                  <h3 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(22px,2.6vw,30px)", letterSpacing: "-0.015em", margin: 0 }}>{p.title}</h3>
                </div>
                <p style={{ fontSize: "clamp(16px,1.7vw,18.5px)", lineHeight: 1.7, color: "rgba(245,243,240,0.74)", margin: "20px 0 0", maxWidth: "44em" }}>{p.body}</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 18, marginTop: 26, paddingTop: 24, borderTop: `1px solid ${KAIRON_THEME.border}` }}>
                  <div>
                    <div style={{ fontSize: "11.5px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,243,240,0.4)" }}>Entrada</div>
                    <div style={{ fontSize: 15, lineHeight: 1.55, color: "rgba(245,243,240,0.72)", marginTop: 8 }}>{p.input}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "11.5px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,243,240,0.4)" }}>Salida</div>
                    <div style={{ fontSize: 15, lineHeight: 1.55, color: "rgba(245,243,240,0.72)", marginTop: 8 }}>{p.output}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "11.5px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,243,240,0.4)" }}>Error frecuente</div>
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
          <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(26px,3.4vw,38px)", lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0 }}>Qué no es el Método I-R-O</h2>
          <p style={{ fontSize: "clamp(16px,1.7vw,18.5px)", lineHeight: 1.7, color: "rgba(245,243,240,0.72)", margin: "20px 0 0" }}>
            Delimitar el alcance es parte de la definición. Un método que dice servir para todo no sirve para nada en particular.
          </p>
          <div style={{ display: "grid", gap: 14, marginTop: 26 }}>
            {NOT_METHOD.map((item) => (
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
          <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(26px,3.4vw,38px)", lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0 }}>Sobre qué actúa</h2>
          <p style={{ fontSize: "clamp(16px,1.7vw,18.5px)", lineHeight: 1.7, color: "rgba(245,243,240,0.66)", margin: "18px 0 0", maxWidth: "44em" }}>
            El método opera sobre cuatro patrones de bloqueo. Cada uno tiene una lógica interna distinta y requiere una reestructuración diferente.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 16, marginTop: 34 }}>
            {PATTERNS.map((pat) => (
              <a key={pat.anchor} href={`/bloqueos#${pat.anchor}`} className="iro-pattern-card">
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
          <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(26px,3.4vw,38px)", lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0 }}>Preguntas frecuentes</h2>
          <div style={{ display: "grid", gap: 26, marginTop: 30 }}>
            {IRO_FAQ.map((item) => (
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
            Leerlo es una cosa. Aplicarlo sobre tu propio bloqueo es otra.
          </h2>
          <p style={{ fontSize: "clamp(16px,1.8vw,19px)", lineHeight: 1.6, color: "rgba(245,243,240,0.6)", margin: "20px auto 0", maxWidth: "32em" }}>
            Siete días de KAIRON, sin tarjeta. El método corriendo sobre tus situaciones reales.
          </p>
          <a
            href={finalHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCta("metodo_final")}
            className="iro-cta-pill"
            style={{ display: "inline-block", marginTop: 30, background: ORANGE, color: "#1A1000", fontWeight: 600, fontSize: 16, padding: "17px 30px", borderRadius: 999 }}
          >
            Empezar prueba de 7 días
          </a>
        </div>
      </section>

      <KaironDocFooter />

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
