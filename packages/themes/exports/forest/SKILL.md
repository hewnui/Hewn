---
name: hewn-forest-theme
description: Apply the Hewn Forest theme tokens, typography, motion, and design rules when building or restyling UI.
---

# Forest theme (Hewn)

Moss and emerald; grounded organic product UI.

Use this skill whenever generating UI that should match the **Forest** pack
(`forest`). Supported modes: **light, dark**.

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

1. Set `data-theme="forest"` and `data-mode="{light|dark}"` on a root element (or import the generated `@theme` CSS).
2. Prefer semantic utilities / CSS variables (`bg-background`, `text-foreground`, `bg-accent`, `border-border`, `--kp-*`).
3. Respect reduced motion — disable springs/shimmers when `prefers-reduced-motion: reduce`.
4. Keep glass as a global material toggle; do not add per-component glass props.

## Color tokens (primary mode: light)

| Token | Role | Value |
|---|---|---|
| `--kp-background` / `--color-background` | Page and app canvas | `oklch(0.972 0.012 145)` |
| `--kp-foreground` / `--color-foreground` | Primary text and icons | `oklch(0.225 0.028 145)` |
| `--kp-surface` / `--color-surface` | Cards, panels, and elevated chrome | `oklch(0.995 0.004 145)` |
| `--kp-surface-raised` / `--color-surface-raised` | Overlays and nested elevation | `oklch(1 0 0)` |
| `--kp-muted` / `--color-muted` | Subtle fills and disabled wells | `oklch(0.925 0.022 145)` |
| `--kp-muted-foreground` / `--color-muted-foreground` | Secondary text and captions | `oklch(0.49 0.035 145)` |
| `--kp-accent` / `--color-accent` | Primary actions and focus accents | `oklch(0.49 0.105 148)` |
| `--kp-accent-foreground` / `--color-accent-foreground` | Text/icons on accent | `oklch(0.985 0.008 145)` |
| `--kp-border` / `--color-border` | Separators and control outlines | `oklch(0.36 0.035 145 / 14%)` |
| `--kp-ring` / `--color-ring` | Focus ring | `oklch(0.55 0.12 148)` |
| `--kp-danger` / `--color-danger` | Destructive and error states | `oklch(0.56 0.17 27)` |
| `--kp-danger-foreground` / `--color-danger-foreground` | danger-foreground | `oklch(0.985 0.01 27)` |
| `--kp-danger-subtle` / `--color-danger-subtle` | danger-subtle | `oklch(0.94 0.035 27)` |
| `--kp-danger-border` / `--color-danger-border` | danger-border | `oklch(0.56 0.12 27 / 40%)` |
| `--kp-success` / `--color-success` | success | `oklch(0.55 0.15 148)` |
| `--kp-success-foreground` / `--color-success-foreground` | success-foreground | `oklch(0.985 0.01 148)` |
| `--kp-success-subtle` / `--color-success-subtle` | success-subtle | `oklch(0.94 0.035 148)` |
| `--kp-success-border` / `--color-success-border` | success-border | `oklch(0.55 0.12 148 / 40%)` |
| `--kp-warning` / `--color-warning` | warning | `oklch(0.75 0.14 78)` |
| `--kp-warning-foreground` / `--color-warning-foreground` | warning-foreground | `oklch(0.25 0.05 78)` |
| `--kp-warning-subtle` / `--color-warning-subtle` | warning-subtle | `oklch(0.94 0.04 78)` |
| `--kp-warning-border` / `--color-warning-border` | warning-border | `oklch(0.72 0.12 78 / 40%)` |
| `--kp-info` / `--color-info` | info | `oklch(0.52 0.11 220)` |
| `--kp-info-foreground` / `--color-info-foreground` | info-foreground | `oklch(0.985 0.01 220)` |
| `--kp-info-subtle` / `--color-info-subtle` | info-subtle | `oklch(0.94 0.03 220)` |
| `--kp-info-border` / `--color-info-border` | info-border | `oklch(0.52 0.09 220 / 40%)` |
| `--kp-glass-tint` / `--color-glass-tint` | Tinted frosted glass material | `oklch(0.72 0.12 148 / 28%)` |

## Structure

- `--kp-radius-sm`: `0.5rem`
- `--kp-radius-md`: `0.75rem`
- `--kp-radius-lg`: `1rem`
- `--kp-radius-panel`: `1rem`
- `--kp-density`: `1`
- `--kp-motion-duration`: `260ms`
- `--kp-motion-stiffness`: `360`
- `--kp-motion-damping`: `28`

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
