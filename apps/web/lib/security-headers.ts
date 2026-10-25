/**
 * Security response headers for apps/web.
 *
 * CSP is set in next.config (not proxy/middleware) so prerendered docs/marketing
 * pages stay statically cacheable. Nonce-based CSP would force dynamic rendering.
 *
 * Unsafe allowances (document why, do not widen casually):
 * - script-src 'unsafe-inline': Next.js hydration/RSC bootstrap + anti-FOUC
 *   appearanceScript in app/layout.tsx. Production omits 'unsafe-eval'.
 * - script-src 'unsafe-eval' (development only): React Refresh / Next dev tooling.
 * - style-src 'unsafe-inline': next/font CSS variables, Tailwind, and React Aria
 *   inline style attributes used across Theme Lab / component demos.
 * - connect-src https:: Theme Studio BYOK may call a user-configured HTTPS model
 *   base URL (default api.openai.com); listing every vendor is not practical.
 * - img-src blob: / data:: OG generation, Theme Studio logo sampling, data URIs.
 */

// Relative import: next.config loads this file outside the app alias graph.
import { isIndexableDeployment } from "./deployment-indexing";

const isDev = process.env.NODE_ENV === "development";

/** Playwright/local next start use HTTP; only upgrade on real HTTPS deploys. */
const upgradeInsecureRequests =
  process.env.VERCEL === "1" ||
  process.env.HEWN_FORCE_HTTPS_UPGRADE === "1" ||
  process.env.KOMPONENTS_FORCE_HTTPS_UPGRADE === "1";

/** Single-line CSP value suitable for the Content-Security-Policy header. */
export function buildContentSecurityPolicy(): string {
  const directives = [
    "default-src 'self'",
    [
      "script-src",
      "'self'",
      "'unsafe-inline'",
      isDev ? "'unsafe-eval'" : null,
      "https://va.vercel-scripts.com",
      "https://vercel.live",
    ]
      .filter(Boolean)
      .join(" "),
    "style-src 'self' 'unsafe-inline' https://vercel.live",
    "img-src 'self' data: blob: https://vercel.live https://vercel.com https://*.vercel.com",
    "font-src 'self' data:",
    [
      "connect-src",
      "'self'",
      "https:",
      "https://va.vercel-scripts.com",
      "https://vitals.vercel-insights.com",
      "https://*.vercel-insights.com",
      "https://vercel.live",
      "wss://*.pusher.com",
    ].join(" "),
    "worker-src 'self' blob:",
    "media-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "frame-src 'self' https://vercel.live",
    upgradeInsecureRequests ? "upgrade-insecure-requests" : null,
  ].filter(Boolean);

  return directives.join("; ").replace(/\s{2,}/g, " ").trim();
}

export type SecurityHeader = { key: string; value: string };

/** Headers applied to every HTML/document route via next.config. */
export function securityHeaders(): SecurityHeader[] {
  const headers: SecurityHeader[] = [
    {
      key: "Content-Security-Policy",
      value: buildContentSecurityPolicy(),
    },
    {
      key: "X-Frame-Options",
      value: "DENY",
    },
    {
      key: "Referrer-Policy",
      value: "strict-origin-when-cross-origin",
    },
    {
      key: "X-Content-Type-Options",
      value: "nosniff",
    },
    {
      key: "Permissions-Policy",
      value: [
        "accelerometer=()",
        "autoplay=()",
        "camera=()",
        "display-capture=()",
        "encrypted-media=()",
        "fullscreen=(self)",
        "geolocation=()",
        "gyroscope=()",
        "microphone=()",
        "midi=()",
        "payment=()",
        "picture-in-picture=()",
        "publickey-credentials-get=()",
        "screen-wake-lock=()",
        "sync-xhr=()",
        "usb=()",
        "xr-spatial-tracking=()",
      ].join(", "),
    },
  ];

  if (!isIndexableDeployment()) {
    headers.push({
      key: "X-Robots-Tag",
      value: "noindex, nofollow",
    });
  }

  return headers;
}
