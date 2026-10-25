"use client";

import {
  BASE_PACK_IDS,
  curatedResolvedPack,
  THEME_EXPORT_FORMATS,
  themeExportPublicPath,
  type BasePackId,
  type ThemeExportFormat,
} from "@hewnui/themes/authoring";
import { useTheme, type ThemeName } from "@hewnui/ui";
import { CheckIcon, CopyIcon, DownloadSimpleIcon } from "@phosphor-icons/react";
import { useMemo, useState } from "react";
import { downloadText } from "@/lib/download-text";

function useCopyFeedback() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  return {
    copiedId,
    copy: async (id: string, value: string) => {
      try {
        await navigator.clipboard?.writeText(value);
        setCopiedId(id);
        window.setTimeout(() => {
          setCopiedId((current) => (current === id ? null : current));
        }, 1600);
      } catch {
        setCopiedId(null);
      }
    },
  };
}

function FormatRow({
  format,
  packId,
  copied,
  onCopy,
  onDownload,
}: {
  format: ThemeExportFormat;
  packId: string;
  copied: boolean;
  onCopy: () => void;
  onDownload: () => void;
}) {
  const staticPath = themeExportPublicPath(packId, format.id);

  return (
    <li className="flex flex-col gap-3 rounded-[var(--kp-radius-md)] border border-border bg-background/60 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground">{format.label}</p>
        <p className="mt-1 text-sm text-pretty text-muted-foreground">
          {format.description}
        </p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
          {staticPath}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onDownload}
          aria-label={`Download ${format.label} for ${packId}`}
          className="inline-flex min-h-10 items-center gap-2 rounded-[var(--kp-radius-md)] bg-accent px-3 text-sm font-medium text-accent-foreground transition-[transform,background-color] duration-150 active:scale-[0.96]"
        >
          <DownloadSimpleIcon aria-hidden className="size-4" weight="bold" />
          Download
        </button>
        <button
          type="button"
          onClick={onCopy}
          aria-label={`Copy ${format.label} for ${packId}`}
          aria-pressed={copied}
          className="inline-flex min-h-10 items-center gap-2 rounded-[var(--kp-radius-md)] border border-border bg-surface px-3 text-sm text-foreground transition-[transform,border-color] duration-150 active:scale-[0.96]"
        >
          {copied ? (
            <CheckIcon aria-hidden className="size-4 text-accent" weight="bold" />
          ) : (
            <CopyIcon aria-hidden className="size-4" />
          )}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <span className="sr-only" aria-live="polite">
        {copied ? `${format.label} copied` : ""}
      </span>
    </li>
  );
}

function isBasePackId(theme: ThemeName): theme is BasePackId {
  return (BASE_PACK_IDS as readonly string[]).includes(theme);
}

export function ThemeLabExports() {
  const { theme } = useTheme();
  const { copiedId, copy } = useCopyFeedback();

  const pack = useMemo(() => {
    if (!isBasePackId(theme)) return null;
    try {
      return curatedResolvedPack(theme);
    } catch {
      return null;
    }
  }, [theme]);

  if (!pack) return null;

  return (
    <section
      data-kp-surface
      aria-labelledby="theme-lab-exports-heading"
      className="rounded-[calc(var(--kp-radius-lg)+0.35rem)] border bg-surface px-4 py-4 shadow-[var(--kp-shadow-surface)] md:px-5"
    >
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Free exports
          </p>
          <h3
            id="theme-lab-exports-heading"
            className="mt-1 text-lg font-semibold tracking-tight capitalize text-balance"
          >
            Export {pack.id}
          </h3>
          <p className="mt-1 max-w-[52ch] text-sm text-pretty text-muted-foreground">
            Download or copy DESIGN.md, DTCG tokens, Tailwind v4 @theme, and an
            agent skill for the active curated pack.
          </p>
        </div>
      </div>

      <ul className="mt-4 space-y-3">
        {THEME_EXPORT_FORMATS.map((format) => {
          const contents = format.render(pack);
          return (
            <FormatRow
              key={format.id}
              format={format}
              packId={pack.id}
              copied={copiedId === format.id}
              onCopy={() => void copy(format.id, contents)}
              onDownload={() =>
                downloadText(
                  format.filename(pack.id),
                  contents,
                  format.mime,
                )
              }
            />
          );
        })}
      </ul>
    </section>
  );
}
