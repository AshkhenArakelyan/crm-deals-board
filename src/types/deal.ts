export type DealStage =
  | "New"
  | "Qualified"
  | "Proposal"
  | "Negotiation"
  | "Won"
  | "Lost";

export interface Deal {
  id: number;
  title: string;
  company: string;
  value: number;
  stage: DealStage;
  owner: string;
  createdAt: string;
}
