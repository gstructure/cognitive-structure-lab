import { KaironDocHeader, KaironDocFooter } from "@/components/site/KaironDocChrome";
import { trackAcquisitionEvent, trackOutboundAppOpened } from "@/lib/analytics";
import { getLaunchPhase, kaironAppUrl } from "@/lib/launchConfig";
import { KAIRON_THEME } from "@/lib/kaironTheme";
import type { Locale } from "@/lib/i18n";

/**
 * Canonical /vs-ia-generativa (and /en/vs-generative-ai) page — the site's
 * central competitive comparison, replacing the retired KAIRON vs Notion
 * page. Per the "Reposicionamiento KAIRON" handoff: KAIRON does not compete
 * with ChatGPT/Claude on model intelligence — the difference is product
 * design (a bounded, questioning process vs. an open-ended one). Illustrative
 * dialogue is explicitly labeled as such and not attributed to any model.
 * Standalone (own header/footer, see the isStandalone check in __root.tsx).
 */

const ORANGE = KAIRON_THEME.accent;

type FlowRow = { title: string; body: string };

type Copy = {
  heroKicker: string;
  heroL1: string; heroL2: string; heroSub: string;
  heroCta: string; heroCta2: string; heroNote: string;
  splitKicker: string; splitTitle: string; splitSub: string;
  openLabel: string; openBadge: string;
  openUser: string; openReply: string; openFoot: string;
  flowLabel: string; flowBadge: string;
  flowUser: string; flowReply1: string; flowReply2: string;
  flowStep1: string; flowStep2: string; flowStep3: string; flowStep4: string;
  dialogueDisclaimer: string;
  compareKicker: string; compareTitle: string;
  genTitle: string; genRows: FlowRow[];
  kaiTitle: string; kaiRows: FlowRow[];
  compareQuote: string;
  promptKicker: string; promptTitle: string; promptBody: string; promptLink: string;
  flows: { name: string; body: string }[];
  b2bKicker: string; b2bTitle: string; b2bSub: string;
  b2bGenLabel: string; b2bGenPoints: string[];
  b2bKaiLabel: string; b2bKaiPoints: string[];
  b2bQuote: string; b2bCta: string;
  finalTitle: string; finalSub: string; finalCta: string; finalCta2: string;
  clinicalDisclaimer: string;
  legalNote: string;
};

