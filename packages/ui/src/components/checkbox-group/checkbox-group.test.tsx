import { cleanup, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { renderWithProviders } from "../../test/render";
import { Checkbox } from "../checkbox";
import { CheckboxGroup } from "./checkbox-group";

afterEach(() => cleanup());

describe("CheckboxGroup", () => {
  it("renders a labeled group of checkboxes", () => {
    renderWithProviders(
      <CheckboxGroup label="Notify me about" defaultValue={["billing"]}>
        <Checkbox value="billing">Billing</Checkbox>
        <Checkbox value="product">Product updates</Checkbox>
      </CheckboxGroup>,
    );
    expect(screen.getByText("Notify me about")).toBeTruthy();
    expect(screen.getByRole("checkbox", { name: "Billing" })).toBeTruthy();
  });
});
