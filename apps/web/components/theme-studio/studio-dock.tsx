"use client";

import {
  dockShellSurface as shellSurface,
  dockSpring as spring,
  useDockDismiss,
} from "@/components/dock-shell";
import type { BasePackId, RadiusPreset } from "@hewnui/themes/authoring";
import { useMotionMode } from "@hewnui/ui";
import { m } from "motion/react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { StudioDockPreview } from "./studio-dock-preview";
import { StudioDockSheet } from "./studio-dock-sheet";
import type { FreeExportFormat } from "./studio-free-exports";
import type { ProOverrides } from "./studio-pro-controls";
import type { ProExportFormat } from "./studio-pro-exports";

const COLLAPSE_MS = 160;
const BAR_H = "2.75rem";

export function StudioDock({
  basePackId,
  accentSeed,
  radiusPreset,
  previewMode,
  adjustments,
  pro,
  onBasePack,
  onAccent,
  onRadius,
  onPreviewMode,
  onProChange,
  onAiApply,
  onDownloadCss,
  onReset,
  onFreeExport,
  onProExport,
}: {
  basePackId: BasePackId;
  accentSeed: string;
  radiusPreset: RadiusPreset;
  previewMode: "light" | "dark";
  adjustments: string[];
  pro: ProOverrides;
  onBasePack: (id: BasePackId) => void;
  onAccent: (value: string) => void;
  onRadius: (value: RadiusPreset) => void;
  onPreviewMode: (mode: "light" | "dark") => void;
  onProChange: (next: ProOverrides) => void;
  onAiApply: (next: {
    basePackId: BasePackId;
    accentSeed: string;
    radiusPreset: RadiusPreset;
  }) => void;
  onDownloadCss: () => void;
  onReset: () => void;
  onFreeExport: (format: FreeExportFormat) => void;
  onProExport: (format: ProExportFormat) => void;
}) {
  const { motionEnabled } = useMotionMode();
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const collapseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const expanded = hovered || pinned;

  const clearCollapseTimer = useCallback(() => {
    if (collapseTimer.current) {
      clearTimeout(collapseTimer.current);
      collapseTimer.current = null;
    }
  }, []);

  const handleEnter = useCallback(() => {
    clearCollapseTimer();
    setHovered(true);
  }, [clearCollapseTimer]);

  const handleLeave = useCallback(() => {
    clearCollapseTimer();
    collapseTimer.current = setTimeout(() => {
      if (!pinned) setHovered(false);
    }, COLLAPSE_MS);
  }, [clearCollapseTimer, pinned]);

  useEffect(() => () => clearCollapseTimer(), [clearCollapseTimer]);

  useDockDismiss(pinned, rootRef, setPinned);

  const sheetProps = {
    panelId,
    basePackId,
    accentSeed,
    radiusPreset,
    previewMode,
    adjustments,
    pro,
    onBasePack,
    onAccent,
    onRadius,
    onPreviewMode,
    onProChange,
    onAiApply,
    onDownloadCss,
    onReset,
    onFreeExport,
    onProExport,
  };

  const previewProps = {
    basePackId,
    accentSeed,
    radiusPreset,
    previewMode,
    adjustments,
  };

  return (
    <div
      ref={rootRef}
      className="relative sticky bottom-3 z-30 mx-auto mt-4 w-full max-w-[min(100vw-1.5rem,40rem)] px-2"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocusCapture={handleEnter}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          handleLeave();
        }
      }}
    >
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={() => setPinned((value) => !value)}
        data-kp-surface
        className={`relative z-0 flex h-11 w-full items-center px-3 sm:px-4 ${shellSurface} transition-transform active:scale-[0.98] ${
          expanded ? "pointer-events-none invisible" : ""
        }`}
      >
        <StudioDockPreview {...previewProps} />
      </button>

      <m.div
        data-kp-surface
        aria-label="Theme Studio authoring"
        className={`absolute inset-x-0 bottom-0 z-50 flex max-h-[min(88dvh,36rem)] flex-col overflow-hidden ${shellSurface} ${
          expanded ? "" : "pointer-events-none"
        }`}
        {...(!expanded ? { inert: true as const } : {})}
        initial={false}
        animate={{
          clipPath: expanded
            ? "inset(0% 0% 0% 0%)"
            : `inset(calc(100% - ${BAR_H}) 0% 0% 0%)`,
          opacity: expanded ? 1 : 0,
        }}
        transition={motionEnabled ? spring : { duration: 0 }}
      >
        <StudioDockSheet {...sheetProps} />
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={panelId}
          onClick={() => setPinned((value) => !value)}
          className="flex h-11 w-full shrink-0 items-center border-t border-border/80 px-3 sm:px-4 transition-transform active:scale-[0.98]"
        >
          <StudioDockPreview {...previewProps} />
        </button>
      </m.div>
    </div>
  );
}
