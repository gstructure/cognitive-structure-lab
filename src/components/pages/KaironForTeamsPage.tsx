import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { KaironMark } from "@/components/brand/kairon/KaironMark";
import { trackContactClick, trackConversion } from "@/lib/analytics";

/**
 * Standalone B2B landing page for the KAIRON Corporate Pilot, aimed at
 * Talento Humano / People & Culture buyers. Built from the "KAIRON for
 * Teams" design handoff — rendered outside the site's default Header/Footer
 * (see the isStandalone check in __root.tsx) so the page keeps its own
 * dark obsidian/amber surface end to end.
 */

const ORANGE = "#F0A046";
const ORANGE_HOVER = "#F7B76B";
const INK = "#0C1114";
const INK_2 = "#080B0D";

const PROBLEMS = [
  { n: "01", t: "Procrastinación", d: "La tarea es clara, el inicio se posterga." },
  { n: "02", t: "Perfeccionismo", d: "Nada se entrega hasta que sea impecable." },
  { n: "03", t: "Autosabotaje", d: "Decisiones que frenan el propio avance." },
  { n: "04", t: "Síndrome del impostor", d: "Capacidad real, confianza en duda." },
];

const BUSINESS_TAGS = [
  "Retrasos",
  "Retrabajo",
  "Dificultad para delegar",
  "Menor participación",
  "Pérdida de momentum",
  "Presión innecesaria",
];

const IRO_STEPS = [
  { letter: "I", t: "Identificar", d: "Qué está bloqueando la ejecución, en el momento en que aparece." },
  { letter: "R", t: "Reestructurar", d: "La interpretación que genera fricción se trabaja y se reformula." },
  { letter: "O", t: "Optimizar", d: "La claridad se convierte en acción concreta y sostenida." },
];

const PILOT_STEPS = [
  {
    step: "Paso 1",
    title: "Execution Diagnostic",
    items: [
      "Workshop de 90–120 minutos",
      "Cohorte de 25–40 personas",
      "Identificación de patrones",
      "Primera experiencia de valor",
    ],
  },
  {
    step: "Paso 2",
    title: "30 días de KAIRON Pro",
    items: [
      "Cada participante usa la app en situaciones reales",
      "El objetivo es generar adopción, no solo awareness",
    ],
  },
  {
    step: "Paso 3",
    title: "Resultados agregados",
    items: [
      "Talento Humano recibe información agregada y anónima",
      "Reunión de cierre para evaluar continuidad",
    ],
  },
];

const PRIVACY_POINTS = [
  { text: "La empresa no ve conversaciones individuales", strong: false },
  { text: "No ve resultados personales del Scanner", strong: false },
  { text: "No accede al contenido interno de cada usuario", strong: false },
  { text: "Solo recibe datos agregados y anónimos", strong: true },
];

const TESTIMONIALS = [
  { quote: "Intenté engañarlo, y aun así identificó bien mi patrón.", who: "HR Manager · Philadelphia" },
  { quote: "Esto va al centro del problema. Es comercialmente viable y vale la pena venderlo.", who: "Marketing Manager · Philadelphia" },
  { quote: "Bien construido, intuitivo. Yo seguiría usándolo.", who: "Software Engineer · Philadelphia" },
  { quote: "Esto debería acompañar siempre a los founders. Les ayuda a romper con sus bloqueos y a no rendirse.", who: "Founder · Guayaquil" },
  { quote: "Lo usaría con mis pacientes. No es invasivo: te guía y te hace sentir comprendido y cuidado.", who: "Psicóloga Clínica · Guayaquil" },
];

const BILINGUAL_POINTS = [
  "El workshop puede realizarse en español o inglés",
  "La app es bilingüe",
  "El acompañamiento y seguimiento también se desarrolla en ambos idiomas",
  "Útil para colegios, universidades, empresas internacionales y equipos mixtos",
];

const AUDIENCE = [
  "Empresas de tecnología",
  "Equipos administrativos",
  "Mandos medios",
  "Instituciones educativas",
  "Equipos de conocimiento",
  "Organizaciones con presión por ejecución",
];

const NAV = [
  { href: "#problema", label: "El problema" },
  { href: "#metodo", label: "Método" },
  { href: "#pilot", label: "Corporate Pilot" },
  { href: "#privacidad", label: "Privacidad" },
];

