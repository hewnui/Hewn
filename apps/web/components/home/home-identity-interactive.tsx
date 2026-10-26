"use client";

import { themeBlurbs } from "@/components/home/content";
import {
  supportedModesFor,
  themePacks,
  useTheme,
  type ThemeName,
} from "@hewnui/ui";
import type { ReactNode } from "react";

const themeNames = Object.keys(themePacks) as ThemeName[];

export function HomeIdentityInteractive() {
  const { theme, setTheme } = useTheme();
  const blurb = themeBlurbs[theme] ?? {
    title: "Forest",
    line: "Grounded greens for product work that needs calm confidence.",
  };

  return (
    <div
      data-kp-surface
      className="rounded-[calc(var(--kp-radius-lg)+0.75rem)] border p-6 shadow-[var(--kp-shadow-surface)] md:p-8"
    >
      <div className="flex flex-wrap gap-2">
        {themeNames.map((name) => (
          <button
            key={name}
            type="button"
            aria-pressed={theme === name}
            onClick={() => setTheme(name)}
            className="inline-flex min-h-10 items-center gap-2 rounded-[var(--kp-radius-md)] border px-3 text-sm capitalize transition-[transform,background-color,border-color] hover:bg-muted/50 active:scale-[0.96] aria-pressed:border-accent aria-pressed:bg-accent/10"
          >
            <span
              aria-hidden
              data-theme={name}
              data-mode={name === "ember" ? "dark" : "light"}
              className="size-3.5 rounded-full bg-accent shadow-[inset_0_1px_0_oklch(1_0_0/35%)]"
            />
            {name}
          </button>
        ))}
      </div>
      <div className="mt-8 border-t pt-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xl font-semibold tracking-tight">{blurb.title}</p>
            <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-muted-foreground">
              {blurb.line}
            </p>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            Modes · {supportedModesFor(theme).join(" / ")}
          </p>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <TokenCard
            label="Surface"
            hint="Panels & chrome"
            className="bg-surface"
          >
            <span className="text-sm font-medium tracking-tight">
              Raised panel
            </span>
            <span className="mt-1 font-mono text-[11px] tabular-nums text-muted-foreground">
              --kp-surface
            </span>
          </TokenCard>
          <TokenCard
            label="Accent"
            hint="Action & focus"
            className="border-accent/40 bg-[var(--kp-accent)] text-[var(--kp-accent-foreground)]"
            frosted={false}
          >
            <span className="text-sm font-medium tracking-tight">
              Primary action
            </span>
            <span className="mt-1 font-mono text-[11px] tabular-nums text-[var(--kp-accent-foreground)]/75">
              --kp-accent
            </span>
          </TokenCard>
          <TokenCard
            label="Muted"
            hint="Quiet structure"
            className="border-dashed bg-muted/55"
          >
            <span className="text-sm font-medium tracking-tight">
              Supporting layer
            </span>
            <span className="mt-1 font-mono text-[11px] tabular-nums text-muted-foreground">
              --kp-muted
            </span>
          </TokenCard>
        </div>
      </div>
    </div>
  );
}

function TokenCard({
  label,
  hint,
  className,
  children,
  frosted = true,
}: {
  label: string;
  hint: string;
  className: string;
  children: ReactNode;
  frosted?: boolean;
}) {
  return (
    <div
      {...(frosted ? { "data-kp-surface": true } : {})}
      className={`flex min-h-[7.5rem] flex-col justify-between rounded-[var(--kp-radius-md)] border p-3 shadow-[var(--kp-shadow-surface)] ${className}`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-medium uppercase tracking-[0.12em] opacity-85">
          {label}
        </span>
        <span className="text-[11px] opacity-75">{hint}</span>
      </div>
      <div className="flex flex-col">{children}</div>
    </div>
  );
}
