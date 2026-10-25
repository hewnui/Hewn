import { expect, test } from "@playwright/test";
import {
  gotoDocsSample,
  gotoHero,
  gotoProPage,
  gotoVisualGallery,
} from "./helpers";
import { galleryWidths, snapshotOpts, themeModeMatrix } from "./matrix";

test("pro forest/light @ 1440", async ({ page }) => {
  const pair = { theme: "forest", mode: "light" } as const;
  await page.setViewportSize({ width: 1440, height: 900 });
  await gotoProPage(page, pair);
  await expect(page.locator("[data-visual-pro]")).toHaveScreenshot(
    `pro-${pair.theme}-${pair.mode}-1440.png`,
    snapshotOpts,
  );
});

for (const pair of themeModeMatrix) {
  for (const width of galleryWidths) {
    test(`gallery ${pair.theme}/${pair.mode} @ ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await gotoVisualGallery(page, pair);
      await expect(page.locator("#visual-gallery")).toHaveScreenshot(
        `gallery-${pair.theme}-${pair.mode}-${width}.png`,
        { ...snapshotOpts, fullPage: true },
      );
    });
  }

  test(`hero ${pair.theme}/${pair.mode} @ 1440`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoHero(page, pair);
    await expect(page.locator("[data-visual-hero]")).toHaveScreenshot(
      `hero-${pair.theme}-${pair.mode}-1440.png`,
      snapshotOpts,
    );
  });

  test(`docs button ${pair.theme}/${pair.mode} @ 1440`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoDocsSample(page, pair);
    // Viewport capture — full `main` stitches with sticky docs chrome and never settles.
    await expect(page).toHaveScreenshot(
      `docs-button-${pair.theme}-${pair.mode}-1440.png`,
      snapshotOpts,
    );
  });
}
