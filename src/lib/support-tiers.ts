export type SupportTierId = "early" | "builder" | "founding" | "strategic";

export type SupportTier = {
  id: SupportTierId;
  amount: number;
  label: string;
};

export const SUPPORT_TIERS: Record<SupportTierId, SupportTier> = {
  early: { id: "early", amount: 25, label: "Early Supporter" },
  builder: { id: "builder", amount: 50, label: "Builder Supporter" },
  founding: { id: "founding", amount: 100, label: "Founding Supporter" },
  strategic: { id: "strategic", amount: 250, label: "Strategic Supporter" },
};

export function getSupportTier(id: string): SupportTier | null {
  return id in SUPPORT_TIERS ? SUPPORT_TIERS[id as SupportTierId] : null;
}
