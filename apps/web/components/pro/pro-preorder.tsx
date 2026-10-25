"use client";

import { proCopy } from "@/components/pro/pro-content";
import { Button } from "@hewnui/ui";
import { useState } from "react";

type ProPreorderProps = {
  /** Server-gated: only pass when mode is preorder AND price is configured. */
  priceDisplay: string;
  providerId: "demo" | "stripe";
};

/**
 * Pre-order CTA. Parent must not mount this when price is unset —
 * never show a price by accident.
 */
export function ProPreorder({ priceDisplay, providerId }: ProPreorderProps) {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onPreorder() {
    setLoading(true);
    setMessage(null);
    try {
      const response = await fetch("/api/checkout/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          successUrl: "/pro?checkout=ok",
          cancelUrl: "/pro?checkout=cancel",
        }),
      });
      const data = (await response.json()) as {
        kind?: string;
        message?: string;
        reason?: string;
        url?: string;
      };
      if (data.kind === "redirect" && data.url) {
        window.location.assign(data.url);
        return;
      }
      setMessage(
        data.message ??
          data.reason ??
          "Pre-order is not live. Join the waitlist instead.",
      );
    } catch {
      setMessage("Pre-order is not live. Join the waitlist instead.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4 rounded-[var(--kp-radius-lg)] border border-border/70 bg-[color-mix(in_oklch,var(--kp-muted)_20%,transparent)] p-5">
      <div>
        <h3 className="text-lg font-semibold tracking-tight">
          {proCopy.preorderHeading}
        </h3>
        <p className="mt-2 text-sm text-pretty text-muted-foreground">
          {proCopy.preorderSupport}
        </p>
        <p className="mt-3 font-mono text-sm text-foreground">
          Application UI · {priceDisplay}
        </p>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          Provider: {providerId}
        </p>
      </div>
      <Button
        variant="secondary"
        size="md"
        isLoading={loading}
        onPress={onPreorder}
      >
        Pre-order
      </Button>
      <div aria-live="polite" className="min-h-5">
        {message ? (
          <p className="text-sm text-muted-foreground">{message}</p>
        ) : null}
      </div>
    </div>
  );
}
