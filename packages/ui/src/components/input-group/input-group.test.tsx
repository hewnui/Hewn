import { cleanup, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { renderWithProviders } from "../../test/render";
import { InputGroup } from "./input-group";

afterEach(() => cleanup());

describe("InputGroup", () => {
  it("renders prefix and suffix around the input", () => {
    renderWithProviders(
      <InputGroup
        label="Website"
        prefix="https://"
        suffix=".studio"
        placeholder="andruia"
      />,
    );
    expect(screen.getByLabelText("Website")).toBeTruthy();
    expect(screen.getByText("https://")).toBeTruthy();
    expect(screen.getByText(".studio")).toBeTruthy();
  });
});
