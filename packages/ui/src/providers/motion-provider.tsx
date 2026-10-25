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

export function useMotionMode() {
  const value = useContext(HewnMotionContext);
  if (!value) {
    throw new Error("useMotionMode must be used within MotionProvider");
  }
  return value;
}
