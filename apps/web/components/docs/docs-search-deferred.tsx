"use client";

import { useDeferMount } from "@/components/use-defer-mount";
import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/csr/MagnifyingGlass";
import dynamic from "next/dynamic";
import { useState } from "react";

const DocsSearchTrigger = dynamic(
  () =>
    import("@/components/docs/docs-search-trigger").then(
      (m) => m.DocsSearchTrigger,
    ),
  { ssr: false },
);

const searchWell =
  "inline-flex h-10 w-full items-center gap-2 rounded-xl border border-border/50 bg-[color-mix(in_oklch,var(--kp-background)_40%,transparent)] px-3 text-sm text-muted-foreground transition-[transform,background-color,color,border-color] hover:border-border hover:bg-[color-mix(in_oklch,var(--kp-background)_55%,transparent)] hover:text-foreground active:scale-[0.96]";

function DocsSearchShell({
  className,
  onActivate,
}: {
  className?: string;
  onActivate: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onActivate}
      onFocus={onActivate}
      className={className ?? searchWell}
    >
      <MagnifyingGlassIcon
        aria-hidden
        className="size-3.5 shrink-0 opacity-70"
        weight="bold"
      />
      {/* Always in the a11y tree; visually icon-only below `sm`. */}
      <span className="truncate sr-only sm:not-sr-only sm:inline">
        Search docs
      </span>
      <span
        aria-hidden
        className="ms-auto hidden items-center gap-0.5 md:inline-flex"
      >
        <kbd className="rounded-md border border-border/60 bg-[color-mix(in_oklch,var(--kp-surface)_70%,transparent)] px-1.5 py-0.5 font-mono text-[10px] tabular-nums text-muted-foreground">
          ⌘K
        </kbd>
      </span>
    </button>
  );
}

/**
 * Sidebar search — static shell until idle/click so Fumadocs search context
 * work stays off the first-contentful critical path.
 */
export function DocsSearchDeferred({ className }: { className?: string }) {
  const idleReady = useDeferMount();
  const [openedFromShell, setOpenedFromShell] = useState(false);
  const ready = idleReady || openedFromShell;
  const well = className ?? searchWell;

  if (!ready) {
    return (
      <DocsSearchShell
        className={well}
        onActivate={() => setOpenedFromShell(true)}
      />
    );
  }

  return (
    <DocsSearchTrigger className={well} autoOpen={openedFromShell} />
  );
}
