# Marketing Home Revamp — Living Product Theater

> Status: Design validated (2026-07-25)  
> Approach: A — Living Product Theater  
> Scope: Cinematic max, hybrid conversion

---

## Understanding summary

- Rebuild the Hewn marketing homepage as a cinematic long-scroll experience.
- Hybrid conversion: brand story → interactive proof → Docs / Theme Lab / install CTAs.
- Audience: SaaS and dashboard builders evaluating a theme + motion + a11y-first React library.
- Constraints: existing theme/material/motion/radius system, IBM Plex Sans / Space Grotesk display / IBM Plex Mono, semantic tokens, Motion from `motion/react`, 200-line file limit, RSC + client leaves.
- Non-goals: pricing/checkout, auth, docs-shell redesign, fake logo walls, Unsplash heroes.

## Assumptions

1. Quotes/testimonials are crafted credible voices (not real customers yet).
2. Live demos reuse real `@hewnui/ui` components and `AppearanceControls`.
3. Sticky chrome is home-only.
4. Perpetual motion is isolated; animate transform/opacity only; LazyMotion where needed.
5. Voice is concrete and opinionated; anti-slop copy.
6. “What sites miss” means keyboard map, reduced-motion honesty, live empty/loading/error states, in-context theme switching, obvious install paths.

## Decision log

| Decision | Alternatives | Why |
|----------|--------------|-----|
| Hybrid conversion (story + demos + CTAs) | Docs-only or brand-only | Best match for library evaluation journey |
| Cinematic max scope | Focused 5–6 or full 8–10 without cinema | User brief; differentiators need room |
| Motion: honor reduced-motion + `kp-motion`; cinema when on | Always cinema / medium-only | Aligns with product philosophy; safest cinematic default |
| Approach A — Living Product Theater | Single canvas (B), editorial magazine (C) | Modular chapters, strongest story+proof, maintainable |
| Crafted quotes, no logo wall | Real customers / logo carousel | No real customers yet; editorial taste over fake social proof |
| Sticky appearance controls on home | Controls only in hero | Theme changes must prove every chapter |
| Home-only sticky nav | Global marketing layout refactor | YAGNI; docs shell stays untouched |
| `components/home/*` + `content.ts` | Monolithic `page.tsx` | 200-line limit; RSC composition + client leaves |
| motion/react only (no GSAP/Three) | Scrolltelling with GSAP | Project rule: do not mix; UI page stays Motion-native |
| Lightweight test gate for v1 | Full Playwright suite now | Manual a11y/motion + build smoke; e2e later if needed |
| Hero theme control is an unlabelled dot scrubber | Labelled chip grid like Identity | Identity chapter owns the explanatory version; hero needs the tactile moment only |
| Hero specimen is loose controls at depth | Single framed panel (original) | The framed panel rehearsed the Northline product chapter with a weaker version |
| One composition per chapter | Keep the uniform split, restyle only | Five identical splits in a row were the reason the page read flat |
| Material half is the control | Separate button pair + preview cards | The section shipped two controls doing the same thing |
| Single `CopyCommand` in `home-copy-button.tsx` | Per-section copy state | Copy logic was implemented twice with separate timeouts |
| Catalog chapter added | Leave breadth to the docs nav | 37 components were invisible on the page evaluators land on |
| Theme Studio chapter added | Keep it as a CTA link inside Product | The moat feature had no presence on the page at all |
| Ladder uses live `var(--kp-*)`, not sampled hex | Hard-coded swatch values | It must repaint with the theme, and hard-coded values would drift from the packs |
| Ladder backdrop is off-background | Plain section background | `--kp-background` and `--kp-surface` swatches are invisible against the page otherwise |
| Footer added | End on the CTA | No site exit, no docs map, no license anywhere |

## Final design

### Shell

- Sticky top chrome: Hewn mark + wordmark · Docs · Theme Lab · Install · compact AppearanceControls.
- Brand mark: assembled geometric K (`components/brand/`) with Graphite favicon / apple-icon.
- Theme-aware via existing providers.
- Fixed atmosphere layer (gradients/grain) with `pointer-events-none`.

### Scroll chapters

1. **Hero — command theater** — 12-column overlap grid (text cols 1–7, specimen cols 7–12) so the specimen tucks under the type block and bleeds past the right edge. Six-dot theme scrubber sits inline with the eyebrow; the headline's accent phrase carries `--kp-accent` so a repaint is legible in the H1 itself. Specimen is a three-layer depth stack of real controls (Slider / Button + Switch + Progress / bar chart) with pointer parallax, not a boxed dashboard preview — the Northline surface in chapter 3b owns that job. Magnetic primary CTA, copy-to-clipboard install chip, named scroll cue to `#claims`.
2. **Claim index** (`#claims`) — Four claims as a clickable index; each anchors to the chapter that proves it.
3. **Identity** (`#identity`) — Theme chips + live surface morph. Keeps the split composition that the later chapters deliberately break.
3b. **Product** — Full-bleed half-ops surface (Northline) + Theme Studio CTA. Interior is a divided three-stat rail (lead figure + p95 latency + error rate) over a full-width area chart; the chart measures its container because `ChartFrame` takes a fixed pixel width. See `docs/memory/home-product-chapter.md`.
3c. **Theme Studio** (`#theme-studio`) — Full-bleed derived token ladder rendered with live `var(--kp-*)`, so it repaints with the active theme and mode. Header, then the ladder, then a three-step Seed / Derive / Ship pipeline as a divided row. The accent column carries the WCAG clamp annotation — the guardrail claim is the pitch, so it is shown rather than described. The Product chapter's CTA now anchors forward to this section instead of linking straight to docs.
4. **Catalog** (`#catalog`) — Library breadth as a dense divided list, no cards. Counts are real and must track `packages/ui/src/components`.
5. **Motion** (`#motion`) — Full-bleed tinted band; three task cards reorder horizontally across the width via `layout`.
6. **Material** (`#material`) — Edge-to-edge two-half comparison on one shared backdrop so the glass half actually refracts. The half *is* the control.
7. **States** (`#states`) — Segmented control with a `layoutId` indicator; full-width stage with a live annotation bar and per-state guarantees.
8. **A11y** (`#accessibility`) — Dense borderless keyboard grid plus an inline control row; rules instead of cards.
9. **Quote theater** — Editorial quotes with crafted attributions.
10. **Ownership** (`#ownership`) — Real JSX sample beside the two install paths.
11. **Final CTA** — Docs, Theme Lab, Browse components.
12. **Footer** — Docs map, machine-readable endpoints, license.