export const VS_AI_COPY: Record<Locale, Copy> = {
  es: {
    heroKicker: "La comparación que importa",
    heroL1: "Tu IA puede darte una respuesta.",
    heroL2: "KAIRON está diseñado para desafiar lo que te está bloqueando.",
    heroSub: "La diferencia no está en la inteligencia del modelo. Está en el diseño del proceso: qué se pregunta, cuándo se cuestiona y dónde termina la sesión.",
    heroCta: "Probar KAIRON", heroCta2: "Ver la comparación",
    heroNote: "ChatGPT y Claude son herramientas extremadamente capaces. No competimos con su inteligencia: construimos algo mucho más específico para el momento en que la ejecución se rompe.",
    splitKicker: "Validación vs desafío",
    splitTitle: "La misma frase, dos procesos distintos",
    splitSub: "Un usuario escribe “creo que no estoy listo”. Lo que ocurre después depende de para qué fue diseñada la herramienta.",
    openLabel: "Conversación abierta", openBadge: "Ejemplo ilustrativo",
    openUser: "Creo que no estoy listo para enviar la propuesta.",
    openReply: "Es comprensible sentirse así antes de una entrega importante. ¿Quieres que revisemos juntos la propuesta o que armemos una checklist para que te sientas más seguro?",
    openFoot: "La conversación continúa dentro del marco que planteó el usuario. Puede llegar a un buen lugar, y depende de que el usuario sepa hacia dónde llevarla.",
    flowLabel: "Flujo estructurado KAIRON", flowBadge: "Filtro · I-R-O™",
    flowUser: "Creo que no estoy listo para enviar la propuesta.",
    flowReply1: "¿Qué evidencia tienes de que “no estar listo” significa que no debes actuar? ¿Qué le falta a la propuesta que un lector externo notaría?",
    flowReply2: "Entonces la propuesta está lista y lo que no está listo es tu certeza. Envíala hoy antes de las 18:00 con la versión que ya tienes.",
    flowStep1: "Pensamiento", flowStep2: "Desafío", flowStep3: "Reencuadre", flowStep4: "Acción",
    dialogueDisclaimer: "Los diálogos son ilustrativos y no representan la respuesta real de ningún modelo específico. Las IA generalistas están optimizadas para conversaciones abiertas y para seguir la instrucción del usuario; KAIRON está diseñado con flujos que buscan detectar, cuestionar y reestructurar interpretaciones vinculadas a bloqueos de ejecución.",
    compareKicker: "Diseño de producto, no inteligencia",
    compareTitle: "Una IA generalista conversa. KAIRON interviene sobre un proceso específico.",
    genTitle: "IA generativa general",
    genRows: [
      { title: "Empieza con una página en blanco", body: "El usuario debe saber qué preguntar." },
      { title: "Responde al contexto que recibe", body: "Trabaja dentro del marco que plantea el usuario." },
      { title: "La conversación puede ir en cualquier dirección", body: "Propósito amplio, sin flujo delimitado." },
      { title: "El usuario diseña el proceso", body: "La calidad depende del prompt y de la técnica que conozca." },
      { title: "Puede producir ideas, recomendaciones o reflexión", body: "Terminar en acción es un resultado posible, no el objetivo del diseño." },
    ],
    kaiTitle: "KAIRON",
    kaiRows: [
      { title: "Empieza con contexto estructurado", body: "Scanner, patrones y memoria de ejecución." },
      { title: "Está diseñado para cuestionar el marco", body: "No solamente continuar la narrativa del usuario." },
      { title: "Usa protocolos de coaching cognitivo-conductual", body: "Evidencia, supuestos, distorsiones, consecuencias, alternativas." },
      { title: "KAIRON guía el proceso", body: "El usuario no necesita diseñar prompts ni conocer técnicas." },
      { title: "La sesión desemboca en acción", body: "Una siguiente acción concreta, de cinco minutos, validada." },
    ],
    compareQuote: "No estamos intentando construir una IA más general. Estamos construyendo una IA mucho más específica para el momento en que la ejecución se rompe.",
    promptKicker: "No prompt required",
    promptTitle: "No necesitas aprender a hacer mejores prompts.",
    promptBody: "KAIRON decide qué preguntar, cuándo profundizar, cuándo cuestionar y cuándo llevarte hacia la acción, según el flujo que estás usando. Escribes lo que te está frenando, en el idioma en que lo piensas.",
    promptLink: "Ver cómo funciona el Método I-R-O™ →",
    flows: [
      { name: "Filtro", body: "Estás bloqueado ahora. Se destraba en minutos." },
      { name: "Taller", body: "Cuando el problema necesita más que una respuesta rápida." },
      { name: "Scanner", body: "Descubre qué patrón aparece cuando tu ejecución se rompe." },
      { name: "Ruta", body: "Deja de reaccionar al patrón. Aprende a reconocerlo antes." },
    ],
    b2bKicker: "Para compradores corporativos",
    b2bTitle: "¿Por qué no darle ChatGPT al equipo?",
    b2bSub: "Porque el problema no es el acceso a inteligencia artificial. El problema es convertir esa capacidad en un proceso consistente, delimitado y repetible para trabajar fricción de ejecución.",
    b2bGenLabel: "Licencia de IA generalista",
    b2bGenPoints: ["Conversación abierta", "Resultado dependiente del prompt", "Propósito amplio", "Sin flujo organizacional específico", "Sin lectura agregada de patrones"],
    b2bKaiLabel: "KAIRON Corporate Pilot",
    b2bKaiPoints: ["Scanner y protocolos estructurados", "Método I-R-O™ como experiencia consistente", "Intervención orientada a acción", "Privacidad individual por diseño", "Cohortes, adopción y reporting agregado"],
    b2bQuote: "La empresa no está comprando acceso a un modelo de IA. Está implementando un sistema específico para ejecución cognitiva.",
    b2bCta: "Explorar un Corporate Pilot",
    finalTitle: "Insight sin acción sigue siendo estancamiento.",
    finalSub: "Escribe lo que te está frenando y deja que Kai lo desarme. La sesión no termina en “ahora lo entiendo mejor”, termina en qué vas a hacer ahora.",
    finalCta: "Probar KAIRON", finalCta2: "Probar El Espejo sin cuenta",
    clinicalDisclaimer: "KAIRON es una herramienta de coaching y desarrollo personal y profesional. No diagnostica ni trata condiciones de salud mental y no sustituye la atención clínica profesional.",
    legalNote: "ChatGPT y Claude son marcas de sus respectivos titulares; esta página compara diseño de producto, no capacidad de modelo.",
  },
  en: {
    heroKicker: "The comparison that matters",
    heroL1: "Your AI can give you an answer.",
    heroL2: "KAIRON is built to challenge what's blocking you.",
    heroSub: "The difference isn't the intelligence of the model. It's the design of the process: what it asks, when it questions you, and where the session ends.",
    heroCta: "Try KAIRON", heroCta2: "See the comparison",
    heroNote: "ChatGPT and Claude are extremely capable tools. We're not competing on their intelligence: we're building something far more specific for the moment execution breaks down.",
    splitKicker: "Validation vs. challenge",
    splitTitle: "The same sentence, two different processes",
    splitSub: "A user writes “I don't think I'm ready.” What happens next depends on what the tool was built for.",
    openLabel: "Open conversation", openBadge: "Illustrative example",
    openUser: "I don't think I'm ready to send the proposal.",
    openReply: "It's understandable to feel that way before an important deliverable. Want to review the proposal together, or build a checklist so you feel more confident?",
    openFoot: "The conversation continues inside the frame the user set. It can land somewhere good, and it depends on the user knowing where to take it.",
    flowLabel: "KAIRON's structured flow", flowBadge: "Filter · I-R-O™",
    flowUser: "I don't think I'm ready to send the proposal.",
    flowReply1: "What evidence do you have that “not being ready” means you shouldn't act? What's missing from the proposal that an outside reader would notice?",
    flowReply2: "Then the proposal is ready, and what isn't ready is your certainty. Send it today before 6pm with the version you already have.",
    flowStep1: "Thought", flowStep2: "Challenge", flowStep3: "Reframe", flowStep4: "Action",
    dialogueDisclaimer: "These dialogues are illustrative and don't represent the real output of any specific model. General AI is optimized for open conversation and for following the user's instruction; KAIRON is built with flows designed to detect, question, and restructure interpretations tied to execution blocks.",
    compareKicker: "Product design, not intelligence",
    compareTitle: "General AI talks. KAIRON intervenes on a specific process.",
    genTitle: "General generative AI",
    genRows: [
      { title: "Starts with a blank page", body: "The user has to know what to ask." },
      { title: "Responds to the context it's given", body: "Works inside the frame the user brings." },
      { title: "The conversation can go anywhere", body: "Broad purpose, no bounded flow." },
      { title: "The user designs the process", body: "Quality depends on the prompt and technique they know." },
      { title: "Can produce ideas, recommendations, or reflection", body: "Ending in action is a possible outcome, not the design's goal." },
    ],
    kaiTitle: "KAIRON",
    kaiRows: [
      { title: "Starts with structured context", body: "Scanner, patterns, and execution memory." },
      { title: "Built to question the frame", body: "Not just continue the user's narrative." },
      { title: "Uses cognitive-behavioral coaching protocols", body: "Evidence, assumptions, distortions, consequences, alternatives." },
      { title: "KAIRON guides the process", body: "The user doesn't need to design prompts or know techniques." },
      { title: "The session ends in action", body: "One concrete, five-minute, validated next action." },
    ],
    compareQuote: "We're not trying to build a more general AI. We're building an AI that's far more specific to the moment execution breaks down.",
    promptKicker: "No prompt required",
    promptTitle: "You don't need to learn to write better prompts.",
    promptBody: "KAIRON decides what to ask, when to dig deeper, when to challenge you, and when to push you toward action, depending on the flow you're using. You write what's holding you back, in the language you think in.",
    promptLink: "See how the I-R-O™ Method works →",
    flows: [
      { name: "Filter", body: "You're blocked right now. It unsticks in minutes." },
      { name: "Workshop", body: "When the problem needs more than a quick answer." },
      { name: "Scanner", body: "Discover which pattern shows up when your execution breaks." },
      { name: "Path", body: "Stop reacting to the pattern. Learn to recognize it before it starts." },
    ],
    b2bKicker: "For corporate buyers",
    b2bTitle: "Why not just give the team ChatGPT?",
    b2bSub: "Because the problem isn't access to artificial intelligence. The problem is turning that capability into a consistent, bounded, repeatable process for working execution friction.",
    b2bGenLabel: "General AI license",
    b2bGenPoints: ["Open conversation", "Prompt-dependent outcome", "Broad purpose", "No organization-specific flow", "No aggregated pattern reading"],
    b2bKaiLabel: "KAIRON Corporate Pilot",
    b2bKaiPoints: ["Scanner and structured protocols", "I-R-O™ Method as a consistent experience", "Action-oriented intervention", "Individual privacy by design", "Cohorts, adoption, and aggregated reporting"],
    b2bQuote: "The company isn't buying access to an AI model. It's implementing a specific system for cognitive execution.",
    b2bCta: "Explore a Corporate Pilot",
    finalTitle: "Insight without action is still a stall.",
    finalSub: "Write what's holding you back and let Kai take it apart. The session doesn't end in “now I understand it better” — it ends in what you're going to do now.",
    finalCta: "Try KAIRON", finalCta2: "Try The Mirror, no account",
    clinicalDisclaimer: "KAIRON is a coaching and personal and professional development tool. It does not diagnose or treat mental health conditions and is not a substitute for professional clinical care.",
    legalNote: "ChatGPT and Claude are trademarks of their respective owners; this page compares product design, not model capability.",
  },
};

