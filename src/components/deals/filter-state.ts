import type { DealFilters } from "@/lib/deals";
import type { DealStage } from "@/types/deal";

/** Raw filter control values, as held by the form inputs. */
export interface FilterState {
  stage: DealStage | "";
  minValue: string;
  maxValue: string;
  startDate: string;
  endDate: string;
}

export const INITIAL_FILTERS: FilterState = {
  stage: "",
  minValue: "",
  maxValue: "",
  startDate: "",
  endDate: "",
};

/** Empty, invalid, or negative input leaves that side of the range unrestricted. */
function parseAmount(input: string): number | null {
  if (input.trim() === "") return null;
  const amount = Number(input);
  return Number.isFinite(amount) && amount >= 0 ? amount : null;
}

export function toDealFilters(state: FilterState): DealFilters {
  return {
    stage: state.stage || null,
    minValue: parseAmount(state.minValue),
    maxValue: parseAmount(state.maxValue),
    startDate: state.startDate || null,
    endDate: state.endDate || null,
  };
}
