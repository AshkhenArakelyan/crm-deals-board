import type { Deal } from "@/types/deal";

const DEFAULT_API_BASE_URL = "http://localhost:3001";

/** API base URL from `NEXT_PUBLIC_API_BASE_URL`, falling back to the local default. */
export function getApiBaseUrl(): string {
  const configured = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  return (configured || DEFAULT_API_BASE_URL).replace(/\/+$/, "");
}

/** Fetches all deals from `GET {baseUrl}/deals`. Throws on network or HTTP errors. */
export async function fetchDeals(signal?: AbortSignal): Promise<Deal[]> {
  const response = await fetch(`${getApiBaseUrl()}/deals`, { signal });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data: unknown = await response.json();
  if (!Array.isArray(data)) {
    throw new Error("Unexpected response: expected an array of deals");
  }

  return data as Deal[];
}
