// Bilingual dictionary for G-Structure.
// Keys group by area (nav, common, home.*, footer.*, fab.*, assistant.*).
// Tone: premium, sober, corporate. EN uses corporate American English.

type DeepReadonly<T> = { readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K] };
export type Dict = DeepReadonly<{
  common: Record<string, string>;
  nav: Record<string, string>;
  language: { label: string; es: string; en: string; short: { es: string; en: string } };
  home: {
    meta: { title: string; desc: string };
    hero: {
      pillTitle: string; pillSub: string; eyebrow: string; h1: string; lead: string; sub: string;
      ctaPrimary: string; ctaSecondary: string;
      step1: { t: string; d: string }; step2: { t: string; d: string }; step3: { t: string; d: string };
    };
  };
  footer: { tagline: string; irO: string };
  fab: {
    open: string; title: string; subtitle: string;
    options: { enterprise: string; reestructura: string; gstruct: string; allies: string; team: string };
    openAssistant: string; note: string;
  };
  assistant: {
    open: string; title: string; subtitle: string; disclaimer: string; q1: string;
    options: { enterprise: string; individual: string; gstruct: string; allies: string; team: string; other: string };
    rec: { enterprise: string; individual: string; gstruct: string; allies: string; team: string; other: string };
    cta: string; secondary: string; restart: string; close: string;
  };
}>;

