# Implementation Plan — CRM Deals Board

## 1. Goal

Implement the CRM Deals Board according to the requirements and technical decisions documented in this directory.

Keep the implementation focused on the assignment scope and avoid unnecessary dependencies or features.

## 2. Phase 1: Project and API Setup

- Review the existing Next.js project configuration.
- Install and configure JSON Server.
- Create `db.json` with exactly 30 synthetic deal records.
- Add a script to run the mock API.
- Verify that `GET /deals` returns valid JSON containing all 30 deals.
- Verify that the returned records match the `Deal` model defined in `DATA_MODEL.md`.

**Acceptance criteria:**

- The mock API starts successfully.
- `GET /deals` returns valid JSON containing exactly 30 deal records.
- All returned records match the `Deal` model defined in `DATA_MODEL.md`.



## 3. Phase 2: Data Logic

- Define the TypeScript `Deal` and `DealStage` types.
- Implement the data-fetching function using native `fetch`.
- Implement search, filtering, sorting, and pagination logic.
- Keep the data-processing logic independent of React where practical.

**Acceptance criteria:**

- The deals can be fetched from the mock API.
- Search, filters, sorting, and pagination produce the expected results.
- The original dataset is not mutated by data-processing operations.



## 4. Phase 3: Deals Board UI

- Create the deals board page.
- Build the search input and filter controls.
- Build the deals table.
- Add sorting controls and pagination.
- Add loading, error, and empty states.
- Apply responsive styling with Tailwind CSS.
- Implement the reset behavior.

**Acceptance criteria:**

- The board displays deals retrieved from the API.
- Search, filters, sorting, pagination, and reset work together.
- The layout remains usable on small screens.
- No create, edit, or delete functionality is added.



## 5. Phase 4: Automated Tests

- Configure Vitest and React Testing Library.
- Test search behavior.
- Test filtering and sorting together.
- Test table rendering.
- Test search interaction in the UI.

**Acceptance criteria:**

- All four planned tests pass.
- Tests can be executed using a documented command.



## 6. Phase 5: Final Review and README

- Review the implementation against `REQUIREMENTS.md`.
- Fix any remaining functional issues.
- Verify the application and mock API startup instructions.
- Document setup, execution, testing, and key implementation decisions in `README.md`.
- Check that no confidential or real customer data is included.

**Acceptance criteria:**

- The application runs locally using the README instructions.
- All required features work.
- All four tests pass.
- The repository is ready to share for evaluation.



## 7. Scope Control

- Implement one phase at a time.
- Verify each phase before moving to the next.
- Do not introduce additional features without a clear requirement.
- Do not install unnecessary dependencies.
- Keep implementation decisions consistent with the other documents.



## 8. Related Documents

- `REQUIREMENTS.md`
- `TECH_STACK.md`
- `DATA_MODEL.md`
- `API.md`
- `UI.md`
- `TESTING.md`

