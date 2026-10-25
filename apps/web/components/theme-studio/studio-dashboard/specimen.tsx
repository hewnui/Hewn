"use client";

import type { CSSProperties, ReactNode } from "react";
import { StudioDashboardChrome } from "./chrome";
import { StudioDashboardDataPanel } from "./data-panel";
import { StudioDashboardMetrics } from "./metrics";
import { StudioDashboardWorkspace } from "./workspace";

export function StudioDashboardSpecimen({
  mode,
  vars,
  draft = false,
  className,
  children,
}: {
  mode: "light" | "dark";
  vars: Record<string, string>;
  draft?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      {...(draft ? { "data-studio-specimen": "" } : {})}
      data-mode={mode}
      className={[
        "kp-studio-specimen overflow-hidden rounded-[calc(var(--kp-radius-lg)+0.4rem)] border border-border bg-background text-foreground shadow-[var(--kp-shadow-surface)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={
        {
          colorScheme: mode,
          ...vars,
        } as CSSProperties
      }
    >
      <StudioDashboardChrome />
      <StudioDashboardMetrics />
      <div className="grid lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.9fr)]">
        <StudioDashboardWorkspace />
        <StudioDashboardDataPanel />
      </div>
      {children}
    </div>
  );
}
