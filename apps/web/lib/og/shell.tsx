import { OgMark } from "@/lib/og/mark";
import { ogPalette } from "@/lib/og/palette";
import { siteName } from "@/lib/site";
import type { ReactNode } from "react";

type OgShellProps = {
  /** Right-side mono label in the header row. */
  headerMeta?: string;
  children: ReactNode;
  footer?: ReactNode;
};

/**
 * Shared left-aligned OG frame: brand wordmark, atmosphere, content, footer.
 * Space Grotesk only on the wordmark; body copy uses Plex.
 */
export function OgShell({ headerMeta, children, footer }: OgShellProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: ogPalette.background,
        backgroundImage: ogPalette.glow,
        padding: "64px 72px",
        color: ogPalette.foreground,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <OgMark size={48} />
          <span
            style={{
              fontFamily: "Space Grotesk",
              fontSize: 32,
              fontWeight: 500,
              letterSpacing: -0.8,
            }}
          >
            {siteName}
          </span>
        </div>
        {headerMeta ? (
          <span
            style={{
              fontFamily: "IBM Plex Mono",
              fontSize: 20,
              fontWeight: 500,
              letterSpacing: 2.4,
              textTransform: "uppercase",
              color: ogPalette.muted,
            }}
          >
            {headerMeta}
          </span>
        ) : null}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          maxWidth: 980,
          marginTop: 28,
          marginBottom: 28,
        }}
      >
        {children}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          borderTop: `1px solid ${ogPalette.line}`,
          paddingTop: 28,
        }}
      >
        {footer}
      </div>
    </div>
  );
}
