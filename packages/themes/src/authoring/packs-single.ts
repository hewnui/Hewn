import { o, type PackDef } from "./pack-def";

/** Single-mode curated packs. Keep in sync with src/packs/*.css. */
export const SINGLE_PACKS = {
  dune: {
    structural: {
      radiusSm: "0.55rem",
      radiusMd: "0.85rem",
      radiusLg: "1.15rem",
      radiusPanel: "1.15rem",
      density: 0.95,
      motionDuration: "280ms",
      motionStiffness: 300,
      motionDamping: 26,
    },
    modes: {
      light: {
        background: o(0.96, 0.02, 85),
        foreground: o(0.28, 0.04, 65),
        surface: o(0.985, 0.012, 90),
        surfaceRaised: o(0.995, 0.006, 95),
        muted: o(0.92, 0.025, 85),
        mutedForeground: o(0.5, 0.04, 70),
        accent: o(0.58, 0.11, 70),
        accentForeground: o(0.98, 0.01, 90),
        border: o(0.4, 0.04, 70, 0.16),
        ring: o(0.62, 0.12, 70),
        danger: o(0.55, 0.16, 30),
        glassTint: o(0.78, 0.09, 80, 0.3),
      },
    },
  },
  clay: {
    structural: {
      radiusSm: "0.5rem",
      radiusMd: "0.8rem",
      radiusLg: "1.05rem",
      radiusPanel: "1.05rem",
      density: 1,
      motionDuration: "270ms",
      motionStiffness: 320,
      motionDamping: 27,
    },
    modes: {
      light: {
        background: o(0.955, 0.02, 55),
        foreground: o(0.27, 0.045, 40),
        surface: o(0.98, 0.012, 50),
        surfaceRaised: o(0.995, 0.006, 45),
        muted: o(0.915, 0.025, 50),
        mutedForeground: o(0.5, 0.045, 40),
        accent: o(0.55, 0.12, 40),
        accentForeground: o(0.98, 0.01, 50),
        border: o(0.4, 0.05, 40, 0.16),
        ring: o(0.6, 0.13, 40),
        danger: o(0.54, 0.17, 28),
        glassTint: o(0.74, 0.1, 45, 0.28),
      },
    },
  },
  ember: {
    structural: {
      radiusSm: "0.45rem",
      radiusMd: "0.7rem",
      radiusLg: "0.95rem",
      radiusPanel: "0.95rem",
      density: 1.05,
      motionDuration: "230ms",
      motionStiffness: 400,
      motionDamping: 28,
    },
    modes: {
      dark: {
        background: o(0.17, 0.02, 40),
        foreground: o(0.93, 0.02, 70),
        surface: o(0.21, 0.025, 40),
        surfaceRaised: o(0.255, 0.03, 42),
        muted: o(0.275, 0.028, 40),
        mutedForeground: o(0.72, 0.03, 60),
        accent: o(0.7, 0.15, 50),
        accentForeground: o(0.985, 0.015, 50),
        border: o(0.84, 0.03, 60, 0.14),
        ring: o(0.7, 0.15, 50),
        danger: o(0.66, 0.17, 28),
        glassTint: o(0.58, 0.15, 50, 0.28),
      },
    },
  },
} as const satisfies Record<string, PackDef>;
