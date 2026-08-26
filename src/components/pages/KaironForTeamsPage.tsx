import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import gsLogoLight from "@/assets/gslogolight.webp";
import { trackContactClick, trackConversion } from "@/lib/analytics";
import { KAIRON_THEME } from "@/lib/kaironTheme";
import { DocDropdown, type DocNavItem } from "@/components/site/KaironDocChrome";

/**
 * Standalone B2B landing page for the KAIRON Corporate Pilot, aimed at
 * Talento Humano / People & Culture buyers. Built from the "KAIRON for
 * Teams" design handoff — rendered outside the site's default Header/Footer
 * (see the isStandalone check in __root.tsx) so the page keeps its own
 * dark obsidian/amber surface end to end.
 */

const ORANGE = KAIRON_THEME.accent;
const ORANGE_HOVER = KAIRON_THEME.accentHover;
const INK = KAIRON_THEME.bg;
const INK_2 = KAIRON_THEME.footerBg;
const CALENDLY_URL = "https://calendly.com/contacto-guillermosuco/llamada-de-orientacion";

const PROBLEMS = [
  { n: "01", t: "Procrastinación", anchor: "procrastinacion", signs: ["Tareas críticas postergadas", "Urgencias evitables", "Ejecución reactiva"] },
  { n: "02", t: "Perfeccionismo", anchor: "perfeccionismo", signs: ["Retrasos", "Retrabajo", "Dificultad para delegar", "Exceso de revisión"] },
  { n: "03", t: "Autosabotaje", anchor: "autosabotaje", signs: ["Abandono", "Inconsistencia", "Conductas que interfieren con objetivos definidos"] },
  { n: "04", t: "Síndrome del impostor", anchor: "impostor", signs: ["Evitación de oportunidades", "Menor participación", "Inseguridad ante decisiones"] },
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

const PILOT_QUESTIONS = [
  "¿Los colaboradores reconocen sus patrones?",
  "¿Vuelven a usar KAIRON cuando aparece la fricción?",
  "¿Definen acciones concretas?",
  "¿Ejecutan esas acciones?",
  "¿Perciben valor suficiente para continuar?",
  "¿Hay adopción real, no solo curiosidad inicial?",
];

const PRIVACY_POINTS = [
  { text: "La empresa no ve conversaciones individuales", strong: false },
  { text: "No ve resultados personales del Scanner", strong: false },
  { text: "No accede al contenido interno de cada usuario", strong: false },
  { text: "Solo recibe adopción agregada, tendencias y distribución anónima de patrones", strong: true },
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
  "Knowledge workers",
  "Equipos de proyecto",
  "Equipos comerciales",
  "Mandos medios",
  "Instituciones educativas",
];

const NAV = [
  { href: "#pilot", label: "Corporate Pilot" },
  { href: "#privacidad", label: "Privacidad" },
];

export function KaironForTeamsPage() {
  return (
    <div style={{ background: KAIRON_THEME.bg, color: KAIRON_THEME.text, overflowX: "hidden" }}>
      <SiteHeader />
      <Hero />
      <ProblemSection />
      <MethodSection />
      <PilotSection />
      <ChatGptObjectionSection />
      <PrivacySection />
      <ProofSection />
      <BilingualSection />
      <AudienceSection />
      <ContactSection />
      <SiteFooter />
    </div>
  );
}

const PRODUCTO_ITEMS: DocNavItem[] = [
  { label: "KAIRON", href: "/#producto" },
  { label: "Precio", href: "/#precio" },
  { label: "KAIRON for Teams", to: "/teams" },
  { label: "KAIRON vs IA generativa", href: "/vs-ia-generativa" },
];

const METODOLOGIA_ITEMS: DocNavItem[] = [
  { label: "Método I-R-O™", href: "/metodo-iro" },
  { label: "Bloqueos de ejecución", href: "/bloqueos" },
  { label: "Índice de Fricción", href: "/indice-friccion" },
];

function SiteHeader() {
  const [menu, setMenu] = useState<"producto" | "metodologia" | null>(null);
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setMenu(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(null);
    };
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header
      ref={rootRef}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(10,10,11,0.82)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(245,243,240,0.07)",
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
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 13, flex: "none" }}>
          <img src={gsLogoLight} alt="G-Structure" style={{ height: 26, width: "auto", display: "block" }} />
          <span style={{ fontSize: 11.5, letterSpacing: "0.16em", textTransform: "uppercase", color: ORANGE, whiteSpace: "nowrap" }}>
            for Teams
          </span>
        </Link>
        <nav aria-label="Principal" style={{ display: "flex", alignItems: "center", gap: "clamp(14px,2.2vw,28px)", flexWrap: "wrap", justifyContent: "flex-end" }}>
          <DocDropdown
            label="Producto"
            items={PRODUCTO_ITEMS}
            open={menu === "producto"}
            onToggle={(e) => { e.stopPropagation(); setMenu((m) => (m === "producto" ? null : "producto")); }}
          />
          <DocDropdown
            label="Metodología"
            items={METODOLOGIA_ITEMS}
            open={menu === "metodologia"}
            onToggle={(e) => { e.stopPropagation(); setMenu((m) => (m === "metodologia" ? null : "metodologia")); }}
          />
          <span className="kft-nav-link" style={{ color: "#fff", fontSize: 13.5 }}>Equipos</span>
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="kft-nav-link" style={{ color: "rgba(255,255,255,0.66)", fontSize: 13.5 }}>
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
        .kft-nav-link:focus-visible, .kft-cta-pill:focus-visible {
          outline: 2px solid ${ORANGE}; outline-offset: 3px; border-radius: 4px;
        }
        .kdh-trigger { background: none; border: 0; padding: 6px 0; font-size: 13.5px; cursor: pointer; display: flex; align-items: center; gap: 6px; white-space: nowrap; color: rgba(255,255,255,0.66); font-family: inherit; }
        .kdh-trigger:hover { color: #fff; }
        .kdh-panel { position: absolute; top: calc(100% + 14px); left: -14px; min-width: 244px; background: ${KAIRON_THEME.surface2}; border: 1px solid ${KAIRON_THEME.borderStrong}; border-radius: 14px; padding: 8px; display: grid; gap: 1px; box-shadow: 0 20px 46px rgba(0,0,0,0.6); z-index: 80; }
        .kdh-item { display: block; padding: 10px 12px; border-radius: 9px; font-size: 14px; color: rgba(245,243,240,0.74); }
        .kdh-item:hover { background: rgba(245,243,240,0.06); color: #F5F3F0; }
        .kdh-trigger:focus-visible, .kdh-item:focus-visible {
          outline: 2px solid ${ORANGE}; outline-offset: 3px; border-radius: 4px;
        }
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
            Tu equipo sabe qué tiene que hacer. ¿Qué está impidiendo que lo ejecute?
          </h1>
          <p style={{ fontSize: "clamp(17px,2vw,21px)", lineHeight: 1.55, color: "rgba(255,255,255,0.74)", margin: "24px 0 0", maxWidth: "34em" }}>
            KAIRON ayuda a identificar patrones como procrastinación, perfeccionismo, autosabotaje y síndrome del impostor, y da a cada colaborador una herramienta para trabajarlos cuando realmente aparecen.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: "rgba(255,255,255,0.52)", margin: "18px 0 0", maxWidth: "34em" }}>
            No es otra capacitación de productividad ni un programa de bienestar. Es un sistema para trabajar la fricción cognitiva que aparece antes de que la ejecución se rompa.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 38 }}>
            <a
              href="#contacto"
              className="kft-cta-pill"
              style={{ background: ORANGE, color: "#241300", fontWeight: 600, fontSize: 16, padding: "16px 28px", borderRadius: 999 }}
            >
              Explorar un Corporate Pilot
            </a>
            <a
              href="#contacto"
              className="kft-outline-pill"
              style={{ border: "1px solid rgba(255,255,255,0.28)", color: "#fff", fontWeight: 500, fontSize: 16, padding: "16px 28px", borderRadius: 999 }}
            >
              Agenda 15 minutos
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
            <span>Validación inicial: 52 personas ya lo probaron</span>
            <span>Semifinalistas CodeLaunch LATAM 2026</span>
            <span>Hosts de Ecuador Tech Week 2026</span>
            <span>Boostcamp 2026 · i3lab ESPOL</span>
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
          <div style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: ORANGE }}>El problema</div>
          <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(28px,4vw,46px)", lineHeight: 1.1, letterSpacing: "-0.015em", margin: "16px 0 0" }}>
            No siempre es tiempo, disciplina o motivación
          </h2>
          <p style={{ fontSize: "clamp(16px,1.7vw,19px)", lineHeight: 1.6, color: "rgba(245,243,240,0.62)", margin: "20px 0 0" }}>
            En muchas organizaciones las personas saben exactamente qué hacer. Algo las bloquea justo en el momento de ejecutar.
          </p>
        </div>

        <div style={{ display: "grid", gap: 12, marginTop: 44 }}>
          {PROBLEMS.map((p) => (
            <a
              key={p.n}
              href={`/bloqueos#${p.anchor}`}
              className="kft-problem-card"
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(180px,1fr) 2fr",
                gap: "clamp(14px,3vw,34px)",
                alignItems: "start",
                background: KAIRON_THEME.surface,
                border: `1px solid ${KAIRON_THEME.border}`,
                borderRadius: 14,
                padding: "22px 24px",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <div>
                <div className="font-display" style={{ fontSize: "12.5px", color: ORANGE }}>{p.n}</div>
                <div className="font-display" style={{ fontSize: 19, fontWeight: 600, marginTop: 8 }}>{p.t}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(245,243,240,0.42)" }}>Puede aparecer como</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 11 }}>
                  {p.signs.map((s) => (
                    <span key={s} style={{ border: `1px solid ${KAIRON_THEME.borderStrong}`, borderRadius: 999, padding: "7px 14px", fontSize: 14, color: "rgba(245,243,240,0.78)" }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>

        <p style={{ fontSize: 14, lineHeight: 1.6, color: "rgba(245,243,240,0.42)", margin: "28px 0 0", maxWidth: "52em" }}>
          Estos patrones se describen como conductas observables de ejecución. KAIRON no diagnostica ni afirma causalidad clínica.
        </p>
      </div>
      <style>{`
        .kft-problem-card:hover { border-color: rgba(240,160,70,0.7); }
        .kft-problem-card:focus-visible { outline: 2px solid ${ORANGE}; outline-offset: 3px; }
      `}</style>
    </section>
  );
}

function MethodSection() {
  return (
    <section
      id="metodo"
      style={{ padding: "clamp(64px,9vw,120px) clamp(20px,5vw,40px)", background: KAIRON_THEME.surface, borderTop: `1px solid ${KAIRON_THEME.border}`, borderBottom: `1px solid ${KAIRON_THEME.border}` }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(32px,5vw,64px)", alignItems: "start" }}>
          <div>
            <div style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: ORANGE }}>Qué hace diferente a KAIRON</div>
            <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(28px,4vw,46px)", lineHeight: 1.1, letterSpacing: "-0.015em", margin: "16px 0 0" }}>
              El bloqueo no espera a la próxima sesión
            </h2>
          </div>
          <div style={{ display: "grid", gap: 18 }}>
            <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              <span style={{ flexShrink: 0, width: 8, height: 8, borderRadius: "50%", background: "rgba(245,243,240,0.2)", marginTop: 9 }} />
              <p style={{ margin: 0, fontSize: 17, lineHeight: 1.55, color: "rgba(245,243,240,0.72)" }}>El coaching tradicional ocurre en una sesión.</p>
            </div>
            <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              <span style={{ flexShrink: 0, width: 8, height: 8, borderRadius: "50%", background: "rgba(245,243,240,0.2)", marginTop: 9 }} />
              <p style={{ margin: 0, fontSize: 17, lineHeight: 1.55, color: "rgba(245,243,240,0.72)" }}>El bloqueo ocurre en cualquier momento.</p>
            </div>
            <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              <span style={{ flexShrink: 0, width: 8, height: 8, borderRadius: "50%", background: ORANGE, marginTop: 9 }} />
              <p style={{ margin: 0, fontSize: 17, lineHeight: 1.55, color: KAIRON_THEME.text, fontWeight: 500 }}>
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
            border: `1px solid ${KAIRON_THEME.border}`,
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          {IRO_STEPS.map((s, i) => (
            <div
              key={s.letter}
              style={{
                padding: "clamp(26px,3vw,36px)",
                borderRight: i < IRO_STEPS.length - 1 ? `1px solid ${KAIRON_THEME.border}` : undefined,
              }}
            >
              <div className="font-display" style={{ fontSize: 44, fontWeight: 600, color: ORANGE, lineHeight: 1 }}>{s.letter}</div>
              <div className="font-display" style={{ fontSize: 22, fontWeight: 600, marginTop: 14 }}>{s.t}</div>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: "rgba(245,243,240,0.6)", margin: "12px 0 0" }}>{s.d}</p>
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
            Empiece pequeño. Mida. Decida con evidencia.
          </h2>
          <p style={{ fontSize: "clamp(16px,1.7vw,19px)", lineHeight: 1.6, color: "rgba(255,255,255,0.6)", margin: "20px 0 0" }}>
            Una cohorte controlada durante 30 días. Sin implementación masiva y sin compromiso anual para empezar.
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

        <div style={{ marginTop: 44, border: "1px solid rgba(255,255,255,0.13)", borderRadius: 16, padding: "clamp(24px,3.5vw,38px)", background: "rgba(255,255,255,0.02)" }}>
          <div style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: ORANGE }}>Qué responde el piloto</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "14px 34px", marginTop: 20 }}>
            {PILOT_QUESTIONS.map((q) => (
              <div key={q} style={{ display: "flex", gap: 12, fontSize: "15.5px", lineHeight: 1.5, color: "rgba(255,255,255,0.78)" }}>
                <span style={{ color: ORANGE }}>—</span>
                <span>{q}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.1)", fontSize: 14, lineHeight: 1.6, color: "rgba(255,255,255,0.5)", maxWidth: "46em" }}>
            Talento Humano recibe adopción agregada, tendencias y distribución anónima de patrones. Las métricas de resultado se definen con usted al inicio del piloto: no prometemos cifras que todavía no hemos demostrado.
          </div>
          <a
            href="#contacto"
            className="kft-cta-pill"
            style={{ display: "inline-block", marginTop: 26, background: ORANGE, color: "#241300", fontWeight: 600, fontSize: 16, padding: "15px 26px", borderRadius: 999 }}
          >
            Explorar un Corporate Pilot
          </a>
        </div>
      </div>
    </section>
  );
}

const CHATGPT_LICENSE_POINTS = [
  "Conversación abierta",
  "Resultado dependiente del prompt",
  "Propósito amplio",
  "Sin flujo organizacional específico",
  "Sin lectura agregada de patrones",
];

const CHATGPT_PILOT_POINTS = [
  "Scanner y protocolos estructurados",
  "Método I-R-O™ como experiencia consistente",
  "Intervención orientada a acción",
  "Privacidad individual por diseño",
  "Cohortes, adopción y reporting agregado",
];

function ChatGptObjectionSection() {
  return (
    <section id="por-que-no-chatgpt" style={{ padding: "clamp(64px,9vw,120px) clamp(20px,5vw,40px)", background: INK, borderTop: `1px solid ${KAIRON_THEME.border}` }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ maxWidth: 740 }}>
          <div style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: ORANGE }}>La objeción honesta</div>
          <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(28px,4vw,46px)", lineHeight: 1.1, letterSpacing: "-0.015em", margin: "16px 0 0" }}>
            ¿Por qué no darle ChatGPT al equipo?
          </h2>
          <p style={{ fontSize: "clamp(16px,1.7vw,19px)", lineHeight: 1.6, color: "rgba(245,243,240,0.62)", margin: "20px 0 0" }}>
            Porque el problema no es el acceso a inteligencia artificial. El problema es convertir esa capacidad en un proceso consistente, delimitado y repetible para trabajar fricción de ejecución.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 18, marginTop: 44 }}>
          <div style={{ border: `1px solid ${KAIRON_THEME.border}`, borderRadius: 16, padding: 26, background: KAIRON_THEME.surface }}>
            <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(245,243,240,0.45)" }}>Licencia de IA generalista</div>
            <div style={{ display: "grid", gap: 9, marginTop: 16, fontSize: 15, lineHeight: 1.5, color: "rgba(245,243,240,0.62)" }}>
              {CHATGPT_LICENSE_POINTS.map((p) => <div key={p}>{p}</div>)}
            </div>
          </div>
          <div style={{ border: "1px solid rgba(240,160,70,0.34)", borderRadius: 16, padding: 26, background: "rgba(240,160,70,0.06)" }}>
            <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: ORANGE }}>KAIRON Corporate Pilot</div>
            <div style={{ display: "grid", gap: 9, marginTop: 16, fontSize: 15, lineHeight: 1.5, color: "rgba(245,243,240,0.8)" }}>
              {CHATGPT_PILOT_POINTS.map((p) => <div key={p}>{p}</div>)}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center", justifyContent: "space-between", marginTop: 40, borderLeft: `2px solid ${ORANGE}`, padding: "8px 0 8px 24px" }}>
          <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "clamp(20px,2.6vw,30px)", lineHeight: 1.35, margin: 0, maxWidth: "28em" }}>
            La empresa no está comprando acceso a un modelo de IA. Está implementando un sistema específico para ejecución cognitiva.
          </p>
          <a href="/vs-ia-generativa" style={{ fontSize: "15.5px", whiteSpace: "nowrap" }}>Ver la comparación completa →</a>
        </div>
      </div>
    </section>
  );
}

