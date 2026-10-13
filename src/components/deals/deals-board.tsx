"use client";

import { useMemo, useState } from "react";
import { useDeals } from "@/hooks/use-deals";
import {
  DEFAULT_SORT,
  getNextSort,
  processDeals,
  type SortField,
  type SortOptions,
} from "@/lib/deals";
import { DealsTable } from "./deals-table";
import { focusRingClass } from "./field";
import { FilterBar } from "./filter-bar";
import {
  INITIAL_FILTERS,
  toDealFilters,
  type FilterState,
} from "./filter-state";
import { Pagination } from "./pagination";
import { SearchInput } from "./search-input";
import { Spinner, StatePanel } from "./state-panel";

export function DealsBoard() {
  const { state, retry } = useDeals();

  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [sort, setSort] = useState<SortOptions>(DEFAULT_SORT);
  const [page, setPage] = useState(1);

  const deals = state.status === "success" ? state.deals : null;

  const result = useMemo(
    () =>
      deals
        ? processDeals(deals, {
            query,
            filters: toDealFilters(filters),
            sort,
            page,
          })
        : null,
    [deals, query, filters, sort, page],
  );

  // Every change to search, filters, or sorting returns to the first page.
  function handleQueryChange(value: string) {
    setQuery(value);
    setPage(1);
  }

  function handleFilterChange(changes: Partial<FilterState>) {
    setFilters((current) => ({ ...current, ...changes }));
    setPage(1);
  }

  function handleSort(field: SortField) {
    setSort((current) => getNextSort(current, field));
    setPage(1);
  }

  function handleReset() {
    setQuery("");
    setFilters(INITIAL_FILTERS);
    setSort(DEFAULT_SORT);
    setPage(1);
  }

  return (
    <div className="flex flex-col gap-4">
      <SearchInput value={query} onChange={handleQueryChange} />
      <FilterBar
        filters={filters}
        onChange={handleFilterChange}
        onReset={handleReset}
      />

      <div className="mt-2 flex flex-col gap-4">
        {state.status === "loading" && (
          <StatePanel role="status" title="Loading deals…" icon={<Spinner />} />
        )}

        {state.status === "error" && (
          <StatePanel
            role="alert"
            title="Couldn’t load deals"
            description="The deals service didn’t respond as expected. Make sure the mock API is running (npm run db:dev), then try again."
          >
            <button
              type="button"
              onClick={retry}
              className={`h-10 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-700 ${focusRingClass}`}
            >
              Retry
            </button>
          </StatePanel>
        )}

        {deals && deals.length === 0 && (
          <StatePanel
            title="No deals yet"
            description="The API returned no deals."
          />
        )}

        {deals && deals.length > 0 && result && result.totalItems === 0 && (
          <StatePanel
            title="No deals match your search"
            description="Try a different search term or adjust the filters."
          >
            <button
              type="button"
              onClick={handleReset}
              className={`h-10 rounded-lg border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-100 ${focusRingClass}`}
            >
              Reset search and filters
            </button>
          </StatePanel>
        )}

        {result && result.totalItems > 0 && (
          <>
            <DealsTable deals={result.items} sort={sort} onSort={handleSort} />
            <Pagination
              page={result.page}
              totalPages={result.totalPages}
              totalItems={result.totalItems}
              pageSize={result.pageSize}
              onPageChange={setPage}
            />
          </>
        )}
      </div>
    </div>
  );
}
