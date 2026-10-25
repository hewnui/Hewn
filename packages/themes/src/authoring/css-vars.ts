import { formatOklch } from "./oklch";
import { colorEntries, structuralEntries } from "./token-entries";
import type { ResolvedMode } from "./types";

const COLOR_BRIDGE = [
  "background",
  "foreground",
  "surface",
  "surface-raised",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "border",
  "ring",
  "danger",
  "danger-foreground",
  "danger-subtle",
  "danger-border",
  "success",
  "success-foreground",
  "success-subtle",
  "success-border",
  "warning",
  "warning-foreground",
  "warning-subtle",
  "warning-border",
  "info",
  "info-foreground",
  "info-subtle",
  "info-border",
] as const;

/**
 * Map a resolved mode to CSS custom properties for scoped live preview.
 * Includes Tailwind `--color-*` rebinds so utilities do not keep :root-resolved
 * docs-shell values, plus local glass vars so html[data-material=glass] rules
 * sample the draft pack instead of the documentation theme.
 */
export function modeToCssVars(mode: ResolvedMode): Record<string, string> {
  const vars: Record<string, string> = {};
  for (const entry of colorEntries(mode)) {
    vars[`--kp-${entry.name}`] = entry.value;
  }
  for (const entry of structuralEntries(mode)) {
    vars[`--kp-${entry.name}`] = entry.value;
  }
  vars["--kp-font-sans"] =
    'var(--font-plex-sans, "IBM Plex Sans"), ui-sans-serif, system-ui, sans-serif';
  vars["--kp-font-mono"] =
    'var(--font-plex-mono, "IBM Plex Mono"), ui-monospace, monospace';
  vars["--kp-font-display"] =
    'var(--font-space-grotesk, "Space Grotesk"), var(--kp-font-sans)';
  vars["--kp-shadow-surface"] =
    `0 1px 2px color-mix(in oklch, ${formatOklch(mode.foreground)} 8%, transparent), ` +
    `0 16px 40px -28px color-mix(in oklch, ${formatOklch(mode.foreground)} 28%, transparent)`;

  // Recompute glass locally so inherited html glass fills cannot leak docs tint.
  vars["--kp-glass-fill"] =
    "color-mix(in oklch, var(--kp-surface) 46%, transparent)";
  vars["--kp-glass-border"] =
    "color-mix(in oklch, var(--kp-foreground) 16%, transparent)";
  vars["--kp-glass-sheen"] =
    "linear-gradient(148deg, color-mix(in oklch, var(--kp-glass-tint) 70%, white 8%), " +
    "color-mix(in oklch, var(--kp-surface) 22%, transparent) 42%, " +
    "color-mix(in oklch, var(--kp-surface) 38%, transparent))";

  for (const name of COLOR_BRIDGE) {
    vars[`--color-${name}`] = `var(--kp-${name})`;
  }
  // Fumadocs tokens occasionally paint nested chrome; keep them on the draft.
  vars["--color-fd-background"] = "var(--kp-background)";
  vars["--color-fd-foreground"] = "var(--kp-foreground)";
  vars["--color-fd-card"] = "var(--kp-surface)";
  vars["--color-fd-card-foreground"] = "var(--kp-foreground)";
  vars["--color-fd-muted"] = "var(--kp-muted)";
  vars["--color-fd-muted-foreground"] = "var(--kp-muted-foreground)";
  vars["--color-fd-primary"] = "var(--kp-accent)";
  vars["--color-fd-primary-foreground"] = "var(--kp-accent-foreground)";
  vars["--color-fd-border"] = "var(--kp-border)";
  vars["--color-fd-ring"] = "var(--kp-ring)";

  return vars;
}

/** Stylesheet block for a live-preview selector (no :root). */
export function modeToPreviewCss(selector: string, mode: ResolvedMode): string {
  const lines = Object.entries(modeToCssVars(mode)).map(
    ([name, value]) => `  ${name}: ${value};`,
  );
  return `${selector} {\n${lines.join("\n")}\n}\n`;
}
