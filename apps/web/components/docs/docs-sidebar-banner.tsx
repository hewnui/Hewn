import { DocsSearchDeferred } from "@/components/docs/docs-search-deferred";

const searchWell =
  "inline-flex h-10 w-full items-center gap-2 rounded-xl border border-border/50 bg-[color-mix(in_oklch,var(--kp-background)_40%,transparent)] px-3 text-sm text-muted-foreground transition-[transform,background-color,color,border-color] hover:border-border hover:bg-[color-mix(in_oklch,var(--kp-background)_55%,transparent)] hover:text-foreground active:scale-[0.96]";

/** Top of docs sidebar: search only — page tree owns the rest. */
export function DocsSidebarBanner() {
  return <DocsSearchDeferred className={searchWell} />;
}
