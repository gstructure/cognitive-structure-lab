// Interpretaciones IGPE V1.1: lecturas por patrón dominante y por perfil mixto.
import type { DimensionKey } from "./items";
import type { ComputedResults } from "./scoring";
import { dimensionLabel, triggerLabel, emotionLabel, behaviorLabel, impactLabel } from "./scoring";

export interface DominantInterpretation {
  reading: string;
  productivityImpact: string;
  intervention: string;
}

export const DOMINANT_INTERPRETATIONS: Record<DimensionKey, DominantInterpretation> = {
  P: {
    reading:
      "Tu patrón dominante sugiere una tendencia a retrasar la acción cuando una tarea se percibe como ambigua, pesada, incierta, compleja o emocionalmente costosa. La procrastinación de ejecución no se interpreta aquí como flojera, sino como una respuesta de evitación ante una demanda que el sistema interno percibe como amenazante o difícil de procesar.",
    productivityImpact:
      "Puede afectar velocidad de inicio, priorización, consistencia, cierre de tareas y acumulación de pendientes.",
    intervention:
      "Clarificación de tareas, reducción de ambigüedad, activación conductual mínima, segmentación de acciones y reestructuración de pensamientos automáticos como «necesito estar listo para empezar».",
  },
  PE: {
    reading:
      "Tu patrón dominante sugiere una tendencia a vincular calidad con control excesivo, revisión constante o miedo al error. En productividad, esto puede elevar estándares, pero también reducir velocidad, delegación y cierre.",
    productivityImpact:
      "Puede generar cuellos de botella, sobrecarga, lentitud decisional, dificultad para delegar y desgaste.",
    intervention:
      "Diferenciar excelencia de sobrecontrol, definir criterios de cierre, trabajar tolerancia al error funcional y construir entregas iterativas.",
  },
  AS: {
    reading:
      "Tu patrón dominante sugiere que el avance, la responsabilidad o la oportunidad pueden activar respuestas que terminan reduciendo continuidad. No significa que quieras fallar; significa que tu sistema puede interpretar el crecimiento como una fuente de presión o exposición.",
    productivityImpact:
      "Puede afectar consistencia, sostenibilidad del esfuerzo, confianza del equipo, aprovechamiento de oportunidades y continuidad estratégica.",
    intervention:
      "Identificar la amenaza asociada al avance, trabajar compromiso conductual, reducir decisiones contradictorias y sostener acciones clave durante periodos definidos.",
  },
  PI: {
    reading:
      "Tu patrón dominante sugiere dificultad para integrar logros, competencias o autoridad profesional como evidencia suficiente. Esto puede llevar a sobrepreparación, evitación de visibilidad, necesidad de validación y duda decisional.",
    productivityImpact:
      "Puede afectar liderazgo, presencia ejecutiva, toma de decisiones, comunicación, energía mental y aprovechamiento de oportunidades.",
    intervention:
      "Construcción de evidencia objetiva, reducción de dependencia de validación externa, exposición gradual a visibilidad y reestructuración de pensamientos de insuficiencia.",
  },
};

export interface MixedProfile {
  name: string;
  reading: string;
  cost: string;
  pathway: string;
}

