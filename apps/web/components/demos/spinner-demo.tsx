"use client";

import { Button, Spinner } from "@hewnui/ui";

export function SpinnerDemo() {
  return (
    <div
      data-kp-surface
      className="not-prose my-6 flex flex-wrap items-center gap-8 rounded-[calc(var(--kp-radius-lg)+0.25rem)] border p-5 shadow-[var(--kp-shadow-surface)]"
    >
      <div className="flex items-center gap-4 text-muted-foreground">
        <Spinner />
        <Spinner className="size-6" />
        <Spinner className="size-8 text-accent" />
      </div>

      <Button isLoading>Saving</Button>

      <p role="status" className="flex items-center gap-2 text-sm">
        <Spinner />
        Loading results
      </p>
    </div>
  );
}
