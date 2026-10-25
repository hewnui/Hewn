import { cleanup, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { renderWithProviders } from "../../test/render";
import { ColorPicker } from "./color-picker";
import { hexToOklchDisplay } from "./color-picker.oklch";

afterEach(() => cleanup());

describe("ColorPicker", () => {
  it("renders a labeled popover trigger with the hex value", () => {
    renderWithProviders(
      <ColorPicker label="Brand accent" defaultValue="#1a6b4a" />,
    );
    expect(screen.getByText("Brand accent")).toBeTruthy();
    expect(screen.getByRole("button", { name: /#1a6b4a/i })).toBeTruthy();
  });

  it("opens the popover and exposes labeled editors", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <ColorPicker label="Fill" defaultValue="#0f766e" showAlpha showOklch />,
    );

    await user.click(screen.getByRole("button", { name: /#0f766e/i }));
    const dialog = await screen.findByRole("dialog");
    expect(
      within(dialog).getByRole("slider", { name: "Hue" }),
    ).toBeTruthy();
    expect(
      within(dialog).getByRole("slider", { name: "Alpha" }),
    ).toBeTruthy();
    expect(within(dialog).getByLabelText("Hex")).toBeTruthy();
    expect(within(dialog).getByText("OKLCH")).toBeTruthy();
    expect(
      within(dialog).getByRole("listbox", { name: "Color presets" }),
    ).toBeTruthy();
  });

  it("renders inline without a dialog trigger", () => {
    renderWithProviders(
      <ColorPicker label="Inline fill" variant="inline" showOklch={false} />,
    );
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(screen.getByRole("slider", { name: "Hue" })).toBeTruthy();
    expect(screen.getByLabelText("Hex")).toBeTruthy();
  });

  it("emits hex onChange when a preset is chosen", async () => {
    const user = userEvent.setup();
    let latest = "";
    renderWithProviders(
      <ColorPicker
        label="Swatch pick"
        variant="inline"
        defaultValue="#1a6b4a"
        presets={["#1a6b4a", "#b45309"]}
        showOklch
        onChange={(hex) => {
          latest = hex;
        }}
      />,
    );

    const presets = screen.getByRole("listbox", { name: "Color presets" });
    const options = within(presets).getAllByRole("option");
    const before = screen.getByText(/^oklch\(/).textContent;
    await user.click(options[1]!);
    expect(latest.toLowerCase()).toBe("#b45309");
    expect(screen.getByText(/^oklch\(/).textContent).not.toBe(before);
  });

  it("submits the hex value through a hidden form field", () => {
    renderWithProviders(
      <form aria-label="Theme">
        <ColorPicker label="Accent" name="accent" defaultValue="#334155" />
      </form>,
    );
    const input = document.querySelector(
      'input[name="accent"]',
    ) as HTMLInputElement | null;
    expect(input?.value.toLowerCase()).toBe("#334155");
  });
});

describe("hexToOklchDisplay", () => {
  it("formats a forest green as OKLCH", () => {
    const value = hexToOklchDisplay("#1a6b4a");
    expect(value).toMatch(/^oklch\(/);
  });
});
