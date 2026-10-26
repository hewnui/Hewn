# @hewnui/ui

Accessible React components built on React Aria, Tailwind v4 and Motion: 46 application UI components with six curated themes. Part of [Hewn](https://hewnui.dev).

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

`@hewnui/themes` is required for CSS imports under pnpm (it is not hoisted from `@hewnui/ui`).

### Option B — copy the source into your project (you own the code)

```bash
npx hewnui@latest init
npx hewnui@latest add button
```

Install the same peers (including the Motion pin and React `^19.2.7`) when you go this path.

## Setup (Tailwind v4)

```css
@import "tailwindcss";
@import "@hewnui/themes/tokens.css";
@import "@hewnui/themes/radius.css";
@import "@hewnui/themes/glass.css";
@source "../node_modules/@hewnui/ui/dist/**/*.js";
```

`tokens.css` is required (it already imports motion tokens). `radius.css` and `glass.css` are opt-in. Use Tailwind CSS v4: `@tailwindcss/postcss` for Next/PostCSS, or `@tailwindcss/vite` for Vite. The Tailwind v3 PostCSS plugin is not supported.

## Usage

```tsx
import { Button, TextField } from "@hewnui/ui";

<TextField
  label="Workspace slug"
  description="Lowercase letters, numbers, hyphens."
  isInvalid={!valid}
  errorMessage="That slug is taken."
/>
<Button onPress={save}>Save workspace</Button>
```

Subpath imports:

```tsx
import { DataTable } from "@hewnui/ui/data-table";
```

## Providers

| Provider | Values |
|---|---|
| `ThemeProvider` (required) | `forest`, `tide`, `graphite`, `dune`, `clay`, `ember` |
| `MaterialProvider` | `solid`, `glass` |
| `RadiusProvider` | `sharp`, `soft`, `rounded`, `pill` |
| `MotionProvider` | `full` (default), `reduced`, `off`. Legacy `"on"` maps to `"full"`. OS `prefers-reduced-motion` caps the effective mode at `reduced`. |
| `ToastProvider` | — |

Docs and live examples: https://hewnui.dev/docs/components

## License

MIT — see [LICENSE](./LICENSE).
