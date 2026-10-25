import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MotionProvider, useMotionMode } from "./motion-provider";

afterEach(() => {
  cleanup();
  localStorage.clear();
  document.documentElement.removeAttribute("data-motion");
});

function Probe() {
  const { motion, effectiveMode, motionEnabled, reducedMotion, setMotion } =
    useMotionMode();
  return (
    <div>
      <span data-testid="preference">{motion}</span>
      <span data-testid="effective">{effectiveMode}</span>
      <span data-testid="enabled">{String(motionEnabled)}</span>
      <span data-testid="os">{String(reducedMotion)}</span>
      <button type="button" onClick={() => setMotion("full")}>
        full
      </button>
      <button type="button" onClick={() => setMotion("reduced")}>
        reduced
      </button>
      <button type="button" onClick={() => setMotion("off")}>
        off
      </button>
    </div>
  );
}

function mockMatchMedia(matches: boolean) {
  const listeners = new Set<() => void>();
  const media = {
    matches,
    media: "(prefers-reduced-motion: reduce)",
    onchange: null,
    addEventListener: (_: string, listener: () => void) => {
      listeners.add(listener);
    },
    removeEventListener: (_: string, listener: () => void) => {
      listeners.delete(listener);
    },
    addListener: () => undefined,
    removeListener: () => undefined,
    dispatchEvent: () => false,
    setMatches(next: boolean) {
      media.matches = next;
      for (const listener of listeners) listener();
    },
  };
  vi.stubGlobal("matchMedia", () => media);
  return media;
}

describe("MotionProvider", () => {
  beforeEach(() => {
    mockMatchMedia(false);
  });

  it("defaults to full when OS allows motion", async () => {
    render(
      <MotionProvider>
        <Probe />
      </MotionProvider>,
    );
    await waitFor(() => {
      expect(screen.getByTestId("effective").textContent).toBe("full");
    });
    expect(screen.getByTestId("enabled").textContent).toBe("true");
    expect(document.documentElement.dataset.motion).toBe("full");
  });

  it("lets the user step down to reduced and off", async () => {
    const user = userEvent.setup();
    render(
      <MotionProvider>
        <Probe />
      </MotionProvider>,
    );
    await user.click(screen.getByRole("button", { name: "reduced" }));
    expect(screen.getByTestId("preference").textContent).toBe("reduced");
    expect(screen.getByTestId("effective").textContent).toBe("reduced");
    expect(screen.getByTestId("enabled").textContent).toBe("false");
    expect(document.documentElement.dataset.motion).toBe("reduced");

    await user.click(screen.getByRole("button", { name: "off" }));
    expect(screen.getByTestId("effective").textContent).toBe("off");
    expect(document.documentElement.dataset.motion).toBe("off");
  });

  it("keeps OS reduced-motion above a full preference", async () => {
    mockMatchMedia(true);
    const user = userEvent.setup();
    render(
      <MotionProvider defaultMotion="full">
        <Probe />
      </MotionProvider>,
    );
    await waitFor(() => {
      expect(screen.getByTestId("os").textContent).toBe("true");
    });
    expect(screen.getByTestId("preference").textContent).toBe("full");
    expect(screen.getByTestId("effective").textContent).toBe("reduced");
    expect(screen.getByTestId("enabled").textContent).toBe("false");
    expect(document.documentElement.dataset.motion).toBe("reduced");

    await user.click(screen.getByRole("button", { name: "full" }));
    expect(screen.getByTestId("effective").textContent).toBe("reduced");
  });

  it("migrates legacy localStorage on → full", async () => {
    localStorage.setItem("kp-motion", "on");
    render(
      <MotionProvider defaultMotion="off">
        <Probe />
      </MotionProvider>,
    );
    await waitFor(() => {
      expect(screen.getByTestId("preference").textContent).toBe("full");
    });
  });
});
