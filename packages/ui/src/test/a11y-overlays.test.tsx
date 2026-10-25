import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, it } from "vitest";
import { Button } from "../components/button";
import { Combobox, ComboboxItem } from "../components/combobox";
import { DatePicker } from "../components/date-picker";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogTrigger,
} from "../components/dialog";
import { Drawer, DrawerTrigger } from "../components/drawer";
import { Menu, MenuButton, MenuItem, MenuTrigger } from "../components/menu";
import {
  Popover,
  PopoverBody,
  PopoverTitle,
  PopoverTrigger,
} from "../components/popover";
import { Select, SelectItem } from "../components/select";
import { ToastProvider, useToast } from "../components/toast";
import { Tooltip, TooltipTrigger } from "../components/tooltip";
import { expectNoA11yViolations } from "./a11y";
import { renderWithProviders } from "./render";

afterEach(() => cleanup());

describe("a11y overlays", () => {
  it("Dialog open", async () => {
    const user = userEvent.setup();
    const { container } = renderWithProviders(
      <DialogTrigger>
        <Button>Open</Button>
        <Dialog title="Confirm">
          <DialogBody>Archive this draft?</DialogBody>
          <DialogActions>
            <Button variant="secondary">Cancel</Button>
          </DialogActions>
        </Dialog>
      </DialogTrigger>,
    );
    await user.click(screen.getByRole("button", { name: "Open" }));
    await expectNoA11yViolations(container);
  });

  it("Drawer open", async () => {
    const user = userEvent.setup();
    const { container } = renderWithProviders(
      <DrawerTrigger>
        <Button>Filters</Button>
        <Drawer title="Filters">Refine the roster.</Drawer>
      </DrawerTrigger>,
    );
    await user.click(screen.getByRole("button", { name: "Filters" }));
    await expectNoA11yViolations(container);
  });

  it("Popover open", async () => {
    const user = userEvent.setup();
    const { container } = renderWithProviders(
      <PopoverTrigger>
        <Button>Details</Button>
        <Popover>
          <PopoverTitle>Latency</PopoverTitle>
          <PopoverBody>Median response is 47.2ms.</PopoverBody>
        </Popover>
      </PopoverTrigger>,
    );
    await user.click(screen.getByRole("button", { name: "Details" }));
    await screen.findByRole("dialog");
    await expectNoA11yViolations(container);
  });

  it("Menu open", async () => {
    const user = userEvent.setup();
    const { container } = renderWithProviders(
      <MenuTrigger>
        <MenuButton>Actions</MenuButton>
        <Menu>
          <MenuItem id="edit">Edit</MenuItem>
          <MenuItem id="archive">Archive</MenuItem>
        </Menu>
      </MenuTrigger>,
    );
    await user.click(screen.getByRole("button", { name: "Actions" }));
    await screen.findByRole("menuitem", { name: "Edit" });
    await expectNoA11yViolations(container);
  });

  it("Tooltip open", async () => {
    const { container } = renderWithProviders(
      <TooltipTrigger isOpen delay={0}>
        <Button>Help</Button>
        <Tooltip>Keyboard shortcut</Tooltip>
      </TooltipTrigger>,
    );
    await expectNoA11yViolations(container);
  });

  it("Select open", async () => {
    const user = userEvent.setup();
    const { container } = renderWithProviders(
      <Select label="Theme" defaultSelectedKey="forest">
        <SelectItem id="forest">Forest</SelectItem>
        <SelectItem id="tide">Tide</SelectItem>
      </Select>,
    );
    await user.click(screen.getByRole("button"));
    await screen.findByRole("option", { name: "Tide" });
    await expectNoA11yViolations(container);
  });

  it("Combobox open", async () => {
    const user = userEvent.setup();
    const { container } = renderWithProviders(
      <Combobox label="City" defaultSelectedKey="lisbon">
        <ComboboxItem id="lisbon">Lisbon</ComboboxItem>
        <ComboboxItem id="porto">Porto</ComboboxItem>
      </Combobox>,
    );
    await user.click(screen.getByRole("button"));
    await screen.findByRole("option", { name: "Porto" });
    await expectNoA11yViolations(container);
  });

  it("DatePicker open", async () => {
    const user = userEvent.setup();
    const { container } = renderWithProviders(<DatePicker label="Ship date" />);
    const buttons = screen.getAllByRole("button");
    await user.click(buttons[buttons.length - 1]!);
    await screen.findByRole("dialog");
    await expectNoA11yViolations(container);
  });

  it("Toast visible", async () => {
    function Trigger() {
      const { toast } = useToast();
      return (
        <Button
          onPress={() =>
            toast({
              title: "Saved",
              description: "Draft synced.",
              tone: "success",
            })
          }
        >
          Notify
        </Button>
      );
    }
    const user = userEvent.setup();
    const { container } = renderWithProviders(
      <ToastProvider>
        <Trigger />
      </ToastProvider>,
    );
    await user.click(screen.getByRole("button", { name: "Notify" }));
    await expectNoA11yViolations(container);
  });
});
