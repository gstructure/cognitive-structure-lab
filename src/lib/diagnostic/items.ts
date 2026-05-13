// IGPE V1.1 — Inventario G-Structure de Patrones de Ejecución.
// Catálogo de ítems del Diagnóstico de Fricción Ejecutiva.

export type DimensionKey = "P" | "PE" | "AS" | "PI";

export const DIMENSION_LABEL: Record<DimensionKey, string> = {
  P: "Procrastinación de Ejecución",
  PE: "Perfeccionismo de Ejecución",
  AS: "Autosabotaje de Ejecución",
  PI: "Patrón del Impostor en Ejecución",
};

export interface LikertItem {
  id: string;
  dimension: DimensionKey;
  text: string;
}

export const LIKERT_ITEMS: LikertItem[] = [
  // Procrastinación
  { id: "P1", dimension: "P", text: "Postergo tareas importantes aunque sé que afectan mis resultados." },
  { id: "P2", dimension: "P", text: "Me cuesta iniciar tareas cuando no tengo claridad total sobre cómo hacerlas." },
  { id: "P3", dimension: "P", text: "Suelo esperar presión externa para activar mi ejecución." },
  { id: "P4", dimension: "P", text: "Me ocupo en tareas menores para evitar una tarea más importante." },
  { id: "P5", dimension: "P", text: "Cuando una tarea me incomoda, busco razones para dejarla para después." },
  { id: "P6", dimension: "P", text: "Inicio tarde proyectos que requieren concentración o toma de decisiones." },
  { id: "P7", dimension: "P", text: "Me digo que trabajaré mejor «más tarde», aunque eso me genere acumulación." },
  { id: "P8", dimension: "P", text: "La incertidumbre me hace retrasar acciones que debería iniciar." },
  { id: "P9", dimension: "P", text: "Evito comenzar tareas que podrían exponer mi desempeño." },
  { id: "P10", dimension: "P", text: "Me cuesta sostener una rutina de ejecución cuando no hay presión inmediata." },
  // Perfeccionismo
  { id: "PE1", dimension: "PE", text: "Me cuesta entregar algo si siento que todavía puede mejorar." },
  { id: "PE2", dimension: "PE", text: "Reviso mi trabajo más de lo necesario antes de cerrarlo." },
  { id: "PE3", dimension: "PE", text: "Me incomoda delegar porque temo que el resultado no salga como espero." },
  { id: "PE4", dimension: "PE", text: "Un error pequeño puede hacerme sentir que todo el trabajo pierde valor." },
  { id: "PE5", dimension: "PE", text: "Prefiero demorar una entrega antes que presentar algo que no esté impecable." },
  { id: "PE6", dimension: "PE", text: "Me cuesta distinguir entre excelencia y exceso de control." },
  { id: "PE7", dimension: "PE", text: "Tiendo a complicar tareas simples para asegurarme de que salgan perfectas." },
  { id: "PE8", dimension: "PE", text: "La posibilidad de equivocarme reduce mi velocidad de ejecución." },
  { id: "PE9", dimension: "PE", text: "Me cuesta cerrar tareas porque siempre encuentro algo más que ajustar." },
  { id: "PE10", dimension: "PE", text: "Cuando otros dependen de mi trabajo, siento presión por controlar cada detalle." },
  // Autosabotaje
  { id: "AS1", dimension: "AS", text: "Cuando empiezo a avanzar, aparecen decisiones o hábitos que terminan reduciendo mi continuidad." },
  { id: "AS2", dimension: "AS", text: "Me cuesta sostener procesos que podrían llevarme a mejores resultados." },
  { id: "AS3", dimension: "AS", text: "A veces abandono o debilito proyectos justo cuando empiezan a funcionar." },
  { id: "AS4", dimension: "AS", text: "Tomo decisiones que contradicen metas que yo mismo he declarado importantes." },
  { id: "AS5", dimension: "AS", text: "Cuando una oportunidad crece, también crece mi impulso de retirarme o complicarla." },
  { id: "AS6", dimension: "AS", text: "Me distraigo o desorganizo cuando estoy cerca de lograr algo relevante." },
  { id: "AS7", dimension: "AS", text: "Bajo mi nivel de compromiso cuando siento que las expectativas aumentan." },
  { id: "AS8", dimension: "AS", text: "A veces introduzco obstáculos que luego dificultan mi avance." },
  { id: "AS9", dimension: "AS", text: "Me cuesta mantener consistencia cuando el proyecto empieza a exigir mayor responsabilidad." },
  { id: "AS10", dimension: "AS", text: "Cuando algo empieza a salir bien, me cuesta sostener el mismo nivel de ejecución." },
  // Patrón del Impostor
  { id: "PI1", dimension: "PI", text: "Dudo de mi capacidad aunque tenga evidencia de que puedo hacerlo bien." },
  { id: "PI2", dimension: "PI", text: "Me cuesta reconocer mis logros sin atribuirlos a suerte, ayuda o circunstancias." },
  { id: "PI3", dimension: "PI", text: "Siento que debo prepararme más que los demás para merecer mi lugar." },
  { id: "PI4", dimension: "PI", text: "Evito exponer mis ideas por miedo a que otros noten mis limitaciones." },
  { id: "PI5", dimension: "PI", text: "Me comparo con personas que considero más competentes y eso afecta mi ejecución." },
  { id: "PI6", dimension: "PI", text: "Cuando recibo una oportunidad, pienso que quizás no estoy realmente listo." },
  { id: "PI7", dimension: "PI", text: "Me preocupa que otros sobreestimen mi capacidad y luego se decepcionen." },
  { id: "PI8", dimension: "PI", text: "Necesito validación externa para sentir seguridad en decisiones importantes." },
  { id: "PI9", dimension: "PI", text: "Aunque logre buenos resultados, siento que todavía debo demostrar que merezco estar ahí." },
  { id: "PI10", dimension: "PI", text: "Me cuesta actuar con autoridad cuando no me siento completamente seguro." },
];

