import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import {
  ThemeProvider,
  isBuiltInTheme,
  useTheme,
} from "./theme-provider";

afterEach(() => {
  cleanup();
  localStorage.clear();
  document.documentElement.removeAttribute("data-theme");
  document.documentElement.removeAttribute("data-mode");
});

function Probe() {
  const { theme, mode, supportedModes, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="mode">{mode}</span>
      <span data-testid="modes">{supportedModes.join(",")}</span>
      <button type="button" onClick={() => setTheme("studio-draft")}>
        custom
      </button>
      <button type="button" onClick={() => setTheme("forest")}>
        forest
      </button>
    </div>
  );
}

describe("ThemeProvider custom packs", () => {
  it("keeps built-in ids distinct from custom strings", () => {
    expect(isBuiltInTheme("forest")).toBe(true);
    expect(isBuiltInTheme("studio-draft")).toBe(false);
  });

  it("sets data-theme to a custom pack id instead of remapping to forest", async () => {
    render(
      <ThemeProvider defaultTheme="studio-draft" defaultMode="light">
        <Probe />
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(document.documentElement.dataset.theme).toBe("studio-draft");
    });
    expect(screen.getByTestId("theme").textContent).toBe("studio-draft");
    expect(document.documentElement.dataset.mode).toBe("light");
    expect(screen.getByTestId("modes").textContent).toBe("light,dark");
  });

  it("can switch to a custom id via setTheme", async () => {
    render(
      <ThemeProvider defaultTheme="forest">
        <Probe />
      </ThemeProvider>,
    );
    await waitFor(() => {
      expect(document.documentElement.dataset.theme).toBe("forest");
    });
    screen.getByRole("button", { name: "custom" }).click();
    await waitFor(() => {
      expect(document.documentElement.dataset.theme).toBe("studio-draft");
    });
  });
});
