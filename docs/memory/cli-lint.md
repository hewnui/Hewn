# CLI lint command — Decision Log

> Confirmed 2026-10-21. Implements `hewn lint` design-system guarantees.
> Updated 2026-10-21: status tokens + dark AA debt paid; debt ignores removed.

| Area | Decision | Alternatives | Reason |
|------|----------|--------------|--------|
| Parser | Resolve project/`typescript` via `createRequire` for TSX AST; regex for CSS/class strings | Bundle TS, oxc-parser, Babel | Zero runtime deps; TS already in repo/consumer projects (~5KB pack preserved) |
| Contrast | Self-contained OKLCH→sRGB→relative luminance in CLI | Depend on `@hewnui/themes` | Themes must stay out of CLI runtime; math already validated in themes tests |
| Config | Extend `hewn.json` with `lint.{include,ignore,rules,themes}` | Separate RC file | Matches `init` contract |
| Severity | `error` \| `warn` \| `off`; destructive confirms default `warn` | All errors | Heuristic delete-confirm must not block CI by default |
| Autofix | Only `transition-all` / `transition: all` | Broader token rewrites | Mechanical and safe |
| CI scope | Lint `packages/ui` + `apps/web`; ignore only intentional hex (OG/icons, Theme Studio seeds) | Fail on every literal | Repo owns token *definition* surfaces that legitimately use raw colour |
| Exit code | Non-zero when any **error**-severity finding remains after ignore | Warnings fail CI | Matches common linter UX |

## Repo findings ignored in `hewn.json`

Intentional allowlist only (no tracked theme/UI debt):

| Path / glob | Why ignored |
|-------------|-------------|
| `apps/web/app/{apple-icon,opengraph-image}.tsx` | Platform OG/icon images require inline sRGB colours (no CSS variables). |
| `apps/web/components/theme-studio/**` | Authoring UI seeds hex/OKLCH for theme generation BYOK flows. |

Neutral `oklch(0 0 0 / α)` / `oklch(1 0 0 / α)` shadow and glass refraction recipes are allowlisted by the rule itself (not brand colour). Pack CSS under `packages/themes/src/packs/` is skipped by `tokens-only` (token *definitions*) and checked by `aa-contrast` via `lint.themes`.

Status families (`--kp-success` / `--kp-warning` / `--kp-info` and danger variants with `-foreground` / `-subtle` / `-border`) live in every theme pack. Dark packs flip `--kp-accent-foreground` to light ink so accent text meets WCAG AA 4.5:1 without abandoning chromatic accents.

Motion gaps fixed while landing the command: `home-copy-button.tsx` now gates glyph motion with `useMotionMode`. `AnimatePresence`-only files are not flagged when children own the reduced-motion path.
