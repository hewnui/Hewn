---
name: hewn-ember-theme
description: Apply the Hewn Ember theme tokens, typography, motion, and design rules when building or restyling UI.
---

# Ember theme (Hewn)

Charcoal and burnt orange.

Use this skill whenever generating UI that should match the **Ember** pack
(`ember`). Supported modes: **dark**.

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

1. Set `data-theme="ember"` and `data-mode="{dark}"` on a root element (or import the generated `@theme` CSS).
2. Prefer semantic utilities / CSS variables (`bg-background`, `text-foreground`, `bg-accent`, `border-border`, `--kp-*`).
3. Respect reduced motion — disable springs/shimmers when `prefers-reduced-motion: reduce`.
4. Keep glass as a global material toggle; do not add per-component glass props.

## Color tokens (primary mode: dark)

| Token | Role | Value |
|---|---|---|
| `--kp-background` / `--color-background` | Page and app canvas | `oklch(0.17 0.02 40)` |
| `--kp-foreground` / `--color-foreground` | Primary text and icons | `oklch(0.93 0.02 70)` |
| `--kp-surface` / `--color-surface` | Cards, panels, and elevated chrome | `oklch(0.21 0.025 40)` |
| `--kp-surface-raised` / `--color-surface-raised` | Overlays and nested elevation | `oklch(0.255 0.03 42)` |
| `--kp-muted` / `--color-muted` | Subtle fills and disabled wells | `oklch(0.275 0.028 40)` |
| `--kp-muted-foreground` / `--color-muted-foreground` | Secondary text and captions | `oklch(0.72 0.03 60)` |
| `--kp-accent` / `--color-accent` | Primary actions and focus accents | `oklch(0.7 0.15 50)` |
| `--kp-accent-foreground` / `--color-accent-foreground` | Text/icons on accent | `oklch(0.985 0.015 50)` |
| `--kp-border` / `--color-border` | Separators and control outlines | `oklch(0.84 0.03 60 / 14%)` |
| `--kp-ring` / `--color-ring` | Focus ring | `oklch(0.7 0.15 50)` |
| `--kp-danger` / `--color-danger` | Destructive and error states | `oklch(0.66 0.17 28)` |
| `--kp-danger-foreground` / `--color-danger-foreground` | danger-foreground | `oklch(0.985 0.01 28)` |
| `--kp-danger-subtle` / `--color-danger-subtle` | danger-subtle | `oklch(0.32 0.05 28)` |
| `--kp-danger-border` / `--color-danger-border` | danger-border | `oklch(0.72 0.1 28 / 40%)` |
| `--kp-success` / `--color-success` | success | `oklch(0.72 0.14 145)` |
| `--kp-success-foreground` / `--color-success-foreground` | success-foreground | `oklch(0.985 0.01 145)` |
| `--kp-success-subtle` / `--color-success-subtle` | success-subtle | `oklch(0.32 0.045 145)` |
| `--kp-success-border` / `--color-success-border` | success-border | `oklch(0.72 0.1 145 / 40%)` |
| `--kp-warning` / `--color-warning` | warning | `oklch(0.78 0.12 70)` |
| `--kp-warning-foreground` / `--color-warning-foreground` | warning-foreground | `oklch(0.22 0.04 70)` |
| `--kp-warning-subtle` / `--color-warning-subtle` | warning-subtle | `oklch(0.34 0.04 70)` |
| `--kp-warning-border` / `--color-warning-border` | warning-border | `oklch(0.78 0.1 70 / 40%)` |
| `--kp-info` / `--color-info` | info | `oklch(0.72 0.1 230)` |
| `--kp-info-foreground` / `--color-info-foreground` | info-foreground | `oklch(0.985 0.01 230)` |
| `--kp-info-subtle` / `--color-info-subtle` | info-subtle | `oklch(0.32 0.035 230)` |
| `--kp-info-border` / `--color-info-border` | info-border | `oklch(0.72 0.08 230 / 40%)` |
| `--kp-glass-tint` / `--color-glass-tint` | Tinted frosted glass material | `oklch(0.58 0.15 50 / 28%)` |

## Structure

- `--kp-radius-sm`: `0.45rem`
- `--kp-radius-md`: `0.7rem`
- `--kp-radius-lg`: `0.95rem`
- `--kp-radius-panel`: `0.95rem`
- `--kp-density`: `1.05`
- `--kp-motion-duration`: `230ms`
- `--kp-motion-stiffness`: `400`
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
