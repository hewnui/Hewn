# Forest — Design brief

> Generated from Hewn curated theme packs. Semantic OKLCH tokens; do not edit by hand.

## Identity

Moss and emerald; grounded organic product UI.

- **Pack id:** `forest`
- **Base pack:** `forest`
- **Supported modes:** light, dark
- **Color scheme (primary):** light

## Palette

| Token | Role | light | dark |
|---|---|---|---|
| `background` | Page and app canvas | `oklch(0.972 0.012 145)` | `oklch(0.185 0.018 145)` |
| `foreground` | Primary text and icons | `oklch(0.225 0.028 145)` | `oklch(0.93 0.018 145)` |
| `surface` | Cards, panels, and elevated chrome | `oklch(0.995 0.004 145)` | `oklch(0.225 0.024 145)` |
| `surface-raised` | Overlays and nested elevation | `oklch(1 0 0)` | `oklch(0.265 0.028 145)` |
| `muted` | Subtle fills and disabled wells | `oklch(0.925 0.022 145)` | `oklch(0.285 0.026 145)` |
| `muted-foreground` | Secondary text and captions | `oklch(0.49 0.035 145)` | `oklch(0.715 0.03 145)` |
| `accent` | Primary actions and focus accents | `oklch(0.49 0.105 148)` | `oklch(0.71 0.12 148)` |
| `accent-foreground` | Text/icons on accent | `oklch(0.985 0.008 145)` | `oklch(0.985 0.01 145)` |
| `border` | Separators and control outlines | `oklch(0.36 0.035 145 / 14%)` | `oklch(0.86 0.025 145 / 13%)` |
| `ring` | Focus ring | `oklch(0.55 0.12 148)` | `oklch(0.71 0.12 148)` |
| `danger` | Destructive and error states | `oklch(0.56 0.17 27)` | `oklch(0.68 0.16 27)` |
| `danger-foreground` | danger-foreground | `oklch(0.985 0.01 27)` | `oklch(0.985 0.01 27)` |
| `danger-subtle` | danger-subtle | `oklch(0.94 0.035 27)` | `oklch(0.32 0.05 27)` |
| `danger-border` | danger-border | `oklch(0.56 0.12 27 / 40%)` | `oklch(0.72 0.1 27 / 40%)` |
| `success` | success | `oklch(0.55 0.15 148)` | `oklch(0.72 0.14 148)` |
| `success-foreground` | success-foreground | `oklch(0.985 0.01 148)` | `oklch(0.985 0.01 148)` |
| `success-subtle` | success-subtle | `oklch(0.94 0.035 148)` | `oklch(0.32 0.045 148)` |
| `success-border` | success-border | `oklch(0.55 0.12 148 / 40%)` | `oklch(0.72 0.1 148 / 40%)` |
| `warning` | warning | `oklch(0.75 0.14 78)` | `oklch(0.78 0.12 78)` |
| `warning-foreground` | warning-foreground | `oklch(0.25 0.05 78)` | `oklch(0.22 0.04 78)` |
| `warning-subtle` | warning-subtle | `oklch(0.94 0.04 78)` | `oklch(0.34 0.04 78)` |
| `warning-border` | warning-border | `oklch(0.72 0.12 78 / 40%)` | `oklch(0.78 0.1 78 / 40%)` |
| `info` | info | `oklch(0.52 0.11 220)` | `oklch(0.72 0.1 220)` |
| `info-foreground` | info-foreground | `oklch(0.985 0.01 220)` | `oklch(0.985 0.01 220)` |
| `info-subtle` | info-subtle | `oklch(0.94 0.03 220)` | `oklch(0.32 0.035 220)` |
| `info-border` | info-border | `oklch(0.52 0.09 220 / 40%)` | `oklch(0.72 0.08 220 / 40%)` |
| `glass-tint` | Tinted frosted glass material | `oklch(0.72 0.12 148 / 28%)` | `oklch(0.63 0.13 148 / 24%)` |

## Typography

| Role | Stack | Usage |
|---|---|---|
| Sans | IBM Plex Sans, ui-sans-serif, system-ui | UI chrome, body, headings |
| Mono | IBM Plex Mono, ui-monospace | Labels, code, tabular metrics |
| Display | Space Grotesk → sans | Marketing hero H1 and brand wordmark ≥18px only |

Body text uses pretty wrapping; headings use balanced wrapping; dynamic numbers use `tabular-nums`.

## Radius & density

- `radius-sm`: `0.5rem`
- `radius-md`: `0.75rem`
- `radius-lg`: `1rem`
- `radius-panel`: `1rem`
- `density`: `1`
- `motion-duration`: `260ms`
- `motion-stiffness`: `360`
- `motion-damping`: `28`

Density scales control spacing rhythm. Panel radius (`radius-panel`) caps menus and dialogs so they never go full-pill.

## Motion

- Duration: `260ms`
- Spring stiffness: `360`
- Spring damping: `28`
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
--kp-background: oklch(0.972 0.012 145);
--kp-foreground: oklch(0.225 0.028 145);
--kp-surface: oklch(0.995 0.004 145);
--kp-surface-raised: oklch(1 0 0);
--kp-muted: oklch(0.925 0.022 145);
--kp-muted-foreground: oklch(0.49 0.035 145);
--kp-accent: oklch(0.49 0.105 148);
--kp-accent-foreground: oklch(0.985 0.008 145);
--kp-border: oklch(0.36 0.035 145 / 14%);
--kp-ring: oklch(0.55 0.12 148);
--kp-danger: oklch(0.56 0.17 27);
--kp-danger-foreground: oklch(0.985 0.01 27);
--kp-danger-subtle: oklch(0.94 0.035 27);
--kp-danger-border: oklch(0.56 0.12 27 / 40%);
--kp-success: oklch(0.55 0.15 148);
--kp-success-foreground: oklch(0.985 0.01 148);
--kp-success-subtle: oklch(0.94 0.035 148);
--kp-success-border: oklch(0.55 0.12 148 / 40%);
--kp-warning: oklch(0.75 0.14 78);
--kp-warning-foreground: oklch(0.25 0.05 78);
--kp-warning-subtle: oklch(0.94 0.04 78);
--kp-warning-border: oklch(0.72 0.12 78 / 40%);
--kp-info: oklch(0.52 0.11 220);
--kp-info-foreground: oklch(0.985 0.01 220);
--kp-info-subtle: oklch(0.94 0.03 220);
--kp-info-border: oklch(0.52 0.09 220 / 40%);
--kp-glass-tint: oklch(0.72 0.12 148 / 28%);
--kp-radius-sm: 0.5rem;
--kp-radius-md: 0.75rem;
--kp-radius-lg: 1rem;
--kp-radius-panel: 1rem;
--kp-density: 1;
--kp-motion-duration: 260ms;
--kp-motion-stiffness: 360;
--kp-motion-damping: 28;
```
