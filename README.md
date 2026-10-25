# Hewn UI

**Application UI for teams who care about accessibility and theming.**
Accessible React components built on React Aria, Tailwind v4 and Motion, with six themes that have guardrails.

[Docs](https://hewnui.dev) · [Getting started](https://hewnui.dev/docs/getting-started) · [Theme Studio](https://hewnui.dev/docs/theme-studio) · [Pro waitlist](https://hewnui.dev/pro#waitlist) · [MCP](https://hewnui.dev/docs/mcp) · [Roadmap](https://hewnui.dev/docs/roadmap)

## Install

Install from npm, or copy component source into your project with the CLI:

```bash
pnpm add @hewnui/ui @hewnui/themes react react-dom react-aria-components motion
npx hewnui@latest init
npx hewnui@latest add button
```

You can also fetch component JSON straight from the live registry:

```bash
curl -s https://hewnui.dev/r/button.json
```

Then add this to your global CSS (Tailwind v4):

```css
@import "tailwindcss";
@import "@hewnui/themes/tokens.css";
@import "@hewnui/themes/motion.css";
@source "../node_modules/@hewnui/ui/dist/**/*.js";
```

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
| **AI-ready** | `/ai/index.json` schema and a read-only MCP server |
| **Docs** | Live examples, generated props, install block, TS/JS examples |

## Packages

| Package | Description |
|---|---|
| [`@hewnui/ui`](./packages/ui) | Components and providers |
| [`@hewnui/themes`](./packages/themes) | Tokens, theme packs, glass/radius/motion CSS, exports |
| [`@hewnui/motion`](./packages/motion) | Shared motion primitives and tokens |
| [`hewnui`](./packages/cli) | `hewn` CLI: init, add, theme, lint |
| [`@hewnui/mcp`](./packages/mcp) | MCP server for registry and AI schema |

## Requirements

React 19 (`^19.2.7`), `react-aria-components` ^1.19, `motion` ^12.42, Tailwind CSS v4 (`@tailwindcss/postcss`), and Node ≥ 22 for the CLI.

## Hewn Pro

Everything in this repo is free. Hewn Pro — prebuilt application blocks and pages — is coming later. Join the waitlist: [https://hewnui.dev/pro#waitlist](https://hewnui.dev/pro#waitlist)

## Develop

```bash
pnpm install
pnpm dev        # docs site + packages
pnpm check      # typecheck, test, build, pack and bundle checks
```

Read [`AGENTS.md`](./AGENTS.md) before contributing. `packages/ui` is the canonical source.

```bash
pnpm --filter @hewnui/mcp build
node packages/mcp/dist/cli.js
```
