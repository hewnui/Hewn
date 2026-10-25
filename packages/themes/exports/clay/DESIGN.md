# Clay — Design brief

> Generated from Hewn curated theme packs. Semantic OKLCH tokens; do not edit by hand.

## Identity

Warm stone and terracotta.

- **Pack id:** `clay`
- **Base pack:** `clay`
- **Supported modes:** light
- **Color scheme (primary):** light

## Palette

| Token | Role | light |
|---|---|---|
| `background` | Page and app canvas | `oklch(0.955 0.02 55)` |
| `foreground` | Primary text and icons | `oklch(0.27 0.045 40)` |
| `surface` | Cards, panels, and elevated chrome | `oklch(0.98 0.012 50)` |
| `surface-raised` | Overlays and nested elevation | `oklch(0.995 0.006 45)` |
| `muted` | Subtle fills and disabled wells | `oklch(0.915 0.025 50)` |
| `muted-foreground` | Secondary text and captions | `oklch(0.5 0.045 40)` |
| `accent` | Primary actions and focus accents | `oklch(0.55 0.12 40)` |
| `accent-foreground` | Text/icons on accent | `oklch(0.98 0.01 50)` |
| `border` | Separators and control outlines | `oklch(0.4 0.05 40 / 16%)` |
| `ring` | Focus ring | `oklch(0.6 0.13 40)` |
| `danger` | Destructive and error states | `oklch(0.54 0.17 28)` |
| `danger-foreground` | danger-foreground | `oklch(0.985 0.01 28)` |
| `danger-subtle` | danger-subtle | `oklch(0.94 0.035 28)` |
| `danger-border` | danger-border | `oklch(0.56 0.12 28 / 40%)` |
| `success` | success | `oklch(0.55 0.15 145)` |
| `success-foreground` | success-foreground | `oklch(0.985 0.01 145)` |
| `success-subtle` | success-subtle | `oklch(0.94 0.035 145)` |
| `success-border` | success-border | `oklch(0.55 0.12 145 / 40%)` |
| `warning` | warning | `oklch(0.75 0.14 55)` |
| `warning-foreground` | warning-foreground | `oklch(0.25 0.05 55)` |
| `warning-subtle` | warning-subtle | `oklch(0.94 0.04 55)` |
| `warning-border` | warning-border | `oklch(0.72 0.12 55 / 40%)` |
| `info` | info | `oklch(0.52 0.11 230)` |
| `info-foreground` | info-foreground | `oklch(0.985 0.01 230)` |
| `info-subtle` | info-subtle | `oklch(0.94 0.03 230)` |
| `info-border` | info-border | `oklch(0.52 0.09 230 / 40%)` |
| `glass-tint` | Tinted frosted glass material | `oklch(0.74 0.1 45 / 28%)` |

## Typography

| Role | Stack | Usage |
|---|---|---|
| Sans | IBM Plex Sans, ui-sans-serif, system-ui | UI chrome, body, headings |
| Mono | IBM Plex Mono, ui-monospace | Labels, code, tabular metrics |
| Display | Space Grotesk → sans | Marketing hero H1 and brand wordmark ≥18px only |

Body text uses pretty wrapping; headings use balanced wrapping; dynamic numbers use `tabular-nums`.

## Radius & density

- `radius-sm`: `0.5rem`
- `radius-md`: `0.8rem`
- `radius-lg`: `1.05rem`
- `radius-panel`: `1.05rem`
- `density`: `1`
- `motion-duration`: `270ms`
- `motion-stiffness`: `320`
- `motion-damping`: `27`

Density scales control spacing rhythm. Panel radius (`radius-panel`) caps menus and dialogs so they never go full-pill.

## Motion

- Duration: `270ms`
- Spring stiffness: `320`
- Spring damping: `27`
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
--kp-background: oklch(0.955 0.02 55);
--kp-foreground: oklch(0.27 0.045 40);
--kp-surface: oklch(0.98 0.012 50);
--kp-surface-raised: oklch(0.995 0.006 45);
--kp-muted: oklch(0.915 0.025 50);
--kp-muted-foreground: oklch(0.5 0.045 40);
--kp-accent: oklch(0.55 0.12 40);
--kp-accent-foreground: oklch(0.98 0.01 50);
--kp-border: oklch(0.4 0.05 40 / 16%);
--kp-ring: oklch(0.6 0.13 40);
--kp-danger: oklch(0.54 0.17 28);
--kp-danger-foreground: oklch(0.985 0.01 28);
--kp-danger-subtle: oklch(0.94 0.035 28);
--kp-danger-border: oklch(0.56 0.12 28 / 40%);
--kp-success: oklch(0.55 0.15 145);
--kp-success-foreground: oklch(0.985 0.01 145);
--kp-success-subtle: oklch(0.94 0.035 145);
--kp-success-border: oklch(0.55 0.12 145 / 40%);
--kp-warning: oklch(0.75 0.14 55);
--kp-warning-foreground: oklch(0.25 0.05 55);
--kp-warning-subtle: oklch(0.94 0.04 55);
--kp-warning-border: oklch(0.72 0.12 55 / 40%);
--kp-info: oklch(0.52 0.11 230);
--kp-info-foreground: oklch(0.985 0.01 230);
--kp-info-subtle: oklch(0.94 0.03 230);
--kp-info-border: oklch(0.52 0.09 230 / 40%);
--kp-glass-tint: oklch(0.74 0.1 45 / 28%);
--kp-radius-sm: 0.5rem;
--kp-radius-md: 0.8rem;
--kp-radius-lg: 1.05rem;
--kp-radius-panel: 1.05rem;
--kp-density: 1;
--kp-motion-duration: 270ms;
--kp-motion-stiffness: 320;
--kp-motion-damping: 27;
```
