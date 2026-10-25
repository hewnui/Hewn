"use client";

import { Button, Empty } from "@hewnui/ui";

export function EmptyDemo() {
  return (
    <div className="not-prose my-6">
      <Empty
        title="No jobs in this window"
        action={<Button variant="secondary">Queue deploy</Button>}
      >
        Routed work will land here. Filters apply to this desk only.
      </Empty>
    </div>
  );
}
