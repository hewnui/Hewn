# Hewn v2 — Validated Design Specification

> Last updated: 2026-10-21  
> Status: Validated; Phase 1–7 planned slices complete; marketing home, Theme Lab/Studio dashboard, and site audit landed on main

## Understanding summary

- Hewn is a rich React component library for SaaS/dashboard builders and full-stack teams.
- It ships through npm subpath exports and a copy-to-project CLI.
- React Aria Components supplies accessible behavior, complex widgets, collections, and internationalization.
- TanStack Table and Virtual are used selectively for advanced data components.
- Tailwind CSS v4 and semantic OKLCH tokens provide themeable styling.
- Motion for React is integrated into component behavior, with global disable and reduced-motion fallbacks.
- Fumadocs powers public documentation inside the Next.js app.
- Free core ships the components listed in the free registry census (generated; do not hard-code the count); paid customized components, blocks, and dashboards follow later.

## Assumptions

- React-only v1.
- Latest stable Next.js 16, React 19, Tailwind v4, pnpm 11, and Turborepo.
- TypeScript is canonical; JavaScript consumers receive compiled npm output or generated JSX.
- IBM Plex Sans, Space Grotesk (display), IBM Plex Mono, and Phosphor icons define the default typography/icon stack. Space Grotesk is reserved for marketing hero H1 and brand wordmark (≥18px).
- No authentication, payments, license validation, database, or visual page builder in v1.
- The public docs and free registry can deploy statically.
- A small maintainer team owns the project, so generated artifacts and consistent APIs are mandatory.
- Accessibility, SSR, keyboard support, touch behavior, and reduced motion are release requirements.

## Decision Log

| Area | Decision | Alternatives | Reason |
|------|----------|--------------|--------|
| Behavior | React Aria Components | Radix, Base UI, Ark UI | Best fit for rich React widgets, a11y, i18n |
| Source model | Unified canonical source | Registry-first, individual packages | Prevent npm/CLI/docs drift |
| Language | TypeScript | JavaScript | Typed APIs and generated declarations |
| JS support | Generate JSX from TSX | TS-only, duplicate source | Broad compatibility without double maintenance |
| API | Compound where structured | Prop-heavy black boxes | Composable and styleable internal parts |
| Data | TanStack selectively | Custom engines | Mature advanced table/virtual behavior |
| Styling | Tailwind v4 + OKLCH tokens | CSS-in-JS | Lightweight, static, themeable output |
| Motion | Motion for React per component | CSS-only, demo-only motion | Rich layout/presence/gesture behavior |
| Motion control | Global `full` \| `reduced` \| `off` | Per-component mode props; binary on/off | Consistency; OS reduced-motion remains authoritative and can only be reduced further |
| Material | Global solid/glass | Per-component glass props | Cohesive visual system |
| Themes | Six curated packs | Accent-only themes | Distinct complete identities |
| Docs | Fumadocs + custom shell | Custom docs engine, stock Fumadocs UI | Mature UX with original branding |
| Docs IA | HeroUI-inspired categories | Flat component list | Fast component discovery |
| Theme Lab | One active theme | Side-by-side matrix | Cleaner realistic preview |
| Distribution | npm + CLI | Single channel | Consumer choice and future Pro registry |
| Monetization | Tiered registry later | Lock free primitives | Pro blocks/dashboards without harming core |
| Growth roadmap | Moat-first: theme platform + AI-native | Adoption-first, revenue-first, parity | Defensibility over size; see docs/memory/theme-studio-ai-roadmap.md |

## Architecture

```text
Hewn/
├── apps/
│   └── web/
├── packages/
│   ├── ui/
│   ├── themes/
│   ├── motion/
│   ├── registry/
│   ├── cli/
│   ├── docs-metadata/
│   ├── mcp/
│   └── tsconfig/
├── tooling/
├── docs/
└── AGENTS.md
```

`packages/ui` is the only manually maintained component implementation. Builds derive npm subpaths, declarations, CLI registry source, JavaScript variants, docs metadata, and examples.

### Component folder

```text
button/
├── button.tsx
├── button.styles.ts
├── button.motion.ts
├── button.types.ts
├── button.examples.tsx
├── button.test.tsx
├── button.registry.ts
└── index.ts
```

Files are created only when they hold real responsibility.

## Component model

React Aria supplies behavior behind a Hewn-owned public API.

```tsx
<Select.Root>
  <Select.Trigger />
  <Select.Popover>
    <Select.ListBox>
      <Select.Item />
    </Select.ListBox>
  </Select.Popover>
</Select.Root>
```