const MIXED: Record<string, MixedProfile> = {
  "P+PE": {
    name: "Evitación por estándar excesivo",
    reading:
      "Tu sistema de ejecución tiende a postergar cuando percibe que una tarea debe cumplir con un estándar demasiado alto antes de empezar o entregarse. No se trata de falta de capacidad, sino de una combinación entre evitación e hiperexigencia. Esto puede generar demora, acumulación, presión de último minuto y dificultad para cerrar.",
    cost: "Velocidad reducida, cierre lento, exceso de revisión, acumulación de tareas.",
    pathway: "Reducir ambigüedad, definir una versión funcional mínima y separar excelencia de control total.",
  },
  "P+PI": {
    name: "Evitación por duda de competencia",
    reading:
      "Tu ejecución puede bloquearse cuando una tarea activa dudas sobre tu capacidad. La postergación aparece como una forma de evitar exposición, evaluación o posible error. Esto puede afectar inicio de tareas, visibilidad profesional y toma de decisiones.",
    cost: "Inicio tardío, baja exposición, búsqueda de seguridad antes de actuar, dependencia de validación.",
    pathway:
      "Construir evidencia objetiva de competencia y ejecutar pasos mínimos antes de sentir seguridad completa.",
  },
  "P+AS": {
    name: "Evitación por amenaza al avance",
    reading:
      "Tu sistema puede interpretar el avance como una fuente de mayor presión, expectativa o responsabilidad. Esto puede llevarte a postergar, desorganizarte o frenar procesos justo cuando empiezan a crecer.",
    cost: "Inconsistencia, abandono parcial, dificultad para sostener avance, ciclos de progreso y retroceso.",
    pathway:
      "Identificar qué amenaza aparece cuando avanzas y sostener una acción clave sin introducir nuevos obstáculos.",
  },
  "PE+PI": {
    name: "Sobrecontrol por validación",
    reading:
      "Tu ejecución puede estar marcada por la necesidad de demostrar competencia mediante control, preparación excesiva o revisión constante. El estándar alto no solo busca calidad, también busca reducir la inseguridad ante evaluación externa.",
    cost: "Sobreesfuerzo, lentitud, dificultad para delegar, fatiga y baja presencia ejecutiva.",
    pathway: "Distinguir evidencia real de competencia de necesidad constante de validación.",
  },
  "PE+AS": {
    name: "Control que bloquea continuidad",
    reading:
      "Tu sistema puede intentar proteger el resultado mediante control excesivo, pero ese mismo control termina agotando, demorando o fragmentando la continuidad. La búsqueda de seguridad puede convertirse en obstáculo para avanzar.",
    cost: "Cuellos de botella, agotamiento, retrasos, procesos complicados y pérdida de continuidad.",
    pathway: "Definir criterios de cierre, simplificar procesos y permitir iteración progresiva.",
  },
  "AS+PI": {
    name: "Avance vivido como exposición",
    reading:
      "Tu sistema puede experimentar el crecimiento, la visibilidad o la responsabilidad como exposición. Esto puede llevar a reducir compromiso, evitar oportunidades o generar obstáculos cuando el avance empieza a ser real.",
    cost: "Pérdida de oportunidades, baja visibilidad, inconsistencia y dificultad para sostener liderazgo.",
    pathway: "Separar exposición de amenaza y construir tolerancia gradual a mayor responsabilidad.",
  },
};

export function getMixedProfile(d: DimensionKey, s: DimensionKey): MixedProfile | null {
  const key1 = `${d}+${s}` as keyof typeof MIXED;
  const key2 = `${s}+${d}` as keyof typeof MIXED;
  return MIXED[key1] ?? MIXED[key2] ?? null;
}

// ---- Recommendation by IFE-GS ----
export function recommendProgram(ifeGs: number): { program: string; duration: string; message: string } {
  if (ifeGs <= 40) {
    return {
      program: "REESTRUCTURA 1:1",
      duration: "4 semanas",
      message:
        "Tu nivel de fricción ejecutiva parece manejable, pero ya hay patrones que pueden optimizarse con una intervención breve y focalizada.",
    };
  }
  if (ifeGs <= 60) {
    return {
      program: "REESTRUCTURA 1:1",
      duration: "6 semanas",
      message:
        "Tu resultado sugiere una fricción moderada que puede estar afectando áreas concretas de productividad. Una intervención de 6 semanas permitiría trabajar patrón, triggers, pensamiento automático y hábitos de ejecución.",
    };
  }
  if (ifeGs <= 80) {
    return {
      program: "REESTRUCTURA 1:1",
      duration: "8 semanas",
      message:
        "Tu resultado sugiere fricción alta. Se recomienda un proceso más completo para identificar, reestructurar y optimizar tu sistema de ejecución con seguimiento sostenido.",
    };
  }
  return {
    program: "REESTRUCTURA 1:1",
    duration: "8 semanas intensivo",
    message:
      "Tu resultado sugiere fricción crítica de ejecución. Se recomienda un proceso profundo y estructurado. Este resultado no implica diagnóstico clínico, pero sí indica que tus patrones pueden estar generando un costo productivo significativo.",
  };
}

const ENTERPRISE_LEVELS = [
  "Fundador / CEO / Dirección general",
  "Alta dirección",
  "Gerencia media",
];

export function shouldShowEnterprise(level: string | null | undefined, mainReason: string | null | undefined): boolean {
  if (mainReason === "Llevar este diagnóstico a mi empresa") return true;
  return ENTERPRISE_LEVELS.includes(level || "");
}

