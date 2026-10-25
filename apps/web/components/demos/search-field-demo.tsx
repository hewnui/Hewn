"use client";

import { SearchField } from "@hewnui/ui";

export function SearchFieldDemo() {
  return (
    <div
      data-kp-surface
      className="not-prose my-6 grid gap-4 rounded-[calc(var(--kp-radius-lg)+0.25rem)] border bg-surface p-5 shadow-[var(--kp-shadow-surface)]"
    >
      <SearchField
        label="Find components"
        placeholder="Name, category, or tier"
        description="Press Escape to clear."
      />
      <SearchField
        label="Filter customers"
        defaultValue="andruia"
        variant="filled"
      />
    </div>
  );
}
