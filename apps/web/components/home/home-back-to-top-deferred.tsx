"use client";

import { LazyIsland } from "@/components/home/lazy-island";

function load() {
  return import("@/components/home/home-back-to-top").then((m) => ({
    default: m.HomeBackToTop,
  }));
}

export function HomeBackToTopDeferred() {
  return <LazyIsland load={load} fallback={null} idleTimeoutMs={6000} />;
}
