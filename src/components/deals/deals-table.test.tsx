// @vitest-environment jsdom
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DEFAULT_SORT } from "@/lib/deals";
import type { Deal } from "@/types/deal";
import { DealsTable } from "./deals-table";

afterEach(cleanup);

const deals: Deal[] = [
  {
    id: 1,
    title: "Website Redesign",
    company: "Northstar Labs",
    value: 12000,
    stage: "Proposal",
    owner: "Alex Morgan",
    createdAt: "2026-09-15T10:30:00.000Z",
  },
  {
    id: 2,
    title: "Annual Software Contract",
    company: "Bluepeak Systems",
    value: 25000,
    stage: "Negotiation",
    owner: "Jamie Lee",
    createdAt: "2026-09-20T14:00:00.000Z",
  },
  {
    id: 3,
    title: "Pilot Program Evaluation",
    company: "Lumina Education",
    value: 0,
    stage: "New",
    owner: "Marcus Chen",
    createdAt: "2026-10-11T15:30:00.000Z",
  },
];

describe("DealsTable", () => {
  it("renders the columns in order with each deal's title, company, value, and stage", () => {
    render(<DealsTable deals={deals} sort={DEFAULT_SORT} onSort={vi.fn()} />);

    // The active sort column also has visually hidden text such as ", sorted descending".
    const headers = screen
      .getAllByRole("columnheader")
      .map((header) =>
        header.textContent?.replace(/,? sorted (ascending|descending)$/, ""),
      );
    expect(headers).toEqual([
      "ID",
      "Deal Title",
      "Company",
      "Deal Value",
      "Stage",
      "Owner",
      "Created Date",
    ]);

    const [, ...bodyRows] = screen.getAllByRole("row");
    const cellText = bodyRows.map((row) =>
      within(row)
        .getAllByRole("cell")
        .map((cell) => cell.textContent),
    );

    expect(cellText).toEqual([
      ["1", "Website Redesign", "Northstar Labs", "$12,000", "Proposal", "Alex Morgan", "Sep 15, 2026"],
      ["2", "Annual Software Contract", "Bluepeak Systems", "$25,000", "Negotiation", "Jamie Lee", "Sep 20, 2026"],
      ["3", "Pilot Program Evaluation", "Lumina Education", "$0", "New", "Marcus Chen", "Oct 11, 2026"],
    ]);

    expect(screen.getByText("Website Redesign")).toBeTruthy();
    expect(screen.getByText("Bluepeak Systems")).toBeTruthy();
  });
});
