import {
  COLOR_ROLES,
  DESIGN_DO,
  DESIGN_DONT,
  PACK_IDENTITY,
} from "./pack-meta";
import { formatOklch } from "./oklch";
import {
  colorEntries,
  modeOrder,
  primaryMode,
  structuralEntries,
} from "./token-entries";
import type { BasePackId, ResolvedPack } from "./types";

function identity(pack: ResolvedPack) {
  const meta = PACK_IDENTITY[pack.basePackId as BasePackId];
  return meta ?? { label: pack.id, summary: `Custom pack based on ${pack.basePackId}.` };
}

function paletteTable(pack: ResolvedPack): string {
  const modes = modeOrder(pack);
  const header =
    modes.length > 1
      ? `| Token | Role | ${modes.map((m) => m).join(" | ")} |`
      : `| Token | Role | ${modes[0]} |`;
  const sep =
    modes.length > 1
      ? `|---|---|${modes.map(() => "---").join("|")}|`
      : `|---|---|---|`;

  const primary = primaryMode(pack);
  const rows = colorEntries(primary).map((entry) => {
    const role = COLOR_ROLES[entry.name] ?? entry.name;
    const values = modes.map((modeName) => {
      const mode = pack.modes[modeName];
      if (!mode) return "—";
      const match = colorEntries(mode).find((e) => e.name === entry.name);
      return match ? `\`${match.value}\`` : "—";
    });
    return `| \`${entry.name}\` | ${role} | ${values.join(" | ")} |`;
  });

  return [header, sep, ...rows].join("\n");
}

function structuralBlock(pack: ResolvedPack): string {
  const mode = primaryMode(pack);
  return structuralEntries(mode)
    .map((entry) => `- \`${entry.name}\`: \`${entry.value}\``)
    .join("\n");
}

function list(items: readonly string[]): string {
  return items.map((item) => `- ${item}`).join("\n");
}

/** Free — human- and AI-readable design brief for one pack. */
export function exportDesignMd(pack: ResolvedPack): string {
  const { label, summary } = identity(pack);
  const modes = modeOrder(pack).join(", ");
  const mode = primaryMode(pack);

  return `# ${label} — Design brief

> Generated from Hewn curated theme packs. Semantic OKLCH tokens; do not edit by hand.

## Identity

${summary}

- **Pack id:** \`${pack.id}\`
- **Base pack:** \`${pack.basePackId}\`
- **Supported modes:** ${modes}
- **Color scheme (primary):** ${mode.colorScheme}

## Palette

${paletteTable(pack)}

## Typography

| Role | Stack | Usage |
|---|---|---|
| Sans | IBM Plex Sans, ui-sans-serif, system-ui | UI chrome, body, headings |
| Mono | IBM Plex Mono, ui-monospace | Labels, code, tabular metrics |
| Display | Space Grotesk → sans | Marketing hero H1 and brand wordmark ≥18px only |

Body text uses pretty wrapping; headings use balanced wrapping; dynamic numbers use \`tabular-nums\`.

## Radius & density

${structuralBlock(pack)}

Density scales control spacing rhythm. Panel radius (\`radius-panel\`) caps menus and dialogs so they never go full-pill.

## Motion

- Duration: \`${mode.motionDuration}\`
- Spring stiffness: \`${mode.motionStiffness}\`
- Spring damping: \`${mode.motionDamping}\`
- Reduced motion always wins over global motion toggles.
- Prefer transform / opacity / filter; never animate layout properties continuously.

## Material

- \`solid\` — structured product surfaces and separators
- \`glass\` — accent-tinted frosted surfaces (blur, saturation, refraction, opaque fallback)

## Do

${list(DESIGN_DO)}

## Don't

${list(DESIGN_DONT)}

## Token reference (primary mode)

\`\`\`
${colorEntries(mode)
  .map((e) => `--kp-${e.name}: ${e.value};`)
  .join("\n")}
${structuralEntries(mode)
  .map((e) => `--kp-${e.name}: ${e.value};`)
  .join("\n")}
\`\`\`
`;
}

/** Convenience — expose formatted OKLCH for tests/docs samples. */
export function sampleAccent(pack: ResolvedPack): string {
  return formatOklch(primaryMode(pack).accent);
}
