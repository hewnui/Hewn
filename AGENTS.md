# AGENTS.md
> Last updated: 2026-10-21
> LLM memory file. Read this before touching any code. Do not re-read source files covered here.

---

## FRAMEWORK WARNING

- This project targets **Next.js 16 + React 19 + Tailwind CSS v4 + React Aria Components**.
- ALWAYS read `node_modules/next/dist/docs/` before writing Next.js code once dependencies are installed.
- Heed deprecations in framework documentation shipped with the repository.
- Tailwind v4 uses `@tailwindcss/postcss`; never configure the legacy v3 PostCSS plugin.
- Current Framer Motion is installed as `motion` and imported from `motion/react`.

---

## PROJECT STRUCTURE

```text
Hewn/
├── apps/
│   └── web/                    # Next.js marketing + Fumadocs + Theme Lab + Theme Studio
├── packages/
│   ├── ui/                     # Canonical TypeScript component source (count = free registry)
│   ├── themes/                 # Theme packs, semantic tokens, glass material
│   ├── motion/                 # Shared Motion presets and LazyMotion features
│   ├── registry/               # Generated free/pro manifests and source output
│   ├── cli/                    # init/add/theme/lint commands
│   ├── docs-metadata/          # llms.txt + AI schema generation
│   ├── mcp/                    # Read-only stdio MCP server
│   ├── site-url/               # Canonical site / registry origin (one-line swap)
│   └── tsconfig/               # Shared TypeScript configurations
├── tooling/
│   ├── build-registry.ts
│   ├── build-docs-metadata.ts
│   ├── check-site-url.ts
│   └── sync-site-url.ts
├── docs/
│   ├── design-hewn-v2.md
│   └── memory/
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── AGENTS.md
```

The Phase 1 foundation scaffold is implemented and production-buildable.

Note: `packages/docs-metadata` ships `llms.txt` + AI schema v1 generation; `packages/mcp` is the read-only stdio MCP server.

---

## PROJECT MEMORY

### Key Decisions

| Area | Decision | Reason |
|------|----------|--------|
| Monorepo | pnpm 11 workspaces + Turborepo | Share source and generated artifacts |
| Web | Next.js 16 App Router | Marketing and public docs in one deployment |
| Behavior | React Aria Components | Rich widgets, accessibility, i18n, collections |
| Data | TanStack Table/Virtual selectively | Advanced data behavior without rebuilding engines |
| Styling | Tailwind CSS v4 + semantic OKLCH tokens | Custom themes without runtime CSS-in-JS |
| Source | TypeScript | Typed public APIs and generated declarations |
| JS support | CLI generates JSX from canonical TSX | Support TS and JS consumers without duplicate source |
| API style | Compound components where structure matters | Composition over prop-heavy black boxes |
| Motion | Motion for React integrated per component | Premium interactions; `LazyMotion` controls bundle cost |
| Motion control | Global `full` \| `reduced` \| `off`; OS reduced-motion always wins | Consistency and accessibility |
| Material | Global `solid` or tinted-frosted `glass` | Distinct visual option without per-component prop soup |
| Themes | Forest, Tide, Graphite, Dune, Clay, Ember | Curated visual identities, not accent swaps |
| Theme modes | Forest/Tide/Graphite dual; Dune/Clay light; Ember dark | Intentional combinations only |
| Docs | Fumadocs infrastructure + custom Hewn shell | Mature UX without generic template visuals |
| Theme Lab | One active theme at a time | Clear testing with persistent global controls |
| Distribution | npm subpaths + CLI registry from one source | Hybrid ownership without implementation drift |
| Monetization | Registry `tier: free \| pro` | Paid components, blocks, dashboards later |
| Growth roadmap | Moat-first: theme platform + AI-native (Phase 6–7) | Defensibility over component count; design in `docs/memory/theme-studio-ai-roadmap.md` |
| Auth/payments | Deferred | No checkout, accounts, or license API in v1 |
| Full design | `docs/design-hewn-v2.md` | Validated architecture and Decision Log |

### Implemented Features