export const es: Dict = {
  common: {
    bookCall: "Agendar conversación",
    bookCallShort: "Agendar conversación inicial",
    talkToGuillermo: "Conversar con Guillermo",
    talkOnWhatsApp: "Hablar por WhatsApp",
    sendEmail: "Enviar correo",
    learnMore: "Conocer más",
    haveQuestion: "Tengo otra pregunta",
    seeProfile: "Ver perfil",
    requestInfo: "Solicitar información",
    skipToContent: "Saltar al contenido",
    legal:
      "G-Structure ofrece servicios de coaching y formación cognitivo-conductual aplicada a la ejecución. No sustituye atención psicológica, médica o psiquiátrica.",
    rightsReserved: "Todos los derechos reservados.",
    initiativeOf: "Una iniciativa de Guillermo Suco.",
  },
  nav: {
    home: "Inicio",
    enterprise: "Enterprise",
    reestructura: "REESTRUCTURA 1:1",
    gstruct: "G-Struct",
    aboutGuillermo: "Sobre Guillermo",
    contact: "Contacto",
    allies: "Aliados ETW 2026",
    joinTeam: "Únete al equipo",
    opportunities: "Oportunidades",
    navigation: "Navegación",
    services: "Servicios",
    brand: "Marca",
    channels: "Canales",
    contactCol: "Contacto",
  },
  language: {
    label: "Idioma",
    es: "Español",
    en: "English",
    short: { es: "ES", en: "EN" },
  },
  home: {
    meta: {
      title: "G-Structure | Coaching Cognitivo-Conductual para Ejecución",
      desc:
        "Coaching cognitivo-conductual para líderes, profesionales y equipos que buscan superar procrastinación, perfeccionismo y bloqueos de ejecución.",
    },
    hero: {
      pillTitle: "HOST · ECUADOR TECH WEEK 2026",
      pillSub: "· Workshop de Diagnóstico · Julio 2026",
      eyebrow: "G-STRUCTURE",
      h1: "La ejecución no falla solo por falta de disciplina.",
      lead:
        "G-Structure aplica coaching cognitivo-conductual para ayudar a líderes, profesionales y equipos a identificar, reencuadrar y optimizar los patrones que bloquean la acción.",
      sub:
        "Procrastinación, perfeccionismo, sobreanálisis, autosabotaje y bloqueo de ejecución en contextos profesionales de alta exigencia.",
      ctaPrimary: "Agendar conversación inicial",
      ctaSecondary: "Conocer el método I-R-O",
      step1: { t: "Identificar", d: "Patrones que bloquean la acción." },
      step2: { t: "Reencuadrar", d: "Lectura cognitivo-conductual aplicada." },
      step3: { t: "Optimizar", d: "Decisiones traducidas en conducta." },
    },
  },
  footer: {
    tagline:
      "Ingeniería de resultados cognitivo-conductuales. Coaching cognitivo-conductual aplicado a la ejecución para profesionales, líderes y equipos.",
    irO: "Identificar · Reencuadrar · Optimizar",
  },
  fab: {
    open: "Abrir opciones de contacto",
    title: "Hablar con G-Structure",
    subtitle: "Elige tu intención y abrimos WhatsApp.",
    options: {
      enterprise: "Soy empresa o equipo",
      reestructura: "Quiero información sobre REESTRUCTURA 1:1",
      gstruct: "Quiero conocer G-Struct",
      allies: "Quiero ser aliado ETW 2026",
      team: "Quiero unirme al equipo",
    },
    openAssistant: "Abrir asistente de orientación",
    note: "Respuesta directa con Guillermo.",
  },
  assistant: {
    open: "Abrir asistente",
    title: "Asistente de orientación",
    subtitle:
      "Te ayudo a entender qué ruta de G-Structure tiene más sentido para tu contexto.",
    disclaimer:
      "G-Structure ofrece coaching y formación cognitivo-conductual aplicada a la ejecución. No sustituye atención psicológica, médica o psiquiátrica.",
    q1: "¿Qué estás buscando?",
    options: {
      enterprise: "Mejorar la ejecución en mi equipo",
      individual: "Trabajar mi procrastinación o perfeccionismo",
      gstruct: "Conocer G-Struct",
      allies: "Ser aliado ETW 2026",
      team: "Unirme al equipo",
      other: "Otro",
    },
    rec: {
      enterprise:
        "Te conviene explorar nuestra línea Enterprise: Workshop de Diagnóstico, REESTRUCTURA Enterprise o Continuidad. Una conversación inicial con Guillermo permite definir la ruta exacta.",
      individual:
        "REESTRUCTURA 1:1 está diseñado para trabajar tus patrones de ejecución de forma estructurada. Te conviene una conversación inicial para revisar contexto.",
      gstruct:
        "G-Struct es la capa tecnológica del método, hoy en desarrollo. Puedes sumarte a la lista de espera y, si tu caso lo amerita, agendar una llamada con Guillermo.",
      allies:
        "Si tu marca, institución o empresa quiere vincularse al Workshop de Diagnóstico durante Ecuador Tech Week 2026, conversemos directamente.",
      team:
        "Estamos formando el equipo inicial de G-Structure y G-Struct. Cuéntale tu perfil a Guillermo y revisamos si encaja.",
      other:
        "Te conviene conversar directamente con Guillermo para revisar tu contexto y proponer una ruta adecuada.",
    },
    cta: "Hablar por WhatsApp",
    secondary: "Ir al formulario",
    restart: "Empezar de nuevo",
    close: "Cerrar",
  },
} as const;

