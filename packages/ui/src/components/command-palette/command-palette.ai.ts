export const commandPaletteAi = {
  schemaVersion: 1,
  name: "command-palette",
  exportName: "CommandPalette",
  importPath: "@hewnui/ui/command-palette",
  compoundParts: [
    "CommandPaletteTrigger",
    "CommandPalette",
    "CommandPaletteInput",
    "CommandPaletteList",
    "CommandPaletteGroup",
    "CommandPaletteItem",
    "CommandPaletteRecent",
  ],
  props: [
    {
      name: "isOpen",
      type: "boolean",
      description: "Controlled open state on CommandPaletteTrigger.",
    },
    {
      name: "onOpenChange",
      type: "(isOpen: boolean) => void",
      description: "Open-change handler for controlled usage.",
    },
    {
      name: "isLoading",
      type: "boolean",
      description: "Shows a loading status in CommandPaletteList.",
    },
    {
      name: "emptyLabel",
      type: "ReactNode",
      description: "Empty-state copy when no commands match the filter.",
    },
    {
      name: "shortcut",
      type: "ReactNode",
      description: "Optional keyboard hint shown on CommandPaletteItem.",
    },
  ],
  variants: [],
  states: ["loading", "empty", "disabled"],
  keyboard: [
    "⌘K or Ctrl+K opens via useCommandPaletteHotkey",
    "Type to filter commands",
    "Arrow keys move between items",
    "Enter activates the focused item",
    "Escape closes and returns focus to the trigger",
  ],
  tokens: [
    "--kp-accent",
    "--kp-accent-foreground",
    "--kp-foreground",
    "--kp-background",
    "--kp-border",
    "--kp-radius-panel",
    "--kp-motion-duration",
    "--kp-shadow-surface",
  ],
  install: {
    npm: "npm install @hewnui/ui",
    cli: "npx hewnui@latest add command-palette",
  },
  examples: [
    {
      title: "Basic",
      code: `import {
  Button,
  CommandPalette,
  CommandPaletteGroup,
  CommandPaletteInput,
  CommandPaletteItem,
  CommandPaletteList,
  CommandPaletteTrigger,
} from "@hewnui/ui/command-palette";

<CommandPaletteTrigger>
  <Button>Commands</Button>
  <CommandPalette>
    <CommandPaletteInput />
    <CommandPaletteList>
      <CommandPaletteGroup heading="Actions">
        <CommandPaletteItem id="new" shortcut="⌘N">New file</CommandPaletteItem>
      </CommandPaletteGroup>
    </CommandPaletteList>
  </CommandPalette>
</CommandPaletteTrigger>`,
    },
  ],
} as const;
