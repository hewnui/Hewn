"use client";

import { ThemeLabSection } from "./section";

const swatches = [
  { label: "Background", surface: "bg-background" },
  { label: "Surface", surface: "bg-surface" },
  { label: "Raised", surface: "bg-surface-raised" },
  { label: "Muted", surface: "bg-muted" },
  { label: "Accent", surface: "bg-accent" },
  { label: "Danger", surface: "bg-danger" },
  { label: "Success", surface: "bg-success" },
  { label: "Warning", surface: "bg-warning" },
  { label: "Info", surface: "bg-info" },
] as const;

export function ThemeLabFoundation() {
  return (
    <div className="space-y-6">
      <ThemeLabSection
        title="Semantic colors"
        description="Each swatch uses theme tokens — switch packs in the sidebar to compare identity, not just hue."
      >
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-9">
          {swatches.map(({ label, surface }) => (
            <li key={label} className="min-w-0">
              <div
                className={`h-14 rounded-[var(--kp-radius-md)] border border-border shadow-[inset_0_1px_0_oklch(1_0_0/8%)] ${surface}`}
              />
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                {label}
              </p>
            </li>
          ))}
        </ul>
      </ThemeLabSection>

      <ThemeLabSection
        title="Typography"
        description="Hierarchy and numerals — body uses pretty wrapping; metrics stay tabular."
      >
        <div className="grid gap-5 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div className="space-y-3">
            <p className="text-lg font-semibold tracking-tight text-balance text-foreground">
              Operational dashboard headline
            </p>
            <p className="max-w-[52ch] text-sm leading-relaxed text-pretty text-muted-foreground">
              Dense product copy stays readable when neutrals and accent contrast
              are derived from the same pack ramp.
            </p>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
              Mono label · workspace
            </p>
          </div>
          <dl className="divide-y divide-border rounded-[var(--kp-radius-md)] border border-border bg-surface">
            <div className="flex items-baseline justify-between gap-3 px-4 py-3">
              <dt className="text-sm text-muted-foreground">Active seats</dt>
              <dd className="font-mono text-lg font-medium tabular-nums text-foreground">
                2,847
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-3 px-4 py-3">
              <dt className="text-sm text-muted-foreground">Uptime</dt>
              <dd className="font-mono text-lg font-medium tabular-nums text-foreground">
                99.97%
              </dd>
            </div>
          </dl>
        </div>
      </ThemeLabSection>

      <ThemeLabSection
        title="Surface stack"
        description="Layered elevation reads through border, shadow, and radius tokens together."
      >
        <div className="grid gap-3 md:grid-cols-3">
          {[
            { label: "Base", className: "bg-background" },
            { label: "Surface", className: "bg-surface shadow-[var(--kp-shadow-surface)]" },
            {
              label: "Raised",
              className:
                "bg-surface-raised shadow-[var(--kp-shadow-surface)]",
            },
          ].map(({ label, className }) => (
            <div
              key={label}
              className={`rounded-[var(--kp-radius-lg)] border border-border p-4 ${className}`}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                {label}
              </p>
              <p className="mt-2 text-sm text-foreground">
                Panel content on {label.toLowerCase()}.
              </p>
            </div>
          ))}
        </div>
      </ThemeLabSection>
    </div>
  );
}
