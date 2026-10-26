import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
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
  document.documentElement.classList.remove("dark");
  document.documentElement.style.colorScheme = "";
});

function ThemeProbe() {
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

function ModeProbe() {
  const { mode, setMode } = useTheme();
  return (
    <div>
      <span data-testid="mode">{mode}</span>
      <button type="button" onClick={() => setMode("dark")}>
        dark
      </button>
      <button type="button" onClick={() => setMode("light")}>
        light
      </button>
    </div>
  );
}

function mockColorScheme(matchesDark: boolean) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    configurable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches:
        query === "(prefers-color-scheme: dark)" ? matchesDark : false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

describe("ThemeProvider custom packs", () => {
  beforeEach(() => {
    mockColorScheme(false);
    localStorage.clear();
  });

  it("keeps built-in ids distinct from custom strings", () => {
    expect(isBuiltInTheme("forest")).toBe(true);
    expect(isBuiltInTheme("studio-draft")).toBe(false);
  });

  it("sets data-theme to a custom pack id instead of remapping to forest", async () => {
    render(
      <ThemeProvider defaultTheme="studio-draft" defaultMode="light">
        <ThemeProbe />
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
        <ThemeProbe />
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

describe("ThemeProvider system mode", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("follows prefers-color-scheme when storage is empty", async () => {
    mockColorScheme(true);
    render(
      <ThemeProvider>
        <ModeProbe />
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("mode").textContent).toBe("dark");
    });
    expect(document.documentElement.dataset.mode).toBe("dark");
    expect(localStorage.getItem("kp-mode")).toBeNull();
  });

  it("keeps an explicit stored mode over the OS preference", async () => {
    mockColorScheme(true);
    localStorage.setItem("kp-mode", "light");
    localStorage.setItem("kp-theme", "forest");

    render(
      <ThemeProvider>
        <ModeProbe />
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("mode").textContent).toBe("light");
    });
    expect(localStorage.getItem("kp-mode")).toBe("light");
  });

  it("persists after the user toggles mode", async () => {
    mockColorScheme(true);
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <ModeProbe />
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("mode").textContent).toBe("dark");
    });
    await user.click(screen.getByRole("button", { name: "light" }));
    await waitFor(() => {
      expect(screen.getByTestId("mode").textContent).toBe("light");
    });
    expect(localStorage.getItem("kp-mode")).toBe("light");
  });
});