| Feature | Entry point |
|---------|-------------|
| pnpm/Turbo/TypeScript workspace | Root configs |
| Forest light/dark semantic tokens | `packages/themes/src/packs/forest.css` |
| Tide, Graphite, Dune, Clay, Ember packs | `packages/themes/src/packs/` |
| Opt-in tinted glass layer | `packages/themes/src/glass.css` |
| Theme Lab (dashboard-style levels) + visual matrix docs | `apps/web/content/docs/theme-lab.mdx`, `themes/`, `apps/web/components/demos/theme-lab/` |
| Shared Motion presets and lazy features | `packages/motion/src/index.ts` |
| Theme/material/motion providers | `packages/ui/src/providers/` |
| Next.js marketing home (Living Product Theater + product chapter) | `apps/web/app/page.tsx`, `apps/web/components/home/`, `docs/memory/home-revamp.md`, `docs/memory/home-product-chapter.md` |
| Fumadocs MDX plumbing and docs shell | `apps/web/app/docs/` |
| Persistent appearance controls | `apps/web/components/appearance-controls.tsx` |
| Global radius scale (sharp/soft/rounded/pill) | `packages/ui/src/providers/radius-provider.tsx` |
| Panel radius token (menus/dialogs never full-pill) | `--kp-radius-panel` in themes |
| Button reference component | `packages/ui/src/components/button/` |
| TextField, TextArea, NumberField, SearchField, InputGroup | `packages/ui/src/components/` |
| PasswordField, InputOTP, FileUpload | `packages/ui/src/components/` |
| Checkbox, CheckboxGroup, RadioGroup, Switch, Slider, Form | `packages/ui/src/components/` |
| Dialog, Select, Tabs | `packages/ui/src/components/` |
| Tooltip, Popover, Breadcrumbs, Link | `packages/ui/src/components/` |
| Table foundation | `packages/ui/src/components/table/` |
| DatePicker, Combobox, Menu, Toast, Drawer | `packages/ui/src/components/` |
| Progress, Skeleton, Spinner, Badge, DataTable | `packages/ui/src/components/` |
| Free components (gallery + registry census) | `packages/ui/src/components/` / `packages/registry/generated/index.free.json` |
| Component gallery + docs pages | `apps/web/content/docs/components/` |
| Registry contracts + generator (free/pro manifests, JSX variants) | `packages/registry/`, `tooling/build-registry.ts` |
| Static registry serving (`/r/*.json`) | `apps/web/public/r/` via `tooling/sync-registry-public.ts` |
| npm subpath builds + exports sync + pack verification | `packages/*/tsconfig.build.json`, `tooling/sync-exports.ts`, `tooling/check-pack.ts` |
| CLI (init/add/theme/lint, zero runtime deps; TS peer for lint AST) | `packages/cli/` |
| Changesets (linked releases) + bundle budgets + CI | `.changeset/`, `tooling/check-bundle.ts`, `.github/workflows/ci.yml` |
| CLI + roadmap docs pages | `apps/web/content/docs/cli.mdx`, `roadmap.mdx` |
| Theme authoring engine + Studio MVP + dashboard workspace | `packages/themes/src/authoring/`, `/docs/theme-studio`, `apps/web/components/theme-studio/studio-dashboard/` |
| Pro authoring groups (stub-gated UI) | Override map groups + `StudioProControls` |
| Pro exporters (stub-gated UI) | `@theme` / Style Dictionary / Figma vars via authoring |
| Figma kit (Tokens Studio + sticker SVG) | `packages/themes/figma/`, `/docs/themes/figma-kit` |
| Charts (Sparkline, Line, Area, Bar) | `packages/ui/src/components/{sparkline,line-chart,area-chart,bar-chart}/` |
| llms.txt (generated docs index) | `packages/docs-metadata/`, `/llms.txt` |
| AI component schema v1 | co-located `*.ai.ts` → `/ai/index.json` + `/ai/components/*.json` |
| MCP server (stdio, read-only) | `packages/mcp/` (`hewn-mcp` bin) |
| Theme Studio AI generate (BYOK + offline) | `apps/web/components/theme-studio/studio-ai*` + `packages/themes/src/authoring/propose.ts` |
| Pro-via-MCP | Fail-closed until payments; `@hewnui/mcp` private for 0.1.0 |
| Vercel Analytics + Speed Insights | `apps/web/app/layout.tsx` (`@vercel/analytics`, `@vercel/speed-insights`) |
| Full-site audit (SEO, a11y, credibility) | `docs/memory/site-audit-2026-08.md` |

