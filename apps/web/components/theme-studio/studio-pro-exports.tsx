"use client";

import { PRO_AUTHORING_UNLOCKED } from "@hewnui/themes/authoring";

export type ProExportFormat = "theme" | "style-dictionary" | "figma";

/**
 * Advanced exporters remain stub-structured for a future Pro unlock.
 * Tailwind `@theme` is also available free via Theme Lab / free exports;
 * Style Dictionary and Figma stay listed here for later gating.
 */
const FORMATS: Array<{ id: ProExportFormat; label: string }> = [
  { id: "style-dictionary", label: "Style Dictionary" },
  { id: "figma", label: "Figma variables" },
];

export function StudioProExports({
  unlocked = PRO_AUTHORING_UNLOCKED,
  onExport,
}: {
  unlocked?: boolean;
  onExport: (format: ProExportFormat) => void;
}) {
  return (
    <section
      className={[
        "space-y-3 rounded-[var(--kp-radius-md)] border border-border p-4",
        unlocked ? "bg-surface" : "bg-muted/30",
      ].join(" ")}
      aria-disabled={!unlocked}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Advanced exporters
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Style Dictionary JSON and Tokens Studio / Figma. Structured for a
            future unlock — not gated for the free Theme Lab formats above.
          </p>
        </div>
        <span className="shrink-0 rounded-[var(--kp-radius-sm)] border border-border bg-muted px-2 py-1 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
          {unlocked ? "Unlocked" : "Coming soon"}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {FORMATS.map((format) => (
          <button
            key={format.id}
            type="button"
            disabled={!unlocked}
            onClick={() => onExport(format.id)}
            className="min-h-10 rounded-[var(--kp-radius-md)] border border-border bg-surface px-3 text-sm text-foreground transition-[transform,border-color] duration-150 active:scale-[0.96] disabled:opacity-50"
          >
            {format.label}
          </button>
        ))}
      </div>
    </section>
  );
}
