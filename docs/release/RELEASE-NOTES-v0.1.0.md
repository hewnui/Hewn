# Release notes: v0.1.0 (draft)

Draft for the first public GitHub Release and changelog. Do not publish from an agent run. Adapt when Himanshu sets the launch date and flips `PACKAGES_PUBLISHED`.

## Packages

| Package | What it is |
|---|---|
| `@hewnui/ui` | 46 components and providers |
| `@hewnui/themes` | Tokens, six theme packs, motion/glass/radius layers, theme exports |
| `@hewnui/motion` | Shared motion primitives and tokens |
| `hewnui` | `hewn init / add / theme / lint` |

## Added

- Free component catalog from the registry census (currently 46), with subpath exports.
- Providers: `ThemeProvider`, `MaterialProvider`, `RadiusProvider`, `MotionProvider` (`full` \| `reduced` \| `off`), `ToastProvider`.
- Six theme packs, glass material, theme exports (`DESIGN.md`, DTCG, Tailwind `@theme`, `SKILL.md`).
- CLI, shadcn registry mirror, AI schema, docs with generated props and live examples.
- Pro waitlist at `/pro#waitlist` (no prices on the default waitlist surface).
- MIT license (root + published package `LICENSE` files).

## Breaking changes vs pre-release snapshots

- **Motion mode rename:** `MotionProvider` / preference `"on"` → `"full"`. `"off"` unchanged; `"reduced"` added. Legacy `"on"` remains a deprecated alias of `"full"` with a development-only console warning so existing stored preferences keep working.

## Not in this release

- Hewn Pro blocks/pages are waitlist-only; source is not public.
- `@hewnui/mcp` remains private / unpublished for 0.1.0.
- “Open source” / “built in the open” marketing awaits repo visibility — see `docs/release/RELEASE-CHECKLIST.md`.
