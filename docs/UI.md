# UI Specification — CRM Deals Board

## 1. Overview

The CRM Deals Board uses a clean, modern, responsive table layout.

The interface is read-only. Users can search, filter, sort, and navigate through deals, but cannot create, edit, or delete records.

## 2. Page Layout

The page contains the following sections in order:

1. Page heading: `CRM Deals Board`.
2. Search input.
3. Filter controls.
4. Reset action.
5. Deals table.
6. Pagination controls.

Use consistent spacing, readable typography, and clear visual hierarchy.

## 3. Search

- Place the search input above the filter controls.
- Provide a placeholder explaining that users can search by deal ID, title, company, or owner.
- Search is case-insensitive for text fields.
- Update the displayed results as the search query changes.
- Reset pagination to the first page when the query changes.



## 4. Filters

Display the following controls:

- Stage dropdown, defaulting to `All stages`.
- Minimum deal value input.
- Maximum deal value input.
- Created date start input.
- Created date end input.

Requirements:

- Filters can be combined.
- Numeric inputs must accept valid non-negative values.
- Empty minimum or maximum values do not restrict the results on that side.
- Empty date boundaries do not restrict the results on that side.
- The start date and end date are inclusive.
- Reset pagination to the first page when a filter changes.



## 5. Sorting

- Support sorting by deal title, deal value, and created date.
- Each supported field can be sorted in ascending or descending order.
- Indicate the active sort field and direction in the UI.
- Use created date descending as the default sort order.
- Reset pagination to the first page when sorting changes.



## 6. Deals Table

Display these columns in order:

1. ID
2. Deal Title
3. Company
4. Deal Value
5. Stage
6. Owner
7. Created Date

Requirements:

- Use clear column headings.
- Format deal values consistently in USD, using the `$` symbol.
- Format dates in a readable format.
- Make deal stages easy to distinguish visually.
- Long text must not make the entire layout unusable.
- Rows are read-only. Clicking a row does not navigate or open a details view.



## 7. Pagination

- Display page numbers and previous/next controls.
- Show the current page clearly.
- Disable previous on the first page.
- Disable next on the last page.
- Calculate the number of pages from the filtered and sorted result count.
- Use a fixed page size of 10 deals.
- Reset to the first page whenever search, filters, or sorting changes.
- If no results match, display the empty state rather than an empty set of page controls.



## 8. Reset Behavior

Provide a clearly labeled `Reset` action.

When activated, it must:

- Clear the search query.
- Reset the stage filter to `All stages`.
- Clear the minimum and maximum deal values.
- Clear the start and end dates.
- Restore the default sorting: created date descending.
- Return pagination to the first page.



## 9. UI States



### Loading

Show a simple loading indicator or message while the initial request is in progress.

### Error

Show a clear message when the API request fails.

### Empty Results

Show a message when the API returns no deals or when search and filters produce no matching results.

### Success

Display the table and pagination when matching deals are available.

## 10. Responsive Behavior



### Desktop

- Keep search and filters above the table.
- Display all columns when space allows.
- Use consistent alignment and spacing.



### Small Screens

- Allow the table to scroll horizontally within its container.
- Prevent the entire page from becoming wider than the viewport.
- Keep search and filter controls usable.
- Allow filter controls to wrap onto multiple lines.



## 11. Accessibility

- Use semantic table markup and meaningful column headers.
- Associate form controls with accessible labels.
- Ensure controls can be operated with a keyboard.
- Provide visible focus styles.
- Do not rely on color alone to communicate deal stages or sorting direction.



## 12. Related Documents

- `REQUIREMENTS.md` — functional behavior and acceptance criteria.
- `DATA_MODEL.md` — deal fields and stage values.
- `API.md` — data retrieval and API states.
- `TESTING.md` — UI behavior to verify through tests.

