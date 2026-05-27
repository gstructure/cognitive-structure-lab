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
      "G-Structure construye herramientas de ejecución cognitivo-conductual. Sus contenidos no sustituyen atención psicológica, médica o psiquiátrica.",
    rightsReserved: "Todos los derechos reservados.",
    initiativeOf: "",
  },
  nav: {
    home: "Inicio",
    enterprise: "Enterprise",
    reestructura: "REESTRUCTURA 1:1",
    gstruct: "G-Frame",
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
      title: "G-Structure | G-Frame e I-R-O™ para ejecución profesional",
      desc:
        "G-Structure es una tech startup construyendo G-Frame, una plataforma cognitivo-conductual de ejecución profesional impulsada por el método I-R-O™.",
    },
    hero: {
      pillTitle: "TECH STARTUP · ETAPA TEMPRANA",
      pillSub: "· G-Frame · Método I-R-O™ · Validación activa",
      eyebrow: "G-STRUCTURE · STARTUP → G-FRAME · PRODUCTO",
      h1: "¿Sabes qué hacer, pero no logras ejecutarlo?",
      lead:
        "Una plataforma cognitivo-conductual de ejecución profesional, impulsada por el método I-R-O™: Identificar, Reencuadrar y Optimizar.",
      sub:
        "G-Frame convierte el método I-R-O™ en una experiencia digital para identificar fricción mental, reencuadrar patrones y transformar claridad en acción. G-Structure es la startup que lo está construyendo desde Ecuador.",
      ctaPrimary: "Explorar G-Frame",
      ctaSecondary: "Ver tesis para inversores",
      step1: { t: "Identificar", d: "Patrones que bloquean la acción." },
      step2: { t: "Reencuadrar", d: "Lectura cognitivo-conductual aplicada." },
      step3: { t: "Optimizar", d: "Decisiones traducidas en conducta." },
    },
  },
  footer: {
    tagline:
      "Tech startup construyendo G-Frame: una plataforma cognitivo-conductual de ejecución profesional impulsada por el método I-R-O™.",
    irO: "Método I-R-O™ · Identificar · Reencuadrar · Optimizar",
  },
  fab: {
    open: "Abrir opciones de contacto",
    title: "Hablar con G-Structure",
    subtitle: "Elige tu intención y abrimos WhatsApp.",
    options: {
      enterprise: "Soy empresa o equipo",
      reestructura: "Quiero información sobre REESTRUCTURA 1:1",
      gstruct: "Quiero conocer G-Frame",
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
      "G-Structure construye herramientas de ejecución cognitivo-conductual. Sus contenidos no sustituyen atención psicológica, médica o psiquiátrica.",
    q1: "¿Qué estás buscando?",
    options: {
      enterprise: "Mejorar la ejecución en mi equipo",
      individual: "Trabajar mi procrastinación o perfeccionismo",
      gstruct: "Conocer G-Frame",
      allies: "Ser aliado ETW 2026",
      team: "Unirme al equipo",
      other: "Otro",
    },
    rec: {
      enterprise:
        "Enterprise es un canal de validación B2B para G-Frame. Una conversación inicial permite definir si tu equipo encaja para diagnóstico, piloto o continuidad.",
      individual:
        "REESTRUCTURA 1:1 permite validar el método I-R-O™ con casos reales de ejecución. Te conviene una conversación inicial para revisar contexto.",
      gstruct:
        "G-Frame es el producto principal de G-Structure. Puedes sumarte a la lista de espera y seguir el lanzamiento previsto para Q3 2026.",
      allies:
        "Si tu marca, institución o empresa quiere vincularse al Workshop de Diagnóstico durante Ecuador Tech Week 2026, conversemos directamente.",
      team:
        "Estamos formando el equipo inicial de G-Structure y G-Frame. Cuéntale tu perfil a Guillermo y revisamos si encaja.",
      other:
        "Te conviene conversar directamente con Guillermo para revisar tu contexto y proponer una ruta adecuada.",
    },
    cta: "Hablar por WhatsApp",
    secondary: "Ir al formulario",
    restart: "Empezar de nuevo",
    close: "Cerrar",
  },
};

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
      "G-Structure builds cognitive-behavioral execution tools. Its content does not replace psychological, medical, or psychiatric care.",
    rightsReserved: "All rights reserved.",
    initiativeOf: "",
  },
  nav: {
    home: "Home",
    enterprise: "Enterprise",
    reestructura: "RESTRUCTURE 1:1",
    gstruct: "G-Frame",
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
      title: "G-Structure | G-Frame and the I-R-O™ Method for professional execution",
      desc:
        "G-Structure is a tech startup building G-Frame, a cognitive-behavioral execution platform powered by the I-R-O™ Method.",
    },
    hero: {
      pillTitle: "TECH STARTUP · EARLY STAGE",
      pillSub: "· G-Frame · I-R-O™ Method · Active validation",
      eyebrow: "G-STRUCTURE · STARTUP → G-FRAME · PRODUCT",
      h1: "Do you know what to do, but still cannot execute?",
      lead:
        "A cognitive-behavioral execution platform powered by the I-R-O™ Method: Identify, Reframe, Optimize.",
      sub:
        "G-Frame turns the I-R-O™ Method into a digital experience to identify mental friction, reframe patterns, and turn clarity into action. G-Structure is the startup building it from Ecuador.",
      ctaPrimary: "Explore G-Frame",
      ctaSecondary: "See the investor thesis",
      step1: { t: "Identify", d: "Patterns that block action." },
      step2: { t: "Reframe", d: "Applied cognitive-behavioral reading." },
      step3: { t: "Optimize", d: "Decisions translated into behavior." },
    },
  },
  footer: {
    tagline:
      "Tech startup building G-Frame: a cognitive-behavioral execution platform powered by the I-R-O™ Method.",
    irO: "I-R-O™ Method · Identify · Reframe · Optimize",
  },
  fab: {
    open: "Open contact options",
    title: "Talk to G-Structure",
    subtitle: "Pick your intent and we’ll open WhatsApp.",
    options: {
      enterprise: "I’m a company or team",
      reestructura: "I want info about RESTRUCTURE 1:1",
      gstruct: "I want to learn about G-Frame",
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
      "G-Structure builds cognitive-behavioral execution tools. Its content does not replace psychological, medical, or psychiatric care.",
    q1: "What are you looking for?",
    options: {
      enterprise: "Improve execution in my team",
      individual: "Work on procrastination or perfectionism",
      gstruct: "Learn about G-Frame",
      allies: "Become an ETW 2026 partner",
      team: "Join the team",
      other: "Something else",
    },
    rec: {
      enterprise:
        "Enterprise is a B2B validation channel for G-Frame. A first conversation defines whether your team fits a diagnostic, pilot, or continuity path.",
      individual:
        "RESTRUCTURE 1:1 validates the I-R-O™ Method through real execution cases. A first conversation will review your context.",
      gstruct:
        "G-Frame is G-Structure’s main product. You can join the waitlist and follow the Q3 2026 launch.",
      allies:
        "If your brand, institution, or company wants to join the Diagnostic Workshop during Ecuador Tech Week 2026, let’s talk directly.",
      team:
        "We’re forming the initial team for G-Structure and G-Frame. Share your profile with Guillermo and we’ll see if it fits.",
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