Simple controls remain concise:

```tsx
<Button variant="primary" size="md" isLoading>
  Save changes
</Button>
```

Public APIs must not leak React Aria implementation details unnecessarily. Components use semantic tokens and expose stable slots for customization.

## Theme system

Theme packs control:

- Semantic colors
- Typography roles
- Radius scale
- Surface depth and shadows
- Glass tint and refraction
- Control density
- Motion timing and spring character

### Packs

| Pack | Modes | Identity |
|------|-------|----------|
| Forest | light, dark | Moss and emerald; grounded organic product UI |
| Tide | light, dark | Mineral neutrals and desaturated teal |
| Graphite | light, dark | Technical neutral and restrained steel-blue |
| Dune | light | Sand, ochre, soft paper surfaces |
| Clay | light | Warm stone and terracotta |
| Ember | dark | Charcoal and burnt orange |

Unsupported combinations are never auto-generated.

## Material system

Global material modes:

- `solid`: structured product surfaces and separators.
- `glass`: accent-tinted translucent surfaces with blur, saturation, refraction edge, and layered shadow.

Glass includes an opaque fallback. Components do not expose individual glass props.

## Motion system

Motion is specified per component:

- Button: press spring and icon transitions
- Tabs: shared active indicator
- Dialog/Popover: spring entrance and subtle exit
- Menu/ListBox: staggered items
- Checkbox/Switch: contextual state animation
- Table/GridList: layout transitions during sorting/filtering
- Toast: interruptible spring stack
- Skeleton: restrained shimmer

Simple hover/focus feedback uses CSS. Presence, orchestration, and gesture behavior use `motion/react` through `LazyMotion`. Animate transform, opacity, and filter only — never layout properties. Shared duration/easing tokens live in `@hewnui/themes/motion.css` and `@hewnui/motion`. Modes `full` | `reduced` | `off` write `data-motion` on the root; OS `prefers-reduced-motion` caps effective mode at `reduced`.

## Documentation

Fumadocs powers MDX, search, navigation, table of contents, code rendering, and content infrastructure. Hewn owns the entire visual shell.

### Routes

```text
/docs
/docs/getting-started
/docs/components
/docs/components/[slug]
/docs/themes
/docs/theme-lab
/docs/theme-studio
/docs/cli
/docs/mcp
/docs/roadmap
```

### Component gallery

Registry categories in use (8):

Buttons, Data Display, Date and Time, Feedback, Forms, Navigation, Overlays, and Pickers.

Schema still reserves Collections, Layout, Media, Typography, and Utilities for later.

Gallery items use interactive miniatures and may display New, Updated, or Pro status.

### Component pages

Every page includes:

1. Description
2. Live production component
3. Theme/mode/material/motion/state/variant controls
4. npm and CLI install tabs
5. TypeScript and JavaScript examples
6. Generated API reference
7. Keyboard and accessibility notes
8. Relevant loading, empty, error, disabled, and validation states

### Theme Lab

Theme Lab displays one theme at a time. Selection persists during navigation and styles both the Fumadocs shell and component previews. Controls only show supported modes.

## Generation flow

```text
packages/ui
  ├── build → npm package + subpaths + declarations
  ├── generate → TSX/JSX registry artifacts
  ├── generate → free/pro manifests
  └── generate → Fumadocs API/example metadata
```

Generation fails when required component metadata, examples, states, tier, or docs information is missing.

## Error handling

- Invalid theme falls back to Forest Light.
- Unsupported theme mode normalizes to the pack default.
- Reduced-motion always overrides motion settings.
- Missing providers use safe defaults and development warnings.
- Theme attributes apply before paint to avoid hydration flash.
- Motion loading failure preserves static interactions.
- Glass feature failure returns an opaque tinted surface.
- Missing generated metadata fails CI rather than silently degrading docs.
- Pro registry items cannot enter the public free index.

## Testing

In place today:

| Layer | Coverage |
|-------|----------|
| Vitest | Tokens, variants, utilities, generators, package unit tests |
| React Testing Library (+ jsdom, user-event) | Component behavior and state in `@hewnui/ui` |
| Build tests | npm subpaths, declarations, JSX generation, Fumadocs |
| Bundle checks | Representative subpaths and lazy motion chunks |

Planned (not installed yet):

| Layer | Coverage |
|-------|----------|
| Axe | Accessibility violations |
| Playwright | Keyboard flows, overlays, persistence, docs (`test:e2e` not wired) |
| Visual snapshots | Curated themes/modes/materials/states |

