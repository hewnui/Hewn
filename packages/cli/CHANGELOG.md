# hewnui

## 0.1.2

### Patch Changes

- 30e5e57: Fix motion/material/radius hooks to work without their providers (safe defaults; OS reduced-motion still wins), and make `hewn init` detect `src/` layouts plus tsconfig/jsconfig path aliases so components land under `src/components/hewn` with the correct import alias.

  Also expose DatePicker's React Aria value/defaultValue/onChange/name (and related) props on the public typed API so controlled and form usage type-checks.

  Allow ThemeProvider to accept custom pack ids (e.g. Theme Studio `studio-draft`) so exported CSS can drive `data-theme`. Strip unpublished workspace-only packages (`@hewnui/tsconfig`, etc.) from packed manifests via prepack/postpack.

  These four packages are in one changesets `linked` group and all ship changed published tarballs (provider/CLI/DatePicker/ThemeProvider in ui+cli; pack prepack scripts on motion/themes/ui/cli).

## 0.1.1

### Patch Changes

- 60f407e: Fix the broken 0.1.0 install.

  - `@hewnui/ui`, `@hewnui/motion` and `@hewnui/themes` 0.1.0 were published with plain `npm publish`, so they shipped `workspace:*` dependencies and `exports` pointing at unshipped `./src/*.ts`. 0.1.1 is published through pnpm, so `publishConfig` (dist exports) and real versions apply. A `prepublishOnly` guard now blocks `npm publish` and unbuilt exports, and `check:pack` fails on `workspace:` ranges or `.ts` export targets in the packed manifest.
  - Built `dist` JS and `.d.ts` now use explicit `.js` / `/index.js` relative specifiers, so `import("@hewnui/motion")` and `@hewnui/ui` load in plain Node ESM and NodeNext TypeScript (0.1.0 dist only worked through bundlers).
  - `@hewnui/ui` depends on `@internationalized/date@^3.12.2` instead of an exact pin, so it dedupes with `react-aria-components` and date types line up.
  - `hewnui add`: registry files now import shared code from `../utils`, `../providers`, `../styles` (not `../../`), matching where the CLI writes them. Chart components now ship their `chart/` helpers (plus `skeleton`), and items list the npm packages (and `@types/*`) they need.
  - `hewnui init` pins `motion@^12.42.2` and `react-aria-components@^1.19.0` in its install hint; the shadcn registry pins them too and gains the missing `chart` lib item.

## 0.1.0

### Minor Changes

- e290de3: Add `hewn lint` for tokens-only, AA contrast, reduced-motion, labelled overlays, and destructive-confirm checks.
- e290de3: Initial public release: free component catalog from the registry census (46 at first cut), six curated theme packs, tinted glass material, integrated motion system, npm subpath distribution, static registry, and the Hewn CLI.

### Patch Changes

- e290de3: Add free Card, Empty, and DonutChart components with docs, demos, registry metadata, and AI schemas.
