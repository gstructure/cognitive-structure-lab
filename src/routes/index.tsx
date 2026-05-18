import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Handshake, Users, Calendar, MapPin, ExternalLink, Sparkles } from "lucide-react";
import { Section } from "@/components/site/Section";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Eyebrow } from "@/components/site/Eyebrow";
import { Reveal } from "@/components/site/Reveal";
import { MethodTabs } from "@/components/site/MethodTabs";
import { FAQ } from "@/components/site/FAQ";
import { BriefDownloadCard } from "@/components/site/BriefDownloadCard";
import { FrictionQuiz } from "@/components/site/FrictionQuiz";
import { WaitlistForm } from "@/components/site/WaitlistForm";
import { SocialProofBar } from "@/components/site/SocialProofBar";

import { CTALink, CTAExternal } from "@/components/site/CTAButton";
import { BrandMark } from "@/components/brand/Logo";
import { GuillermoPortrait } from "@/components/site/GuillermoPortrait";
import { useT, useLocale, type Locale } from "@/lib/i18n";
import { ROUTES } from "@/lib/routeMap";
import logoCube from "@/assets/g-structure-cube.webp";
import gStructHomePreview from "@/assets/g-struct-home-preview.webp";
import etwBadge from "@/assets/etw-2026-badge.webp";
import { buildSeo, canonicalLink, jsonLdScript, faqSchema, breadcrumbSchema } from "@/lib/seo";

const ETW_URL = "https://luma.com/lm4njhiu";

// Helper: resolve a Spanish canonical path to current-locale path.
function lp(esPath: string, locale: Locale): string {
  const entry = ROUTES.find((r) => r.es === esPath);
  if (!entry) return esPath;
  return entry[locale];
}

