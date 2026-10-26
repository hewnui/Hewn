"use client";

import { proCopy } from "@/components/pro/pro-content";
import { Button, Form, TextField, useMotionMode } from "@hewnui/ui";
import Link from "next/link";
import { useState, type FormEvent } from "react";

type Status =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

type ProWaitlistFormProps = {
  source?: "pro" | "home";
};

export function ProWaitlistForm({ source = "pro" }: ProWaitlistFormProps) {
  const { motionEnabled } = useMotionMode();
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldError(null);
    setStatus({ kind: "loading" });

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, company }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        alreadyJoined?: boolean;
        message?: string;
        code?: string;
      };

      if (!response.ok || !data.ok) {
        const message =
          data.message ??
          (response.status === 503
            ? proCopy.unavailable
            : proCopy.errorGeneric);
        if (data.code === "invalid_email") {
          setFieldError(message);
          setStatus({ kind: "idle" });
          return;
        }
        setStatus({ kind: "error", message });
        return;
      }

      setStatus({
        kind: "success",
        message: data.alreadyJoined
          ? proCopy.successExisting
          : proCopy.successNew,
      });
      setEmail("");
    } catch {
      setStatus({ kind: "error", message: proCopy.errorGeneric });
    }
  }

  const busy = status.kind === "loading";

  return (
    <div className="space-y-4">
      <Form
        onSubmit={onSubmit}
        className="relative space-y-4"
        aria-busy={busy || undefined}
      >
        <TextField
          label="Work email"
          type="email"
          name="email"
          autoComplete="email"
          isRequired
          value={email}
          onChange={setEmail}
          isDisabled={busy || status.kind === "success"}
          isInvalid={Boolean(fieldError)}
          errorMessage={fieldError ?? undefined}
          description="We only use this for Pro access updates."
        />

        {/* Honeypot — hidden from assistive tech and sighted users */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
        >
          <label>
            Company
            <input
              tabIndex={-1}
              autoComplete="off"
              name="company"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
            />
          </label>
        </div>

        <p className="text-sm text-pretty text-muted-foreground">
          {proCopy.consent}{" "}
          <Link
            href={proCopy.privacyHref}
            className="text-foreground underline underline-offset-4 transition-colors hover:text-accent"
          >
            {proCopy.privacyLinkLabel}
          </Link>
          .
        </p>

        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={busy}
          isDisabled={status.kind === "success"}
          {...(motionEnabled ? {} : { className: "transition-none" })}
        >
          {proCopy.waitlistHeading}
        </Button>
      </Form>

      <div aria-live="polite" aria-atomic="true" className="min-h-6">
        {status.kind === "success" ? (
          <p className="text-sm font-medium text-foreground">{status.message}</p>
        ) : null}
        {status.kind === "error" ? (
          <p className="text-sm font-medium text-danger" role="alert">
            {status.message}
          </p>
        ) : null}
      </div>
    </div>
  );
}