export function KaironForTeamsPage() {
  return (
    <div style={{ background: "#F6F5F2", color: "#0C1114", overflowX: "hidden" }}>
      <SiteHeader />
      <Hero />
      <ProblemSection />
      <MethodSection />
      <PilotSection />
      <PrivacySection />
      <ProofSection />
      <BilingualSection />
      <AudienceSection />
      <ContactSection />
      <SiteFooter />
    </div>
  );
}

function SiteHeader() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(12,17,20,0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "14px clamp(20px,5vw,40px)",
          display: "flex",
          alignItems: "center",
          gap: 24,
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <KaironMark title="KAIRON" width={18} height={18} style={{ color: ORANGE }} />
          <span className="font-display" style={{ fontWeight: 600, fontSize: 17, letterSpacing: "0.14em", color: "#fff" }}>
            KAIRON
          </span>
          <span style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: ORANGE }}>
            for Teams
          </span>
        </div>
        <nav style={{ display: "flex", alignItems: "center", gap: "clamp(14px,2.4vw,30px)", flexWrap: "wrap", justifyContent: "flex-end" }}>
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="kft-nav-link" style={{ color: "rgba(255,255,255,0.66)", fontSize: 14 }}>
              {n.label}
            </a>
          ))}
          <a
            href="#contacto"
            className="kft-cta-pill"
            style={{ background: ORANGE, color: "#241300", fontWeight: 600, fontSize: 14, padding: "10px 18px", borderRadius: 999 }}
          >
            Agendar 15 min
          </a>
        </nav>
      </div>
      <style>{`
        .kft-nav-link:hover { color: #fff; }
        .kft-cta-pill:hover { background: ${ORANGE_HOVER}; }
      `}</style>
    </header>
  );
}

function Hero() {
  return (
    <section style={{ background: INK, color: "#fff", position: "relative" }}>
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(900px 420px at 78% 8%, rgba(240,160,70,0.18), transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "relative",
          maxWidth: 1180,
          margin: "0 auto",
          padding: "clamp(56px,8vw,104px) clamp(20px,5vw,40px) clamp(64px,9vw,120px)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))",
          gap: "clamp(40px,6vw,72px)",
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              border: "1px solid rgba(255,255,255,0.16)",
              borderRadius: 999,
              padding: "7px 14px",
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.72)",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: ORANGE }} />
            Coaching cognitivo con IA
          </div>
          <h1
            className="font-display"
            style={{ fontWeight: 600, fontSize: "clamp(38px,6vw,68px)", lineHeight: 1.03, letterSpacing: "-0.02em", margin: "26px 0 0" }}
          >
            ¿Qué está frenando la ejecución de tu equipo?
          </h1>
          <p style={{ fontSize: "clamp(17px,2vw,21px)", lineHeight: 1.55, color: "rgba(255,255,255,0.74)", margin: "24px 0 0", maxWidth: "34em" }}>
            KAIRON ayuda a identificar y trabajar bloqueos como procrastinación, perfeccionismo, autosabotaje y síndrome del impostor.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: "rgba(255,255,255,0.52)", margin: "18px 0 0", maxWidth: "34em" }}>
            No es otra capacitación de productividad. Es una herramienta continua para trabajar la fricción cognitiva que afecta la ejecución.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 38 }}>
            <a
              href="#contacto"
              className="kft-cta-pill"
              style={{ background: ORANGE, color: "#241300", fontWeight: 600, fontSize: 16, padding: "16px 28px", borderRadius: 999 }}
            >
              Agenda una conversación de 15 minutos
            </a>
            <a
              href="#contacto"
              className="kft-outline-pill"
              style={{ border: "1px solid rgba(255,255,255,0.28)", color: "#fff", fontWeight: 500, fontSize: 16, padding: "16px 28px", borderRadius: 999 }}
            >
              Solicitar información del piloto
            </a>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "clamp(18px,3vw,34px)",
              marginTop: 44,
              paddingTop: 26,
              borderTop: "1px solid rgba(255,255,255,0.1)",
              fontSize: 13,
              color: "rgba(255,255,255,0.5)",
            }}
          >
            <span>42 usuarios activos</span>
            <span>Semifinalista CodeLaunch LATAM 2026</span>
            <span>Ecuador Tech Week 2026</span>
          </div>
        </div>

        <ExecutionDiagnosticCard />
      </div>
      <style>{`.kft-outline-pill:hover { border-color: #fff; }`}</style>
    </section>
  );
}