function PrivacySection() {
  return (
    <section id="privacidad" style={{ padding: "clamp(64px,9vw,120px) clamp(20px,5vw,40px)", background: KAIRON_THEME.surface, borderBottom: `1px solid ${KAIRON_THEME.border}` }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "clamp(32px,5vw,64px)", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: ORANGE }}>Privacidad por diseño</div>
          <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(28px,4vw,46px)", lineHeight: 1.1, letterSpacing: "-0.015em", margin: "16px 0 0" }}>
            KAIRON pertenece al colaborador, no al supervisor.
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: "rgba(245,243,240,0.62)", margin: "20px 0 0" }}>
            La confianza es la condición para que la herramienta funcione. Por eso la separación de datos es estructural, no una política opcional.
          </p>
        </div>
        <div style={{ display: "grid", gap: 14 }}>
          {PRIVACY_POINTS.map((p) =>
            p.strong ? (
              <div key={p.text} style={{ background: "rgba(240,160,70,0.1)", border: "1px solid rgba(240,160,70,0.32)", borderRadius: 12, padding: "20px 22px", fontSize: "15.5px", lineHeight: 1.5, color: KAIRON_THEME.text, fontWeight: 500 }}>
                {p.text}
              </div>
            ) : (
              <div key={p.text} style={{ background: KAIRON_THEME.surface2, border: `1px solid ${KAIRON_THEME.border}`, borderRadius: 12, padding: "20px 22px", fontSize: "15.5px", lineHeight: 1.5, color: "rgba(245,243,240,0.78)" }}>
                {p.text}
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

const STATS = [
  { big: "52", label: "personas ya probaron KAIRON" },
  { big: "Semifinalistas\nCodeLaunch LATAM 2026", label: "competencia de startups tecnológicas de la región" },
  { big: "Hosts de\nEcuador Tech Week 2026", label: "G-Structure como anfitriona, junto a Startup Grind y Viamatica" },
  { big: "Boostcamp 2026", label: "Programa de Pre Aceleración de i3lab, ESPOL, con financiamiento del Banco Interamericano de Desarrollo" },
];

function ProofSection() {
  return (
    <section style={{ padding: "clamp(64px,9vw,120px) clamp(20px,5vw,40px)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 20 }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{ background: KAIRON_THEME.surface, border: `1px solid ${KAIRON_THEME.border}`, borderRadius: 14, padding: 26 }}>
              <div className="font-display" style={i === 0 ? { fontSize: "clamp(34px,4vw,46px)", fontWeight: 600, lineHeight: 1 } : { fontSize: 18, fontWeight: 600, lineHeight: 1.3, whiteSpace: "pre-line" }}>
                {s.big}
              </div>
              <div style={{ fontSize: "14.5px", color: "rgba(245,243,240,0.6)", marginTop: 10 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(26px,3.4vw,38px)", lineHeight: 1.15, letterSpacing: "-0.015em", margin: "64px 0 0" }}>
          Lo que dicen quienes ya lo usaron
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: 18, marginTop: 32 }}>
          {TESTIMONIALS.map((t) => (
            <div key={t.who} style={{ background: KAIRON_THEME.surface, border: `1px solid ${KAIRON_THEME.border}`, borderRadius: 14, padding: 28, display: "flex", flexDirection: "column", gap: 18 }}>
              <p style={{ margin: 0, fontFamily: "'Newsreader', Georgia, serif", fontSize: 19, lineHeight: 1.45, color: KAIRON_THEME.text }}>“{t.quote}”</p>
              <div style={{ marginTop: "auto", fontSize: "13.5px", color: "rgba(245,243,240,0.55)", borderTop: `1px solid ${KAIRON_THEME.border}`, paddingTop: 16 }}>
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
    <section style={{ padding: "clamp(56px,8vw,100px) clamp(20px,5vw,40px)", background: KAIRON_THEME.surface, borderTop: `1px solid ${KAIRON_THEME.border}`, borderBottom: `1px solid ${KAIRON_THEME.border}` }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(28px,5vw,64px)", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: ORANGE }}>Bilingüe</div>
          <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(26px,3.4vw,38px)", lineHeight: 1.15, letterSpacing: "-0.015em", margin: "14px 0 0" }}>
            Español o inglés, de punta a punta
          </h2>
        </div>
        <div style={{ display: "grid", gap: 12, fontSize: 16, lineHeight: 1.55, color: "rgba(245,243,240,0.72)" }}>
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
        <p style={{ fontSize: 16, lineHeight: 1.6, color: "rgba(245,243,240,0.55)", margin: "14px 0 0", maxWidth: "36em" }}>
          Organizaciones donde la ejecución depende de decisiones, priorización y coordinación, y donde las personas tienen autonomía real sobre su trabajo. No es para toda empresa.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14, marginTop: 32 }}>
          {AUDIENCE.map((a) => (
            <div key={a} style={{ border: `1px solid ${KAIRON_THEME.borderStrong}`, borderRadius: 12, padding: 22, fontSize: 16, fontWeight: 500 }}>
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
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="kft-cta-pill"
                style={{ background: ORANGE, color: "#241300", fontWeight: 600, fontSize: 16, padding: "16px 28px", borderRadius: 999 }}
                onClick={() => trackContactClick("external", { source: "kairon_for_teams_hero", tool: "calendly" })}
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
            <div style={{ marginTop: 40 }}>
              <CalendlyEmbed />
            </div>
          </div>

          <PilotRequestForm />
        </div>
      </div>
      <style>{`.kft-outline-pill:hover { border-color: #fff; }`}</style>
    </section>
  );
}

function loadCalendlyScript() {
  if (document.querySelector<HTMLScriptElement>("script[data-gstructure-calendly]")) return;
  const script = document.createElement("script");
  script.src = "https://assets.calendly.com/assets/external/widget.js";
  script.async = true;
  script.dataset.gstructureCalendly = "true";
  document.head.appendChild(script);
}

function CalendlyEmbed() {
  useEffect(() => {
    loadCalendlyScript();
  }, []);

  const embedUrl = `${CALENDLY_URL}?background_color=0a0a0b&text_color=f5f3f0&primary_color=f0a046`;

  return (
    <div
      className="calendly-inline-widget"
      data-url={embedUrl}
      style={{ minWidth: 280, height: 680, borderRadius: 14, overflow: "hidden" }}
    />
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
          <Link to="/" style={{ display: "block", width: "fit-content" }}>
            <img src={gsLogoLight} alt="G-Structure" style={{ height: 30, width: "auto", display: "block" }} />
          </Link>
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
          <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 4 }}>Esta página</div>
          <a href="#pilot" className="kft-footer-link" style={{ color: "rgba(255,255,255,0.7)" }}>Corporate Pilot</a>
          <a href="#privacidad" className="kft-footer-link" style={{ color: "rgba(255,255,255,0.7)" }}>Privacidad por diseño</a>
          <a href="#contacto" className="kft-footer-link" style={{ color: "rgba(255,255,255,0.7)" }}>Agendar conversación</a>
        </div>
        <div style={{ display: "grid", gap: 10, fontSize: "14.5px" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 4 }}>G-Structure</div>
          <Link to="/" className="kft-footer-link" style={{ color: "rgba(255,255,255,0.7)" }}>Inicio</Link>
          <a href="/#producto" className="kft-footer-link" style={{ color: "rgba(255,255,255,0.7)" }}>KAIRON (individual)</a>
          <a href="/metodo-iro" className="kft-footer-link" style={{ color: "rgba(255,255,255,0.7)" }}>Método I-R-O™</a>
          <a href="/bloqueos" className="kft-footer-link" style={{ color: "rgba(255,255,255,0.7)" }}>Bloqueos de ejecución</a>
          <a href="/indice-friccion" className="kft-footer-link" style={{ color: "rgba(255,255,255,0.7)" }}>Índice de Fricción</a>
          <a href="/vs-ia-generativa" className="kft-footer-link" style={{ color: "rgba(255,255,255,0.7)" }}>KAIRON vs IA generativa</a>
          <a href="/#precio" className="kft-footer-link" style={{ color: "rgba(255,255,255,0.7)" }}>Precio</a>
        </div>
      </div>
      <div style={{ maxWidth: 1180, margin: "36px auto 0", paddingTop: 22, borderTop: "1px solid rgba(255,255,255,0.09)", fontSize: 13, color: "rgba(255,255,255,0.38)" }}>
        © 2026 G-Structure. KAIRON™ · Método I-R-O™.
        <br />
        <span style={{ display: "inline-block", marginTop: 10, maxWidth: "60em" }}>
          KAIRON es una herramienta de coaching y desarrollo personal y profesional. No diagnostica ni trata condiciones de salud mental y no sustituye la atención clínica profesional.
        </span>
      </div>
      <style>{`
        .kft-footer-link:hover { color: ${ORANGE}; }
        .kft-footer-link:focus-visible { outline: 2px solid ${ORANGE}; outline-offset: 3px; border-radius: 4px; }
      `}</style>
    </footer>
  );
}
