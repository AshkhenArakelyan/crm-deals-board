import { useCallback, useEffect, useState } from "react";
import { fetchDeals } from "@/lib/api";
import type { Deal } from "@/types/deal";

export type DealsState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "success"; deals: Deal[] };

/** Loads the deals once on mount, and again whenever `retry` is called. */
export function useDeals() {
  const [state, setState] = useState<DealsState>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    fetchDeals(controller.signal)
      .then((deals) => setState({ status: "success", deals }))
      .catch(() => {
        if (!controller.signal.aborted) setState({ status: "error" });
      });

    return () => controller.abort();
  }, [attempt]);

  const retry = useCallback(() => {
    setState({ status: "loading" });
    setAttempt((current) => current + 1);
  }, []);

  return { state, retry };
}