function ExecutionDiagnosticCard() {
  const rows: Array<{ label: string; pct: number; strong: boolean }> = [
    { label: "Perfeccionismo", pct: 38, strong: true },
    { label: "Procrastinación", pct: 29, strong: true },
    { label: "Síndrome del impostor", pct: 21, strong: false },
    { label: "Autosabotaje", pct: 12, strong: false },
  ];
  return (
    <div
      style={{
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 18,
        background: "linear-gradient(180deg,#171A1C,#101416)",
        padding: "clamp(20px,3vw,30px)",
        boxShadow: "0 40px 80px -40px rgba(0,0,0,0.8)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
        <div>
          <div className="font-display" style={{ fontSize: 15, fontWeight: 500 }}>Execution Diagnostic</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.44)", marginTop: 4 }}>Cohorte · 32 participantes</div>
        </div>
        <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: ORANGE, border: `1px solid rgba(240,160,70,0.38)`, borderRadius: 999, padding: "5px 10px" }}>
          Agregado
        </div>
      </div>
      <div style={{ display: "grid", gap: 16, marginTop: 26 }}>
        {rows.map((r) => (
          <div key={r.label}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "rgba(255,255,255,0.78)" }}>
              <span>{r.label}</span>
              <span>{r.pct}%</span>
            </div>
            <div style={{ height: 7, borderRadius: 999, background: "rgba(255,255,255,0.09)", marginTop: 8 }}>
              <div style={{ width: `${r.pct}%`, height: 7, borderRadius: 999, background: r.strong ? ORANGE : "rgba(240,160,70,0.6)" }} />
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 26,
          paddingTop: 18,
          borderTop: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          justifyContent: "space-between",
          gap: 16,
          fontSize: 12,
          color: "rgba(255,255,255,0.42)",
        }}
      >
        <span>Patrones dominantes de la cohorte</span>
        <span>Sin datos individuales</span>
      </div>
      <div style={{ marginTop: 22, borderRadius: 12, background: "rgba(240,160,70,0.09)", border: "1px solid rgba(240,160,70,0.2)", padding: 16 }}>
        <div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: ORANGE }}>Método I-R-O™</div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10, fontSize: 14, color: "rgba(255,255,255,0.82)" }}>
          <span>Identificar</span>
          <span style={{ color: "rgba(255,255,255,0.3)" }}>·</span>
          <span>Reestructurar</span>
          <span style={{ color: "rgba(255,255,255,0.3)" }}>·</span>
          <span>Optimizar</span>
        </div>
      </div>
    </div>
  );
}

