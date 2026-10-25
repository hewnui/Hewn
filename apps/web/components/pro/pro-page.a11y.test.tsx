import { ProBlocks } from "@/components/pro/pro-blocks";
import { ProHero } from "@/components/pro/pro-hero";
import { ProPrivacy } from "@/components/pro/pro-privacy";
import { MaterialProvider, MotionProvider, ThemeProvider } from "@hewnui/ui";
import { cleanup, render } from "@testing-library/react";
import { axe } from "jest-axe";
import type { ReactElement } from "react";
import { afterEach, describe, expect, it } from "vitest";

function renderPage(ui: ReactElement) {
  return render(
    <ThemeProvider>
      <MaterialProvider>
        <MotionProvider defaultMotion="off">{ui}</MotionProvider>
      </MaterialProvider>
    </ThemeProvider>,
  );
}

afterEach(() => {
  cleanup();
});

describe("/pro page regions", () => {
  it("hero waitlist region is axe-clean", async () => {
    const { container } = renderPage(<ProHero preorder={null} />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("blocks + privacy regions are axe-clean", async () => {
    const { container } = renderPage(
      <>
        <ProBlocks />
        <ProPrivacy />
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
