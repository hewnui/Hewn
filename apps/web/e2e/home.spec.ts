import { expect, test } from "@playwright/test";
import { trackConsoleErrors } from "./helpers";

test("homepage loads without console errors", async ({ page }) => {
  const errors = trackConsoleErrors(page);

  await page.goto("/");
  await expect(
    page.getByRole("heading", { level: 1 }).first(),
  ).toBeVisible();
  await expect(page.getByText(/Hewn/i).first()).toBeVisible();

  await page.waitForLoadState("networkidle");
  expect(errors.list, errors.list.join("\n")).toEqual([]);
});
