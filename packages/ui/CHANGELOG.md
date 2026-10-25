# @hewnui/ui

## 0.1.0

### Minor Changes

- e290de3: Add free CommandPalette (⌘K Autocomplete dialog) and Stepper (wizard progress + useStepper) components with docs, registry metadata, and tests.
- e290de3: Add free DateRangePicker and ColorPicker components with docs, registry metadata, and tests.
- e290de3: Add free Card, Empty, and DonutChart components with docs, demos, registry metadata, and AI schemas.
- e290de3: Initial public release: free component catalog from the registry census (46 at first cut), six curated theme packs, tinted glass material, integrated motion system, npm subpath distribution, static registry, and the Hewn CLI.
- e290de3: **Breaking (vs pre-release snapshots):** `MotionProvider` / stored preference `"on"` is renamed to `"full"`. `"off"` is unchanged; `"reduced"` is new. Legacy `"on"` is still accepted as a deprecated alias of `"full"` (dev-only console warning) so existing localStorage values keep working.
- e290de3: Add free TagField (MultiSelect) and Pagination components with docs, registry metadata, and tests.

### Patch Changes

- e290de3: Fix theme mode persistence on reload, chart nested-interactive a11y (drop role=img around focusable points), and related docs smoke prerequisites for Playwright e2e.
- Updated dependencies [e290de3]
- Updated dependencies [e290de3]
  - @hewnui/motion@0.1.0
  - @hewnui/themes@0.1.0