## Release gates

A component cannot ship without:

- Public types
- Tests
- Registry metadata and tier
- Docs page
- Live examples
- Accessibility/keyboard notes
- Applicable loading, empty, error, disabled, and validation states
- TypeScript and generated JavaScript output
- Successful npm and Fumadocs builds

## Risks

| Risk | Mitigation |
|------|------------|
| React Aria API coupling | Stable Hewn wrappers and contract tests |
| Motion bundle growth | `LazyMotion`, subpaths, bundle checks |
| Theme matrix explosion | Curated supported modes only |
| Generated output drift | Generation checks in CI |
| Docs scope growth | Generated metadata and reusable preview primitives |
| Table complexity | TanStack only in advanced data layer |

## Implementation phases

### Phase 1 — Foundation

Status: scaffold, docs plumbing, tokens, and providers implemented; generation
contracts and schemas remain before Phase 1 is complete.

- pnpm/Turbo/TypeScript monorepo
- Latest stable Next.js and installed framework docs check
- Fumadocs plumbing inside `apps/web`
- Semantic token schema
- Theme, mode, material, and motion providers
- Forest theme with light/dark as reference implementation
- Generation contracts and schemas

### Phase 2 — Reference components

Status: Button, TextField, Checkbox, Switch, Dialog, Select, Tabs, Table +
gallery docs shipped. Phase 2 reference set complete.

- Button
- TextField/Input
- Checkbox
- Switch
- Dialog
- Select/ListBox
- Tabs
- Table foundation
- HeroUI-style component gallery and detail template

### Phase 3 — Theme breadth

Status: Tide, Graphite, Dune, Clay, Ember packs, Theme Lab, glass tuning, and
visual matrix docs shipped.

- Tide, Graphite, Dune, Clay, Ember
- Theme Lab
- Tinted glass treatments
- Visual test matrix

### Phase 4 — Rich free core

Status: DatePicker, Combobox, Menu, Toast, Drawer, Progress, Skeleton, and
DataTable (TanStack) shipped with docs.

- Date/time controls
- Combobox/Autocomplete
- Menus, Toast, Drawer
- Collections and feedback components
- Advanced TanStack data components

### Phase 5 — Distribution

Status: implemented (2026-07-29). npm subpath builds (tsc emit + generated
`publishConfig.exports`), static free registry at `/r/*.json`, zero-dep CLI
(`hewnui`: init/add/theme/login with stub license), changesets + CI, Pro stubs via
`index.pro.json` (metadata only, no source).

- npm subpath publication
- CLI TS/JS project detection
- Registry generation
- Static free registry deployment
- Pro tier stubs without payment/auth implementation

### Phase 6 — Theme platform

Status: complete through 6.7 (`llms.txt`); Phase 7 planned slices complete.

- Authoring engine in `packages/themes` (token schema, derivation, OKLCH ramps, contrast validation)
- Theme Studio at `/docs/theme-studio` (free: accent seed, radius presets, CSS export)
- Pro authoring groups (neutrals/surfaces, semantic colors, shape/density, glass, motion character) — stub-gated
- Pro exporters (Tailwind v4 `@theme`, Style Dictionary JSON, Figma variables JSON) — stub-gated
- Generated Figma community kit (tokens + core sticker sheet)
- Charts signature family (Sparkline, LineChart, AreaChart, BarChart) on d3 primitives + Motion
- `llms.txt` generated from free registry via `@hewnui/docs-metadata`

### Phase 7 — AI-native

Status: complete for planned slices — 7.1–7.4 (schema, MCP, Pro stub, Studio AI).

- Canonical machine-readable component schema (docs-metadata deepened, versioned, CI-gated)
- `@hewnui/mcp` read-only stdio MCP server over the registry
- Pro components/blocks delivered via MCP (stubs until licensing exists)
- AI theme generation/migration in Studio (BYOK, client-side)
- Deferred: payments / real license validation, premium context packs, private team registries, community theme sharing
- Shipped: Playwright Chromium smoke against `next build` + `next start` (`pnpm test:e2e`, CI `e2e` job)

## Brainstorming exit criteria

- [x] Understanding Lock confirmed
- [x] Architecture approach accepted
- [x] Repository architecture accepted
- [x] Component/theme/motion design accepted
- [x] Fumadocs and generation flow accepted
- [x] Resilience/testing design accepted
- [x] Decision Log confirmed
- [x] Risks documented
