"use client";

import { useEffect, useState } from "react";

const DEFAULT_EVENTS = ["pointerdown", "keydown", "touchstart"] as const;

type DeferMountOptions = {
  /** Also arm on these window events. */
  events?: readonly string[];
  /** Idle timeout fallback in ms when requestIdleCallback is missing. */
  timeoutMs?: number;
};

/**
 * Stay false through first paint, then flip true on idle or first user input.
 * Used to keep appearance/search/chrome chunks off the LCP critical path.
 */
export function useDeferMount({
  events = DEFAULT_EVENTS,
  timeoutMs = 2500,
}: DeferMountOptions = {}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return;

    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;

    const arm = () => {
      if (cancelled) return;
      setReady(true);
    };

    for (const name of events) {
      window.addEventListener(name, arm, {
        once: true,
        passive: true,
        capture: true,
      });
    }

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(arm, { timeout: timeoutMs });
    } else {
      timeoutId = setTimeout(arm, Math.min(timeoutMs, 1200));
    }

    return () => {
      cancelled = true;
      for (const name of events) {
        window.removeEventListener(name, arm, { capture: true });
      }
      if (
        idleId !== undefined &&
        typeof window.cancelIdleCallback === "function"
      ) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, [events, ready, timeoutMs]);

  return ready;
}
