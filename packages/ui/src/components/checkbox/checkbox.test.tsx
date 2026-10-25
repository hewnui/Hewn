import { cleanup, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { renderWithProviders } from "../../test/render";
import { Checkbox } from "./checkbox";

afterEach(() => cleanup());

describe("Checkbox", () => {
  it("renders accessible label text", () => {
    renderWithProviders(<Checkbox>Notify me</Checkbox>);
    expect(screen.getByRole("checkbox", { name: "Notify me" })).toBeTruthy();
  });
});
