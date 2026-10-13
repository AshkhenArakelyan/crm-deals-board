import { describe, expect, it } from "vitest";
import { filterDeals, searchDeals, sortDeals } from "@/lib/deals";
import type { Deal } from "@/types/deal";

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
    stage: "Proposal",
    owner: "Jamie Lee",
    createdAt: "2026-07-17T09:30:00.000Z",
  },
  {
    id: 4,
    title: "Cloud Backup Solution",
    company: "Willowbrook Clinics",
    value: 5600,
    stage: "Proposal",
    owner: "Priya Nair",
    createdAt: "2026-10-06T12:00:00.000Z",
  },
  {
    id: 5,
    title: "Brand Identity Package",
    company: "Brightwave Media",
    value: 4500,
    stage: "Lost",
    owner: "Alex Morgan",
    createdAt: "2026-01-29T17:00:00.000Z",
  },
];

describe("deal data processing", () => {
  it("searches by company case-insensitively and returns all matching deals", () => {
    const result = searchDeals(deals, "nOrThStAr lAbS");

    expect(result.map((deal) => deal.id)).toEqual([1, 3]);
  });

  it("filters by stage and sorts by value descending", () => {
    const filtered = filterDeals(deals, { stage: "Proposal" });
    const result = sortDeals(filtered, { field: "value", direction: "desc" });

    expect(result.map((deal) => deal.id)).toEqual([3, 1, 4]);
    expect(result.map((deal) => deal.value)).toEqual([22600, 12000, 5600]);
  });
});
