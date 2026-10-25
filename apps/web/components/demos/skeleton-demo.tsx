"use client";

import { Skeleton } from "@hewnui/ui";

export function SkeletonDemo() {
  return (
    <div
      data-kp-surface
      className="not-prose my-6 space-y-3 rounded-[calc(var(--kp-radius-lg)+0.25rem)] border p-5 shadow-[var(--kp-shadow-surface)]"
    >
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-24 w-full" />
    </div>
  );
}