### Known Gotchas

- Next.js 16.2.10's build worker crashes with TypeScript 7.0.2; use TypeScript 6.0.3 until Next supports 7.
- Bundler-mode tsconfigs skip `node:`-schemed imports. Node-tooling packages (`registry`, `cli`) use bare core specifiers (`fs`, `path`) plus `"types": ["node"]`; the CLI builds under `module: NodeNext` so the typechecker enforces Node-runnable output.
- Dev `exports` in publishable packages point at `src` (no build needed in dev); `publishConfig.exports` points at `dist` and is generated by `tooling/sync-exports.ts` — never hand-edit it.
- `hewn` is taken on npm, so the CLI ships as the unscoped `hewnui` package with two bins: `hewn` (installed/global use) and `hewnui` (so `npx hewnui …` resolves the bin unambiguously). Docs use `npx hewnui@latest …`. Library packages use the `@hewnui/*` scope. The old `komponents` name was squatted on npm.
- Canonical site / registry origin lives in `packages/site-url` (`DEFAULT_SITE_URL`, `https://hewnui.dev`; `hewnui.com` is the secondary that redirects; the pre-rename `komponents-dev.vercel.app` keeps serving and can be pinned via `NEXT_PUBLIC_SITE_URL` / `HEWN_SITE_URL` until DNS is live). Swap to a real domain by changing that one constant, then `pnpm sync:site-url && pnpm generate` and `pnpm check:site-url`. `sync:site-url` embeds the URL into the CLI and `apps/web` (so Next/Vercel never need a workspace package for a string constant). Overrides: `HEWN_SITE_URL` (llms/docs; legacy `KOMPONENTS_SITE_URL` still read), `NEXT_PUBLIC_SITE_URL` (web metadata), `HEWN_REGISTRY_URL` or `hewn.json` `registry` (CLI). Never hard-code an unregistered placeholder domain — CI runs `check:site-url` (DNS probe is GitHub Actions only; never on Vercel; skip with `SKIP_SITE_URL_DNS=1`).

---

## CODE RULES

### Required skills

Before planning or implementing any UI, component, page, docs shell, or interactive surface:

1. Read and follow `design-taste-frontend`.
2. Use `brainstorming` before architecture or product-scope changes.
3. Apply `make-interfaces-feel-better` when reviewing UI polish.
4. Use `scaffold-fumadocs-docs` when scaffolding the Fumadocs integration.

Do not begin implementation until brainstorming reaches its confirmation and Decision Log gates.

### Source-of-truth rule

`packages/ui` is canonical. npm exports, CLI registry files, JavaScript variants, docs API metadata, and examples are generated from it. Never maintain parallel implementations manually.

### Component folder contract

```text
component-name/
├── component-name.tsx
├── component-name.styles.ts
├── component-name.motion.ts
├── component-name.types.ts
├── component-name.examples.tsx
├── component-name.test.tsx
├── component-name.registry.ts
├── component-name.ai.ts
└── index.ts
```

Split files only when the responsibility exists; do not create empty boilerplate files.

### Component requirements

- React Aria owns behavior; Hewn owns API, visuals, themes, glass, and motion.
- Use compound APIs for structured components and concise props for simple controls.
- All components use semantic tokens; never hard-code theme-specific colors.
- Motion is part of component behavior, not a decorative demo-only option.
- Every interactive component supports keyboard, touch, screen readers, SSR, and reduced motion.
- Provide loading, empty, error, disabled, and validation states where relevant.
- Keep `'use client'` at the smallest interactive leaf.
- Use TanStack only for advanced data behavior; avoid unnecessary abstraction.

### Visual rules

