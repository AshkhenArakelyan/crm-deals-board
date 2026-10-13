import type { Deal, DealStage } from "@/types/deal";

export const PAGE_SIZE = 10;

export type SortField = "title" | "value" | "createdAt";
export type SortDirection = "asc" | "desc";

export interface SortOptions {
  field: SortField;
  direction: SortDirection;
}

/**
 * Filters for the deals list. Every field is optional; an unset field
 * (undefined, null, empty string, or NaN) does not restrict the results.
 *
 * Dates may be full ISO 8601 strings or date-only strings (`YYYY-MM-DD`),
 * as produced by `<input type="date">`. Boundaries are inclusive. A date-only
 * `endDate` includes the whole day (UTC).
 */
export interface DealFilters {
  stage?: DealStage | null;
  minValue?: number | null;
  maxValue?: number | null;
  startDate?: string | null;
  endDate?: string | null;
}

export interface PaginatedResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface ProcessDealsOptions {
  query?: string;
  filters?: DealFilters;
  sort?: SortOptions;
  page?: number;
}

export const DEFAULT_SORT: SortOptions = {
  field: "createdAt",
  direction: "desc",
};

/**
 * Case-insensitive "contains" search across ID, title, company, and owner.
 * An empty or whitespace-only query returns all deals.
 */
export function searchDeals(deals: readonly Deal[], query: string): Deal[] {
  const needle = query.trim().toLowerCase();
  if (needle === "") return [...deals];

  return deals.filter((deal) =>
    [String(deal.id), deal.title, deal.company, deal.owner].some((field) =>
      field.toLowerCase().includes(needle),
    ),
  );
}

const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;

/** Parses a filter date to a timestamp, or returns null if unset or invalid. */
function parseBoundary(
  value: string | null | undefined,
  edge: "start" | "end",
): number | null {
  if (!value) return null;

  const input = DATE_ONLY.test(value)
    ? `${value}T${edge === "start" ? "00:00:00.000" : "23:59:59.999"}Z`
    : value;
  const time = Date.parse(input);
  return Number.isNaN(time) ? null : time;
}

function parseNumber(value: number | null | undefined): number | null {
  return typeof value === "number" && !Number.isNaN(value) ? value : null;
}

/** Filters deals by stage, value range, and created date range. */
export function filterDeals(
  deals: readonly Deal[],
  filters: DealFilters = {},
): Deal[] {
  const { stage } = filters;
  const minValue = parseNumber(filters.minValue);
  const maxValue = parseNumber(filters.maxValue);
  const start = parseBoundary(filters.startDate, "start");
  const end = parseBoundary(filters.endDate, "end");

  return deals.filter((deal) => {
    if (stage && deal.stage !== stage) return false;
    if (minValue !== null && deal.value < minValue) return false;
    if (maxValue !== null && deal.value > maxValue) return false;

    if (start !== null || end !== null) {
      const created = Date.parse(deal.createdAt);
      if (start !== null && created < start) return false;
      if (end !== null && created > end) return false;
    }

    return true;
  });
}

function compareBy(field: SortField, a: Deal, b: Deal): number {
  switch (field) {
    case "title":
      return a.title.localeCompare(b.title, undefined, {
        sensitivity: "base",
      });
    case "value":
      return a.value - b.value;
    case "createdAt":
      return Date.parse(a.createdAt) - Date.parse(b.createdAt);
  }
}

/**
 * Returns a sorted copy of the deals. Ties are broken by ascending ID so the
 * order is always deterministic.
 */
export function sortDeals(
  deals: readonly Deal[],
  sort: SortOptions = DEFAULT_SORT,
): Deal[] {
  const sign = sort.direction === "asc" ? 1 : -1;

  return [...deals].sort(
    (a, b) => sign * compareBy(sort.field, a, b) || a.id - b.id,
  );
}

/**
 * Returns one page of items. The requested page is clamped to the valid
 * range (and non-integer or invalid pages become 1). When there are no items,
 * `totalPages` is 0 and `items` is empty.
 */
export function paginate<T>(
  items: readonly T[],
  page: number = 1,
  pageSize: number = PAGE_SIZE,
): PaginatedResult<T> {
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const requested = Number.isFinite(page) ? Math.floor(page) : 1;
  const currentPage = Math.min(Math.max(requested, 1), Math.max(totalPages, 1));

  const startIndex = (currentPage - 1) * pageSize;

  return {
    items: items.slice(startIndex, startIndex + pageSize),
    page: currentPage,
    pageSize,
    totalItems,
    totalPages,
  };
}

/** Applies search, then filters, then sorting, and finally pagination. */
export function processDeals(
  deals: readonly Deal[],
  {
    query = "",
    filters = {},
    sort = DEFAULT_SORT,
    page = 1,
  }: ProcessDealsOptions = {},
): PaginatedResult<Deal> {
  const searched = searchDeals(deals, query);
  const filtered = filterDeals(searched, filters);
  const sorted = sortDeals(filtered, sort);
  return paginate(sorted, page, PAGE_SIZE);
}
