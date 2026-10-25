import { cleanup, render, screen } from "@testing-library/react";
import type { ReactElement } from "react";
import { afterEach, describe, expect, it } from "vitest";
import { MaterialProvider } from "../../providers/material-provider";
import { MotionProvider } from "../../providers/motion-provider";
import { ThemeProvider } from "../../providers/theme-provider";
import { Button } from "./button";

function renderButton(ui: ReactElement) {
  return render(
    <ThemeProvider>
      <MaterialProvider>
        <MotionProvider>{ui}</MotionProvider>
      </MaterialProvider>
    </ThemeProvider>,
  );
}

afterEach(() => {
  cleanup();
});

describe("Button", () => {
  it("renders children", () => {
    renderButton(<Button>Save changes</Button>);
    expect(screen.getByRole("button", { name: "Save changes" })).toBeTruthy();
  });

  it("disables while loading", () => {
    renderButton(<Button isLoading>Saving</Button>);
    expect(screen.getByRole("button", { name: "Saving" })).toHaveProperty(
      "disabled",
      true,
    );
  });
});
