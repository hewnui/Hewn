---
"@hewnui/ui": patch
"hewnui": patch
---

Fix motion/material/radius hooks to work without their providers (safe defaults; OS reduced-motion still wins), and make `hewn init` detect `src/` layouts plus tsconfig/jsconfig path aliases so components land under `src/components/hewn` with the correct import alias.
