# API — CRM Deals Board

## 1. Overview

The application uses JSON Server as a local mock REST API.

Deal data is stored in a local `db.json` file at the project root.

The API provides the initial dataset. Search, filtering, sorting, and pagination are handled on the client.

## 2. Endpoint

### Get All Deals

- **Method:** `GET`
- **Endpoint:** `/deals`
- **Purpose:** Retrieve the complete list of deals.
- **Success response:** `200 OK`
- **Response body:** A JSON array of `Deal` objects.

Example response:

```
[
  {
    "id": 1,
    "title": "Website Redesign",
    "company": "Northstar Labs",
    "value": 12000,
    "stage": "Proposal",
    "owner": "Alex Morgan",
    "createdAt": "2026-09-15T10:30:00.000Z"
  },
  {
    "id": 2,
    "title": "Annual Software Contract",
    "company": "Bluepeak Systems",
    "value": 25000,
    "stage": "Negotiation",
    "owner": "Jamie Lee",
    "createdAt": "2026-09-20T14:00:00.000Z"
  }
]
```

The example data is illustrative. Actual records must follow the `Deal` model defined in `DATA_MODEL.md`.

## 3. Local Configuration

- Store mock records in `db.json` at the project root.
- Run JSON Server as a separate development process.
- Use a configurable environment variable for the API base URL, with a documented local default.
- The default local API URL is `http://localhost:3001`.
- The endpoint URL is formed by appending `/deals` to the base URL.

The exact JSON Server command and installed version must be verified during implementation.

## 4. Fetching Data

- Use native `fetch` to request the deals endpoint.
- Retrieve the dataset when the deals board loads.
- Check the response status before parsing the response body.
- Handle unsuccessful HTTP responses and network failures.
- Keep the data-fetching logic separate from the table presentation where practical.

## 5. Error Handling

The UI must support the following states:

- **Loading:** The request is in progress.
- **Success:** Deals have been retrieved successfully.
- **Error:** The request failed or returned an unsuccessful response.
- **Empty results:** The request succeeded, but no deals match the current search and filters.

An empty search result is not an API error.

If the request fails, display a clear error message. A retry action is optional and is not required for the initial assignment scope.

## 6. Client-Side Operations

After the dataset is fetched successfully, apply operations in this order:

1. Search.
2. Filtering.
3. Sorting.
4. Pagination.

Changing search criteria, filters, or sorting must return pagination to the first page.

These operations must not trigger additional API requests.

## 7. Scope Limitations

- Only `GET /deals` is required.
- No create, update, or delete endpoints are needed.
- No real database or production backend is required.
- No real customer or confidential data may be used.

## 8. Related Documents

- `REQUIREMENTS.md` — expected application behavior.
- `TECH_STACK.md` — technical choices and dependencies.
- `DATA_MODEL.md` — deal schema and field types.
- `UI.md` — loading, error, empty, and success states.
