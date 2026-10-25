"use client";

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
} from "@hewnui/ui";

export function MenuDemo() {
  return (
    <div
      data-kp-surface
      className="not-prose my-6 rounded-[calc(var(--kp-radius-lg)+0.25rem)] border bg-surface p-5 shadow-[var(--kp-shadow-surface)]"
    >
      <MenuTrigger>
        <MenuButton>Actions</MenuButton>
        <Menu>
          <MenuItem id="edit">Edit</MenuItem>
          <MenuItem id="duplicate">Duplicate</MenuItem>
          <MenuSeparator />
          <MenuItem id="archive">Archive</MenuItem>
        </Menu>
      </MenuTrigger>
    </div>
  );
}
