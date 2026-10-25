"use client";

import { memo } from "react";

export const HomeProductPulse = memo(function HomeProductPulse({
  live = false,
}: {
  live?: boolean;
}) {
  const fill = live ? "bg-accent" : "bg-muted-foreground/55";

  return (
    <span className="relative inline-flex size-2.5 shrink-0" aria-hidden>
      {live ? (
        <span className="absolute inset-0 rounded-full bg-accent opacity-40 motion-safe:animate-ping" />
      ) : null}
      <span className={`relative size-2.5 rounded-full ${fill}`} />
    </span>
  );
});
