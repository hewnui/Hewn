"use client";

import dynamic from "next/dynamic";

/**
 * Heavy docs-only MDX islands. Split from the shared MDX map so component
 * pages do not pay for Theme Lab / Theme Studio / gallery until mounted.
 * SSR remains on so first paint still shows the static preview markup.
 */
export const DocsGallery = dynamic(() =>
  import("@/components/docs/docs-gallery").then((m) => m.DocsGallery),
);

export const DocsHomeCards = dynamic(() =>
  import("@/components/docs/docs-home-cards").then((m) => m.DocsHomeCards),
);

export const DocsThemeLabFrame = dynamic(() =>
  import("@/components/docs/docs-theme-lab-frame").then(
    (m) => m.DocsThemeLabFrame,
  ),
);

export const DocsThemeStudioFrame = dynamic(() =>
  import("@/components/docs/docs-theme-studio-frame").then(
    (m) => m.DocsThemeStudioFrame,
  ),
);
