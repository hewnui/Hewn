"use client";

import { useDeferMount } from "@/components/use-defer-mount";
import dynamic from "next/dynamic";

const AppearanceControls = dynamic(
  () =>
    import("@/components/appearance-controls").then((m) => m.AppearanceControls),
  {
    ssr: false,
    loading: () => <AppearanceControlsShell />,
  },
);

function AppearanceControlsShell() {
  return (
    <div
      aria-hidden
      data-kp-surface
      className="relative z-0 flex h-11 w-[7.5rem] items-center rounded-[var(--kp-radius-md)] border border-border/70 px-3"
    >
      <span className="size-2.5 rounded-full bg-accent opacity-70" />
      <span className="ms-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
        Theme
      </span>
    </div>
  );
}

/** Home/docs dock — shell first; Motion + instruments load on idle/input. */
export function AppearanceControlsDeferred({
  className,
  showThemes = true,
}: {
  className?: string;
  showThemes?: boolean;
}) {
  const ready = useDeferMount();
  if (!ready) {
    return (
      <div className={className ?? "relative w-fit"}>
        <AppearanceControlsShell />
      </div>
    );
  }
  return (
    <AppearanceControls
      {...(className !== undefined ? { className } : {})}
      showThemes={showThemes}
    />
  );
}
