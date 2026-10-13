import { focusRingClass } from "./field";

interface PaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

type PageItem = number | "ellipsis-start" | "ellipsis-end";

/** Page numbers to show: always first and last, plus a window around the current page. */
export function getPageItems(page: number, totalPages: number): PageItem[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const start = Math.max(2, page - 1);
  const end = Math.min(totalPages - 1, page + 1);
  const items: PageItem[] = [1];

  if (start > 2) items.push("ellipsis-start");
  for (let number = start; number <= end; number += 1) items.push(number);
  if (end < totalPages - 1) items.push("ellipsis-end");
  items.push(totalPages);

  return items;
}

const buttonBase = `inline-flex h-9 min-w-9 items-center justify-center rounded-lg px-3 text-sm font-medium transition-colors ${focusRingClass}`;
const buttonIdle = "text-gray-700 hover:bg-gray-100";
const buttonDisabled = "cursor-not-allowed text-gray-300";

export function Pagination({ page, totalPages, totalItems, pageSize, onPageChange }: PaginationProps) {
  const firstShown = (page - 1) * pageSize + 1;
  const lastShown = Math.min(page * pageSize, totalItems);

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between"
    >
      <p className="text-sm text-gray-600" aria-live="polite">
        Showing <span className="font-medium text-gray-900">{firstShown}–{lastShown}</span> of{" "}
        <span className="font-medium text-gray-900">{totalItems}</span> deals
        <span className="text-gray-400"> · </span>
        Page <span className="font-medium text-gray-900">{page}</span> of{" "}
        <span className="font-medium text-gray-900">{totalPages}</span>
      </p>

      <ul className="flex flex-wrap items-center justify-center gap-1">
        <li>
          <button
            type="button"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            className={`${buttonBase} ${page <= 1 ? buttonDisabled : buttonIdle}`}
          >
            Previous
          </button>
        </li>
        {getPageItems(page, totalPages).map((item) =>
          typeof item === "string" ? (
            <li key={item} aria-hidden="true" className="px-1 text-gray-400">
              …
            </li>
          ) : (
            <li key={item}>
              <button
                type="button"
                onClick={() => onPageChange(item)}
                aria-label={`Page ${item}`}
                aria-current={item === page ? "page" : undefined}
                className={`${buttonBase} tabular-nums ${
                  item === page ? "bg-blue-600 text-white hover:bg-blue-600" : buttonIdle
                }`}
              >
                {item}
              </button>
            </li>
          ),
        )}
        <li>
          <button
            type="button"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            className={`${buttonBase} ${page >= totalPages ? buttonDisabled : buttonIdle}`}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
