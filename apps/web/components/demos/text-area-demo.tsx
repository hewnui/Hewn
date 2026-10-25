"use client";

import { TextArea } from "@hewnui/ui";

export function TextAreaDemo() {
  return (
    <div
      data-kp-surface
      className="not-prose my-6 grid gap-4 rounded-[calc(var(--kp-radius-lg)+0.25rem)] border bg-surface p-5 shadow-[var(--kp-shadow-surface)]"
    >
      <TextArea
        label="Release notes"
        placeholder="What changed in this build?"
        description="Shown on the changelog and email digests."
      />
      <TextArea
        label="Internal memo"
        isInvalid
        errorMessage="Keep this under 500 characters."
        defaultValue="Draft copy that overruns the product review limit for shipping."
      />
    </div>
  );
}
