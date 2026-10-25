import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { Button } from "../button";
import { renderWithProviders } from "../../test/render";
import { Drawer, DrawerTrigger } from "./drawer";

afterEach(() => cleanup());

describe("Drawer", () => {
  it("opens from a trigger", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <DrawerTrigger>
        <Button>Filters</Button>
        <Drawer title="Filters">Refine the roster.</Drawer>
      </DrawerTrigger>,
    );
    await user.click(screen.getByRole("button", { name: "Filters" }));
    expect(screen.getByRole("dialog", { name: "Filters" })).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Close drawer" }),
    ).toBeTruthy();
  });

  it("closes from the header button", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <DrawerTrigger>
        <Button>Filters</Button>
        <Drawer title="Filters">Refine the roster.</Drawer>
      </DrawerTrigger>,
    );
    await user.click(screen.getByRole("button", { name: "Filters" }));
    await user.click(screen.getByRole("button", { name: "Close drawer" }));
    expect(screen.queryByRole("dialog", { name: "Filters" })).toBeNull();
  });
});
