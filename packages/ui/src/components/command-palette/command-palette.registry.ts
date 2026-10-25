import type { RegistryItem } from "@hewnui/registry";

export const commandPaletteRegistry: RegistryItem = {
  name: "command-palette",
  type: "component",
  tier: "free",
  category: "overlays",
  title: "CommandPalette",
  description:
    "Modal ⌘K command finder with grouped actions, shortcuts, and async loading.",
  keywords: ["command", "palette", "search", "autocomplete", "hotkey", "cmd-k"],
  docsPath: "/docs/components/command-palette",
  states: ["loading", "empty", "disabled"],
  internalDependencies: ["spinner"],
};
