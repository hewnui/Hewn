import { cleanup, render, screen } from "@testing-library/react";
import type { ReactElement } from "react";
import { afterEach, describe, expect, it } from "vitest";
import { MaterialProvider } from "../../providers/material-provider";
import { MotionProvider } from "../../providers/motion-provider";
import { ThemeProvider } from "../../providers/theme-provider";
import { LineChart } from "./line-chart";

const series = [
  {
    id: "a",
    label: "Revenue",
    data: [
      { x: "Mon", y: 12 },
      { x: "Tue", y: 18 },
      { x: "Wed", y: 15 },
    ],
  },
];

function wrap(ui: ReactElement) {
  return render(
    <ThemeProvider>
      <MaterialProvider>
        <MotionProvider>{ui}</MotionProvider>
      </MaterialProvider>
    </ThemeProvider>,
  );
}

afterEach(() => cleanup());

describe("LineChart", () => {
  it("renders with summary and tooltip slot", () => {
    wrap(
      <LineChart series={series} summary="Revenue this week">
        <LineChart.Tooltip />
      </LineChart>,
    );
    // Interactive charts expose summary via figcaption, not role="img".
    expect(screen.getByText("Revenue this week")).toBeTruthy();
    expect(
      screen.getByRole("group", { name: "Revenue this week" }),
    ).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Revenue: Mon, 12" }),
    ).toBeTruthy();
  });

  it("renders loading skeleton", () => {
    wrap(
      <LineChart series={series} summary="Loading" status="loading" />,
    );
    expect(screen.getByRole("status", { name: "Loading chart" })).toBeTruthy();
  });
});
