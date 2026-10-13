export const DEAL_STAGES = [
  "New",
  "Qualified",
  "Proposal",
  "Negotiation",
  "Won",
  "Lost",
] as const;

export type DealStage = (typeof DEAL_STAGES)[number];

export interface Deal {
  id: number;
  title: string;
  company: string;
  value: number;
  stage: DealStage;
  owner: string;
  createdAt: string;
}
