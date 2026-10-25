---
"@hewnui/ui": patch
"@hewnui/motion": patch
"@hewnui/themes": patch
"hewnui": patch
---

Fix the broken 0.1.0 install.

- `@hewnui/ui`, `@hewnui/motion` and `@hewnui/themes` 0.1.0 were published with plain `npm publish`, so they shipped `workspace:*` dependencies and `exports` pointing at unshipped `./src/*.ts`. 0.1.1 is published through pnpm, so `publishConfig` (dist exports) and real versions apply. A `prepublishOnly` guard now blocks `npm publish` and unbuilt exports, and `check:pack` fails on `workspace:` ranges or `.ts` export targets in the packed manifest.
- Built `dist` JS and `.d.ts` now use explicit `.js` / `/index.js` relative specifiers, so `import("@hewnui/motion")` and `@hewnui/ui` load in plain Node ESM and NodeNext TypeScript (0.1.0 dist only worked through bundlers).
- `@hewnui/ui` depends on `@internationalized/date@^3.12.2` instead of an exact pin, so it dedupes with `react-aria-components` and date types line up.
- `hewnui add`: registry files now import shared code from `../utils`, `../providers`, `../styles` (not `../../`), matching where the CLI writes them. Chart components now ship their `chart/` helpers (plus `skeleton`), and items list the npm packages (and `@types/*`) they need.
- `hewnui init` pins `motion@^12.42.2` and `react-aria-components@^1.19.0` in its install hint; the shadcn registry pins them too and gains the missing `chart` lib item.
