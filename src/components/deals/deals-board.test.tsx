// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchDeals } from "@/lib/api";
import type { Deal } from "@/types/deal";
import { DealsBoard } from "./deals-board";

// Replace the API module so the tests never make network requests.
vi.mock("@/lib/api", () => ({ fetchDeals: vi.fn() }));

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
    title: "Quarterly Review Tools",
    company: "Northstar Labs",
    value: 22600,
    stage: "Won",
    owner: "Jamie Lee",
    createdAt: "2026-07-17T09:30:00.000Z",
  },
];

describe("DealsBoard search", () => {
  it("shows only deals matching a company name, ignoring case", async () => {
    vi.mocked(fetchDeals).mockResolvedValue(deals);
    const user = userEvent.setup();
    render(<DealsBoard />);

    // Wait for the (mocked) deals to load; all three are shown at first.
    expect(await screen.findByText("Annual Software Contract")).toBeTruthy();
    expect(screen.getByText("Website Redesign")).toBeTruthy();
    expect(screen.getByText("Quarterly Review Tools")).toBeTruthy();

    await user.type(screen.getByRole("searchbox", { name: "Search deals" }), "nOrThStAr lAbS");

    // Both Northstar Labs deals remain; the Bluepeak Systems deal is gone.
    expect(screen.getByText("Website Redesign")).toBeTruthy();
    expect(screen.getByText("Quarterly Review Tools")).toBeTruthy();
    expect(screen.queryByText("Annual Software Contract")).toBeNull();
    expect(screen.queryByText("Bluepeak Systems")).toBeNull();
  });
});
