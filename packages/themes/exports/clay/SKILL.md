---
name: hewn-clay-theme
description: Apply the Hewn Clay theme tokens, typography, motion, and design rules when building or restyling UI.
---

# Clay theme (Hewn)

Warm stone and terracotta.

Use this skill whenever generating UI that should match the **Clay** pack
(`clay`). Supported modes: **light**.

## Quick rules

- Use semantic OKLCH tokens (`--kp-*` / `--color-*`); never hard-code theme hues.
- Typography: IBM Plex Sans (UI), IBM Plex Mono (code/labels), Space Grotesk only for marketing hero H1 and brand wordmark ≥18px.
- Icons: Phosphor. Interactive hit targets ≥40×40px; press feedback `scale(0.96)`.
- Motion: animate transform, opacity, and filter; reduced motion always wins.
- Radius: concentric scale; panels use `--kp-radius-panel` (never full-pill menus/dialogs).
- Glass is a global material — tint, blur, saturation, refraction edge, opaque fallback.

## Never

- No purple/lila defaults, neon glow, pure black, Inter, emoji, or generic centered heroes.
- Never `transition: all` — list exact properties.
- Never `h-screen` for full-height sections — use `min-h-[100dvh]`.
- No per-component `glass` prop; material is global.
- Do not invent unsupported light/dark combinations for a pack.
- Do not put Space Grotesk in UI chrome, forms, or dense product copy.

## How to apply

1. Set `data-theme="clay"` and `data-mode="{light}"` on a root element (or import the generated `@theme` CSS).
2. Prefer semantic utilities / CSS variables (`bg-background`, `text-foreground`, `bg-accent`, `border-border`, `--kp-*`).
3. Respect reduced motion — disable springs/shimmers when `prefers-reduced-motion: reduce`.
4. Keep glass as a global material toggle; do not add per-component glass props.

## Color tokens (primary mode: light)

| Token | Role | Value |
|---|---|---|
| `--kp-background` / `--color-background` | Page and app canvas | `oklch(0.955 0.02 55)` |
| `--kp-foreground` / `--color-foreground` | Primary text and icons | `oklch(0.27 0.045 40)` |
| `--kp-surface` / `--color-surface` | Cards, panels, and elevated chrome | `oklch(0.98 0.012 50)` |
| `--kp-surface-raised` / `--color-surface-raised` | Overlays and nested elevation | `oklch(0.995 0.006 45)` |
| `--kp-muted` / `--color-muted` | Subtle fills and disabled wells | `oklch(0.915 0.025 50)` |
| `--kp-muted-foreground` / `--color-muted-foreground` | Secondary text and captions | `oklch(0.5 0.045 40)` |
| `--kp-accent` / `--color-accent` | Primary actions and focus accents | `oklch(0.55 0.12 40)` |
| `--kp-accent-foreground` / `--color-accent-foreground` | Text/icons on accent | `oklch(0.98 0.01 50)` |
| `--kp-border` / `--color-border` | Separators and control outlines | `oklch(0.4 0.05 40 / 16%)` |
| `--kp-ring` / `--color-ring` | Focus ring | `oklch(0.6 0.13 40)` |
| `--kp-danger` / `--color-danger` | Destructive and error states | `oklch(0.54 0.17 28)` |
| `--kp-danger-foreground` / `--color-danger-foreground` | danger-foreground | `oklch(0.985 0.01 28)` |
| `--kp-danger-subtle` / `--color-danger-subtle` | danger-subtle | `oklch(0.94 0.035 28)` |
| `--kp-danger-border` / `--color-danger-border` | danger-border | `oklch(0.56 0.12 28 / 40%)` |
| `--kp-success` / `--color-success` | success | `oklch(0.55 0.15 145)` |
| `--kp-success-foreground` / `--color-success-foreground` | success-foreground | `oklch(0.985 0.01 145)` |
| `--kp-success-subtle` / `--color-success-subtle` | success-subtle | `oklch(0.94 0.035 145)` |
| `--kp-success-border` / `--color-success-border` | success-border | `oklch(0.55 0.12 145 / 40%)` |
| `--kp-warning` / `--color-warning` | warning | `oklch(0.75 0.14 55)` |
| `--kp-warning-foreground` / `--color-warning-foreground` | warning-foreground | `oklch(0.25 0.05 55)` |
| `--kp-warning-subtle` / `--color-warning-subtle` | warning-subtle | `oklch(0.94 0.04 55)` |
| `--kp-warning-border` / `--color-warning-border` | warning-border | `oklch(0.72 0.12 55 / 40%)` |
| `--kp-info` / `--color-info` | info | `oklch(0.52 0.11 230)` |
| `--kp-info-foreground` / `--color-info-foreground` | info-foreground | `oklch(0.985 0.01 230)` |
| `--kp-info-subtle` / `--color-info-subtle` | info-subtle | `oklch(0.94 0.03 230)` |
| `--kp-info-border` / `--color-info-border` | info-border | `oklch(0.52 0.09 230 / 40%)` |
| `--kp-glass-tint` / `--color-glass-tint` | Tinted frosted glass material | `oklch(0.74 0.1 45 / 28%)` |

## Structure

- `--kp-radius-sm`: `0.5rem`
- `--kp-radius-md`: `0.8rem`
- `--kp-radius-lg`: `1.05rem`
- `--kp-radius-panel`: `1.05rem`
- `--kp-density`: `1`
- `--kp-motion-duration`: `270ms`
- `--kp-motion-stiffness`: `320`
- `--kp-motion-damping`: `27`

## Typography

- **Sans:** IBM Plex Sans — UI and body
- **Mono:** IBM Plex Mono — labels, code, metrics (`tabular-nums`)
- **Display:** Space Grotesk — hero H1 / brand wordmark ≥18px only

## Export companions

- `DESIGN.md` — full design brief
- `tokens.dtcg.json` — DTCG (`$value` / `$type`) with light/dark modes
- `theme.css` — Tailwind v4 `@theme` block

When unsure, re-read `DESIGN.md` for this pack and keep accents within the
curated ramp — do not invent a new hue family.
