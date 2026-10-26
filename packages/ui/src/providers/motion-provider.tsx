"use client";

import {
  coerceMotionMode,
  loadMotionFeatures,
  motionConfigReduced,
  parseMotionPreference,
  resolveMotionMode,
  type MotionMode,
} from "@hewnui/motion";
import { LazyMotion, MotionConfig } from "motion/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type { MotionMode };

type MotionContextValue = {
  /** User preference (`full` | `reduced` | `off`). */
  motion: MotionMode;
  /** Preference after OS reduced-motion clamp. */
  effectiveMode: MotionMode;
  /** True only when effective mode is `full`. */
  motionEnabled: boolean;
  /** OS `prefers-reduced-motion: reduce`. Always authoritative. */
  reducedMotion: boolean;
  setMotion: (motion: MotionMode) => void;
};

const HewnMotionContext = createContext<MotionContextValue | null>(null);
const STORAGE_KEY = "kp-motion";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/** No-op when components render outside MotionProvider. */
function noopSetMotion(_motion: MotionMode) {}

function readOsReducedMotion(): boolean {
  if (typeof window === "undefined" || typeof matchMedia !== "function") {
    return false;
  }
  return matchMedia(REDUCED_MOTION_QUERY).matches;
}

/** SSR-safe OS reduced-motion (sync on client, false during SSR). */
function useOsReducedMotion(): boolean {
  const [reduced, setReduced] = useState(readOsReducedMotion);
  useEffect(() => {
    if (typeof matchMedia !== "function") return;
    const query = matchMedia(REDUCED_MOTION_QUERY);
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);
  return reduced;
}

function fallbackMotionValue(osReduced: boolean): MotionContextValue {
  const motion: MotionMode = "full";
  const effectiveMode = resolveMotionMode(motion, osReduced);
  return {
    motion,
    effectiveMode,
    motionEnabled: effectiveMode === "full",
    reducedMotion: osReduced,
    setMotion: noopSetMotion,
  };
}

export function MotionProvider({
  children,
  defaultMotion = "full",
}: {
  children: ReactNode;
  /** Prefer `full` | `reduced` | `off`. Legacy `"on"` maps to `"full"`. */
  defaultMotion?: MotionMode | "on";
}) {
  const [motion, setMotionState] = useState<MotionMode>(() =>
    coerceMotionMode(defaultMotion),
  );
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const stored = parseMotionPreference(localStorage.getItem(STORAGE_KEY));
    if (stored) setMotionState(stored);

    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const effectiveMode = resolveMotionMode(motion, reducedMotion);
  const motionEnabled = effectiveMode === "full";

  useEffect(() => {
    document.documentElement.dataset.motion = effectiveMode;
    localStorage.setItem(STORAGE_KEY, motion);
  }, [motion, effectiveMode]);

  const setMotion = useCallback((next: MotionMode) => {
    setMotionState(next);
  }, []);

  const value = useMemo(
    () => ({
      motion,
      effectiveMode,
      motionEnabled,
      reducedMotion,
      setMotion,
    }),
    [motion, effectiveMode, motionEnabled, reducedMotion, setMotion],
  );

  return (
    <HewnMotionContext.Provider value={value}>
      <LazyMotion features={loadMotionFeatures} strict>
        <MotionConfig reducedMotion={motionConfigReduced(effectiveMode)}>
          {children}
        </MotionConfig>
      </LazyMotion>
    </HewnMotionContext.Provider>
  );
}

/**
 * Reads motion preference from MotionProvider when present.
 * Outside a provider, defaults to `full` and still respects OS
 * `prefers-reduced-motion` via matchMedia (SSR-safe).
 */
export function useMotionMode(): MotionContextValue {
  const value = useContext(HewnMotionContext);
  const osReduced = useOsReducedMotion();
  return useMemo(() => {
    if (value) return value;
    return fallbackMotionValue(osReduced);
  }, [value, osReduced]);
}
