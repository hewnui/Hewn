import type { RegistryItem } from "@hewnui/registry";

export const buttonRegistry: RegistryItem = {
  name: "button",
  type: "component",
  tier: "free",
  category: "buttons",
  title: "Button",
  description:
    "Pressable action control with variants, sizes, and loading state.",
  states: ["loading", "disabled"],
  keywords: ["press", "action", "submit"],
  docsPath: "/docs/components/button",
};
