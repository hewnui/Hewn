import { expect, test } from "@playwright/test";
import { trackConsoleErrors } from "./helpers";
import {
  captureViewport,
  DOCS_PAGES,
  expectHonestCopy,
  expectNoHorizontalOverflow,
  seedLaunchAppearance,
  VIEWPORTS,
} from "./launch-qa.helpers";

for (const viewport of VIEWPORTS) {
  for (const mode of ["light", "dark"] as const) {
    test(`walk + screenshot ${viewport.name} ${mode}`, async ({
      page,
    }, testInfo) => {
      testInfo.setTimeout(180_000);
      await page.setViewportSize(viewport);
      await seedLaunchAppearance(page, mode);
      const errors = trackConsoleErrors(page);
      const pages = ["/", ...DOCS_PAGES, "/qa/visual"] as const;

      for (const path of pages) {
        const res = await page.goto(path, { waitUntil: "domcontentloaded" });
        expect(res?.ok(), `${path} status`).toBeTruthy();
        await page.waitForTimeout(250);
        await expectNoHorizontalOverflow(page, path);

        const shouldShot =
          path === "/" ||
          path === "/docs/getting-started" ||
          path === "/docs/components" ||
          path.startsWith("/docs/components/") ||
          path === "/qa/visual";
        if (shouldShot) {
          await captureViewport(
            page,
            path === "/" ? "home" : path.slice(1),
            viewport,
            mode,
          );
        }

        if (path === "/" || path === "/docs/getting-started") {
          await expectHonestCopy(page, path);
        }
      }

      expect(errors.list, errors.list.join("\n")).toEqual([]);
    });
  }
}

test("motion modes and prefers-reduced-motion", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await seedLaunchAppearance(page, "light", "off");
  await page.goto("/docs/components/button", {
    waitUntil: "domcontentloaded",
  });
  await expect(page.locator("html")).toHaveAttribute("data-motion", "off");

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload({ waitUntil: "domcontentloaded" });
  const motionAttr = await page.locator("html").getAttribute("data-motion");
  expect(["reduced", "off"]).toContain(motionAttr);

  await page.goto("/qa/visual", { waitUntil: "domcontentloaded" });
  await captureViewport(
    page,
    "qa_visual-reduced",
    { name: "desktop", width: 1440, height: 900 },
    "light",
  );
});

test("keyboard focus is visible on docs chrome", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await seedLaunchAppearance(page, "light");
  await page.goto("/docs/getting-started", {
    waitUntil: "domcontentloaded",
  });

  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  const focused = page.locator(":focus-visible");
  await expect(focused.first()).toBeVisible();
  const outline = await focused.first().evaluate((el) => {
    const styles = getComputedStyle(el);
    return {
      outlineWidth: styles.outlineWidth,
      outlineStyle: styles.outlineStyle,
      boxShadow: styles.boxShadow,
    };
  });
  const hasFocusRing =
    (outline.outlineStyle !== "none" &&
      Number.parseFloat(outline.outlineWidth) > 0) ||
    outline.boxShadow !== "none";
  expect(hasFocusRing).toBe(true);
});
