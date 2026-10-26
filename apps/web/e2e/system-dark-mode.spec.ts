import { expect, test } from "@playwright/test";

test.describe("system color scheme", () => {
  test.use({ colorScheme: "dark" });

  test("follows OS dark preference with empty storage and no flash to light", async ({
    page,
  }, testInfo) => {
    await page.addInitScript(() => {
      localStorage.clear();
    });

    await page.goto("/", { waitUntil: "domcontentloaded" });

    const mode = await page.locator("html").getAttribute("data-mode");
    expect(mode).toBe("dark");
    await expect(page.locator("html")).toHaveClass(/dark/);

    const stored = await page.evaluate(() => localStorage.getItem("kp-mode"));
    expect(stored).toBeNull();

    const shot = testInfo.outputPath("system-dark-home.png");
    await page.screenshot({ path: shot, fullPage: false });
    await testInfo.attach("system-dark-home", {
      path: shot,
      contentType: "image/png",
    });
  });
});
