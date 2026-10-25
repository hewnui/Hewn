"use client";

import {
  useMaterial,
  useMotionMode,
  useRadius,
  useTheme,
  type ThemeName,
} from "@hewnui/ui";
import {
  DropHalfIcon,
  MoonIcon,
  SquareIcon,
  SunIcon,
  WaveSineIcon,
} from "@phosphor-icons/react";

const radiusPreview = {
  sharp: "0.1rem",
  soft: "0.35rem",
  rounded: "0.55rem",
  pill: "9999px",
} as const;

export function DockPreview({ showThemes = true }: { showThemes?: boolean }) {
  const { theme, mode } = useTheme();
  const { material } = useMaterial();
  const { radius } = useRadius();
  const { effectiveMode, motionEnabled } = useMotionMode();

  return (
    <div className="flex items-center gap-2 px-1">
      {showThemes ? (
        <span className="inline-flex items-center gap-2">
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-accent">
            {theme}
          </span>
          <span
            aria-hidden
            className="size-3.5 rounded-full bg-accent shadow-[inset_0_1px_0_oklch(1_0_0/35%),0_0_0_1px_oklch(0_0_0/14%)]"
          />
        </span>
      ) : (
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
          {theme}
        </span>
      )}

      <span aria-hidden className="h-4 w-px bg-border/80" />

      <span className="inline-flex items-center gap-1.5 text-muted-foreground">
        {mode === "light" ? (
          <SunIcon aria-hidden className="size-3.5" weight="bold" />
        ) : (
          <MoonIcon aria-hidden className="size-3.5" weight="bold" />
        )}
        {material === "solid" ? (
          <SquareIcon aria-hidden className="size-3.5" weight="fill" />
        ) : (
          <DropHalfIcon aria-hidden className="size-3.5" weight="fill" />
        )}
        <span
          aria-hidden
          className="size-3.5 border-2 border-current"
          style={{ borderRadius: radiusPreview[radius] }}
        />
        <WaveSineIcon
          aria-hidden
          className="size-3.5"
          weight={motionEnabled ? "bold" : "regular"}
        />
      </span>

      <span className="sr-only">
        {theme}, {mode}, {material}, {radius} radius, motion {effectiveMode}
      </span>
    </div>
  );
}
