# @hewnui/themes

Semantic OKLCH design tokens, motion tokens, and six curated theme packs (forest, tide, graphite, dune, clay, ember), with DESIGN.md, DTCG, and Tailwind v4 exports.

Part of [Hewn](https://hewnui.dev).

## Install

```bash
pnpm add @hewnui/themes
```

When installing with `@hewnui/ui`, use the same Option A line as the root
README / `@hewnui/ui` README / getting-started (React `^19.2.7` from
`@hewnui/ui` peerDependencies):

```bash
pnpm add @hewnui/ui @hewnui/themes react react-dom react-aria-components "motion@^12.42.2"
```

## CSS entrypoints

```css
@import "@hewnui/themes/tokens.css";
@import "@hewnui/themes/radius.css";
@import "@hewnui/themes/glass.css";
```

`tokens.css` is required (it already imports motion tokens). `radius.css` and
`glass.css` are opt-in.

Packs live under `@hewnui/themes/packs/*`. Public theme exports (DESIGN.md, DTCG, Tailwind `@theme`, SKILL.md) are also published on the docs site at `/themes`.

Programmatic theme authoring:

```ts
import { derivePack, BASE_PACKS } from "@hewnui/themes/authoring";
```

Docs: https://hewnui.dev/docs/themes

## License

MIT — see [LICENSE](./LICENSE).
