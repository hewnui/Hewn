"use client";

import { useEffect, useRef, useState } from "react";
import { useDeferMount } from "@/components/use-defer-mount";

type VisibleMountOptions = {
  /** Expand the intersection root so near-viewport sections arm early. */
  rootMargin?: string;
  /** Idle fallback so below-fold islands still hydrate without scroll. */
  idleTimeoutMs?: number;
};

/**
 * Stay false through first paint, then flip true when the element nears the
 * viewport or the browser goes idle. Keeps heavy island chunks off LCP.
 */
export function useVisibleMount({
  rootMargin = "320px 0px",
  idleTimeoutMs = 4500,
}: VisibleMountOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const idleReady = useDeferMount({ timeoutMs: idleTimeoutMs });

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;

    if (typeof IntersectionObserver !== "function") {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, visible]);

  return { ref, ready: visible || idleReady };
}
