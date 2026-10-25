"use client";

import { InputOTP } from "@hewnui/ui";

export function InputOtpDemo() {
  return (
    <div
      data-kp-surface
      className="not-prose my-6 grid gap-4 rounded-[calc(var(--kp-radius-lg)+0.25rem)] border bg-surface p-5 shadow-[var(--kp-shadow-surface)]"
    >
      <InputOTP
        label="Email code"
        length={6}
        description="Paste works across all digits."
      />
      <InputOTP
        label="Backup PIN"
        length={4}
        isInvalid
        errorMessage="That code expired."
        defaultValue="18"
      />
    </div>
  );
}
