"use client";

import { LazyIsland } from "@/components/home/lazy-island";
import { themeBlurbs } from "@/components/home/content";

const themeNames = [
  "forest",
  "tide",
  "graphite",
  "dune",
  "clay",
  "ember",
] as const;

function load() {
  return import("@/components/home/home-identity-interactive").then((m) => ({
    default: m.HomeIdentityInteractive,
  }));
}

function IdentityFallback() {
  const blurb = themeBlurbs.forest!;
  return (
    <div
      data-kp-surface
      className="rounded-[calc(var(--kp-radius-lg)+0.75rem)] border p-6 shadow-[var(--kp-shadow-surface)] md:p-8"
    >
      <div className="flex flex-wrap gap-2">
        {themeNames.map((name) => (
          <span
            key={name}
            className="inline-flex min-h-10 items-center gap-2 rounded-[var(--kp-radius-md)] border px-3 text-sm capitalize"
          >
            <span
              aria-hidden
              data-theme={name}
              data-mode={name === "ember" ? "dark" : "light"}
              className="size-3.5 rounded-full bg-accent shadow-[inset_0_1px_0_oklch(1_0_0/35%)]"
            />
            {name}
          </span>
        ))}
      </div>
      <div className="mt-8 border-t pt-6">
        <p className="text-xl font-semibold tracking-tight">{blurb.title}</p>
        <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-muted-foreground">
          {blurb.line}
        </p>
      </div>
    </div>
  );
}

export function HomeIdentityIsland() {
  return <LazyIsland load={load} fallback={<IdentityFallback />} />;
}
