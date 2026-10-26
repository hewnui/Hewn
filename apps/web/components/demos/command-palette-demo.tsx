"use client";

import { useState } from "react";
import {
  Button,
  CommandPalette,
  CommandPaletteGroup,
  CommandPaletteInput,
  CommandPaletteItem,
  CommandPaletteList,
  CommandPaletteRecent,
  CommandPaletteTrigger,
  commandPaletteHotkeyLabel,
  useCommandPaletteHotkey,
} from "@hewnui/ui";
import { FilePlusIcon, FolderOpenIcon, GearIcon } from "@phosphor-icons/react";

const DEMO_HOTKEY = "j";

export function CommandPaletteDemo() {
  const [isOpen, setOpen] = useState(false);
  // Docs search binds ⌘/Ctrl+K — keep the demo on a free key.
  useCommandPaletteHotkey({ key: DEMO_HOTKEY, onOpenChange: setOpen });

  return (
    <div
      data-kp-surface
      className="not-prose my-6 rounded-[calc(var(--kp-radius-lg)+0.25rem)] border bg-surface p-5 shadow-[var(--kp-shadow-surface)]"
    >
      <CommandPaletteTrigger isOpen={isOpen} onOpenChange={setOpen}>
        <Button>
          Open commands
          <kbd className="ms-2 rounded-[var(--kp-radius-sm)] border border-[color-mix(in_oklch,var(--kp-accent-foreground)_35%,transparent)] px-1.5 py-0.5 font-mono text-[10px] text-accent-foreground/85">
            {commandPaletteHotkeyLabel(DEMO_HOTKEY)}
          </kbd>
        </Button>
        <CommandPalette>
          <CommandPaletteInput placeholder="Search actions…" />
          <CommandPaletteList>
            <CommandPaletteRecent>
              <CommandPaletteItem
                id="open-project"
                textValue="Open project"
                icon={<FolderOpenIcon className="size-4" weight="bold" />}
                shortcut={commandPaletteHotkeyLabel("o")}
              >
                Open project
              </CommandPaletteItem>
            </CommandPaletteRecent>
            <CommandPaletteGroup heading="Actions">
              <CommandPaletteItem
                id="new-file"
                textValue="New file"
                icon={<FilePlusIcon className="size-4" weight="bold" />}
                shortcut={commandPaletteHotkeyLabel("n")}
              >
                New file
              </CommandPaletteItem>
              <CommandPaletteItem
                id="settings"
                textValue="Open settings"
                icon={<GearIcon className="size-4" weight="bold" />}
                shortcut={commandPaletteHotkeyLabel(",")}
              >
                Open settings
              </CommandPaletteItem>
            </CommandPaletteGroup>
          </CommandPaletteList>
        </CommandPalette>
      </CommandPaletteTrigger>
      <p className="mt-3 max-w-[48ch] text-sm leading-relaxed text-muted-foreground">
        Press {commandPaletteHotkeyLabel(DEMO_HOTKEY)} on this page. Ctrl/⌘K is
        taken by docs search here; in your app the hook defaults to ⌘K / Ctrl+K.
      </p>
    </div>
  );
}
