"use client";

import {
  stateNotes,
  type StateMode,
} from "@/components/home/state-notes";
import { Button, Skeleton, TextField } from "@hewnui/ui";

export type { StateMode };
export { stateNotes };

export function StateStage({ mode }: { mode: StateMode }) {
  if (mode === "loading") {
    return (
      <div
        className="space-y-4"
        role="status"
        aria-busy="true"
        aria-label="Loading preview"
      >
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="mt-6 h-24 w-full" />
      </div>
    );
  }

  if (mode === "empty") {
    return (
      <div className="flex min-h-[13rem] flex-col items-start justify-center">
        <p className="text-lg font-semibold tracking-tight">
          No deployments yet
        </p>
        <p className="mt-2 max-w-[38ch] text-sm text-pretty text-muted-foreground">
          Ship a preview environment and this surface fills with live status —
          not a blank rectangle.
        </p>
        <Button className="mt-6" size="sm">
          Create deployment
        </Button>
      </div>
    );
  }

  if (mode === "error") {
    return (
      <div className="flex min-h-[13rem] flex-col justify-center">
        <TextField
          label="Workspace slug"
          defaultValue="Northline Ops!!"
          isInvalid
          errorMessage="Use lowercase letters, numbers, and hyphens only."
          description="Shown under the field — never buried in a toast alone."
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-[13rem] flex-col justify-center gap-5">
      <TextField
        label="Workspace slug"
        defaultValue="northline-ops"
        description="Looks good. Ready to continue."
      />
      <div className="flex flex-wrap gap-3">
        <Button size="sm">Continue</Button>
        <Button size="sm" variant="outline" isDisabled>
          Locked action
        </Button>
      </div>
    </div>
  );
}
