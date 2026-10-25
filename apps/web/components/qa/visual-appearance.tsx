"use client";

import {
  themePacks,
  useMaterial,
  useMotionMode,
  useRadius,
  useTheme,
  type ThemeMode,
  type ThemeName,
} from "@hewnui/ui";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

function isTheme(value: string | null): value is ThemeName {
  return Boolean(value && value in themePacks);
}

function isMode(value: string | null): value is ThemeMode {
  return value === "light" || value === "dark";
}

/**
 * Applies ?theme=&mode= for manual QA visits. Playwright prefers localStorage
 * via addInitScript so the anti-FOUC head script paints the correct pack first.
 */
export function VisualAppearance() {
  const params = useSearchParams();
  const { setTheme, setMode } = useTheme();
  const { setMaterial } = useMaterial();
  const { setRadius } = useRadius();
  const { setMotion } = useMotionMode();

  useEffect(() => {
    const themeParam = params.get("theme");
    const modeParam = params.get("mode");
    if (isTheme(themeParam)) setTheme(themeParam);
    if (isMode(modeParam)) setMode(modeParam);
    setMaterial("solid");
    setRadius("soft");
    setMotion("off");
  }, [params, setMaterial, setMode, setMotion, setRadius, setTheme]);

  return null;
}
