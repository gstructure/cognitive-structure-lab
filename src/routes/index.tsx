import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Handshake, Users, Calendar, MapPin, ExternalLink, Sparkles } from "lucide-react";
import { Section } from "@/components/site/Section";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Eyebrow } from "@/components/site/Eyebrow";
import { Reveal } from "@/components/site/Reveal";
import { MethodTabs } from "@/components/site/MethodTabs";
import { FAQ } from "@/components/site/FAQ";
import { FrictionQuiz } from "@/components/site/FrictionQuiz";
import { WaitlistForm, WaitlistInline } from "@/components/site/WaitlistForm";
import { ArticleCard } from "@/components/articles/ArticleCard";

import { CTALink, CTAExternal } from "@/components/site/CTAButton";
import { BrandMark } from "@/components/brand/Logo";
import { GuillermoPortrait } from "@/components/site/GuillermoPortrait";
import { useT, useLocale, type Locale } from "@/lib/i18n";
import { ROUTES } from "@/lib/routeMap";
import { featuredArticlesForLocale } from "@/lib/articles";
import { trackAcquisitionEvent, trackOutboundAppOpened } from "@/lib/analytics";
import { getLaunchPhase, kaironAppUrl, launchCopy, KAIRON_PRICING } from "@/lib/launchConfig";
import logoCube from "@/assets/g-structure-cube.webp";
import gFrameLogo from "@/assets/kairon-logo.webp";
import kaiMascot from "@/assets/kai-mascot.webp";
import kaiMini from "@/assets/kai-hero-transparent.png";
import kaironHomeScreen from "@/assets/kairon-home-screen.webp";
import kaironDailyActivator from "@/assets/kairon-daily-activator.webp";
import kaironNocturnoChat from "@/assets/kairon-nocturno-chat.webp";
import kaironFilterConversation from "@/assets/kairon-filter-conversation.webp";


import etwBadge from "@/assets/etw-2026-badge.webp";
import codeLaunchAnnouncement from "@/assets/codelaunch-latam-2026.svg";
import tractionStagePresenting from "@/assets/traction-stage-presenting.webp";
import tractionRoomWide from "@/assets/traction-room-wide.webp";
import tractionAudienceClose from "@/assets/traction-audience-close.webp";
import tractionUserTesting from "@/assets/traction-user-testing.webp";
import tractionStageEnergy from "@/assets/traction-stage-energy.webp";
import { buildSeo, canonicalLink, jsonLdScript, faqSchema, breadcrumbSchema } from "@/lib/seo";

const ETW_URL = "https://luma.com/lm4njhiu";

// Helper: resolve a Spanish canonical path to current-locale path.
function lp(esPath: string, locale: Locale): string {
  const entry = ROUTES.find((r) => r.es === esPath);
  if (!entry) return esPath;
  return entry[locale];
}

function appUrl(locale: Locale, content: string): string {
  return kaironAppUrl(locale, content, getLaunchPhase());
}

function trackAppCta(locale: Locale, ctaLocation: string) {
  trackAcquisitionEvent("section_cta_clicked", {
    cta_location: ctaLocation,
    language: locale,
    phase: getLaunchPhase(),
  });
  trackOutboundAppOpened({
    cta_location: ctaLocation,
    language: locale,
    phase: getLaunchPhase(),
  });
}

const HOME_FAQ = [
  { q: "¿Qué es G-Structure?", a: "Una tech startup construyendo KAIRON: una herramienta de coaching cognitivo con IA para ayudar a profesionales a procesar la fricción mental que bloquea su ejecución." },
  { q: "¿Cómo ayuda KAIRON a ejecutar?", a: "Kai guía al usuario para separar situación, emoción e interpretación, y convertir esa lectura en una siguiente acción concreta." },
  { q: "¿Qué es el método I-R-O™?", a: "Identificar, Reencuadrar y Optimizar: el framework propietario que impulsa KAIRON y convierte fricción cognitivo-conductual en acción funcional." },
  { q: "¿Qué es KAIRON?", a: "El producto principal de G-Structure: un MVP activo guiado por Kai para separar situación, emoción e interpretación, llegar a una lectura más precisa y convertirla en una acción concreta en menos de 12 minutos." },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: buildSeo({
      path: "/",
      title: "G-Structure | KAIRON · AI cognitive coaching for execution",
      description:
        "G-Structure es una tech startup construyendo KAIRON, una herramienta de coaching cognitivo con IA guiada por Kai para procesar pensamientos, emociones e interpretaciones que bloquean la ejecución en tiempo real.",
      image: gFrameLogo,
    }),
    links: canonicalLink("/"),
    scripts: [
      jsonLdScript(faqSchema(HOME_FAQ)),
      jsonLdScript(breadcrumbSchema([{ name: "Inicio", path: "/" }])),
    ],
  }),
  component: Index,
});

