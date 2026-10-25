# @hewnui/themes

Semantic OKLCH design tokens, motion tokens, and six curated theme packs (forest, tide, graphite, dune, clay, ember), with DESIGN.md, DTCG, and Tailwind v4 exports.

Part of [Hewn](https://hewnui.dev).

## Install

```bash
pnpm add @hewnui/themes
```

## CSS entrypoints

```css
@import "@hewnui/themes/tokens.css";
@import "@hewnui/themes/motion.css";
@import "@hewnui/themes/radius.css";
@import "@hewnui/themes/glass.css";
```

Packs live under `@hewnui/themes/packs/*`. Public theme exports (DESIGN.md, DTCG, Tailwind `@theme`, SKILL.md) are also published on the docs site at `/themes`.

Programmatic theme authoring:

```ts
import { derivePack, BASE_PACKS } from "@hewnui/themes/authoring";
```

Docs: https://hewnui.dev/docs/themes

## License

MIT — see [LICENSE](./LICENSE).
