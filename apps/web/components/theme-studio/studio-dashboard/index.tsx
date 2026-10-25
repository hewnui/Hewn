"use client";

import {
  SCHEMA_VERSION,
  derivePack,
  modeToCssVars,
  type BasePackId,
  type RadiusPreset,
} from "@hewnui/themes/authoring";
import { useMemo, useState } from "react";
import { StudioDashboardShell } from "./shell";

export function StudioDashboard({
  basePackId,
  radiusPreset,
  mode,
  label,
  previewKey,
  cssVars,
}: {
  basePackId: BasePackId;
  radiusPreset: RadiusPreset;
  mode: "light" | "dark";
  label: string;
  previewKey: string;
  cssVars: Record<string, string>;
}) {
  const [compareEnabled, setCompareEnabled] = useState(false);
  const compareVars = useMemo(() => {
    const result = derivePack({
      schemaVersion: SCHEMA_VERSION,
      basePackId,
      radiusPreset,
      packId: `compare-${basePackId}`,
    });
    if (!result.ok) return null;
    const resolved = result.pack.modes[mode];
    return resolved ? modeToCssVars(resolved) : null;
  }, [basePackId, mode, radiusPreset]);

  return (
    <StudioDashboardShell
      mode={mode}
      label={label}
      previewKey={previewKey}
      cssVars={cssVars}
      compareEnabled={compareEnabled}
      onCompareChange={setCompareEnabled}
      compareVars={compareVars}
      compareLabel={`${basePackId} curated`}
    />
  );
}
