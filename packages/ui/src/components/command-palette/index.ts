import {
  CommandPalette,
  CommandPaletteEmpty,
  CommandPaletteGroup,
  CommandPaletteInput,
  CommandPaletteItem,
  CommandPaletteList,
  CommandPaletteLoading,
  CommandPaletteRecent,
  CommandPaletteTrigger,
} from "./command-palette";

export const CommandPaletteRoot = Object.assign(CommandPaletteTrigger, {
  Content: CommandPalette,
  Input: CommandPaletteInput,
  List: CommandPaletteList,
  Group: CommandPaletteGroup,
  Item: CommandPaletteItem,
  Recent: CommandPaletteRecent,
  Empty: CommandPaletteEmpty,
  Loading: CommandPaletteLoading,
});

export {
  CommandPalette,
  CommandPaletteEmpty,
  CommandPaletteGroup,
  CommandPaletteInput,
  CommandPaletteItem,
  CommandPaletteList,
  CommandPaletteLoading,
  CommandPaletteRecent,
  CommandPaletteTrigger,
};

export {
  commandPaletteHotkeyLabel,
  useCommandPaletteHotkey,
} from "./command-palette.hotkey";

export type {
  CommandPaletteGroupProps,
  CommandPaletteInputProps,
  CommandPaletteItemProps,
  CommandPaletteListProps,
  CommandPaletteProps,
  CommandPaletteRecentProps,
  CommandPaletteTriggerProps,
  UseCommandPaletteHotkeyOptions,
} from "./command-palette.types";
