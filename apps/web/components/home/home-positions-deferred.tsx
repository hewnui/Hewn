"use client";

import { HomePositionsStatic } from "@/components/home/home-positions-static";
import { LazyIsland } from "@/components/home/lazy-island";

function load() {
  return import("@/components/home/home-positions-interactive").then((m) => ({
    default: m.HomePositionsInteractive,
  }));
}

export function HomePositionsDeferred() {
  return <LazyIsland load={load} fallback={<HomePositionsStatic />} />;
}
