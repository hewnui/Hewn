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

export function CommandPaletteDemo() {
  const [isOpen, setOpen] = useState(false);
  useCommandPaletteHotkey({ onOpenChange: setOpen });

  return (
    <div
      data-kp-surface
      className="not-prose my-6 rounded-[calc(var(--kp-radius-lg)+0.25rem)] border bg-surface p-5 shadow-[var(--kp-shadow-surface)]"
    >
      <CommandPaletteTrigger isOpen={isOpen} onOpenChange={setOpen}>
        <Button>
          Open commands
          <kbd className="ms-2 rounded-[var(--kp-radius-sm)] border border-[color-mix(in_oklch,var(--kp-accent-foreground)_35%,transparent)] px-1.5 py-0.5 font-mono text-[10px] text-accent-foreground/85">
            {commandPaletteHotkeyLabel()}
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
                shortcut="⌘O"
              >
                Open project
              </CommandPaletteItem>
            </CommandPaletteRecent>
            <CommandPaletteGroup heading="Actions">
              <CommandPaletteItem
                id="new-file"
                textValue="New file"
                icon={<FilePlusIcon className="size-4" weight="bold" />}
                shortcut="⌘N"
              >
                New file
              </CommandPaletteItem>
              <CommandPaletteItem
                id="settings"
                textValue="Open settings"
                icon={<GearIcon className="size-4" weight="bold" />}
                shortcut="⌘,"
              >
                Open settings
              </CommandPaletteItem>
            </CommandPaletteGroup>
          </CommandPaletteList>
        </CommandPalette>
      </CommandPaletteTrigger>
      <p className="mt-3 max-w-[48ch] text-sm leading-relaxed text-muted-foreground">
        Press {commandPaletteHotkeyLabel()} anywhere on this page — the hook skips
        composing IME events and picks ⌘ vs Ctrl by platform.
      </p>
    </div>
  );
}