// ---- Weekly pathway by duration + dominant pattern ----
const PATHWAY_4: string[] = [
  "Identificación del patrón, triggers, pensamientos automáticos y costo productivo.",
  "Reestructuración cognitiva inicial y diferenciación entre hecho, interpretación y respuesta.",
  "Diseño de acciones puente, reducción de evitación y experimentos conductuales.",
  "Plan de optimización, prevención de recaídas funcionales y sistema de seguimiento.",
];
const PATHWAY_6: string[] = [
  "Mapa de ejecución y análisis del patrón dominante.",
  "Triggers, emociones y pensamientos automáticos.",
  "Creencias operativas y reglas internas de desempeño.",
  "Reestructuración cognitivo-conductual aplicada a tareas reales.",
  "Optimización de hábitos, cierre, priorización y toma de decisiones.",
  "Plan de continuidad, métricas personales y seguimiento.",
];
const PATHWAY_8: string[] = [
  "Diagnóstico profundo del sistema de ejecución.",
  "Patrón dominante y perfil mixto.",
  "Pensamientos automáticos y distorsiones cognitivas aplicadas a productividad.",
  "Creencias operativas y reglas rígidas de desempeño.",
  "Experimentos conductuales y acciones puente.",
  "Optimización de productividad, priorización y cierre.",
  "Liderazgo, comunicación, delegación o visibilidad según impacto principal.",
  "Sistema personal de ejecución, prevención de retrocesos y plan de mantenimiento.",
];

const PATTERN_FOCUS: Record<DimensionKey, string> = {
  P: "Énfasis: claridad, segmentación, activación conductual, tolerancia a incomodidad y reducción de ambigüedad.",
  PE: "Énfasis: criterios de cierre, iteración, tolerancia al error, delegación y reducción de sobrecontrol.",
  AS: "Énfasis: continuidad, amenaza asociada al avance, compromiso conductual, responsabilidad gradual y prevención de decisiones contradictorias.",
  PI: "Énfasis: evidencia objetiva, autoridad profesional, visibilidad gradual, reducción de validación externa y toma de decisiones desde evidencia.",
};

export function getWeeklyPathway(
  duration: string,
  dominant: DimensionKey,
): { weeks: string[]; focus: string } {
  const base = duration.startsWith("4") ? PATHWAY_4 : duration.startsWith("6") ? PATHWAY_6 : PATHWAY_8;
  return { weeks: [...base], focus: PATTERN_FOCUS[dominant] };
}

// ---- Build narrative report text ----
export function buildReportText(r: ComputedResults): string {
  const dom = DOMINANT_INTERPRETATIONS[r.dominant];
  const mixed = getMixedProfile(r.dominant, r.secondary);
  const lines: string[] = [];
  lines.push(
    `Tu patrón dominante es ${dimensionLabel(r.dominant)} (${r.pctByDim[r.dominant].toFixed(0)}%) y tu patrón secundario es ${dimensionLabel(r.secondary)} (${r.pctByDim[r.secondary].toFixed(0)}%). Tu IFE-GS es ${r.ifeGs.toFixed(0)} → ${r.frictionLevel}.`,
  );
  lines.push("");
  lines.push(dom.reading);
  if (mixed && r.mixedProfileType !== "Patrón dominante claro") {
    lines.push("");
    lines.push(`Perfil mixto identificado: ${mixed.name}.`);
    lines.push(mixed.reading);
  }
  if (r.dominantTrigger || r.dominantEmotion || r.dominantBehavior) {
    lines.push("");
    lines.push(
      `Trigger principal: ${triggerLabel(r.dominantTrigger)}. Emoción dominante: ${emotionLabel(r.dominantEmotion)}. Conducta de respuesta principal: ${behaviorLabel(r.dominantBehavior)}.`,
    );
  }
  if (r.topImpactAreas.length) {
    lines.push("");
    lines.push(
      `Áreas productivas más afectadas: ${r.topImpactAreas.map(impactLabel).join(", ")}.`,
    );
  }
  return lines.join("\n");
}

export function getMixedProfileForResults(r: ComputedResults): MixedProfile | null {
  if (r.mixedProfileType === "Patrón dominante claro") return null;
  return getMixedProfile(r.dominant, r.secondary);
}
