import { cleanup, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { renderWithProviders } from "../../test/render";
import { Combobox, ComboboxItem } from "./combobox";

afterEach(() => cleanup());

describe("Combobox", () => {
  it("renders a labeled combobox", () => {
    renderWithProviders(
      <Combobox label="City" defaultSelectedKey="lisbon">
        <ComboboxItem id="lisbon">Lisbon</ComboboxItem>
        <ComboboxItem id="porto">Porto</ComboboxItem>
      </Combobox>,
    );
    expect(screen.getByRole("combobox", { name: "City" })).toBeTruthy();
  });
});
