# @hewnui/ui

Accessible React components built on React Aria, Tailwind v4 and Motion: 46 application UI components with six curated themes. Part of [Hewn](https://hewnui.dev).

## Install

```bash
pnpm add @hewnui/ui @hewnui/themes react react-dom react-aria-components "motion@^12.42.2"
```

| Peer | Range |
|---|---|
| react / react-dom | ^19.2.7 |
| react-aria-components | ^1.19.0 |
| motion | ^12.42.2 |

`@hewnui/themes` is required for CSS imports under pnpm (it is not hoisted from `@hewnui/ui`). Pinning Motion matches the peer range — unpinned `motion` can resolve to a newer major.

Prefer to own the source?

```bash
npx hewnui@latest add button
```

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