// =============================================================================
// COPY DICTIONARY — all Home text, keyed by locale
// =============================================================================
const COPY = {
  es: {
    hero: {
      linkQuiz: "Identifica tu patrón de ejecución",
      linkWaitlist: "Probar KAIRON",
      linkEnterprise: "Canal de validación · Enterprise",
      linkInvestors: "Oportunidad de inversión · Pre-seed",
    },
    etw: {
      pill: "ANUNCIO OFICIAL · ETW 2026",
      h2: "G-Structure es Host de Ecuador Tech Week 2026.",
      body: (
        <>
          Presentamos el <strong className="text-white">Workshop de Diagnóstico de Ejecución</strong> dentro
          de Ecuador Tech Week® powered by Startup Grind. Una experiencia curada para identificar
          patrones que bloquean la acción en profesionales, founders y equipos.
        </>
      ),
      date: "11–19 Julio, 2026",
      city: "Guayaquil, Ecuador",
      poweredBy: "Powered by Startup Grind",
      ctaEvent: "Ver evento oficial",
      ctaPartner: "Solicitar workshop",
      micro: "#SoyHost · Compartimos el propósito de hacer del Ecuador un referente tecnológico regional.",
      badgeAlt: "Badge oficial Host Ecuador Tech Week 2026 — G-Structure",
    },
    announcements: {
      eyebrow: "MOMENTUM",
      title: "Construyendo la siguiente etapa de G-Structure.",
      subtitle: "Estamos abriendo espacios estratégicos para empresas y colaboradores que quieran ser parte del crecimiento inicial del ecosistema G-Structure.",
      allies: {
        tag: "WORKSHOP B2B",
        title: "Workshop de Diagnóstico de Ejecución",
        body: "G-Structure lleva el Workshop de Diagnóstico a empresas y equipos que necesitan entender qué está bloqueando su ejecución.",
        short: "Una puerta B2B para diagnosticar fricción real, aprender con equipos y fortalecer KAIRON desde problemas vivos de ejecución.",
        cta: "Solicitar workshop",
        micro: "Sesiones para empresas, equipos y organizaciones que necesitan claridad antes de intervenir.",
      },
      team: {
        tag: "EQUIPO INICIAL",
        title: "Estamos formando el equipo que construirá G-Structure y KAIRON",
        body: "Buscamos colaboradores voluntarios en áreas clave para fortalecer la siguiente etapa del proyecto: producto, tecnología, ventas, marketing y negocios internacionales.",
        short: "No buscamos espectadores. Buscamos personas con criterio, iniciativa y ganas de construir desde una etapa temprana.",
        cta: "Quiero unirme al equipo",
        micro: "Participación inicial voluntaria, con enfoque en construcción real, portafolio, aprendizaje aplicado y posible continuidad conforme el proyecto avance.",
      },
    },
    problem: {
      eyebrow: "EL PROBLEMA",
      title: "No siempre falta capacidad. A veces sobra fricción.",
      subtitle: "Muchos profesionales y equipos saben lo que tienen que hacer. Tienen objetivos, recursos, información y experiencia. Pero entre la intención y la acción aparece una zona de interferencia: pensamientos rígidos, lectura distorsionada del riesgo, perfeccionismo improductivo, evitación o decisiones que se postergan demasiado.",
      lead: "G-Structure trabaja precisamente en esa zona: donde la cognición, la emoción y la conducta empiezan a bloquear la ejecución.",
      diagnose: "Haz el diagnóstico",
      cards: [
        { t: "Procrastinación", d: "Cuando la acción se posterga aunque la tarea sea importante.", reveal: "¿Lo pospones aunque sabes que es importante? KAIRON trabaja este patrón." },
        { t: "Perfeccionismo improductivo", d: "Cuando el estándar se vuelve una excusa elegante para no avanzar.", reveal: "¿El estándar se volvió una excusa elegante? Hay un patrón detrás de eso." },
        { t: "Sobreanálisis", d: "Cuando pensar más deja de aclarar y empieza a paralizar.", reveal: "¿Pensar más dejó de ayudar? Eso tiene una estructura cognitiva específica." },
        { t: "Autosabotaje", d: "Cuando la conducta contradice el objetivo que la persona dice querer.", reveal: "¿Tu conducta contradice tu objetivo? El Motor de Reestructuración mapea por qué." },
        { t: "Bloqueo de ejecución", d: "Cuando hay intención, pero no hay salida funcional a la acción.", reveal: "¿Hay intención pero no hay salida? KAIRON convierte eso en acción." },
      ],
    },
    method: {
      eyebrow: "EL MÉTODO PROPIETARIO",
      title: "I-R-O™: Identificar. Reencuadrar. Optimizar.",
      lead: "El framework propietario que impulsa KAIRON: una secuencia defendible para pasar de fricción mental a una acción concreta sin exponer la mecánica interna del producto.",
      footnote: "I-R-O™ Method es un framework propietario desarrollado por G-Structure para ejecución profesional, guiado por Kai dentro de KAIRON.",
    },
    faq: {
      eyebrow: "PREGUNTAS FRECUENTES",
      title: "Antes de agendar, esto suele aparecer.",
      subtitle: "Respuestas breves a las preguntas más comunes sobre el método, los procesos y la app.",
      cta: "Tengo otra pregunta",
    },
    mentalOS: {
      eyebrow: "NUESTRA LECTURA",
      title: "Tratamos la mente como un sistema operativo.",
      p1: "En contextos de alta exigencia, el problema no siempre está en la meta. Muchas veces está en el procesamiento: cómo se interpreta la presión, cómo se anticipa el error, cómo se evalúa el riesgo y cómo se convierte una decisión en conducta.",
      p2: "Cuando ese sistema entra en fricción, la acción se distorsiona. G-Structure interviene sobre esos patrones para que la persona o el equipo pueda pensar con más claridad, decidir con más precisión y actuar con mayor consistencia.",
      quote: "El orden mental no es un lujo. Es la base de una acción clara, funcional y sostenible.",
    },
    gstruct: {
      tag: "EL PRODUCTO · KAIRON",
      pill: "MVP ACTIVO · AUG 2026",
      h2: "KAIRON es el producto principal de G-Structure.",
      lead: (
        <>
          Una app diseñada para convertir el método <strong className="text-foreground">I-R-O™: Identificar ? Reencuadrar ? Optimizar</strong> en
          una herramienta diaria de ejecución para profesionales, founders y equipos.
        </>
      ),
      disclaimer: "KAIRON es una herramienta de coaching cognitivo con IA para procesar fricción mental, separar situación, emoción e interpretación, y cerrar cada sesión con una acción concreta.",
      p1: "KAIRON lleva el método I-R-O™ a tu bolsillo. Una app móvil diseñada para identificar la fricción que bloquea tu ejecución, reencuadrarla con metodología CBT coaching, y optimizar tu acción — disponible 24/7.",
      p2: "Funciona como una capa de ejecución cognitiva: Kai ordena la fricción del momento, guía una lectura más precisa y te ayuda a salir con movimiento.",
      previewAlt: "Vista del MVP activo de KAIRON.",
      features: [
        { t: "Motor de Reestructuración", d: "Identifica la situación, nombra la emoción, mide su intensidad, llega a la creencia núcleo. Si puedes medirlo, puedes optimizarlo." },
        { t: "Laboratorio de Pensamientos con IA", d: "Con asistencia de inteligencia artificial, aprende a reencuadrar el pensamiento automático en uno funcional que habilite la acción." },
        { t: "Diagnóstico de Ejecución", d: "Identifica tus patrones recurrentes — procrastinación, perfeccionismo, autosabotaje — y trabaja directamente sobre ellos." },
      ],
      plansLabel: "PLANES",
      plans: {
        freeTag: "FREE",
        freePrice: "Gratis",
        freeItems: ["· 3 registros en el Motor de Reestructuración", "· 5 Activadores Matutinos por mes", "· Fase 1 de la Guía CBT", "· Recursos base"],
        plusTag: "PLUS",
        plusBadge: "DESTACADO",
        plusPrice: "$20 / mes",
        plusItems: ["· Motor de Reestructuración ilimitado", "· Activadores Matutinos ilimitados", "· Guía CBT completa", "· Laboratorio de Pensamientos con IA", "· Plataforma de Diagnóstico de Ejecución"],
        vipTag: "VIP",
        vipPrice: "$50 / mes",
        vipItems: ["· Sesión mensual con coach humano", "· Auditoría mensual de patrones", "· Foro privado de comunidad", "· Masterclasses premium"],
      },
      ctaWaitlist: "Únete a la lista de espera",
      ctaSub: "Sé parte del primer grupo que accede a KAIRON en Ecuador.",
    },
    founder: {
      eyebrow: "QUIÉN ESTÁ DETRÁS",
      title: "Dirección metodológica con experiencia educativa, cognitivo-conductual y de proyectos.",
      body: (
        <>
          <strong className="text-foreground font-semibold">Guillermo Suco</strong> es fundador
          y CEO de G-Structure, creador de KAIRON y del método I-R-O™. Su trabajo integra
          Psicología, intervención educativa, validación con usuarios, gerencia de proyectos
          multiculturales y desarrollo de producto digital.
        </>
      ),
      credentials: [
        "CBT Coach Practitioner · CTAA",
        "Psicología & Intervención Educativa",
        "Docencia internacional",
        "MV Logos Hope · gerencia de proyectos",
        "KAIRON con ÉPICO",
      ],
      ctaTalk: "Conversar con Guillermo",
      ctaProfile: "Ver perfil",
    },
    channels: {
      eyebrow: "CÓMO ESTAMOS VALIDANDO KAIRON",
      title: "No son negocios separados. Son capas de una misma estrategia.",
      subtitle: "G-Structure usa el Workshop de Diagnóstico como puerta B2B para aprender con equipos reales, generar tracción temprana y fortalecer KAIRON como producto digital escalable.",
      items: [
        { tag: "01 · CANAL B2B", t: "Workshop de Diagnóstico de Ejecución", d: "Experiencia grupal para identificar fricción de ejecución en equipos y abrir conversaciones B2B que alimentan la adopción de KAIRON.", esTo: "/enterprise", cta: "Explorar workshop" },
        { tag: "02 · PRODUCTO ESCALABLE", t: "KAIRON App", d: "El producto digital que escala la metodología. Lo que aprendemos con usuarios y empresas alimenta directamente su construcción.", esTo: "/kairon", cta: "Explorar KAIRON" },
      ],
      footer: (
        <>
          Compañía: <strong className="text-foreground">G-Structure</strong> · Producto principal: <strong className="text-foreground">KAIRON</strong> ·
          Canales de validación: <strong className="text-foreground">KAIRON, Workshop B2B y usuarios reales</strong> · Crecimiento: inversores, empresas y equipo.
        </>
      ),
    },
    solutions: {
      eyebrow: "SOLUCIONES",
      title: "Intervenciones estructuradas para personas y equipos que necesitan ejecutar mejor.",
      subtitle: "G-Structure opera a través de diagnósticos, programas breves y procesos de continuidad diseñados para contextos profesionales de alta exigencia.",
      idealFor: "Ideal para",
    },
    forWhom: {
      eyebrow: "APLICACIÓN",
      title: "Diseñado para contextos donde pensar bien no basta: hay que ejecutar.",
      titleA: "G-Structure es para:",
      titleB: "Es especialmente útil cuando aparecen:",
      a: [
        "Profesionales con alta carga de decisión.",
        "Líderes que necesitan mayor claridad de acción.",
        "Founders que viven bajo presión constante.",
        "Equipos que postergan decisiones importantes.",
        "Organizaciones que quieren intervenir fricciones de ejecución sin caer en charlas motivacionales.",
      ],
      b: [
        "Procrastinación en tareas críticas.",
        "Reuniones que no se traducen en acción.",
        "Perfeccionismo que retrasa entregables.",
        "Sobreanálisis en decisiones estratégicas.",
        "Desgaste por falta de claridad operativa.",
        "Patrones repetidos de bloqueo, evitación o autosabotaje.",
      ],
      closing: "El objetivo no es hacer más por hacer más. Es pensar, decidir y actuar con mayor precisión.",
    },
    startup: {
      eyebrow: "UNA STARTUP EN ETAPA TEMPRANA",
      title: "MVP activo, con una tesis clara.",
      lead: (
        <>
          G-Structure se encuentra en etapa de validación con <strong className="text-foreground">KAIRON</strong> ya funcionando como MVP.
          El objetivo ahora es validar uso real, fortalecer el producto impulsado por el método I-R-O™
          y escalarlo para profesionales, founders y equipos que necesitan ejecutar mejor bajo presión.
        </>
      ),
      routes: [
        { tag: "USUARIOS", t: "Probar o conocer KAIRON", esTo: "/kairon" },
        { tag: "EMPRESAS", t: "Llevar Enterprise a tu equipo", esTo: "/enterprise" },
        { tag: "INVERSIONISTAS", t: "Revisar la oportunidad de inversión", esTo: "/inversores" },
        { tag: "TALENTO", t: "Unirse al equipo fundador", esTo: "/unete-al-equipo" },
      ],
    },
    finalCTA: {
      title: "G-Structure está construyendo KAIRON. Decide cómo quieres ser parte.",
      body: "Únete a la waitlist del producto, lleva la metodología a tu equipo, conoce la oportunidad de inversión, o conversa con nosotros directamente.",
      ctaExplore: "Explorar KAIRON",
      ctaWaitlist: "Unirme a la waitlist",
      ctaContact: "Contactar",
    },
    visualPanels: {
      systemLabel: "G-STRUCTURE · COGNITIVE OS",
      version: "v0.1 · LIVE",
      p3Label: "03 · OPTIMIZAR",
      p3Subtitle: "Plan de acción",
      p3Buttons: ["Decidir", "Ejecutar", "Sostener"],
      p3Continuity: "Continuidad",
      p2Label: "02 · REENCUADRAR",
      p2Subtitle: "Patrón cognitivo",
      p2Quote: (
        <>
          "Si no es perfecto, no lo entrego." ? <span className="font-semibold">Avanzar con criterio reduce el costo de no decidir.</span>
        </>
      ),
      p2Tags: ["PERFECCIONISMO", "EVITACIÓN"],
      p1Label: "01 · IDENTIFICAR",
      p1Subtitle: "Sesión activa",
      p1Quote: (
        <>
          Patrón detectado: <span className="font-semibold">postergación bajo presión de decisión estratégica.</span>
        </>
      ),
      p1Friction: "Fricción",
      p1FrictionVal: "Alta",
      p1Recurrence: "Recurrencia",
      p1RecurrenceVal: "7d",
      p1Output: "Salida",
      p1OutputVal: "Diseño",
      p1Next: "Reencuadrar",
      mark: "SISTEMA I-R-O",
    },
    solutionsItems: [
      { t: "Workshop de Diagnóstico", d: "Sesión estratégica para identificar fricciones de ejecución en profesionales, líderes o equipos.", ideal: "Empresas, founders o equipos que necesitan entender qué está bloqueando la acción antes de diseñar una intervención.", cta: "Explorar workshop", esTo: "/enterprise" },
      { t: "KAIRON", d: "MVP activo para diagnosticar fricción, reencuadrar en tiempo real y convertir insight en acción concreta.", ideal: "Profesionales y founders que quieren probar el producto directamente.", cta: "Probar KAIRON", esTo: "/kairon" },
    ],
  },
  en: {
    hero: {
      linkQuiz: "Identify your execution pattern",
      linkWaitlist: "Try KAIRON",
      linkEnterprise: "Validation channel · Enterprise",
      linkInvestors: "Investment opportunity · Pre-seed",
    },
    etw: {
      pill: "OFFICIAL ANNOUNCEMENT · ETW 2026",
      h2: "G-Structure is Host of Ecuador Tech Week 2026.",
      body: (
        <>
          We're presenting the <strong className="text-white">Execution Diagnostic Workshop</strong> inside
          Ecuador Tech Week® powered by Startup Grind. A curated experience to identify
          patterns that block action in professionals, founders, and teams.
        </>
      ),
      date: "July 11–19, 2026",
      city: "Guayaquil, Ecuador",
      poweredBy: "Powered by Startup Grind",
      ctaEvent: "View official event",
      ctaPartner: "Request workshop",
      micro: "#SoyHost · We share the purpose of making Ecuador a regional tech reference.",
      badgeAlt: "Official Host badge — Ecuador Tech Week 2026 — G-Structure",
    },
    announcements: {
      eyebrow: "MOMENTUM",
      title: "Building the next stage of G-Structure.",
      subtitle: "We're opening strategic spaces for companies and collaborators who want to be part of the early growth of the G-Structure ecosystem.",
      allies: {
        tag: "B2B WORKSHOP",
        title: "Execution Diagnostic Workshop",
        body: "G-Structure brings the Execution Diagnostic Workshop to companies and teams that need to understand what is blocking execution.",
        short: "A B2B entry point to diagnose real friction, learn with teams, and strengthen KAIRON from live execution problems.",
        cta: "Request workshop",
        micro: "Sessions for companies, teams, and organizations that need clarity before intervening.",
      },
      team: {
        tag: "FOUNDING TEAM",
        title: "We're forming the team that will build G-Structure and KAIRON",
        body: "We're looking for volunteer collaborators in key areas to strengthen the next stage of the project: product, technology, sales, marketing, and international business.",
        short: "We're not looking for spectators. We're looking for people with judgment, initiative, and the drive to build from an early stage.",
        cta: "I want to join the team",
        micro: "Initial volunteer participation, focused on real building, portfolio, applied learning, and possible continuity as the project advances.",
      },
    },
    problem: {
      eyebrow: "THE PROBLEM",
      title: "It's not always lack of capacity. Sometimes it's excess friction.",
      subtitle: "Many professionals and teams know what they have to do. They have goals, resources, information, and experience. But between intent and action, an interference zone appears: rigid thoughts, distorted risk reading, unproductive perfectionism, avoidance, or decisions postponed too long.",
      lead: "G-Structure works precisely in that zone: where cognition, emotion, and behavior start to block execution.",
      diagnose: "Take the diagnostic",
      cards: [
        { t: "Procrastination", d: "When action is postponed even when the task is important.", reveal: "Postponing it even though you know it's important? KAIRON works this pattern." },
        { t: "Unproductive perfectionism", d: "When the standard becomes an elegant excuse not to move forward.", reveal: "Has the standard become an elegant excuse? There's a pattern behind that." },
        { t: "Overthinking", d: "When thinking more stops clarifying and starts to paralyze.", reveal: "Thinking more stopped helping? That has a specific cognitive structure." },
        { t: "Self-sabotage", d: "When behavior contradicts the goal the person says they want.", reveal: "Behavior contradicting your goal? The Restructuring Engine maps why." },
        { t: "Execution block", d: "When there's intent, but no functional exit toward action.", reveal: "Intent but no exit? KAIRON turns that into action." },
      ],
    },
    method: {
      eyebrow: "THE PROPRIETARY METHOD",
      title: "I-R-O™: Identify. Reframe. Optimize.",
      lead: "The proprietary framework behind KAIRON: a defensible sequence for moving from mental friction to concrete action without exposing the product's internal mechanics.",
      footnote: "I-R-O™ Method is a proprietary framework developed by G-Structure for professional execution, guided by Kai inside KAIRON.",
    },
    faq: {
      eyebrow: "FREQUENTLY ASKED QUESTIONS",
      title: "Before booking, this usually comes up.",
      subtitle: "Short answers to the most common questions about the method, the processes, and the app.",
      cta: "I have another question",
    },
    mentalOS: {
      eyebrow: "OUR READING",
      title: "We treat the mind as an operating system.",
      p1: "In high-demand contexts, the problem isn't always the goal. Often it's the processing: how pressure is interpreted, how error is anticipated, how risk is evaluated, and how a decision is converted into behavior.",
      p2: "When that system enters friction, action gets distorted. G-Structure intervenes on those patterns so the person or team can think more clearly, decide more precisely, and act more consistently.",
      quote: "Mental order isn't a luxury. It's the foundation of clear, functional, sustainable action.",
    },
    gstruct: {
      tag: "THE PRODUCT · KAIRON",
      pill: "LIVE MVP · AUG 2026",
      h2: "KAIRON is the main product of G-Structure.",
      lead: (
        <>
          An app designed to turn the <strong className="text-foreground">I-R-O™: Identify ? Reframe ? Optimize</strong> method
          into a daily execution tool for professionals, founders, and teams.
        </>
      ),
      disclaimer: "KAIRON is an AI cognitive coaching tool for processing mental friction, separating situation, emotion, and interpretation, and closing each session with a concrete action.",
      p1: "KAIRON brings the I-R-O™ Method to your pocket. A mobile app designed to identify the friction blocking your execution, reframe it with CBT coaching methodology, and optimize your action — available 24/7.",
      p2: "It works as a cognitive execution layer: Kai organizes the friction of the moment, guides a more precise reading, and helps the user leave with movement.",
      previewAlt: "Preview of the live KAIRON MVP.",
      features: [
        { t: "Restructuring Engine", d: "Identify the situation, name the emotion, measure its intensity, reach the core belief. If you can measure it, you can optimize it." },
        { t: "AI Thought Lab", d: "With AI assistance, learn to reframe the automatic thought into a functional one that enables action." },
        { t: "Execution Diagnostic", d: "Identify your recurring patterns — procrastination, perfectionism, self-sabotage — and work directly on them." },
      ],
      plansLabel: "PLANS",
      plans: {
        freeTag: "FREE",
        freePrice: "Free",
        freeItems: ["· 3 Restructuring Engine entries", "· 5 Morning Activators per month", "· Phase 1 of the CBT Guide", "· Base resources"],
        plusTag: "PLUS",
        plusBadge: "FEATURED",
        plusPrice: "$20 / mo",
        plusItems: ["· Unlimited Restructuring Engine", "· Unlimited Morning Activators", "· Full CBT Guide", "· AI Thought Lab", "· Execution Diagnostic Platform"],
        vipTag: "VIP",
        vipPrice: "$50 / mo",
        vipItems: ["· Monthly session with human coach", "· Monthly pattern audit", "· Private community forum", "· Premium masterclasses"],
      },
      ctaWaitlist: "Join the waitlist",
      ctaSub: "Be part of the first group with access to KAIRON in Ecuador.",
    },
    founder: {
      eyebrow: "WHO'S BEHIND THIS",
      title: "Methodological direction with educational, cognitive-behavioral, and project experience.",
      body: (
        <>
          <strong className="text-foreground font-semibold">Guillermo Suco</strong> is the founder
          and CEO of G-Structure, creator of KAIRON and the I-R-O™ Method. His work integrates
          Psychology, educational intervention, user validation, multicultural project management,
          and digital product development.
        </>
      ),
      credentials: [
        "CBT Coach Practitioner · CTAA",
        "Psychology & Educational Intervention",
        "International teaching",
        "MV Logos Hope · project management",
        "KAIRON with ÉPICO",
      ],
      ctaTalk: "Talk to Guillermo",
      ctaProfile: "View profile",
    },
    channels: {
      eyebrow: "HOW WE'RE VALIDATING KAIRON",
      title: "They're not separate businesses. They're layers of one strategy.",
      subtitle: "G-Structure uses the Diagnostic Workshop as a B2B entry point to learn with real teams, generate early traction, and strengthen KAIRON as the scalable digital product.",
      items: [
        { tag: "01 · B2B CHANNEL", t: "Execution Diagnostic Workshop", d: "A group experience to identify execution friction in teams and open B2B conversations that feed KAIRON adoption.", esTo: "/enterprise", cta: "Explore workshop" },
        { tag: "02 · SCALABLE PRODUCT", t: "KAIRON App", d: "The digital product that scales the methodology. What we learn from users and companies directly feeds its construction.", esTo: "/kairon", cta: "Explore KAIRON" },
      ],
      footer: (
        <>
          Company: <strong className="text-foreground">G-Structure</strong> · Main product: <strong className="text-foreground">KAIRON</strong> ·
          Validation channels: <strong className="text-foreground">KAIRON, B2B workshop, and real users</strong> · Growth: investors, companies, and team.
        </>
      ),
    },
    solutions: {
      eyebrow: "SOLUTIONS",
      title: "Structured interventions for people and teams that need to execute better.",
      subtitle: "G-Structure operates through diagnostics, brief programs, and continuity processes designed for high-demand professional contexts.",
      idealFor: "Ideal for",
    },
    forWhom: {
      eyebrow: "APPLICATION",
      title: "Designed for contexts where thinking well isn't enough — you have to execute.",
      titleA: "G-Structure is for:",
      titleB: "It's especially useful when these appear:",
      a: [
        "Professionals with a high decision load.",
        "Leaders who need greater clarity of action.",
        "Founders living under constant pressure.",
        "Teams that postpone important decisions.",
        "Organizations that want to intervene on execution friction without falling into motivational talks.",
      ],
      b: [
        "Procrastination on critical tasks.",
        "Meetings that don't translate into action.",
        "Perfectionism that delays deliverables.",
        "Overthinking on strategic decisions.",
        "Burnout from lack of operational clarity.",
        "Repeated patterns of blocking, avoidance, or self-sabotage.",
      ],
      closing: "The goal isn't to do more for the sake of doing more. It's to think, decide, and act with greater precision.",
    },
    startup: {
      eyebrow: "AN EARLY-STAGE STARTUP",
      title: "Live MVP, with a clear thesis.",
      lead: (
        <>
          G-Structure is in a validation stage with <strong className="text-foreground">KAIRON</strong> already operating as a live MVP.
          The goal now is to validate real usage, strengthen the product powered by the I-R-O™ Method,
          and scale it for professionals, founders, and teams who need to execute better under pressure.
        </>
      ),
      routes: [
        { tag: "USERS", t: "Try or learn about KAIRON", esTo: "/kairon" },
        { tag: "COMPANIES", t: "Bring Enterprise to your team", esTo: "/enterprise" },
        { tag: "INVESTORS", t: "Review the investment opportunity", esTo: "/inversores" },
        { tag: "TALENT", t: "Join the founding team", esTo: "/unete-al-equipo" },
      ],
    },
    finalCTA: {
      title: "G-Structure is building KAIRON. Decide how you want to be part of it.",
      body: "Join the product waitlist, bring the methodology to your team, learn about the investment opportunity, or talk to us directly.",
      ctaExplore: "Explore KAIRON",
      ctaWaitlist: "Join the waitlist",
      ctaContact: "Contact",
    },
    visualPanels: {
      systemLabel: "G-STRUCTURE · COGNITIVE OS",
      version: "v0.1 · LIVE",
      p3Label: "03 · OPTIMIZE",
      p3Subtitle: "Action plan",
      p3Buttons: ["Decide", "Execute", "Sustain"],
      p3Continuity: "Continuity",
      p2Label: "02 · REFRAME",
      p2Subtitle: "Cognitive pattern",
      p2Quote: (
        <>
          "If it's not perfect, I won't ship it." ? <span className="font-semibold">Moving forward with judgment reduces the cost of not deciding.</span>
        </>
      ),
      p2Tags: ["PERFECTIONISM", "AVOIDANCE"],
      p1Label: "01 · IDENTIFY",
      p1Subtitle: "Active session",
      p1Quote: (
        <>
          Pattern detected: <span className="font-semibold">postponement under strategic decision pressure.</span>
        </>
      ),
      p1Friction: "Friction",
      p1FrictionVal: "High",
      p1Recurrence: "Recurrence",
      p1RecurrenceVal: "7d",
      p1Output: "Output",
      p1OutputVal: "Design",
      p1Next: "Reframe",
      mark: "I-R-O SYSTEM",
    },
    solutionsItems: [
      { t: "Diagnostic Workshop", d: "Strategic session to identify execution friction in professionals, leaders, or teams.", ideal: "Companies, founders, or teams that need to understand what's blocking action before designing an intervention.", cta: "Explore workshop", esTo: "/enterprise" },
      { t: "KAIRON", d: "Live MVP to diagnose friction, reframe in real time, and convert insight into concrete action.", ideal: "Professionals and founders who want to try the product directly.", cta: "Try KAIRON", esTo: "/kairon" },
    ],
  },
} as const;

