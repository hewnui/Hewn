# Rename: Komponents → Hewn (Hewn UI)

> Confirmed 2026-10-24. Product renamed before launch; nothing was published under the old names.

## Names

| Thing | Before | After |
| --- | --- | --- |
| Brand / site name | Komponents | Hewn (`siteName` = "Hewn UI") |
| CLI npm package | `@komponents/cli` | `hewnui` (unscoped) |
| CLI bins | `komponents` | `hewn` + `hewnui` (same entry) |
| Library scope | `@komponents/*` | `@hewnui/*` |
| MCP bin / server name | `komponents-mcp` / `komponents` | `hewn-mcp` / `hewn` |
| shadcn registry name + namespace | `komponents` / `@komponents/<item>` | `hewnui` / `@hewnui/<item>` |
| Project config | `komponents.json` | `hewn.json` |
| Credentials | `~/.config/komponents/credentials.json` | `~/.config/hewn/credentials.json` |
| Install dir in docs | `components/komponents` | `components/hewn` |
| Env vars | `KOMPONENTS_*` | `HEWN_*` |
| Theme skill names | `komponents-<pack>-theme` | `hewn-<pack>-theme` |
| Figma tokens | `komponents.tokens.json` | `hewn.tokens.json` |
| Canonical site | `https://komponents-dev.vercel.app` | `https://hewnui.dev` (secondary `hewnui.com`) |

## Decisions

- **Why `npx hewnui …` and not `npx hewn …`:** `hewn` is already taken on npm, so `npx hewn` would run someone
  else's package. The package is `hewnui`; it exposes `hewn` for installed use and `hewnui` so `npx hewnui` maps to a
  bin with the package's own name.
- **Neutral prefixes kept:** `--kp-*` CSS variables, `data-kp-*` attributes, `kp-*` localStorage keys and
  `kp_test_` stub license keys. They're abbreviations, not the brand. Renaming them would break themes and stored
  preferences for no real benefit.
- **Legacy env fallbacks:** `KOMPONENTS_SITE_URL`, `KOMPONENTS_WAITLIST_MEMORY` and `KOMPONENTS_FORCE_HTTPS_UPGRADE`
  are still read after their `HEWN_*` names, because they may already be set in Vercel or CI. CLI/MCP-only vars
  (`HEWN_REGISTRY_URL`, `HEWN_LICENSE_KEY`, `HEWN_ROOT`) have no fallback because those tools never shipped.
- **Site URL:** `DEFAULT_SITE_URL` is `https://hewnui.dev`. `apps/web` still resolves `NEXT_PUBLIC_SITE_URL`, then
  the Vercel production/deployment URL, so `komponents-dev.vercel.app` keeps serving. Until hewnui.dev DNS is live,
  pin `NEXT_PUBLIC_SITE_URL` / `HEWN_SITE_URL` to the old host if generated absolute URLs need to resolve.
  `next.config` 308-redirects `hewnui.com`, `www.hewnui.com` and `www.hewnui.dev` to `https://hewnui.dev` once those
  domains are attached.
- **CI DNS probe:** `check:site-url` runs with `SKIP_SITE_URL_DNS=1` in CI until hewnui.dev resolves. Remove it after
  DNS is live.
- **Repository URLs:** the repo now lives at `github.com/hewnui/Hewn` (moved from `github.com/techyhk/Komponents`).
  Each publishable `package.json` `repository`/`bugs` field points at `https://github.com/hewnui/Hewn` (with package
  `directory` values unchanged). Homepages stay on the docs site (`https://hewnui.dev`).
- `komponents.dev` stays in `FORBIDDEN_SITE_HOSTS`. It is an unregistered placeholder that must never become a default.
