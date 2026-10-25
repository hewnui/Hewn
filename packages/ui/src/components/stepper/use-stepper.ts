"use client";

import { useCallback, useState } from "react";
import type { UseStepperOptions, UseStepperResult } from "./stepper.types";

/**
 * Small wizard helper for pairing step content with {@link Stepper}.
 * Supports controlled and uncontrolled indices.
 */
export function useStepper({
  count,
  defaultIndex = 0,
  index,
  onIndexChange,
}: UseStepperOptions): UseStepperResult {
  const controlled = index !== undefined;
  const [uncontrolled, setUncontrolled] = useState(() =>
    clamp(defaultIndex, count),
  );
  const currentIndex = controlled ? clamp(index, count) : uncontrolled;

  const goTo = useCallback(
    (next: number) => {
      const clamped = clamp(next, count);
      if (!controlled) setUncontrolled(clamped);
      onIndexChange?.(clamped);
    },
    [controlled, count, onIndexChange],
  );

  const next = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);
  const previous = useCallback(
    () => goTo(currentIndex - 1),
    [currentIndex, goTo],
  );

  const statusFor = useCallback(
    (stepIndex: number) => {
      if (stepIndex < currentIndex) return "complete" as const;
      if (stepIndex === currentIndex) return "current" as const;
      return "upcoming" as const;
    },
    [currentIndex],
  );

  return {
    currentIndex,
    goTo,
    next,
    previous,
    isFirst: currentIndex <= 0,
    isLast: currentIndex >= count - 1,
    statusFor,
  };
}

function clamp(value: number, count: number) {
  if (count <= 0) return 0;
  return Math.max(0, Math.min(count - 1, value));
}
