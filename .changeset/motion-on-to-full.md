---
"@hewnui/motion": minor
"@hewnui/ui": minor
---

**Breaking (vs pre-release snapshots):** `MotionProvider` / stored preference `"on"` is renamed to `"full"`. `"off"` is unchanged; `"reduced"` is new. Legacy `"on"` is still accepted as a deprecated alias of `"full"` (dev-only console warning) so existing localStorage values keep working.
