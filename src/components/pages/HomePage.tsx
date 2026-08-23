import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import type { Locale } from "@/lib/i18n";
import { kaironAppUrl, getLaunchPhase } from "@/lib/launchConfig";
import { trackAcquisitionEvent, trackOutboundAppOpened } from "@/lib/analytics";
import gsLogoLight from "@/assets/gslogolight.webp";
import kaironInicio from "@/assets/kaironinicio.webp";
import kaironBrujula from "@/assets/kaironbrujula.webp";
import kaironFiltro from "@/assets/kaironfiltro.webp";
import kaironTaller from "@/assets/kairontaller.webp";
import kaironProgreso from "@/assets/kaironprogreso.webp";
import kaironRuta from "@/assets/kaironruta.webp";
import kaironNocturno from "@/assets/kaironnocturno.webp";
import { KAIRON_THEME } from "@/lib/kaironTheme";

/**
 * Full dark-theme homepage redesign ("Testimonios en español para KAIRON"
 * design handoff). Standalone (own header/footer, see the isStandalone
 * check in __root.tsx) — the ES/EN switch is real navigation between
 * `/` and `/en`, matching the rest of the site's locale routing.
 *
 * The "Espejo" panel is a placeholder: it does not call a live LLM (no
 * Anthropic integration exists yet). It scores the user's free text against
 * per-pattern keyword lists for the four canonical execution blocks
 * (procrastination, perfectionism, self-sabotage, impostor syndrome — same
 * taxonomy as /bloqueos/) and replies with a pseudo-randomly picked variant
 * from the winning pattern, or a generic fallback when nothing matches —
 * see `mirrorPatterns` below.
 */

const ORANGE = KAIRON_THEME.accent;
const ORANGE_HOVER = KAIRON_THEME.accentHover;
const BG = KAIRON_THEME.bg;

const PRODUCT_SHOTS_ES = [kaironInicio, kaironBrujula, kaironTaller, kaironTaller, kaironProgreso, kaironRuta];
const PRODUCT_SHOTS_EN = [kaironInicio, kaironBrujula, kaironFiltro, kaironTaller, kaironProgreso, kaironRuta];

type PatternKey = 0 | 1 | 2 | 3;

type MirrorReply = { reply: string; pattern: string; friction: number; action: string };
type MirrorPattern = { keywords: string[]; variants: MirrorReply[] };

type Copy = {
  cta: string;
  navMirror: string; navMethod: string; navPricing: string; navTeams: string;
  heroKicker: string; heroL1: string; heroL2: string; heroSub: string;
  heroCta: string; heroCta2: string; heroNote: string;
  mirrorKicker: string; mirrorTitle: string; mirrorSub: string;
  mirrorEx: [string, string, string];
  mirrorPlaceholder: string; mirrorDisclaimer: string;
  mirrorAsk: string; mirrorAsking: string;
  mirrorPattern: string; mirrorIndex: string; mirrorAction: string; mirrorCta: string;
  prodKicker: string; prodTitle: string; prodSub: string;
  steps: { t: string; b: string }[];
  nocKicker: string; nocTitle: string; nocBody: string; nocCta: string;
  patKicker: string; patTitle: string; patWhat: string; patHow: string;
  patterns: { name: string; q: string; d: string; h: string }[];
  iroKicker: string; iroSub: string;
  iro: { t: string; b: string }[];
  valKicker: string; valTitle: string; valUsers: string; valEc: string; valUs: string;
  valFeatured: string;
  testimonials: { q: string; a: string }[];
  featuredTestimonial: { q: string; a: string };
  valStage: string;
  credKicker: string;
  credentials: { n: string; b: string }[];
  priceKicker: string; priceTitle: string; priceLatam: string; priceUs: string; priceMonth: string;
  priceTrial: string; priceTrialNote: string;
  houseKicker: string; houseTitle: string; houseSub: string;
  houseLive: string; houseSoon: string; houseKairon: string;
  houseWsName: string; houseWs: string; houseWsLink: string;
  houseNextName: string; houseNext: string;
  endTitle: string; endSub: string;
  footAbout: string; footProduct: string; footCompany: string; footContact: string;
  footEnterprise: string; footInvestors: string; footTeam: string; footLegal: string;
  mirrorPatterns: MirrorPattern[];
  mirrorGeneric: MirrorReply[];
};

