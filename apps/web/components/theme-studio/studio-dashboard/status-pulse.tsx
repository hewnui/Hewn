"use client";

import { memo } from "react";

export const StudioStatusPulse = memo(function StudioStatusPulse({
  tone = "accent",
}: {
  tone?: "accent" | "muted";
}) {
  const color = tone === "muted" ? "bg-muted-foreground" : "bg-accent";

  return (
    <span className="relative inline-flex size-2.5 shrink-0" aria-hidden>
      <span
        className={`absolute inset-0 rounded-full ${color} opacity-35 motion-safe:animate-ping`}
      />
      <span className={`relative size-2.5 rounded-full ${color}`} />
    </span>
  );
});