// =============================================================================
// Sections
// =============================================================================

const LAUNCH_DATE = new Date("2026-08-11T00:00:00-05:00");

function daysUntilLaunch() {
  const today = new Date();
  const diff = LAUNCH_DATE.getTime() - today.getTime();
  return Math.max(0, Math.ceil(diff / 86_400_000));
}

function LaunchCountdown({ tone = "light" }: { tone?: "light" | "dark" }) {
  const { locale } = useLocale();
  const days = daysUntilLaunch();
  const copy = locale === "en"
    ? {
        date: "August 11",
        label: days === 1 ? "day until launch" : "days until launch",
        support: "52 people already tried it. On August 11, everyone can.",
      }
    : {
        date: "11 de agosto",
        label: days === 1 ? "día para el lanzamiento" : "días para el lanzamiento",
        support: "Ya lo probaron 52 personas. El 11 de agosto, todos pueden.",
      };
  const dark = tone === "dark";

  return (
    <div className={`inline-flex flex-wrap items-center justify-center gap-2 border px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] ${
      dark ? "border-white/20 bg-white/10 text-white/85" : "border-[#12786B]/25 bg-[#12786B]/8 text-[#12786B]"
    }`}>
      <span className="font-display text-base tracking-normal">{days}</span>
      <span>{copy.label} — {copy.date}</span>
      <span className={dark ? "hidden text-white/55 sm:inline" : "hidden text-foreground/45 sm:inline"}>·</span>
      <span className={dark ? "normal-case tracking-normal text-white/65" : "normal-case tracking-normal text-foreground/65"}>
        {copy.support}
      </span>
    </div>
  );
}

