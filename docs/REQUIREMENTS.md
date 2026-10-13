# Requirements — CRM Deals Board

## 1. Overview

CRM Deals Board is a small responsive web application for viewing and exploring CRM deals in a table.

The application is built with Next.js and TypeScript. It uses a local mock REST API to retrieve synthetic deal data.

The goal is to demonstrate search, filtering, sorting, pagination, responsive UI development, and basic testing.

## 2. Goals

- Display deals in a clear, readable table.
- Allow users to search, filter, and sort deals.
- Support pagination for navigating through results.
- Provide loading, error, and empty states.
- Deliver a responsive and maintainable implementation.
- Include meaningful automated tests and setup documentation.



## 3. Deal Data

Each deal contains the following fields:

- `id` — unique identifier.
- `title` — deal title.
- `company` — associated company name.
- `value` — deal value represented as a number.
- `stage` — current deal stage.
- `owner` — person responsible for the deal.
- `createdAt` — date the deal was created.

Only synthetic data will be used.

Supported stages:

- New
- Qualified
- Proposal
- Negotiation
- Won
- Lost



## 4. Functional Requirements



### 4.1. Display Deals

- Fetch deals from the mock REST API.
- Display the deals in a table.
- Show the following columns: ID, Deal Title, Company, Deal Value, Stage, Owner, and Created Date.
- Display loading and error states while retrieving data or when the request fails.
- Display an appropriate empty state when no deals match the current search and filters.
- Support pagination with previous/next navigation and page numbers.
- Update the pagination when the search, filters, or sorting changes.



### 4.2. Search

Provide a search input that matches deals by:

- ID
- Deal title
- Company name
- Owner name

Search must be case-insensitive for text fields.

### 4.3. Filtering

Provide the following filters:

- Stage: single-select dropdown with an `All stages` default option.
- Deal value: minimum and maximum values.
- Created date: start and end dates.

Multiple filters must work together.

### 4.4. Sorting

Allow sorting by:

- Deal title
- Deal value
- Created date

Each supported field must allow ascending and descending order.

The default sorting order is created date, newest first.

### 4.5. Combined Behavior

- Search, filters, and sorting must work together.
- Apply search first, then filters, then sorting, and finally pagination.
- Reset must clear the search query and all active filters, restore the default sorting order (Created Date, newest first), and return pagination to the first page.
- After search, filter, or sorting changes, return to the first page.
- Pagination must operate on the final filtered and sorted results.



### 4.6. Deal Interaction

- Deals are read-only.
- Clicking a deal or its row does not trigger navigation or open a details view.
- Creating, editing, and deleting deals are outside the scope of this assignment.



## 5. UI Requirements

- Use a clean, modern, responsive table layout.
- Place the search input above the filters.
- Place the deals table below the search and filters.
- Keep the table usable on small screens.
- Clearly communicate loading, error, and empty states.
- Provide a reset action for search and filters.



## 6. Technical Requirements

- Next.js App Router.
- TypeScript.
- Tailwind CSS.
- JSON Server as the mock REST API.
- Native `fetch` for HTTP requests.
- Vitest and React Testing Library for automated tests.

Search, filtering, sorting, and pagination are performed on the client after the deals are fetched.

## 7. Testing Requirements

Include at least two meaningful automated tests:

1. Verify search, filtering, and sorting behavior.
2. Verify deals table rendering and/or user interaction.

Tests must use synthetic data and be runnable through a documented command.

## 8. Out of Scope

The following features are not required:

- User authentication or authorization.
- Creating, editing, or deleting deals.
- Deal details pages or modal dialogs.
- A Kanban board.
- A real backend or database.
- Persistent user preferences.
- Advanced pagination features such as configurable page size.
- Additional state-management or data-fetching libraries unless a clear need arises.



## 9. Acceptance Criteria

The assignment is complete when:

- The application runs locally using documented instructions.
- Deals are retrieved from the mock API.
- Search, filters, and sorting work correctly together.
- Pagination navigates through the resulting deals correctly.
- Reset restores the default state.
- Loading, error, and empty states are handled.
- The UI is usable on desktop and small screens.
- At least two meaningful automated tests pass.
- The README explains setup, execution, testing, and key implementation decisions.
- No real customer or confidential data is used.

