import { cleanup, render, screen } from "@testing-library/react";
import type { ReactElement } from "react";
import { afterEach, describe, expect, it } from "vitest";
import { MaterialProvider } from "../../providers/material-provider";
import { MotionProvider } from "../../providers/motion-provider";
import { ThemeProvider } from "../../providers/theme-provider";
import { Sparkline } from "./sparkline";

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

describe("Sparkline", () => {
  it("renders an img-role chart with summary", () => {
    wrap(
      <Sparkline
        data={[2, 4, 3, 8, 6]}
        summary="Weekly signups trend"
        width={120}
        height={32}
      />,
    );
    expect(screen.getByRole("img", { name: "Weekly signups trend" })).toBeTruthy();
  });

  it("shows empty state", () => {
    wrap(<Sparkline data={[]} summary="Empty" />);
    expect(screen.getByRole("status").textContent).toContain("No data");
  });
});
