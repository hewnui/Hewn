# Ember — Design brief

> Generated from Hewn curated theme packs. Semantic OKLCH tokens; do not edit by hand.

## Identity

Charcoal and burnt orange.

- **Pack id:** `ember`
- **Base pack:** `ember`
- **Supported modes:** dark
- **Color scheme (primary):** dark

## Palette

| Token | Role | dark |
|---|---|---|
| `background` | Page and app canvas | `oklch(0.17 0.02 40)` |
| `foreground` | Primary text and icons | `oklch(0.93 0.02 70)` |
| `surface` | Cards, panels, and elevated chrome | `oklch(0.21 0.025 40)` |
| `surface-raised` | Overlays and nested elevation | `oklch(0.255 0.03 42)` |
| `muted` | Subtle fills and disabled wells | `oklch(0.275 0.028 40)` |
| `muted-foreground` | Secondary text and captions | `oklch(0.72 0.03 60)` |
| `accent` | Primary actions and focus accents | `oklch(0.7 0.15 50)` |
| `accent-foreground` | Text/icons on accent | `oklch(0.985 0.015 50)` |
| `border` | Separators and control outlines | `oklch(0.84 0.03 60 / 14%)` |
| `ring` | Focus ring | `oklch(0.7 0.15 50)` |
| `danger` | Destructive and error states | `oklch(0.66 0.17 28)` |
| `danger-foreground` | danger-foreground | `oklch(0.985 0.01 28)` |
| `danger-subtle` | danger-subtle | `oklch(0.32 0.05 28)` |
| `danger-border` | danger-border | `oklch(0.72 0.1 28 / 40%)` |
| `success` | success | `oklch(0.72 0.14 145)` |
| `success-foreground` | success-foreground | `oklch(0.985 0.01 145)` |
| `success-subtle` | success-subtle | `oklch(0.32 0.045 145)` |
| `success-border` | success-border | `oklch(0.72 0.1 145 / 40%)` |
| `warning` | warning | `oklch(0.78 0.12 70)` |
| `warning-foreground` | warning-foreground | `oklch(0.22 0.04 70)` |
| `warning-subtle` | warning-subtle | `oklch(0.34 0.04 70)` |
| `warning-border` | warning-border | `oklch(0.78 0.1 70 / 40%)` |
| `info` | info | `oklch(0.72 0.1 230)` |
| `info-foreground` | info-foreground | `oklch(0.985 0.01 230)` |
| `info-subtle` | info-subtle | `oklch(0.32 0.035 230)` |
| `info-border` | info-border | `oklch(0.72 0.08 230 / 40%)` |
| `glass-tint` | Tinted frosted glass material | `oklch(0.58 0.15 50 / 28%)` |

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
- `density`: `1.05`
- `motion-duration`: `230ms`
- `motion-stiffness`: `400`
- `motion-damping`: `28`

Density scales control spacing rhythm. Panel radius (`radius-panel`) caps menus and dialogs so they never go full-pill.

## Motion

- Duration: `230ms`
- Spring stiffness: `400`
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
--kp-background: oklch(0.17 0.02 40);
--kp-foreground: oklch(0.93 0.02 70);
--kp-surface: oklch(0.21 0.025 40);
--kp-surface-raised: oklch(0.255 0.03 42);
--kp-muted: oklch(0.275 0.028 40);
--kp-muted-foreground: oklch(0.72 0.03 60);
--kp-accent: oklch(0.7 0.15 50);
--kp-accent-foreground: oklch(0.985 0.015 50);
--kp-border: oklch(0.84 0.03 60 / 14%);
--kp-ring: oklch(0.7 0.15 50);
--kp-danger: oklch(0.66 0.17 28);
--kp-danger-foreground: oklch(0.985 0.01 28);
--kp-danger-subtle: oklch(0.32 0.05 28);
--kp-danger-border: oklch(0.72 0.1 28 / 40%);
--kp-success: oklch(0.72 0.14 145);
--kp-success-foreground: oklch(0.985 0.01 145);
--kp-success-subtle: oklch(0.32 0.045 145);
--kp-success-border: oklch(0.72 0.1 145 / 40%);
--kp-warning: oklch(0.78 0.12 70);
--kp-warning-foreground: oklch(0.22 0.04 70);
--kp-warning-subtle: oklch(0.34 0.04 70);
--kp-warning-border: oklch(0.78 0.1 70 / 40%);
--kp-info: oklch(0.72 0.1 230);
--kp-info-foreground: oklch(0.985 0.01 230);
--kp-info-subtle: oklch(0.32 0.035 230);
--kp-info-border: oklch(0.72 0.08 230 / 40%);
--kp-glass-tint: oklch(0.58 0.15 50 / 28%);
--kp-radius-sm: 0.45rem;
--kp-radius-md: 0.7rem;
--kp-radius-lg: 0.95rem;
--kp-radius-panel: 0.95rem;
--kp-density: 1.05;
--kp-motion-duration: 230ms;
--kp-motion-stiffness: 400;
--kp-motion-damping: 28;
```
