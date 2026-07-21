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
      trust1: string; trust2: string; trust3: string;
      step1: { t: string; d: string }; step2: { t: string; d: string }; step3: { t: string; d: string };
    };
  };
  footer: { tagline: string; irO: string };
  fab: {
    open: string; openIntercom: string; title: string; subtitle: string;
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
    reestructura: "Workshop de Diagnóstico",
    gstruct: "KAIRON",
    aboutGuillermo: "Sobre Guillermo",
    contact: "Contacto",
    allies: "Colaboraciones",
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
      title: "G-Structure | KAIRON, coaching cognitivo con IA para ejecución",
      desc:
        "G-Structure es una tech startup construyendo KAIRON, coaching cognitivo con IA guiado por Kai para procesar pensamientos, emociones e interpretaciones que bloquean la ejecución.",
    },
    hero: {
      pillTitle: "TECH STARTUP · ETAPA TEMPRANA",
      pillSub: "· KAIRON · Método I-R-O™ · Validación activa",
      eyebrow: "AI Cognitive Execution Coach",
      h1: "Entiende qué te bloquea. Decide cómo avanzar.",
      lead:
        "KAIRON ayuda a founders, creators y profesionales a procesar pensamientos y emociones que bloquean la ejecución, reencuadrarlos con Kai y convertirlos en acciones concretas en menos de 12 minutos.",
      sub:
        "KAIRON convierte el método I-R-O™ en una experiencia digital para identificar fricción mental, reencuadrar patrones y transformar claridad en acción. G-Structure es la startup que lo está construyendo desde Ecuador.",
      ctaPrimary: "Probar KAIRON",
      ctaSecondary: "Ver tesis para inversores",
      trust1: "Basado en principios de coaching cognitivo-conductual.",
      trust2: "Guiado por Kai, tu AI execution coach.",
      trust3: "Diseñado para procrastinación, perfeccionismo, pensamientos de impostor y autosabotaje.",
      step1: { t: "Identificar", d: "Patrones que bloquean la acción." },
      step2: { t: "Reencuadrar", d: "Lectura cognitivo-conductual aplicada." },
      step3: { t: "Optimizar", d: "Decisiones traducidas en conducta." },
    },
  },
  footer: {
    tagline:
      "Tech startup construyendo KAIRON: coaching cognitivo con IA guiado por Kai para convertir fricción mental en acción concreta.",
    irO: "Método I-R-O™ · Identificar · Reencuadrar · Optimizar",
  },
  fab: {
    open: "Abrir Kai",
    openIntercom: "Hablar con Kai",
    title: "Kai",
    subtitle: "Si el chat no carga, elige una ruta directa de contacto.",
    options: {
      enterprise: "Soy empresa o equipo",
      reestructura: "Quiero información sobre el workshop",
      gstruct: "Quiero conocer KAIRON",
      allies: "Quiero colaborar con G-Structure",
      team: "Quiero unirme al equipo",
    },
    openAssistant: "Abrir asistente de orientación",
    note: "Fin responde primero cuando Intercom está disponible.",
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
      individual: "Probar KAIRON para mi ejecución",
      gstruct: "Conocer KAIRON",
      allies: "Colaborar con G-Structure",
      team: "Unirme al equipo",
      other: "Otro",
    },
    rec: {
      enterprise:
        "El Workshop de Diagnóstico es la puerta B2B hacia KAIRON. Una conversación inicial permite definir si tu equipo encaja para una sesión de diagnóstico de ejecución.",
      individual:
        "KAIRON ya está activo como MVP. Puedes probarlo para procesar fricción mental con Kai y convertirla en una acción concreta.",
      gstruct:
        "KAIRON es el producto principal de G-Structure y ya funciona como MVP activo. Puedes probarlo para procesar fricción mental con Kai y convertirla en una acción concreta.",
      allies:
        "Si tu marca, institución o empresa quiere colaborar con G-Structure o llevar el Workshop de Diagnóstico a su equipo, conversemos directamente.",
      team:
        "Estamos formando el equipo inicial de G-Structure y KAIRON. Cuéntale tu perfil a Guillermo y revisamos si encaja.",
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
    reestructura: "Diagnostic Workshop",
    gstruct: "KAIRON",
    aboutGuillermo: "About Guillermo",
    contact: "Contact",
    allies: "Collaborations",
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
      title: "G-Structure | KAIRON, AI cognitive coaching for execution",
      desc:
        "G-Structure is a tech startup building KAIRON, AI cognitive coaching guided by Kai to process thoughts, emotions, and interpretations that block execution.",
    },
    hero: {
      pillTitle: "TECH STARTUP · EARLY STAGE",
      pillSub: "· KAIRON · I-R-O™ Method · Active validation",
      eyebrow: "AI Cognitive Execution Coach",
      h1: "Turn mental friction into action. In 5 minutes.",
      lead:
        "KAIRON helps founders, creators, and professionals process the thoughts and emotions that block execution, reframe them with Kai, and turn them into concrete actions in under 12 minutes.",
      sub:
        "KAIRON turns the I-R-O™ Method into a digital experience to identify mental friction, reframe patterns, and turn clarity into action. G-Structure is the startup building it from Ecuador.",
      ctaPrimary: "Try KAIRON",
      ctaSecondary: "See the investor thesis",
      trust1: "Built on cognitive-behavioral coaching principles.",
      trust2: "Guided by Kai, your AI execution coach.",
      trust3: "Designed for procrastination, perfectionism, impostor thoughts, and self-sabotage.",
      step1: { t: "Identify", d: "Patterns that block action." },
      step2: { t: "Reframe", d: "Applied cognitive-behavioral reading." },
      step3: { t: "Optimize", d: "Decisions translated into behavior." },
    },
  },
  footer: {
    tagline:
      "Tech startup building KAIRON: AI cognitive coaching guided by Kai to turn mental friction into concrete action.",
    irO: "I-R-O™ Method · Identify · Reframe · Optimize",
  },
  fab: {
    open: "Open Kai",
    openIntercom: "Talk to Kai",
    title: "Kai",
    subtitle: "If chat does not load, choose a direct contact path.",
    options: {
      enterprise: "I’m a company or team",
      reestructura: "I want info about the workshop",
      gstruct: "I want to learn about KAIRON",
      allies: "I want to collaborate with G-Structure",
      team: "I want to join the team",
    },
    openAssistant: "Open guidance assistant",
    note: "Fin replies first when Intercom is available.",
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
      individual: "Try KAIRON for my execution",
      gstruct: "Learn about KAIRON",
      allies: "Collaborate with G-Structure",
      team: "Join the team",
      other: "Something else",
    },
    rec: {
      enterprise:
        "The Diagnostic Workshop is the B2B entry point toward KAIRON. A first conversation defines whether your team fits an execution diagnostic session.",
      individual:
        "KAIRON is already live as an MVP. You can try it to process mental friction with Kai and turn it into a concrete action.",
      gstruct:
        "KAIRON is G-Structure’s main product and already works as a live MVP. You can try it to process mental friction with Kai and turn it into a concrete action.",
      allies:
        "If your brand, institution, or company wants to collaborate with G-Structure or bring the Diagnostic Workshop to your team, let’s talk directly.",
      team:
        "We’re forming the initial team for G-Structure and KAIRON. Share your profile with Guillermo and we’ll see if it fits.",
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
