import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { mockMatchMedia } from "../../test/match-media";
import {
  readMotionTokensCss,
  reducedMotionBlock,
} from "../../test/reduced-motion-tokens";
import { renderWithProviders } from "../../test/render";
import { Skeleton } from "./skeleton";

afterEach(() => {
  cleanup();
  mockMatchMedia(false);
});

beforeEach(() => {
  mockMatchMedia(false);
});

describe("Skeleton", () => {
  it("renders a decorative placeholder with the control hook", () => {
    const { container } = render(<Skeleton />);
    const el = container.querySelector('[data-kp-control="skeleton"]');
    expect(el).toBeTruthy();
    expect(el?.getAttribute("aria-hidden")).toBe("true");
    expect(el?.className).toContain("animate-pulse");
    expect(el?.className).toContain("h-4");
    expect(el?.className).toContain("w-full");
  });

  it("merges custom className in place of default size", () => {
    const { container } = render(
      <Skeleton className="h-10 w-32 rounded-full" />,
    );
    const el = container.querySelector('[data-kp-control="skeleton"]');
    expect(el?.className).toContain("h-10");
    expect(el?.className).toContain("w-32");
    expect(el?.className).not.toContain("h-4");
    expect(screen.queryByRole("status")).toBeNull();
  });

  it("stays hidden from the accessibility tree", () => {
    render(<Skeleton className="h-8 w-full" />);
    expect(document.querySelector('[aria-hidden="true"]')).toBeTruthy();
    expect(screen.queryByRole("img")).toBeNull();
    expect(screen.queryByRole("status")).toBeNull();
  });

  it("respects prefers-reduced-motion via theme token override", () => {
    const block = reducedMotionBlock(readMotionTokensCss());
    expect(block).toContain('[data-kp-control="skeleton"]');
    expect(block).toMatch(
      /\[data-kp-control="skeleton"\][\s\S]*animation:\s*none/,
    );
  });

  it("keeps the reduced-motion CSS hook when the OS preference is reduce", async () => {
    mockMatchMedia(true);
    renderWithProviders(<Skeleton className="h-8 w-full" />);
    await waitFor(() => {
      expect(document.documentElement.dataset.motion).toBe("reduced");
    });
    expect(
      document.querySelector('[data-kp-control="skeleton"]'),
    ).toBeTruthy();
  });
});