const COPY: Record<Locale, Copy> = {
  es: {
    cta: "Empezar prueba de 7 días",
    navMirror: "El Espejo", navMethod: "Método", navPricing: "Precio", navTeams: "Equipos",
    heroKicker: "Coach cognitivo de ejecución con IA",
    heroL1: "Tu IA te está dando la razón.", heroL2: "Kai no.",
    heroSub: "KAIRON detecta el pensamiento que está frenando tu ejecución, lo desarma y te devuelve una acción de 5 minutos. Basado en principios cognitivo-conductuales, no en frases motivacionales.",
    heroCta: "Ponlo a prueba ahora", heroCta2: "Ver el producto",
    heroNote: "Sin registro. Escribe una excusa real.",
    mirrorKicker: "El Espejo",
    mirrorTitle: "Escribe la razón por la que no lo has hecho todavía.",
    mirrorSub: "Kai la va a leer y te va a decir qué patrón hay debajo. Sin cuenta, sin tarjeta, aquí mismo.",
    mirrorEx: ["No es el momento adecuado", "Todavía no está listo para mostrarlo", "Prefiero no arriesgarme a que salga mal"],
    mirrorPlaceholder: "Ej. Llevo tres semanas sin enviar la propuesta porque quiero revisarla una vez más.",
    mirrorDisclaimer: "No guardamos lo que escribes. Esto no sustituye atención psicológica.",
    mirrorAsk: "Que Kai lo lea", mirrorAsking: "Kai está leyendo…",
    mirrorPattern: "Patrón detectado", mirrorIndex: "Índice de Fricción",
    mirrorAction: "Tu acción de 5 minutos", mirrorCta: "Trabajar esto en KAIRON",
    prodKicker: "El producto",
    prodTitle: "Un sistema de ejecución cognitiva, activo hoy.",
    prodSub: "Defines un foco, atrapas el pensamiento que crea fricción, lo reencuadras con Kai y sales con una siguiente acción que sí puedes ejecutar.",
    steps: [
      { t: "Un número, no un ánimo.", b: "Tu día abre con el Índice de Fricción: qué tan bloqueada está tu ejecución hoy, medido, no adivinado." },
      { t: "La Brújula antes de empezar.", b: "Un activador cognitivo breve al día. No una frase motivacional: un principio que cambia cómo lees la tarea que sigue." },
      { t: "Filtro, para el bloqueo de ahora.", b: "Estás frente a la tarea y no arrancas. Filtro es rápido y específico: nombras el pensamiento, Kai lo desarma, sales con una acción." },
      { t: "Taller, para lo que se repite.", b: "Cuando el mismo bloqueo vuelve cada semana, no es la tarea: es una regla. El Taller la nombra y la reestructura a fondo." },
      { t: "La evidencia de que bajó.", b: "Tu Índice de Fricción medido en el tiempo. De 67 a 54 no es una sensación: es tu curva." },
      { t: "Una Ruta, no una racha.", b: "Ocho módulos secuenciales. Cada uno se desbloquea con el anterior. Progreso estructurado, no gamificación vacía." },
    ],
    nocKicker: "Nocturno",
    nocTitle: "Para cuando tu mente no te deja dormir.",
    nocBody: "Conversación por voz con Kai, diseñada para el momento en que el día termina pero los pensamientos no. Cierra el ciclo antes de mañana.",
    nocCta: "Probar Nocturno",
    patKicker: "El problema",
    patTitle: "No siempre falta capacidad. A veces sobra fricción.",
    patWhat: "Qué es", patHow: "Qué hace KAIRON",
    patterns: [
      { name: "Procrastinación", q: "“Lo hago mañana, hoy no tengo la cabeza.”", d: "La acción se posterga aunque la tarea sea importante y el costo de no hacerla sea claro.", h: "Filtro corta el ciclo en el momento exacto en que aparece la evitación y te devuelve una acción de 5 minutos que sí puedes empezar." },
      { name: "Perfeccionismo", q: "“Todavía no está listo para que lo vean.”", d: "El estándar se vuelve una excusa elegante para no avanzar. Nada se entrega porque nada es suficiente.", h: "El Taller nombra la regla que sostiene el estándar y la reestructura hasta que entregar deje de sentirse como exponerse." },
      { name: "Autosabotaje", q: "“Sé lo que quiero, y hago lo contrario.”", d: "La conducta contradice el objetivo que la persona dice querer, de forma repetida y reconocible.", h: "El Motor de Reestructuración mapea el patrón completo: el disparador, la interpretación y la conducta que lo cierra." },
      { name: "Síndrome del impostor", q: "“Todavía no soy la persona que debería estar haciendo esto.”", d: "La capacidad está y la evidencia está, pero la confianza no llega. El logro se atribuye a la suerte y el error confirma la duda.", h: "El Taller separa el hecho verificable de la interpretación, y deja la evidencia por escrito para la próxima vez que dudes." },
    ],
    iroKicker: "El método",
    iroSub: "El marco propietario que corre debajo de cada herramienta de KAIRON. Tres pasos, siempre en el mismo orden.",
    iro: [
      { t: "Identificar", b: "Qué pensamiento está creando la fricción, en el momento en que aparece." },
      { t: "Reencuadrar", b: "La interpretación se desarma y se reformula. Kai no la suaviza: la hace verificable." },
      { t: "Optimizar", b: "La claridad sale como una siguiente acción concreta, de cinco minutos, validada." },
    ],
    valKicker: "Validación", valTitle: "52 personas ya lo probaron.",
    valUsers: "usuarios reales", valEc: "en Ecuador", valUs: "en Estados Unidos",
    valFeatured: "Avalado por salud mental",
    testimonials: [
      { q: "“Intenté engañarlo y aun así detectó mi patrón correctamente.”", a: "HR Manager · Philadelphia" },
      { q: "“Esto va al núcleo del problema. Tiene fit comercial y vale la pena venderlo.”", a: "Marketing Manager · Philadelphia" },
      { q: "“Bien construido, intuitivo. Lo seguiría usando.”", a: "Software Engineer · Philadelphia" },
      { q: "“Esto debería acompañar siempre a los founders. Les ayuda a salir de sus bloqueos y no rendirse.”", a: "Founder · Guayaquil" },
    ],
    featuredTestimonial: { q: "“Lo usaría con mis clientes. No es intrusivo · te guía y te hace sentir comprendido y cuidado.”", a: "Psicóloga clínica · Guayaquil" },
    valStage: "G-Structure presentó KAIRON en The Stage Pitch Competition, parte de Ecuador Tech Week, organizado por Startup Grind y Viamatica.",
    credKicker: "Reconocimiento y programas",
    credentials: [
      { n: "Semifinalistas CodeLaunch LATAM 2026", b: "Competencia de startups tecnológicas de la región." },
      { n: "Hosts de Ecuador Tech Week 2026", b: "G-Structure como anfitriona del evento, junto a Startup Grind y Viamatica." },
      { n: "Boostcamp 2026", b: "Programa de Pre Aceleración de i3lab, Centro de Emprendimiento e Innovación de la ESPOL, con financiamiento del Banco Interamericano de Desarrollo." },
    ],
    priceKicker: "Precio",
    priceTitle: "Un precio, dos regiones, sin niveles que decidir.",
    priceLatam: "Latinoamérica", priceUs: "Estados Unidos", priceMonth: "mes",
    priceTrial: "7 días de prueba", priceTrialNote: "Acceso completo a KAIRON Pro. Tarjeta requerida, cancelas cuando quieras.",
    houseKicker: "La casa", houseTitle: "G-Structure construye herramientas de ejecución cognitiva.",
    houseSub: "KAIRON es el primero. La tesis es la misma en todo lo que sigue: la fricción entre la intención y la acción es medible, y si es medible se puede bajar.",
    houseLive: "Activo", houseSoon: "En camino",
    houseKairon: "Coaching cognitivo con IA guiado por Kai. Para founders, creadores y profesionales que ya saben qué hacer.",
    houseWsName: "KAIRON for Teams", houseWs: "Diagnóstico de ejecución para equipos. Datos agregados y anónimos para Talento Humano, nunca individuales.", houseWsLink: "Ver el Corporate Pilot →",
    houseNextName: "Producto 03", houseNext: "En construcción. Misma tesis, otra superficie.",
    endTitle: "Deja de pedirle permiso a tu excusa.",
    endSub: "52 personas ya usan KAIRON. Crea tu cuenta y trabaja el primer bloqueo hoy.",
    footAbout: "Tech startup construyendo herramientas de ejecución cognitivo-conductual. KAIRON es nuestro primer producto.",
    footProduct: "Producto", footCompany: "Compañía", footContact: "Contacto",
    footEnterprise: "KAIRON for Teams", footInvestors: "Inversores", footTeam: "Únete al equipo",
    footLegal: "Nuestros contenidos no sustituyen atención psicológica, médica o psiquiátrica.",
    mirrorPatterns: [
      {
        keywords: ["no es el momento", "no tengo tiempo", "luego", "mañana", "otro día", "ocupado", "cuando tenga tiempo", "no es prioridad", "prioridades"],
        variants: [
          { reply: "Llevas semanas dándole vueltas a algo que ya sabes cómo empezar. El problema no es el momento: es que esperar se siente más seguro que actuar.", pattern: "Procrastinación", friction: 62, action: "Bloquea 5 minutos ahora y da el primer paso, aunque no sea perfecto." },
          { reply: "Cada vez que dices \"todavía no\", le compras un día más al miedo. El calendario no es el obstáculo, es la excusa con mejor coartada.", pattern: "Procrastinación", friction: 66, action: "Elige la parte más pequeña de la tarea y hazla en los próximos 5 minutos." },
        ],
      },
      {
        keywords: ["todavía no está listo", "no está listo", "no está lista", "perfecto", "perfecta", "pulir", "revisar una vez más", "no se ve bien", "falta algo", "una vez más"],
        variants: [
          { reply: "\"Listo\" es un estándar que tú mismo mueves cada vez que te acercas. Mientras más esperas, más grande se vuelve lo que hay que soltar.", pattern: "Perfeccionismo", friction: 71, action: "Comparte la versión actual con una persona hoy, sin pulirla más." },
          { reply: "No estás protegiendo la calidad, te estás protegiendo de que alguien lo vea antes de que sea \"suficiente\". Ese punto no existe.", pattern: "Perfeccionismo", friction: 68, action: "Fija una fecha límite hoy mismo y entrega lo que tengas en ese momento." },
        ],
      },
      {
        keywords: ["siempre lo arruino", "me boicoteo", "no lo merezco", "algo va a salir mal", "prefiero no arriesgarme", "mejor no", "para qué intentarlo", "va a fallar", "no va a funcionar igual", "seguro se cae"],
        variants: [
          { reply: "Lo que describes no es mala suerte: es un patrón que se repite justo antes de que algo funcione. Frenar ahí también es una forma de control.", pattern: "Autosabotaje", friction: 74, action: "Nombra en voz alta qué tienes miedo de que pase si esto sale bien, y da el paso de todas formas." },
          { reply: "Elegir la opción segura-que-no-va-a-doler es más fácil que arriesgarte a que funcione y tener que sostenerlo. Pero el costo lo pagas igual.", pattern: "Autosabotaje", friction: 70, action: "Haz la versión mínima de la acción que estás evitando, hoy, sin condiciones." },
        ],
      },
      {
        keywords: ["no soy lo suficientemente bueno", "no soy lo suficientemente buena", "no sé si puedo", "otros saben más", "van a descubrir que no sé", "no merezco estar aquí", "fue solo suerte", "no soy experto", "no soy experta", "quién soy yo para"],
        variants: [
          { reply: "No es que no sepas lo suficiente: es que estás midiendo tu preparación contra un estándar que nadie te pidió cumplir.", pattern: "Síndrome del impostor", friction: 65, action: "Escribe tres cosas que ya sabes hacer sobre esto y da el paso con esa lista al lado." },
          { reply: "El miedo a que \"descubran\" que no sabes es información sobre tu ansiedad, no sobre tu capacidad real. Los dos no son lo mismo.", pattern: "Síndrome del impostor", friction: 63, action: "Pide feedback concreto a una persona hoy, en vez de seguir adivinando qué piensan de ti." },
        ],
      },
    ],
    mirrorGeneric: [
      { reply: "Lo que escribiste tiene forma de razón, pero funciona como pausa. Nombrar el patrón es el primer paso para moverlo.", pattern: "Fricción de ejecución", friction: 55, action: "Da el primer paso de 5 minutos ahora, sin buscar la versión perfecta." },
      { reply: "Hay una razón detrás de lo que escribiste, pero no es la que estás nombrando. Vale la pena mirar qué hay debajo antes de esperar más.", pattern: "Fricción de ejecución", friction: 58, action: "Da un paso pequeño y concreto en los próximos 5 minutos, sin esperar más claridad." },
    ],
  },
  en: {
    cta: "Start 7-day trial",
    navMirror: "The Mirror", navMethod: "Method", navPricing: "Pricing", navTeams: "Teams",
    heroKicker: "AI cognitive execution coach",
    heroL1: "Your AI keeps agreeing with you.", heroL2: "Kai won't.",
    heroSub: "KAIRON catches the thought that is stalling your execution, takes it apart, and hands you back a 5-minute action. Built on cognitive-behavioral principles, not motivational quotes.",
    heroCta: "Put it to the test", heroCta2: "See the product",
    heroNote: "No signup. Write a real excuse.",
    mirrorKicker: "The Mirror",
    mirrorTitle: "Write the reason you haven't done it yet.",
    mirrorSub: "Kai will read it and name the pattern underneath. No account, no card, right here.",
    mirrorEx: ["It's not the right time", "It's not ready to show yet", "I'd rather not risk it going wrong"],
    mirrorPlaceholder: "e.g. The proposal has been sitting for three weeks because I want one more pass at it.",
    mirrorDisclaimer: "We don't store what you write. This is not a substitute for professional care.",
    mirrorAsk: "Let Kai read it", mirrorAsking: "Kai is reading…",
    mirrorPattern: "Pattern detected", mirrorIndex: "Friction Index",
    mirrorAction: "Your 5-minute action", mirrorCta: "Work on this in KAIRON",
    prodKicker: "The product",
    prodTitle: "A cognitive execution system, live today.",
    prodSub: "You set a focus, catch the thought creating friction, reframe it with Kai, and leave with a next action you can actually execute.",
    steps: [
      { t: "A number, not a mood.", b: "Your day opens with the Friction Index: how blocked your execution is today, measured, not guessed." },
      { t: "The Compass, before you start.", b: "One short cognitive activator a day. Not a motivational line: a principle that changes how you read the task ahead." },
      { t: "Filter, for the block right now.", b: "You're facing the task and can't start. Filter is quick and specific: you name the thought, Kai takes it apart, you leave with an action." },
      { t: "Workshop, for what repeats.", b: "When the same block returns every week, it isn't the task: it's a rule. Workshop names it and restructures it properly." },
      { t: "Proof that it dropped.", b: "Your Friction Index over time. 67 to 54 isn't a feeling: it's your curve." },
      { t: "A Path, not a streak.", b: "Eight sequential modules. Each unlocks with the last. Structured progress, not empty gamification." },
    ],
    nocKicker: "Nocturne",
    nocTitle: "For when your mind won't let you sleep.",
    nocBody: "A voice conversation with Kai, built for the moment the day ends but the thoughts don't. Close the loop before tomorrow.",
    nocCta: "Try Nocturne",
    patKicker: "The problem",
    patTitle: "It's rarely a lack of capability. It's an excess of friction.",
    patWhat: "What it is", patHow: "What KAIRON does",
    patterns: [
      { name: "Procrastination", q: "“I'll do it tomorrow, my head isn't in it today.”", d: "Action gets postponed even when the task matters and the cost of skipping it is obvious.", h: "Filter cuts the loop at the exact moment avoidance shows up and hands back a 5-minute action you can actually start." },
      { name: "Perfectionism", q: "“It's not ready for anyone to see yet.”", d: "The standard becomes an elegant excuse not to move. Nothing ships because nothing is enough.", h: "Workshop names the rule holding the standard up and restructures it until shipping stops feeling like exposure." },
      { name: "Self-sabotage", q: "“I know what I want, and I do the opposite.”", d: "Behavior contradicts the stated goal, repeatedly and recognizably.", h: "The Restructuring Engine maps the full pattern: the trigger, the interpretation, and the behavior that closes it." },
      { name: "Impostor syndrome", q: "“I'm not the person who should be doing this yet.”", d: "The capability is there and the evidence is there, but the confidence isn't. Wins get attributed to luck and mistakes confirm the doubt.", h: "Workshop separates the verifiable fact from the interpretation, and puts the evidence in writing for the next time you doubt." },
    ],
    iroKicker: "The method",
    iroSub: "The proprietary framework running under every KAIRON tool. Three steps, always in the same order.",
    iro: [
      { t: "Identify", b: "Which thought is creating the friction, in the moment it appears." },
      { t: "Reframe", b: "The interpretation gets taken apart and rebuilt. Kai doesn't soften it: Kai makes it testable." },
      { t: "Optimize", b: "Clarity exits as one concrete, five-minute, validated next action." },
    ],
    valKicker: "Validation", valTitle: "52 people have already tested it.",
    valUsers: "real users", valEc: "in Ecuador", valUs: "in the United States",
    valFeatured: "Endorsed by a mental health professional",
    testimonials: [
      { q: "“I tried to trick it and it still identified my pattern correctly.”", a: "HR Manager · Philadelphia" },
      { q: "“This goes to the core of the problem. It has commercial fit and is worth selling.”", a: "Marketing Manager · Philadelphia" },
      { q: "“Well built, intuitive. I would keep using it.”", a: "Software Engineer · Philadelphia" },
      { q: "“This should be with founders at all times. It helps them break out of their blocks and not give up.”", a: "Founder · Guayaquil" },
    ],
    featuredTestimonial: { q: "“I would use it with my clients. It isn't intrusive · it guides you and makes you feel understood and cared for.”", a: "Clinical psychologist · Guayaquil" },
    valStage: "G-Structure presented KAIRON at The Stage Pitch Competition, part of Ecuador Tech Week, hosted by Startup Grind and Viamatica.",
    credKicker: "Recognition and programs",
    credentials: [
      { n: "CodeLaunch LATAM 2026 semifinalists", b: "Regional technology startup competition." },
      { n: "Ecuador Tech Week 2026 hosts", b: "G-Structure as a host of the event, alongside Startup Grind and Viamatica." },
      { n: "Boostcamp 2026", b: "Pre-acceleration program by i3lab, ESPOL's Center for Entrepreneurship and Innovation, funded by the Inter-American Development Bank." },
    ],
    priceKicker: "Pricing",
    priceTitle: "One price, two regions, no tiers to decide.",
    priceLatam: "Latin America", priceUs: "United States", priceMonth: "mo",
    priceTrial: "7-day trial", priceTrialNote: "Full access to KAIRON Pro. Card required, cancel anytime.",
    houseKicker: "The house", houseTitle: "G-Structure builds cognitive execution tools.",
    houseSub: "KAIRON is the first. The thesis holds for everything that follows: the friction between intent and action is measurable, and what is measurable can come down.",
    houseLive: "Live", houseSoon: "In progress",
    houseKairon: "AI cognitive coaching guided by Kai. For founders, creators and professionals who already know what to do.",
    houseWsName: "KAIRON for Teams", houseWs: "Execution diagnostic for teams. Aggregated, anonymous data for People teams — never individual.", houseWsLink: "See the Corporate Pilot →",
    houseNextName: "Product 03", houseNext: "In build. Same thesis, different surface.",
    endTitle: "Stop asking your excuse for permission.",
    endSub: "52 people already use KAIRON. Create your account and work your first block today.",
    footAbout: "Tech startup building cognitive-behavioral execution tools. KAIRON is our first product.",
    footProduct: "Product", footCompany: "Company", footContact: "Contact",
    footEnterprise: "KAIRON for Teams", footInvestors: "Investors", footTeam: "Join the team",
    footLegal: "Our content is not a substitute for psychological, medical or psychiatric care.",
    mirrorPatterns: [
      {
        keywords: ["not the right time", "no time", "later", "tomorrow", "another day", "busy", "when i have time", "not a priority"],
        variants: [
          { reply: "You've spent weeks circling something you already know how to start. The problem isn't timing: waiting just feels safer than acting.", pattern: "Procrastination", friction: 62, action: "Block 5 minutes right now and take the first step, imperfect is fine." },
          { reply: "Every time you say \"not yet,\" you buy fear one more day. The calendar isn't the obstacle, it's the excuse with the best alibi.", pattern: "Procrastination", friction: 66, action: "Pick the smallest piece of the task and do it in the next 5 minutes." },
        ],
      },
      {
        keywords: ["not ready to show", "not ready", "perfect", "polish", "one more pass", "doesn't look right", "something's missing", "improve it a bit more"],
        variants: [
          { reply: "\"Ready\" is a bar you keep moving every time you get close. The longer you wait, the bigger the thing you have to let go of.", pattern: "Perfectionism", friction: 71, action: "Share the current version with one person today, no more polishing." },
          { reply: "You're not protecting quality, you're protecting yourself from anyone seeing it before it's \"enough.\" That point doesn't exist.", pattern: "Perfectionism", friction: 68, action: "Set a deadline for today and ship whatever you have at that moment." },
        ],
      },
      {
        keywords: ["always mess it up", "self-sabotage", "don't deserve it", "something will go wrong", "rather not risk it", "better not", "why bother", "it's going to fail", "it won't work anyway"],
        variants: [
          { reply: "What you're describing isn't bad luck: it's a pattern that shows up right before something starts working. Stopping there is its own kind of control.", pattern: "Self-sabotage", friction: 74, action: "Say out loud what you're afraid will happen if this goes well, then take the step anyway." },
          { reply: "Picking the safe option that definitely won't hurt is easier than risking it working and having to carry it. But you pay the cost either way.", pattern: "Self-sabotage", friction: 70, action: "Do the smallest version of the thing you're avoiding, today, no conditions." },
        ],
      },
      {
        keywords: ["not good enough", "don't know if i can", "others know more", "find out i don't know", "don't deserve to be here", "just luck", "not an expert", "who am i to"],
        variants: [
          { reply: "It's not that you don't know enough: you're measuring your readiness against a bar nobody actually asked you to clear.", pattern: "Impostor syndrome", friction: 65, action: "Write down three things you already know how to do here, and take the step with that list next to you." },
          { reply: "The fear that people will \"find out\" isn't information about your ability, it's information about your anxiety. The two aren't the same thing.", pattern: "Impostor syndrome", friction: 63, action: "Ask one person for concrete feedback today instead of guessing what they think of you." },
        ],
      },
    ],
    mirrorGeneric: [
      { reply: "What you wrote looks like a reason, but it works like a pause. Naming the pattern is the first step to moving it.", pattern: "Execution friction", friction: 55, action: "Take the first 5-minute step now, skip the perfect version." },
      { reply: "There's a reason behind what you wrote, but it's not the one you're naming. Worth looking at what's underneath before you wait any longer.", pattern: "Execution friction", friction: 58, action: "Take one small, concrete step in the next 5 minutes, don't wait for more clarity." },
    ],
  },
};

