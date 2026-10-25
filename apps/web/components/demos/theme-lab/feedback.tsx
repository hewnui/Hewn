"use client";

import { Progress, Skeleton, Spinner } from "@hewnui/ui";
import { ThemeLabSection } from "./section";

export function ThemeLabFeedback() {
  return (
    <div className="space-y-6">
      <ThemeLabSection
        title="Progress"
        description="Track fill uses accent; label spacing matches form controls."
      >
        <div className="grid max-w-md gap-4">
          <Progress label="Deploy pipeline" value={62} />
          <Progress label="Indexing" isIndeterminate />
        </div>
      </ThemeLabSection>

      <ThemeLabSection
        title="Loading"
        description="Skeleton geometry mirrors real rows; spinner uses theme motion tokens."
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
      </ThemeLabSection>
    </div>
  );
}
