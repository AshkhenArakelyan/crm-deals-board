import { describe, expect, it } from "vitest";
import {
  INITIAL_FILTERS,
  toDealFilters,
  type FilterState,
} from "./filter-state";

function filters(overrides: Partial<FilterState>): FilterState {
  return { ...INITIAL_FILTERS, ...overrides };
}

describe("toDealFilters", () => {
  it("leaves every filter unset for the initial state", () => {
    expect(toDealFilters(INITIAL_FILTERS)).toEqual({
      stage: null,
      minValue: null,
      maxValue: null,
      startDate: null,
      endDate: null,
    });
  });

  it("converts valid amounts to numbers and passes stage and dates through", () => {
    expect(
      toDealFilters(
        filters({
          stage: "Won",
          minValue: "1000",
          maxValue: "25000.5",
          startDate: "2026-01-01",
          endDate: "2026-12-31",
        }),
      ),
    ).toEqual({
      stage: "Won",
      minValue: 1000,
      maxValue: 25000.5,
      startDate: "2026-01-01",
      endDate: "2026-12-31",
    });
  });

  it("accepts zero as a valid amount", () => {
    const result = toDealFilters(filters({ minValue: "0", maxValue: "0" }));

    expect(result.minValue).toBe(0);
    expect(result.maxValue).toBe(0);
  });

  it("treats empty and whitespace-only amounts as unset", () => {
    const result = toDealFilters(filters({ minValue: "", maxValue: "   " }));

    expect(result.minValue).toBeNull();
    expect(result.maxValue).toBeNull();
  });

  it("treats non-numeric amounts as unset", () => {
    const result = toDealFilters(filters({ minValue: "abc", maxValue: "12abc" }));

    expect(result.minValue).toBeNull();
    expect(result.maxValue).toBeNull();
  });

  it("treats non-finite amounts as unset", () => {
    const result = toDealFilters(
      filters({ minValue: "Infinity", maxValue: "-Infinity" }),
    );

    expect(result.minValue).toBeNull();
    expect(result.maxValue).toBeNull();
  });

  it("treats negative amounts as unset", () => {
    const result = toDealFilters(filters({ minValue: "-1", maxValue: "-500" }));

    expect(result.minValue).toBeNull();
    expect(result.maxValue).toBeNull();
  });

  it("converts empty stage and date inputs to null", () => {
    const result = toDealFilters(
      filters({ stage: "", startDate: "", endDate: "" }),
    );

    expect(result.stage).toBeNull();
    expect(result.startDate).toBeNull();
    expect(result.endDate).toBeNull();
  });
});
