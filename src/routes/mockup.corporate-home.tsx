import { createFileRoute, Link } from "@tanstack/react-router";
import { CorporateLayout } from "@/components/layouts/CorporateLayout";
import { CorporateHeader } from "@/components/corporate/CorporateHeader";
import { ArrowRight, TrendingUp, Users } from "lucide-react";

export const Route = createFileRoute("/mockup/corporate-home")({
  component: MockupCorporateHome,
});

/**
 * MOCKUP ROUTE — for visual approval only.
 * Shows the G-Structure corporate surface with the "Purple Cow" depth
 * pass: editorial gradient mesh in the hero, bento-contained sections,
 * and a Product Constellation that frames G-Structure as the umbrella
 * brand (KAIRON is the first live node, not the whole company).
 * Remove this route after final approval.
 */
function MockupCorporateHome() {
  return (
    <CorporateLayout>
      <CorporateHeader />
      <main>
        {/* HERO — editorial gradient mesh, oversized type */}
        <section className="corp-mesh" style={{ padding: "clamp(6rem, 14vw, 12rem) 0 6rem", borderBottom: "1px solid #E2E8EE" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", paddingInline: "clamp(1.25rem, 5vw, 2rem)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#697783", fontFamily: "var(--font-display, Montserrat, sans-serif)" }}>
                G-STRUCTURE
              </span>
              <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "#C7D2DB" }} />
              <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "#697783" }}>
                SUCOSTRUCT S.A.S. B.I.C.
              </span>
            </div>

            <h1 style={{
              marginTop: "1.75rem",
              fontSize: "clamp(2.75rem, 6.2vw, 5.5rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
              color: "#193550",
              maxWidth: "18ch",
              fontFamily: "var(--font-display, Montserrat, sans-serif)",
              fontWeight: 700,
            }}>
              Construimos la infraestructura <span className="corp-gradient-text">cognitivo-conductual</span> de la próxima década.
            </h1>
            <p style={{ marginTop: "1.75rem", fontSize: "clamp(1rem, 1.4vw, 1.2rem)", lineHeight: 1.7, color: "#697783", maxWidth: "62ch" }}>
              G-Structure interviene donde la cognición, la emoción y la conducta bloquean la ejecución. KAIRON es nuestro primer producto en vivo. El Workshop de Diagnóstico de Ejecución es nuestra puerta B2B.
            </p>
            <div style={{ marginTop: "2.5rem", display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              <Link
                to="/kairon"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.8rem 1.4rem", background: "#193550", color: "#FAFAF7", fontWeight: 600, fontSize: "0.875rem", textDecoration: "none" }}
              >
                Explorar KAIRON <ArrowRight size={14} />
              </Link>
              <Link
                to="/enterprise"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.8rem 1.4rem", border: "1px solid #E2E8EE", color: "#193550", fontWeight: 600, fontSize: "0.875rem", textDecoration: "none" }}
              >
                Workshop Enterprise
              </Link>
            </div>

            {/* Editorial stat strip — dense data directly beneath the massive headline */}
            <div style={{ marginTop: "4rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1px", background: "#E2E8EE", borderTop: "1px solid #E2E8EE", borderBottom: "1px solid #E2E8EE" }}>
              {[
                { v: "52", l: "usuarios validados" },
                { v: "2026", l: "constituida en Ecuador" },
                { v: "1", l: "producto en vivo · KAIRON" },
                { v: "B2B", l: "Workshop de Diagnóstico" },
              ].map((s) => (
                <div key={s.l} style={{ background: "#FAFAF7", padding: "1.25rem 0.5rem" }}>
                  <p style={{ fontFamily: "var(--font-display, Montserrat, sans-serif)", fontSize: "1.75rem", fontWeight: 700, color: "#193550" }}>{s.v}</p>
                  <p style={{ fontSize: "0.75rem", color: "#697783", marginTop: "0.3rem" }}>{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Problem statement — editorial breather */}
        <section style={{ padding: "6rem 0", textAlign: "center" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto", paddingInline: "1.5rem" }}>
            <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#697783" }}>
              EL PROBLEMA
            </p>
            <h2 style={{ marginTop: "1.25rem", fontSize: "clamp(1.9rem, 3.8vw, 2.9rem)", lineHeight: 1.15, color: "#193550", fontFamily: "var(--font-display, Montserrat, sans-serif)", fontWeight: 600 }}>
              No siempre falta capacidad. A veces sobra fricción.
            </h2>
            <p style={{ marginTop: "1.25rem", fontSize: "1.0625rem", lineHeight: 1.75, color: "#697783" }}>
              Pensamientos rígidos, lectura distorsionada del riesgo, perfeccionismo improductivo o decisiones que se postergan demasiado. La ejecución se rompe antes de la tarea.
            </p>
          </div>
        </section>

        {/* Method — dense bento grid */}
        <section style={{ padding: "0 0 6rem" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", paddingInline: "clamp(1.25rem, 5vw, 2rem)" }}>
            <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#697783" }}>
              EL MÉTODO PROPIETARIO
            </p>
            <h2 style={{ marginTop: "1rem", fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", lineHeight: 1.1, color: "#193550", maxWidth: "28ch", fontFamily: "var(--font-display, Montserrat, sans-serif)", fontWeight: 600 }}>
              I-R-O™: Identificar. Reencuadrar. Optimizar.
            </h2>
            <div style={{ marginTop: "2.5rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1px", background: "#E2E8EE", border: "1px solid #E2E8EE" }}>
              {[
                { step: "01", title: "Identificar", body: "Escanear la situación, la emoción, la interpretación y el patrón dominante." },
                { step: "02", title: "Reencuadrar", body: "Kai guía una lectura alternativa más precisa, sin suavizar ni negar la experiencia." },
                { step: "03", title: "Optimizar", body: "Cerrar con una acción concreta de 5 minutos que mueve la situación." },
              ].map((item) => (
                <div key={item.step} className="corp-bento" style={{ border: "none", padding: "2rem" }}>
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", color: "#193550" }}>
                    {item.step}
                  </span>
                  <h3 style={{ marginTop: "0.75rem", fontSize: "1.25rem", fontWeight: 600, color: "#193550", fontFamily: "var(--font-display, Montserrat, sans-serif)" }}>
                    {item.title}
                  </h3>
                  <p style={{ marginTop: "0.75rem", fontSize: "0.875rem", lineHeight: 1.6, color: "#697783" }}>
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="corp-divider" />

        {/* PRODUCT CONSTELLATION — the umbrella-brand framing.
            KAIRON is live. Workshop is live. Future slots are ghosted,
            signaling "first product," not "only product." */}
        <section style={{ padding: "6rem 0" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", paddingInline: "clamp(1.25rem, 5vw, 2rem)" }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "1.5rem", flexWrap: "wrap" }}>
              <div>
                <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#697783" }}>
                  LA CONSTELACIÓN G-STRUCTURE
                </p>
                <h2 style={{ marginTop: "0.75rem", fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", lineHeight: 1.1, color: "#193550", maxWidth: "26ch", fontFamily: "var(--font-display, Montserrat, sans-serif)", fontWeight: 600 }}>
                  KAIRON es el primero. No el único.
                </h2>
              </div>
              <p style={{ maxWidth: "34ch", fontSize: "0.9375rem", color: "#697783", lineHeight: 1.6 }}>
                Cada producto e intervención nace del mismo método I-R-O™ y de la misma tesis: la ejecución se puede diseñar.
              </p>
            </div>

            <div style={{ marginTop: "3rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
              {/* KAIRON — live product node */}
              <div className="corp-bento" style={{ padding: "2.25rem", display: "flex", flexDirection: "column", position: "relative" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", color: "#697783" }}>
                    PRODUCTO · 01
                  </span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", fontSize: "0.65rem", fontWeight: 700, color: "#12786B" }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#12786B" }} />
                    EN VIVO
                  </span>
                </div>
                <h3 style={{ marginTop: "1rem", fontSize: "1.5rem", fontWeight: 700, color: "#193550", fontFamily: "var(--font-display, Montserrat, sans-serif)" }}>
                  KAIRON
                </h3>
                <p style={{ marginTop: "0.6rem", fontSize: "0.875rem", lineHeight: 1.6, color: "#697783", flex: 1 }}>
                  Coaching cognitivo con IA guiado por Kai. Identifica, reencuadra y convierte fricción en acción en 5–12 minutos.
                </p>
                <Link to="/kairon" style={{ marginTop: "1.5rem", display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8125rem", fontWeight: 600, color: "#193550", textDecoration: "none" }}>
                  Explorar KAIRON <ArrowRight size={14} />
                </Link>
              </div>

              {/* Workshop — live B2B node */}
              <div className="corp-bento" style={{ padding: "2.25rem", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", color: "#697783" }}>
                    SERVICIO · 02
                  </span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", fontSize: "0.65rem", fontWeight: 700, color: "#12786B" }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#12786B" }} />
                    EN VIVO
                  </span>
                </div>
                <h3 style={{ marginTop: "1rem", fontSize: "1.5rem", fontWeight: 700, color: "#193550", fontFamily: "var(--font-display, Montserrat, sans-serif)" }}>
                  Workshop de Diagnóstico
                </h3>
                <p style={{ marginTop: "0.6rem", fontSize: "0.875rem", lineHeight: 1.6, color: "#697783", flex: 1 }}>
                  Sesión estratégica B2B para mapear fricciones de ejecución en equipos y abrir una ruta de intervención.
                </p>
                <Link to="/enterprise" style={{ marginTop: "1.5rem", display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8125rem", fontWeight: 600, color: "#193550", textDecoration: "none" }}>
                  Solicitar workshop <ArrowRight size={14} />
                </Link>
              </div>

              {/* Ghost slot — future product, signals "constellation" not "solo act" */}
              <div className="corp-ghost-slot" style={{ padding: "2.25rem", display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", color: "#9AA7B2" }}>
                  PRODUCTO · 03
                </span>
                <h3 style={{ marginTop: "1rem", fontSize: "1.25rem", fontWeight: 700, color: "#9AA7B2", fontFamily: "var(--font-display, Montserrat, sans-serif)" }}>
                  En investigación
                </h3>
                <p style={{ marginTop: "0.6rem", fontSize: "0.8125rem", lineHeight: 1.6, color: "#9AA7B2", flex: 1 }}>
                  El siguiente producto de la constelación se construye con la misma disciplina: validar antes de escalar.
                </p>
              </div>

              {/* Ghost slot 2 */}
              <div className="corp-ghost-slot" style={{ padding: "2.25rem", display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", color: "#9AA7B2" }}>
                  PRODUCTO · 04
                </span>
                <h3 style={{ marginTop: "1rem", fontSize: "1.25rem", fontWeight: 700, color: "#9AA7B2", fontFamily: "var(--font-display, Montserrat, sans-serif)" }}>
                  Espacio reservado
                </h3>
                <p style={{ marginTop: "0.6rem", fontSize: "0.8125rem", lineHeight: 1.6, color: "#9AA7B2", flex: 1 }}>
                  G-Structure es la compañía. KAIRON es el primer producto. Esto apenas comienza.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Evidence teaser — dense stat block */}
        <section style={{ padding: "5rem 0", background: "#092038", color: "#FAFAF7" }}>
          <div className="evidence-grid" style={{ maxWidth: "1200px", margin: "0 auto", paddingInline: "clamp(1.25rem, 5vw, 2rem)", alignItems: "center" }}>
            <div>
              <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", opacity: 0.65 }}>
                VALIDACIÓN
              </p>
              <h2 style={{ marginTop: "1rem", fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", lineHeight: 1.1, fontFamily: "var(--font-display, Montserrat, sans-serif)", fontWeight: 600 }}>
                52 personas ya lo probaron. Ecuador + Estados Unidos.
              </h2>
              <p style={{ marginTop: "1.25rem", fontSize: "1rem", lineHeight: 1.7, opacity: 0.75, maxWidth: "48ch" }}>
                Evidencia temprana de usuarios reales con resultados en contextos de alta exigencia profesional.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.12)" }}>
              <div style={{ background: "rgba(255,255,255,0.03)", padding: "1.25rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <Users size={18} style={{ opacity: 0.7 }} />
                <div>
                  <p style={{ fontFamily: "var(--font-display, Montserrat, sans-serif)", fontSize: "1.25rem", fontWeight: 700 }}>52</p>
                  <p style={{ fontSize: "0.7rem", opacity: 0.65 }}>usuarios reales</p>
                </div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.03)", padding: "1.25rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <TrendingUp size={18} style={{ opacity: 0.7 }} />
                <div>
                  <p style={{ fontFamily: "var(--font-display, Montserrat, sans-serif)", fontSize: "1.25rem", fontWeight: 700 }}>CodeLaunch LATAM</p>
                  <p style={{ fontSize: "0.7rem", opacity: 0.65 }}>semifinalista 2026</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Secondary paths */}
        <section style={{ padding: "4rem 0", borderTop: "1px solid #E2E8EE" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", paddingInline: "clamp(1.25rem, 5vw, 2rem)" }}>
            <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#697783" }}>
              MOCKUP · ADDITIONAL SECTIONS
            </p>
            <ul style={{ marginTop: "1.5rem", lineHeight: 2.2, color: "#697783", fontSize: "0.9375rem" }}>
              <li>→ Founder section (Guillermo profile)</li>
              <li>→ Investors link (existing page stays)</li>
              <li>→ Company update / news</li>
              <li>→ Footer with full site navigation</li>
            </ul>
          </div>
        </section>
      </main>

      <style>{`
        .evidence-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.4fr) minmax(260px, 1fr);
          gap: 2.5rem;
        }
        @media (max-width: 800px) {
          .evidence-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </CorporateLayout>
  );
}