- Design defaults: variance 8, motion 6, density 4.
- No purple/lila default, neon glow, pure black, Inter, emoji, or generic centered hero.
- Use IBM Plex Sans + Space Grotesk (display) + IBM Plex Mono, and Phosphor icons.
- Display (Space Grotesk) is for marketing hero H1 and brand wordmark ≥18px only — never UI chrome.
- Headings use balanced wrapping; body text uses pretty wrapping.
- Dynamic numbers use tabular numerals.
- Interactive hit targets are at least 40×40px.
- Press feedback uses `scale(0.96)`.
- Use concentric radii and tinted layered shadows.
- Never use `transition: all`; list exact transition properties.
- Use `min-h-[100dvh]`, never `h-screen`, for full-height sections.
- Glass uses tint, blur, saturation, inner refraction edge, and opaque fallback.

### Motion rules

- Import current Motion APIs from `motion/react`.
- Use `LazyMotion` and load advanced features lazily.
- Animate transform, opacity, and filter; never animate layout properties continuously.
- Use layout transitions for sorting/reordering and `AnimatePresence initial={false}` for default-state UI.
- Infinite motion must be isolated, memoized, and disabled for reduced motion.
- Every `useEffect` animation must clean up.

### Atomic todos

- One todo represents one file or one function, never both.
- Each todo must be independently reversible and testable.
- Split multi-file changes into separate todos.

### File size

- Hard limit: 200 lines per source file.
- Split by responsibility before reaching the limit.

### Anti-patterns

- No direct React Aria exports as the public Hewn API.
- No separate hand-maintained TSX and JSX component trees.
- No business logic in `packages/ui`.
- No per-component `glass` prop; material is global.
- No secrets, committed environment values, or premature auth/payment code.
- No wrapper functions that only return their arguments.
- No generated files edited by hand.
- No mixing GSAP/Three.js with Motion in the same component tree.

### Naming conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `DatePicker.tsx` |
| Compound parts | Component.Part | `Select.Trigger` |
| Hooks | useCamelCase | `useTheme.ts` |
| Utilities | camelCase | `createRegistry.ts` |
| Types | PascalCase | `ThemePack` |
| Component folders | kebab-case | `date-picker/` |
| Registry names | kebab-case | `dashboard-analytics` |
| Theme ids | kebab-case | `forest-dark` |
| Docs | kebab-case MDX | `getting-started.mdx` |
| API routes | kebab-case/route | `r/[name]/route.ts` |

---

## DOCS RULE

Public documentation lives inside `apps/web` and is powered by Fumadocs. It is not a separate local-only application.

- Fumadocs owns MDX, search, navigation, TOC, code rendering, and content plumbing.
- Hewn owns the shell, colors, spacing, interactions, previews, and Theme Lab.
- Information architecture may be inspired by HeroUI, but visual design must remain original.
- Theme selection styles the docs shell and component previews.
- Theme Lab shows one theme at a time with compatible mode, material, motion, state, and variant controls.
- Every public component needs docs, examples, keyboard notes, API metadata, install commands, and applicable states.
- Docs offer TypeScript and JavaScript examples plus npm and CLI installation.
- Missing required docs metadata fails the build.

### Docs sections

| Section | Purpose |
|---------|---------|
| getting-started | Installation, providers, Tailwind setup |
| components | Categorized component gallery and detail pages |
| themes | Pack design, modes, tokens, customization |
| theme-lab | Dashboard-style pack preview by level |
| theme-studio | Authoring MVP, dashboard workspace, AI generate |
| cli | init, add, theme, and lint |
| mcp | Read-only MCP server docs |
| roadmap | Free/Pro boundaries and planned work |

### Component categories

Registry categories in use (8): Buttons, Data Display, Date and Time, Feedback, Forms, Navigation, Overlays, and Pickers. Schema still reserves Collections, Layout, Media, Typography, and Utilities for later.

### MDX minimum

```mdx
---
title: Component Name
description: Concrete one-line description
status: stable
tier: free
---

# Component Name

Usage, examples, states, accessibility, and API.
```

---

