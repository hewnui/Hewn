"use client";

import { AppearanceExpanded } from "@/components/appearance-controls.expanded";
import { DockPreview } from "@/components/appearance-controls.preview";
import {
  dockShellSurface as shellSurface,
  dockSpring as spring,
  useDockDismiss,
} from "@/components/dock-shell";
import { useMotionMode } from "@hewnui/ui";
import { AnimatePresence, m } from "motion/react";
import { useId, useRef, useState } from "react";

export function AppearanceControls({
  className,
  showThemes = true,
}: {
  className?: string;
  showThemes?: boolean;
}) {
  const { motionEnabled } = useMotionMode();
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const expanded = hovered || pinned;

  useDockDismiss(pinned, rootRef, setPinned);

  return (
    <div
      ref={rootRef}
      className={className ?? "relative sticky top-3 z-20 mx-auto w-fit"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setHovered(false);
        }
      }}
    >
      {/* In-flow anchor — keeps nav geometry stable while the shell overlays */}
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={() => setPinned((value) => !value)}
        data-kp-surface
        className={`relative z-0 flex h-11 items-center px-3 ${shellSurface} transition-transform active:scale-[0.98] ${
          expanded ? "pointer-events-none invisible" : ""
        }`}
      >
        <DockPreview showThemes={showThemes} />
      </button>

      <AnimatePresence>
        {expanded ? (
          <m.div
            key="dock-shell"
            data-kp-surface
            aria-label="Preview appearance"
            className={`absolute top-0 right-0 z-50 flex h-11 max-w-[min(100vw-1.5rem,52rem)] items-center overflow-hidden ${shellSurface}`}
            initial={
              motionEnabled
                ? { clipPath: "inset(0% 0% 0% 100%)", opacity: 0.9 }
                : false
            }
            animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
            exit={
              motionEnabled
                ? { clipPath: "inset(0% 0% 0% 100%)", opacity: 0.9 }
                : { opacity: 0 }
            }
            transition={motionEnabled ? spring : { duration: 0 }}
          >
            <AppearanceExpanded
              panelId={panelId}
              showThemes={showThemes}
              motionEnabled={motionEnabled}
            />
          </m.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