function trackAppCta(locale: Locale, ctaLocation: string) {
  trackAcquisitionEvent("section_cta_clicked", { cta_location: ctaLocation, language: locale });
  trackOutboundAppOpened({ cta_location: ctaLocation, language: locale });
}

export function HomePage({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  const appHref = (content: string) => kaironAppUrl(locale, content, getLaunchPhase());

  return (
    <div style={{ background: BG, color: "#F5F3F0", overflowX: "hidden", position: "relative" }}>
      <style>{`
        @keyframes gsPulse { 0%,100% { opacity: 0.35; transform: scale(1); } 50% { opacity: 1; transform: scale(1.35); } }
        @keyframes gsRise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes gsFade { from { opacity: 0; } to { opacity: 1; } }
        .gs-home a { color: ${ORANGE}; }
        .gs-home input, .gs-home textarea, .gs-home button { font-family: inherit; }
        .gs-home ::placeholder { color: rgba(245,243,240,0.32); }
      `}</style>
      <div className="gs-home">
        <SiteHeader c={c} locale={locale} />
        <Hero c={c} appHref={appHref} locale={locale} />
        <Mirror c={c} />
        <ProductScroll c={c} locale={locale} />
        <Nocturne c={c} />
        <Patterns c={c} />
        <Method c={c} />
        <Validation c={c} />
        <Pricing c={c} appHref={appHref} locale={locale} />
        <House c={c} />
        <FinalCta c={c} appHref={appHref} locale={locale} />
        <SiteFooter c={c} locale={locale} />
      </div>
    </div>
  );
}

function SiteHeader({ c, locale }: { c: Copy; locale: Locale }) {
  return (
    <header
      style={{
        position: "sticky", top: 0, zIndex: 60,
        background: "rgba(10,10,11,0.82)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(245,243,240,0.07)",
      }}
    >
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "13px clamp(18px,4vw,40px)", display: "flex", alignItems: "center", gap: "clamp(16px,3vw,40px)", justifyContent: "space-between" }}>
        <a href="#top" style={{ display: "flex", alignItems: "center", flex: "none" }}>
          <img src={gsLogoLight} alt="G-Structure" style={{ height: 30, width: "auto", display: "block" }} />
        </a>
        <nav aria-label={locale === "es" ? "Principal" : "Main"} style={{ display: "flex", alignItems: "center", gap: "clamp(12px,2vw,26px)", flexWrap: "wrap", justifyContent: "flex-end" }}>
          <a href="#espejo" className="gs-nav-link" style={{ color: "rgba(245,243,240,0.6)", fontSize: "13.5px", whiteSpace: "nowrap" }}>{c.navMirror}</a>
          <a href="#producto" className="gs-nav-link" style={{ color: "rgba(245,243,240,0.6)", fontSize: "13.5px", whiteSpace: "nowrap" }}>KAIRON</a>
          <a href="#metodo" className="gs-nav-link" style={{ color: "rgba(245,243,240,0.6)", fontSize: "13.5px", whiteSpace: "nowrap" }}>{c.navMethod}</a>
          <Link to="/teams" className="gs-nav-link" style={{ color: "rgba(245,243,240,0.6)", fontSize: "13.5px", whiteSpace: "nowrap" }}>{c.navTeams}</Link>
          <a href="#precio" className="gs-nav-link" style={{ color: "rgba(245,243,240,0.6)", fontSize: "13.5px", whiteSpace: "nowrap" }}>{c.navPricing}</a>
          <div role="group" aria-label="Language" style={{ display: "flex", border: "1px solid rgba(245,243,240,0.14)", borderRadius: 999, overflow: "hidden", flex: "none" }}>
            <Link to="/" className="gs-lang-btn" aria-current={locale === "es" ? "page" : undefined} style={langBtnStyle(locale === "es")}>ES</Link>
            <Link to="/en" className="gs-lang-btn" aria-current={locale === "en" ? "page" : undefined} style={langBtnStyle(locale === "en")}>EN</Link>
          </div>
          <a href="#precio" className="gs-cta-pill" style={{ background: ORANGE, color: "#1A1000", fontWeight: 600, fontSize: "13.5px", padding: "10px 17px", borderRadius: 999, whiteSpace: "nowrap" }}>{c.cta}</a>
        </nav>
      </div>
      <style>{`
        .gs-nav-link:hover { color: #F5F3F0; }
        .gs-cta-pill:hover { background: ${ORANGE_HOVER}; }
        .gs-nav-link:focus-visible, .gs-cta-pill:focus-visible, .gs-lang-btn:focus-visible {
          outline: 2px solid ${ORANGE}; outline-offset: 3px; border-radius: 4px;
        }
      `}</style>
    </header>
  );
}

