"use client";

import { RootProvider } from "fumadocs-ui/provider/next";
import type { ReactNode } from "react";

/**
 * Docs-only Fumadocs provider. Kept out of the site root so marketing routes
 * do not download search/Orama UI chrome on first paint.
 */
export function DocsRootProvider({ children }: { children: ReactNode }) {
  return (
    <RootProvider
      theme={{ enabled: false }}
      // Keep Ctrl/Cmd+K and the trigger; skip downloading the search dialog
      // until the user opens it (default preload eagerly pulls Orama UI).
      search={{ preload: false }}
    >
      {children}
    </RootProvider>
  );
}
