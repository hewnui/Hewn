"use client";

import {
  useEffect,
  useState,
  type ComponentType,
  type ReactNode,
} from "react";
import { useVisibleMount } from "@/components/use-visible-mount";

type LazyIslandProps = {
  /** Dynamic import of a default-exported client island. */
  load: () => Promise<{ default: ComponentType }>;
  /** Static HTML shown until the island mounts (layout + SEO fallback). */
  fallback?: ReactNode;
  rootMargin?: string;
  idleTimeoutMs?: number;
};

/**
 * Defers a client island until near-viewport or idle. The loader stays inside
 * a client module so Server Components never pass functions across the boundary.
 */
export function LazyIsland({
  load,
  fallback = null,
  rootMargin,
  idleTimeoutMs,
}: LazyIslandProps) {
  const { ref, ready } = useVisibleMount({
    ...(rootMargin !== undefined ? { rootMargin } : {}),
    ...(idleTimeoutMs !== undefined ? { idleTimeoutMs } : {}),
  });
  const [Comp, setComp] = useState<ComponentType | null>(null);

  useEffect(() => {
    if (!ready || Comp) return;
    let cancelled = false;
    void load().then((mod) => {
      if (!cancelled) setComp(() => mod.default);
    });
    return () => {
      cancelled = true;
    };
  }, [ready, load, Comp]);

  return <div ref={ref}>{Comp ? <Comp /> : fallback}</div>;
}
