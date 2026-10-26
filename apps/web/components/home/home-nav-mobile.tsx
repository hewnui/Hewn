"use client";

import { useDockDismiss } from "@/components/dock-shell";
import { navLinks } from "@/components/home/content";
import { GITHUB_REPO_URL } from "@/lib/site-links";
import { useMotionMode } from "@hewnui/ui";
import { ListIcon } from "@phosphor-icons/react/dist/csr/List";
import { XIcon } from "@phosphor-icons/react/dist/csr/X";
import { AnimatePresence, m } from "motion/react";
import Link from "next/link";
import { useId, useRef, useState } from "react";

/** Header navigation below `lg`, where the inline link row is hidden. */
export function HomeNavMobile() {
  const { motionEnabled } = useMotionMode();
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useDockDismiss(open, rootRef, setOpen);

  return (
    <div ref={rootRef} className="relative lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex size-10 items-center justify-center rounded-lg text-muted-foreground transition-[color,background-color,transform] hover:bg-muted/50 hover:text-foreground active:scale-[0.96]"
      >
        {open ? (
          <XIcon aria-hidden className="size-5" />
        ) : (
          <ListIcon aria-hidden className="size-5" />
        )}
      </button>

      <AnimatePresence>
        {open ? (
          <m.nav
            key="mobile-nav"
            id={panelId}
            aria-label="Primary"
            data-kp-surface
            className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-56 overflow-hidden rounded-[var(--kp-radius-lg)] border p-1.5 shadow-[var(--kp-shadow-surface)]"
            initial={motionEnabled ? { opacity: 0, y: -8 } : false}
            animate={{ opacity: 1, y: 0 }}
            exit={motionEnabled ? { opacity: 0, y: -8 } : { opacity: 0 }}
            transition={
              motionEnabled
                ? { type: "spring", stiffness: 260, damping: 26 }
                : { duration: 0 }
            }
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch={false}
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center rounded-[var(--kp-radius-md)] px-3 text-sm text-muted-foreground transition-[color,background-color] hover:bg-muted/50 hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hewn UI on GitHub"
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center rounded-[var(--kp-radius-md)] px-3 text-sm text-muted-foreground transition-[color,background-color] hover:bg-muted/50 hover:text-foreground"
            >
              GitHub
            </a>
          </m.nav>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
