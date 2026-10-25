import { expect, type Page } from "@playwright/test";
import type { ThemeModePair } from "./matrix";

const APPEARANCE = {
  material: "solid",
  radius: "soft",
  motion: "off",
} as const;

/** Seed appearance before first paint (anti-FOUC script reads localStorage). */
export async function seedAppearance(page: Page, pair: ThemeModePair) {
  await page.addInitScript(
    ({ theme, mode, material, radius, motion }) => {
      localStorage.setItem("kp-theme", theme);
      localStorage.setItem("kp-mode", mode);
      localStorage.setItem("kp-material", material);
      localStorage.setItem("kp-radius", radius);
      localStorage.setItem("kp-motion", motion);
    },
    { ...pair, ...APPEARANCE },
  );
}

export async function prepareVisualPage(page: Page) {
  await page.emulateMedia({ reducedMotion: "reduce", colorScheme: "no-preference" });
}

/** Freeze CSS motion/carets so Playwright can settle baseline captures. */
export async function freezeVisualChrome(page: Page) {
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation: none !important;
        transition: none !important;
        caret-color: transparent !important;
      }
      .kp-spinner,
      .kp-progress-indeterminate,
      [data-kp-control="skeleton"] {
        animation: none !important;
      }
    `,
  });
}

export async function waitForVisualReady(page: Page, pair: ThemeModePair) {
  await page.waitForLoadState("domcontentloaded");
  await expect(page.locator("html")).toHaveAttribute("data-theme", pair.theme);
  await expect(page.locator("html")).toHaveAttribute("data-mode", pair.mode);
  await expect(page.locator("html")).toHaveAttribute("data-material", "solid");
  await expect(page.locator("html")).toHaveAttribute("data-motion", "off");

  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
  });
  await freezeVisualChrome(page);

  // Settle layout after font swap; animations are disabled at capture time.
  await page.waitForTimeout(150);
}

export async function gotoVisualGallery(page: Page, pair: ThemeModePair) {
  await prepareVisualPage(page);
  await seedAppearance(page, pair);
  await page.goto(
    `/qa/visual?theme=${pair.theme}&mode=${pair.mode}`,
    { waitUntil: "networkidle" },
  );
  await waitForVisualReady(page, pair);
  await expect(page.locator("#visual-gallery")).toBeVisible();
}

export async function gotoHero(page: Page, pair: ThemeModePair) {
  await prepareVisualPage(page);
  await seedAppearance(page, pair);
  await page.goto("/", { waitUntil: "networkidle" });
  await waitForVisualReady(page, pair);
  await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
}

export async function gotoDocsSample(page: Page, pair: ThemeModePair) {
  await prepareVisualPage(page);
  await seedAppearance(page, pair);
  await page.goto("/docs/components/button", { waitUntil: "networkidle" });
  await waitForVisualReady(page, pair);
  await expect(
    page.getByRole("heading", { name: "Button", level: 1 }),
  ).toBeVisible();
}

/** New page only — forest light @ 1440 baseline for /pro. */
export async function gotoProPage(page: Page, pair: ThemeModePair) {
  await prepareVisualPage(page);
  await seedAppearance(page, pair);
  await page.goto("/pro", { waitUntil: "networkidle" });
  await waitForVisualReady(page, pair);
  await expect(page.locator("[data-visual-pro]")).toBeVisible();
}
