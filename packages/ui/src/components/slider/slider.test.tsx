import { cleanup, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { renderWithProviders } from "../../test/render";
import { Slider } from "./slider";

afterEach(() => cleanup());

describe("Slider", () => {
  it("renders a labeled slider", () => {
    renderWithProviders(
      <Slider label="Opacity" defaultValue={42} minValue={0} maxValue={100} />,
    );
    expect(screen.getByRole("slider", { name: "Opacity" })).toBeTruthy();
  });
});
