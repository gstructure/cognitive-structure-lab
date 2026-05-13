// Scoring engine for IGPE V1.1 — used both client (preview) and server (truth).
import {
  LIKERT_ITEMS, IMPACT_AREAS, TRIGGERS, EMOTIONS, BEHAVIORS,
  type DimensionKey, DIMENSION_LABEL,
} from "./items";

export type LikertAnswers = Record<string, number>;
export interface TriggerEntry { id: string; intensity: number }
export interface EmotionEntry { id: string; intensity: number }
export interface BehaviorEntry { id: string; frequency: number }
export type ImpactAnswers = Record<string, number>;

export interface RawInput {
  likert: LikertAnswers;
  triggers: TriggerEntry[];
  emotions: EmotionEntry[];
  behaviors: BehaviorEntry[];
  impact: ImpactAnswers;
}

export interface ComputedResults {
  rawByDim: Record<DimensionKey, number>;
  pctByDim: Record<DimensionKey, number>;
  dominant: DimensionKey;
  secondary: DimensionKey;
  patternDifference: number;
  mixedProfileType: "Perfil mixto fuerte" | "Patrón dominante con componente secundario" | "Patrón dominante claro";
  pp: number;
  ipRaw: number;
  ipPercent: number;
  iae: number;
  icr: number;
  ifeGs: number;
  frictionLevel: "Fricción mínima" | "Fricción leve" | "Fricción moderada" | "Fricción alta" | "Fricción crítica";
  dominantTrigger: string | null;
  dominantEmotion: string | null;
  dominantBehavior: string | null;
  topImpactAreas: string[];
}

const DIMS: DimensionKey[] = ["P", "PE", "AS", "PI"];

export function sumDim(answers: LikertAnswers, dim: DimensionKey): number {
  return LIKERT_ITEMS.filter((i) => i.dimension === dim).reduce((acc, i) => acc + (answers[i.id] || 0), 0);
}

export function computeResults(input: RawInput): ComputedResults {
  const rawByDim: Record<DimensionKey, number> = {
    P: sumDim(input.likert, "P"),
    PE: sumDim(input.likert, "PE"),
    AS: sumDim(input.likert, "AS"),
    PI: sumDim(input.likert, "PI"),
  };
  const pctByDim: Record<DimensionKey, number> = {
    P: (rawByDim.P / 50) * 100,
    PE: (rawByDim.PE / 50) * 100,
    AS: (rawByDim.AS / 50) * 100,
    PI: (rawByDim.PI / 50) * 100,
  };
  const sorted = [...DIMS].sort((a, b) => pctByDim[b] - pctByDim[a]);
  const dominant = sorted[0];
  const secondary = sorted[1];
  const patternDifference = pctByDim[dominant] - pctByDim[secondary];
  const mixedProfileType =
    patternDifference <= 10 ? "Perfil mixto fuerte"
      : patternDifference <= 20 ? "Patrón dominante con componente secundario"
        : "Patrón dominante claro";
  const pp = (pctByDim[dominant] + pctByDim[secondary]) / 2;

  const ipRaw = IMPACT_AREAS.reduce((acc, a) => acc + (input.impact[a.id] || 0), 0);
  const ipPercent = (ipRaw / 50) * 100;

  // IAE: avg of top 3 emotions intensity * 10  (intensities are 0–10 → produces 0–100)
  const topEmotions = [...input.emotions].sort((a, b) => b.intensity - a.intensity).slice(0, 3);
  const iae = topEmotions.length === 0 ? 0
    : (topEmotions.reduce((a, e) => a + e.intensity, 0) / topEmotions.length) * 10;

  // ICR: avg frequency of selected behaviors * 20 (frequency 1–5 → 20–100)
  const beh = input.behaviors.slice(0, 3);
  const icr = beh.length === 0 ? 0
    : (beh.reduce((a, b) => a + b.frequency, 0) / beh.length) * 20;

  const ifeGs = pp * 0.45 + ipPercent * 0.35 + iae * 0.20;

  const frictionLevel: ComputedResults["frictionLevel"] =
    ifeGs <= 20 ? "Fricción mínima"
      : ifeGs <= 40 ? "Fricción leve"
        : ifeGs <= 60 ? "Fricción moderada"
          : ifeGs <= 80 ? "Fricción alta"
            : "Fricción crítica";

  const dominantTrigger = [...input.triggers].sort((a, b) => b.intensity - a.intensity)[0]?.id ?? null;
  const dominantEmotion = topEmotions[0]?.id ?? null;
  const dominantBehavior = [...input.behaviors].sort((a, b) => b.frequency - a.frequency)[0]?.id ?? null;

  const topImpactAreas = [...IMPACT_AREAS]
    .map((a) => ({ id: a.id, v: input.impact[a.id] || 0 }))
    .sort((a, b) => b.v - a.v)
    .slice(0, 3)
    .filter((x) => x.v > 0)
    .map((x) => x.id);

  return {
    rawByDim, pctByDim, dominant, secondary, patternDifference,
    mixedProfileType, pp, ipRaw, ipPercent, iae, icr, ifeGs, frictionLevel,
    dominantTrigger, dominantEmotion, dominantBehavior, topImpactAreas,
  };
}

export function dimensionLabel(d: DimensionKey): string { return DIMENSION_LABEL[d]; }
export function triggerLabel(id: string | null): string {
  return TRIGGERS.find((t) => t.id === id)?.label ?? "—";
}
export function emotionLabel(id: string | null): string {
  return EMOTIONS.find((t) => t.id === id)?.label ?? "—";
}
export function behaviorLabel(id: string | null): string {
  return BEHAVIORS.find((t) => t.id === id)?.label ?? "—";
}
export function impactLabel(id: string): string {
  return IMPACT_AREAS.find((t) => t.id === id)?.label ?? "—";
}
