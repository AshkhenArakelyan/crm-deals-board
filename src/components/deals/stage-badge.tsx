import type { DealStage } from "@/types/deal";

// The stage name is always shown as text, so color is never the only signal.
const STAGE_STYLES: Record<DealStage, { badge: string; dot: string }> = {
  New: { badge: "bg-gray-100 text-gray-700 ring-gray-200", dot: "bg-gray-400" },
  Qualified: { badge: "bg-sky-50 text-sky-800 ring-sky-200", dot: "bg-sky-500" },
  Proposal: {
    badge: "bg-indigo-50 text-indigo-800 ring-indigo-200",
    dot: "bg-indigo-500",
  },
  Negotiation: {
    badge: "bg-amber-50 text-amber-800 ring-amber-200",
    dot: "bg-amber-500",
  },
  Won: {
    badge: "bg-emerald-50 text-emerald-800 ring-emerald-200",
    dot: "bg-emerald-500",
  },
  Lost: { badge: "bg-rose-50 text-rose-800 ring-rose-200", dot: "bg-rose-500" },
};

export function StageBadge({ stage }: { stage: DealStage }) {
  const styles = STAGE_STYLES[stage];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${styles.badge}`}
    >
      <span aria-hidden="true" className={`size-1.5 rounded-full ${styles.dot}`} />
      {stage}
    </span>
  );
}
