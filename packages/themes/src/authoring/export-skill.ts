import {
  COLOR_ROLES,
  DESIGN_DO,
  DESIGN_DONT,
  PACK_IDENTITY,
} from "./pack-meta";
import {
  colorEntries,
  modeOrder,
  primaryMode,
  structuralEntries,
} from "./token-entries";
import type { BasePackId, ResolvedPack } from "./types";

function identity(pack: ResolvedPack) {
  return (
    PACK_IDENTITY[pack.basePackId as BasePackId] ?? {
      label: pack.id,
      summary: `Custom pack based on ${pack.basePackId}.`,
    }
  );
}

/**
 * Free — Cursor-style agent skill (SKILL.md) for applying this theme correctly.
 */
export function exportSkillMd(pack: ResolvedPack): string {
  const { label, summary } = identity(pack);
  const modes = modeOrder(pack);
  const mode = primaryMode(pack);
  const skillName = `hewn-${pack.id}-theme`;

  const colorLines = colorEntries(mode)
    .map((e) => `| \`--kp-${e.name}\` / \`--color-${e.name}\` | ${COLOR_ROLES[e.name] ?? e.name} | \`${e.value}\` |`)
    .join("\n");

  const structuralLines = structuralEntries(mode)
    .map((e) => `- \`--kp-${e.name}\`: \`${e.value}\``)
    .join("\n");

  return `---
name: ${skillName}
description: Apply the Hewn ${label} theme tokens, typography, motion, and design rules when building or restyling UI.
---

# ${label} theme (Hewn)

${summary}

Use this skill whenever generating UI that should match the **${label}** pack
(\`${pack.id}\`). Supported modes: **${modes.join(", ")}**.

## Quick rules

${DESIGN_DO.map((item) => `- ${item}`).join("\n")}

## Never

${DESIGN_DONT.map((item) => `- ${item}`).join("\n")}

## How to apply

1. Set \`data-theme="${pack.id}"\` and \`data-mode="{${modes.join("|")}}"\` on a root element (or import the generated \`@theme\` CSS).
2. Prefer semantic utilities / CSS variables (\`bg-background\`, \`text-foreground\`, \`bg-accent\`, \`border-border\`, \`--kp-*\`).
3. Respect reduced motion — disable springs/shimmers when \`prefers-reduced-motion: reduce\`.
4. Keep glass as a global material toggle; do not add per-component glass props.

## Color tokens (primary mode: ${mode.mode})

| Token | Role | Value |
|---|---|---|
${colorLines}

## Structure

${structuralLines}

## Typography

- **Sans:** IBM Plex Sans — UI and body
- **Mono:** IBM Plex Mono — labels, code, metrics (\`tabular-nums\`)
- **Display:** Space Grotesk — hero H1 / brand wordmark ≥18px only

## Export companions

- \`DESIGN.md\` — full design brief
- \`tokens.dtcg.json\` — DTCG (\`$value\` / \`$type\`) with light/dark modes
- \`theme.css\` — Tailwind v4 \`@theme\` block

When unsure, re-read \`DESIGN.md\` for this pack and keep accents within the
curated ramp — do not invent a new hue family.
`;
}