### Composition rule

No two adjacent chapters may share a composition. Identity is the only text-left/card-right split; Motion is a full-bleed band, Material is edge-to-edge halves, States is a full-width stage, A11y is a dense grid, Catalog is a divided list. This is load-bearing — the page previously ran five identical splits back to back and read as a template.

### Motion rules

- Springs for interactive UI; `whileInView` / `layout` for reveals.
- Perpetual loops in memoized micro client islands.
- `AnimatePresence initial={false}` for default-state UI.
- Reduced motion and `data-motion="off"` disable autoplay and choreography.

### Content voice

- Brand: Hewn
- Headline: Product UI with a point of view.
- No seamless/elevate/next-gen; no fake Acme metrics; tabular messy numbers.

### File layout

```text
apps/web/app/page.tsx
apps/web/components/home/
  home-nav.tsx
  home-hero.tsx
  home-hero-field.tsx      # atmosphere behind the hero
  home-hero-cluster.tsx    # depth-stacked live specimen
  home-hero-chart.tsx
  home-hero-themes.tsx     # six-dot theme scrubber
  home-hero-cue.tsx
  home-claim-strip.tsx
  home-identity.tsx
  home-studio.tsx
  home-studio-ladder.tsx   # full-bleed live token ladder
  home-ai.tsx              # llms.txt / AI schema / MCP
  home-catalog.tsx
  home-catalog-data.ts     # census from galleryTotals
  home-motion.tsx
  home-motion-island.tsx
  home-material.tsx
  home-states.tsx
  home-states-stage.tsx
  home-a11y.tsx
  home-positions.tsx
  home-ownership.tsx
  home-cta.tsx
  home-footer.tsx
  home-atmosphere.tsx
  content.ts
```


### Invariants

- Home catalog totals come from `getHomeCatalog()` / `galleryTotals` — they must match the free `*.registry.ts` census in `packages/ui` (see `packages/registry/src/component-census.test.ts`). Do not hardcode the count.
- `not-first:` / `not-last:` match DOM position, not grid position. In a
  multi-row grid they only line up with the visual row edges when the grid is a
  single row, so the A11y keyboard strip draws column rules at `lg` only (six
  keys, one row). Below `lg` it falls back to horizontal rules, which grid rows
  produce correctly at any column count.
- Every `claims[].href` must match a rendered section `id`.
- `studio.ladder[].token` names must exist in `packages/themes/src/packs/*.css`.
- No `window.addEventListener("scroll")` — use `useScroll` / `useMotionValueEvent`.

## Theme Studio tool (`/docs/theme-studio`) — RESOLVED 2026-08-16

Every row below was fixed in the full-site pass. See
`docs/memory/site-audit-2026-08.md` for what replaced them.

| Issue (now fixed) | Location |
|-------------------|----------|
| Authoring panel uses raw `<input type="text">` / `type="color"` instead of the shipped `TextField` — the flagship demo does not dogfood the library | `studio-controls.tsx` |
| Base pack / radius / preview-mode toggles have no `aria-pressed` or radio semantics, so selection is unannounced | `studio-controls.tsx` |
| Three different "selected" visual treatments inside one panel (`bg-accent` for packs, `bg-muted` for radius and mode) | `studio-controls.tsx` |
| Engine `adjustments` rendered three times: count badge, "Engine notes" list, dashboard chip row | `studio-dock-preview.tsx`, `studio-controls.tsx`, `studio-dashboard/shell.tsx` |
| Hover/pin/Escape/outside-pointer logic and the `shellSurface` class string are duplicated from `appearance-controls.tsx` | `studio-dock.tsx` |
| Sheet max height is tied to the motion setting (`motionEnabled ? "min(42dvh, 22rem)" : undefined`), so disabling motion removes the cap — likely a bug | `studio-dock-sheet.tsx` |
| Draft/Compare is a hand-rolled two-`Button` toggle, a third segmented-control idiom | `studio-dashboard/shell.tsx` |

### Edge cases

- Single-mode themes (Dune/Clay/Ember) respect allowed modes.
- Mobile: single-column collapse; compressed sticky controls.
- SSR-safe; no window reads during render.
- Visible focus rings retained in a11y chapter.

### Testing (v1)

- Manual: keyboard nav + a11y demo; motion off; theme switch mid-scroll.
- Smoke: web/workspace build green.
- Playwright optional follow-up.
