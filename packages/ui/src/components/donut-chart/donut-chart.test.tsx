import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../test/render";
import { DonutChart } from "./donut-chart";

describe("DonutChart", () => {
  it("names the figure from summary", () => {
    renderWithProviders(
      <DonutChart
        summary="Traffic share"
        slices={[
          { id: "edge", label: "Edge", value: 62 },
          { id: "origin", label: "Origin", value: 38 },
        ]}
      />,
    );
    expect(screen.getByRole("group", { name: "Traffic share" })).toBeTruthy();
  });

  it("shows empty status when values sum to zero", () => {
    renderWithProviders(
      <DonutChart
        summary="Traffic share"
        slices={[{ id: "edge", label: "Edge", value: 0 }]}
      />,
    );
    expect(screen.getByRole("status")).toBeTruthy();
  });
});
