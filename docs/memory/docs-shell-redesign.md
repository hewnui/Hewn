# Docs shell redesign

> Locked 2026-07-25. Scope C + hybrid chrome (soft/studio). Engine: Fumadocs kept.

## Decisions

| Area | Choice | Why |
|------|--------|-----|
| Scope | Full docs product | Shell, gallery, Theme Lab frame, search, templates |
| Chrome | Soft on hubs; studio on component pages + Theme Lab | Atmosphere without fighting reading |
| Engine | Keep Fumadocs; skin via slots + restrained `#nd-*` CSS | Avoid eject until APIs are insufficient |
| Nav | `nav.component: <DocsNav />` | Instrument strip: section crumb, search, dock, Site — brand stays in sidebar |
| Theme switch | Disabled (Fumadocs) | Appearance Dock owns theme/mode/material/motion |
| Frontmatter | `status` + `tier` via zod extend | Badges on `DocsPageHeader` |
| Gallery / Lab | MDX components `DocsGallery`, `DocsThemeLabFrame` | Product surfaces, not stock cards |
| Hub / gallery UI | Quiet editorial indexes (type + hairlines) | Curiosity from hierarchy, not specimen theater or metric tiles |

## Soft vs studio

- Soft: `/docs`, `/docs/components`, `/docs/themes*` — fuller atmosphere
- Studio: component detail pages + `/docs/theme-lab` — quieter chrome, sidebar wash

Synced by `DocsModeSync` → `html[data-docs-mode]`.

## Key files

- `apps/web/lib/layout.shared.tsx` — `baseOptions()`
- `apps/web/components/docs/*` — shell pieces
- `apps/web/app/docs/layout.tsx` — DocsLayout + banner
- `apps/web/app/docs/[[...slug]]/page.tsx` — custom header
- `apps/web/source.config.ts` — frontmatter schema
- `apps/web/app/globals.css` — `--fd-header-height`, `#nd-*` skins

## Hub index rules (2026-07-25)

- `/docs` and `/docs/components`: typography-led directories, not landing bento
- No live Button/Switch playground, gradient featured panels, or foundation metric grids
- Flat `border-t` / `divide-y` links; mono meta for counts; first gallery row per category slightly larger type only

## Non-goals (this pass)

- CLI eject of Fumadocs layouts
- Hand-edited generated `.source` output
- Parallel docs app outside `apps/web`