function Hero() {
  const { locale } = useLocale();
  const campaign = launchCopy(locale, getLaunchPhase());
  const ctaUrl = appUrl(locale, "home_hero");
  const copy = locale === "en"
    ? {
        eyebrow: "AI COGNITIVE EXECUTION COACH",
        title: "Turn mental friction into action. In 5 minutes.",
        lead: "KAIRON helps founders, creators, and professionals catch the thoughts that block execution, reframe them with Kai, and convert them into validated 5-minute actions.",
        price: `$${KAIRON_PRICING.latamProMonthly}/mo LATAM · $${KAIRON_PRICING.usProMonthly}/mo US`,
        trust: [
          "Built on cognitive-behavioral coaching principles",
          "Guided by Kai, your AI execution coach",
          "Designed for procrastination, perfectionism, impostor thoughts, and self-sabotage",
        ],
      }
    : {
        eyebrow: "AI COGNITIVE EXECUTION COACH",
        title: "Convierte fricción mental en acción. En 5 minutos.",
        lead: "KAIRON ayuda a founders, creadores y profesionales a detectar los pensamientos que bloquean su ejecución, reencuadrarlos con Kai y convertirlos en acciones validadas de 5 minutos.",
        price: `$${KAIRON_PRICING.latamProMonthly}/mes LATAM · $${KAIRON_PRICING.usProMonthly}/mes US`,
        trust: [
          "Basado en principios de coaching cognitivo-conductual",
          "Guiado por Kai, tu coach de ejecución con IA",
          "Diseñado para procrastinación, perfeccionismo, impostor y autosabotaje",
        ],
      };

  return (
    <section className="relative overflow-hidden border-b border-border bg-[color:var(--color-background)]">
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden="true" />
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(900px 520px at 78% 12%, color-mix(in oklch, var(--color-brand) 12%, transparent), transparent 62%), radial-gradient(720px 460px at 12% 92%, color-mix(in oklch, var(--color-brand-deep) 9%, transparent), transparent 58%)",
        }}
      />
      <div
        className="absolute left-0 right-0 top-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, color-mix(in oklch, var(--color-brand) 30%, transparent), transparent)" }}
        aria-hidden="true"
      />

      <div className="container-x relative py-14 md:py-20 lg:min-h-[calc(100vh-86px)] lg:py-12">
        <div className="mx-auto flex min-h-[620px] max-w-6xl flex-col items-center justify-center text-center">
          <LaunchCountdown />
          <Eyebrow className="mt-6">{copy.eyebrow}</Eyebrow>
          <h1 className="mt-5 max-w-4xl text-4xl md:text-6xl lg:text-[4.65rem] leading-[1.01] text-foreground">
            {copy.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base md:text-lg text-foreground/82 leading-relaxed">
            {copy.lead}
          </p>
          <p className="mt-5 font-display text-lg md:text-xl font-semibold text-[#12786B]">
            {copy.price}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <CTAExternal
              href={ctaUrl}
              variant="primary"
              analyticsLabel="home_hero_try_kairon"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackAppCta(locale, "home_hero")}
            >
              {campaign.primaryCta}
            </CTAExternal>
          </div>

          <div className="mt-9 grid w-full max-w-4xl gap-3 text-[12.5px] text-foreground/72 sm:grid-cols-3">
            {copy.trust.map((item) => (
              <div key={item} className="border-t border-foreground/15 px-3 pt-3 leading-relaxed">
                {item}
              </div>
            ))}
          </div>

          <div className="mt-5 w-full">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroVisual() {
  const { locale } = useLocale();
  const alt = locale === "es"
    ? "Vista de KAIRON con Kai como coach de ejecución"
    : "KAIRON interface with Kai as execution coach";

  return (
    <div className="relative mx-auto h-[360px] w-full max-w-5xl overflow-hidden sm:h-[440px] lg:h-[500px]">
      <div
        className="absolute left-1/2 top-[54%] h-[68%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-[100%] blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(14,203,214,0.16), rgba(5,50,90,0.06) 54%, transparent 74%)" }}
        aria-hidden
      />
      <div className="absolute left-1/2 bottom-6 h-20 w-80 -translate-x-1/2 rounded-[100%] bg-cyan-400/18 blur-2xl" aria-hidden />
      <div className="absolute left-1/2 top-[53%] h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/15 sm:h-[360px] sm:w-[360px] lg:h-[430px] lg:w-[430px]" aria-hidden />
      <div className="absolute left-1/2 top-[53%] h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[color:var(--color-brand)]/10 sm:h-[290px] sm:w-[290px] lg:h-[360px] lg:w-[360px]" aria-hidden />
      <img
        src={kaiMini}
        alt={alt}
        width={1262}
        height={1262}
        className="kai-float relative z-10 mx-auto h-full w-auto object-contain drop-shadow-[0_34px_38px_rgba(5,50,90,0.22)]"
        loading="eager"
        decoding="async"
      />
    </div>
  );
}

function ETWBanner() {
  const { locale } = useLocale();
  const c = COPY[locale].etw;
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            "linear-gradient(135deg, var(--color-brand-deep) 0%, var(--color-brand) 55%, color-mix(in oklch, var(--color-brand) 70%, #d4a90a) 100%)",
        }}
      />
      <div className="absolute inset-0 dot-bg-inverse opacity-[0.12]" aria-hidden />
      <div
        className="absolute -left-20 top-1/2 -translate-y-1/2 h-[420px] w-[420px] rounded-full opacity-30 blur-3xl"
        aria-hidden
        style={{ background: "radial-gradient(closest-side, #ffd400, transparent)" }}
      />

      <div className="container-x relative py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5 lg:col-span-4">
            <Reveal>
              <div className="relative">
                <div
                  className="absolute -inset-4 opacity-40 blur-2xl"
                  aria-hidden
                  style={{ background: "radial-gradient(closest-side, #ffd400, transparent)" }}
                />
                <a href={ETW_URL} target="_blank" rel="noreferrer" className="block">
                  <img
                    src={etwBadge}
                    alt={c.badgeAlt}
                    width={1080}
                    height={1350}
                    className="relative w-full max-w-[360px] mx-auto md:mx-0 h-auto shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55)] ring-1 ring-white/15"
                  />
                </a>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-7 lg:col-span-8 text-[color:var(--color-background)]">
            <div className="inline-flex items-center gap-2 border border-white/30 bg-white/10 backdrop-blur px-2.5 py-1 text-[10px] font-semibold tracking-[0.22em]">
              <Sparkles size={12} /> {c.pill}
            </div>
            <h2 className="mt-5 font-display text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.05]">
              {c.h2}
            </h2>
            <p className="mt-4 max-w-2xl text-base md:text-lg text-white/85 leading-relaxed">
              {c.body}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/85">
              <span className="inline-flex items-center gap-2"><Calendar size={14} /> {c.date}</span>
              <span className="inline-flex items-center gap-2"><MapPin size={14} /> {c.city}</span>
              <span className="inline-flex items-center gap-2 text-white/70">{c.poweredBy}</span>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={ETW_URL}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 bg-white px-5 py-3 text-[13px] font-semibold tracking-wide text-[color:var(--color-brand-deep)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.4)]"
              >
                {c.ctaEvent}
                <ExternalLink size={14} className="transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
            <p className="mt-4 text-[11px] tracking-wide text-white/60">
              {c.micro}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


function Announcements() {
  const { locale } = useLocale();
  const c = COPY[locale].announcements;
  return (
    <Section>
      <SectionHeader
        eyebrow={c.eyebrow}
        title={c.title}
        subtitle={c.subtitle}
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <Reveal>
          <AnnouncementCard
            icon={<Handshake size={20} />}
            tag={c.allies.tag}
            title={c.allies.title}
            body={c.allies.body}
            short={c.allies.short}
            cta={c.allies.cta}
            to={lp("/enterprise", locale)}
            micro={c.allies.micro}
          />
        </Reveal>
        <Reveal delay={120}>
          <AnnouncementCard
            icon={<Users size={20} />}
            tag={c.team.tag}
            title={c.team.title}
            body={c.team.body}
            short={c.team.short}
            cta={c.team.cta}
            to={lp("/unete-al-equipo", locale)}
            micro={c.team.micro}
          />
        </Reveal>
      </div>
    </Section>
  );
}

