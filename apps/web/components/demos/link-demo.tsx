"use client";

import { Link } from "@hewnui/ui";

export function LinkDemo() {
  return (
    <div
      data-kp-surface
      className="not-prose my-6 flex flex-col gap-4 rounded-[calc(var(--kp-radius-lg)+0.25rem)] border bg-surface p-5 shadow-[var(--kp-shadow-surface)]"
    >
      <div className="flex flex-wrap items-center gap-4">
        <Link href="/docs/getting-started">Getting started</Link>
        <Link href="/docs/themes" variant="muted">
          Themes
        </Link>
        <Link href="/docs/cli" variant="underline">
          CLI reference
        </Link>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Link href="/docs/components" isDisabled>
          Disabled trail
        </Link>
      </div>
    </div>
  );
}
