# Full-site audit — 2026-08-16

Scope: every route in `apps/web` plus the library surfaces they exercise.
Triggered by "go through the site and tell me if we need any changes" after the
homepage revamp landed.

---

## Credibility

| Change | Where |
|--------|-------|
| Replaced fabricated testimonials (invented names, roles, companies) with unattributed design positions | `home-quotes.tsx` → `home-positions.tsx` |
| Rotation now has a Pause/Play control (WCAG 2.2.2) and stops entirely when motion is off | `home-positions.tsx` |

The old component invented people. Never ship attributed quotes that no one
said — the rest of the marketing claims lose their credibility with them.

## Broken and orphaned surfaces

| Change | Where |
|--------|-------|
| `/docs/getting-started` was linked from the footer but never existed — page written (install, peer ranges, Tailwind v4, providers) | `content/docs/getting-started.mdx`, root `meta.json` |
| `Spinner` shipped with no demo, no nav entry, and no gallery card | `spinner.mdx`, `spinner-demo.tsx`, `components/meta.json`, gallery catalog |
| Header had no navigation below `lg` — the links were simply `hidden` | `home-nav-mobile.tsx` |

## SEO and crawl infrastructure

None of this existed before the audit: `metadataBase`, `openGraph`, `twitter`,
`sitemap.ts`, `robots.ts`, `not-found.tsx`, and a generated `opengraph-image.tsx`
share card. Canonical constants live in `apps/web/lib/site.ts` — resolve the URL
from `NEXT_PUBLIC_SITE_URL`, then Vercel env, then `@hewnui/site-url`
`DEFAULT_SITE_URL`.

## Accessibility fixes in `packages/ui`

| Issue | Fix |
|-------|-----|
| `DataTable` sortable headers were a hand-rolled `<button>` with an `aria-hidden` glyph, so no `aria-sort` reached assistive tech — sort state was invisible to screen readers | Drive React Aria's `sortDescriptor` / `allowsSorting` from the TanStack sorting state; regression test asserts `none` → `ascending` |
| `Skeleton`'s infinite `animate-pulse` kept running under `prefers-reduced-motion`, violating the project's own motion rule | `[data-kp-control="skeleton"] { animation: none }` inside the reduced-motion block |

`tokens.css` and `apps/web/app/globals.css` both carry the reduced-motion block.
They are mirrors — edit both or the app diverges from the published tokens.

## Documentation

Every component page now has an `## Accessibility` section (`index.mdx` is the
gallery landing page and is exempt). The notes are written from the source, not
from assumption — e.g. chart points really are focusable with
`role="button"` and an `aria-label` of `"{series}: {x}, {y}"`, so the docs say so.

Known gap documented rather than silently fixed: **toasts do not pause on hover
or focus**. Default dismiss is 4200ms and `duration` is adjustable, so the docs
tell authors not to put an action's only affordance in a toast. Adding real
pause-on-hover means tracking remaining time per toast *and* pausing the Motion
countdown bar; a partial fix (timer pauses, bar keeps draining) would be worse
than the honest note.

## Consistency and dedupe

- `StudioSegmented` replaced four different toggle idioms across Theme Studio and
  gave them radiogroup semantics with arrow-key roving tabindex.
- Studio forms now dogfood `TextField` / `TextArea` / `Slider` / `Checkbox` /
  `Button` instead of raw inputs.
- `dock-shell.ts` holds the shared `dockShellSurface`, `dockSpring`, and
  `useDockDismiss` previously duplicated between the appearance dock and the
  studio dock.
- `lib/appearance-script.ts` generates the anti-FOUC script from the theme and
  radius maps instead of hard-coding them in `layout.tsx`.
- Table sort indicator is an inline SVG caret, not ASCII `^` / `v` / `·`.
  Inline rather than Phosphor: `packages/ui` deliberately ships no icon
  dependency.

## File-size rule

Split to stay under 200 lines: `content.ts` → `content-product.ts`;
`docs-gallery-catalog.ts` → `-input.ts` / `-surface.ts` re-exported from the
original path; `table.tsx` → `table-sort-glyph.tsx`.

## Invariants worth keeping

- Gallery totals are asserted by counting the catalog, not typed by hand
  (currently 6 categories / 37 items).
- `aria-hidden` glyphs may never be the only carrier of state — that was the
  root cause of the `DataTable` sort bug.
