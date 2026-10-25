# Release checklist

Gates before a public launch claim. Keep marketing copy honest until each row is done.

## Distribution

- [ ] Publish `@hewnui/ui` (and related packages) to npm with verified subpath exports
- [ ] Publish `hewnui` / `hewn` bin; verify `init`, `add`, and `theme` against a clean app
- [ ] Set production `HEWN_REGISTRY_URL` / site URL away from placeholders
- [ ] Confirm static registry (`/r/*.json`) and AI schema (`/ai/*`) are served in production

## Open source and license

- [x] Decide and publish license: MIT — root + published-package `LICENSE`, package `license` fields, footer “MIT licensed.”
- [ ] Open the repository (or document the access model); only then claim “built in the open”


## Product claims

- [ ] Homepage and OG image component counts still match the free registry / gallery census
- [ ] Getting started docs match the real install path (npm and/or CLI)
- [ ] No Pro pricing or checkout UI until payments exist

## Quality

- [ ] `pnpm check` green on the release commit
- [ ] Manual pass: keyboard, reduced motion, Forest light + one dark pack, glass material
- [ ] Homepage and docs first paint acceptable on a mid-tier mobile device
