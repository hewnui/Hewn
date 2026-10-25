"use client";

import { StudioFreeExports, type FreeExportFormat } from "./studio-free-exports";
import { StudioProExports, type ProExportFormat } from "./studio-pro-exports";

export function StudioExportPanel({
  onDownloadCss,
  onReset,
  onFreeExport,
  onProExport,
}: {
  onDownloadCss: () => void;
  onReset: () => void;
  onFreeExport: (format: FreeExportFormat) => void;
  onProExport: (format: ProExportFormat) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
          Pack CSS
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Download a drop-in `[data-theme]` CSS pack for your draft theme.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onDownloadCss}
            className="min-h-10 rounded-[var(--kp-radius-md)] bg-accent px-4 text-sm font-medium text-accent-foreground transition-[transform,background-color] duration-150 active:scale-[0.96]"
          >
            Download CSS
          </button>
          <button
            type="button"
            onClick={onReset}
            className="min-h-10 rounded-[var(--kp-radius-md)] border border-border bg-surface px-4 text-sm text-foreground transition-[transform,border-color] duration-150 active:scale-[0.96]"
          >
            Reset draft
          </button>
        </div>
      </div>
      <StudioFreeExports onExport={onFreeExport} />
      <StudioProExports onExport={onProExport} />
    </div>
  );
}
