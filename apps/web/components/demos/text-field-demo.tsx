"use client";

import { TextField } from "@hewnui/ui";

export function TextFieldDemo() {
  return (
    <div
      data-kp-surface
      className="not-prose my-6 grid gap-4 rounded-[calc(var(--kp-radius-lg)+0.25rem)] border bg-surface p-5 shadow-[var(--kp-shadow-surface)]"
    >
      <TextField variant="outline" label="Outline (Default)" placeholder="Standard input outline" />
      <TextField variant="filled" label="Filled variant" placeholder="Muted surface fill" />
      <TextField variant="flushed" label="Flushed variant" placeholder="Bottom line border only" />
      <TextField variant="glass" label="Glass variant" placeholder="Frosted glass field chrome" />
      <TextField
        variant="outline"
        label="Email validation"
        type="email"
        description="We'll send billing receipts here."
        placeholder="ops@andruia.dev"
      />
      <TextField
        variant="outline"
        label="Invite code"
        isInvalid
        errorMessage="That code is expired."
        defaultValue="KP-OLD"
      />
    </div>
  );
}
