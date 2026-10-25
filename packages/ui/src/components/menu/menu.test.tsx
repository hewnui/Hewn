import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { renderWithProviders } from "../../test/render";
import { Menu, MenuButton, MenuItem, MenuTrigger } from "./menu";

afterEach(() => cleanup());

describe("Menu", () => {
  it("opens menu items from a trigger", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <MenuTrigger>
        <MenuButton>Actions</MenuButton>
        <Menu>
          <MenuItem id="edit">Edit</MenuItem>
          <MenuItem id="archive">Archive</MenuItem>
        </Menu>
      </MenuTrigger>,
    );
    await user.click(screen.getByRole("button", { name: "Actions" }));
    expect(screen.getByRole("menuitem", { name: "Edit" })).toBeTruthy();
  });
});
