import { cleanup, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { renderWithProviders } from "../../test/render";
import { DatePicker } from "./date-picker";

afterEach(() => cleanup());

describe("DatePicker", () => {
  it("renders a labeled date field", () => {
    renderWithProviders(<DatePicker label="Ship date" />);
    expect(screen.getByRole("group", { name: "Ship date" })).toBeTruthy();
  });
});
