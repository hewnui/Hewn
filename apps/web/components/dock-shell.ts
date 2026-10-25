"use client";

import { useEffect, type Dispatch, type RefObject, type SetStateAction } from "react";

/** Chrome for the floating docks — appearance bar and Theme Studio dock. */
export const dockShellSurface =
  "rounded-2xl border border-white/10 shadow-[var(--kp-shadow-surface),inset_0_1px_0_oklch(1_0_0/12%)]";

export const dockSpring = {
  type: "spring" as const,
  stiffness: 120,
  damping: 22,
};

/**
 * While a dock is pinned open, Escape or a pointer press outside it unpins.
 *
 * Takes the state setter rather than a callback so the effect does not resubscribe
 * on every render — setters are referentially stable, inline closures are not.
 */
export function useDockDismiss(
  pinned: boolean,
  rootRef: RefObject<HTMLElement | null>,
  setPinned: Dispatch<SetStateAction<boolean>>,
) {
  useEffect(() => {
    if (!pinned) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPinned(false);
    };
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setPinned(false);
      }
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [pinned, rootRef, setPinned]);
}
