/**
 * Public Pro block catalog for marketing previews only.
 * Never import Pro block source — static PNG/placeholder frames only.
 */
export type ProBlockPreview = {
  id: string;
  name: string;
  description: string;
  kind: "section" | "page";
};

export const PRO_BLOCK_CATALOG: readonly ProBlockPreview[] = [
  {
    id: "app-sidebar",
    name: "App sidebar",
    description: "Grouped nav with active pill, badge, and profile status.",
    kind: "section",
  },
  {
    id: "app-header",
    name: "App header",
    description: "Product mark, environment chip, command trigger, alerts.",
    kind: "section",
  },
  {
    id: "metrics-row",
    name: "Metrics row",
    description: "KPI rails with deltas, direction, and sparklines.",
    kind: "section",
  },
  {
    id: "chart-panel",
    name: "Chart panel",
    description: "Area or donut with interval tabs and refresh.",
    kind: "section",
  },
  {
    id: "activity-feed",
    name: "Activity feed",
    description: "Live event stream with category filters.",
    kind: "section",
  },
  {
    id: "jobs-table",
    name: "Jobs table",
    description: "Status-badged table with search and latency cues.",
    kind: "section",
  },
  {
    id: "confirm-action",
    name: "Confirm action",
    description: "Danger dialog with busy lock and toast feedback.",
    kind: "section",
  },
  {
    id: "pricing-table",
    name: "Pricing table",
    description: "Tier matrix with interval switch and feature checklist.",
    kind: "section",
  },
  {
    id: "settings-profile",
    name: "Settings profile",
    description: "Avatar upload, verified email, danger zone.",
    kind: "section",
  },
  {
    id: "api-keys-manager",
    name: "API keys manager",
    description: "Masked secrets, copy, create modal, revoke.",
    kind: "section",
  },
  {
    id: "team-members-manager",
    name: "Team members",
    description: "Roster with roles, 2FA cues, invite, remove.",
    kind: "section",
  },
  {
    id: "page-dashboard",
    name: "Dashboard page",
    description: "Assembled ops desk: chrome, metrics, chart, jobs.",
    kind: "page",
  },
  {
    id: "page-login",
    name: "Login page",
    description: "Split auth with providers and error handling.",
    kind: "page",
  },
  {
    id: "page-settings",
    name: "Settings page",
    description: "Profile, team, keys, and plan controls together.",
    kind: "page",
  },
] as const;

export type ProBlockId = (typeof PRO_BLOCK_CATALOG)[number]["id"];

/** Human-readable summary kept in sync with `PRO_BLOCK_CATALOG`. */
export function proCatalogSummary(): {
  blocksLabel: string;
  pagesLabel: string;
  blockCount: number;
  pageCount: number;
} {
  const sections = PRO_BLOCK_CATALOG.filter((b) => b.kind === "section");
  const pages = PRO_BLOCK_CATALOG.filter((b) => b.kind === "page");
  const nameList = (items: readonly { name: string }[]) =>
    items
      .map((item) => item.name.replace(/\s+page$/i, "").toLowerCase())
      .join(", ");
  return {
    blocksLabel: nameList(sections),
    pagesLabel: nameList(pages),
    blockCount: sections.length,
    pageCount: pages.length,
  };
}
