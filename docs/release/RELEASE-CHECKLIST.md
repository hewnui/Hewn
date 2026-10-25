# Release checklist

Remaining launch steps. Every row below awaits **Himanshu** — do not publish, change license claims, cut a domain, or promote production from this agent run.

Companion notes live in `docs/release-checklist.md` (honest-copy gates). This file is the dry-run / go-live sequence.

## Already verified on `integration/launch` (agent QA)

- [x] Local production build of `apps/web`
- [x] Playwright walk + screenshots at 375px / 1440px × light / dark (home, getting-started, gallery, nine launch components, `/qa/visual`)
- [x] Registry `/r/shadcn/*.json` + free index resolve with file contents
- [x] Theme exports (`DESIGN.md`, DTCG, Tailwind `@theme` CSS, `SKILL.md`)
- [x] Motion modes + `prefers-reduced-motion`
- [x] `/llms.txt`, `/ai/index.json`, sitemap / robots / canonical, OG images
- [x] `pnpm pack` dry-run for publishable packages (see launch QA report)

## Awaiting Himanshu

### Version and changelog

- [ ] Confirm release version (today packages are `0.0.0`)
- [x] Add changeset(s) for `@hewnui/ui`, `@hewnui/themes`, `@hewnui/motion`, `hewnui` (`@hewnui/mcp` stays private / out of 0.1.0)
- [ ] Run `pnpm version` and review generated changelogs

### License decision

- [x] Decide public license: **MIT**
- [x] Add root + published-package `LICENSE` files; package `license` fields are `"MIT"`
- [x] Restore footer license line (`apps/web/components/home/content.ts` `footer.license` → "MIT licensed.")
- [ ] Flip honest-copy / distribution flags only when install paths are real (`PACKAGES_PUBLISHED` in `packages/docs-metadata`)
- [ ] Align repo visibility with any “open source” / “built in the open” marketing claims

### npm publish

- [ ] Final `pnpm check` + `pnpm check:pack` on the release commit
- [ ] Publish from a clean tree: `pnpm release` (or per-package `pnpm publish`) — **never from a Cloud Agent without explicit ask**
- [ ] Verify tarball contents one more time (`pnpm pack` / npm package page): `dist` / exports map / types / `sideEffects`; no `*.test.ts`, `.env`, or source maps
- [ ] Smoke `hewnui` (`hewn init`, `add`, `theme`, `lint`) against a clean Next app
- [ ] (Deferred) `@hewnui/mcp` is private for 0.1.0 — smoke when it ships

### Domain and site URL

- [ ] Attach `hewnui.dev` (primary) + `hewnui.com` (redirect) to the Vercel project; `komponents-dev.vercel.app` keeps serving meanwhile (default in `@hewnui/site-url` is already `https://hewnui.dev`)
- [ ] Point `DEFAULT_SITE_URL` / `NEXT_PUBLIC_SITE_URL` / `HEWN_REGISTRY_URL` at the real domain
- [ ] Re-run `pnpm sync:site-url` + `pnpm check:site-url`

### Production deploy

- [ ] Promote / deploy production on Vercel (not preview)
- [ ] Confirm Deployment Protection policy for production vs preview
- [ ] Confirm `/r/*`, `/themes/*`, `/ai/*`, `/llms.txt`, sitemap, robots, OG in production
- [ ] Confirm Analytics / Speed Insights only where intended

### Pro waitlist / pre-order

- [ ] Provision Upstash Redis on Vercel (production **and** preview) and set `KV_REST_API_URL` + `KV_REST_API_TOKEN` (or `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN`)
- [ ] Confirm `/pro` waitlist posts succeed on preview (not “temporarily unavailable”)
- [ ] Export waitlist when needed: `pnpm waitlist:export` (CSV to stdout; no public admin)
- [ ] Flip `PRO_MODE=preorder` **only after** setting a real `PRO_PREORDER_PRICE_DISPLAY` (preorder UI refuses to render without it — no accidental prices)
- [ ] Swap placeholder frames by dropping real PNGs into `apps/web/public/pro/previews/{block-id}.png`

### Human product gates

- [ ] Homepage and OG component counts match free registry census
- [ ] Getting-started install commands match published packages (and honest-copy labels)
- [ ] Manual keyboard / reduced-motion / Forest light + one dark pack / glass pass
- [x] Package README files for `ui`, `themes`, `motion`, `cli` (real install lines); `mcp` marked not published
- [ ] Repo visibility (private vs public) matches marketing claims

## Explicit non-actions for agents

- Do not `npm publish` / `pnpm publish`
- Do not merge to `main` or push to `main`
- Do not deploy production
- Do not change repository visibility
- Do not flip `PACKAGES_PUBLISHED` or publish domain / Vercel / env without Himanshu
