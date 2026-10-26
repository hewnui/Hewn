# hewnui

Copy typed Hewn React components into your project and lint them against your theme.

Bins: `hewn` and `hewnui` (use `npx hewnui@latest …` so the bin resolves unambiguously).

Part of [Hewn UI](https://hewnui.dev) · Source: [github.com/hewnui/Hewn](https://github.com/hewnui/Hewn)

## Requirements

- **Node.js `>=22`** (`engines.node` in this package)

TypeScript `>=5` is an optional peer for `hewn lint` AST mode.

## Commands

| Command | Purpose |
|---|---|
| `hewn init [--root <dir>] [--yes]` | Scaffold Hewn config in a project |
| `hewn add <name...> [--overwrite] [--yes]` | Copy component source from the registry |
| `hewn theme` | List curated theme packs |
| `hewn theme export` | Print theme CSS for the active selection |
| `hewn lint [paths...] [--fix] [--json]` | Lint project files against Hewn theme rules |
| `hewn --help` | Show CLI help |

```bash
npx hewnui@latest init
npx hewnui@latest add button
npx hewnui@latest theme
npx hewnui@latest lint
```

## Environment

| Variable | Purpose |
|---|---|
| `HEWN_REGISTRY_URL` | Override the registry base URL (takes priority over `hewn.json` `registry`) |

Default registry: `https://hewnui.dev/r`.

## Docs

- CLI reference: https://hewnui.dev/docs/cli
- Getting started: https://hewnui.dev/docs/getting-started
- GitHub: https://github.com/hewnui/Hewn

## License

MIT — see [LICENSE](./LICENSE) and [the repo license](https://github.com/hewnui/Hewn/blob/main/LICENSE).