function langBtnStyle(active: boolean): React.CSSProperties {
  return {
    border: "none", background: active ? "rgba(240,160,70,0.16)" : "transparent",
    color: active ? ORANGE : "rgba(245,243,240,0.5)", fontSize: "11.5px", fontWeight: 600,
    letterSpacing: "0.08em", padding: "8px 11px", textDecoration: "none", display: "inline-block",
  };
}

function Hero({ c, appHref, locale }: { c: Copy; appHref: (content: string) => string; locale: Locale }) {
  return (
    <section id="top" style={{ position: "relative", minHeight: "88vh", display: "grid", placeItems: "center", padding: "clamp(70px,11vw,150px) clamp(18px,5vw,40px) clamp(56px,8vw,100px)" }}>
      <div aria-hidden style={{ position: "absolute", top: "-10%", left: "50%", transform: "translateX(-50%)", width: "min(1100px,120vw)", height: 600, background: "radial-gradient(closest-side, rgba(240,160,70,0.13), transparent 78%)", pointerEvents: "none" }} />
      <div style={{ position: "relative", maxWidth: 1000, textAlign: "center", zIndex: 2 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 9, border: "1px solid rgba(245,243,240,0.14)", borderRadius: 999, padding: "7px 15px", fontSize: "11.5px", letterSpacing: "0.17em", textTransform: "uppercase", color: "rgba(245,243,240,0.62)" }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: ORANGE, animation: "gsPulse 2.6s ease-in-out infinite" }} />
          {c.heroKicker}
        </div>
        <h1 className="font-display" style={{ fontWeight: 700, fontSize: "clamp(42px,8.4vw,104px)", lineHeight: 0.98, letterSpacing: "-0.035em", margin: "clamp(22px,3vw,34px) 0 0" }}>
          {c.heroL1}<br /><span style={{ color: ORANGE }}>{c.heroL2}</span>
        </h1>
        <p style={{ fontSize: "clamp(16.5px,1.9vw,21px)", lineHeight: 1.55, color: "rgba(245,243,240,0.66)", margin: "clamp(20px,3vw,30px) auto 0", maxWidth: "40em" }}>{c.heroSub}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 13, justifyContent: "center", marginTop: "clamp(30px,4vw,44px)" }}>
          <a
            href="#espejo"
            className="gs-cta-pill"
            style={{ background: ORANGE, color: "#1A1000", fontWeight: 600, fontSize: 16, padding: "17px 30px", borderRadius: 999 }}
          >
            {c.heroCta}
          </a>
          <a
            href={appHref("home_hero_secondary")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackAppCta(locale, "home_hero_secondary")}
            className="gs-outline-pill"
            style={{ border: "1px solid rgba(245,243,240,0.22)", color: "#F5F3F0", fontWeight: 500, fontSize: 16, padding: "17px 30px", borderRadius: 999 }}
          >
            {c.heroCta2}
          </a>
        </div>
        <div style={{ fontSize: 13, color: "rgba(245,243,240,0.4)", marginTop: 18 }}>{c.heroNote}</div>
      </div>
      <style>{`
        .gs-cta-pill:hover { background: ${ORANGE_HOVER}; }
        .gs-outline-pill:hover { border-color: #F5F3F0; color: #F5F3F0; }
      `}</style>
    </section>
  );
}

