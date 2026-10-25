"use client";

import {
  derivePack,
  exportFigmaVariables,
  exportPackCss,
  exportStyleDictionary,
  exportTailwindTheme,
  getThemeExportFormat,
  modeToCssVars,
  modeToPreviewCss,
  supportedModes,
  type BasePackId,
  type RadiusPreset,
  type ResolvedPack,
} from "@hewnui/themes/authoring";
import { useEffect, useMemo, useState } from "react";
import { StudioDashboard } from "./studio-dashboard";
import { StudioDock } from "./studio-dock";
import type { FreeExportFormat } from "./studio-free-exports";
import type { ProExportFormat } from "./studio-pro-exports";
import {
  DEFAULT_ACCENT,
  DEFAULT_PRO,
  DEFAULTS,
  PACK_ID,
  STYLE_ID,
  STORAGE_KEY,
  downloadCss,
  downloadText,
  loadStored,
  toOverrideMap,
} from "./studio-storage";

function exportFree(format: FreeExportFormat, pack: ResolvedPack) {
  const entry = getThemeExportFormat(format);
  downloadText(entry.filename(pack.id), entry.render(pack), entry.mime);
}

function exportPro(format: ProExportFormat, pack: ResolvedPack) {
  if (format === "theme") {
    downloadText(
      `${pack.id}.theme.css`,
      exportTailwindTheme(pack),
      "text/css;charset=utf-8",
    );
    return;
  }
  if (format === "style-dictionary") {
    downloadText(
      `${pack.id}.tokens.json`,
      exportStyleDictionary(pack),
      "application/json",
    );
    return;
  }
  downloadText(
    `${pack.id}.figma.json`,
    exportFigmaVariables(pack),
    "application/json",
  );
}

export function ThemeStudio() {
  const [basePackId, setBasePackId] = useState<BasePackId>(DEFAULTS.basePackId);
  const [accentSeed, setAccentSeed] = useState(DEFAULT_ACCENT);
  const [radiusPreset, setRadiusPreset] = useState<RadiusPreset>("soft");
  const [pro, setPro] = useState(DEFAULT_PRO);
  const [previewMode, setPreviewMode] = useState<"light" | "dark">("light");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = loadStored();
    setBasePackId(stored.free.basePackId);
    setAccentSeed(stored.free.accentSeed ?? DEFAULT_ACCENT);
    setRadiusPreset(stored.free.radiusPreset ?? "soft");
    setPro(stored.pro);
    setPreviewMode(supportedModes(stored.free.basePackId)[0] ?? "light");
    setHydrated(true);
  }, []);

  const overrideMap = useMemo(
    () => toOverrideMap(basePackId, accentSeed, radiusPreset, pro),
    [accentSeed, basePackId, pro, radiusPreset],
  );

  const derived = useMemo(() => derivePack(overrideMap), [overrideMap]);

  useEffect(() => {
    if (!hydrated || !derived.ok) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(overrideMap));
  }, [derived.ok, hydrated, overrideMap]);

  useEffect(() => {
    const modes = supportedModes(basePackId);
    if (!modes.includes(previewMode)) {
      setPreviewMode(modes[0] ?? "light");
    }
  }, [basePackId, previewMode]);

  const previewModeResolved = useMemo(() => {
    if (!derived.ok) return null;
    const mode = derived.pack.modes[previewMode]
      ? previewMode
      : derived.pack.supportedModes[0]!;
    const resolved = derived.pack.modes[mode];
    if (!resolved) return null;
    return { mode, resolved };
  }, [derived, previewMode]);

  useEffect(() => {
    if (!previewModeResolved) return;
    let style = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
    if (!style) {
      style = document.createElement("style");
      style.id = STYLE_ID;
      document.head.appendChild(style);
    }
    style.textContent = modeToPreviewCss(
      "[data-studio-specimen]",
      previewModeResolved.resolved,
    );
  }, [previewModeResolved]);

  useEffect(() => {
    return () => {
      document.getElementById(STYLE_ID)?.remove();
    };
  }, []);

  if (!derived.ok) {
    return (
      <p className="not-prose text-sm text-muted-foreground">
        {derived.errors.join(" · ")}
      </p>
    );
  }

  if (!previewModeResolved) {
    return (
      <p className="not-prose text-sm text-muted-foreground">
        No tokens for mode {previewMode}.
      </p>
    );
  }

  const { mode, resolved } = previewModeResolved;
  const previewKey = `${basePackId}-${accentSeed}-${radiusPreset}-${mode}`;
  const cssVars = modeToCssVars(resolved);

  const dockProps = {
    basePackId,
    accentSeed,
    radiusPreset,
    previewMode: mode,
    adjustments: derived.pack.adjustments,
    pro,
    onBasePack: setBasePackId,
    onAccent: setAccentSeed,
    onRadius: setRadiusPreset,
    onPreviewMode: setPreviewMode,
    onProChange: setPro,
    onAiApply: ({
      basePackId: nextPack,
      accentSeed: nextAccent,
      radiusPreset: nextRadius,
    }: {
      basePackId: BasePackId;
      accentSeed: string;
      radiusPreset: RadiusPreset;
    }) => {
      setBasePackId(nextPack);
      setAccentSeed(nextAccent);
      setRadiusPreset(nextRadius);
      setPreviewMode(supportedModes(nextPack)[0] ?? "light");
    },
    onDownloadCss: () =>
      downloadCss(`${PACK_ID}.css`, exportPackCss(derived.pack)),
    onReset: () => {
      setBasePackId(DEFAULTS.basePackId);
      setAccentSeed(DEFAULT_ACCENT);
      setRadiusPreset("soft");
      setPro(DEFAULT_PRO);
      setPreviewMode("light");
    },
    onFreeExport: (format: FreeExportFormat) =>
      exportFree(format, derived.pack),
    onProExport: (format: ProExportFormat) => exportPro(format, derived.pack),
  };

  return (
    <div className="not-prose relative my-6 space-y-2 pb-20">
      <StudioDashboard
        basePackId={basePackId}
        radiusPreset={radiusPreset}
        mode={mode}
        label={`${basePackId} · ${mode} · ${radiusPreset}`}
        previewKey={previewKey}
        cssVars={cssVars}
      />
      <StudioDock {...dockProps} />
    </div>
  );
}
