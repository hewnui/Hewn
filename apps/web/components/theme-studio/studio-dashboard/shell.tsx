"use client";

import { useMotionMode } from "@hewnui/ui";
import { m } from "motion/react";
import type { ReactNode } from "react";
import { StudioSegmented } from "../studio-segmented";
import { StudioCompareScrubber } from "./compare-scrubber";
import { StudioDashboardSpecimen } from "./specimen";

export function StudioDashboardShell({
  mode,
  label,
  previewKey,
  cssVars,
  compareEnabled,
  onCompareChange,
  compareVars,
  compareLabel,
  children,
}: {
  mode: "light" | "dark";
  label: string;
  previewKey: string;
  cssVars: Record<string, string>;
  compareEnabled: boolean;
  onCompareChange: (next: boolean) => void;
  compareVars: Record<string, string> | null;
  compareLabel: string;
  children?: ReactNode;
}) {
  const { motionEnabled } = useMotionMode();
  const hasCompare = compareVars !== null;

  return (
    <div className="min-w-0">
      <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Live specimen
          </p>
          <p className="mt-1 text-sm capitalize text-foreground">{label}</p>
        </div>
        <div className="ml-auto">
          <StudioSegmented
            label="Specimen view"
            value={compareEnabled ? "compare" : "draft"}
            onChange={(next) => onCompareChange(next === "compare")}
            options={[
              { value: "draft", label: "Draft" },
              { value: "compare", label: "Compare", isDisabled: !hasCompare },
            ]}
          />
        </div>
      </div>
      <m.div
        key={previewKey}
        initial={motionEnabled ? { opacity: 0, y: 8 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={
          motionEnabled
            ? { type: "spring", stiffness: 120, damping: 22 }
            : { duration: 0 }
        }
      >
        {compareEnabled && compareVars ? (
          <StudioCompareScrubber
            mode={mode}
            curatedVars={compareVars}
            draftVars={cssVars}
            curatedLabel={compareLabel}
            draftLabel={label}
          />
        ) : (
          <StudioDashboardSpecimen mode={mode} vars={cssVars} draft>
            {children}
          </StudioDashboardSpecimen>
        )}
      </m.div>
    </div>
  );
}