function Mirror({ c }: { c: Copy }) {
  const [excuse, setExcuse] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MirrorReply | null>(null);

  const ask = () => {
    const text = excuse.trim();
    if (!text || loading) return;
    setLoading(true);
    setResult(null);

    // Keyword scan across every pattern; the pattern with the most hits wins.
    // Ties keep the first (earliest-defined) pattern. No match falls back to
    // the generic variants. Fully client-side — no LLM call involved.
    const lower = text.toLowerCase();
    let bestIndex = -1;
    let bestScore = 0;
    c.mirrorPatterns.forEach((p, i) => {
      const score = p.keywords.reduce((n, kw) => n + (lower.includes(kw) ? 1 : 0), 0);
      if (score > bestScore) { bestScore = score; bestIndex = i; }
    });
    const variants = bestIndex >= 0 ? c.mirrorPatterns[bestIndex].variants : c.mirrorGeneric;
    const canned = variants[Math.floor(Math.random() * variants.length)];

    window.setTimeout(() => {
      setLoading(false);
      setResult(canned);
    }, 900);
  };

  const canAsk = excuse.trim().length > 3 && !loading;

  return (
    <section id="espejo" style={{ padding: "clamp(50px,7vw,90px) clamp(18px,5vw,40px) clamp(70px,10vw,130px)", position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "11.5px", letterSpacing: "0.19em", textTransform: "uppercase", color: ORANGE }}>{c.mirrorKicker}</div>
          <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(28px,4.4vw,50px)", lineHeight: 1.06, letterSpacing: "-0.025em", margin: "15px 0 0" }}>{c.mirrorTitle}</h2>
          <p style={{ fontSize: "16.5px", lineHeight: 1.6, color: "rgba(245,243,240,0.6)", margin: "16px auto 0", maxWidth: "34em" }}>{c.mirrorSub}</p>
        </div>

        <div style={{ marginTop: "clamp(30px,4vw,46px)", border: "1px solid rgba(245,243,240,0.11)", borderRadius: 20, background: "linear-gradient(180deg,#141415,#101011)", padding: "clamp(20px,3vw,30px)", boxShadow: "0 50px 100px -50px rgba(0,0,0,0.9)" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
            {c.mirrorEx.map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => setExcuse(ex)}
                style={{
                  border: `1px solid ${excuse === ex ? "rgba(240,160,70,0.5)" : "rgba(245,243,240,0.14)"}`,
                  background: excuse === ex ? "rgba(240,160,70,0.1)" : "transparent",
                  color: excuse === ex ? ORANGE : "rgba(245,243,240,0.6)",
                  borderRadius: 999, padding: "9px 15px", fontSize: "13.5px", cursor: "pointer", transition: "all 0.18s",
                }}
              >
                {ex}
              </button>
            ))}
          </div>
          <textarea
            rows={3}
            value={excuse}
            onChange={(e) => setExcuse(e.target.value)}
            placeholder={c.mirrorPlaceholder}
            className="gs-mirror-textarea"
            style={{ width: "100%", marginTop: 16, background: "rgba(245,243,240,0.05)", border: "1px solid rgba(245,243,240,0.14)", borderRadius: 13, padding: "17px 18px", color: "#F5F3F0", fontSize: "16.5px", lineHeight: 1.5, outline: "none", resize: "none" }}
          />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center", justifyContent: "space-between", marginTop: 14 }}>
            <div style={{ fontSize: "12.5px", color: "rgba(245,243,240,0.36)", maxWidth: "32em" }}>{c.mirrorDisclaimer}</div>
            <button
              type="button"
              onClick={ask}
              disabled={!canAsk}
              style={{
                border: "none", borderRadius: 999, padding: "15px 26px", fontSize: "15.5px", fontWeight: 600, transition: "all 0.18s",
                background: canAsk ? ORANGE : "rgba(245,243,240,0.1)", color: canAsk ? "#1A1000" : "rgba(245,243,240,0.4)",
                cursor: canAsk ? "pointer" : "default",
              }}
            >
              {loading ? c.mirrorAsking : c.mirrorAsk}
            </button>
          </div>

          {result ? (
            <div style={{ marginTop: 24, paddingTop: 24, borderTop: "1px solid rgba(245,243,240,0.1)", animation: "gsRise 0.5s ease both" }}>
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <span style={{ flex: "none", width: 34, height: 34, borderRadius: "50%", background: "#4B3FD4", display: "grid", placeItems: "center" }} className="font-display" >
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>K</span>
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "11.5px", letterSpacing: "0.17em", textTransform: "uppercase", color: "#8A7CF5" }}>KAI</div>
                  <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "clamp(18px,2.1vw,22px)", lineHeight: 1.5, color: "#F5F3F0", margin: "9px 0 0", whiteSpace: "pre-wrap" }}>{result.reply}</p>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 13, marginTop: 26 }}>
                <div style={{ border: "1px solid rgba(245,243,240,0.11)", borderRadius: 13, padding: 18 }}>
                  <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(245,243,240,0.45)" }}>{c.mirrorPattern}</div>
                  <div className="font-display" style={{ fontSize: 19, fontWeight: 600, marginTop: 8, color: ORANGE }}>{result.pattern}</div>
                </div>
                <div style={{ border: "1px solid rgba(240,160,70,0.3)", borderRadius: 13, padding: 18, background: "rgba(240,160,70,0.07)" }}>
                  <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(245,243,240,0.45)" }}>{c.mirrorIndex}</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 7, marginTop: 8 }}>
                    <span className="font-display" style={{ fontSize: 34, fontWeight: 700, lineHeight: 1 }}>{result.friction}</span>
                    <span style={{ fontSize: 13, color: "rgba(245,243,240,0.45)" }}>/ 100</span>
                  </div>
                </div>
                <div style={{ border: "1px solid rgba(245,243,240,0.11)", borderRadius: 13, padding: 18 }}>
                  <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(245,243,240,0.45)" }}>{c.mirrorAction}</div>
                  <div style={{ fontSize: 15, lineHeight: 1.5, marginTop: 8, color: "rgba(245,243,240,0.85)" }}>{result.action}</div>
                </div>
              </div>
              <a href="#precio" className="gs-cta-pill" style={{ display: "inline-block", marginTop: 22, background: ORANGE, color: "#1A1000", fontWeight: 600, fontSize: "15.5px", padding: "15px 26px", borderRadius: 999 }}>{c.mirrorCta}</a>
            </div>
          ) : null}
        </div>
      </div>
      <style>{`
        .gs-mirror-textarea:focus { border-color: ${ORANGE}; }
        .gs-cta-pill:hover { background: ${ORANGE_HOVER}; }
      `}</style>
    </section>
  );
}

