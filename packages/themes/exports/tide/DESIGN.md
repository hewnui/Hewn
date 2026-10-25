# Tide — Design brief

> Generated from Hewn curated theme packs. Semantic OKLCH tokens; do not edit by hand.

## Identity

Mineral neutrals and desaturated teal.

- **Pack id:** `tide`
- **Base pack:** `tide`
- **Supported modes:** light, dark
- **Color scheme (primary):** light

## Palette

| Token | Role | light | dark |
|---|---|---|---|
| `background` | Page and app canvas | `oklch(0.97 0.01 220)` | `oklch(0.18 0.02 230)` |
| `foreground` | Primary text and icons | `oklch(0.24 0.03 230)` | `oklch(0.92 0.015 220)` |
| `surface` | Cards, panels, and elevated chrome | `oklch(0.995 0.004 220)` | `oklch(0.22 0.025 230)` |
| `surface-raised` | Overlays and nested elevation | `oklch(1 0 0)` | `oklch(0.26 0.028 230)` |
| `muted` | Subtle fills and disabled wells | `oklch(0.93 0.015 220)` | `oklch(0.28 0.025 230)` |
| `muted-foreground` | Secondary text and captions | `oklch(0.48 0.03 230)` | `oklch(0.72 0.025 220)` |
| `accent` | Primary actions and focus accents | `oklch(0.52 0.07 210)` | `oklch(0.72 0.08 205)` |
| `accent-foreground` | Text/icons on accent | `oklch(0.98 0.01 210)` | `oklch(0.985 0.01 220)` |
| `border` | Separators and control outlines | `oklch(0.35 0.03 230 / 14%)` | `oklch(0.86 0.02 220 / 13%)` |
| `ring` | Focus ring | `oklch(0.58 0.08 210)` | `oklch(0.72 0.08 205)` |
| `danger` | Destructive and error states | `oklch(0.56 0.17 27)` | `oklch(0.68 0.16 27)` |
| `danger-foreground` | danger-foreground | `oklch(0.985 0.01 27)` | `oklch(0.985 0.01 27)` |
| `danger-subtle` | danger-subtle | `oklch(0.94 0.035 27)` | `oklch(0.32 0.05 27)` |
| `danger-border` | danger-border | `oklch(0.56 0.12 27 / 40%)` | `oklch(0.72 0.1 27 / 40%)` |
| `success` | success | `oklch(0.55 0.15 165)` | `oklch(0.71 0.14 165)` |
| `success-foreground` | success-foreground | `oklch(0.985 0.01 165)` | `oklch(0.985 0.01 165)` |
| `success-subtle` | success-subtle | `oklch(0.94 0.035 165)` | `oklch(0.32 0.045 165)` |
| `success-border` | success-border | `oklch(0.55 0.12 165 / 40%)` | `oklch(0.72 0.1 165 / 40%)` |
| `warning` | warning | `oklch(0.75 0.14 75)` | `oklch(0.78 0.12 75)` |
| `warning-foreground` | warning-foreground | `oklch(0.25 0.05 75)` | `oklch(0.22 0.04 75)` |
| `warning-subtle` | warning-subtle | `oklch(0.94 0.04 75)` | `oklch(0.34 0.04 75)` |
| `warning-border` | warning-border | `oklch(0.72 0.12 75 / 40%)` | `oklch(0.78 0.1 75 / 40%)` |
| `info` | info | `oklch(0.52 0.11 230)` | `oklch(0.72 0.1 230)` |
| `info-foreground` | info-foreground | `oklch(0.985 0.01 230)` | `oklch(0.985 0.01 230)` |
| `info-subtle` | info-subtle | `oklch(0.94 0.03 230)` | `oklch(0.32 0.035 230)` |
| `info-border` | info-border | `oklch(0.52 0.09 230 / 40%)` | `oklch(0.72 0.08 230 / 40%)` |
| `glass-tint` | Tinted frosted glass material | `oklch(0.72 0.08 210 / 28%)` | `oklch(0.6 0.09 205 / 24%)` |

## Typography

