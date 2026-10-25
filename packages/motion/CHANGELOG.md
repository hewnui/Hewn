# @hewnui/motion

## 0.1.0

### Minor Changes

- e290de3: Initial public release: free component catalog from the registry census (46 at first cut), six curated theme packs, tinted glass material, integrated motion system, npm subpath distribution, static registry, and the Hewn CLI.
- e290de3: **Breaking (vs pre-release snapshots):** `MotionProvider` / stored preference `"on"` is renamed to `"full"`. `"off"` is unchanged; `"reduced"` is new. Legacy `"on"` is still accepted as a deprecated alias of `"full"` (dev-only console warning) so existing localStorage values keep working.
