import { DocsNav } from "@/components/docs/docs-nav";
import { HewnLogo } from "@/components/brand/hewn-logo";
import { GITHUB_REPO_URL } from "@/lib/site-links";
import { GithubLogoIcon } from "@phosphor-icons/react/dist/ssr/GithubLogo";
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
    // Sidebar page tree owns Components / Themes / Lab. Keep a single
    // external GitHub link so docs chrome matches the marketing header.
    links: [
      {
        type: "icon",
        icon: <GithubLogoIcon aria-hidden className="size-5" weight="regular" />,
        text: "GitHub",
        url: GITHUB_REPO_URL,
        label: "Hewn UI on GitHub",
        external: true,
      },
    ],
    themeSwitch: {
      enabled: false,
    },
  };
}
