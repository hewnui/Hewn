"use client";

import {
  DockDivider,
  InstrumentSegment,
} from "@/components/appearance-controls.parts";
import {
  radiusScales,
  useMaterial,
  useMotionMode,
  useRadius,
  useTheme,
  type MaterialMode,
  type MotionMode,
  type ThemeMode,
} from "@hewnui/ui";
import {
  DropHalfIcon,
  MoonIcon,
  SquareIcon,
  SunIcon,
  WaveSineIcon,
} from "@phosphor-icons/react";
import type { ReactNode } from "react";

const radiusPreview = {
  sharp: "0.1rem",
  soft: "0.35rem",
  rounded: "0.55rem",
  pill: "9999px",
} as const;

const motionModes: MotionMode[] = ["full", "reduced", "off"];

export function AppearanceInstruments() {
  const { mode, setMode, supportedModes } = useTheme();
  const { material, setMaterial } = useMaterial();
  const { radius, setRadius } = useRadius();
  const { motion, reducedMotion, setMotion } = useMotionMode();

  return (
    <div className="flex items-center gap-1">
      <Cluster label="Mode">
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
      </Cluster>
      <DockDivider />
      <Cluster label="Material">
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
      </Cluster>
      <DockDivider />
      <Cluster label="Radius">
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
      </Cluster>
      <DockDivider />
      <Cluster label="Motion">
        {motionModes.map((value) => {
          const blocked = reducedMotion && value === "full";
          return (
            <InstrumentSegment
              key={`mot-${value}`}
              active={motion === value}
              label={value}
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
      </Cluster>
    </div>
  );
}

function Cluster({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="flex shrink-0 items-center gap-0.5"
    >
      {children}
    </div>
  );
}
