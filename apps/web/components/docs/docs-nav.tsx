"use client";

import { HewnLogo } from "@/components/brand/hewn-logo";
import { ListIcon } from "@phosphor-icons/react/dist/csr/List";
import { useDocsLayout } from "fumadocs-ui/layouts/docs";
import Link from "next/link";

/** Mobile-only strip. Desktop chrome lives in the sidebar. */
export function DocsNav() {
  const { slots } = useDocsLayout();

  return (
    <header
      id="nd-subnav"
      className="flex h-[var(--fd-header-height)] items-center gap-2 border-b border-border/60 bg-[color-mix(in_oklch,var(--kp-background)_82%,transparent)] px-3 md:hidden [grid-area:header]"
    >
      {slots.sidebar ? (
        <slots.sidebar.trigger className="inline-flex size-10 items-center justify-center rounded-xl text-muted-foreground transition-[background-color,color,transform] hover:bg-muted/50 hover:text-foreground active:scale-[0.96]">
          <ListIcon aria-hidden className="size-4" weight="bold" />
        </slots.sidebar.trigger>
      ) : null}

      <Link
        href="/"
        className="inline-flex min-h-10 items-center transition-transform active:scale-[0.96]"
      >
        <HewnLogo markClassName="size-6 shrink-0" />
      </Link>
    </header>
  );
}