function ProductScroll({ c, locale }: { c: Copy; locale: Locale }) {
  const [shot, setShot] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const shots = locale === "es" ? PRODUCT_SHOTS_ES : PRODUCT_SHOTS_EN;

  useEffect(() => {
    const nodes = refs.current.filter(Boolean) as HTMLDivElement[];
    if (!nodes.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const i = Number(entry.target.getAttribute("data-shot"));
            setShot(i);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <section id="producto" style={{ padding: "clamp(60px,9vw,120px) clamp(18px,5vw,40px)", borderTop: "1px solid rgba(245,243,240,0.07)", position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <div style={{ maxWidth: 760 }}>
          <div style={{ fontSize: "11.5px", letterSpacing: "0.19em", textTransform: "uppercase", color: ORANGE }}>{c.prodKicker}</div>
          <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(30px,5vw,58px)", lineHeight: 1.03, letterSpacing: "-0.03em", margin: "15px 0 0" }}>{c.prodTitle}</h2>
          <p style={{ fontSize: "clamp(16px,1.8vw,19.5px)", lineHeight: 1.6, color: "rgba(245,243,240,0.62)", margin: "18px 0 0" }}>{c.prodSub}</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: "clamp(24px,4vw,60px)", marginTop: "clamp(36px,5vw,64px)", alignItems: "start" }}>
          <div style={{ display: "grid", gap: "clamp(48px,9vh,120px)", padding: "6vh 0" }}>
            {c.steps.map((s, i) => (
              <div key={s.t} data-shot={i} ref={(el) => { refs.current[i] = el; }} style={{ minHeight: "34vh" }}>
                <div className="font-display" style={{ fontSize: 12, color: "rgba(245,243,240,0.35)", letterSpacing: "0.12em" }}>{String(i + 1).padStart(2, "0")}</div>
                <h3 className="font-display" style={{ fontSize: "clamp(22px,2.7vw,31px)", fontWeight: 600, lineHeight: 1.15, letterSpacing: "-0.02em", margin: "12px 0 0" }}>{s.t}</h3>
                <p style={{ fontSize: "16.5px", lineHeight: 1.6, color: "rgba(245,243,240,0.6)", margin: "13px 0 0", maxWidth: "30em" }}>{s.b}</p>
              </div>
            ))}
          </div>

          <div style={{ position: "sticky", top: "15vh", display: "grid", placeItems: "center", minHeight: "70vh" }}>
            <div aria-hidden style={{ position: "absolute", width: "110%", height: "70%", background: "radial-gradient(closest-side, rgba(240,160,70,0.16), transparent 75%)", pointerEvents: "none" }} />
            <div style={{ position: "relative", width: "100%", maxWidth: 340 }}>
              <img
                key={shot}
                src={shots[shot]}
                alt="KAIRON"
                style={{ width: "100%", height: "auto", display: "block", filter: "drop-shadow(0 40px 70px rgba(0,0,0,0.75))", animation: "gsFade 0.45s ease both" }}
              />
            </div>
            <div style={{ position: "relative", display: "flex", gap: 7, marginTop: 22 }}>
              {c.steps.map((s, i) => (
                <span key={s.t} style={{ width: 6, height: 6, borderRadius: "50%", background: i === shot ? ORANGE : "rgba(245,243,240,0.2)", transition: "background 0.3s" }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Nocturne({ c }: { c: Copy }) {
  return (
    <section style={{ background: "#0B2A4A", position: "relative", zIndex: 2, overflow: "hidden" }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(700px 400px at 78% 20%, rgba(120,180,255,0.13), transparent 72%)", pointerEvents: "none" }} />
      <div style={{ position: "relative", maxWidth: 1240, margin: "0 auto", padding: "clamp(60px,9vw,120px) clamp(18px,5vw,40px)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(32px,5vw,70px)", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: "11.5px", letterSpacing: "0.19em", textTransform: "uppercase", color: "#8FC4FF" }}>{c.nocKicker}</div>
          <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(28px,4.6vw,52px)", lineHeight: 1.05, letterSpacing: "-0.03em", margin: "15px 0 0" }}>{c.nocTitle}</h2>
          <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "clamp(18px,2.2vw,24px)", lineHeight: 1.5, color: "rgba(255,255,255,0.78)", margin: "20px 0 0", maxWidth: "26em" }}>{c.nocBody}</p>
          <a href="#precio" className="gs-noc-cta" style={{ display: "inline-block", marginTop: 30, border: "1px solid rgba(255,255,255,0.3)", color: "#fff", fontWeight: 500, fontSize: "15.5px", padding: "15px 26px", borderRadius: 999 }}>{c.nocCta}</a>
        </div>
        <div style={{ display: "grid", placeItems: "center" }}>
          <img src={kaironNocturno} alt="KAIRON Nocturno" style={{ width: "100%", maxWidth: 300, height: "auto", display: "block", filter: "drop-shadow(0 40px 70px rgba(0,0,0,0.6))" }} />
        </div>
      </div>
      <style>{`.gs-noc-cta:hover { border-color: #fff; color: #fff; }`}</style>
    </section>
  );
}

function Patterns({ c }: { c: Copy }) {
  const [pat, setPat] = useState<PatternKey>(0);
  const active = c.patterns[pat];
  return (
    <section id="patrones" style={{ padding: "clamp(60px,9vw,120px) clamp(18px,5vw,40px)", position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ fontSize: "11.5px", letterSpacing: "0.19em", textTransform: "uppercase", color: ORANGE }}>{c.patKicker}</div>
        <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(28px,4.6vw,52px)", lineHeight: 1.05, letterSpacing: "-0.03em", margin: "15px 0 0", maxWidth: "22em" }}>{c.patTitle}</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: "clamp(28px,4vw,42px)" }}>
          {c.patterns.map((p, i) => {
            const isActive = i === pat;
            return (
              <button
                key={p.name}
                type="button"
                onClick={() => setPat(i as PatternKey)}
                style={{
                  border: `1px solid ${isActive ? ORANGE : "rgba(245,243,240,0.14)"}`,
                  background: isActive ? ORANGE : "transparent",
                  color: isActive ? "#1A1000" : "rgba(245,243,240,0.7)",
                  fontWeight: isActive ? 600 : 400,
                  borderRadius: 999, padding: "12px 20px", fontSize: 15, cursor: "pointer", transition: "all 0.18s",
                }}
              >
                {p.name}
              </button>
            );
          })}
        </div>
        <div style={{ marginTop: 26, border: "1px solid rgba(245,243,240,0.11)", borderRadius: 18, padding: "clamp(24px,4vw,42px)", background: "linear-gradient(180deg,#131314,#0F0F10)", minHeight: 220 }}>
          <div style={{ fontFamily: "'Newsreader', Georgia, serif", fontStyle: "italic", fontSize: "clamp(20px,2.7vw,30px)", lineHeight: 1.4, color: "#F5F3F0", maxWidth: "24em" }}>{active.q}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 22, marginTop: 28, paddingTop: 26, borderTop: "1px solid rgba(245,243,240,0.09)" }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(245,243,240,0.42)" }}>{c.patWhat}</div>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: "rgba(245,243,240,0.75)", margin: "10px 0 0" }}>{active.d}</p>
            </div>
            <div>
              <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: ORANGE }}>{c.patHow}</div>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: "rgba(245,243,240,0.75)", margin: "10px 0 0" }}>{active.h}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Method({ c }: { c: Copy }) {
  return (
    <section id="metodo" style={{ padding: "clamp(60px,9vw,120px) clamp(18px,5vw,40px)", borderTop: "1px solid rgba(245,243,240,0.07)", position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "clamp(28px,4vw,60px)", alignItems: "end" }}>
          <div>
            <div style={{ fontSize: "11.5px", letterSpacing: "0.19em", textTransform: "uppercase", color: ORANGE }}>{c.iroKicker}</div>
            <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(28px,4.6vw,52px)", lineHeight: 1.05, letterSpacing: "-0.03em", margin: "15px 0 0" }}>Método I-R-O™</h2>
          </div>
          <p style={{ fontSize: "16.5px", lineHeight: 1.6, color: "rgba(245,243,240,0.6)", margin: 0, maxWidth: "32em" }}>{c.iroSub}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 1, marginTop: "clamp(32px,4vw,56px)", background: "rgba(245,243,240,0.1)", border: "1px solid rgba(245,243,240,0.1)", borderRadius: 18, overflow: "hidden" }}>
          {c.iro.map((step, i) => (
            <div key={step.t} style={{ background: BG, padding: "clamp(26px,3.5vw,40px)" }}>
              <div className="font-display" style={{ fontSize: "clamp(48px,6vw,76px)", fontWeight: 700, color: ORANGE, lineHeight: 0.85, letterSpacing: "-0.04em" }}>{["I", "R", "O"][i]}</div>
              <div className="font-display" style={{ fontSize: 21, fontWeight: 600, marginTop: 20 }}>{step.t}</div>
              <p style={{ fontSize: "15.5px", lineHeight: 1.6, color: "rgba(245,243,240,0.58)", margin: "11px 0 0" }}>{step.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Validation({ c }: { c: Copy }) {
  return (
    <section id="validacion" style={{ padding: "clamp(60px,9vw,120px) clamp(18px,5vw,40px)", position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "clamp(28px,4vw,60px)", alignItems: "end" }}>
          <div>
            <div style={{ fontSize: "11.5px", letterSpacing: "0.19em", textTransform: "uppercase", color: ORANGE }}>{c.valKicker}</div>
            <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(28px,4.6vw,52px)", lineHeight: 1.05, letterSpacing: "-0.03em", margin: "15px 0 0" }}>{c.valTitle}</h2>
          </div>
          <div style={{ display: "flex", gap: "clamp(20px,3vw,40px)", flexWrap: "wrap" }}>
            <Stat n="52" label={c.valUsers} />
            <Stat n="40" label={c.valEc} />
            <Stat n="12" label={c.valUs} />
          </div>
        </div>

        <div style={{ border: "1px solid rgba(240,160,70,0.28)", borderRadius: 18, background: "rgba(240,160,70,0.06)", padding: "clamp(26px,4vw,44px)", marginTop: "clamp(32px,4vw,52px)" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: ORANGE }}>{c.valFeatured}</div>
          <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "clamp(22px,3.2vw,36px)", lineHeight: 1.35, margin: "16px 0 0", maxWidth: "26em" }}>{c.featuredTestimonial.q}</p>
          <div style={{ fontSize: 14, color: "rgba(245,243,240,0.55)", marginTop: 20 }}>{c.featuredTestimonial.a}</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16, marginTop: 16 }}>
          {c.testimonials.map((t) => (
            <div key={t.a} style={{ border: "1px solid rgba(245,243,240,0.1)", borderRadius: 16, padding: 26, display: "flex", flexDirection: "column", gap: 16 }}>
              <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 19, lineHeight: 1.45, margin: 0 }}>{t.q}</p>
              <div style={{ marginTop: "auto", fontSize: 13, color: "rgba(245,243,240,0.5)", borderTop: "1px solid rgba(245,243,240,0.09)", paddingTop: 15 }}>{t.a}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 14, color: "rgba(245,243,240,0.42)", marginTop: 22 }}>{c.valStage}</div>

        <div style={{ marginTop: "clamp(36px,5vw,56px)", paddingTop: 30, borderTop: "1px solid rgba(245,243,240,0.09)" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,243,240,0.4)" }}>{c.credKicker}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 22, marginTop: 22 }}>
            {c.credentials.map((cr) => (
              <div key={cr.n}>
                <div className="font-display" style={{ fontSize: 17, fontWeight: 600, lineHeight: 1.3 }}>{cr.n}</div>
                <div style={{ fontSize: 14, lineHeight: 1.55, color: "rgba(245,243,240,0.52)", marginTop: 8 }}>{cr.b}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="font-display" style={{ fontSize: "clamp(34px,4vw,48px)", fontWeight: 700, lineHeight: 1 }}>{n}</div>
      <div style={{ fontSize: 13, color: "rgba(245,243,240,0.5)", marginTop: 5 }}>{label}</div>
    </div>
  );
}

function Pricing({ c, appHref, locale }: { c: Copy; appHref: (content: string) => string; locale: Locale }) {
  return (
    <section id="precio" style={{ padding: "clamp(60px,9vw,120px) clamp(18px,5vw,40px)", borderTop: "1px solid rgba(245,243,240,0.07)", position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: "11.5px", letterSpacing: "0.19em", textTransform: "uppercase", color: ORANGE }}>{c.priceKicker}</div>
        <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(28px,4.6vw,52px)", lineHeight: 1.05, letterSpacing: "-0.03em", margin: "15px auto 0", maxWidth: "20em" }}>{c.priceTitle}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 16, marginTop: "clamp(32px,4vw,50px)", textAlign: "left" }}>
          <div style={{ border: "1px solid rgba(245,243,240,0.11)", borderRadius: 16, padding: 30 }}>
            <div style={{ fontSize: "12.5px", letterSpacing: "0.13em", textTransform: "uppercase", color: "rgba(245,243,240,0.5)" }}>{c.priceLatam}</div>
            <div className="font-display" style={{ fontSize: 42, fontWeight: 700, marginTop: 12, letterSpacing: "-0.03em" }}>$9.99<span style={{ fontSize: 16, fontWeight: 400, color: "rgba(245,243,240,0.5)" }}>/{c.priceMonth}</span></div>
          </div>
          <div style={{ border: "1px solid rgba(245,243,240,0.11)", borderRadius: 16, padding: 30 }}>
            <div style={{ fontSize: "12.5px", letterSpacing: "0.13em", textTransform: "uppercase", color: "rgba(245,243,240,0.5)" }}>{c.priceUs}</div>
            <div className="font-display" style={{ fontSize: 42, fontWeight: 700, marginTop: 12, letterSpacing: "-0.03em" }}>$18.99<span style={{ fontSize: 16, fontWeight: 400, color: "rgba(245,243,240,0.5)" }}>/{c.priceMonth}</span></div>
          </div>
          <div style={{ border: "1px solid rgba(240,160,70,0.3)", borderRadius: 16, padding: 30, background: "rgba(240,160,70,0.06)", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 18 }}>
            <div>
              <div style={{ fontSize: "12.5px", letterSpacing: "0.13em", textTransform: "uppercase", color: ORANGE }}>{c.priceTrial}</div>
              <div style={{ fontSize: 15, lineHeight: 1.5, color: "rgba(245,243,240,0.72)", marginTop: 10 }}>{c.priceTrialNote}</div>
            </div>
            <a
              href={appHref("home_pricing")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackAppCta(locale, "home_pricing")}
              className="gs-cta-pill"
              style={{ background: ORANGE, color: "#1A1000", fontWeight: 600, fontSize: 15, padding: "14px 20px", borderRadius: 999, textAlign: "center" }}
            >
              {c.cta}
            </a>
          </div>
        </div>
      </div>
      <style>{`.gs-cta-pill:hover { background: ${ORANGE_HOVER}; }`}</style>
    </section>
  );
}

function House({ c }: { c: Copy }) {
  return (
    <section id="casa" style={{ padding: "clamp(60px,9vw,120px) clamp(18px,5vw,40px)", position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <div style={{ maxWidth: 700 }}>
          <div style={{ fontSize: "11.5px", letterSpacing: "0.19em", textTransform: "uppercase", color: "rgba(245,243,240,0.45)" }}>{c.houseKicker}</div>
          <h2 className="font-display" style={{ fontWeight: 600, fontSize: "clamp(28px,4.6vw,52px)", lineHeight: 1.05, letterSpacing: "-0.03em", margin: "15px 0 0" }}>{c.houseTitle}</h2>
          <p style={{ fontSize: "16.5px", lineHeight: 1.6, color: "rgba(245,243,240,0.6)", margin: "18px 0 0" }}>{c.houseSub}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16, marginTop: "clamp(32px,4vw,50px)" }}>
          <div style={{ border: "1px solid rgba(240,160,70,0.3)", borderRadius: 16, padding: 28, background: "rgba(240,160,70,0.05)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
              <span className="font-display" style={{ fontSize: 16, fontWeight: 600, letterSpacing: "0.1em" }}>KAIRON</span>
              <span style={{ fontSize: "10.5px", letterSpacing: "0.14em", textTransform: "uppercase", color: ORANGE, border: "1px solid rgba(240,160,70,0.4)", borderRadius: 999, padding: "4px 9px" }}>{c.houseLive}</span>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: "rgba(245,243,240,0.68)", margin: "16px 0 0" }}>{c.houseKairon}</p>
          </div>
          <Link
            to="/teams"
            className="gs-house-link"
            style={{ border: "1px solid rgba(245,243,240,0.1)", borderRadius: 16, padding: 28, display: "flex", flexDirection: "column", color: "inherit", transition: "border-color 0.2s" }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
              <span className="font-display" style={{ fontSize: 16, fontWeight: 600, letterSpacing: "0.1em" }}>{c.houseWsName}</span>
              <span style={{ fontSize: "10.5px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,243,240,0.5)", border: "1px solid rgba(245,243,240,0.16)", borderRadius: 999, padding: "4px 9px" }}>B2B</span>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: "rgba(245,243,240,0.68)", margin: "16px 0 0" }}>{c.houseWs}</p>
            <span style={{ marginTop: 18, fontSize: 14, color: ORANGE }}>{c.houseWsLink}</span>
          </Link>
          <div style={{ border: "1px dashed rgba(245,243,240,0.16)", borderRadius: 16, padding: 28 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
              <span className="font-display" style={{ fontSize: 16, fontWeight: 600, letterSpacing: "0.1em", color: "rgba(245,243,240,0.45)" }}>{c.houseNextName}</span>
              <span style={{ fontSize: "10.5px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,243,240,0.35)", border: "1px solid rgba(245,243,240,0.12)", borderRadius: 999, padding: "4px 9px" }}>{c.houseSoon}</span>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: "rgba(245,243,240,0.42)", margin: "16px 0 0" }}>{c.houseNext}</p>
          </div>
        </div>
      </div>
      <style>{`.gs-house-link:hover { border-color: rgba(240,160,70,0.5); }`}</style>
    </section>
  );
}

function FinalCta({ c, appHref, locale }: { c: Copy; appHref: (content: string) => string; locale: Locale }) {
  return (
    <section style={{ padding: "clamp(70px,11vw,150px) clamp(18px,5vw,40px)", position: "relative", zIndex: 2, textAlign: "center", borderTop: "1px solid rgba(245,243,240,0.07)" }}>
      <div aria-hidden style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "min(900px,110vw)", height: 400, background: "radial-gradient(closest-side, rgba(240,160,70,0.11), transparent 78%)", pointerEvents: "none" }} />
      <div style={{ position: "relative", maxWidth: 820, margin: "0 auto" }}>
        <h2 className="font-display" style={{ fontWeight: 700, fontSize: "clamp(32px,6vw,72px)", lineHeight: 1, letterSpacing: "-0.035em", margin: 0 }}>{c.endTitle}</h2>
        <p style={{ fontSize: "clamp(16px,1.9vw,20px)", lineHeight: 1.6, color: "rgba(245,243,240,0.62)", margin: "20px auto 0", maxWidth: "32em" }}>{c.endSub}</p>
        <a
          href={appHref("home_final")}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackAppCta(locale, "home_final")}
          className="gs-cta-pill"
          style={{ display: "inline-block", marginTop: 32, background: ORANGE, color: "#1A1000", fontWeight: 600, fontSize: 17, padding: "18px 34px", borderRadius: 999 }}
        >
          {c.cta}
        </a>
      </div>
      <style>{`.gs-cta-pill:hover { background: ${ORANGE_HOVER}; }`}</style>
    </section>
  );
}

function SiteFooter({ c, locale }: { c: Copy; locale: Locale }) {
  const investorsHref = locale === "es" ? "/inversores" : "/en/investors";
  const teamHref = locale === "es" ? "/unete-al-equipo" : "/en/join-the-team";
  return (
    <footer style={{ background: "#070708", borderTop: "1px solid rgba(245,243,240,0.07)", padding: "clamp(46px,6vw,76px) clamp(18px,5vw,40px)", position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 34 }}>
        <div>
          <img src={gsLogoLight} alt="G-Structure" style={{ height: 34, width: "auto", display: "block" }} />
          <p style={{ fontSize: 14, lineHeight: 1.6, margin: "15px 0 0", maxWidth: "24em", color: "rgba(245,243,240,0.5)" }}>{c.footAbout}</p>
        </div>
        <div style={{ display: "grid", gap: 9, fontSize: 14, alignContent: "start" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(245,243,240,0.35)", marginBottom: 4 }}>{c.footProduct}</div>
          <a href="#producto" className="gs-footer-link" style={{ color: "rgba(245,243,240,0.62)" }}>KAIRON</a>
          <a href="#precio" className="gs-footer-link" style={{ color: "rgba(245,243,240,0.62)" }}>{c.navPricing}</a>
          <a href="#metodo" className="gs-footer-link" style={{ color: "rgba(245,243,240,0.62)" }}>Método I-R-O™</a>
        </div>
        <div style={{ display: "grid", gap: 9, fontSize: 14, alignContent: "start" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(245,243,240,0.35)", marginBottom: 4 }}>{c.footCompany}</div>
          <Link to="/teams" className="gs-footer-link" style={{ color: "rgba(245,243,240,0.62)" }}>{c.footEnterprise}</Link>
          <Link to={investorsHref as string} className="gs-footer-link" style={{ color: "rgba(245,243,240,0.62)" }}>{c.footInvestors}</Link>
          <Link to={teamHref as string} className="gs-footer-link" style={{ color: "rgba(245,243,240,0.62)" }}>{c.footTeam}</Link>
        </div>
        <div style={{ display: "grid", gap: 9, fontSize: 14, alignContent: "start" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(245,243,240,0.35)", marginBottom: 4 }}>{c.footContact}</div>
          <a href="mailto:guillermo@g-structure.co" className="gs-footer-link" style={{ color: "rgba(245,243,240,0.62)" }}>guillermo@g-structure.co</a>
          <a href="https://wa.me/593986875121" className="gs-footer-link" style={{ color: "rgba(245,243,240,0.62)" }}>+593 98 687 5121</a>
        </div>
      </div>
      <div style={{ maxWidth: 1240, margin: "38px auto 0", paddingTop: 22, borderTop: "1px solid rgba(245,243,240,0.07)", display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "space-between", fontSize: "12.5px", color: "rgba(245,243,240,0.35)" }}>
        <span>© 2026 G-Structure. KAIRON™ · Método I-R-O™.</span>
        <span style={{ maxWidth: "44em" }}>{c.footLegal}</span>
      </div>
      <style>{`
        .gs-footer-link:hover { color: ${ORANGE}; }
        .gs-footer-link:focus-visible { outline: 2px solid ${ORANGE}; outline-offset: 3px; border-radius: 4px; }
      `}</style>
    </footer>
  );
}
