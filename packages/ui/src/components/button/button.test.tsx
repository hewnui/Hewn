import { cleanup, render, screen } from "@testing-library/react";
import type { ReactElement } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
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

function mockMatchMedia(matches: boolean) {
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches,
    media: query,
    onchange: null,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    addListener: () => undefined,
    removeListener: () => undefined,
    dispatchEvent: () => false,
  }));
}

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("Button", () => {
  beforeEach(() => {
    mockMatchMedia(false);
  });

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

  it("renders with no providers", () => {
    render(<Button>Bare</Button>);
    expect(screen.getByRole("button", { name: "Bare" })).toBeTruthy();
  });

  it("renders with only ThemeProvider", () => {
    render(
      <ThemeProvider>
        <Button>Themed</Button>
      </ThemeProvider>,
    );
    expect(screen.getByRole("button", { name: "Themed" })).toBeTruthy();
  });

  it("renders under reduced motion without MotionProvider", () => {
    mockMatchMedia(true);
    render(
      <ThemeProvider>
        <Button>Quiet</Button>
      </ThemeProvider>,
    );
    const button = screen.getByRole("button", { name: "Quiet" });
    expect(button).toBeTruthy();
    expect(button.className).not.toMatch(/active:scale/);
  });
});
