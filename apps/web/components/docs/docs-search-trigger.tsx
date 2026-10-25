"use client";

import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/csr/MagnifyingGlass";
import { useSearchContext } from "fumadocs-ui/contexts/search";
import { useEffect } from "react";

export function DocsSearchTrigger({
  className,
  autoOpen = false,
}: {
  className?: string;
  /** Open the dialog once after mount (deferred shell click path). */
  autoOpen?: boolean;
}) {
  const { setOpenSearch, enabled, hotKey } = useSearchContext();

  useEffect(() => {
    if (autoOpen && enabled) setOpenSearch(true);
  }, [autoOpen, enabled, setOpenSearch]);

  if (!enabled) return null;

  return (
    <button
      type="button"
      data-search-full=""
      onClick={() => setOpenSearch(true)}
      className={
        className ??
        "inline-flex h-10 min-w-10 items-center gap-2 rounded-lg border border-border/80 bg-muted/40 px-3 text-sm text-muted-foreground transition-[transform,background-color,color] hover:bg-muted/70 hover:text-foreground active:scale-[0.96]"
      }
    >
      <MagnifyingGlassIcon
        aria-hidden
        className="size-3.5 shrink-0 opacity-70"
        weight="bold"
      />
      {/* sr-only on narrow viewports so icon-only chrome still has a name. */}
      <span className="truncate sr-only sm:not-sr-only sm:inline">
        Search docs
      </span>
      <span
        aria-hidden
        className="ms-auto hidden items-center gap-0.5 md:inline-flex"
      >
        {hotKey.map((key) => (
          <kbd
            key={String(key.display)}
            className="rounded-md border border-border/60 bg-[color-mix(in_oklch,var(--kp-surface)_70%,transparent)] px-1.5 py-0.5 font-mono text-[10px] tabular-nums text-muted-foreground"
          >
            {key.display}
          </kbd>
        ))}
      </span>
    </button>
  );
}
