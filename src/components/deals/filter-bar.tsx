import { DEAL_STAGES, type DealStage } from "@/types/deal";
import { Field, controlClass, focusRingClass } from "./field";
import type { FilterState } from "./filter-state";

interface FilterBarProps {
  filters: FilterState;
  onChange: (changes: Partial<FilterState>) => void;
  onReset: () => void;
}

export function FilterBar({ filters, onChange, onReset }: FilterBarProps) {
  return (
    <section
      aria-label="Filters"
      className="rounded-xl border border-gray-200 bg-gray-50 p-4"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.2fr)_repeat(4,minmax(0,1fr))_auto] lg:items-end">
        <Field id="filter-stage" label="Stage">
          <div className="relative">
            <select
              id="filter-stage"
              value={filters.stage}
              onChange={(event) =>
                onChange({ stage: event.target.value as DealStage | "" })
              }
              className={`${controlClass} appearance-none pr-9`}
            >
              <option value="">All stages</option>
              {DEAL_STAGES.map((stage) => (
                <option key={stage} value={stage}>
                  {stage}
                </option>
              ))}
            </select>
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-gray-500"
            >
              <path d="m4 6 4 4 4-4" />
            </svg>
          </div>
        </Field>

        <Field id="filter-min-value" label="Min value (USD)">
          <input
            id="filter-min-value"
            type="number"
            inputMode="decimal"
            min={0}
            step="any"
            placeholder="0"
            value={filters.minValue}
            onChange={(event) => onChange({ minValue: event.target.value })}
            className={controlClass}
          />
        </Field>

        <Field id="filter-max-value" label="Max value (USD)">
          <input
            id="filter-max-value"
            type="number"
            inputMode="decimal"
            min={0}
            step="any"
            placeholder="No limit"
            value={filters.maxValue}
            onChange={(event) => onChange({ maxValue: event.target.value })}
            className={controlClass}
          />
        </Field>

        <Field id="filter-start-date" label="Created from">
          <input
            id="filter-start-date"
            type="date"
            value={filters.startDate}
            onChange={(event) => onChange({ startDate: event.target.value })}
            className={controlClass}
          />
        </Field>

        <Field id="filter-end-date" label="Created to">
          <input
            id="filter-end-date"
            type="date"
            value={filters.endDate}
            onChange={(event) => onChange({ endDate: event.target.value })}
            className={controlClass}
          />
        </Field>

        <button
          type="button"
          onClick={onReset}
          className={`h-10 rounded-lg border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-100 sm:col-span-2 lg:col-span-1 ${focusRingClass}`}
        >
          Reset
        </button>
      </div>
    </section>
  );
}
