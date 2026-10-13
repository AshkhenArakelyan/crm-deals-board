# Technical Stack — CRM Deals Board

## 1. Overview

The application uses a lightweight frontend stack suitable for a small CRM Deals Board assignment.

The goal is to keep the implementation simple, readable, and easy to test.

## 2. Core Technologies


| Technology            | Purpose                                |
| --------------------- | -------------------------------------- |
| Next.js App Router    | Application framework and routing      |
| React                 | UI components                          |
| TypeScript            | Static typing                          |
| Tailwind CSS          | Styling and responsive layouts         |
| JSON Server           | Local mock REST API                    |
| Native `fetch`        | HTTP requests                          |
| Vitest                | Test runner                            |
| React Testing Library | Component and user interaction testing |


## 3. Application Architecture

- Use Next.js App Router for the application structure.
- Use React components to build the deals table, search input, filters, sorting controls, and pagination.
- Use TypeScript types to define the deal model and related data.
- Fetch deals from the mock REST API.
- Keep search, filtering, sorting, and pagination logic separate from presentation components where practical.
- Keep the implementation small and avoid unnecessary abstraction.

## 4. Data Fetching and State

- Use native `fetch` to retrieve deals from JSON Server.
- Fetch the initial deals dataset once when the board loads.
- Perform search, filtering, sorting, and pagination on the client.
- Use React state for UI state and fetched data where appropriate.
- Do not introduce Redux, TanStack Query, or another state-management or data-fetching library.

## 5. Mock API

- Use JSON Server with a local `db.json` file.
- Expose a `GET /deals` endpoint.
- Keep all mock records synthetic.
- Run the Next.js application and JSON Server as separate local processes.

The API contract and run commands are documented in `API.md`.

## 6. Styling

- Use Tailwind CSS for layout, spacing, typography, colors, borders, and responsive behavior.
- Prefer reusable components only where they improve clarity.
- Avoid adding a separate UI component library unless a concrete requirement justifies it.

## 7. Testing

- Use Vitest as the test runner.
- Use React Testing Library to test rendered UI and user interactions.
- Use `@testing-library/user-event` when realistic user interaction is needed.
- Keep business logic testable independently of the UI where practical.

Test setup and coverage requirements are documented in `TESTING.md`.

## 8. Dependencies and Scope Control

- Prefer existing project dependencies and native browser capabilities.
- Add only the packages required for the mock API and automated testing.
- Do not add authentication, a database, global state management, or advanced data-fetching libraries.
- Do not implement CRUD operations or other features outside the assignment scope.

## 9. Existing Project Configuration

The project was initialized with TypeScript, ESLint, Tailwind CSS, the Next.js App Router, a `src/` directory, and the `@/*` import alias.

Before implementation, verify the repository's actual configuration and package versions. This document describes the intended stack and must not be treated as proof that every dependency is already installed.

## 10. Related Documents

- `REQUIREMENTS.md` — functional and acceptance requirements.
- `DATA_MODEL.md` — deal data structure.
- `API.md` — mock API contract and local execution.
- `UI.md` — interface behavior and layout.
- `TESTING.md` — test setup and coverage.
- `IMPLEMENTATION_PLAN.md` — implementation phases.