export const LIKERT_SCALE = [
  { value: 1, label: "Casi nunca" },
  { value: 2, label: "Rara vez" },
  { value: 3, label: "A veces" },
  { value: 4, label: "Frecuentemente" },
  { value: 5, label: "Casi siempre" },
];

export const TRIGGERS: { id: string; label: string }[] = [
  { id: "T1", label: "Ambigüedad de tarea" },
  { id: "T2", label: "Deadline cercano" },
  { id: "T3", label: "Feedback o evaluación" },
  { id: "T4", label: "Alta visibilidad" },
  { id: "T5", label: "Delegación" },
  { id: "T6", label: "Oportunidad de crecimiento" },
  { id: "T7", label: "Conflicto o conversación difícil" },
  { id: "T8", label: "Tarea compleja" },
  { id: "T9", label: "Error o posibilidad de error" },
  { id: "T10", label: "Sobrecarga de trabajo" },
  { id: "T11", label: "Falta de autonomía" },
  { id: "T12", label: "Expectativas poco claras" },
];

export const EMOTIONS: { id: string; label: string }[] = [
  { id: "E1", label: "Ansiedad" },
  { id: "E2", label: "Frustración" },
  { id: "E3", label: "Vergüenza" },
  { id: "E4", label: "Culpa" },
  { id: "E5", label: "Miedo" },
  { id: "E6", label: "Enojo" },
  { id: "E7", label: "Saturación" },
  { id: "E8", label: "Desánimo" },
  { id: "E9", label: "Inseguridad" },
  { id: "E10", label: "Presión" },
];

export const BEHAVIORS: { id: string; label: string }[] = [
  { id: "CR1", label: "Postergo" },
  { id: "CR2", label: "Reviso en exceso" },
  { id: "CR3", label: "Busco aprobación" },
  { id: "CR4", label: "Evito conversaciones" },
  { id: "CR5", label: "Cambio de prioridad" },
  { id: "CR6", label: "Me sobrecargo" },
  { id: "CR7", label: "Controlo excesivamente" },
  { id: "CR8", label: "Me desconecto" },
  { id: "CR9", label: "Abandono o bajo compromiso" },
  { id: "CR10", label: "Complico el proceso" },
  { id: "CR11", label: "Me callo o reduzco visibilidad" },
  { id: "CR12", label: "Trabajo de último minuto" },
];

export const IMPACT_AREAS: { id: string; label: string }[] = [
  { id: "IP1", label: "Velocidad de ejecución" },
  { id: "IP2", label: "Calidad decisional" },
  { id: "IP3", label: "Cierre de tareas" },
  { id: "IP4", label: "Comunicación" },
  { id: "IP5", label: "Energía mental" },
  { id: "IP6", label: "Priorización" },
  { id: "IP7", label: "Consistencia" },
  { id: "IP8", label: "Visibilidad / liderazgo" },
  { id: "IP9", label: "Delegación" },
  { id: "IP10", label: "Resultados" },
];

export const RESPONSIBILITY_LEVELS = [
  "Fundador / CEO / Dirección general",
  "Alta dirección",
  "Gerencia media",
  "Coordinación / liderazgo de equipo",
  "Profesional individual",
  "Estudiante universitario",
  "Emprendedor independiente",
  "Otro",
];

export const MAIN_REASONS = [
  "Mejorar mi productividad personal",
  "Entender bloqueos de ejecución",
  "Mejorar liderazgo o toma de decisiones",
  "Llevar este diagnóstico a mi empresa",
  "Evaluar si necesito acompañamiento 1:1",
  "Otro",
];

export const COMPANY_SIZES = ["1 persona", "2–10", "11–50", "51–200", "201+"];

export const SECTORS = [
  "Tecnología",
  "Educación",
  "Servicios profesionales",
  "Salud",
  "Finanzas",
  "Comercio",
  "Industria",
  "ONG / impacto social",
  "Gobierno",
  "Otro",
];
