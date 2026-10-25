"use client";

import { PasswordField } from "@hewnui/ui";

export function PasswordFieldDemo() {
  return (
    <div
      data-kp-surface
      className="not-prose my-6 grid gap-4 rounded-[calc(var(--kp-radius-lg)+0.25rem)] border bg-surface p-5 shadow-[var(--kp-shadow-surface)]"
    >
      <PasswordField
        label="Account password"
        placeholder="Enter a strong passphrase"
        description="Use at least 12 characters."
      />
      <PasswordField
        label="Confirm password"
        isInvalid
        errorMessage="Passwords do not match."
        defaultValue="mismatch"
      />
    </div>
  );
}
