import type { RegistryItem } from "@hewnui/registry";

export const switchRegistry: RegistryItem = {
  name: "switch",
  type: "component",
  tier: "free",
  category: "forms",
  title: "Switch",
  description: "Immediate on/off control for preferences and modes.",
  states: ["disabled"],
  keywords: ["switch", "toggle", "preference"],
  docsPath: "/docs/components/switch",
};
