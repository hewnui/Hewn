"use client";

import { useDeferMount } from "@/components/use-defer-mount";
import dynamic from "next/dynamic";

const DocsAppearancePanel = dynamic(
  () =>
    import("@/components/docs/docs-appearance-panel").then(
      (m) => m.DocsAppearancePanel,
    ),
  {
    ssr: false,
    loading: () => <DocsAppearanceShell />,
  },
);

/** Static collapsed chrome — matches the real panel trigger geometry. */
function DocsAppearanceShell() {
  return (
    <div className="border-t border-border/60 pt-3" aria-hidden>
      <div className="flex w-full min-h-10 items-center gap-2 rounded-lg px-1.5">
        <span className="size-3 shrink-0 rounded-full bg-accent shadow-[inset_0_1px_0_oklch(1_0_0/35%),0_0_0_1px_oklch(0_0_0/14%)]" />
        <span className="min-w-0 flex-1 truncate font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          Appearance
        </span>
      </div>
    </div>
  );
}

/**
 * Sidebar footer tuner — shell first, hydrate on idle/interaction so docs LCP
 * prose is not blocked by appearance + Phosphor chunks.
 */
export function DocsAppearanceDeferred() {
  const ready = useDeferMount();
  if (!ready) return <DocsAppearanceShell />;
  return <DocsAppearancePanel />;
}
