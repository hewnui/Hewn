"use client";

import dynamic from "next/dynamic";

/**
 * Hero interactive islands — no SSR/preload so the support paragraph (LCP) is
 * not gated on specimen/chart/theme scrubber chunks under Slow 4G.
 */
export const HomeHeroCluster = dynamic(
  () =>
    import("@/components/home/home-hero-cluster").then((m) => m.HomeHeroCluster),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden
        className="mx-auto aspect-[4/5] w-full max-w-md rounded-[calc(var(--kp-radius-lg)+0.65rem)] border border-border/60 bg-muted/20 md:mx-0 md:max-w-none"
      />
    ),
  },
);

export const HomeHeroThemes = dynamic(
  () =>
    import("@/components/home/home-hero-themes").then((m) => m.HomeHeroThemes),
  { ssr: false },
);

export const HomeHeroCue = dynamic(
  () => import("@/components/home/home-hero-cue").then((m) => m.HomeHeroCue),
  { ssr: false },
);

/** Motion blobs only — static gradients come from HomeHeroFieldStatic. */
export const HomeHeroFieldMotion = dynamic(
  () =>
    import("@/components/home/home-hero-field").then((m) => m.HomeHeroField),
  { ssr: false },
);