const HOME_FAQ = [
  { q: "¿Qué es G-Structure?", a: "Una tech startup construyendo G-Struct: una plataforma cognitivo-conductual de ejecución profesional impulsada por el método I-R-O™." },
  { q: "¿G-Structure ofrece terapia?", a: "No. G-Structure es coaching cognitivo-conductual aplicado a contextos de ejecución profesional. No sustituye atención clínica ni psicoterapia." },
  { q: "¿Qué es el método I-R-O™?", a: "Identificar, Reencuadrar y Optimizar: el framework propietario que impulsa G-Struct y convierte fricción cognitivo-conductual en acción funcional." },
  { q: "¿Qué es G-Struct?", a: "El producto principal de G-Structure: una app en desarrollo para diagnosticar patrones de ejecución, reencuadrarlos y sostener acciones concretas antes del lanzamiento Q3 2026." },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: buildSeo({
      path: "/",
      title: "G-Structure | G-Struct · Método I-R-O™ · Startup de ejecución profesional",
      description:
        "G-Structure es una tech startup construyendo G-Struct, una plataforma cognitivo-conductual de ejecución profesional impulsada por el método I-R-O™. 1:1, Enterprise y workshops son canales de validación.",
      image: gStructHomePreview,
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
      linkWaitlist: "Únete a la waitlist de G-Struct",
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
      ctaPartner: "Quiero ser aliado",
      micro: "#SoyHost · Compartimos el propósito de hacer del Ecuador un referente tecnológico regional.",
      badgeAlt: "Badge oficial Host Ecuador Tech Week 2026 — G-Structure",
    },
    announcements: {
      eyebrow: "MOMENTUM",
      title: "Construyendo la siguiente etapa de G-Structure.",
      subtitle: "Estamos abriendo espacios estratégicos para aliados y colaboradores que quieran ser parte del crecimiento inicial del ecosistema G-Structure.",
      allies: {
        tag: "ALIADOS ETW 2026",
        title: "Aliados para el Workshop de Diagnóstico de Ejecución",
        body: "G-Structure está abriendo oportunidades de alianza para marcas, instituciones y empresas que quieran vincularse al Workshop de Diagnóstico de Ejecución durante Ecuador Tech Week 2026.",
        short: "Buscamos aliados que entiendan el valor de apoyar conversaciones serias sobre ejecución, claridad, tecnología, emprendimiento y desarrollo profesional.",
        cta: "Quiero ser aliado",
        micro: "Espacios limitados para aliados estratégicos, experiencia, sede o contenido.",
      },
      team: {
        tag: "EQUIPO INICIAL",
        title: "Estamos formando el equipo que construirá G-Structure y G-Struct",
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
        { t: "Procrastinación", d: "Cuando la acción se posterga aunque la tarea sea importante.", reveal: "¿Lo pospones aunque sabes que es importante? G-Struct trabaja este patrón." },
        { t: "Perfeccionismo improductivo", d: "Cuando el estándar se vuelve una excusa elegante para no avanzar.", reveal: "¿El estándar se volvió una excusa elegante? Hay un patrón detrás de eso." },
        { t: "Sobreanálisis", d: "Cuando pensar más deja de aclarar y empieza a paralizar.", reveal: "¿Pensar más dejó de ayudar? Eso tiene una estructura cognitiva específica." },
        { t: "Autosabotaje", d: "Cuando la conducta contradice el objetivo que la persona dice querer.", reveal: "¿Tu conducta contradice tu objetivo? El Motor de Reestructuración mapea por qué." },
        { t: "Bloqueo de ejecución", d: "Cuando hay intención, pero no hay salida funcional a la acción.", reveal: "¿Hay intención pero no hay salida? G-Struct convierte eso en acción." },
      ],
    },
    method: {
      eyebrow: "EL MÉTODO PROPIETARIO",
      title: "I-R-O™: Identificar. Reencuadrar. Optimizar.",
      lead: "El framework que impulsa G-Struct: una secuencia estructurada para convertir fricción cognitivo-conductual en acción funcional. Selecciona cada fase para ver el detalle.",
      footnote: "El método I-R-O™ está basado en principios de la Terapia Cognitivo-Conductual (CBT), adaptados a contextos de ejecución profesional. No constituye terapia ni sustituye atención clínica. I-R-O™ Method es un framework propietario desarrollado por G-Structure.",
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
      tag: "EL PRODUCTO · G-STRUCT",
      pill: "PROTOTIPO ACTIVO · LANZAMIENTO Q3 2026",
      h2: "G-Struct es el producto principal de G-Structure.",
      lead: (
        <>
          Una app diseñada para convertir el método <strong className="text-foreground">I-R-O™: Identificar → Reencuadrar → Optimizar</strong> en
          una herramienta diaria de ejecución para profesionales, founders y equipos.
        </>
      ),
      disclaimer: "No somos una app de terapia. No hacemos diagnóstico clínico. G-Struct es una herramienta de coaching, psicoeducación y optimización de ejecución basada en principios cognitivo-conductuales.",
      p1: "G-Struct lleva el método I-R-O™ a tu bolsillo. Una app móvil diseñada para identificar la fricción que bloquea tu ejecución, reencuadrarla con metodología CBT coaching, y optimizar tu acción — disponible 24/7.",
      p2: "No es una app de bienestar. No es un diario de pensamientos. No es otra lista de tareas. Es la herramienta que separa a quienes saben lo que hay que hacer de quienes realmente lo hacen.",
      previewAlt: "Vista previa de la app G-Struct.",
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
      ctaSub: "Sé parte del primer grupo que accede a G-Struct en Ecuador.",
    },
    founder: {
      eyebrow: "QUIÉN ESTÁ DETRÁS",
      title: "Dirección metodológica con experiencia educativa, cognitivo-conductual y de proyectos.",
      body: (
        <>
          <strong className="text-foreground font-semibold">Guillermo Suco</strong> es fundador
          y CEO de G-Structure, creador de G-Struct y del método I-R-O™. Su trabajo integra
          Psicología, intervención educativa, validación con usuarios, gerencia de proyectos
          multiculturales y desarrollo de producto digital.
        </>
      ),
      credentials: [
        "CBT Coach Practitioner · CTAA",
        "Psicología & Intervención Educativa",
        "Docencia internacional",
        "MV Logos Hope · gerencia de proyectos",
        "G-Struct con ÉPICO",
      ],
      ctaTalk: "Conversar con Guillermo",
      ctaProfile: "Ver perfil",
    },
    channels: {
      eyebrow: "CÓMO ESTAMOS VALIDANDO G-STRUCT",
      title: "No son negocios separados. Son capas de una misma estrategia.",
      subtitle: "G-Structure no opera tres negocios separados: usa 1:1, Enterprise y workshops como canales de validación, datos cualitativos y revenue temprano para construir G-Struct como producto digital escalable.",
      items: [
        { tag: "01 · CANAL INDIVIDUAL", t: "REESTRUCTURA 1:1", d: "Sesiones individuales que validan el método I-R-O™ con profesionales, líderes y emprendedores que enfrentan fricción de ejecución.", esTo: "/reestructura-1-1", cta: "Conocer 1:1" },
        { tag: "02 · CANAL B2B", t: "REESTRUCTURA Enterprise", d: "Programa B2B para mapear patrones de ejecución en equipos, founders y organizaciones — y generar revenue temprano para la startup.", esTo: "/enterprise", cta: "Conocer Enterprise" },
        { tag: "03 · CANAL DE ACTIVACIÓN", t: "Workshop de Diagnóstico de Ejecución", d: "Experiencia grupal diseñada para educar, diagnosticar patrones de ejecución y activar usuarios tempranos para G-Struct.", esTo: "/aliados-etw-2026", cta: "Workshop · ETW 2026" },
        { tag: "04 · PRODUCTO ESCALABLE", t: "G-Struct App", d: "El producto digital que escala la metodología. Lo que aprendemos en los canales anteriores alimenta directamente su construcción.", esTo: "/g-struct", cta: "Explorar G-Struct" },
      ],
      footer: (
        <>
          Compañía: <strong className="text-foreground">G-Structure</strong> · Producto principal: <strong className="text-foreground">G-Struct</strong> ·
          Canales de validación: <strong className="text-foreground">1:1, Enterprise, Workshop</strong> · Crecimiento: aliados, inversores y equipo.
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
      title: "De prototipo a MVP, con una tesis clara.",
      lead: (
        <>
          G-Structure se encuentra en etapa de validación, construyendo el camino de prototipo a MVP.
          El objetivo es convertir <strong className="text-foreground">G-Struct</strong>, impulsado por el método I-R-O™,
          en una plataforma escalable para profesionales, founders y equipos que necesitan ejecutar mejor bajo presión.
        </>
      ),
      routes: [
        { tag: "USUARIOS", t: "Probar o conocer G-Struct", esTo: "/g-struct" },
        { tag: "EMPRESAS", t: "Llevar Enterprise a tu equipo", esTo: "/enterprise" },
        { tag: "INVERSIONISTAS", t: "Revisar la oportunidad de inversión", esTo: "/inversores" },
        { tag: "ALIADOS", t: "Sumarse al ecosistema · ETW 2026", esTo: "/aliados-etw-2026" },
        { tag: "TALENTO", t: "Unirse al equipo fundador", esTo: "/unete-al-equipo" },
      ],
    },
    finalCTA: {
      title: "G-Structure está construyendo G-Struct. Decide cómo quieres ser parte.",
      body: "Únete a la waitlist del producto, lleva la metodología a tu equipo, conoce la oportunidad de inversión, o conversa con nosotros directamente.",
      ctaExplore: "Explorar G-Struct",
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
          "Si no es perfecto, no lo entrego." → <span className="font-semibold">Avanzar con criterio reduce el costo de no decidir.</span>
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
      { t: "REESTRUCTURA Enterprise", d: "Programa piloto de 4 semanas para trabajar patrones de procrastinación, perfeccionismo, sobreanálisis y autosabotaje en equipos.", ideal: "Organizaciones que necesitan mejorar claridad, toma de decisiones y consistencia conductual.", cta: "Solicitar información", esTo: "/enterprise" },
      { t: "REESTRUCTURA 1:1", d: "Proceso individual de coaching cognitivo-conductual para profesionales que necesitan intervenir sus propios bloqueos de ejecución.", ideal: "Líderes, emprendedores y profesionales que quieren trabajar su patrón personal de acción.", cta: "Conocer proceso individual", esTo: "/reestructura-1-1" },
      { t: "Continuidad Enterprise", d: "Seguimiento mensual o trimestral para consolidar avances, revisar patrones recurrentes y sostener cambios en la ejecución.", ideal: "Equipos que necesitan mantener el trabajo después de una intervención inicial.", cta: "Diseñar continuidad", esTo: "/enterprise" },
    ],
  },
  en: {
    hero: {
      linkQuiz: "Identify your execution pattern",
      linkWaitlist: "Join the G-Struct waitlist",
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
      ctaPartner: "I want to be a partner",
      micro: "#SoyHost · We share the purpose of making Ecuador a regional tech reference.",
      badgeAlt: "Official Host badge — Ecuador Tech Week 2026 — G-Structure",
    },
    announcements: {
      eyebrow: "MOMENTUM",
      title: "Building the next stage of G-Structure.",
      subtitle: "We're opening strategic spaces for partners and collaborators who want to be part of the early growth of the G-Structure ecosystem.",
      allies: {
        tag: "ETW 2026 PARTNERS",
        title: "Partners for the Execution Diagnostic Workshop",
        body: "G-Structure is opening partnership opportunities for brands, institutions, and companies that want to connect with the Execution Diagnostic Workshop during Ecuador Tech Week 2026.",
        short: "We're looking for partners who understand the value of supporting serious conversations about execution, clarity, technology, entrepreneurship, and professional development.",
        cta: "I want to be a partner",
        micro: "Limited spaces for strategic, experience, venue, or content partners.",
      },
      team: {
        tag: "FOUNDING TEAM",
        title: "We're forming the team that will build G-Structure and G-Struct",
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
        { t: "Procrastination", d: "When action is postponed even when the task is important.", reveal: "Postponing it even though you know it's important? G-Struct works this pattern." },
        { t: "Unproductive perfectionism", d: "When the standard becomes an elegant excuse not to move forward.", reveal: "Has the standard become an elegant excuse? There's a pattern behind that." },
        { t: "Overthinking", d: "When thinking more stops clarifying and starts to paralyze.", reveal: "Thinking more stopped helping? That has a specific cognitive structure." },
        { t: "Self-sabotage", d: "When behavior contradicts the goal the person says they want.", reveal: "Behavior contradicting your goal? The Restructuring Engine maps why." },
        { t: "Execution block", d: "When there's intent, but no functional exit toward action.", reveal: "Intent but no exit? G-Struct turns that into action." },
      ],
    },
    method: {
      eyebrow: "THE PROPRIETARY METHOD",
      title: "I-R-O™: Identify. Reframe. Optimize.",
      lead: "The framework that powers G-Struct: a structured sequence to turn cognitive-behavioral friction into functional action. Select each phase to see the detail.",
      footnote: "The I-R-O™ Method is based on Cognitive-Behavioral Therapy (CBT) principles, adapted to professional execution contexts. It is not therapy and does not replace clinical care. I-R-O™ Method is a proprietary framework developed by G-Structure.",
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
      tag: "THE PRODUCT · G-STRUCT",
      pill: "ACTIVE PROTOTYPE · LAUNCH Q3 2026",
      h2: "G-Struct is the main product of G-Structure.",
      lead: (
        <>
          An app designed to turn the <strong className="text-foreground">I-R-O™: Identify → Reframe → Optimize</strong> method
          into a daily execution tool for professionals, founders, and teams.
        </>
      ),
      disclaimer: "We're not a therapy app. We don't make clinical diagnoses. G-Struct is a coaching, psychoeducation, and execution-optimization tool based on cognitive-behavioral principles.",
      p1: "G-Struct brings the I-R-O™ Method to your pocket. A mobile app designed to identify the friction blocking your execution, reframe it with CBT coaching methodology, and optimize your action — available 24/7.",
      p2: "It's not a wellness app. It's not a thought journal. It's not another to-do list. It's the tool that separates those who know what to do from those who actually do it.",
      previewAlt: "Preview of the G-Struct app.",
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
      ctaSub: "Be part of the first group with access to G-Struct in Ecuador.",
    },
    founder: {
      eyebrow: "WHO'S BEHIND THIS",
      title: "Methodological direction with educational, cognitive-behavioral, and project experience.",
      body: (
        <>
          <strong className="text-foreground font-semibold">Guillermo Suco</strong> is the founder
          and CEO of G-Structure, creator of G-Struct and the I-R-O™ Method. His work integrates
          Psychology, educational intervention, user validation, multicultural project management,
          and digital product development.
        </>
      ),
      credentials: [
        "CBT Coach Practitioner · CTAA",
        "Psychology & Educational Intervention",
        "International teaching",
        "MV Logos Hope · project management",
        "G-Struct with ÉPICO",
      ],
      ctaTalk: "Talk to Guillermo",
      ctaProfile: "View profile",
    },
    channels: {
      eyebrow: "HOW WE'RE VALIDATING G-STRUCT",
      title: "They're not separate businesses. They're layers of one strategy.",
      subtitle: "G-Structure is not operating three separate businesses: it uses 1:1, Enterprise, and workshops as validation, qualitative data, and early revenue channels to build G-Struct as the scalable digital product.",
      items: [
        { tag: "01 · INDIVIDUAL CHANNEL", t: "RESTRUCTURE 1:1", d: "Individual sessions that validate the I-R-O™ Method with professionals, leaders, and entrepreneurs facing execution friction.", esTo: "/reestructura-1-1", cta: "Learn about 1:1" },
        { tag: "02 · B2B CHANNEL", t: "RESTRUCTURE Enterprise", d: "B2B program to map execution patterns in teams, founders, and organizations — and generate early revenue for the startup.", esTo: "/enterprise", cta: "Learn about Enterprise" },
        { tag: "03 · ACTIVATION CHANNEL", t: "Execution Diagnostic Workshop", d: "Group experience designed to educate, diagnose execution patterns, and activate early users for G-Struct.", esTo: "/aliados-etw-2026", cta: "Workshop · ETW 2026" },
        { tag: "04 · SCALABLE PRODUCT", t: "G-Struct App", d: "The digital product that scales the methodology. What we learn in the previous channels feeds directly into its construction.", esTo: "/g-struct", cta: "Explore G-Struct" },
      ],
      footer: (
        <>
          Company: <strong className="text-foreground">G-Structure</strong> · Main product: <strong className="text-foreground">G-Struct</strong> ·
          Validation channels: <strong className="text-foreground">1:1, Enterprise, Workshop</strong> · Growth: partners, investors, and team.
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
      title: "From prototype to MVP, with a clear thesis.",
      lead: (
        <>
          G-Structure is in a validation stage, building the path from prototype to MVP.
          The goal is to turn <strong className="text-foreground">G-Struct</strong>, powered by the I-R-O™ Method,
          into a scalable platform for professionals, founders, and teams who need to execute better under pressure.
        </>
      ),
      routes: [
        { tag: "USERS", t: "Try or learn about G-Struct", esTo: "/g-struct" },
        { tag: "COMPANIES", t: "Bring Enterprise to your team", esTo: "/enterprise" },
        { tag: "INVESTORS", t: "Review the investment opportunity", esTo: "/inversores" },
        { tag: "PARTNERS", t: "Join the ecosystem · ETW 2026", esTo: "/aliados-etw-2026" },
        { tag: "TALENT", t: "Join the founding team", esTo: "/unete-al-equipo" },
      ],
    },
    finalCTA: {
      title: "G-Structure is building G-Struct. Decide how you want to be part of it.",
      body: "Join the product waitlist, bring the methodology to your team, learn about the investment opportunity, or talk to us directly.",
      ctaExplore: "Explore G-Struct",
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
          "If it's not perfect, I won't ship it." → <span className="font-semibold">Moving forward with judgment reduces the cost of not deciding.</span>
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
      { t: "RESTRUCTURE Enterprise", d: "4-week pilot program to work on procrastination, perfectionism, overthinking, and self-sabotage patterns in teams.", ideal: "Organizations that need to improve clarity, decision-making, and behavioral consistency.", cta: "Request information", esTo: "/enterprise" },
      { t: "RESTRUCTURE 1:1", d: "Individual cognitive-behavioral coaching process for professionals who need to intervene on their own execution blocks.", ideal: "Leaders, entrepreneurs, and professionals who want to work on their personal action pattern.", cta: "Learn about 1:1 process", esTo: "/reestructura-1-1" },
      { t: "Enterprise Continuity", d: "Monthly or quarterly follow-up to consolidate progress, review recurring patterns, and sustain execution changes.", ideal: "Teams that need to sustain the work after an initial intervention.", cta: "Design continuity", esTo: "/enterprise" },
    ],
  },
} as const;

// =============================================================================
// Sections
// =============================================================================

function Hero() {
  const t = useT();
  const { locale } = useLocale();
  const c = COPY[locale].hero;
  const steps = [
    { n: "01", t: t("home.hero.step1.t"), d: t("home.hero.step1.d") },
    { n: "02", t: t("home.hero.step2.t"), d: t("home.hero.step2.d") },
    { n: "03", t: t("home.hero.step3.t"), d: t("home.hero.step3.d") },
  ];
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden="true" />
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(1200px 600px at 85% 10%, color-mix(in oklch, var(--color-brand) 10%, transparent), transparent 60%), radial-gradient(900px 500px at 0% 100%, color-mix(in oklch, var(--color-brand-deep) 8%, transparent), transparent 55%)",
        }}
      />
      <div
        className="absolute left-0 right-0 top-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, color-mix(in oklch, var(--color-brand) 30%, transparent), transparent)" }}
        aria-hidden="true"
      />

      <div className="container-x relative py-16 md:py-24 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10 lg:items-center">
          <div className="lg:col-span-7">
            <a
              href={ETW_URL}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 border border-foreground/15 bg-[color:var(--color-surface)]/85 backdrop-blur px-3.5 py-2.5 shadow-[0_1px_0_0_rgba(5,50,90,0.04),0_8px_24px_-12px_rgba(5,50,90,0.18)] transition-all hover:border-foreground/35 hover:-translate-y-0.5"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--color-brand)] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--color-brand)]" />
              </span>
              <span className="text-[10px] font-semibold tracking-[0.22em] text-foreground">
                {t("home.hero.pillTitle")}
              </span>
              <span className="hidden sm:inline text-[11px] tracking-wide text-muted-foreground">
                {t("home.hero.pillSub")}
              </span>
              <ArrowUpRight size={14} className="text-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <Eyebrow className="mt-8">{t("home.hero.eyebrow")}</Eyebrow>
            <h1 className="mt-5 max-w-2xl text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.04] text-foreground">
              {t("home.hero.h1")}
            </h1>
            <p className="mt-5 max-w-xl text-base md:text-lg text-foreground/85 leading-relaxed">
              {t("home.hero.lead")}
            </p>
            <p className="mt-5 max-w-xl text-[15px] md:text-base text-muted-foreground leading-relaxed">
              {t("home.hero.sub")}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <CTALink to={lp("/g-struct", locale)} variant="primary">{t("home.hero.ctaPrimary")}</CTALink>
              <CTALink to={lp("/inversores", locale)} variant="outline">{t("home.hero.ctaSecondary")}</CTALink>
            </div>

            <ul className="mt-8 grid gap-2 text-[13.5px] sm:grid-cols-2 max-w-xl">
              <li>
                <Link to={lp("/", locale)} hash="quiz" className="group inline-flex items-center gap-2 text-foreground/85 hover:text-foreground">
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  {c.linkQuiz}
                </Link>
              </li>
              <li>
                <Link to={lp("/", locale)} hash="lista-de-espera" className="group inline-flex items-center gap-2 text-foreground/85 hover:text-foreground">
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  {c.linkWaitlist}
                </Link>
              </li>
              <li>
                <Link to={lp("/enterprise", locale)} className="group inline-flex items-center gap-2 text-foreground/85 hover:text-foreground">
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  {c.linkEnterprise}
                </Link>
              </li>
              <li>
                <Link to={lp("/inversores", locale)} className="group inline-flex items-center gap-2 text-foreground/85 hover:text-foreground">
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  {c.linkInvestors}
                </Link>
              </li>
            </ul>

            <div className="mt-12 grid gap-3 sm:grid-cols-3">
              {steps.map((s) => (
                <div
                  key={s.n}
                  className="group relative border border-border bg-[color:var(--color-surface)] p-4 transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-18px_rgba(5,50,90,0.35)]"
                >
                  <div
                    className="absolute left-0 top-0 h-px w-8"
                    style={{ background: "var(--color-brand)" }}
                    aria-hidden="true"
                  />
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-[11px] font-semibold tracking-[0.22em] text-muted-foreground">
                      {s.n}
                    </span>
                    <span className="font-display text-sm font-semibold text-foreground">
                      {s.t}
                    </span>
                  </div>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-muted-foreground">{s.d}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative lg:col-span-5 hidden lg:block">
            <HeroVisual />
          </div>
        </div>

        <div className="mt-14 lg:hidden">
          <HeroVisual compact />
        </div>
      </div>
    </section>
  );
}

function HeroVisual({ compact = false }: { compact?: boolean }) {
  const { locale } = useLocale();
  const v = COPY[locale].visualPanels;
  return (
    <div className={`relative ${compact ? "h-[460px]" : "h-[600px]"} w-full`}>
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(420px 280px at 75% 12%, color-mix(in oklch, var(--color-brand) 16%, transparent), transparent 70%), radial-gradient(360px 260px at 10% 95%, color-mix(in oklch, var(--color-brand-deep) 14%, transparent), transparent 70%)",
        }}
      />
      <div className="absolute inset-0 grid-bg opacity-30" aria-hidden />

      <div className="absolute left-0 right-0 top-0 flex items-center justify-between text-[10px] tracking-[0.22em] text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 bg-[color:var(--color-brand)]" />
          {v.systemLabel}
        </span>
        <span>{v.version}</span>
      </div>

      <div className="absolute right-0 top-10 w-[78%] border border-border bg-[color:var(--color-surface)]/95 backdrop-blur shadow-elev-2 p-5 rotate-[1.5deg]">
        <div className="flex items-center justify-between">
          <span className="font-display text-[10px] font-semibold tracking-[0.22em] text-muted-foreground">{v.p3Label}</span>
          <span className="text-[10px] tracking-wide text-muted-foreground">{v.p3Subtitle}</span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {v.p3Buttons.map((b) => (
            <div key={b} className="border border-border bg-background px-2 py-2 text-[11px] text-foreground/80">{b}</div>
          ))}
        </div>
        <div className="mt-3 h-1.5 w-full bg-border overflow-hidden">
          <div className="h-full w-[72%] bg-[color:var(--color-brand)]" />
        </div>
        <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
          <span>{v.p3Continuity}</span><span className="text-foreground font-semibold">72%</span>
        </div>
      </div>

      <div className="absolute right-6 top-32 w-[82%] border border-border bg-[color:var(--color-surface)] shadow-elev-3 p-5 -rotate-[1deg]">
        <div className="flex items-center justify-between">
          <span className="font-display text-[10px] font-semibold tracking-[0.22em] text-[color:var(--color-brand)]">{v.p2Label}</span>
          <span className="text-[10px] text-muted-foreground">{v.p2Subtitle}</span>
        </div>
        <p className="mt-3 text-[13px] leading-snug text-foreground">
          {v.p2Quote}
        </p>
        <div className="mt-4 flex items-center gap-2 text-[10px] tracking-[0.18em] text-muted-foreground">
          {v.p2Tags.map((tag) => (
            <span key={tag} className="border border-border px-2 py-1">{tag}</span>
          ))}
        </div>
      </div>

      <div className="absolute left-0 bottom-4 w-[88%] border border-foreground/15 bg-[color:var(--color-brand-deep)] text-[color:var(--color-background)] shadow-[0_30px_60px_-22px_rgba(5,50,90,0.45)] p-5">
        <div className="flex items-center justify-between">
          <span className="font-display text-[10px] font-semibold tracking-[0.22em] text-[color:var(--color-background)]/70">{v.p1Label}</span>
          <span className="text-[10px] text-[color:var(--color-background)]/60">{v.p1Subtitle}</span>
        </div>
        <p className="mt-3 text-[14px] leading-snug">
          {v.p1Quote}
        </p>
        <div className="mt-4 grid grid-cols-3 gap-3 text-[10px] tracking-wide text-[color:var(--color-background)]/75">
          <div>
            <p className="text-[color:var(--color-background)]/55">{v.p1Friction}</p>
            <p className="mt-1 text-[color:var(--color-background)] font-display text-base font-semibold">{v.p1FrictionVal}</p>
          </div>
          <div>
            <p className="text-[color:var(--color-background)]/55">{v.p1Recurrence}</p>
            <p className="mt-1 text-[color:var(--color-background)] font-display text-base font-semibold">{v.p1RecurrenceVal}</p>
          </div>
          <div>
            <p className="text-[color:var(--color-background)]/55">{v.p1Output}</p>
            <p className="mt-1 text-[color:var(--color-background)] font-display text-base font-semibold">{v.p1OutputVal}</p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-[color:var(--color-background)]/15 pt-3">
          <span className="text-[10px] tracking-[0.22em] text-[color:var(--color-background)]/60">I → R → O</span>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold">
            {v.p1Next} <ArrowRight size={12} />
          </span>
        </div>
      </div>

      <div className="absolute right-2 bottom-2 inline-flex items-center gap-2 border border-border bg-[color:var(--color-surface)] px-2.5 py-1.5 shadow-elev-1">
        <img src={logoCube} alt="" aria-hidden className="h-4 w-4 object-contain" />
        <span className="font-display text-[10px] font-semibold tracking-[0.22em] text-foreground">{v.mark}</span>
      </div>
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
              <Link
                to={lp("/aliados-etw-2026", locale)}
                className="inline-flex items-center gap-2 border border-white/40 px-5 py-3 text-[13px] font-medium text-white transition-colors hover:bg-white/10"
              >
                {c.ctaPartner} <ArrowRight size={14} />
              </Link>
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
            to={lp("/aliados-etw-2026", locale)}
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
          <div className="relative border border-border bg-[color:var(--color-surface)] p-6">
            <img
              src={gStructHomePreview}
              alt={c.previewAlt}
              loading="lazy"
              width={1024}
              height={1024}
              className="w-full h-auto object-contain"
            />
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
        <CTALink to={lp("/g-struct", locale)} variant="primary">{c.ctaWaitlist}</CTALink>
        <p className="text-sm text-muted-foreground">
          {c.ctaSub}
        </p>
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

function FinalCTA() {
  const { locale } = useLocale();
  const c = COPY[locale].finalCTA;
  return (
    <Section tone="deep">
      <div className="max-w-3xl">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05]">
          {c.title}
        </h2>
        <p className="mt-6 text-base md:text-lg text-[color:var(--color-background)]/80 leading-relaxed">
          {c.body}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <CTALink to={lp("/g-struct", locale)} variant="inverse">{c.ctaExplore}</CTALink>
          <CTALink to={lp("/", locale)} hash="lista-de-espera" variant="inverse">{c.ctaWaitlist}</CTALink>
          <CTALink to={lp("/contacto", locale)} variant="ghost" className="text-[color:var(--color-background)] hover:bg-[color:var(--color-background)]/10">
            {c.ctaContact}
          </CTALink>
        </div>
      </div>
    </Section>
  );
}

export function Index() {
  // Keep MentalOS/Solutions/ForWhom available for layouts that want them later.
  void MentalOS;
  void Solutions;
  void ForWhom;
  return (
    <>
      <Hero />
      <SocialProofBar />
      <GStructBridge />
      <Method />
      <Problem />
      <FrictionQuiz />
      <WaitlistForm />
      <ValidationChannels />
      <StartupStage />
      <ETWBanner />
      <Founder />
      <Announcements />
      <Section tone="muted">
        <BriefDownloadCard />
      </Section>
      <FAQSection />
      <FinalCTA />
    </>
  );
}