function trackCta(locale: Locale, location: string) {
  trackAcquisitionEvent("section_cta_clicked", { cta_location: location, language: locale });
  trackOutboundAppOpened({ cta_location: location, language: locale });
}

export function KaironVsGenerativeAIPage({ locale = "es" }: { locale?: Locale }) {
  const c = VS_AI_COPY[locale];
  const navHref = kaironAppUrl(locale, "vsai_nav", getLaunchPhase());
  const heroHref = kaironAppUrl(locale, "vsai_hero", getLaunchPhase());
  const finalHref = kaironAppUrl(locale, "vsai_final", getLaunchPhase());
  const homeHref = locale === "en" ? "/en" : "/";
  const teamsHref = "/teams";
  const methodHref = locale === "en" ? "/en/iro-method" : "/metodo-iro";

  return (
    <div style={{ background: KAIRON_THEME.bg, color: KAIRON_THEME.text, overflowX: "hidden" }}>
      <KaironDocHeader locale={locale} current="vs-ia-generativa" ctaHref={navHref} onCtaClick={() => trackCta(locale, "vsai_nav")} />

      <section style={{ position: "relative", padding: "clamp(56px,9vw,120px) clamp(20px,5vw,40px) clamp(48px,7vw,90px)" }}>
        <div aria-hidden style={{ position: "absolute", top: "-8%", left: "50%", transform: "translateX(-50%)", width: "min(1100px,120vw)", height: 560, background: "radial-gradient(closest-side, rgba(240,160,70,0.13), transparent 78%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 9, border: "1px solid rgba(245,243,240,0.14)", borderRadius: 999, padding: "7px 15px", fontSize: "11.5px", letterSpacing: "0.17em", textTransform: "uppercase", color: "rgba(245,243,240,0.62)" }}>
            <span aria-hidden style={{ width: 5, height: 5, borderRadius: "50%", background: ORANGE }} />
            {c.heroKicker}
          </div>
          <h1 className="font-display" style={{ fontWeight: 700, fontSize: "clamp(36px,6.6vw,82px)", lineHeight: 1, letterSpacing: "-0.035em", margin: "clamp(20px,3vw,32px) 0 0" }}>
            {c.heroL1}<br /><span style={{ color: ORANGE }}>{c.heroL2}</span>
          </h1>
          <p style={{ fontSize: "clamp(16.5px,1.9vw,21px)", lineHeight: 1.55, color: "rgba(245,243,240,0.66)", margin: "clamp(20px,3vw,30px) auto 0", maxWidth: "38em" }}>{c.heroSub}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 13, justifyContent: "center", marginTop: "clamp(28px,4vw,40px)" }}>
            <a
              href={heroHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCta(locale, "vsai_hero")}
              className="vsai-cta-pill"
              style={{ background: ORANGE, color: "#1A1000", fontWeight: 600, fontSize: 16, padding: "17px 30px", borderRadius: 999 }}
            >
              {c.heroCta}
            </a>
            <a href="#comparacion" className="vsai-outline-pill" style={{ border: "1px solid rgba(245,243,240,0.22)", color: "#F5F3F0", fontWeight: 500, fontSize: 16, padding: "17px 30px", borderRadius: 999 }}>
              {c.heroCta2}
            </a>
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: "rgba(245,243,240,0.42)", margin: "26px auto 0", maxWidth: "44em" }}>{c.heroNote}</p>
        </div>
      </section>

      <section style={{ padding: "clamp(50px,7vw,100px) clamp(20px,5vw,40px)", borderTop: `1px solid ${KAIRON_THEME.border}` }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ maxWidth: 740 }}>
            <div style={{ fontSize: "11.5px", letterSpacing: "0.19em", textTransform: "uppercase", color: ORANGE }}>{c.splitKicker}</div>
            <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(28px,4.4vw,50px)", lineHeight: 1.06, letterSpacing: "-0.025em", margin: "15px 0 0" }}>{c.splitTitle}</h2>
            <p style={{ fontSize: "16.5px", lineHeight: 1.6, color: "rgba(245,243,240,0.6)", margin: "16px 0 0" }}>{c.splitSub}</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 18, marginTop: "clamp(30px,4vw,46px)", alignItems: "start" }}>
            <div style={{ border: `1px solid ${KAIRON_THEME.borderStrong}`, borderRadius: 18, background: KAIRON_THEME.surface, padding: "clamp(22px,3vw,30px)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <div className="font-display" style={{ fontSize: 15, fontWeight: 600, color: "rgba(245,243,240,0.78)" }}>{c.openLabel}</div>
                <span style={{ fontSize: 10, letterSpacing: "0.13em", textTransform: "uppercase", color: "rgba(245,243,240,0.42)", border: "1px solid rgba(245,243,240,0.14)", borderRadius: 999, padding: "4px 9px" }}>{c.openBadge}</span>
              </div>
              <div style={{ display: "grid", gap: 12, marginTop: 22 }}>
                <div style={{ justifySelf: "end", maxWidth: "88%", background: "rgba(245,243,240,0.07)", borderRadius: "14px 14px 4px 14px", padding: "13px 15px", fontSize: 15, lineHeight: 1.5 }}>{c.openUser}</div>
                <div style={{ justifySelf: "start", maxWidth: "92%", background: "rgba(245,243,240,0.03)", border: `1px solid ${KAIRON_THEME.border}`, borderRadius: "14px 14px 14px 4px", padding: "13px 15px", fontSize: 15, lineHeight: 1.5, color: "rgba(245,243,240,0.72)" }}>{c.openReply}</div>
              </div>
              <div style={{ marginTop: 22, paddingTop: 18, borderTop: `1px solid ${KAIRON_THEME.border}`, fontSize: "13.5px", lineHeight: 1.6, color: "rgba(245,243,240,0.5)" }}>{c.openFoot}</div>
            </div>

            <div style={{ border: "1px solid rgba(240,160,70,0.34)", borderRadius: 18, background: "linear-gradient(180deg,#16130F,#101011)", padding: "clamp(22px,3vw,30px)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <div className="font-display" style={{ fontSize: 15, fontWeight: 600 }}>{c.flowLabel}</div>
                <span style={{ fontSize: 10, letterSpacing: "0.13em", textTransform: "uppercase", color: ORANGE, border: "1px solid rgba(240,160,70,0.38)", borderRadius: 999, padding: "4px 9px" }}>{c.flowBadge}</span>
              </div>
              <div style={{ display: "grid", gap: 12, marginTop: 22 }}>
                <div style={{ justifySelf: "end", maxWidth: "88%", background: "rgba(245,243,240,0.07)", borderRadius: "14px 14px 4px 14px", padding: "13px 15px", fontSize: 15, lineHeight: 1.5 }}>{c.flowUser}</div>
                <div style={{ justifySelf: "start", maxWidth: "92%", background: "rgba(240,160,70,0.09)", border: "1px solid rgba(240,160,70,0.24)", borderRadius: "14px 14px 14px 4px", padding: "13px 15px", fontSize: 15, lineHeight: 1.5, color: "#F5F3F0" }}>{c.flowReply1}</div>
                <div style={{ justifySelf: "start", maxWidth: "92%", background: "rgba(240,160,70,0.09)", border: "1px solid rgba(240,160,70,0.24)", borderRadius: "14px 14px 14px 4px", padding: "13px 15px", fontSize: 15, lineHeight: 1.5, color: "#F5F3F0" }}>{c.flowReply2}</div>
              </div>
              <div style={{ marginTop: 22, paddingTop: 18, borderTop: "1px solid rgba(240,160,70,0.22)", display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                <span style={{ color: "rgba(245,243,240,0.5)" }}>{c.flowStep1}</span><span style={{ color: "rgba(240,160,70,0.6)" }}>→</span>
                <span style={{ color: "rgba(245,243,240,0.5)" }}>{c.flowStep2}</span><span style={{ color: "rgba(240,160,70,0.6)" }}>→</span>
                <span style={{ color: "rgba(245,243,240,0.5)" }}>{c.flowStep3}</span><span style={{ color: "rgba(240,160,70,0.6)" }}>→</span>
                <span style={{ color: ORANGE, fontWeight: 600 }}>{c.flowStep4}</span>
              </div>
            </div>
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.6, color: "rgba(245,243,240,0.38)", margin: "18px 0 0", maxWidth: "60em" }}>{c.dialogueDisclaimer}</p>
        </div>
      </section>

      <section id="comparacion" style={{ padding: "clamp(50px,7vw,100px) clamp(20px,5vw,40px)", background: KAIRON_THEME.surface, borderTop: `1px solid ${KAIRON_THEME.border}`, borderBottom: `1px solid ${KAIRON_THEME.border}` }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ maxWidth: 740 }}>
            <div style={{ fontSize: "11.5px", letterSpacing: "0.19em", textTransform: "uppercase", color: ORANGE }}>{c.compareKicker}</div>
            <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(28px,4.4vw,50px)", lineHeight: 1.06, letterSpacing: "-0.025em", margin: "15px 0 0" }}>{c.compareTitle}</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 18, marginTop: "clamp(30px,4vw,46px)", alignItems: "start" }}>
            <div style={{ border: `1px solid ${KAIRON_THEME.borderStrong}`, borderRadius: 18, padding: "clamp(22px,3vw,32px)", background: KAIRON_THEME.bgAlt }}>
              <div className="font-display" style={{ fontSize: 19, fontWeight: 600, color: "rgba(245,243,240,0.8)" }}>{c.genTitle}</div>
              <div style={{ display: "grid", gap: 16, marginTop: 22 }}>
                {c.genRows.map((r) => (
                  <div key={r.title}>
                    <div style={{ fontSize: "15.5px", fontWeight: 600, color: "rgba(245,243,240,0.82)" }}>{r.title}</div>
                    <div style={{ fontSize: "14.5px", lineHeight: 1.55, color: "rgba(245,243,240,0.55)", marginTop: 5 }}>{r.body}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ border: "1px solid rgba(240,160,70,0.34)", borderRadius: 18, padding: "clamp(22px,3vw,32px)", background: "rgba(240,160,70,0.06)" }}>
              <div className="font-display" style={{ fontSize: 19, fontWeight: 600 }}>{c.kaiTitle}</div>
              <div style={{ display: "grid", gap: 16, marginTop: 22 }}>
                {c.kaiRows.map((r) => (
                  <div key={r.title}>
                    <div style={{ fontSize: "15.5px", fontWeight: 600 }}>{r.title}</div>
                    <div style={{ fontSize: "14.5px", lineHeight: 1.55, color: "rgba(245,243,240,0.62)", marginTop: 5 }}>{r.body}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginTop: "clamp(28px,4vw,44px)", borderLeft: `2px solid ${ORANGE}`, padding: "6px 0 6px 22px", maxWidth: "34em" }}>
            <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "clamp(20px,2.6vw,30px)", lineHeight: 1.4, margin: 0 }}>{c.compareQuote}</p>
          </div>
        </div>
      </section>

      <section style={{ padding: "clamp(50px,7vw,100px) clamp(20px,5vw,40px)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(28px,5vw,64px)", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: "11.5px", letterSpacing: "0.19em", textTransform: "uppercase", color: ORANGE }}>{c.promptKicker}</div>
            <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(26px,4vw,46px)", lineHeight: 1.08, letterSpacing: "-0.025em", margin: "15px 0 0" }}>{c.promptTitle}</h2>
            <p style={{ fontSize: "16.5px", lineHeight: 1.6, color: "rgba(245,243,240,0.62)", margin: "18px 0 0", maxWidth: "32em" }}>{c.promptBody}</p>
            <a href={methodHref} style={{ display: "inline-block", marginTop: 26, fontSize: "15.5px" }}>{c.promptLink}</a>
          </div>
          <div style={{ display: "grid", gap: 12 }}>
            {c.flows.map((f) => (
              <div key={f.name} style={{ border: `1px solid ${KAIRON_THEME.border}`, borderRadius: 14, padding: "18px 20px", background: KAIRON_THEME.surface, display: "flex", gap: 14, alignItems: "baseline" }}>
                <span className="font-display" style={{ fontSize: 13, color: ORANGE, flex: "none" }}>{f.name}</span>
                <span style={{ fontSize: 15, lineHeight: 1.5, color: "rgba(245,243,240,0.72)" }}>{f.body}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "clamp(50px,7vw,100px) clamp(20px,5vw,40px)", borderTop: `1px solid ${KAIRON_THEME.border}` }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ maxWidth: 740 }}>
            <div style={{ fontSize: "11.5px", letterSpacing: "0.19em", textTransform: "uppercase", color: ORANGE }}>{c.b2bKicker}</div>
            <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(28px,4.4vw,50px)", lineHeight: 1.06, letterSpacing: "-0.025em", margin: "15px 0 0" }}>{c.b2bTitle}</h2>
            <p style={{ fontSize: "16.5px", lineHeight: 1.6, color: "rgba(245,243,240,0.62)", margin: "16px 0 0" }}>{c.b2bSub}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 18, marginTop: "clamp(28px,4vw,44px)" }}>
            <div style={{ border: `1px solid ${KAIRON_THEME.borderStrong}`, borderRadius: 16, padding: 26, background: KAIRON_THEME.surface }}>
              <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(245,243,240,0.45)" }}>{c.b2bGenLabel}</div>
              <div style={{ display: "grid", gap: 9, marginTop: 16, fontSize: 15, lineHeight: 1.5, color: "rgba(245,243,240,0.62)" }}>
                {c.b2bGenPoints.map((p) => <div key={p}>{p}</div>)}
              </div>
            </div>
            <div style={{ border: "1px solid rgba(240,160,70,0.34)", borderRadius: 16, padding: 26, background: "rgba(240,160,70,0.06)" }}>
              <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: ORANGE }}>{c.b2bKaiLabel}</div>
              <div style={{ display: "grid", gap: 9, marginTop: 16, fontSize: 15, lineHeight: 1.5, color: "rgba(245,243,240,0.78)" }}>
                {c.b2bKaiPoints.map((p) => <div key={p}>{p}</div>)}
              </div>
            </div>
          </div>
          <div style={{ marginTop: "clamp(26px,4vw,40px)", border: "1px solid rgba(240,160,70,0.28)", borderRadius: 18, background: "rgba(240,160,70,0.06)", padding: "clamp(24px,3.5vw,38px)" }}>
            <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "clamp(20px,2.8vw,32px)", lineHeight: 1.35, margin: 0, maxWidth: "30em" }}>{c.b2bQuote}</p>
            <a
              href={teamsHref}
              className="vsai-cta-pill"
              style={{ display: "inline-block", marginTop: 24, background: ORANGE, color: "#1A1000", fontWeight: 600, fontSize: "15.5px", padding: "15px 26px", borderRadius: 999 }}
            >
              {c.b2bCta}
            </a>
          </div>
        </div>
      </section>

      <section style={{ padding: "clamp(60px,9vw,130px) clamp(20px,5vw,40px)", textAlign: "center", position: "relative", borderTop: `1px solid ${KAIRON_THEME.border}` }}>
        <div aria-hidden style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "min(900px,110vw)", height: 380, background: "radial-gradient(closest-side, rgba(240,160,70,0.11), transparent 78%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 820, margin: "0 auto" }}>
          <h2 className="font-display" style={{ fontWeight: 700, fontSize: "clamp(30px,5.4vw,64px)", lineHeight: 1.02, letterSpacing: "-0.035em", margin: 0 }}>{c.finalTitle}</h2>
          <p style={{ fontSize: "clamp(16px,1.9vw,20px)", lineHeight: 1.6, color: "rgba(245,243,240,0.62)", margin: "20px auto 0", maxWidth: "32em" }}>{c.finalSub}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 13, justifyContent: "center", marginTop: 30 }}>
            <a
              href={finalHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCta(locale, "vsai_final")}
              className="vsai-cta-pill"
              style={{ background: ORANGE, color: "#1A1000", fontWeight: 600, fontSize: 17, padding: "18px 34px", borderRadius: 999 }}
            >
              {c.finalCta}
            </a>
            <a href={`${homeHref}#espejo`} className="vsai-outline-pill" style={{ border: "1px solid rgba(245,243,240,0.22)", color: "#F5F3F0", fontWeight: 500, fontSize: 17, padding: "18px 34px", borderRadius: 999 }}>
              {c.finalCta2}
            </a>
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.6, color: "rgba(245,243,240,0.38)", margin: "30px auto 0", maxWidth: "44em" }}>{c.clinicalDisclaimer}</p>
        </div>
      </section>

      <KaironDocFooter locale={locale} legalNote={c.legalNote} />

      <style>{`
        .vsai-cta-pill:hover { background: ${KAIRON_THEME.accentHover}; }
        .vsai-outline-pill:hover { border-color: #F5F3F0; }
        .vsai-cta-pill:focus-visible, .vsai-outline-pill:focus-visible {
          outline: 2px solid ${ORANGE}; outline-offset: 3px; border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
