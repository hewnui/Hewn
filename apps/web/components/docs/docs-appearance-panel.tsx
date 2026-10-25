"use client";

import {
  InstrumentSegment,
  ThemeSwatch,
} from "@/components/appearance-controls.parts";
import {
  radiusScales,
  themePacks,
  useMaterial,
  useMotionMode,
  useRadius,
  useTheme,
  type MaterialMode,
  type MotionMode,
  type ThemeMode,
  type ThemeName,
} from "@hewnui/ui";
import { CaretDownIcon } from "@phosphor-icons/react/dist/csr/CaretDown";
import { DropHalfIcon } from "@phosphor-icons/react/dist/csr/DropHalf";
import { MoonIcon } from "@phosphor-icons/react/dist/csr/Moon";
import { SquareIcon } from "@phosphor-icons/react/dist/csr/Square";
import { SunIcon } from "@phosphor-icons/react/dist/csr/Sun";
import { WaveSineIcon } from "@phosphor-icons/react/dist/csr/WaveSine";
import { useId, useState } from "react";

const themeNames = Object.keys(themePacks) as ThemeName[];
const motionModes: MotionMode[] = ["full", "reduced", "off"];

const radiusPreview = {
  sharp: "0.1rem",
  soft: "0.35rem",
  rounded: "0.55rem",
  pill: "9999px",
} as const;

/** Compact footer tuner — collapsed by default so nav stays primary. */
export function DocsAppearancePanel() {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const { theme, setTheme, mode, setMode, supportedModes } = useTheme();
  const { material, setMaterial } = useMaterial();
  const { radius, setRadius } = useRadius();
  const { motion, effectiveMode, reducedMotion, setMotion } = useMotionMode();

  return (
    <div className="border-t border-border/60 pt-3">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="flex w-full min-h-10 items-center gap-2 rounded-lg px-1.5 text-left transition-[background-color,transform] hover:bg-muted/40 active:scale-[0.99]"
      >
        <span
          aria-hidden
          className="size-3 shrink-0 rounded-full bg-accent shadow-[inset_0_1px_0_oklch(1_0_0/35%),0_0_0_1px_oklch(0_0_0/14%)]"
        />
        <span className="sr-only">Appearance settings: </span>
        <span className="min-w-0 flex-1 truncate font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          <span className="text-accent">{theme}</span>
          <span className="text-border"> · </span>
          {mode}
          <span className="text-border"> · </span>
          {material}
          <span className="text-border"> · </span>
          {effectiveMode}
        </span>
        <CaretDownIcon
          aria-hidden
          className={`size-3.5 shrink-0 text-muted-foreground transition-transform ${
            open ? "rotate-180" : ""
          }`}
          weight="bold"
        />
      </button>

      {open ? (
        <div id={panelId} className="mt-3 space-y-3 px-0.5 pb-1">
          <div
            role="group"
            aria-label="Theme"
            className="flex flex-wrap gap-0"
          >
            {themeNames.map((value) => (
              <ThemeSwatch
                key={value}
                active={theme === value}
                theme={value}
                label={value}
                onSelect={() => setTheme(value)}
              />
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-0.5">
            {supportedModes.map((value) => (
              <InstrumentSegment
                key={`mode-${value}`}
                active={mode === value}
                label={value}
                onSelect={() => setMode(value as ThemeMode)}
              >
                {value === "light" ? (
                  <SunIcon aria-hidden className="size-3.5" weight="bold" />
                ) : (
                  <MoonIcon aria-hidden className="size-3.5" weight="bold" />
                )}
              </InstrumentSegment>
            ))}
            {(["solid", "glass"] as const).map((value) => (
              <InstrumentSegment
                key={`mat-${value}`}
                active={material === value}
                label={value}
                onSelect={() => setMaterial(value as MaterialMode)}
              >
                {value === "solid" ? (
                  <SquareIcon aria-hidden className="size-3.5" weight="fill" />
                ) : (
                  <DropHalfIcon aria-hidden className="size-3.5" weight="fill" />
                )}
              </InstrumentSegment>
            ))}
            {radiusScales.map((value) => (
              <InstrumentSegment
                key={`rad-${value}`}
                active={radius === value}
                label={value}
                onSelect={() => setRadius(value)}
              >
                <span
                  aria-hidden
                  className="size-3.5 border-2 border-current"
                  style={{ borderRadius: radiusPreview[value] }}
                />
              </InstrumentSegment>
            ))}
            {motionModes.map((value) => {
              const blocked = reducedMotion && value === "full";
              return (
                <InstrumentSegment
                  key={`mot-${value}`}
                  active={motion === value}
                  label={`motion ${value}`}
                  onSelect={() => {
                    if (!blocked) setMotion(value);
                  }}
                >
                  <WaveSineIcon
                    aria-hidden
                    className={`size-3.5 ${blocked ? "opacity-40" : ""}`}
                    weight={value === "full" ? "bold" : "regular"}
                  />
                </InstrumentSegment>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