## BEFORE WRITING CODE

1. Read this file and `docs/design-hewn-v2.md`.
2. Run the mandatory skill workflow.
3. Read installed Next.js docs before using Next.js APIs.
4. Confirm free vs Pro scope.
5. Check the component folder contract and 200-line limit.
6. Verify every third-party dependency before importing it.
7. Plan atomic todos.
8. Ensure docs, tests, registry metadata, TSX, and generated JSX are covered.

---

## TESTING AND RELEASE GATES

In place today:

- Vitest: tokens, utilities, variants, generators, package unit tests.
- React Testing Library (+ jsdom, user-event): component behavior and states in `@hewnui/ui`.
- Build tests: npm subpaths, TS declarations, generated JSX, Fumadocs.
- Bundle checks: representative component subpaths and lazy Motion chunks.
- Public release fails if docs, tests, metadata, states, or tier validation are missing.

Planned (not installed yet):

- Axe: accessibility violations.
- Playwright: keyboard flows, overlays, themes, docs navigation (`test:e2e` not wired).
- Visual snapshots: curated theme/mode/material combinations.

---

## QUICK COMMANDS

From the real root `package.json`:

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Run workspace development tasks |
| `pnpm --filter web dev` | Marketing + Fumadocs |
| `pnpm build` | Production workspace build |
| `pnpm test` | Unit/component tests |
| `pnpm generate` | Registry + Fumadocs generation |
| `pnpm sync:exports` | Regenerate publishConfig.exports from the filesystem (`--check` for CI) |
| `pnpm sync:site-url` | Embed `DEFAULT_SITE_URL` into the CLI (zero runtime deps) |
| `pnpm check:pack` | Pack all publishable packages and verify export targets |
| `pnpm check:bundle` | Bundle-size budgets on representative subpaths |
| `pnpm check:site-url` | Fail if a forbidden/unresolvable site host reappears |
| `pnpm check` | typecheck + test + build + check:pack + check:bundle + check:docs-seo + check:site-url |
| `pnpm test:e2e` | Production build of `web` + Playwright Chromium smoke |
| `pnpm --filter web test:e2e:install` | Install Playwright Chromium (+ OS deps) |
| `pnpm test:visual` | Production build + Playwright visual regression (`toHaveScreenshot`) |
| `pnpm test:visual:update` | Rebuild baselines on the host (prefer Docker — see below) |
| `pnpm test:visual:docker` | Run visual tests in `mcr.microsoft.com/playwright:v1.64.1-jammy` |
| `pnpm test:visual:docker:update` | **Preferred** — regenerate committed baselines inside that Linux image |
| `pnpm --filter web visual:contact-sheet` | Stitch theme×mode gallery tiles into a review contact sheet |
| `pnpm changeset` | Add a changeset |
| `pnpm version` | Apply changesets (version bump + changelogs) |
| `pnpm release` | Build + pack check + publish via changesets |

Playwright smoke lives in `apps/web/e2e/` (non-`visual/`) and runs against `next build` + `next start` (CI `e2e` job).

Visual regression lives in `apps/web/e2e/visual/` against the noindexed `/qa/visual` gallery plus homepage hero and one docs page. Baselines are committed under `*-snapshots/` and **must** be generated with `pnpm test:visual:docker:update` so they match the CI `visual` job (same Playwright Docker image). After updating snapshots, run `pnpm --filter web visual:contact-sheet` if the Docker script did not already write `apps/web/e2e/visual/artifacts/theme-mode-contact-sheet.png`.

---

## PROJECT IDENTITY

| Field | Value |
|-------|-------|
| Project name | Hewn |
| Purpose | Rich, motion-native, multi-theme React component library with npm and CLI distribution |
| Primary users | SaaS/dashboard builders, then full-stack product teams |
| Main app | `apps/web` |
| Canonical UI | `packages/ui` |
| Docs | Fumadocs under `apps/web/app/docs/` |
| Memory path | `docs/memory/` |
| Primary branch | `main` |
| Phase | 7 — AI-native planned slices complete (7.1–7.4); Phase 6 complete |
