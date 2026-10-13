import type { SortField, SortOptions } from "@/lib/deals";
import { formatCurrency, formatDate } from "@/lib/format";
import type { Deal } from "@/types/deal";
import { focusRingClass } from "./field";
import { StageBadge } from "./stage-badge";

interface DealsTableProps {
  deals: Deal[];
  sort: SortOptions;
  onSort: (field: SortField) => void;
}

const headerCell =
  "whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500";
const bodyCell = "px-4 py-3.5";

function SortIcon({ direction }: { direction: "asc" | "desc" | null }) {
  const base = "size-3.5 shrink-0";
  if (direction === null) {
    return (
      <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`${base} text-gray-300`}>
        <path d="m5 6.5 3-3 3 3M5 9.5l3 3 3-3" />
      </svg>
    );
  }
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${base} text-blue-600`}>
      {direction === "asc" ? <path d="M8 13V3m0 0L4 7m4-4 4 4" /> : <path d="M8 3v10m0 0 4-4m-4 4L4 9" />}
    </svg>
  );
}

interface SortableHeaderProps {
  field: SortField;
  label: string;
  sort: SortOptions;
  onSort: (field: SortField) => void;
  align?: "left" | "right";
}

function SortableHeader({ field, label, sort, onSort, align = "left" }: SortableHeaderProps) {
  const direction = sort.field === field ? sort.direction : null;
  const ariaSort = direction === "asc" ? "ascending" : direction === "desc" ? "descending" : "none";

  return (
    <th scope="col" aria-sort={ariaSort} className={`${headerCell} ${align === "right" ? "text-right" : "text-left"}`}>
      <button
        type="button"
        onClick={() => onSort(field)}
        className={`-mx-2 inline-flex items-center gap-1.5 rounded-md px-2 py-1 uppercase tracking-wide transition-colors hover:bg-gray-100 hover:text-gray-900 ${direction ? "text-gray-900" : ""} ${align === "right" ? "flex-row-reverse" : ""} ${focusRingClass}`}
      >
        {label}
        <SortIcon direction={direction} />
        {direction && (
          <span className="sr-only">
            , sorted {direction === "asc" ? "ascending" : "descending"}
          </span>
        )}
      </button>
    </th>
  );
}

export function DealsTable({ deals, sort, onSort }: DealsTableProps) {
  return (
    // `relative` makes this the containing block for the `sr-only` (absolutely
    // positioned) caption and sort labels, so they scroll with the table
    // instead of widening the page.
    <div className="relative overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="w-full min-w-[56rem] border-collapse text-sm">
        <caption className="sr-only">Deals</caption>
        <thead className="border-b border-gray-200 bg-gray-50">
          <tr>
            <th scope="col" className={`${headerCell} text-left`}>ID</th>
            <SortableHeader field="title" label="Deal Title" sort={sort} onSort={onSort} />
            <th scope="col" className={`${headerCell} text-left`}>Company</th>
            <SortableHeader field="value" label="Deal Value" sort={sort} onSort={onSort} align="right" />
            <th scope="col" className={`${headerCell} text-left`}>Stage</th>
            <th scope="col" className={`${headerCell} text-left`}>Owner</th>
            <SortableHeader field="createdAt" label="Created Date" sort={sort} onSort={onSort} />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {deals.map((deal) => (
            <tr key={deal.id} className="transition-colors hover:bg-gray-50">
              <td className={`${bodyCell} whitespace-nowrap tabular-nums text-gray-500`}>{deal.id}</td>
              <td className={`${bodyCell} max-w-[18rem] font-medium text-gray-900`}>
                <span className="block truncate" title={deal.title}>{deal.title}</span>
              </td>
              <td className={`${bodyCell} max-w-[14rem] text-gray-700`}>
                <span className="block truncate" title={deal.company}>{deal.company}</span>
              </td>
              <td className={`${bodyCell} whitespace-nowrap text-right font-medium tabular-nums text-gray-900`}>
                {formatCurrency(deal.value)}
              </td>
              <td className={`${bodyCell} whitespace-nowrap`}>
                <StageBadge stage={deal.stage} />
              </td>
              <td className={`${bodyCell} max-w-[12rem] text-gray-700`}>
                <span className="block truncate" title={deal.owner}>{deal.owner}</span>
              </td>
              <td className={`${bodyCell} whitespace-nowrap text-gray-600`}>
                <time dateTime={deal.createdAt}>{formatDate(deal.createdAt)}</time>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
