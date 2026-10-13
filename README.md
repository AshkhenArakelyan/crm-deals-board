# CRM Deals Board

A small, read-only web app for browsing CRM deals in a table. Deals come from a local mock REST API (JSON Server) and are searched, filtered, sorted, and paginated in the browser. All data is synthetic.

## Features

- Deals table with columns: ID, Deal Title, Company, Deal Value, Stage, Owner, Created Date.
- **Search** by deal ID, title, company, or owner (case-insensitive "contains" match).
- **Filters** (combinable): stage (single select, default `All stages`), minimum and maximum deal value, and created-date start and end (inclusive).
- **Sorting** by title, value, or created date, ascending or descending (default: created date, newest first).
- **Pagination** with a fixed page size of 10, previous/next buttons, and page numbers.
- **Reset** clears the search and filters, restores the default sort, and returns to page 1.
- Loading, error (with a Retry button), "no deals", and "no matching deals" states.
- Responsive layout; the table scrolls horizontally inside its own container on small screens.

Deals are read-only: there is no create, edit, delete, or details view.

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router), React 19, TypeScript
- Tailwind CSS 4
- [JSON Server](https://github.com/typicode/json-server) 0.17 as the mock API
- Native `fetch` for HTTP requests
- Vitest, React Testing Library, and `@testing-library/user-event` (jsdom) for tests

## Prerequisites

- Node.js 20.19 or newer (Next.js 16 requires 20.9+, and the test environment `jsdom` requires 20.19+)
- npm (a `package-lock.json` is included)

## Installation

```bash
npm install
```

## Configuration

The app reads the API base URL from `NEXT_PUBLIC_API_BASE_URL`. If it is not set, it falls back to `http://localhost:3001`, so no configuration is needed for the default local setup.

To override it, copy the example file and edit it:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

The `/deals` path is appended to this URL. `NEXT_PUBLIC_` variables are embedded when Next.js starts or builds, so restart the dev server (or rebuild) after changing the value. Do not put secrets in this variable: it is exposed to the browser.

## Running the app

Run the mock API and the Next.js app as two separate processes, each in its own terminal.

**Terminal 1: mock API** (serves `db.json` on port 3001)

```bash
npm run db:dev
```

Check it with `http://localhost:3001/deals`, which returns a JSON array of 30 deals.

**Terminal 2: Next.js app**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). If the mock API is not running, the page shows an error message with a Retry button.

## npm scripts

| Script | Command | Purpose |
| --- | --- | --- |
| `npm run dev` | `next dev` | Start the Next.js development server (port 3000). |
| `npm run db:dev` | `json-server db.json --port 3001` | Start the mock API from `db.json` on port 3001. |
| `npm run build` | `next build` | Create a production build. |
| `npm start` | `next start` | Serve the production build (run `npm run build` first). The mock API must still be running. |
| `npm run lint` | `eslint` | Lint the project. |
| `npm test` | `vitest run` | Run all tests once. |

## Architecture

```
src/
  app/               Next.js App Router: layout, global styles, page
  components/deals/  UI: board (state), search, filters, table, pagination, badges
  hooks/use-deals.ts Loads deals once; exposes loading / error / success and retry
  lib/api.ts         fetchDeals(): the only code that calls the API
  lib/deals.ts       Pure functions: search, filter, sort, paginate, processDeals
  lib/format.ts      USD and date formatting
  types/deal.ts      Deal and DealStage types
db.json              Mock data (30 synthetic deals)
docs/                Requirements, data model, API, UI, and testing specs
```

Data flow: `use-deals` fetches `GET {API base URL}/deals` once on load. `DealsBoard` (the only stateful component) keeps the search text, filters, sort, and page in React state and passes them to `processDeals`, which applies search, then filters, then sorting, then pagination. The table and pagination components only render the result.

**Why client-side processing?** The dataset is small (30 records) and is fetched once, so the UI updates instantly and no extra requests are made when the user types, filters, sorts, or changes page. It also keeps the logic in pure, framework-independent functions that are easy to unit test, and keeps JSON Server as a simple read-only data source. Any change to search, filters, or sorting returns to page 1.

Notes on behavior:

- Search matches text anywhere in the field, including the ID (searching `1` matches IDs 1, 10 to 19, and so on).
- `createdAt` values are UTC ISO 8601 strings. Dates are displayed and filtered in UTC, and a date-only end date includes the whole day.
- A negative or invalid minimum or maximum value is ignored (treated as empty).

## Mock API and data limitations

- The API is a local development tool, not a production backend. The app only uses `GET /deals`.
- JSON Server also exposes write endpoints (POST, PUT, PATCH, DELETE) for `/deals`. The app never calls them, but anyone who does would modify `db.json`.
- There is no authentication, server-side validation, or server-side search, filtering, or pagination. The whole dataset is sent to the browser, so this approach does not scale to large datasets.
- The client checks that the response is a JSON array but does not validate individual records; it relies on `db.json` following the `Deal` model in `docs/DATA_MODEL.md`.
- All 30 deals, companies, and people are fictional. Any resemblance to real businesses or individuals is coincidental. Do not add real customer data.

## Testing

Tests use Vitest. Run them with:

```bash
npm test
```

No running API server or network access is needed.

| Test | File | What it checks |
| --- | --- | --- |
| Search (unit) | `src/lib/deals.test.ts` | Searching by company is case-insensitive and returns every matching deal. |
| Filter and sort (unit) | `src/lib/deals.test.ts` | Filtering by stage and sorting by value descending give the expected deals in order. |
| Table rendering (component) | `src/components/deals/deals-table.test.tsx` | Columns appear in the right order; titles, companies, USD values, and stages render correctly. |
| Search interaction (component) | `src/components/deals/deals-board.test.tsx` | Typing a company name (in mixed case) keeps matching deals and removes non-matching ones. |

Approach: the data-processing logic is tested as pure functions in the default Node environment. The component tests opt into jsdom with `// @vitest-environment jsdom`, render the real components with synthetic fixtures, and mock the `@/lib/api` module so `fetchDeals` returns fixture data instead of making a request.

Also run `npm run lint` and `npx tsc --noEmit` to check linting and types.

## AI tools used

- **ChatGPT:** used to help plan the project and draft the specification documents in `docs/`.
- **Cursor:** used as the AI coding assistant inside the editor to generate and edit code in this repository, including `db.json`, the data-processing functions, the UI components, and the tests. The generated code was run through `npm test`, `npx tsc --noEmit`, and `npm run lint`, and the UI was checked in a browser.

The specifications in `docs/` were the source of truth for requirements.
