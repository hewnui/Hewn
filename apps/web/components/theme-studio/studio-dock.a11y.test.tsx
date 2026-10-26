import { StudioDock } from "@/components/theme-studio/studio-dock";
import { MaterialProvider, MotionProvider, ThemeProvider } from "@hewnui/ui";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { afterEach, describe, expect, it, vi } from "vitest";

const noop = vi.fn();

function renderDock() {
  return render(
    <ThemeProvider>
      <MaterialProvider>
        <MotionProvider defaultMotion="off">
          <StudioDock
            basePackId="forest"
            accentSeed="#e67e22"
            radiusPreset="soft"
            previewMode="light"
            adjustments={["accent"]}
            pro={{
              neutrals: {},
              semantic: {},
              shape: {},
              glass: {},
              motion: "balanced",
            }}
            onBasePack={noop}
            onAccent={noop}
            onRadius={noop}
            onPreviewMode={noop}
            onProChange={noop}
            onAiApply={noop}
            onDownloadCss={noop}
            onReset={noop}
            onFreeExport={noop}
            onProExport={noop}
          />
        </MotionProvider>
      </MaterialProvider>
    </ThemeProvider>,
  );
}

afterEach(() => {
  cleanup();
  noop.mockClear();
});

describe("StudioDock a11y", () => {
  it("collapsed dock is axe-clean and names the expand control", async () => {
    const { container } = renderDock();
    const expand = screen.getByRole("button", {
      name: "Expand Theme Studio authoring",
    });
    expect(expand.getAttribute("aria-expanded")).toBe("false");
    expect(await axe(container)).toHaveNoViolations();
  });

  it("opens via keyboard and exposes named tabs", async () => {
    const user = userEvent.setup();
    const { container } = renderDock();
    const expand = screen.getByRole("button", {
      name: "Expand Theme Studio authoring",
    });
    expand.focus();
    await user.keyboard("{Enter}");
    const collapse = screen.getByRole("button", {
      name: "Collapse Theme Studio authoring",
    });
    expect(collapse.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByRole("tab", { name: "Tokens" })).toBeTruthy();
    expect(screen.getByRole("tab", { name: "Export" })).toBeTruthy();
    expect(await axe(container)).toHaveNoViolations();
  });
});
