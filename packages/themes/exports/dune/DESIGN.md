# Dune — Design brief

> Generated from Hewn curated theme packs. Semantic OKLCH tokens; do not edit by hand.

## Identity

Sand, ochre, soft paper surfaces.

- **Pack id:** `dune`
- **Base pack:** `dune`
- **Supported modes:** light
- **Color scheme (primary):** light

## Palette

| Token | Role | light |
|---|---|---|
| `background` | Page and app canvas | `oklch(0.96 0.02 85)` |
| `foreground` | Primary text and icons | `oklch(0.28 0.04 65)` |
| `surface` | Cards, panels, and elevated chrome | `oklch(0.985 0.012 90)` |
| `surface-raised` | Overlays and nested elevation | `oklch(0.995 0.006 95)` |
| `muted` | Subtle fills and disabled wells | `oklch(0.92 0.025 85)` |
| `muted-foreground` | Secondary text and captions | `oklch(0.5 0.04 70)` |
| `accent` | Primary actions and focus accents | `oklch(0.58 0.11 70)` |
| `accent-foreground` | Text/icons on accent | `oklch(0.98 0.01 90)` |
| `border` | Separators and control outlines | `oklch(0.4 0.04 70 / 16%)` |
| `ring` | Focus ring | `oklch(0.62 0.12 70)` |
| `danger` | Destructive and error states | `oklch(0.55 0.16 30)` |
| `danger-foreground` | danger-foreground | `oklch(0.985 0.01 30)` |
| `danger-subtle` | danger-subtle | `oklch(0.94 0.035 30)` |
| `danger-border` | danger-border | `oklch(0.56 0.12 30 / 40%)` |
| `success` | success | `oklch(0.55 0.15 140)` |
| `success-foreground` | success-foreground | `oklch(0.985 0.01 140)` |
| `success-subtle` | success-subtle | `oklch(0.94 0.035 140)` |
| `success-border` | success-border | `oklch(0.55 0.12 140 / 40%)` |
| `warning` | warning | `oklch(0.75 0.14 70)` |
| `warning-foreground` | warning-foreground | `oklch(0.25 0.05 70)` |
| `warning-subtle` | warning-subtle | `oklch(0.94 0.04 70)` |
| `warning-border` | warning-border | `oklch(0.72 0.12 70 / 40%)` |
| `info` | info | `oklch(0.52 0.11 230)` |
| `info-foreground` | info-foreground | `oklch(0.985 0.01 230)` |
| `info-subtle` | info-subtle | `oklch(0.94 0.03 230)` |
| `info-border` | info-border | `oklch(0.52 0.09 230 / 40%)` |
| `glass-tint` | Tinted frosted glass material | `oklch(0.78 0.09 80 / 30%)` |

## Typography

| Role | Stack | Usage |
|---|---|---|
| Sans | IBM Plex Sans, ui-sans-serif, system-ui | UI chrome, body, headings |
| Mono | IBM Plex Mono, ui-monospace | Labels, code, tabular metrics |
| Display | Space Grotesk → sans | Marketing hero H1 and brand wordmark ≥18px only |

Body text uses pretty wrapping; headings use balanced wrapping; dynamic numbers use `tabular-nums`.

## Radius & density

- `radius-sm`: `0.55rem`
- `radius-md`: `0.85rem`
- `radius-lg`: `1.15rem`
- `radius-panel`: `1.15rem`
- `density`: `0.95`
- `motion-duration`: `280ms`
- `motion-stiffness`: `300`
- `motion-damping`: `26`

Density scales control spacing rhythm. Panel radius (`radius-panel`) caps menus and dialogs so they never go full-pill.

## Motion

- Duration: `280ms`
- Spring stiffness: `300`
- Spring damping: `26`
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
--kp-background: oklch(0.96 0.02 85);
--kp-foreground: oklch(0.28 0.04 65);
--kp-surface: oklch(0.985 0.012 90);
--kp-surface-raised: oklch(0.995 0.006 95);
--kp-muted: oklch(0.92 0.025 85);
--kp-muted-foreground: oklch(0.5 0.04 70);
--kp-accent: oklch(0.58 0.11 70);
--kp-accent-foreground: oklch(0.98 0.01 90);
--kp-border: oklch(0.4 0.04 70 / 16%);
--kp-ring: oklch(0.62 0.12 70);
--kp-danger: oklch(0.55 0.16 30);
--kp-danger-foreground: oklch(0.985 0.01 30);
--kp-danger-subtle: oklch(0.94 0.035 30);
--kp-danger-border: oklch(0.56 0.12 30 / 40%);
--kp-success: oklch(0.55 0.15 140);
--kp-success-foreground: oklch(0.985 0.01 140);
--kp-success-subtle: oklch(0.94 0.035 140);
--kp-success-border: oklch(0.55 0.12 140 / 40%);
--kp-warning: oklch(0.75 0.14 70);
--kp-warning-foreground: oklch(0.25 0.05 70);
--kp-warning-subtle: oklch(0.94 0.04 70);
--kp-warning-border: oklch(0.72 0.12 70 / 40%);
--kp-info: oklch(0.52 0.11 230);
--kp-info-foreground: oklch(0.985 0.01 230);
--kp-info-subtle: oklch(0.94 0.03 230);
--kp-info-border: oklch(0.52 0.09 230 / 40%);
--kp-glass-tint: oklch(0.78 0.09 80 / 30%);
--kp-radius-sm: 0.55rem;
--kp-radius-md: 0.85rem;
--kp-radius-lg: 1.15rem;
--kp-radius-panel: 1.15rem;
--kp-density: 0.95;
--kp-motion-duration: 280ms;
--kp-motion-stiffness: 300;
--kp-motion-damping: 26;
```
