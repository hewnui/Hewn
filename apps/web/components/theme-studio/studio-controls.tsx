"use client";

import type { BasePackId, RadiusPreset } from "@hewnui/themes/authoring";
import { BASE_PACK_IDS, supportedModes } from "@hewnui/themes/authoring";
import { TextField } from "@hewnui/ui";
import { StudioSegmented } from "./studio-segmented";

const RADIUS: RadiusPreset[] = ["sharp", "soft", "rounded", "pill"];

/** Forest seed. Used when the authored seed is not a hex the picker can show. */
export const FALLBACK_ACCENT_SEED = "#2f6b4f";

const groupLabel =
  "font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground";

function toOptions<T extends string>(values: readonly T[]) {
  return values.map((value) => ({ value, label: value }));
}

export function StudioControls({
  basePackId,
  accentSeed,
  radiusPreset,
  previewMode,
  adjustments,
  onBasePack,
  onAccent,
  onRadius,
  onPreviewMode,
}: {
  basePackId: BasePackId;
  accentSeed: string;
  radiusPreset: RadiusPreset;
  previewMode: "light" | "dark";
  adjustments: string[];
  onBasePack: (id: BasePackId) => void;
  onAccent: (value: string) => void;
  onRadius: (value: RadiusPreset) => void;
  onPreviewMode: (mode: "light" | "dark") => void;
}) {
  const modes = supportedModes(basePackId);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className={groupLabel}>Base pack</p>
        <StudioSegmented
          label="Base pack"
          value={basePackId}
          options={toOptions(BASE_PACK_IDS)}
          onChange={onBasePack}
        />
      </div>

      <div className="flex items-end gap-3">
        <input
          type="color"
          aria-label="Accent color picker"
          value={accentSeed.startsWith("#") ? accentSeed : FALLBACK_ACCENT_SEED}
          onChange={(event) => onAccent(event.target.value)}
          className="h-10 w-12 shrink-0 cursor-pointer rounded-[var(--kp-radius-sm)] border border-border bg-transparent p-1"
        />
        <TextField
          label="Accent seed"
          value={accentSeed}
          onChange={onAccent}
          placeholder={`${FALLBACK_ACCENT_SEED} or oklch(…)`}
          className="flex-1"
          inputClassName="font-mono"
        />
      </div>

      <div className="space-y-2">
        <p className={groupLabel}>Radius preset</p>
        <StudioSegmented
          label="Radius preset"
          value={radiusPreset}
          options={toOptions(RADIUS)}
          onChange={onRadius}
        />
      </div>

      {modes.length > 1 ? (
        <div className="space-y-2">
          <p className={groupLabel}>Preview mode</p>
          <StudioSegmented
            label="Preview mode"
            value={previewMode}
            options={toOptions(modes)}
            onChange={onPreviewMode}
          />
        </div>
      ) : null}

      {/* Canonical home for engine adjustments — the dock shows only a count. */}
      {adjustments.length > 0 ? (
        <div className="rounded-[var(--kp-radius-md)] border border-border bg-muted/40 px-3 py-2">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Engine notes
          </p>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            {adjustments.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
