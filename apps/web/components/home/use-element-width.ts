"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Charts in `@hewnui/ui` take a fixed pixel width, so a fluid container has
 * to measure itself and hand the number down. Fallback covers SSR and the first
 * paint before the observer fires.
 */
export function useElementWidth<T extends HTMLElement>(fallback: number) {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(fallback);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new ResizeObserver((entries) => {
      const next = entries[0]?.contentRect.width;
      if (next && next > 0) setWidth(Math.round(next));
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, width] as const;
}
