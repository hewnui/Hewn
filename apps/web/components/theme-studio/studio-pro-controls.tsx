"use client";

import {
  PRO_AUTHORING_UNLOCKED,
  type DensityPreset,
  type GlassOverrides,
  type MotionCharacter,
  type NeutralOverrides,
  type SemanticOverrides,
  type ShapeOverrides,
} from "@hewnui/themes/authoring";
import { Slider, TextField } from "@hewnui/ui";
import { StudioSegmented } from "./studio-segmented";

const DENSITY: DensityPreset[] = ["compact", "default", "comfortable"];
const MOTION: MotionCharacter[] = ["snappy", "balanced", "soft"];

export type ProOverrides = {
  neutrals: NeutralOverrides;
  semantic: SemanticOverrides;
  shape: ShapeOverrides;
  glass: GlassOverrides;
  motion: MotionCharacter;
};

const groupLabel = "text-sm font-medium text-foreground";

export function StudioProControls({
  value,
  unlocked = PRO_AUTHORING_UNLOCKED,
  onChange,
}: {
  value: ProOverrides;
  unlocked?: boolean;
  onChange: (next: ProOverrides) => void;
}) {
  const options = <T extends string>(values: readonly T[]) =>
    values.map((option) => ({
      value: option,
      label: option,
      isDisabled: !unlocked,
    }));

  return (
    <section
      className={[
        "space-y-5 rounded-[var(--kp-radius-md)] border border-border p-4",
        unlocked ? "bg-surface" : "bg-muted/30",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Pro authoring
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Neutrals, semantics, density, glass, and motion character.
          </p>
        </div>
        <span className="shrink-0 rounded-[var(--kp-radius-sm)] border border-border bg-muted px-2 py-1 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
          {unlocked ? "Unlocked" : "Coming soon"}
        </span>
      </div>

      <div className="space-y-3">
        <p className={groupLabel}>Neutrals / surfaces</p>
        <Slider
          label="Surface shift"
          minValue={-0.08}
          maxValue={0.08}
          step={0.01}
          isDisabled={!unlocked}
          value={value.neutrals.surfaceShift ?? 0}
          onChange={(next) =>
            onChange({
              ...value,
              neutrals: { ...value.neutrals, surfaceShift: Number(next) },
            })
          }
        />
        <Slider
          label="Chroma scale"
          minValue={0.5}
          maxValue={1.5}
          step={0.05}
          isDisabled={!unlocked}
          value={value.neutrals.chromaScale ?? 1}
          onChange={(next) =>
            onChange({
              ...value,
              neutrals: { ...value.neutrals, chromaScale: Number(next) },
            })
          }
        />
      </div>

      <TextField
        label="Danger seed"
        isDisabled={!unlocked}
        value={value.semantic.dangerSeed ?? ""}
        onChange={(next) => {
          const dangerSeed = next.trim();
          onChange({ ...value, semantic: dangerSeed ? { dangerSeed } : {} });
        }}
        placeholder="#b91c1c or oklch(…)"
        inputClassName="font-mono"
      />

      <div className="space-y-2">
        <p className={groupLabel}>Density</p>
        <StudioSegmented
          label="Density"
          value={value.shape.density ?? "default"}
          options={options(DENSITY)}
          onChange={(density) => onChange({ ...value, shape: { density } })}
        />
      </div>

      <Slider
        label="Glass tint strength"
        minValue={0.5}
        maxValue={1.5}
        step={0.05}
        isDisabled={!unlocked}
        value={value.glass.tintStrength ?? 1}
        onChange={(next) =>
          onChange({ ...value, glass: { tintStrength: Number(next) } })
        }
      />

      <div className="space-y-2">
        <p className={groupLabel}>Motion character</p>
        <StudioSegmented
          label="Motion character"
          value={value.motion}
          options={options(MOTION)}
          onChange={(motion) => onChange({ ...value, motion })}
        />
      </div>
    </section>
  );
}
