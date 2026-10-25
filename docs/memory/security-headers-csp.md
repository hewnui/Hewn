# Security headers and CSP (apps/web)

> Last updated: 2026-10-21

Headers are applied in `apps/web/next.config.ts` via `apps/web/lib/security-headers.ts`.
Static `next.config` headers (not proxy nonces) keep marketing/docs prerendered and CDN-cacheable.

## Final header set

| Header | Value |
|--------|--------|
| `Content-Security-Policy` | See policy below |
| `X-Frame-Options` | `DENY` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `X-Content-Type-Options` | `nosniff` |
| `Permissions-Policy` | Sensors/camera/mic/geo/payment/etc. disabled; `fullscreen=(self)` |

HSTS continues to be supplied by Vercel at the edge.

## CSP summary

- `default-src 'self'`
- `script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com https://vercel.live` (+ `'unsafe-eval'` in development only)
- `style-src 'self' 'unsafe-inline' https://vercel.live`
- `img-src 'self' data: blob:` (+ Vercel preview hosts)
- `font-src 'self' data:` (`next/font` self-hosts Google fonts)
- `connect-src 'self' https:` (+ Vercel Analytics / Speed Insights / preview tooling)
- `frame-ancestors 'none'`, `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`
- `upgrade-insecure-requests`

## Why `'unsafe-*'` is allowed

| Allowance | Why |
|-----------|-----|
| `script-src 'unsafe-inline'` | Next.js hydration/RSC bootstrap scripts and the anti-FOUC `appearanceScript` in `app/layout.tsx`. Nonce CSP would force dynamic rendering and disable static CDN caching for every docs page. |
| `script-src 'unsafe-eval'` (dev only) | React Refresh / Next.js dev tooling. Omitted in production. |
| `style-src 'unsafe-inline'` | `next/font` CSS variables, Tailwind, and React Aria inline styles used by Theme Lab and demos. |
| `connect-src https:` | Theme Studio BYOK may call a user-configured HTTPS model base URL. |

Do not switch to nonce-based CSP without accepting fully dynamic docs rendering.
