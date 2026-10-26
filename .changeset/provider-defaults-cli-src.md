---
"@hewnui/ui": patch
"@hewnui/motion": patch
"@hewnui/themes": patch
"hewnui": patch
---

Fix motion/material/radius hooks to work without their providers (safe defaults; OS reduced-motion still wins), and make `hewn init` detect `src/` layouts plus tsconfig/jsconfig path aliases so components land under `src/components/hewn` with the correct import alias.

Also expose DatePicker's React Aria value/defaultValue/onChange/name (and related) props on the public typed API so controlled and form usage type-checks.

Allow ThemeProvider to accept custom pack ids (e.g. Theme Studio `studio-draft`) so exported CSS can drive `data-theme`. Strip unpublished workspace-only packages (`@hewnui/tsconfig`, etc.) from packed manifests via prepack/postpack.

These four packages are in one changesets `linked` group and all ship changed published tarballs (provider/CLI/DatePicker/ThemeProvider in ui+cli; pack prepack scripts on motion/themes/ui/cli).