function ProblemSection() {
  return (
    <section id="problema" style={{ padding: "clamp(64px,9vw,120px) clamp(20px,5vw,40px)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ maxWidth: 720 }}>
          <div style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "#A65A10" }}>El problema</div>
          <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(28px,4vw,46px)", lineHeight: 1.1, letterSpacing: "-0.015em", margin: "16px 0 0" }}>
            No siempre es tiempo, disciplina o motivación
          </h2>
          <p style={{ fontSize: "clamp(16px,1.7vw,19px)", lineHeight: 1.6, color: "rgba(12,17,20,0.62)", margin: "20px 0 0" }}>
            En muchas organizaciones las personas saben exactamente qué hacer. Algo las bloquea justo en el momento de ejecutar.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 18, marginTop: 48 }}>
          {PROBLEMS.map((p) => (
            <div key={p.n} className="kft-problem-card" style={{ background: "#fff", border: "1px solid rgba(12,17,20,0.09)", borderRadius: 14, padding: 26 }}>
              <div className="font-display" style={{ fontSize: 13, color: "#A65A10" }}>{p.n}</div>
              <div className="font-display" style={{ fontSize: 20, fontWeight: 600, marginTop: 14 }}>{p.t}</div>
              <p style={{ fontSize: "14.5px", lineHeight: 1.55, color: "rgba(12,17,20,0.58)", margin: "10px 0 0" }}>{p.d}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 44, borderTop: "1px solid rgba(12,17,20,0.1)", paddingTop: 32 }}>
          <div style={{ fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(12,17,20,0.45)" }}>En lenguaje de negocio</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 18 }}>
            {BUSINESS_TAGS.map((t) => (
              <span key={t} style={{ border: "1px solid rgba(12,17,20,0.14)", borderRadius: 999, padding: "9px 16px", fontSize: "14.5px" }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
      <style>{`.kft-problem-card:hover { border-color: rgba(240,160,70,0.7); }`}</style>
    </section>
  );
}

function MethodSection() {
  return (
    <section
      id="metodo"
      style={{ padding: "clamp(64px,9vw,120px) clamp(20px,5vw,40px)", background: "#fff", borderTop: "1px solid rgba(12,17,20,0.08)", borderBottom: "1px solid rgba(12,17,20,0.08)" }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(32px,5vw,64px)", alignItems: "start" }}>
          <div>
            <div style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "#A65A10" }}>Qué hace diferente a KAIRON</div>
            <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(28px,4vw,46px)", lineHeight: 1.1, letterSpacing: "-0.015em", margin: "16px 0 0" }}>
              El bloqueo no espera a la próxima sesión
            </h2>
          </div>
          <div style={{ display: "grid", gap: 18 }}>
            <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              <span style={{ flexShrink: 0, width: 8, height: 8, borderRadius: "50%", background: "rgba(12,17,20,0.2)", marginTop: 9 }} />
              <p style={{ margin: 0, fontSize: 17, lineHeight: 1.55, color: "rgba(12,17,20,0.72)" }}>El coaching tradicional ocurre en una sesión.</p>
            </div>
            <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              <span style={{ flexShrink: 0, width: 8, height: 8, borderRadius: "50%", background: "rgba(12,17,20,0.2)", marginTop: 9 }} />
              <p style={{ margin: 0, fontSize: 17, lineHeight: 1.55, color: "rgba(12,17,20,0.72)" }}>El bloqueo ocurre en cualquier momento.</p>
            </div>
            <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              <span style={{ flexShrink: 0, width: 8, height: 8, borderRadius: "50%", background: ORANGE, marginTop: 9 }} />
              <p style={{ margin: 0, fontSize: 17, lineHeight: 1.55, color: "#0C1114", fontWeight: 500 }}>
                KAIRON acompaña al colaborador cuando la fricción realmente aparece.
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
            gap: 0,
            marginTop: 56,
            border: "1px solid rgba(12,17,20,0.1)",
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          {IRO_STEPS.map((s, i) => (
            <div
              key={s.letter}
              style={{
                padding: "clamp(26px,3vw,36px)",
                borderRight: i < IRO_STEPS.length - 1 ? "1px solid rgba(12,17,20,0.1)" : undefined,
              }}
            >
              <div className="font-display" style={{ fontSize: 44, fontWeight: 600, color: ORANGE, lineHeight: 1 }}>{s.letter}</div>
              <div className="font-display" style={{ fontSize: 22, fontWeight: 600, marginTop: 14 }}>{s.t}</div>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: "rgba(12,17,20,0.6)", margin: "12px 0 0" }}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PilotSection() {
  return (
    <section id="pilot" style={{ padding: "clamp(64px,9vw,120px) clamp(20px,5vw,40px)", background: INK, color: "#fff" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ maxWidth: 720 }}>
          <div style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: ORANGE }}>Corporate Pilot</div>
          <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(28px,4vw,46px)", lineHeight: 1.1, letterSpacing: "-0.015em", margin: "16px 0 0" }}>
            Cómo funciona
          </h2>
          <p style={{ fontSize: "clamp(16px,1.7vw,19px)", lineHeight: 1.6, color: "rgba(255,255,255,0.6)", margin: "20px 0 0" }}>
            Tres pasos, un ciclo de 30 días, una decisión con evidencia al final.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20, marginTop: 52 }}>
          {PILOT_STEPS.map((p) => (
            <div key={p.step} style={{ border: "1px solid rgba(255,255,255,0.13)", borderRadius: 16, padding: "clamp(24px,3vw,32px)", background: "rgba(255,255,255,0.03)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span className="font-display" style={{ fontSize: 13, color: "#241300", background: ORANGE, borderRadius: 999, padding: "4px 11px", fontWeight: 600 }}>
                  {p.step}
                </span>
              </div>
              <div className="font-display" style={{ fontSize: 24, fontWeight: 600, marginTop: 18 }}>{p.title}</div>
              <div style={{ display: "grid", gap: 12, marginTop: 20 }}>
                {p.items.map((item) => (
                  <div key={item} style={{ display: "flex", gap: 12, fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>
                    <span style={{ color: ORANGE }}>—</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40 }}>
          <a
            href="#contacto"
            className="kft-cta-pill"
            style={{ display: "inline-block", background: ORANGE, color: "#241300", fontWeight: 600, fontSize: 16, padding: "15px 26px", borderRadius: 999 }}
          >
            Solicitar información del piloto
          </a>
        </div>
      </div>
    </section>
  );
}

function PrivacySection() {
  return (
    <section id="privacidad" style={{ padding: "clamp(64px,9vw,120px) clamp(20px,5vw,40px)", background: "#fff", borderBottom: "1px solid rgba(12,17,20,0.08)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "clamp(32px,5vw,64px)", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "#A65A10" }}>Privacidad por diseño</div>
          <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(28px,4vw,46px)", lineHeight: 1.1, letterSpacing: "-0.015em", margin: "16px 0 0" }}>
            KAIRON pertenece al colaborador, no al supervisor.
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: "rgba(12,17,20,0.62)", margin: "20px 0 0" }}>
            La confianza es la condición para que la herramienta funcione. Por eso la separación de datos es estructural, no una política opcional.
          </p>
        </div>
        <div style={{ display: "grid", gap: 14 }}>
          {PRIVACY_POINTS.map((p) =>
            p.strong ? (
              <div key={p.text} style={{ background: "rgba(240,160,70,0.1)", border: "1px solid rgba(240,160,70,0.32)", borderRadius: 12, padding: "20px 22px", fontSize: "15.5px", lineHeight: 1.5, color: "#0C1114", fontWeight: 500 }}>
                {p.text}
              </div>
            ) : (
              <div key={p.text} style={{ background: "#F6F5F2", border: "1px solid rgba(12,17,20,0.08)", borderRadius: 12, padding: "20px 22px", fontSize: "15.5px", lineHeight: 1.5, color: "rgba(12,17,20,0.78)" }}>
                {p.text}
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

function ProofSection() {
  return (
    <section style={{ padding: "clamp(64px,9vw,120px) clamp(20px,5vw,40px)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 20 }}>
          <div style={{ background: "#fff", border: "1px solid rgba(12,17,20,0.09)", borderRadius: 14, padding: 26 }}>
            <div className="font-display" style={{ fontSize: "clamp(34px,4vw,46px)", fontWeight: 600, lineHeight: 1 }}>42</div>
            <div style={{ fontSize: "14.5px", color: "rgba(12,17,20,0.6)", marginTop: 10 }}>usuarios activos actualmente</div>
          </div>
          <div style={{ background: "#fff", border: "1px solid rgba(12,17,20,0.09)", borderRadius: 14, padding: 26 }}>
            <div className="font-display" style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.3 }}>Semifinalista<br />CodeLaunch LATAM 2026</div>
            <div style={{ fontSize: "14.5px", color: "rgba(12,17,20,0.6)", marginTop: 10 }}>validación de producto</div>
          </div>
          <div style={{ background: "#fff", border: "1px solid rgba(12,17,20,0.09)", borderRadius: 14, padding: 26 }}>
            <div className="font-display" style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.3 }}>Ecuador Tech Week 2026</div>
            <div style={{ fontSize: "14.5px", color: "rgba(12,17,20,0.6)", marginTop: 10 }}>presentado en el evento, con G-Structure como anfitriona</div>
          </div>
        </div>

        <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(26px,3.4vw,38px)", lineHeight: 1.15, letterSpacing: "-0.015em", margin: "64px 0 0" }}>
          Lo que dicen quienes ya lo usaron
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: 18, marginTop: 32 }}>
          {TESTIMONIALS.map((t) => (
            <div key={t.who} style={{ background: "#fff", border: "1px solid rgba(12,17,20,0.09)", borderRadius: 14, padding: 28, display: "flex", flexDirection: "column", gap: 18 }}>
              <p style={{ margin: 0, fontSize: 17, lineHeight: 1.55, color: "#0C1114" }}>“{t.quote}”</p>
              <div style={{ marginTop: "auto", fontSize: "13.5px", color: "rgba(12,17,20,0.55)", borderTop: "1px solid rgba(12,17,20,0.09)", paddingTop: 16 }}>
                {t.who}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BilingualSection() {
  return (
    <section style={{ padding: "clamp(56px,8vw,100px) clamp(20px,5vw,40px)", background: "#fff", borderTop: "1px solid rgba(12,17,20,0.08)", borderBottom: "1px solid rgba(12,17,20,0.08)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(28px,5vw,64px)", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "#A65A10" }}>Bilingüe</div>
          <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(26px,3.4vw,38px)", lineHeight: 1.15, letterSpacing: "-0.015em", margin: "14px 0 0" }}>
            Español o inglés, de punta a punta
          </h2>
        </div>
        <div style={{ display: "grid", gap: 12, fontSize: 16, lineHeight: 1.55, color: "rgba(12,17,20,0.72)" }}>
          {BILINGUAL_POINTS.map((p) => (
            <div key={p} style={{ display: "flex", gap: 12 }}>
              <span style={{ color: ORANGE }}>—</span>
              <span>{p}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AudienceSection() {
  return (
    <section style={{ padding: "clamp(64px,9vw,110px) clamp(20px,5vw,40px)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(26px,3.4vw,38px)", lineHeight: 1.15, letterSpacing: "-0.015em", margin: 0 }}>
          Para quién es ideal
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14, marginTop: 32 }}>
          {AUDIENCE.map((a) => (
            <div key={a} style={{ border: "1px solid rgba(12,17,20,0.13)", borderRadius: 12, padding: 22, fontSize: 16, fontWeight: 500 }}>
              {a}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contacto" style={{ background: INK, color: "#fff", position: "relative" }}>
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(700px 340px at 20% 0%, rgba(240,160,70,0.16), transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", maxWidth: 1180, margin: "0 auto", padding: "clamp(64px,9vw,120px) clamp(20px,5vw,40px)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "clamp(36px,5vw,72px)", alignItems: "start" }}>
          <div>
            <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(30px,4.4vw,52px)", lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>
              Empiece con una cohorte. Decida con evidencia.
            </h2>
            <p style={{ fontSize: "clamp(16px,1.8vw,19px)", lineHeight: 1.6, color: "rgba(255,255,255,0.66)", margin: "22px 0 0", maxWidth: "30em" }}>
              Agende una conversación de 15 minutos y explore si el KAIRON Corporate Pilot tiene sentido para su organización.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 32 }}>
              <a
                href="mailto:guillermo@g-structure.co?subject=Agendar%20conversaci%C3%B3n%20KAIRON%20Corporate%20Pilot"
                className="kft-cta-pill"
                style={{ background: ORANGE, color: "#241300", fontWeight: 600, fontSize: 16, padding: "16px 28px", borderRadius: 999 }}
                onClick={() => trackContactClick("email", { source: "kairon_for_teams_hero" })}
              >
                Agendar conversación
              </a>
              <a
                href="#formulario"
                className="kft-outline-pill"
                style={{ border: "1px solid rgba(255,255,255,0.28)", color: "#fff", fontWeight: 500, fontSize: 16, padding: "16px 28px", borderRadius: 999 }}
              >
                Solicitar información
              </a>
            </div>
            <div style={{ marginTop: 40, border: "1px dashed rgba(255,255,255,0.2)", borderRadius: 14, padding: 24, fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
              Espacio reservado para el calendario embebido (Calendly / Google Calendar).
            </div>
          </div>

          <PilotRequestForm />
        </div>
      </div>
      <style>{`.kft-outline-pill:hover { border-color: #fff; }`}</style>
    </section>
  );
}

type FormState = {
  name: string;
  organization: string;
  role: string;
  email: string;
  whatsapp: string;
  message: string;
  consent: boolean;
  website: string;
};

const EMPTY_FORM: FormState = {
  name: "",
  organization: "",
  role: "",
  email: "",
  whatsapp: "",
  message: "",
  consent: false,
  website: "",
};

function PilotRequestForm() {
  const [data, setData] = useState<FormState>(EMPTY_FORM);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [fieldError, setFieldError] = useState<string | null>(null);

  const onChange = (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const v = e.target instanceof HTMLInputElement && e.target.type === "checkbox" ? e.target.checked : e.target.value;
      setData((d) => ({ ...d, [k]: v as never }));
    };

  const validate = (): string | null => {
    if (!data.name.trim()) return "Por favor, ingresa tu nombre.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) return "Por favor, ingresa un correo válido.";
    if (!data.message.trim()) return "Cuéntanos brevemente sobre tu equipo.";
    if (!data.consent) return "Debes aceptar las Políticas Legales para enviar el formulario.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldError(null);
    const v = validate();
    if (v) {
      setFieldError(v);
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/public/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name.trim(),
          email: data.email.trim(),
          organization: data.organization.trim(),
          role: data.role.trim(),
          whatsapp: data.whatsapp.trim(),
          requestType: "KAIRON for Teams — Corporate Pilot",
          message: data.message.trim(),
          consent: data.consent,
          website: data.website,
          pageOrigin: typeof window !== "undefined" ? window.location.pathname : "",
          language: "es",
        }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json?.error || `HTTP ${res.status}`);
      }
      trackConversion("contact_form_submit", {
        request_type: "KAIRON for Teams — Corporate Pilot",
        has_org: data.organization.trim().length > 0,
        locale: "es",
      });
      setStatus("success");
    } catch (err) {
      console.error("[kairon-for-teams] submit failed", err);
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.16)",
    borderRadius: 9,
    padding: "13px 14px",
    color: "#fff",
    fontSize: 15,
    letterSpacing: "normal",
    textTransform: "none",
    outline: "none",
    width: "100%",
  };

  if (status === "success") {
    return (
      <div
        id="formulario"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.13)", borderRadius: 18, padding: "clamp(24px,3vw,34px)" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <CheckCircle2 size={22} color={ORANGE} />
          <div className="font-display" style={{ fontSize: 20, fontWeight: 600 }}>Solicitud enviada</div>
        </div>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", marginTop: 12, lineHeight: 1.6 }}>
          Gracias por escribirnos. Respondemos en menos de 24 horas hábiles.
        </p>
        <button
          type="button"
          onClick={() => {
            setData(EMPTY_FORM);
            setStatus("idle");
          }}
          className="kft-outline-pill"
          style={{ marginTop: 20, border: "1px solid rgba(255,255,255,0.28)", color: "#fff", fontWeight: 500, fontSize: 14, padding: "12px 22px", borderRadius: 999, background: "transparent", cursor: "pointer" }}
        >
          Enviar otra solicitud
        </button>
        <style>{`.kft-outline-pill:hover { border-color: #fff; }`}</style>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form
      id="formulario"
      onSubmit={handleSubmit}
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.13)", borderRadius: 18, padding: "clamp(24px,3vw,34px)" }}
    >
      <div className="font-display" style={{ fontSize: 20, fontWeight: 600 }}>Solicitar información del piloto</div>
      <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", margin: "8px 0 0" }}>Respondemos en menos de 24 horas hábiles.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 14, marginTop: 24 }}>
        <FormField label="Nombre">
          <input required value={data.name} onChange={onChange("name")} style={inputStyle} className="kft-input" placeholder="Nombre y apellido" autoComplete="name" />
        </FormField>
        <FormField label="Empresa">
          <input value={data.organization} onChange={onChange("organization")} style={inputStyle} className="kft-input" placeholder="Organización" autoComplete="organization" />
        </FormField>
        <FormField label="Cargo">
          <input value={data.role} onChange={onChange("role")} style={inputStyle} className="kft-input" placeholder="Ej. Gerente de Talento Humano" autoComplete="organization-title" />
        </FormField>
        <FormField label="Email">
          <input required type="email" value={data.email} onChange={onChange("email")} style={inputStyle} className="kft-input" placeholder="nombre@empresa.com" autoComplete="email" />
        </FormField>
        <FormField label="Teléfono" fullWidth>
          <input value={data.whatsapp} onChange={onChange("whatsapp")} style={inputStyle} className="kft-input" placeholder="+593" inputMode="tel" autoComplete="tel" />
        </FormField>
        <FormField label="Mensaje" fullWidth>
          <textarea
            required
            rows={4}
            value={data.message}
            onChange={onChange("message")}
            style={{ ...inputStyle, resize: "vertical" }}
            className="kft-input"
            placeholder="Tamaño del equipo, contexto, qué quieren resolver"
          />
        </FormField>
      </div>

      <div aria-hidden className="hidden" style={{ position: "absolute", left: "-10000px" }}>
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" value={data.website} onChange={onChange("website")} />
        </label>
      </div>

      <label style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 12.5, color: "rgba(255,255,255,0.6)", lineHeight: 1.5, marginTop: 18 }}>
        <input type="checkbox" checked={data.consent} onChange={onChange("consent")} style={{ marginTop: 2, accentColor: ORANGE }} />
        <span>
          He leído y acepto las{" "}
          <a href="/politicas-legales" style={{ color: "rgba(255,255,255,0.85)", textDecoration: "underline" }}>
            Políticas Legales
          </a>{" "}
          y la Política de Privacidad. *
        </span>
      </label>

      {fieldError ? <p style={{ fontSize: 13, color: "#F4A0A0", marginTop: 12 }}>{fieldError}</p> : null}
      {status === "error" ? (
        <p style={{ fontSize: 13, color: "#F4A0A0", marginTop: 12 }}>
          No pudimos enviar tu solicitud. Escríbenos por WhatsApp al +593 98 687 5121 o a guillermo@g-structure.co.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={sending}
        className="kft-cta-pill"
        style={{
          width: "100%",
          marginTop: 20,
          background: ORANGE,
          color: "#241300",
          fontWeight: 600,
          fontSize: 16,
          padding: "15px 24px",
          border: "none",
          borderRadius: 999,
          cursor: sending ? "not-allowed" : "pointer",
          opacity: sending ? 0.7 : 1,
        }}
      >
        {sending ? "Enviando..." : "Enviar solicitud"}
      </button>

      <style>{`
        .kft-input:focus { border-color: ${ORANGE} !important; }
        .kft-cta-pill:hover { background: ${ORANGE_HOVER}; }
      `}</style>
    </form>
  );
}

function FormField({ label, fullWidth, children }: { label: string; fullWidth?: boolean; children: React.ReactNode }) {
  return (
    <label style={{ display: "grid", gap: 7, fontSize: "12.5px", letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", gridColumn: fullWidth ? "1/-1" : undefined }}>
      {label}
      {children}
    </label>
  );
}

function SiteFooter() {
  return (
    <footer style={{ background: INK_2, color: "rgba(255,255,255,0.6)", padding: "clamp(44px,6vw,72px) clamp(20px,5vw,40px)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 32 }}>
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <span className="font-display" style={{ fontWeight: 600, fontSize: 16, letterSpacing: "0.14em", color: "#fff" }}>KAIRON</span>
            <span style={{ fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: ORANGE }}>G-Structure</span>
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.6, margin: "14px 0 0", maxWidth: "26em" }}>
            Plataforma de coaching cognitivo con IA para equipos que necesitan ejecutar.
          </p>
        </div>
        <div style={{ display: "grid", gap: 10, fontSize: "14.5px" }}>
          <a href="mailto:guillermo@g-structure.co" className="kft-footer-link" style={{ color: "rgba(255,255,255,0.7)" }}>
            guillermo@g-structure.co
          </a>
          <a href="https://wa.me/593986875121" className="kft-footer-link" style={{ color: "rgba(255,255,255,0.7)" }}>
            WhatsApp 0986875121
          </a>
          <a href="https://g-structure.co" className="kft-footer-link" style={{ color: "rgba(255,255,255,0.7)" }}>
            g-structure.co
          </a>
        </div>
        <div style={{ display: "grid", gap: 10, fontSize: "14.5px" }}>
          <a href="#pilot" className="kft-footer-link" style={{ color: "rgba(255,255,255,0.7)" }}>Corporate Pilot</a>
          <a href="#privacidad" className="kft-footer-link" style={{ color: "rgba(255,255,255,0.7)" }}>Privacidad por diseño</a>
          <a href="#contacto" className="kft-footer-link" style={{ color: "rgba(255,255,255,0.7)" }}>Agendar conversación</a>
        </div>
      </div>
      <div style={{ maxWidth: 1180, margin: "36px auto 0", paddingTop: 22, borderTop: "1px solid rgba(255,255,255,0.09)", fontSize: 13, color: "rgba(255,255,255,0.38)" }}>
        © 2026 G-Structure. KAIRON™ · Método I-R-O™.
      </div>
      <style>{`.kft-footer-link:hover { color: ${ORANGE}; }`}</style>
    </footer>
  );
}
