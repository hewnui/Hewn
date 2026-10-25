# Home Product Chapter — Live Proof Surface

> Status: Design validated (2026-08-16)
> Approach: B — Full-bleed product frame
> Scope: One homepage chapter after Identity; no homepage rewrite

---

## Understanding summary

- Add a live product chapter on `/` so visitors see a believable ops surface, not only Theme Lab / docs.
- The scene restyles from the sticky `AppearanceControls` bar (global theme/mode/material/radius).
- Audience: SaaS / dashboard builders evaluating Hewn.
- Constraints: existing chapters stay; 200-line files; RSC + client leaves; semantic tokens; Motion from `motion/react`; reduced-motion wins; no Studio embed.
- Non-goals: homepage rewrite, OG/share cards, install-command work, Pro blocks, payments, new dependencies, fake logos/customers.

## Assumptions

1. Home-only components — do not import Theme Studio dock, compare, matrix, or specimen.
2. Hero specimen stays; this chapter is the proof beat.
3. Motion / Material / States / A11y remain explainer chapters after it.
4. Product name is **Northline** so home does not clone Studio’s Meridian.
5. Chrome primary button is a no-op (optional “Queued” flash), not a route. Only the Theme Studio CTA navigates.
6. Success: change theme in the bar → the framed app updates; visitor can open `/docs/theme-studio`.

## Decision log

| Decision | Alternatives | Why |
|----------|----------------|-----|
| Proof chapter only | Install UX, OG cards, full rewrite | User chose proof as the marketing job |
| Home-only scene + Studio CTA | Embed Theme Studio; upgrade hero only | Two theme systems on `/` is worse; hero is the brand beat |
| After Identity | After Material; before final CTA | First “is this a real app?” moment while attention is still high |
| Half-ops density | Compact strip; full Meridian dashboard | Compact ≈ hero card; full duplicates Studio and fights later chapters |
| Approach B: full-bleed frame | A split copy/app; C extract Studio modules | Full width is the proof; split squeezes; shared package is YAGNI |
| Northline, not Meridian | Reuse Meridian copy | Home and Studio should not look copy-pasted |
| No nav Theme Studio link unless it fits one desktop line | Always add to `HomeNav` | Chapter CTA is enough; nav is already dense |
| No Playwright for this slice | e2e author→export | Roadmap defers e2e; typecheck + manual theme/motion pass |

## Final design

### Placement

`HomeProduct` in `apps/web/app/page.tsx` immediately after `HomeIdentity`, before `HomeMotion`.

### Layout

- `max-w-[1400px]` section.
- Slim caption: mono eyebrow `Live product`, headline `The same tokens, on an actual desk.`, one support line, CTA `Open Theme Studio` → `/docs/theme-studio`.
- Full-width framed app (`data-kp-surface`, concentric radius, `--kp-shadow-surface`).
- Inside, top → bottom: chrome → KPI band → 3–4 activity rows.
- Mobile: caption stacks; chrome drops search; chart under the large metric; activity full width. Use `min-h` never `h-screen`.

### Files

```text
apps/web/components/home/home-product.tsx
apps/web/components/home/home-product-chrome.tsx
apps/web/components/home/home-product-metrics.tsx
apps/web/components/home/home-product-activity.tsx
apps/web/components/home/content.ts   # copy strings only
```

Use real `@hewnui/ui` (`Button`, `AreaChart`, `Sparkline`). No Studio CSS injection, no `data-studio-specimen`.

### Motion

- Caption: existing `HomeReveal`.
- Frame does not remount on theme change — tokens update in place.
- Charts honor `useMotionMode` / `data-motion="off"` / `prefers-reduced-motion`.
- Press feedback `scale(0.96)`. No scroll-hijack. No new dependencies.

### Testing

- `pnpm --filter web typecheck`
- Manual: theme / material / motion / radius while the chapter is in view; keyboard to Studio link; hit targets ≥40px.

## Risks

| Risk | Mitigation |
|------|------------|
| Feels like a Studio clone | Northline naming; half-ops; no dock/compare/matrix |
| Chapter too tall vs later explainers | KPI + activity only; no workspace/data-panel |
| Glass/docs bleed | Home uses global tokens + `data-kp-surface`, not Studio isolation |

---

## Revision — metrics panel (2026-08-16)

The first build shipped one big number, an `ml-auto` latency box, and a
`width={720}` chart. Four problems showed up on a wide viewport:

| Problem | Cause | Fix |
|---------|-------|-----|
| Chart stopped ~180px short of the panel edge | `ChartFrame` renders `<svg width={n}>` with no scaling, so a fixed 720 cannot fill a ~900px column | `useElementWidth` measures the wrapper and feeds the real width |
| X axis read `1` / `6` / `10` | Series `x` was the array index | `x` is now a 3-hour clock label; `AxisLabels` shows first/mid/last → `00:00` / `12:00` / `24:00` |
| Y axis had no unit | No caption | Caption row: `Jobs routed per 3h window` + `thousands` |
| Latency box floated in an L-shape | `ml-auto` inside the delta row | Promoted to a divided three-stat rail |

### Current structure

Rail (`1.35fr 1fr 1fr`, `divide-x` at `md`) → full-width chart under a
`border-t`. The lead cell keeps the oversized figure so hierarchy survives the
extra density; cells 2–3 are label / value+delta / sparkline. Error rate was
added because a two-metric ops desk read thin.

### Invariants

- Series values sum to ~94.8 (thousands) and must stay consistent with
  `product.lead.value` (`94,817`). Change one, change the other.
- The outer split is `lg`, not `md` — three rail cells plus a 16rem activity
  column cannot share a 768px viewport without crushing the lead figure.
  `HomeProductActivity` border flip is therefore also `lg`.
- `useElementWidth` is safe against ResizeObserver loops only because
  `ChartFrame` caps itself at `maxWidth: width`; the SVG can never widen its own
  container. Keep that property if the hook is reused.

### Upstream follow-up (not done)

`ChartFrame` is not responsive — every consumer must hand it a pixel width. A
proper fix (`width: 100%` + `viewBox` scaling) touches all four chart
components plus their docs, examples, and tests, so it was left out of a
homepage change. `useElementWidth` is the local workaround.
