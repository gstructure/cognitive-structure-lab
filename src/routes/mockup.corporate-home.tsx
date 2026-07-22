import { createFileRoute, Link } from "@tanstack/react-router";
import { CorporateLayout } from "@/components/layouts/CorporateLayout";
import { CorporateHeader } from "@/components/corporate/CorporateHeader";
import { BrandMark } from "@/components/brand/Logo";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/mockup/corporate-home")({
  component: MockupCorporateHome,
});

/**
 * MOCKUP ROUTE — for visual approval only.
 * Shows the G-Structure corporate surface: CorporateHeader + company homepage structure.
 * Remove this route after approval.
 */
function MockupCorporateHome() {
  return (
    <CorporateLayout>
      <CorporateHeader />
      <main>
        {/* Hero */}
        <section style={{ padding: "clamp(6rem, 14vw, 12rem) 0 5rem", borderBottom: "1px solid #E2E8EE" }}>
          <div className="container-x" style={{ maxWidth: "1200px", margin: "0 auto", paddingInline: "clamp(1.25rem, 5vw, 2rem)" }}>
            <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "#697783", fontFamily: "var(--font-display, Montserrat, sans-serif)" }}>
              G-STRUCTURE
            </p>
            <h1 style={{
              marginTop: "1.5rem",
              fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#193550",
              maxWidth: "20ch",
              fontFamily: "var(--font-display, Montserrat, sans-serif)",
              fontWeight: 700,
            }}>
              Infraestructura cognitivo-conductual para personas y equipos bajo presión.
            </h1>
            <p style={{ marginTop: "1.5rem", fontSize: "clamp(1rem, 1.4vw, 1.2rem)", lineHeight: 1.7, color: "#697783", maxWidth: "65ch" }}>
              G-Structure construye productos y servicios que intervienen donde la cognición, la emoción y la conducta bloquean la ejecución. Nuestro producto principal es KAIRON. Nuestra puerta B2B es el Workshop de Diagnóstico de Ejecución.
            </p>
            <div style={{ marginTop: "2.5rem", display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              <Link
                to="/kairon"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.25rem", background: "#193550", color: "#FAFAF7", fontWeight: 600, fontSize: "0.875rem", textDecoration: "none" }}
              >
                Explorar KAIRON <ArrowRight size={14} />
              </Link>
              <Link
                to="/enterprise"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.25rem", border: "1px solid #E2E8EE", color: "#193550", fontWeight: 600, fontSize: "0.875rem", textDecoration: "none" }}
              >
                Workshop Enterprise
              </Link>
            </div>
          </div>
        </section>

        {/* Problem statement */}
        <section style={{ padding: "5rem 0", background: "#F3F5F7" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", paddingInline: "clamp(1.25rem, 5vw, 2rem)" }}>
            <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "#697783" }}>
              EL PROBLEMA
            </p>
            <h2 style={{ marginTop: "1rem", fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", lineHeight: 1.1, color: "#193550", maxWidth: "28ch", fontFamily: "var(--font-display, Montserrat, sans-serif)", fontWeight: 600 }}>
              La ejecución se rompe antes de la tarea.
            </h2>
            <p style={{ marginTop: "1.25rem", fontSize: "1rem", lineHeight: 1.7, color: "#697783", maxWidth: "60ch" }}>
              No siempre falta capacidad. A veces sobra fricción: pensamientos rígidos, lectura distorsionada del riesgo, perfeccionismo improductivo o decisiones que se postergan demasiado.
            </p>
          </div>
        </section>

        {/* Method */}
        <section style={{ padding: "5rem 0", borderBottom: "1px solid #E2E8EE" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", paddingInline: "clamp(1.25rem, 5vw, 2rem)" }}>
            <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "#697783" }}>
              EL MÉTODO PROPIETARIO
            </p>
            <h2 style={{ marginTop: "1rem", fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", lineHeight: 1.1, color: "#193550", maxWidth: "28ch", fontFamily: "var(--font-display, Montserrat, sans-serif)", fontWeight: 600 }}>
              I-R-O™: Identificar. Reencuadrar. Optimizar.
            </h2>
            <p style={{ marginTop: "1.25rem", fontSize: "1rem", lineHeight: 1.7, color: "#697783", maxWidth: "60ch" }}>
              El framework propietario que impulsa KAIRON: una secuencia defendible para pasar de fricción mental a una acción concreta.
            </p>
            <div style={{ marginTop: "2.5rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1px", background: "#E2E8EE", border: "1px solid #E2E8EE" }}>
              {[
                { step: "01", title: "Identificar", body: "Escanear la situación, la emoción, la interpretación y el patrón dominante." },
                { step: "02", title: "Reencuadrar", body: "Kai guía una lectura alternativa más precisa, sin suavizar ni negar la experiencia." },
                { step: "03", title: "Optimizar", body: "Cerrar con una acción concreta de 5 minutos que mueve la situación." },
              ].map((item) => (
                <div key={item.step} style={{ background: "#FFFFFF", padding: "2rem" }}>
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

        {/* Products */}
        <section style={{ padding: "5rem 0" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", paddingInline: "clamp(1.25rem, 5vw, 2rem)" }}>
            <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "#697783" }}>
              PRODUCTOS E INTERVENCIONES
            </p>
            <h2 style={{ marginTop: "1rem", fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", lineHeight: 1.1, color: "#193550", maxWidth: "28ch", fontFamily: "var(--font-display, Montserrat, sans-serif)", fontWeight: 600 }}>
              Construidos por G-Structure.
            </h2>
            <div style={{ marginTop: "2.5rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
              {/* KAIRON card */}
              <div style={{ border: "1px solid #E2E8EE", padding: "2.5rem", display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.22em", color: "#697783" }}>
                  PRODUCTO PRINCIPAL
                </span>
                <h3 style={{ marginTop: "1rem", fontSize: "1.5rem", fontWeight: 700, color: "#193550", fontFamily: "var(--font-display, Montserrat, sans-serif)" }}>
                  KAIRON
                </h3>
                <p style={{ marginTop: "0.75rem", fontSize: "0.9375rem", lineHeight: 1.65, color: "#697783", flex: 1 }}>
                  Coaching cognitivo con IA guiado por Kai. Identifica pensamientos que bloquean la ejecución, los reencuadra contigo y te lleva a una acción concreta en 5–12 minutos.
                </p>
                <div style={{ marginTop: "1.5rem" }}>
                  <Link
                    to="/kairon"
                    style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8125rem", fontWeight: 600, color: "#193550", textDecoration: "none" }}
                  >
                    Explorar KAIRON <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
              {/* Workshop card */}
              <div style={{ border: "1px solid #E2E8EE", padding: "2.5rem", display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.22em", color: "#697783" }}>
                  SERVICIO B2B
                </span>
                <h3 style={{ marginTop: "1rem", fontSize: "1.5rem", fontWeight: 700, color: "#193550", fontFamily: "var(--font-display, Montserrat, sans-serif)" }}>
                  Workshop de Diagnóstico de Ejecución
                </h3>
                <p style={{ marginTop: "0.75rem", fontSize: "0.9375rem", lineHeight: 1.65, color: "#697783", flex: 1 }}>
                  Sesión estratégica para identificar patrones que interfieren con la ejecución del equipo, mapear fricciones y definir una ruta de intervención clara.
                </p>
                <div style={{ marginTop: "1.5rem" }}>
                  <Link
                    to="/enterprise"
                    style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8125rem", fontWeight: 600, color: "#193550", textDecoration: "none" }}
                  >
                    Solicitar workshop <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Evidence teaser */}
        <section style={{ padding: "4rem 0", background: "#092038", color: "#FAFAF7" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", paddingInline: "clamp(1.25rem, 5vw, 2rem)" }}>
            <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", opacity: 0.7 }}>
              VALIDACIÓN
            </p>
            <h2 style={{ marginTop: "1rem", fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", lineHeight: 1.1, fontFamily: "var(--font-display, Montserrat, sans-serif)", fontWeight: 600 }}>
              52 personas ya lo probaron. Ecuador + Estados Unidos.
            </h2>
            <p style={{ marginTop: "1.25rem", fontSize: "1rem", lineHeight: 1.7, opacity: 0.75, maxWidth: "55ch" }}>
              Evidencia temprana de usuarios reales con resultados en contextos de alta exigencia profesional.
            </p>
          </div>
        </section>

        {/* Secondary paths */}
        <section style={{ padding: "4rem 0", borderTop: "1px solid #E2E8EE" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", paddingInline: "clamp(1.25rem, 5vw, 2rem)" }}>
            <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "#697783" }}>
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
    </CorporateLayout>
  );
}
