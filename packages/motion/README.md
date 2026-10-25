# @hewnui/motion

Shared motion tokens and reduced-motion-aware primitives (`full`, `reduced`, `off`) used by Hewn components.

Part of [Hewn](https://hewnui.dev).

## Install

```bash
pnpm add @hewnui/motion
```

## Usage

```ts
import { resolveMotionMode, durations } from "@hewnui/motion";
```

## Modes

| Mode | Meaning |
|---|---|
| `full` | Motion enabled (default) |
| `reduced` | Shorter / quieter motion |
| `off` | No motion |

OS `prefers-reduced-motion: reduce` never elevates above `reduced`. Legacy preference `"on"` is accepted as a deprecated alias of `"full"` (dev-only console warning).

Docs: https://hewnui.dev/docs/motion

## License

MIT — see [LICENSE](./LICENSE).