export const en: Dict = {
  common: {
    bookCall: "Book a conversation",
    bookCallShort: "Book an initial conversation",
    talkToGuillermo: "Talk to Guillermo",
    talkOnWhatsApp: "Message on WhatsApp",
    sendEmail: "Send email",
    learnMore: "Learn more",
    haveQuestion: "I have another question",
    seeProfile: "View profile",
    requestInfo: "Request information",
    skipToContent: "Skip to content",
    legal:
      "G-Structure offers cognitive-behavioral coaching and training applied to execution. It does not replace psychological, medical, or psychiatric care.",
    rightsReserved: "All rights reserved.",
    initiativeOf: "An initiative of Guillermo Suco.",
  },
  nav: {
    home: "Home",
    enterprise: "Enterprise",
    reestructura: "RESTRUCTURE 1:1",
    gstruct: "G-Struct",
    aboutGuillermo: "About Guillermo",
    contact: "Contact",
    allies: "ETW 2026 Partners",
    joinTeam: "Join the team",
    opportunities: "Opportunities",
    navigation: "Navigation",
    services: "Services",
    brand: "Brand",
    channels: "Channels",
    contactCol: "Contact",
  },
  language: {
    label: "Language",
    es: "Español",
    en: "English",
    short: { es: "ES", en: "EN" },
  },
  home: {
    meta: {
      title: "G-Structure | Cognitive-Behavioral Coaching for Execution",
      desc:
        "Cognitive-behavioral coaching for leaders, professionals, and teams who need to move past procrastination, perfectionism, and execution bottlenecks.",
    },
    hero: {
      pillTitle: "HOST · ECUADOR TECH WEEK 2026",
      pillSub: "· Execution Diagnostic Workshop · July 2026",
      eyebrow: "G-STRUCTURE",
      h1: "Execution does not fail only because of lack of discipline.",
      lead:
        "G-Structure applies cognitive-behavioral coaching to help leaders, professionals, and teams identify, reframe, and optimize the patterns that block action.",
      sub:
        "Procrastination, perfectionism, overthinking, self-sabotage, and execution blocks in high-demand professional contexts.",
      ctaPrimary: "Book an initial conversation",
      ctaSecondary: "Explore the I-R-O method",
      step1: { t: "Identify", d: "Patterns that block action." },
      step2: { t: "Reframe", d: "Applied cognitive-behavioral reading." },
      step3: { t: "Optimize", d: "Decisions translated into behavior." },
    },
  },
  footer: {
    tagline:
      "Cognitive-behavioral results engineering. Coaching applied to execution for professionals, leaders, and teams.",
    irO: "Identify · Reframe · Optimize",
  },
  fab: {
    open: "Open contact options",
    title: "Talk to G-Structure",
    subtitle: "Pick your intent and we’ll open WhatsApp.",
    options: {
      enterprise: "I’m a company or team",
      reestructura: "I want info about RESTRUCTURE 1:1",
      gstruct: "I want to learn about G-Struct",
      allies: "I want to be an ETW 2026 partner",
      team: "I want to join the team",
    },
    openAssistant: "Open guidance assistant",
    note: "Direct reply from Guillermo.",
  },
  assistant: {
    open: "Open assistant",
    title: "Guidance assistant",
    subtitle:
      "I’ll help you find the right path within G-Structure for your context.",
    disclaimer:
      "G-Structure offers cognitive-behavioral coaching and training applied to execution. It does not replace psychological, medical, or psychiatric care.",
    q1: "What are you looking for?",
    options: {
      enterprise: "Improve execution in my team",
      individual: "Work on procrastination or perfectionism",
      gstruct: "Learn about G-Struct",
      allies: "Become an ETW 2026 partner",
      team: "Join the team",
      other: "Something else",
    },
    rec: {
      enterprise:
        "Our Enterprise track fits best: Diagnostic Workshop, RESTRUCTURE Enterprise, or Continuity. A first conversation with Guillermo defines the exact path.",
      individual:
        "RESTRUCTURE 1:1 is designed to work on your execution patterns in a structured way. A first conversation will review your context.",
      gstruct:
        "G-Struct is the technological layer of the method, currently in development. You can join the waitlist and, if relevant, schedule a call with Guillermo.",
      allies:
        "If your brand, institution, or company wants to join the Diagnostic Workshop during Ecuador Tech Week 2026, let’s talk directly.",
      team:
        "We’re forming the initial team for G-Structure and G-Struct. Share your profile with Guillermo and we’ll see if it fits.",
      other:
        "It’s best to talk to Guillermo directly so we can review your context and propose the right path.",
    },
    cta: "Message on WhatsApp",
    secondary: "Go to the form",
    restart: "Start over",
    close: "Close",
  },
};

export const dictionaries = { es, en };
