# Typography Stack — Plex + Space Grotesk

> Status: Design validated (2026-07-25)  
> Approach: 1 — IBM Plex Sans + Space Grotesk + IBM Plex Mono  
> Scope: Full stack (product UI, docs, marketing)

---

## Understanding summary

- Revisit the full typography stack for product UI, docs, and marketing (not home-only).
- Goal: clearer Hewn voice than Geist/Inter-adjacent defaults, without hurting dense SaaS UI.
- Audience: SaaS/dashboard builders evaluating theme + motion + a11y-first React components.
- Stack shape: UI/docs sans + brand/display geometric grotesk + mono.
- Personality: editorial-premium presence, product-engineer sharpness at UI sizes.
- License: free/open (OFL) so consumers can self-host safely.
- Day-one scripts: Latin (+ common Western European) only.
- Display: geometric grotesk for brand/hero — not serif, not one-sans-everywhere.

## Assumptions

1. Self-host via `next/font`; no runtime Google Fonts CDN dependency in the app runtime path.
2. Prefer variable faces where quality allows; subset Latin.
3. Theme tokens are source of truth (`--kp-font-sans`, `--kp-font-mono`, `--kp-font-display`).
4. Mono stays tooling-clear (code, labels, tabular meta).
5. Phosphor icons unchanged — fonts only.
6. `@hewnui/ui` does not bundle font files; apps load fonts and consume tokens.
7. Docs skip Space Grotesk unless a page truly needs display type.

## Decision log

| Decision | Alternatives | Why |
|----------|--------------|-----|
| Full-stack revisit | Home-only | Avoid split personality |
| OFL / free-only | Paid faces | Safe for consumers |
| Editorial-premium + UI discipline | Pure engineer-sharp | Differentiates from Geist |
| UI sans + display + mono | One sans everywhere | Brand bite without hurting dense UI |
| Latin day-one | Broad scripts | Better face quality; expand later |
| Geometric grotesk display | Serif / humanist display | Clear brand contrast |
| Approach 1: Plex Sans + Space Grotesk + Plex Mono | Source+Outfit; Public+Unbounded | Cohesion, UI metrics, OFL, distinct |
| Display = hero H1 + wordmark (≥18px) | Chapter titles on display | Prevent Space Grotesk UI creep |
| Hero ≤ ~60px (`text-4xl md:text-6xl`) | 72px clamp | Hierarchy via weight/color, not size |
| Tokens in themes; apps load fonts | Bundle in `@hewnui/ui` | Clear ownership; no package bloat |
| Docs skip display by default | Load everywhere | Performance |

## Final design

### Faces & tokens

| Token | Face | Role |
|-------|------|------|
| `--kp-font-sans` | IBM Plex Sans | Body, UI, docs prose, dense data |
| `--kp-font-display` | Space Grotesk | Hero H1 + brand wordmark ≥18px only |
| `--kp-font-mono` | IBM Plex Mono | Code, install, eyebrows, tabular meta |

### Rules

- Display never on form controls, tables, or docs body.
- UI weights: 400 / 500 / 600; avoid 700 in dense chrome.
- Display: `font-medium`, `tracking-tighter`, `leading-none`, `text-balance`.
- Headings: `text-balance`; body: `text-pretty`.
- Dynamic numbers: `tabular-nums`.
- Root: `antialiased` (already in theme tokens).
- Compact UI floor ~13px; mono eyebrows may stay 12px.

### Wiring

- `apps/web/app/layout.tsx` — `next/font/google` → CSS variables on `<html>`.
- `packages/themes` — pack tokens + `--font-display` in `@theme inline`.
- Marketing applies `font-display` on hero H1 and logo wordmark.
- Update AGENTS.md + design doc when the stack ships.

### Verify

- Home hero + sticky nav, Theme Lab, one dense docs page.
- Light/dark × one warm + one cool theme.
