export const motionModes = ["full", "reduced", "off"] as const;

export type MotionMode = (typeof motionModes)[number];

const rank: Record<MotionMode, number> = {
  full: 2,
  reduced: 1,
  off: 0,
};

/**
 * Resolve the effective motion mode.
 * An explicit user preference may only reduce motion further — never override
 * `prefers-reduced-motion: reduce` into `full`.
 */
export function resolveMotionMode(
  preference: MotionMode,
  osReduced: boolean,
): MotionMode {
  const ceiling: MotionMode = osReduced ? "reduced" : "full";
  return rank[preference] <= rank[ceiling] ? preference : ceiling;
}

export function isMotionMode(value: string): value is MotionMode {
  return (motionModes as readonly string[]).includes(value);
}

/**
 * Parse stored / prop motion preferences.
 * Legacy `"on"` is accepted as a deprecated alias of `"full"` (breaking rename).
 */
export function parseMotionPreference(value: string | null): MotionMode | null {
  if (value === "on") {
    if (!isProductionEnv()) {
      console.warn(
        '[Hewn] Motion mode "on" is deprecated; use "full". Mapping "on" → "full".',
      );
    }
    return "full";
  }
  if (value === "full") return "full";
  if (value === "reduced") return "reduced";
  if (value === "off") return "off";
  return null;
}

/** Accept `MotionMode` or the deprecated `"on"` alias (maps to `"full"`). */
export function coerceMotionMode(
  value: MotionMode | "on" | string | null | undefined,
  fallback: MotionMode = "full",
): MotionMode {
  if (value == null) return fallback;
  return parseMotionPreference(String(value)) ?? fallback;
}

export function motionConfigReduced(
  effective: MotionMode,
): "never" | "always" {
  return effective === "full" ? "never" : "always";
}

function isProductionEnv(): boolean {
  const proc = (globalThis as { process?: { env?: { NODE_ENV?: string } } })
    .process;
  return proc?.env?.NODE_ENV === "production";
}
