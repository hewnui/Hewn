import { DocsAppearanceDeferred } from "@/components/docs/docs-appearance-deferred";
import { DocsAtmosphere } from "@/components/docs/docs-atmosphere";
import { DocsModeSync } from "@/components/docs/docs-mode-sync";
import { DocsRootProvider } from "@/components/docs/docs-root-provider";
import { DocsScrollA11y } from "@/components/docs/docs-scroll-a11y";
import { DocsSidebarBanner } from "@/components/docs/docs-sidebar-banner";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";

/**
 * Docs shell: atmosphere + page tree stay light; appearance and search hydrate
 * on idle/interaction so getting-started prose can become LCP sooner.
 */
export default function Layout({ children }: { children: ReactNode }) {
  const base = baseOptions();

  return (
    <DocsRootProvider>
      <DocsAtmosphere />
      <DocsModeSync />
      <DocsScrollA11y />
      <DocsLayout
        {...base}
        tree={source.getPageTree()}
        containerProps={{
          className: "kp-docs-layout",
        }}
        slots={{
          searchTrigger: false,
        }}
        sidebar={{
          banner: <DocsSidebarBanner key="kp-docs-sidebar-banner" />,
          footer: <DocsAppearanceDeferred key="kp-docs-appearance" />,
          defaultOpenLevel: 1,
        }}
        themeSwitch={{ enabled: false }}
      >
        {children}
      </DocsLayout>
    </DocsRootProvider>
  );
}
