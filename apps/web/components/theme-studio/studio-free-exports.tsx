"use client";

import {
  THEME_EXPORT_FORMATS,
  type ThemeExportFormatId,
} from "@hewnui/themes/authoring";

export type FreeExportFormat = ThemeExportFormatId;

export function StudioFreeExports({
  onExport,
}: {
  onExport: (format: FreeExportFormat) => void;
}) {
  return (
    <section className="space-y-3" aria-label="Free theme exports">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
          Theme exports
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          DESIGN.md, DTCG tokens, Tailwind `@theme`, and an agent skill for this
          draft.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {THEME_EXPORT_FORMATS.map((format) => (
          <button
            key={format.id}
            type="button"
            onClick={() => onExport(format.id)}
            aria-label={`Download ${format.label}`}
            className="min-h-10 rounded-[var(--kp-radius-md)] border border-border bg-surface px-3 text-sm text-foreground transition-[transform,border-color] duration-150 active:scale-[0.96]"
          >
            {format.label}
          </button>
        ))}
      </div>
    </section>
  );
}
