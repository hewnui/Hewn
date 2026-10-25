"use client";

import { proBlockPreviewSrc } from "@/lib/pro/preview-path";
import { proCopy } from "@/components/pro/pro-content";
import { useEffect, useState } from "react";

type ProBlockFrameProps = {
  id: string;
  name: string;
  description: string;
  kind: "section" | "page";
};

export function ProBlockFrame({
  id,
  name,
  description,
  kind,
}: ProBlockFrameProps) {
  const src = proBlockPreviewSrc(id);
  const [status, setStatus] = useState<"pending" | "ok" | "missing">("pending");

  useEffect(() => {
    let cancelled = false;
    setStatus("pending");
    const img = new Image();
    img.onload = () => {
      if (!cancelled) setStatus("ok");
    };
    img.onerror = () => {
      if (!cancelled) setStatus("missing");
    };
    img.src = src;
    return () => {
      cancelled = true;
    };
  }, [src]);

  return (
    <figure className="group flex flex-col overflow-hidden rounded-[var(--kp-radius-lg)] border border-border/70 bg-[color-mix(in_oklch,var(--kp-muted)_18%,transparent)] shadow-[var(--kp-shadow-surface)]">
      <div
        className={
          kind === "page"
            ? "relative aspect-[16/10] overflow-hidden"
            : "relative aspect-[16/9] overflow-hidden"
        }
      >
        {status === "ok" ? (
          // eslint-disable-next-line @next/next/no-img-element -- static public PNG swap folder
          <img
            src={src}
            alt={`${name} preview`}
            className="size-full object-cover object-top"
          />
        ) : (
          <PlaceholderFrame id={id} name={name} pending={status === "pending"} />
        )}
      </div>
      <figcaption className="border-t border-border/60 px-4 py-3">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-sm font-medium text-foreground">{name}</h3>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            {kind}
          </span>
        </div>
        <p className="mt-1 text-sm text-pretty text-muted-foreground">
          {description}
        </p>
      </figcaption>
    </figure>
  );
}

function PlaceholderFrame({
  id,
  name,
  pending,
}: {
  id: string;
  name: string;
  pending: boolean;
}) {
  return (
    <div
      role="img"
      aria-label={
        pending
          ? `${name} preview loading`
          : `${name} — ${proCopy.placeholderLabel}`
      }
      className="flex size-full flex-col justify-between bg-[radial-gradient(ellipse_at_20%_0%,color-mix(in_oklch,var(--kp-accent)_16%,transparent),transparent_55%),linear-gradient(165deg,color-mix(in_oklch,var(--kp-muted)_55%,transparent),color-mix(in_oklch,var(--kp-background)_80%,transparent))] p-4"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
          {pending ? "Loading" : proCopy.placeholderLabel}
        </span>
        <span className="rounded-[var(--kp-radius-sm)] border border-border/60 bg-background/50 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
          {id}.png
        </span>
      </div>
      <div className="space-y-2">
        <div className="h-2 w-1/3 rounded-full bg-[color-mix(in_oklch,var(--kp-foreground)_12%,transparent)]" />
        <div className="h-2 w-2/3 rounded-full bg-[color-mix(in_oklch,var(--kp-foreground)_8%,transparent)]" />
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="h-14 rounded-[var(--kp-radius-md)] border border-border/50 bg-[color-mix(in_oklch,var(--kp-background)_70%,transparent)]" />
          <div className="h-14 rounded-[var(--kp-radius-md)] border border-border/50 bg-[color-mix(in_oklch,var(--kp-background)_70%,transparent)]" />
          <div className="h-14 rounded-[var(--kp-radius-md)] border border-border/50 bg-[color-mix(in_oklch,var(--kp-background)_70%,transparent)]" />
        </div>
      </div>
      <p className="font-mono text-[11px] text-muted-foreground">{name}</p>
    </div>
  );
}
