import type { RegistryItem } from "@hewnui/registry";

export const linkRegistry: RegistryItem = {
  name: "link",
  type: "component",
  tier: "free",
  category: "navigation",
  title: "Link",
  description:
    "Accessible navigation link with accent, muted, and underline variants.",
  states: ["disabled"],
  keywords: ["link", "anchor", "navigation"],
  docsPath: "/docs/components/link",
};
