"use client";

import { useEffect } from "react";
import type { UseCommandPaletteHotkeyOptions } from "./command-palette.types";

function isApplePlatform(): boolean {
  if (typeof navigator === "undefined") return false;
  const platform = navigator.platform || "";
  const ua = navigator.userAgent || "";
  return /Mac|iPhone|iPad|iPod/i.test(platform) || /Mac OS|iPhone|iPad|iPod/i.test(ua);
}

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;
  const tag = target.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  return target.getAttribute("role") === "textbox";
}

/**
 * Optional global ⌘K / Ctrl+K listener for opening a command palette.
 * Platform-aware (meta on Apple, ctrl elsewhere). Skips composing IME events.
 */
export function useCommandPaletteHotkey({
  onOpenChange,
  isEnabled = true,
  key = "k",
  enableOnFormTags = true,
}: UseCommandPaletteHotkeyOptions): void {
  useEffect(() => {
    if (!isEnabled) return;

    const apple = isApplePlatform();
    const letter = key.toLowerCase();

    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.repeat || event.isComposing) return;
      if (event.key.toLowerCase() !== letter) return;

      const modifier = apple ? event.metaKey : event.ctrlKey;
      if (!modifier || event.altKey) return;

      if (!enableOnFormTags && isEditableTarget(event.target)) return;

      event.preventDefault();
      onOpenChange(true);
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [enableOnFormTags, isEnabled, key, onOpenChange]);
}

/** Display string for the platform hotkey (⌘K or Ctrl+K). */
export function commandPaletteHotkeyLabel(key = "k"): string {
  const letter = key.toUpperCase();
  return isApplePlatform() ? `⌘${letter}` : `Ctrl+${letter}`;
}
