"use client";

import { Badge, Progress, Skeleton, Spinner } from "@hewnui/ui";
import { ThemeLabSection } from "@/components/demos/theme-lab/section";

/** Deterministic feedback — no indeterminate progress animation. */
export function VisualGalleryFeedback() {
  return (
    <div className="space-y-6">
      <ThemeLabSection
        title="Progress"
        description="Determinate fill only so snapshots stay frame-stable."
      >
        <div className="grid max-w-md gap-4">
          <Progress label="Deploy pipeline" value={62} />
          <Progress label="Index warm" value={28} />
        </div>
      </ThemeLabSection>

      <ThemeLabSection
        title="Loading and badges"
        description="Skeleton and spinner respect reduced-motion; badges show semantic color."
      >
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div className="space-y-3">
            <Skeleton className="h-4 w-3/5" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
          <div className="flex min-h-10 items-center gap-3 rounded-[var(--kp-radius-md)] border border-border bg-surface px-4 py-3">
            <Spinner />
            <span className="text-sm text-muted-foreground">Syncing workspace</span>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge color="muted">Muted</Badge>
          <Badge color="accent">Accent</Badge>
          <Badge color="success">Success</Badge>
          <Badge color="danger">Danger</Badge>
        </div>
      </ThemeLabSection>
    </div>
  );
}
