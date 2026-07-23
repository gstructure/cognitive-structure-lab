import { createFileRoute } from "@tanstack/react-router";
import { ProductLayout } from "@/components/layouts/ProductLayout";
import { ProductHeader } from "@/components/product/ProductHeader";
import { KaironHero } from "@/components/product/KaironHero";
import { KaironProofDashboard } from "@/components/product/KaironProofDashboard";

export const Route = createFileRoute("/mockup/kairon-hero")({
  component: MockupKaironHero,
});

const PATTERNS = [
  { t: "Procrastinación", d: "La acción se posterga aunque la tarea sea importante.", accent: "#EFA831" },
  { t: "Perfeccionismo", d: "El estándar se vuelve una excusa elegante para no avanzar.", accent: "#3A2E8C" },
  { t: "Impostor", d: "El logro no se siente propio, y eso frena el siguiente paso.", accent: "#F0A046" },
  { t: "Autosabotaje", d: "La conducta contradice el objetivo que la persona dice querer.", accent: "#EFA831" },
];

/**
 * MOCKUP ROUTE — for visual approval only.
 * Shows the KAIRON product surface with the "Purple Cow" depth pass:
 * gradient mesh, bento containment, kinetic Kai, interactive proof
 * dashboard, and editorial negative space alternating with dense
 * bento grids. Remove this route after final approval.
 */
function MockupKaironHero() {
  return (
    <ProductLayout>
      <ProductHeader />
      <KaironHero locale="es" />

      {/* PROOF — dense bento block right after hero, showing the engine "running" */}
      <section id="how-it-works" className="kairon-mesh" style={{ padding: "2rem clamp(1.25rem, 5vw, 4.5rem) 7rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "1.5rem", flexWrap: "wrap" }}>
            <div>
              <p className="kairon-eyebrow">EL MOTOR I-R-O EN VIVO</p>
              <h2 style={{ marginTop: "0.75rem", fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)", color: "#F8F1E8", maxWidth: "24ch", lineHeight: 1.1 }}>
                No es una lista de funciones. Es un sistema que puedes ver pensar.
              </h2>
            </div>
          </div>

          <div className="proof-section-grid" style={{ marginTop: "2.5rem" }}>
            <KaironProofDashboard locale="es" />

            {/* Companion bento — session stats, dense data block beside the live panel */}
            <div className="kairon-bento" style={{ padding: "1.75rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.18em", color: "#7A6C5E", textTransform: "uppercase" }}>
                  VALIDACIÓN
                </p>
                <div style={{ marginTop: "1.25rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "rgb(239 168 49 / 12%)" }}>
                  {[
                    { v: "52", l: "usuarios reales" },
                    { v: "40", l: "en Ecuador" },
                    { v: "12", l: "en EE.UU." },
                    { v: "12m", l: "sesión máx." },
                  ].map((s) => (
                    <div key={s.l} style={{ background: "#150F0A", padding: "0.9rem" }}>
                      <p style={{ fontFamily: "var(--font-display, Manrope, sans-serif)", fontSize: "1.5rem", fontWeight: 700, color: "#F8F1E8" }}>{s.v}</p>
                      <p style={{ fontSize: "0.6875rem", color: "#7A6C5E", marginTop: "0.2rem" }}>{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>
              <blockquote style={{ marginTop: "1.5rem", paddingTop: "1.25rem", borderTop: "1px solid rgb(239 168 49 / 12%)", fontSize: "0.875rem", color: "#BDB0A3", fontStyle: "italic", lineHeight: 1.55 }}>
                "Intenté engañarlo, y aun así detectó mi patrón correctamente."
                <footer style={{ marginTop: "0.5rem", fontSize: "0.75rem", color: "#7A6C5E", fontStyle: "normal" }}>
                  — HR Manager, Philadelphia
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <div className="kairon-divider" />

      {/* FOUR PATTERNS — dense bento grid, editorial space above */}
      <section id="features" style={{ padding: "7rem clamp(1.25rem, 5vw, 4.5rem)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <p className="kairon-eyebrow">CUATRO PATRONES</p>
          <h2 style={{ marginTop: "0.75rem", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#F8F1E8", maxWidth: "20ch", lineHeight: 1.05 }}>
            Donde se rompe la ejecución, siempre.
          </h2>

          <div style={{ marginTop: "3rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1px", background: "rgb(239 168 49 / 12%)" }}>
            {PATTERNS.map((p) => (
              <div key={p.t} className="kairon-bento" style={{ borderRadius: 0, padding: "2rem" }}>
                <span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: p.accent }} />
                <h3 style={{ marginTop: "1rem", fontSize: "1.25rem", color: "#F8F1E8", fontFamily: "var(--font-display, Manrope, sans-serif)" }}>
                  {p.t}
                </h3>
                <p style={{ marginTop: "0.75rem", fontSize: "0.875rem", color: "#BDB0A3", lineHeight: 1.6 }}>
                  {p.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial breather — massive negative space, single line, no card */}
      <section style={{ padding: "9rem clamp(1.25rem, 5vw, 4.5rem)", textAlign: "center" }}>
        <p style={{
          maxWidth: "26ch",
          margin: "0 auto",
          fontSize: "clamp(1.75rem, 3.6vw, 2.75rem)",
          lineHeight: 1.25,
          color: "#F8F1E8",
          fontFamily: "var(--font-display, Manrope, sans-serif)",
        }}>
          El orden mental no es un lujo. Es la base de una acción{" "}
          <span className="kairon-gradient-text">clara, funcional y sostenible</span>.
        </p>
      </section>

      <style>{`
        .kairon-eyebrow {
          color: #EFA831;
          font-family: var(--font-display, "Manrope", sans-serif);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .proof-section-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.3fr) minmax(280px, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 900px) {
          .proof-section-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </ProductLayout>
  );
}
