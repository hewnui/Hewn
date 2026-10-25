import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { mockMatchMedia } from "../../test/match-media";
import {
  readMotionTokensCss,
  reducedMotionBlock,
} from "../../test/reduced-motion-tokens";
import { renderWithProviders } from "../../test/render";
import { Spinner } from "./spinner";

afterEach(() => {
  cleanup();
  mockMatchMedia(false);
});

beforeEach(() => {
  mockMatchMedia(false);
});

describe("Spinner", () => {
  it("renders a decorative spinner with the motion token class", () => {
    const { container } = render(<Spinner />);
    const el = container.querySelector(".kp-spinner");
    expect(el).toBeTruthy();
    expect(el?.tagName).toBe("SPAN");
    expect(el?.getAttribute("aria-hidden")).toBe("true");
  });

  it("merges custom className onto the spinner", () => {
    const { container } = render(<Spinner className="text-accent size-6" />);
    const el = container.querySelector(".kp-spinner");
    expect(el?.className).toContain("kp-spinner");
    expect(el?.className).toContain("text-accent");
    expect(el?.className).toContain("size-6");
  });

  it("stays hidden from the accessibility tree", () => {
    render(<Spinner />);
    expect(document.querySelector('[aria-hidden="true"]')).toBeTruthy();
    expect(screen.queryByRole("status")).toBeNull();
    expect(screen.queryByRole("progressbar")).toBeNull();
  });

  it("respects prefers-reduced-motion via theme token override", () => {
    const css = readMotionTokensCss();
    expect(css).toMatch(/\.kp-spinner[\s\S]*animation:\s*kp-spin/);
    const block = reducedMotionBlock(css);
    expect(block).toContain(".kp-spinner");
    expect(block).toMatch(/\.kp-spinner[\s\S]*animation:\s*none/);
  });

  it("keeps the spinner class when the OS preference is reduce", async () => {
    mockMatchMedia(true);
    renderWithProviders(<Spinner />);
    await waitFor(() => {
      expect(document.documentElement.dataset.motion).toBe("reduced");
    });
    expect(document.querySelector(".kp-spinner")).toBeTruthy();
  });
});
