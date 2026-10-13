# Testing — CRM Deals Board

## 1. Testing Tools

- **Vitest** runs the automated tests.
- **React Testing Library** tests rendered React components and user interactions.
- **@testing-library/user-event** simulates user input.

React Testing Library tests also run with Vitest.

## 2. Functional Tests

Use Vitest to test the data-processing functions independently of React.

### Test 1: Search

Verify that searching by company name returns matching deals and that text search is case-insensitive.

### Test 2: Filtering and Sorting

Verify that filtering by stage and sorting by deal value in descending order produce the expected results.

## 3. Component Tests

Use React Testing Library to test the deals board UI.

### Test 3: Table Rendering

Verify that the table displays the expected deal title, company, value, and stage.

### Test 4: Search Interaction

Type a company name into the search input and verify that matching deals remain visible while non-matching deals are removed from the displayed results.

## 4. Test Setup

- Configure Vitest for React component tests.
- Use a DOM environment for component tests.
- Use synthetic deal data.
- Keep the setup minimal and compatible with the installed Next.js and React versions.

## 5. Running Tests

Add a test script to `package.json` and document the command in `README.md`.

All four tests must pass before submission.

## 6. Related Documents

- `REQUIREMENTS.md` — expected application behavior.
- `TECH_STACK.md` — selected testing tools.
- `DATA_MODEL.md` — deal data structure.
- `UI.md` — expected interface behavior.
- `IMPLEMENTATION_PLAN.md` — implementation sequence.