function AnnouncementCard({
  icon, tag, title, body, short, cta, to, micro,
}: { icon: React.ReactNode; tag: string; title: string; body: string; short: string; cta: string; to: string; micro: string }) {
  return (
    <div className="lift relative flex h-full flex-col border border-border bg-[color:var(--color-surface)] p-8 md:p-10 overflow-hidden">
      <span
        className="absolute left-0 top-0 h-px w-16"
        style={{ background: "var(--color-brand)" }}
        aria-hidden
      />
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-[0.05]" style={{ background: "radial-gradient(closest-side, var(--color-brand), transparent)" }} aria-hidden />
      <div className="flex items-center gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center border border-border bg-[color:var(--color-brand-soft)]/40 text-foreground">
          {icon}
        </span>
        <span className="eyebrow">{tag}</span>
      </div>
      <h3 className="mt-5 font-display text-xl md:text-2xl font-semibold leading-snug">{title}</h3>
      <p className="mt-4 text-sm md:text-[15px] text-muted-foreground leading-relaxed">{body}</p>
      <p className="mt-3 text-sm md:text-[15px] text-foreground/80 leading-relaxed">{short}</p>
      <div className="mt-8 flex-1" />
      <div className="flex items-center justify-between gap-4 border-t border-border pt-6">
        <p className="text-xs text-muted-foreground max-w-[58%]">{micro}</p>
        <Link
          to={to}
          className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-foreground"
        >
          {cta} <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}

function Problem() {
  const { locale } = useLocale();
  const c = COPY[locale].problem;
  return (
    <Section tone="muted">
      <SectionHeader
        eyebrow={c.eyebrow}
        title={c.title}
        subtitle={c.subtitle}
      />
      <p className="mt-6 max-w-3xl text-base md:text-lg text-foreground leading-relaxed">
        {c.lead}
      </p>
      <div className="mt-12 grid gap-px bg-border md:grid-cols-3 lg:grid-cols-5 border border-border">
        {c.cards.map((card) => (
          <div
            key={card.t}
            className="group relative bg-[color:var(--color-surface)] p-6 transition-colors hover:bg-[color:var(--color-brand-soft)]/40 focus-within:bg-[color:var(--color-brand-soft)]/40"
            tabIndex={0}
          >
            <h3 className="font-display text-base font-semibold">{card.t}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{card.d}</p>
            <div className="mt-3 max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-40 group-hover:opacity-100 group-focus-within:max-h-40 group-focus-within:opacity-100">
              <p className="text-xs text-foreground/80 leading-relaxed">{card.reveal}</p>
              <Link
                to={lp("/", locale)}
                hash="quiz"
                className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-medium text-foreground"
              >
                <ArrowRight size={12} /> {c.diagnose}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function MentalOS() {
  const { locale } = useLocale();
  const c = COPY[locale].mentalOS;
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <SectionHeader
            eyebrow={c.eyebrow}
            title={c.title}
          />
          <div className="mt-8 space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
            <p>{c.p1}</p>
            <p>{c.p2}</p>
          </div>
        </div>
        <aside className="lg:col-span-5 flex">
          <blockquote className="relative flex-1 border-l-2 border-foreground p-8 md:p-10 bg-[color:var(--color-brand-soft)]/30">
            <BrandMark size={28} className="opacity-60" />
            <p className="mt-6 font-display text-xl md:text-2xl leading-snug text-foreground">
              {c.quote}
            </p>
          </blockquote>
        </aside>
      </div>
    </Section>
  );
}

function Method() {
  const { locale } = useLocale();
  const c = COPY[locale].method;
  return (
    <Section id="metodo" tone="deep" className="relative overflow-hidden">
      <div className="absolute inset-0 dot-bg-inverse opacity-[0.07] pointer-events-none" aria-hidden />
      <img
        src={logoCube}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-20 -bottom-20 h-[420px] w-[420px] opacity-[0.05] invert brightness-200 select-none"
      />
      <div className="relative max-w-3xl">
        <p className="eyebrow text-[color:var(--color-background)]/70">{c.eyebrow}</p>
        <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.08]">
          {c.title}
        </h2>
        <p className="mt-5 text-base md:text-lg text-[color:var(--color-background)]/75 leading-relaxed">
          {c.lead}
        </p>
      </div>
      <div className="relative">
        <MethodTabs />
      </div>
      <p className="relative mt-10 max-w-3xl text-xs md:text-[13px] text-[color:var(--color-background)]/60 leading-relaxed">
        {c.footnote}
      </p>
    </Section>
  );
}

function FAQSection() {
  const { locale } = useLocale();
  const c = COPY[locale].faq;
  return (
    <Section tone="muted">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeader
            eyebrow={c.eyebrow}
            title={c.title}
            subtitle={c.subtitle}
          />
          <div className="mt-8">
            <CTALink to={lp("/contacto", locale)} variant="outline">{c.cta}</CTALink>
          </div>
        </div>
        <div className="lg:col-span-7">
          <FAQ />
        </div>
      </div>
    </Section>
  );
}

function Solutions() {
  const { locale } = useLocale();
  const c = COPY[locale].solutions;
  const items = COPY[locale].solutionsItems;
  return (
    <Section>
      <SectionHeader
        eyebrow={c.eyebrow}
        title={c.title}
        subtitle={c.subtitle}
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {items.map((it, idx) => (
          <Reveal key={it.t} delay={idx * 80}>
            <div className="lift relative flex h-full flex-col border border-border bg-[color:var(--color-surface)] p-7 md:p-9 overflow-hidden">
              <span className="absolute left-0 top-0 h-px w-12" style={{ background: "var(--color-brand)" }} aria-hidden />
              <span className="font-display text-[10px] font-semibold tracking-[0.22em] text-muted-foreground">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-xl md:text-2xl font-semibold">{it.t}</h3>
              <p className="mt-3 text-sm md:text-[15px] text-muted-foreground leading-relaxed">{it.d}</p>
              <div className="mt-5 border-t border-border pt-4">
                <p className="eyebrow mb-2">{c.idealFor}</p>
                <p className="text-sm text-foreground/80 leading-relaxed">{it.ideal}</p>
              </div>
              <div className="mt-auto pt-6">
                <Link to={lp(it.esTo, locale)} className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-foreground">
                  {it.cta} <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function ForWhom() {
  const { locale } = useLocale();
  const c = COPY[locale].forWhom;
  return (
    <Section tone="muted">
      <SectionHeader
        eyebrow={c.eyebrow}
        title={c.title}
      />
      <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-16">
        <List title={c.titleA} items={c.a} />
        <List title={c.titleB} items={c.b} />
      </div>
      <p className="mt-12 max-w-3xl font-display text-xl md:text-2xl leading-snug text-foreground">
        {c.closing}
      </p>
    </Section>
  );
}

function List({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div>
      <p className="eyebrow mb-5">{title}</p>
      <ul className="space-y-4">
        {items.map((i) => (
          <li key={i} className="flex gap-3 border-b border-border pb-4">
            <span className="mt-2 h-1 w-3 shrink-0 bg-foreground" />
            <span className="text-sm md:text-[15px] text-foreground/85 leading-relaxed">{i}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function GStructBridge() {
  const { locale } = useLocale();
  const c = COPY[locale].gstruct;
  return (
    <Section tone="white" id="producto">
      <div className="flex flex-wrap items-center gap-3">
        <span className="eyebrow">{c.tag}</span>
        <span className="border border-border px-2.5 py-1 text-[10px] font-semibold tracking-[0.22em] text-muted-foreground">
          {c.pill}
        </span>
      </div>
      <h2 className="mt-4 max-w-3xl font-display text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.08]">
        {c.h2}
      </h2>
      <p className="mt-5 max-w-3xl text-base md:text-lg text-muted-foreground leading-relaxed">
        {c.lead}
      </p>
      <p className="mt-3 max-w-3xl text-xs md:text-[13px] text-muted-foreground leading-relaxed">
        {c.disclaimer}
      </p>

      <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-7 space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
          <p>{c.p1}</p>
          <p className="text-foreground/85">{c.p2}</p>
        </div>
        <div className="lg:col-span-5">
          <div className="relative overflow-hidden border border-[color:var(--color-brand-deep)] bg-[color:var(--color-brand-deep)] p-4 md:p-5">
            <div className="grid grid-cols-12 gap-3 items-end">
              <img
                src={kaiMascot}
                alt={c.previewAlt}
                loading="lazy"
                width={900}
                height={1125}
                className="col-span-7 w-full h-auto object-cover"
              />
              <div className="col-span-5 grid gap-3">
                <img
                  src={gFrameLogo}
                  alt={locale === "en" ? "KAIRON Restructuring Engine mock-up." : "Mock-up del Motor de Reestructuración de KAIRON."}
                  loading="lazy"
                  width={900}
                  height={1125}
                  className="w-full h-auto object-cover"
                />
                <img
                  src={kaiMascot}
                  alt={locale === "en" ? "KAIRON Quick Reframe mock-up." : "Mock-up de Quick Reframe de KAIRON."}
                  loading="lazy"
                  width={900}
                  height={1125}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-[color:var(--color-background)]/20 pt-3 text-[10px] font-semibold tracking-[0.2em] text-[color:var(--color-background)]/70">
              <span>{locale === "en" ? "PROTOTYPE SCREENS" : "PANTALLAS DEL PROTOTIPO"}</span>
              <span>AUG 2026</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-px bg-border md:grid-cols-3 border border-border">
        {c.features.map((f) => (
          <div key={f.t} className="bg-[color:var(--color-surface)] p-7">
            <h3 className="font-display text-base md:text-lg font-semibold">{f.t}</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <p className="eyebrow">{c.plansLabel}</p>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div className="border border-border bg-[color:var(--color-surface)] p-7">
            <p className="font-display text-[11px] font-semibold tracking-[0.22em] text-muted-foreground">{c.plans.freeTag}</p>
            <p className="mt-3 font-display text-3xl font-semibold">{c.plans.freePrice}</p>
            <ul className="mt-5 space-y-2 text-sm text-foreground/85 leading-relaxed">
              {c.plans.freeItems.map((i) => <li key={i}>{i}</li>)}
            </ul>
          </div>
          <div className="relative border border-foreground bg-[color:var(--color-brand-deep)] text-[color:var(--color-background)] p-7">
            <span className="absolute -top-3 left-7 inline-flex items-center bg-foreground px-2.5 py-1 text-[10px] font-semibold tracking-[0.22em] text-background">{c.plans.plusBadge}</span>
            <p className="font-display text-[11px] font-semibold tracking-[0.22em] text-[color:var(--color-background)]/70">{c.plans.plusTag}</p>
            <p className="mt-3 font-display text-3xl font-semibold">{c.plans.plusPrice}</p>
            <ul className="mt-5 space-y-2 text-sm text-[color:var(--color-background)]/90 leading-relaxed">
              {c.plans.plusItems.map((i) => <li key={i}>{i}</li>)}
            </ul>
          </div>
          <div className="border border-border bg-[color:var(--color-surface)] p-7">
            <p className="font-display text-[11px] font-semibold tracking-[0.22em] text-muted-foreground">{c.plans.vipTag}</p>
            <p className="mt-3 font-display text-3xl font-semibold">{c.plans.vipPrice}</p>
            <ul className="mt-5 space-y-2 text-sm text-foreground/85 leading-relaxed">
              {c.plans.vipItems.map((i) => <li key={i}>{i}</li>)}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center text-center gap-3">
        <CTALink to={lp("/kairon", locale)} hash="waitlist" variant="primary" analyticsLabel="home_gstruct_section_waitlist">
          {c.ctaWaitlist}
        </CTALink>
        <p className="text-sm text-muted-foreground">
          {c.ctaSub}
        </p>
      </div>
    </Section>
  );
}

function ProductTeaser() {
  const { locale } = useLocale();
  const campaign = launchCopy(locale, getLaunchPhase());
  const ctaUrl = appUrl(locale, "home_product");
  const copy = locale === "en"
    ? {
        eyebrow: "THE PRODUCT",
        title: "A cognitive execution system, already active as MVP.",
        body: "KAIRON helps you set a focus, catch the thought that creates friction, reframe it with Kai, and leave with a next action you can actually do.",
        cta: "Try KAIRON",
        altHome: "KAIRON home screen with daily focus and tools.",
        altActivator: "KAIRON daily activator on mobile.",
        altFilter: "KAIRON Filter conversation with Kai.",
        flow: [
          { title: "Start with today's focus", body: "Your day begins with a short cognitive activator, not a motivational quote." },
          { title: "Use the right tool", body: "Filter for immediate blocks. Workshop for repeated friction. Protocol for deeper restructuring." },
          { title: "Reframe with Kai", body: "Kai doesn't soften what you think. He helps you see it clearly and move." },
        ],
      }
    : {
        eyebrow: "EL PRODUCTO",
        title: "Un sistema de ejecución cognitiva, ya activo como MVP.",
        body: "KAIRON te ayuda a definir un foco, atrapar el pensamiento que crea fricción, reencuadrarlo con Kai y salir con una siguiente acción que sí puedes ejecutar.",
        cta: "Probar KAIRON",
        altHome: "Pantalla principal de KAIRON con enfoque diario y herramientas.",
        altActivator: "Activador diario de KAIRON en móvil.",
        altFilter: "Conversación del Filtro de KAIRON con Kai.",
        flow: [
          { title: "Empieza con el foco del día", body: "Tu día inicia con un activador cognitivo breve, no con una frase motivacional." },
          { title: "Usa la herramienta correcta", body: "Filtro para bloqueos inmediatos. Taller para fricciones repetidas. Protocolo para reestructuración profunda." },
          { title: "Reencuadra con Kai", body: "Kai no suaviza lo que piensas. Te ayuda a verlo con claridad y moverte." },
        ],
      };

  return (
    <Section tone="white" id="como-funciona">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-4 lg:sticky lg:top-28">
          <SectionHeader eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.body} />
          <ol className="mt-8 space-y-5">
            {copy.flow.map((item, index) => (
              <li key={item.title} className="grid grid-cols-[2.5rem_1fr] gap-4">
                <span className="flex h-10 w-10 items-center justify-center border border-[#12786B]/25 bg-[#12786B]/8 font-display text-sm font-semibold text-[#12786B]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <strong className="font-display text-base text-foreground">{item.title}</strong>
                  <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{item.body}</span>
                </span>
              </li>
            ))}
          </ol>
          <div className="mt-8">
            <CTAExternal
              href={ctaUrl}
              variant="primary"
              analyticsLabel="home_product_try_kairon"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackAppCta(locale, "home_product")}
            >
              {campaign.primaryCta || copy.cta}
            </CTAExternal>
          </div>
        </div>
        <div className="lg:col-span-8">
          <div className="grid gap-5 md:grid-cols-2">
            <figure className="relative overflow-hidden border border-border bg-[color:var(--color-background)] p-4 md:col-span-2 md:p-6">
              <img
                src={kaironHomeScreen}
                alt={copy.altHome}
                loading="lazy"
                width={1152}
                height={1536}
                className="mx-auto w-full max-w-[520px] object-contain drop-shadow-[0_30px_42px_rgba(5,50,90,0.2)]"
              />
            </figure>
            <figure className="relative overflow-hidden border border-border bg-[color:var(--color-background)] p-4">
              <img
                src={kaironDailyActivator}
                alt={copy.altActivator}
                loading="lazy"
                width={1152}
                height={1536}
                className="mx-auto w-full max-w-[360px] object-contain drop-shadow-[0_24px_34px_rgba(5,50,90,0.18)]"
              />
            </figure>
            <figure className="relative overflow-hidden border border-border bg-[color:var(--color-background)] p-4">
            <div
              className="absolute inset-x-10 bottom-8 h-24 rounded-[100%] bg-[#12786B]/12 blur-3xl"
              aria-hidden
            />
            <img
              src={kaironFilterConversation}
              alt={copy.altFilter}
              loading="lazy"
              width={1023}
              height={1536}
              className="relative mx-auto w-full max-w-[360px] object-contain drop-shadow-[0_24px_34px_rgba(5,50,90,0.18)]"
            />
            </figure>
          </div>
        </div>
      </div>
    </Section>
  );
}

function ValidationTraction() {
  const { locale } = useLocale();
  const copy = locale === "en"
    ? {
        eyebrow: "VALIDATION",
        title: "52 people have already tried it.",
        subtitle: "40 in Ecuador, 12 in the United States. This is what they said.",
        stats: [
          { value: "52", label: "real users" },
          { value: "40", label: "in Ecuador" },
          { value: "12", label: "in the United States" },
        ],
        moreLabel: "Read two more testimonials",
        testimonials: [
          {
            role: "HR Manager — Philadelphia",
            quote: "I tried to cheat it — and it still got my pattern right.",
            note: "Scanner validated even against deliberate attempts to manipulate it.",
          },
          {
            role: "Marketing Manager — Philadelphia",
            quote: "This goes to the core of the problem. It's commercially fit and worth selling.",
          },
          {
            role: "Software Engineer — Philadelphia",
            quote: "Well built, intuitive. I would keep using this.",
          },
          {
            role: "Clinical Psychologist — Guayaquil",
            quote: "I would use this with my clients. It's not intrusive — it guides you and makes you feel understood and cared for.",
          },
          {
            role: "Founder — Guayaquil",
            quote: "This should always accompany founders. It helps them break away from their blocks and not give up.",
          },
        ],
        stage:
          "That same night, G-Structure presented KAIRON at The Stage Pitch Competition, part of Ecuador Tech Week, organized by Startup Grind and Viamatica.",
        images: [
          { src: tractionStagePresenting, alt: "G-Structure presenting KAIRON during Ecuador Tech Week." },
          { src: tractionUserTesting, alt: "KAIRON being tested with a participant during the workshop." },
        ],
      }
    : {
        eyebrow: "VALIDACIÓN",
        title: "52 personas ya lo probaron.",
        subtitle: "40 en Ecuador, 12 en Estados Unidos. Esto es lo que dijeron.",
        stats: [
          { value: "52", label: "usuarios reales" },
          { value: "40", label: "en Ecuador" },
          { value: "12", label: "en Estados Unidos" },
        ],
        moreLabel: "Leer dos testimonios más",
        testimonials: [
          {
            role: "HR Manager — Philadelphia",
            quote: "Intenté engañarlo — y aun así detectó mi patrón correctamente.",
            note: "Scanner validado incluso contra intentos deliberados de manipulación.",
          },
          {
            role: "Marketing Manager — Philadelphia",
            quote: "Esto va al núcleo del problema. Tiene fit comercial y vale la pena venderlo.",
          },
          {
            role: "Software Engineer — Philadelphia",
            quote: "Bien construido, intuitivo. Lo seguiría usando.",
          },
          {
            role: "Psicóloga clínica — Guayaquil",
            quote: "Lo usaría con mis clientes. No es intrusivo — te guía y te hace sentir comprendido y cuidado.",
          },
          {
            role: "Founder — Guayaquil",
            quote: "Esto debería acompañar siempre a los founders. Les ayuda a salir de sus bloqueos y no rendirse.",
          },
        ],
        stage:
          "Esa misma noche, G-Structure presentó KAIRON en The Stage Pitch Competition, parte de Ecuador Tech Week, organizado por Startup Grind y Viamatica.",
        images: [
          { src: tractionStagePresenting, alt: "G-Structure presentando KAIRON durante Ecuador Tech Week." },
          { src: tractionUserTesting, alt: "KAIRON siendo probado con un participante durante el workshop." },
        ],
      };
  const visibleTestimonials = [copy.testimonials[0], copy.testimonials[1], copy.testimonials[3]];
  const hiddenTestimonials = [copy.testimonials[2], copy.testimonials[4]];

  return (
    <Section tone="muted" id="testimonios">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-5">
          <SectionHeader eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />
          <div className="mt-8 grid grid-cols-3 gap-px border border-border bg-border">
            {copy.stats.map((stat) => (
              <div key={stat.label} className="bg-[color:var(--color-surface)] p-4 md:p-5">
                <p className="font-display text-3xl md:text-4xl font-semibold leading-none text-[color:var(--color-brand)]">
                  {stat.value}
                </p>
                <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-7 border-l-2 border-[#12786B] pl-5 text-sm md:text-[15px] leading-relaxed text-foreground/80">
            {copy.stage}
          </p>
        </div>

        <div className="lg:col-span-7">
          <div className="grid gap-px border border-border bg-border md:grid-cols-3">
            {visibleTestimonials.map((item) => (
              <article
                key={item.role}
                className="bg-[color:var(--color-surface)] p-5 md:p-6"
              >
                <p className="font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-[#12786B]">
                  {item.role}
                </p>
                <blockquote className="mt-4 font-display text-xl md:text-2xl leading-tight text-foreground">
                  “{item.quote}”
                </blockquote>
                {item.note ? (
                  <p className="mt-4 text-xs md:text-[13px] leading-relaxed text-muted-foreground">
                    {item.note}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
          <details className="group mt-4 border border-border bg-[color:var(--color-surface)]">
            <summary className="cursor-pointer px-5 py-4 font-display text-sm font-semibold text-foreground marker:text-[#12786B]">
              {copy.moreLabel}
            </summary>
            <div className="grid gap-px border-t border-border bg-border md:grid-cols-2">
              {hiddenTestimonials.map((item) => (
                <article key={item.role} className="bg-[color:var(--color-surface)] p-5 md:p-6">
                  <p className="font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-[#12786B]">
                    {item.role}
                  </p>
                  <blockquote className="mt-4 font-display text-xl leading-tight text-foreground">
                    “{item.quote}”
                  </blockquote>
                </article>
              ))}
            </div>
          </details>
        </div>
      </div>

      <div className="mt-12 grid gap-3 md:grid-cols-2">
        {copy.images.map((image, index) => (
          <figure
            key={image.alt}
            className="overflow-hidden border border-border bg-[color:var(--color-surface)]"
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              width={1400}
              height={788}
              className="h-full min-h-[260px] w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
            />
          </figure>
        ))}
      </div>
    </Section>
  );
}

function NocturnoSection() {
  const { locale } = useLocale();
  const campaign = launchCopy(locale, getLaunchPhase());
  const ctaUrl = appUrl(locale, "home_nocturno");
  const copy = locale === "en"
    ? {
        eyebrow: "NIGHT MODE",
        title: "Night mode. For when your mind won't let you sleep.",
        body: "A voice conversation with Kai, built for the moment the day ends but the thoughts don't. Close the loop before tomorrow.",
        alt: "KAIRON Night mode voice conversation with Kai.",
      }
    : {
        eyebrow: "NOCTURNO",
        title: "Nocturno. Para cuando tu mente no te deja dormir.",
        body: "Conversación por voz con Kai, diseñada para el momento en que el día termina pero los pensamientos no. Cierra el ciclo antes de mañana.",
        alt: "Modo Nocturno de KAIRON con conversación por voz con Kai.",
      };

  return (
    <section className="relative overflow-hidden bg-[#031b2e] text-white">
      <div className="absolute inset-0 dot-bg-inverse opacity-[0.08]" aria-hidden />
      <div className="absolute -right-24 top-10 h-80 w-80 rounded-full bg-[#12786B]/30 blur-3xl" aria-hidden />
      <div className="container-x relative py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200/80">
              {copy.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-3xl md:text-5xl leading-[1.05]">
              {copy.title}
            </h2>
            <p className="mt-5 max-w-xl text-base md:text-lg leading-relaxed text-white/72">
              {copy.body}
            </p>
            <div className="mt-8">
              <CTAExternal
                href={ctaUrl}
                variant="inverse"
                analyticsLabel="home_nocturno_try_kairon"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackAppCta(locale, "home_nocturno")}
              >
                {campaign.primaryCta}
              </CTAExternal>
            </div>
          </div>
          <div className="lg:col-span-7">
            <figure className="relative mx-auto max-w-[520px]">
              <div className="absolute inset-x-8 bottom-8 h-28 rounded-[100%] bg-cyan-300/20 blur-3xl" aria-hidden />
              <img
                src={kaironNocturnoChat}
                alt={copy.alt}
                loading="lazy"
                width={1023}
                height={1536}
                className="relative w-full object-contain drop-shadow-[0_38px_54px_rgba(0,0,0,0.5)]"
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const { locale } = useLocale();
  const campaign = launchCopy(locale, getLaunchPhase());
  const ctaUrl = appUrl(locale, "home_pricing");
  const copy = locale === "en"
    ? {
        eyebrow: "LAUNCH PRICING",
        title: "Simple founder pricing for the first launch users.",
        body: "KAIRON Pro opens commercially on August 11. Until then, you can create your account and use the active MVP as part of the first access cohort.",
        trial: "7-day trial, card required",
        cta: "See pricing details",
        plans: [
          { price: `$${KAIRON_PRICING.latamProMonthly}/mo`, label: "Latin America" },
          { price: `$${KAIRON_PRICING.usProMonthly}/mo`, label: "United States" },
        ],
      }
    : {
        eyebrow: "PRECIO DE LANZAMIENTO",
        title: "Precio simple para los primeros usuarios del lanzamiento.",
        body: "KAIRON Pro abre comercialmente el 11 de agosto. Mientras tanto, puedes crear tu cuenta y usar el MVP activo como parte del primer grupo de acceso.",
        trial: "7 días de prueba, tarjeta requerida",
        cta: "Ver detalles de precio",
        plans: [
          { price: `$${KAIRON_PRICING.latamProMonthly}/mes`, label: "Latinoamérica" },
          { price: `$${KAIRON_PRICING.usProMonthly}/mes`, label: "Estados Unidos" },
        ],
      };

  return (
    <Section tone="white" id="precio">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-5">
          <SectionHeader eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.body} />
          <p className="mt-4 text-sm font-medium text-[#12786B]">{copy.trial}</p>
        </div>
        <div className="lg:col-span-7">
          <div className="grid gap-px border border-border bg-border md:grid-cols-2">
            {copy.plans.map((plan) => (
              <div key={plan.label} className="bg-[color:var(--color-surface)] p-7 md:p-8">
                <p className="font-display text-4xl md:text-5xl font-semibold text-foreground">{plan.price}</p>
                <p className="mt-3 font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-[#12786B]">
                  {plan.label}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <CTAExternal
              href={ctaUrl}
              variant="primary"
              analyticsLabel="home_pricing_try_kairon"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackAppCta(locale, "home_pricing")}
            >
              {campaign.primaryCta}
            </CTAExternal>
            <CTALink to={lp("/precios", locale)} variant="secondary" analyticsLabel="home_pricing_details">
              {copy.cta}
            </CTALink>
          </div>
        </div>
      </div>
    </Section>
  );
}

function SecondaryPathways() {
  const { locale } = useLocale();
  const copy = locale === "en"
    ? {
        eyebrow: "FOR TEAMS, INVESTORS, AND BUILDERS",
        title: "KAIRON is the product. These are the paths around it.",
        body: "Most visitors should try the MVP. If you're exploring G-Structure from another angle, these paths stay available without competing with the product.",
        links: [
          { label: "Bring the workshop to your company", to: "/enterprise" },
          { label: "Investor information", to: "/inversores" },
          { label: "Support the launch", to: "/apoya-el-lanzamiento" },
          { label: "Join the team", to: "/unete-al-equipo" },
        ],
      }
    : {
        eyebrow: "PARA EQUIPOS, INVERSORES Y BUILDERS",
        title: "KAIRON es el producto. Estos son los caminos alrededor.",
        body: "La mayoría de visitantes debería probar el MVP. Si estás explorando G-Structure desde otro ángulo, estos caminos siguen disponibles sin competir con el producto.",
        links: [
          { label: "Llevar el workshop a tu empresa", to: "/enterprise" },
          { label: "Información para inversores", to: "/inversores" },
          { label: "Apoyar el lanzamiento", to: "/apoya-el-lanzamiento" },
          { label: "Unirse al equipo", to: "/unete-al-equipo" },
        ],
      };

  return (
    <Section tone="muted">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <SectionHeader eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.body} />
        </div>
        <div className="lg:col-span-7">
          <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
            {copy.links.map((link) => (
              <Link
                key={link.label}
                to={lp(link.to, locale)}
                className="group flex items-center justify-between gap-4 bg-[color:var(--color-surface)] p-5 font-display text-base font-semibold text-foreground hover:bg-white"
              >
                {link.label}
                <ArrowRight size={16} className="text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function Founder() {
  const { locale } = useLocale();
  const c = COPY[locale].founder;
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
        <aside className="lg:col-span-4 lg:order-1 order-2 flex justify-center lg:justify-start">
          <GuillermoPortrait size="md" />
        </aside>
        <div className="lg:col-span-8 lg:order-2 order-1">
          <SectionHeader
            eyebrow={c.eyebrow}
            title={c.title}
          />
          <div className="mt-6 space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
            <p>{c.body}</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {c.credentials.map((cr) => (
              <span
                key={cr}
                className="border border-border bg-[color:var(--color-surface)] px-3 py-1.5 text-[11.5px] tracking-wide text-foreground/80"
              >
                {cr}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <CTAExternal href="https://wa.me/593986875121" variant="primary">{c.ctaTalk}</CTAExternal>
            <CTALink to={lp("/sobre-guillermo", locale)} variant="outline">{c.ctaProfile}</CTALink>
          </div>
        </div>
      </div>
    </Section>
  );
}

function ValidationChannels() {
  const { locale } = useLocale();
  const c = COPY[locale].channels;
  return (
    <Section tone="muted" id="canales">
      <SectionHeader
        eyebrow={c.eyebrow}
        title={c.title}
        subtitle={c.subtitle}
      />
      <div className="mt-12 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-4 border border-border">
        {c.items.map((item) => (
          <div key={item.t} className="relative flex flex-col bg-[color:var(--color-surface)] p-7">
            <span className="font-display text-[10px] font-semibold tracking-[0.22em] text-[color:var(--color-brand)]">{item.tag}</span>
            <h3 className="mt-3 font-display text-lg md:text-xl font-semibold leading-snug">{item.t}</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.d}</p>
            <div className="mt-auto pt-6">
              <Link to={lp(item.esTo, locale)} className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-foreground">
                {item.cta} <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-8 max-w-3xl text-xs md:text-[13px] text-muted-foreground leading-relaxed">
        {c.footer}
      </p>
    </Section>
  );
}

function StartupStage() {
  const { locale } = useLocale();
  const c = COPY[locale].startup;
  return (
    <Section tone="white">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-3xl md:text-4xl leading-[1.08]">
            {c.title}
          </h2>
          <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
            {c.lead}
          </p>
        </div>
        <div className="lg:col-span-7">
          <ul className="border border-border bg-[color:var(--color-surface)] divide-y divide-border">
            {c.routes.map((r) => (
              <li key={r.tag}>
                <Link to={lp(r.esTo, locale)} className="group flex items-center justify-between gap-6 px-6 py-5 hover:bg-[color:var(--color-brand-soft)]/40">
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-[10px] font-semibold tracking-[0.22em] text-muted-foreground w-28 shrink-0">
                      {r.tag}
                    </span>
                    <span className="font-display text-base md:text-lg font-semibold text-foreground">{r.t}</span>
                  </div>
                  <ArrowRight size={16} className="text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-foreground" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

function CompanyUpdate() {
  const { locale } = useLocale();
  const copy = locale === "en"
    ? {
        eyebrow: "COMPANY UPDATE",
        title: "G-Structure is now legally incorporated in Ecuador.",
        body: "Our public brand remains G-Structure. Our main product remains KAIRON. SUCOSTRUCT S.A.S. B.I.C. is the legal structure that allows us to operate, partner, validate, and scale with greater clarity.",
        legal: "Commercial name: G-Structure · Legal name: SUCOSTRUCT S.A.S. B.I.C.",
        cta: "Read the update",
        to: "/en/articles/g-structure-legally-incorporated-ecuador-sucostruct",
      }
    : {
        eyebrow: "ACTUALIZACIÓN DE COMPAÑÍA",
        title: "G-Structure formaliza su estructura legal en Ecuador.",
        body: "Nuestra marca comercial sigue siendo G-Structure. Nuestro producto principal sigue siendo KAIRON. SUCOSTRUCT S.A.S. B.I.C. es la razón social que nos permite operar, aliarnos, validar y escalar con mayor claridad.",
        legal: "Nombre comercial: G-Structure · Razón social: SUCOSTRUCT S.A.S. B.I.C.",
        cta: "Leer actualización",
        to: "/articulos/g-structure-constituida-ecuador-sucostruct",
      };

  return (
    <Section tone="white">
      <div className="border-y border-border py-8 md:py-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <Eyebrow>{copy.eyebrow}</Eyebrow>
            <h2 className="mt-3 font-display text-2xl md:text-3xl leading-tight text-foreground">
              {copy.title}
            </h2>
            <p className="mt-4 max-w-3xl text-sm md:text-base leading-relaxed text-muted-foreground">
              {copy.body}
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              {copy.legal}
            </p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Link to={copy.to as string} className="inline-flex items-center gap-2 border border-foreground px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background">
              {copy.cta}
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}

function FinalCTA() {
  const { locale } = useLocale();
  const campaign = launchCopy(locale, getLaunchPhase());
  const ctaUrl = appUrl(locale, "home_final");
  const copy = locale === "en"
    ? {
        title: "Start with KAIRON today.",
        body: "52 people already tested the MVP. Create your account, use the active product, and keep your place in the first launch cohort.",
        support: "Want to support the launch another way?",
      }
    : {
        title: "Empieza con KAIRON hoy.",
        body: "52 personas ya probaron el MVP. Crea tu cuenta, usa el producto activo y conserva tu lugar en el primer grupo del lanzamiento.",
        support: "¿Quieres apoyar el lanzamiento de otra forma?",
      };
  return (
    <Section tone="deep">
      <div className="max-w-3xl">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05]">
          {copy.title}
        </h2>
        <p className="mt-6 text-base md:text-lg text-[color:var(--color-background)]/80 leading-relaxed">
          {copy.body}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <CTAExternal
            href={ctaUrl}
            variant="inverse"
            analyticsLabel="home_final_try_kairon"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackAppCta(locale, "home_final")}
          >
            {campaign.primaryCta}
          </CTAExternal>
          <CTALink to={lp("/apoya-el-lanzamiento", locale)} variant="ghost" className="text-[color:var(--color-background)] hover:bg-[color:var(--color-background)]/10">
            {copy.support}
          </CTALink>
        </div>
      </div>
    </Section>
  );
}

function FeaturedArticles() {
  const { locale } = useLocale();
  const articles = featuredArticlesForLocale(locale);
  const copy = locale === "en"
    ? {
        eyebrow: "ARTICLES",
        title: "The thinking behind KAIRON.",
        subtitle: "Product notes, the I-R-O™ method, and essays on the cognitive-behavioral friction that blocks execution.",
        cta: "View all articles",
        to: "/en/articles",
      }
    : {
        eyebrow: "ARTÍCULOS",
        title: "El pensamiento detrás de KAIRON.",
        subtitle: "Notas de producto, método I-R-O™ y ensayos sobre la fricción cognitivo-conductual que bloquea la ejecución.",
        cta: "Ver todos los artículos",
        to: "/articulos",
      };

  return (
    <Section>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeader
          eyebrow={copy.eyebrow}
          title={copy.title}
          subtitle={copy.subtitle}
        />
        <CTALink to={copy.to as string} variant="outline">
          {copy.cta}
        </CTALink>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {articles.slice(0, 3).map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </Section>
  );
}

function HomeNews() {
  const { locale } = useLocale();
  const copy = locale === "en"
    ? {
        eyebrow: "GOOD NEWS",
        title: "Two signals from the next stage.",
        subtitle:
          "A quick look at what is moving: G-Structure is legally incorporated in Ecuador, and the launch will happen inside Ecuador Tech Week 2026.",
        items: [
          {
            label: "Company update",
            title: "G-Structure is now legally incorporated in Ecuador.",
            body: "The public brand remains G-Structure. KAIRON remains the main product. SUCOSTRUCT S.A.S. B.I.C. is the legal structure behind the next stage.",
            to: "/en/articles/g-structure-legally-incorporated-ecuador-sucostruct",
            cta: "Read the update",
            external: false,
          },
          {
            label: "Launch milestone",
            title: "G-Structure is part of Ecuador Tech Week 2026.",
            body: "On July 14, G-Structure will present the Execution Diagnostic Workshop in Guayaquil as part of the first public validation of KAIRON.",
            to: "https://luma.com/lm4njhiu",
            cta: "See the event",
            external: true,
          },
        ],
      }
    : {
        eyebrow: "BUENAS NOTICIAS",
        title: "Dos señales de la siguiente etapa.",
        subtitle:
          "Un vistazo rápido a lo que se está moviendo: G-Structure ya tiene estructura legal en Ecuador y el lanzamiento será dentro de Ecuador Tech Week 2026.",
        items: [
          {
            label: "Actualización de compañía",
            title: "G-Structure formaliza su estructura legal en Ecuador.",
            body: "La marca comercial sigue siendo G-Structure. KAIRON sigue siendo el producto principal. SUCOSTRUCT S.A.S. B.I.C. es la razón social detrás de la siguiente etapa.",
            to: "/articulos/g-structure-constituida-ecuador-sucostruct",
            cta: "Leer actualización",
            external: false,
          },
          {
            label: "Hito de lanzamiento",
            title: "G-Structure será parte de Ecuador Tech Week 2026.",
            body: "El 14 de julio, G-Structure presentará el Workshop de Diagnóstico de Ejecución en Guayaquil como parte de la primera validación pública de KAIRON.",
            to: "https://luma.com/lm4njhiu",
            cta: "Ver evento",
            external: true,
          },
        ],
      };

  return (
    <Section>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeader eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />
        <CTALink to={locale === "en" ? "/en/articles" : "/articulos"} variant="outline">
          {locale === "en" ? "View articles" : "Ver artículos"}
        </CTALink>
      </div>
      <div className="mt-10 grid gap-px border border-border bg-border md:grid-cols-2">
        {copy.items.map((item) => {
          const content = (
            <>
              <p className="eyebrow text-[10px]">{item.label}</p>
              <h3 className="mt-4 font-display text-2xl leading-tight text-foreground">{item.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground">
                {item.cta}
                {item.external ? <ExternalLink size={14} /> : <ArrowRight size={14} />}
              </span>
            </>
          );

          return item.external ? (
            <a
              key={item.title}
              href={item.to}
              target="_blank"
              rel="noreferrer"
              className="group block bg-[color:var(--color-surface)] p-6 transition-colors hover:bg-background md:p-8"
            >
              {content}
            </a>
          ) : (
            <Link
              key={item.title}
              to={item.to}
              className="group block bg-[color:var(--color-surface)] p-6 transition-colors hover:bg-background md:p-8"
            >
              {content}
            </Link>
          );
        })}
      </div>
    </Section>
  );
}

function HomeMomentum() {
  const { locale } = useLocale();
  const copy = locale === "en"
    ? {
        eyebrow: "MOMENTUM",
        title: "Two signals from the next stage.",
        subtitle:
          "G-Structure is moving from local validation into a regional startup stage: CodeLaunch LATAM 2026 and Ecuador Tech Week 2026.",
        articlesCta: "View articles",
        items: [
          {
            label: "Startup milestone",
            title: "CodeLaunch LATAM 2026 semifinalist.",
            body: "G-Structure is waiting to see whether it will be selected for the Guadalajara finals on October 14. If we win that stage, we could advance to Dallas on November 12.",
            to: "/en/articles/g-structure-selected-codelaunch-latam-2026",
            cta: "Read the news",
            external: false,
            image: codeLaunchAnnouncement,
            imageAlt: "G-Structure CodeLaunch LATAM 2026 semifinalist announcement",
          },
          {
            label: "Launch milestone",
            title: "G-Structure is part of Ecuador Tech Week 2026.",
            body: "On July 14, G-Structure will present the Execution Diagnostic Workshop in Guayaquil as part of the first public validation of KAIRON.",
            to: ETW_URL,
            cta: "Register on Luma",
            external: true,
            image: etwBadge,
            imageAlt: "Official Host badge for Ecuador Tech Week 2026",
          },
        ],
      }
    : {
        eyebrow: "MOMENTUM",
        title: "Dos señales de la siguiente etapa.",
        subtitle:
          "G-Structure está pasando de validación local a una etapa regional de startup: CodeLaunch LATAM 2026 y Ecuador Tech Week 2026.",
        articlesCta: "Ver artículos",
        items: [
          {
            label: "Hito startup",
            title: "Semifinalistas de CodeLaunch LATAM 2026.",
            body: "G-Structure espera saber si será seleccionada para las finales en Guadalajara el 14 de octubre. Si ganamos esa etapa, podríamos avanzar a Dallas el 12 de noviembre.",
            to: "/articulos/g-structure-seleccionada-codelaunch-latam-2026",
            cta: "Leer noticia",
            external: false,
            image: codeLaunchAnnouncement,
            imageAlt: "Anuncio de G-Structure como semifinalista de CodeLaunch LATAM 2026",
          },
          {
            label: "Hito de lanzamiento",
            title: "G-Structure será parte de Ecuador Tech Week 2026.",
            body: "El 14 de julio, G-Structure presentará el Workshop de Diagnóstico de Ejecución en Guayaquil como parte de la primera validación pública de KAIRON.",
            to: ETW_URL,
            cta: "Registrarme en Luma",
            external: true,
            image: etwBadge,
            imageAlt: "Badge oficial Host Ecuador Tech Week 2026",
          },
        ],
      };

  return (
    <Section>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeader eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />
        <CTALink to={locale === "en" ? "/en/articles" : "/articulos"} variant="outline">
          {copy.articlesCta}
        </CTALink>
      </div>
      <div className="mt-10 grid gap-px border border-border bg-border md:grid-cols-2">
        {copy.items.map((item) => {
          const content = (
            <>
              <div className="aspect-[16/10] overflow-hidden bg-[color:var(--color-brand)]">
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
              <div className="p-6 md:p-8">
                <p className="eyebrow text-[10px]">{item.label}</p>
                <h3 className="mt-4 font-display text-2xl leading-tight text-foreground">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground">
                  {item.cta}
                  {item.external ? <ExternalLink size={14} /> : <ArrowRight size={14} />}
                </span>
              </div>
            </>
          );

          return item.external ? (
            <a
              key={item.title}
              href={item.to}
              target="_blank"
              rel="noreferrer"
              className="group block bg-[color:var(--color-surface)] transition-colors hover:bg-background"
            >
              {content}
            </a>
          ) : (
            <Link
              key={item.title}
              to={item.to}
              className="group block bg-[color:var(--color-surface)] transition-colors hover:bg-background"
            >
              {content}
            </Link>
          );
        })}
      </div>
    </Section>
  );
}

export function Index() {
  // Keep MentalOS/Solutions/ForWhom available for layouts that want them later.
  void MentalOS;
  void Solutions;
  void ForWhom;
  void Problem;
  void FrictionQuiz;
  void WaitlistForm;
  void ValidationChannels;
  void ETWBanner;
  void FAQSection;
  void CompanyUpdate;
  void FeaturedArticles;
  void StartupStage;
  void HomeMomentum;
  return (
    <>
      <Hero />
      <ProductTeaser />
      <Problem />
      <NocturnoSection />
      <ValidationTraction />
      <PricingSection />
      <SecondaryPathways />
      <FinalCTA />
    </>
  );
}