| Role | Stack | Usage |
|---|---|---|
| Sans | IBM Plex Sans, ui-sans-serif, system-ui | UI chrome, body, headings |
| Mono | IBM Plex Mono, ui-monospace | Labels, code, tabular metrics |
| Display | Space Grotesk → sans | Marketing hero H1 and brand wordmark ≥18px only |

Body text uses pretty wrapping; headings use balanced wrapping; dynamic numbers use `tabular-nums`.

## Radius & density

- `radius-sm`: `0.45rem`
- `radius-md`: `0.7rem`
- `radius-lg`: `0.95rem`
- `radius-panel`: `0.95rem`
- `density`: `1`
- `motion-duration`: `240ms`
- `motion-stiffness`: `380`
- `motion-damping`: `30`

Density scales control spacing rhythm. Panel radius (`radius-panel`) caps menus and dialogs so they never go full-pill.

## Motion

- Duration: `240ms`
- Spring stiffness: `380`
- Spring damping: `30`
- Reduced motion always wins over global motion toggles.
- Prefer transform / opacity / filter; never animate layout properties continuously.

## Material

- `solid` — structured product surfaces and separators
- `glass` — accent-tinted frosted surfaces (blur, saturation, refraction, opaque fallback)

## Do

- Use semantic OKLCH tokens (`--kp-*` / `--color-*`); never hard-code theme hues.
- Typography: IBM Plex Sans (UI), IBM Plex Mono (code/labels), Space Grotesk only for marketing hero H1 and brand wordmark ≥18px.
- Icons: Phosphor. Interactive hit targets ≥40×40px; press feedback `scale(0.96)`.
- Motion: animate transform, opacity, and filter; reduced motion always wins.
- Radius: concentric scale; panels use `--kp-radius-panel` (never full-pill menus/dialogs).
- Glass is a global material — tint, blur, saturation, refraction edge, opaque fallback.

## Don't

- No purple/lila defaults, neon glow, pure black, Inter, emoji, or generic centered heroes.
- Never `transition: all` — list exact properties.
- Never `h-screen` for full-height sections — use `min-h-[100dvh]`.
- No per-component `glass` prop; material is global.
- Do not invent unsupported light/dark combinations for a pack.
- Do not put Space Grotesk in UI chrome, forms, or dense product copy.

## Token reference (primary mode)

```
--kp-background: oklch(0.97 0.01 220);
--kp-foreground: oklch(0.24 0.03 230);
--kp-surface: oklch(0.995 0.004 220);
--kp-surface-raised: oklch(1 0 0);
--kp-muted: oklch(0.93 0.015 220);
--kp-muted-foreground: oklch(0.48 0.03 230);
--kp-accent: oklch(0.52 0.07 210);
--kp-accent-foreground: oklch(0.98 0.01 210);
--kp-border: oklch(0.35 0.03 230 / 14%);
--kp-ring: oklch(0.58 0.08 210);
--kp-danger: oklch(0.56 0.17 27);
--kp-danger-foreground: oklch(0.985 0.01 27);
--kp-danger-subtle: oklch(0.94 0.035 27);
--kp-danger-border: oklch(0.56 0.12 27 / 40%);
--kp-success: oklch(0.55 0.15 165);
--kp-success-foreground: oklch(0.985 0.01 165);
--kp-success-subtle: oklch(0.94 0.035 165);
--kp-success-border: oklch(0.55 0.12 165 / 40%);
--kp-warning: oklch(0.75 0.14 75);
--kp-warning-foreground: oklch(0.25 0.05 75);
--kp-warning-subtle: oklch(0.94 0.04 75);
--kp-warning-border: oklch(0.72 0.12 75 / 40%);
--kp-info: oklch(0.52 0.11 230);
--kp-info-foreground: oklch(0.985 0.01 230);
--kp-info-subtle: oklch(0.94 0.03 230);
--kp-info-border: oklch(0.52 0.09 230 / 40%);
--kp-glass-tint: oklch(0.72 0.08 210 / 28%);
--kp-radius-sm: 0.45rem;
--kp-radius-md: 0.7rem;
--kp-radius-lg: 0.95rem;
--kp-radius-panel: 0.95rem;
--kp-density: 1;
--kp-motion-duration: 240ms;
--kp-motion-stiffness: 380;
--kp-motion-damping: 30;
```
