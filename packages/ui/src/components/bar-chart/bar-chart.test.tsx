import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { renderWithProviders } from "../../test/render";
import { BarChart } from "./bar-chart";

const series = [
  {
    id: "alpha",
    label: "Alpha",
    data: [
      { x: "Q1", y: 40 },
      { x: "Q2", y: 55 },
    ],
  },
  {
    id: "beta",
    label: "Beta",
    data: [
      { x: "Q1", y: 22 },
      { x: "Q2", y: 31 },
    ],
  },
];

afterEach(() => cleanup());

describe("BarChart", () => {
  it("renders an accessible chart with the summary name", () => {
    renderWithProviders(
      <BarChart series={series} summary="Quarterly revenue bars" />,
    );
    expect(
      screen.getByRole("group", { name: "Quarterly revenue bars" }),
    ).toBeTruthy();
  });

  it("exposes focusable bars for each series and category", () => {
    renderWithProviders(
      <BarChart series={series} summary="Quarterly revenue bars" />,
    );
    expect(screen.getByRole("button", { name: "Alpha: Q1, 40" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Beta: Q2, 31" })).toBeTruthy();
    expect(screen.getAllByRole("button")).toHaveLength(4);
  });

  it("shows the tooltip when a bar is focused", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <BarChart series={series} summary="Quarterly revenue bars">
        <BarChart.Tooltip />
      </BarChart>,
    );

    await user.tab();
    expect(screen.getByRole("tooltip").textContent).toContain("Alpha");
    expect(screen.getByRole("tooltip").textContent).toContain("Q1");
  });

  it("renders a loading status region", () => {
    renderWithProviders(
      <BarChart series={series} summary="Loading" status="loading" />,
    );
    expect(screen.getByRole("status", { name: "Loading chart" })).toBeTruthy();
  });

  it("renders an empty status message", () => {
    renderWithProviders(
      <BarChart series={[]} summary="Empty" status="empty" />,
    );
    expect(screen.getByRole("status").textContent).toContain(
      "No data to display",
    );
  });

  it("renders an error alert", () => {
    renderWithProviders(
      <BarChart series={series} summary="Broken" status="error" />,
    );
    expect(screen.getByRole("alert").textContent).toContain(
      "Could not render chart.",
    );
  });

  it("infers empty status when series have no points", () => {
    renderWithProviders(
      <BarChart
        series={[{ id: "a", label: "A", data: [] }]}
        summary="No points"
      />,
    );
    expect(screen.getByRole("status").textContent).toContain(
      "No data to display",
    );
  });

  it("applies custom dimensions to the svg", () => {
    renderWithProviders(
      <BarChart series={series} summary="Sized" width={360} height={180} />,
    );
    const svg = screen.getByRole("group", { name: "Sized" });
    expect(svg.getAttribute("width")).toBe("360");
    expect(svg.getAttribute("height")).toBe("180");
  });
});
