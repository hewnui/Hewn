# Contributing to Hewn

Thanks for helping improve Hewn. Read [`AGENTS.md`](./AGENTS.md) before changing UI, docs, themes, or tooling — it is the project rulebook (component contract, tokens, motion, honest-copy, and file-size limits).

## Setup

- Node.js ≥ 22
- [pnpm](https://pnpm.io) 11 (see `packageManager` in the root `package.json`)

```bash
pnpm install
pnpm --filter web dev   # marketing site + Fumadocs
```

## Monorepo layout

| Path | Role |
|------|------|
| `apps/web` | Next.js site (marketing, docs, Theme Lab, Theme Studio) |
| `packages/ui` | Canonical TypeScript components (source of truth) |
| `packages/themes` | Theme packs, tokens, glass, authoring |
| `packages/motion` | Shared Motion presets |
| `packages/cli` | `hewn` / `hewnui` CLI |
| `packages/registry` | Generated registry manifests |
| `packages/mcp` | Read-only MCP server |
| `tooling/` | Generators and CI checks |

`packages/ui` is canonical. Registry JSON, docs metadata, and JSX variants are generated from it — do not maintain parallel copies by hand.

## Checks

```bash
pnpm check          # typecheck, test, build, pack/bundle/docs/site-url/census/budgets/shadcn/motion/honest-copy, lint:hewn
pnpm test           # workspace unit / component tests
pnpm test:e2e       # Playwright smoke (after a web build)
pnpm test:visual    # visual regression (prefer Docker baselines — see AGENTS.md)
pnpm generate       # registry + docs metadata
```

Fix failures introduced by your change before opening a PR.

## Changesets

Publishable packages use [Changesets](https://github.com/changesets/changesets). For user-facing package changes:

```bash
pnpm changeset
```

Linked packages (`@hewnui/ui`, `@hewnui/motion`, `@hewnui/themes`, `hewnui`) version together. Do not publish from an agent run; maintainers run `pnpm version` / `pnpm release`.

## Pull requests

- Keep PRs focused; prefer small, reviewable diffs.
- Follow the component folder contract and 200-line file limit in `AGENTS.md`.
- Do not commit secrets, `.env` files, or flip `PACKAGES_PUBLISHED`.
- Site copy must stay honest: no “open source”, “built in the open”, or “free forever” claims (`pnpm check:honest-copy`).

## License

Contributions are under the repository [MIT License](./LICENSE).
