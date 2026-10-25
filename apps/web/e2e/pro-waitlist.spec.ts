import { expect, test } from "@playwright/test";
import { trackConsoleErrors } from "./helpers";

test.describe("Pro waitlist", () => {
  test("happy path joins the waitlist", async ({ page }) => {
    const errors = trackConsoleErrors(page);
    await page.goto("/pro");
    await expect(
      page.getByRole("heading", { level: 1, name: /join the waitlist/i }),
    ).toBeVisible();

    const email = `e2e-${Date.now()}@example.com`;
    await page.getByLabel(/work email/i).fill(email);
    await page.getByRole("button", { name: /join the pro waitlist/i }).click();

    await expect(page.getByText(/you are on the waitlist/i)).toBeVisible();
    expect(errors.list, errors.list.join("\n")).toEqual([]);
  });

  test("error path shows unavailable message", async ({ page }) => {
    await page.route("**/api/waitlist", async (route) => {
      await route.fulfill({
        status: 503,
        contentType: "application/json",
        body: JSON.stringify({
          ok: false,
          code: "unavailable",
          message: "Waitlist temporarily unavailable.",
        }),
      });
    });

    await page.goto("/pro");
    await page.getByLabel(/work email/i).fill("dev@example.com");
    await page.getByRole("button", { name: /join the pro waitlist/i }).click();

    await expect(
      page.getByText("Waitlist temporarily unavailable."),
    ).toBeVisible();
  });

  test("home teaser links to /pro waitlist", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /join the pro waitlist/i }).click();
    await expect(page).toHaveURL(/\/pro#waitlist$/);
    await expect(page.locator("#waitlist")).toBeVisible();
  });
});
