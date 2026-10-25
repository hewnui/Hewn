"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Fumadocs wraps wide tables in overflow-auto divs without tabindex. Patch
 * scrollable regions in the docs article so axe scrollable-region-focusable
 * stays clean without forking the MDX table renderer.
 */
export function DocsScrollA11y() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.querySelector("#nd-page");
    if (!root) return;

    const regions = root.querySelectorAll<HTMLElement>(".overflow-auto");
    for (const el of regions) {
      const scrolls =
        el.scrollWidth > el.clientWidth + 1 ||
        el.scrollHeight > el.clientHeight + 1;
      if (!scrolls) continue;
      if (el.tabIndex < 0) el.tabIndex = 0;
      if (!el.getAttribute("role")) el.setAttribute("role", "region");
      if (!el.getAttribute("aria-label")) {
        el.setAttribute("aria-label", "Scrollable content");
      }
    }
  }, [pathname]);

  return null;
}
