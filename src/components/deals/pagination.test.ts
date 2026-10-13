import { describe, expect, it } from "vitest";
import { getPageItems } from "./pagination";

describe("getPageItems", () => {
  it("lists every page without ellipses for 3 pages", () => {
    expect(getPageItems(1, 3)).toEqual([1, 2, 3]);
    expect(getPageItems(2, 3)).toEqual([1, 2, 3]);
    expect(getPageItems(3, 3)).toEqual([1, 2, 3]);
  });

  it("lists every page up to 7 pages and handles 0 or 1 page", () => {
    expect(getPageItems(4, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    expect(getPageItems(1, 1)).toEqual([1]);
    expect(getPageItems(1, 0)).toEqual([]);
  });

  it("shows an ellipsis only at the end on the first pages of a long list", () => {
    expect(getPageItems(1, 10)).toEqual([1, 2, "ellipsis-end", 10]);
    expect(getPageItems(2, 10)).toEqual([1, 2, 3, "ellipsis-end", 10]);
    expect(getPageItems(3, 10)).toEqual([1, 2, 3, 4, "ellipsis-end", 10]);
  });

  it("shows an ellipsis only at the start on the last pages of a long list", () => {
    expect(getPageItems(10, 10)).toEqual([1, "ellipsis-start", 9, 10]);
    expect(getPageItems(9, 10)).toEqual([1, "ellipsis-start", 8, 9, 10]);
    expect(getPageItems(8, 10)).toEqual([1, "ellipsis-start", 7, 8, 9, 10]);
  });

  it("shows ellipses on both sides when the current page is in the middle", () => {
    expect(getPageItems(5, 10)).toEqual([
      1,
      "ellipsis-start",
      4,
      5,
      6,
      "ellipsis-end",
      10,
    ]);
  });

  it("always includes the first and last page for more than 7 pages", () => {
    for (let page = 1; page <= 12; page += 1) {
      const items = getPageItems(page, 12);
      expect(items[0]).toBe(1);
      expect(items[items.length - 1]).toBe(12);
      expect(items).toContain(page);
    }
  });
});
