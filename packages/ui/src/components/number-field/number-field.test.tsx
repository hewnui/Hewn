import { cleanup, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { renderWithProviders } from "../../test/render";
import { NumberField } from "./number-field";

afterEach(() => cleanup());

describe("NumberField", () => {
  it("renders a labeled number input", () => {
    renderWithProviders(<NumberField label="Quantity" defaultValue={3} />);
    expect(
      screen.getByRole("textbox", { name: "Quantity" }),
    ).toBeTruthy();
  });

  it("exposes increment and decrement controls", () => {
    renderWithProviders(<NumberField label="Seats" defaultValue={2} />);
    expect(screen.getByRole("button", { name: /increase/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /decrease/i })).toBeTruthy();
  });
});
