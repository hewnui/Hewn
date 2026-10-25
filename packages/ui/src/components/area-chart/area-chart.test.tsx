import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { renderWithProviders } from "../../test/render";
import { AreaChart } from "./area-chart";

const series = [
  {
    id: "signups",
    label: "Signups",
    data: [
      { x: "Mon", y: 12 },
      { x: "Tue", y: 18 },
      { x: "Wed", y: 15 },
    ],
  },
];

afterEach(() => cleanup());

describe("AreaChart", () => {
  it("renders an accessible chart with the summary name", () => {
    renderWithProviders(
      <AreaChart series={series} summary="Weekly signups area" />,
    );
    expect(
      screen.getByRole("group", { name: "Weekly signups area" }),
    ).toBeTruthy();
  });

  it("exposes focusable data points with series labels", () => {
    renderWithProviders(
      <AreaChart series={series} summary="Weekly signups area" />,
    );
    expect(
      screen.getByRole("button", { name: "Signups: Mon, 12" }),
    ).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Signups: Wed, 15" }),
    ).toBeTruthy();
  });

  it("shows the tooltip when a point is focused", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <AreaChart series={series} summary="Weekly signups area">
        <AreaChart.Tooltip />
      </AreaChart>,
    );

    await user.tab();
    expect(screen.getByRole("tooltip").textContent).toContain("Signups");
    expect(screen.getByRole("tooltip").textContent).toContain("Mon");
  });

  it("renders a loading status region", () => {
    renderWithProviders(
      <AreaChart series={series} summary="Loading" status="loading" />,
    );
    expect(screen.getByRole("status", { name: "Loading chart" })).toBeTruthy();
  });

  it("renders an empty status message", () => {
    renderWithProviders(
      <AreaChart series={[]} summary="Empty" status="empty" />,
    );
    expect(screen.getByRole("status").textContent).toContain(
      "No data to display",
    );
  });

  it("renders an error alert", () => {
    renderWithProviders(
      <AreaChart series={series} summary="Broken" status="error" />,
    );
    expect(screen.getByRole("alert").textContent).toContain(
      "Could not render chart.",
    );
  });

  it("infers empty status when series have no points", () => {
    renderWithProviders(
      <AreaChart
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
      <AreaChart
        series={series}
        summary="Sized"
        width={320}
        height={160}
      />,
    );
    const svg = screen.getByRole("group", { name: "Sized" });
    expect(svg.getAttribute("width")).toBe("320");
    expect(svg.getAttribute("height")).toBe("160");
  });
});
