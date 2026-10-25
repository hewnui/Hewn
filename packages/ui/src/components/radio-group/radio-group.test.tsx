import { cleanup, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { renderWithProviders } from "../../test/render";
import { Radio, RadioGroup } from "./radio-group";

afterEach(() => cleanup());

describe("RadioGroup", () => {
  it("renders labeled options", () => {
    renderWithProviders(
      <RadioGroup label="Plan" defaultValue="pro">
        <Radio value="free">Free</Radio>
        <Radio value="pro">Pro</Radio>
      </RadioGroup>,
    );
    expect(screen.getByText("Plan")).toBeTruthy();
    expect(screen.getByRole("radio", { name: "Pro" })).toBeTruthy();
  });
});
