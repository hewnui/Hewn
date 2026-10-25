import { cleanup, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { renderWithProviders } from "../../test/render";
import { Select, SelectItem } from "./select";

afterEach(() => cleanup());

describe("Select", () => {
  it("renders a labeled combobox trigger", () => {
    renderWithProviders(
      <Select label="Theme" placeholder="Choose theme" defaultSelectedKey="forest">
        <SelectItem id="forest">Forest</SelectItem>
        <SelectItem id="tide">Tide</SelectItem>
      </Select>,
    );
    expect(screen.getByRole("button", { name: /Theme|Forest/i })).toBeTruthy();
  });
});
