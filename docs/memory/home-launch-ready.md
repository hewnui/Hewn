# Homepage Launch-Ready Pass

> Status: Design validated (2026-10-21)
> Approach: A — Tighten Living Product Theater for credibility + first paint
> Scope: Marketing `/` only; docs shell untouched; no Pro pricing

---

## Understanding summary

- Make `/` feel launch-ready for developers evaluating a React component library.
- Audit against AGENTS taste rules; fix deviations; raise the value proposition.
- Audience: SaaS/dashboard builders deciding whether to invest evaluation time.
- Constraints: semantic tokens; Plex / Space Grotesk display / Plex Mono; Phosphor; 200-line files; RSC + client leaves; accurate copy only.
- Non-goals: Pro pricing, fake npm install success, inventing customers, rewriting Theme Lab/docs shell.

## Assumptions

1. Packages are not on npm yet; the repo is private — install chips and “MIT / built in the open” are false today.
2. Free component count must track the gallery/registry census (37 now; another PR may land 40).
3. Sticky AppearanceControls already prove theme/mode/material live — keep them; default first paint should not bias dark Ember.
4. AI-native surfaces that exist today: `/llms.txt`, `/ai/*`, MCP docs, Theme Studio BYOK — claim those, not vapor.

## Decision log

| Decision | Alternatives | Why |
|----------|--------------|-----|
| Approach A: tighten existing theater | Full rewrite; collapse to 5 sections | Theater already has proof chapters; credibility + taste + weight are the gaps |
| Default appearance → Forest light / solid | Keep Ember dark / glass | Taste rules forbid dark-mode bias; library provider default is already Forest |
| Hero CTAs → Docs + Theme Lab only; Getting started link (no install chip) | Keep `pnpm add` chip | Packages unpublished; install UX belongs in docs when ready |
| Ownership → “Read the docs” paths, not copyable install commands | Keep npm/CLI copy buttons | Same credibility rule; code sample stays as API preview |
| Footer license → neutral line + TODO in `docs/release-checklist.md` | Keep MIT claim | Repo private; license not public yet |
| Catalog counts derived from `galleryCategories` / `galleryTotals` | Hardcoded 37 + groups | Next component PR must not desync marketing copy |
| Claims = four pillars (Aria, themes/guardrails, motion-in-app, AI/MCP) | Keep prior four (themes/motion/a11y/states) | Matches the launch brief; States chapter remains as proof without a claim slot |
| Slim `HomeAi` band after Studio | Only footer MCP links | AI-native needs above-the-fold-adjacent presence without a sixth split |
| Hero shell as RSC; drop magnetic CTA + idle chart ticks | Keep full client hero choreography | “No heavy client JS above the fold”; motion still lives in specimen island |
| Hit targets ≥40px on home interactive chrome | Leave `min-h-9` / `size-9` | Taste rule; states toggle and scroll cue were under |

## Final design deltas

1. **Hero** — Brand wordmark eyebrow, display H1, one support sentence naming the four pillars, Docs + Theme Lab CTAs, Getting started text link, live specimen island (deferred dynamic). No install command.
2. **Claims** — Four anchors: Accessibility, Theme Studio, Product (motion in app UI), AI (new band).
3. **Catalog** — Total and group counts from gallery census; headline uses the numeric total.
4. **Ownership** — Code sample + docs/CLI doc links; no `$ pnpm add` / `$ npx` copy chips.
5. **Footer / OG** — No MIT; no hardcoded “37”; release checklist owns the open-source TODO.
6. **Defaults** — `forest` / `light` / `solid` in layout, providers, appearance script.

## Invariants

- `galleryTotals.components` equals the free `*.registry.ts` census asserted by `packages/registry/src/component-census.test.ts`.
- Home catalog group counts sum to `galleryTotals.components`.
- No homepage copy claims npm publish, MIT, open source, or Pro pricing.
- Space Grotesk only on hero H1 and brand wordmark ≥18px.
- Reduced motion and `data-motion="off"` disable autoplay/choreography.
