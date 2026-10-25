"use client";

import type { BasePackId, RadiusPreset } from "@hewnui/themes/authoring";
import {
  DownloadSimpleIcon,
  MagicWandIcon,
  PaletteIcon,
  SparkleIcon,
} from "@phosphor-icons/react";
import { useRef, useState, type KeyboardEvent } from "react";
import { StudioAi } from "./studio-ai";
import { StudioControls } from "./studio-controls";
import { StudioExportPanel } from "./studio-export-panel";
import type { FreeExportFormat } from "./studio-free-exports";
import { StudioProControls, type ProOverrides } from "./studio-pro-controls";
import type { ProExportFormat } from "./studio-pro-exports";

const TABS = [
  { id: "tokens", label: "Tokens", icon: PaletteIcon },
  { id: "generate", label: "Generate", icon: MagicWandIcon },
  { id: "pro", label: "Pro", icon: SparkleIcon },
  { id: "export", label: "Export", icon: DownloadSimpleIcon },
] as const;

type TabId = (typeof TABS)[number]["id"];

const segmentClass =
  "inline-flex h-10 min-w-10 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-transparent px-2.5 text-xs font-medium text-muted-foreground transition-[transform,background-color,color,box-shadow,border-color] duration-200 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-muted/55 hover:text-foreground active:scale-[0.96]";

export function StudioDockSheet({
  panelId,
  basePackId,
  accentSeed,
  radiusPreset,
  previewMode,
  adjustments,
  pro,
  onBasePack,
  onAccent,
  onRadius,
  onPreviewMode,
  onProChange,
  onAiApply,
  onDownloadCss,
  onReset,
  onFreeExport,
  onProExport,
}: {
  panelId: string;
  basePackId: BasePackId;
  accentSeed: string;
  radiusPreset: RadiusPreset;
  previewMode: "light" | "dark";
  adjustments: string[];
  pro: ProOverrides;
  onBasePack: (id: BasePackId) => void;
  onAccent: (value: string) => void;
  onRadius: (value: RadiusPreset) => void;
  onPreviewMode: (mode: "light" | "dark") => void;
  onProChange: (next: ProOverrides) => void;
  onAiApply: (next: {
    basePackId: BasePackId;
    accentSeed: string;
    radiusPreset: RadiusPreset;
  }) => void;
  onDownloadCss: () => void;
  onReset: () => void;
  onFreeExport: (format: FreeExportFormat) => void;
  onProExport: (format: ProExportFormat) => void;
}) {
  const [tab, setTab] = useState<TabId>("tokens");
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  function onTabKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();

    const current = TABS.findIndex((item) => item.id === tab);
    let nextIndex: number;
    if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = TABS.length - 1;
    } else if (event.key === "ArrowRight") {
      nextIndex = (current + 1) % TABS.length;
    } else {
      nextIndex = (current - 1 + TABS.length) % TABS.length;
    }

    const next = TABS[nextIndex];
    if (!next) return;
    setTab(next.id);
    tabRefs.current[next.id]?.focus();
  }

  return (
    <div
      id={panelId}
      role="group"
      aria-label="Theme Studio authoring"
      className="flex min-h-0 flex-1 flex-col"
    >
      <div
        role="tablist"
        aria-label="Theme Studio sections"
        onKeyDown={onTabKeyDown}
        className="flex shrink-0 items-center gap-1 overflow-x-auto overscroll-x-contain border-b border-border/80 px-1.5 py-1"
      >
        {TABS.map(({ id, label, icon: Icon }) => {
          const selected = tab === id;
          return (
            <button
              key={id}
              ref={(node) => {
                tabRefs.current[id] = node;
              }}
              type="button"
              role="tab"
              id={`${panelId}-tab-${id}`}
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              {...(selected
                ? { "aria-controls": `${panelId}-panel-${id}` }
                : {})}
              onClick={() => setTab(id)}
              className={[
                segmentClass,
                selected
                  ? "border-accent/45 bg-surface-raised text-accent shadow-[var(--kp-shadow-surface)]"
                  : "",
              ].join(" ")}
            >
              <Icon
                className="size-3.5 shrink-0"
                weight={selected ? "bold" : "regular"}
              />
              <span className="hidden sm:inline">{label}</span>
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id={`${panelId}-panel-${tab}`}
        aria-labelledby={`${panelId}-tab-${tab}`}
        tabIndex={0}
        className="min-h-0 flex-1 overflow-y-auto px-3 pb-3 pt-3"
        style={{ maxHeight: "min(42dvh, 22rem)" }}
      >
        {tab === "generate" ? (
          <StudioAi embedded onApply={onAiApply} />
        ) : null}
        {tab === "tokens" ? (
          <StudioControls
            basePackId={basePackId}
            accentSeed={accentSeed}
            radiusPreset={radiusPreset}
            previewMode={previewMode}
            adjustments={adjustments}
            onBasePack={onBasePack}
            onAccent={onAccent}
            onRadius={onRadius}
            onPreviewMode={onPreviewMode}
          />
        ) : null}
        {tab === "pro" ? (
          <StudioProControls value={pro} onChange={onProChange} />
        ) : null}
        {tab === "export" ? (
          <StudioExportPanel
            onDownloadCss={onDownloadCss}
            onReset={onReset}
            onFreeExport={onFreeExport}
            onProExport={onProExport}
          />
        ) : null}
      </div>
    </div>
  );
}
