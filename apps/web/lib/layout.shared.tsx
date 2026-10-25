import { DocsNav } from "@/components/docs/docs-nav";
import { HewnLogo } from "@/components/brand/hewn-logo";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      // Sidebar owns the brand; Fumadocs wraps this in a link via `nav.url`.
      title: <HewnLogo markClassName="size-6 shrink-0" />,
      url: "/",
      transparentMode: "none",
      component: <DocsNav />,
    },
    // Sidebar page tree already covers Components / Themes / Lab — keep this
    // empty so marketing-style top links do not reappear as sidebar items.
    links: [],
    themeSwitch: {
      enabled: false,
    },
  };
}
