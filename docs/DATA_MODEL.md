# Data Model — CRM Deals Board

## 1. Overview

The application uses a single primary entity: `Deal`.

Deal records are provided by the local mock API and stored in `db.json`. All records must use synthetic data.

## 2. Deal Entity

Each deal has the following fields:


| Field       | Type      | Required | Description                                 |
| ----------- | --------- | -------- | ------------------------------------------- |
| `id`        | number    | Yes      | Unique identifier                           |
| `title`     | string    | Yes      | Deal title                                  |
| `company`   | string    | Yes      | Associated company name                     |
| `value`     | number    | Yes      | Deal value; must be zero or greater         |
| `stage`     | DealStage | Yes      | Current stage of the deal                   |
| `owner`     | string    | Yes      | Name of the person responsible for the deal |
| `createdAt` | string    | Yes      | Creation date in ISO 8601 format            |




## 3. Deal Stage

The `stage` field accepts one of these values:

- `New`
- `Qualified`
- `Proposal`
- `Negotiation`
- `Won`
- `Lost`

Use a TypeScript union type to represent these values.

## 4. TypeScript Representation

The intended TypeScript model is:

```
export type DealStage =
  | "New"
  | "Qualified"
  | "Proposal"
  | "Negotiation"
  | "Won"
  | "Lost";

export interface Deal {
  id: number;
  title: string;
  company: string;
  value: number;
  stage: DealStage;
  owner: string;
  createdAt: string;
}
```

This is the intended data contract. The actual TypeScript file will be created during implementation.

## 5. Date Format

- Store `createdAt` as an ISO 8601 string.
- Use consistent date formatting in mock data, preferably UTC timestamps such as `2026-09-15T10:30:00.000Z`.
- Parse dates when filtering or sorting.
- Format dates for display in the UI separately from their stored representation.



## 6. Value Handling

- Store deal values as numbers, not formatted strings.
- Use numeric comparisons for minimum and maximum value filters and sorting.
- Apply USD currency formatting only when displaying values.
- Display deal values in US dollars (`USD`), using the `$` symbol.

## 7. Mock Data

- Use exactly 30 synthetic deals.
- Use synthetic company names, deal titles, and owner names.
- Include records from all deal stages and a range of values and dates so that search, filtering, sorting, and pagination can be tested.
- Use unique IDs.
- Keep all records compatible with the `Deal` model.



## 8. Validation and Data Integrity

- Every deal must contain all required fields.
- `id` must be unique.
- `value` must be a finite number greater than or equal to zero.
- `stage` must match one of the supported values.
- `createdAt` must be a valid ISO 8601 date string.



## 9. Related Documents

- `REQUIREMENTS.md` — behavior and supported deal fields.
- `TECH_STACK.md` — technologies and application architecture.
- `API.md` — endpoint returning deal records.
- `UI.md` — how deal data is presented and manipulated.

