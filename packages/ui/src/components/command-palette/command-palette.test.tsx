import { cleanup, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Button } from "../button";
import { renderWithProviders } from "../../test/render";
import {
  CommandPalette,
  CommandPaletteGroup,
  CommandPaletteInput,
  CommandPaletteItem,
  CommandPaletteList,
  CommandPaletteRecent,
  CommandPaletteTrigger,
} from "./command-palette";
import { useCommandPaletteHotkey } from "./command-palette.hotkey";

afterEach(() => cleanup());

function PaletteFixture({
  isLoading = false,
  onAction,
}: {
  isLoading?: boolean;
  onAction?: () => void;
}) {
  return (
    <CommandPaletteTrigger>
      <Button>Open commands</Button>
      <CommandPalette>
        <CommandPaletteInput />
        <CommandPaletteList isLoading={isLoading} emptyLabel="Nothing matched.">
          <CommandPaletteRecent>
            <CommandPaletteItem id="recent-docs" textValue="Open docs">
              Open docs
            </CommandPaletteItem>
          </CommandPaletteRecent>
          <CommandPaletteGroup heading="Actions">
            <CommandPaletteItem
              id="new-file"
              textValue="New file"
              shortcut="⌘N"
              {...(onAction !== undefined ? { onAction } : {})}
            >
              New file
            </CommandPaletteItem>
            <CommandPaletteItem id="archive" textValue="Archive project" isDisabled>
              Archive project
            </CommandPaletteItem>
          </CommandPaletteGroup>
        </CommandPaletteList>
      </CommandPalette>
    </CommandPaletteTrigger>
  );
}

describe("CommandPalette", () => {
  it("opens from a trigger and exposes a labeled dialog", async () => {
    const user = userEvent.setup();
    renderWithProviders(<PaletteFixture />);

    await user.click(screen.getByRole("button", { name: "Open commands" }));
    expect(
      screen.getByRole("dialog", { name: "Command palette" }),
    ).toBeTruthy();
    expect(screen.getByRole("searchbox", { name: "Search commands" })).toBeTruthy();
  });

  it("filters grouped commands and shows empty state", async () => {
    const user = userEvent.setup();
    renderWithProviders(<PaletteFixture />);

    await user.click(screen.getByRole("button", { name: "Open commands" }));
    const input = screen.getByRole("searchbox", { name: "Search commands" });
    await user.type(input, "zzzz-no-match");

    await waitFor(() => {
      expect(screen.getByText("Nothing matched.")).toBeTruthy();
    });
  });

  it("activates an item with Enter and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();
    renderWithProviders(<PaletteFixture onAction={onAction} />);

    const trigger = screen.getByRole("button", { name: "Open commands" });
    await user.click(trigger);
    await user.keyboard("{ArrowDown}{ArrowDown}{Enter}");

    await waitFor(() => {
      expect(onAction).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(document.activeElement).toBe(trigger);
    });
  });

  it("shows a loading status for async results", async () => {
    const user = userEvent.setup();
    renderWithProviders(<PaletteFixture isLoading />);

    await user.click(screen.getByRole("button", { name: "Open commands" }));
    expect(screen.getByRole("status")).toBeTruthy();
    expect(screen.getByText("Loading commands…")).toBeTruthy();
  });
});

describe("useCommandPaletteHotkey", () => {
  function HotkeyHost({
    enableOnFormTags = true,
  }: {
    enableOnFormTags?: boolean;
  }) {
    useCommandPaletteHotkey({
      onOpenChange: (open) => {
        if (open) document.body.dataset.palette = "open";
      },
      enableOnFormTags,
    });
    return (
      <div>
        <input aria-label="Name" />
        <button type="button">Outside</button>
      </div>
    );
  }

  it("opens on Ctrl+K (non-Apple) and respects enableOnFormTags", () => {
    const platform = vi
      .spyOn(window.navigator, "platform", "get")
      .mockReturnValue("Linux x86_64");
    const ua = vi
      .spyOn(window.navigator, "userAgent", "get")
      .mockReturnValue("Mozilla/5.0 (X11; Linux x86_64)");

    renderWithProviders(<HotkeyHost enableOnFormTags={false} />);
    const field = screen.getByRole("textbox", { name: "Name" });
    field.focus();
    field.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "k",
        ctrlKey: true,
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(document.body.dataset.palette).toBeUndefined();

    const outside = screen.getByRole("button", { name: "Outside" });
    outside.focus();
    outside.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "k",
        ctrlKey: true,
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(document.body.dataset.palette).toBe("open");
    platform.mockRestore();
    ua.mockRestore();
  });
});
