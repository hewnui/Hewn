"use client";

import type { BasePackId, RadiusPreset } from "@hewnui/themes/authoring";
import { DockDivider } from "@/components/appearance-controls.parts";
import {
  CaretUpIcon,
  MoonIcon,
  PaletteIcon,
  SunIcon,
} from "@phosphor-icons/react";
import { FALLBACK_ACCENT_SEED } from "./studio-controls";

const radiusPreview = {
  sharp: "0.1rem",
  soft: "0.35rem",
  rounded: "0.55rem",
  pill: "9999px",
} as const;

function accentLabel(seed: string) {
  if (seed.startsWith("#") && seed.length <= 9) return seed;
  if (seed.startsWith("#")) return seed.slice(0, 7);
  return seed.length > 10 ? `${seed.slice(0, 10)}…` : seed;
}

export function StudioDockPreview({
  basePackId,
  accentSeed,
  radiusPreset,
  previewMode,
  adjustments = [],
}: {
  basePackId: BasePackId;
  accentSeed: string;
  radiusPreset: RadiusPreset;
  previewMode: "light" | "dark";
  adjustments?: string[];
}) {
  const swatch = accentSeed.startsWith("#")
    ? accentSeed
    : FALLBACK_ACCENT_SEED;

  return (
    <div className="flex w-full min-w-0 items-center justify-between gap-3">
      <div className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden">
        <span className="inline-flex shrink-0 items-center gap-1.5">
          <PaletteIcon
            className="size-3.5 text-accent"
            weight="bold"
            aria-hidden
          />
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Draft
          </span>
        </span>

        <DockDivider />

        <span className="inline-flex min-w-0 items-center gap-2">
          <span className="truncate font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-accent">
            {basePackId}
          </span>
          <span
            aria-hidden
            className="size-3.5 shrink-0 rounded-full shadow-[inset_0_1px_0_oklch(1_0_0/35%),0_0_0_1px_oklch(0_0_0/14%)]"
            style={{ background: swatch }}
          />
        </span>

        <DockDivider />

        <span className="inline-flex shrink-0 items-center gap-1.5 text-muted-foreground">
          {previewMode === "light" ? (
            <SunIcon aria-hidden className="size-3.5" weight="bold" />
          ) : (
            <MoonIcon aria-hidden className="size-3.5" weight="bold" />
          )}
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.12em] sm:inline">
            {previewMode}
          </span>
          <span
            aria-hidden
            className="size-3.5 border-2 border-current"
            style={{ borderRadius: radiusPreview[radiusPreset] }}
          />
          <span className="hidden font-mono text-[10px] capitalize tracking-[0.08em] md:inline">
            {radiusPreset}
          </span>
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <span
          aria-hidden
          className="hidden h-5 w-10 shrink-0 rounded-[var(--kp-radius-sm)] border border-border/70 sm:block"
          style={{
            background: `linear-gradient(90deg, ${swatch}, color-mix(in oklch, ${swatch} 28%, transparent))`,
          }}
        />
        <span className="hidden rounded-[var(--kp-radius-sm)] border border-border/70 bg-muted/35 px-2 py-1 font-mono text-[10px] tabular-nums text-muted-foreground sm:inline">
          {accentLabel(accentSeed)}
        </span>
        {adjustments.length > 0 ? (
          <span
            className="rounded-full border border-border bg-muted px-2 py-0.5 font-mono text-[10px] text-foreground"
            aria-label={`${adjustments.length} adjustments`}
          >
            {adjustments.length}
          </span>
        ) : null}
        <span className="inline-flex items-center gap-1 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-foreground">
          Author
          <CaretUpIcon className="size-3" weight="bold" aria-hidden />
        </span>
      </div>

      <span className="sr-only">
        {basePackId} draft, {previewMode} mode, {radiusPreset} radius, accent{" "}
        {accentSeed}
        {adjustments.length > 0
          ? `, ${adjustments.length} adjustments`
          : ""}
      </span>
    </div>
  );
}
