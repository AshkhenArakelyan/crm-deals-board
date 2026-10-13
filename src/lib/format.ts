const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

// Dates are stored as UTC timestamps, so format in UTC to match the date filters.
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

/** Formats a number as US dollars, e.g. `$12,000`. */
export function formatCurrency(value: number): string {
  return currencyFormatter.format(value);
}

/** Formats an ISO 8601 string as e.g. `Sep 15, 2026`. */
export function formatDate(iso: string): string {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? "—" : dateFormatter.format(date);
}
