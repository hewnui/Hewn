# Hewn UI

**Application UI for teams who care about accessibility and theming.**
Accessible React components built on React Aria, Tailwind v4 and Motion, with six themes that have guardrails.

[Docs](https://hewnui.dev/docs) · [Getting started](https://hewnui.dev/docs/getting-started) · [Theme Studio](https://hewnui.dev/docs/theme-studio) · [Pro waitlist](https://hewnui.dev/pro#waitlist) · [MCP (coming soon)](https://hewnui.dev/docs/mcp) · [Roadmap](https://hewnui.dev/docs/roadmap) · [Privacy](https://hewnui.dev/privacy)

## Install

### Option A — use the npm package

```bash
pnpm add @hewnui/ui @hewnui/themes react react-dom react-aria-components "motion@^12.42.2"
```

`@hewnui/ui` requires React `^19.2.7` and `react-dom` `^19.2.7` (`peerDependencies` in its package.json). Pinning Motion to `^12.42.2` matches the same peers — unpinned `motion` can resolve to a newer major.

| Peer | Supported range |
|------|-----------------|
| `react` | `^19.2.7` |
| `react-dom` | `^19.2.7` |
| `react-aria-components` | `^1.19.0` |
| `motion` | `^12.42.2` |

### Option B — copy the source into your project (you own the code)

```bash
npx hewnui@latest init
npx hewnui@latest add button
```

Install the same peers (including the Motion pin and React `^19.2.7`) when you go this path.

You can also fetch component JSON straight from the live registry:

```bash
curl -s https://hewnui.dev/r/button.json
```

Then add this to your global CSS (Tailwind v4):

```css
@import "tailwindcss";
@import "@hewnui/themes/tokens.css";
@import "@hewnui/themes/radius.css";
@import "@hewnui/themes/glass.css";
@source "../node_modules/@hewnui/ui/dist/**/*.js";
```

`tokens.css` is required (it already pulls in motion tokens). `radius.css` and `glass.css` are opt-in.

Wrap the app:

```tsx
"use client";
import { ThemeProvider, MotionProvider } from "@hewnui/ui";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="forest" defaultMode="light">
      <MotionProvider defaultMotion="full">{children}</MotionProvider>
    </ThemeProvider>
  );
}
```

Full guide: [Getting started](https://hewnui.dev/docs/getting-started)

## What's inside

| | |
|---|---|
| **46 components** | Forms, pickers, overlays, CommandPalette, Toast, Tabs, Pagination, Stepper, Table, DataTable, charts, Card, Empty, Skeleton, and more |
| **6 theme packs** | forest · tide · graphite (light/dark) · dune · clay (light) · ember (dark) |
| **Global switches** | Material (solid / glass) · Radius · Motion (`full` / `reduced` / `off`; OS reduced motion caps it) |
| **Theme Studio** | Accent → OKLCH token ladder with AA checks and CSS export |
| **AI-ready** | `/ai/index.json` schema live; read-only MCP server coming soon |
| **Docs** | Live examples, generated props, install block, TS/JS examples |

## Packages

| Package | Description |
|---|---|
| [`@hewnui/ui`](./packages/ui) | Components and providers |
| [`@hewnui/themes`](./packages/themes) | Tokens, theme packs, glass/radius/motion CSS, exports |
| [`@hewnui/motion`](./packages/motion) | Shared motion primitives and tokens |
| [`hewnui`](./packages/cli) | CLI (`npx hewnui@latest`; short `hewn` alias when installed): init, add, theme, lint |
| [`@hewnui/mcp`](./packages/mcp) | MCP server for registry and AI schema — **coming soon** (not published yet) |

## Requirements

React `^19.2.7` and `react-dom` `^19.2.7` (from `@hewnui/ui` peerDependencies), `react-aria-components` `^1.19.0`, `motion` `^12.42.2`, Tailwind CSS v4 (`@tailwindcss/postcss` for Next/PostCSS, or `@tailwindcss/vite` for Vite), and Node ≥ 22 for the CLI.

## Hewn Pro

Everything in this repo is free. Hewn Pro — prebuilt application blocks and pages — is coming later. Join the waitlist: [https://hewnui.dev/pro#waitlist](https://hewnui.dev/pro#waitlist)

## Develop

```bash
pnpm install
pnpm dev        # docs site + packages
pnpm check      # typecheck, test, build, pack and bundle checks
```

Read [`AGENTS.md`](./AGENTS.md) before contributing. `packages/ui` is the canonical source.

To run the unpublished MCP workspace package locally (contributors only):

```bash
pnpm --filter @hewnui/mcp build
node packages/mcp/dist/cli.js
```
