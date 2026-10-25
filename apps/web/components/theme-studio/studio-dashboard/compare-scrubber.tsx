"use client";

import { useMotionMode } from "@hewnui/ui";
import { ArrowsLeftRightIcon } from "@phosphor-icons/react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { StudioDashboardSpecimen } from "./specimen";

const MIN = 10;
const MAX = 90;

export function StudioCompareScrubber({
  mode,
  curatedVars,
  draftVars,
  curatedLabel,
  draftLabel,
}: {
  mode: "light" | "dark";
  curatedVars: Record<string, string>;
  draftVars: Record<string, string>;
  curatedLabel: string;
  draftLabel: string;
}) {
  const { motionEnabled } = useMotionMode();
  const rootRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const root = rootRef.current;
    if (!root) return;
    const rect = root.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(MAX, Math.max(MIN, pct)));
  }, []);

  const onHandlePointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.currentTarget.setPointerCapture(event.pointerId);
      setDragging(true);
      updateFromClientX(event.clientX);
    },
    [updateFromClientX],
  );

  useEffect(() => {
    if (!dragging) return;
    const onMove = (event: globalThis.PointerEvent) =>
      updateFromClientX(event.clientX);
    const onUp = () => setDragging(false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [dragging, updateFromClientX]);

  const onHandleKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setPosition((value) => Math.max(MIN, value - 2));
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setPosition((value) => Math.min(MAX, value + 2));
    }
    if (event.key === "Home") setPosition(MIN);
    if (event.key === "End") setPosition(MAX);
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          Scrub divider — curated left, draft right
        </p>
        <button
          type="button"
          className="font-mono text-[10px] text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
          onClick={() => setPosition(50)}
        >
          Reset 50/50
        </button>
      </div>

      <div ref={rootRef} className="relative isolate select-none">
        <StudioDashboardSpecimen
          mode={mode}
          vars={curatedVars}
          className="pointer-events-none"
        />

        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{
            clipPath: `inset(0 0 0 ${position}%)`,
            transition:
              dragging || !motionEnabled ? undefined : "clip-path 0.18s ease",
          }}
        >
          <StudioDashboardSpecimen
            mode={mode}
            vars={draftVars}
            draft
            className="pointer-events-none"
          />
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-3 z-10 flex justify-between px-3 sm:px-4">
          <span className="rounded-full border border-border bg-background px-2.5 py-1 font-mono text-[10px] text-muted-foreground shadow-[var(--kp-shadow-surface)]">
            {curatedLabel}
          </span>
          <span className="rounded-full border border-border bg-background px-2.5 py-1 font-mono text-[10px] text-muted-foreground shadow-[var(--kp-shadow-surface)]">
            {draftLabel}
          </span>
        </div>

        <div
          data-compare-handle=""
          className="absolute inset-y-0 z-20 flex w-10 -translate-x-1/2 cursor-ew-resize touch-none items-center justify-center"
          style={{ left: `${position}%` }}
          onPointerDown={onHandlePointerDown}
          onKeyDown={onHandleKeyDown}
          role="slider"
          aria-label="Compare curated and draft themes"
          aria-valuemin={MIN}
          aria-valuemax={MAX}
          aria-valuenow={Math.round(position)}
          tabIndex={0}
        >
          <div className="h-full w-px bg-border" />
          <div className="absolute flex size-9 items-center justify-center rounded-full border border-border bg-background shadow-[var(--kp-shadow-surface)]">
            <ArrowsLeftRightIcon
              className="size-3.5 text-muted-foreground"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </div>
  );
}
