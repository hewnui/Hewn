import { expect, test } from "@playwright/test";

test("docs navigation reaches a component page", async ({ page }) => {
  await page.goto("/docs");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  await page.getByRole("link", { name: "Components", exact: true }).first().click();
  await expect(page).toHaveURL(/\/docs\/components\/?$/);

  await page.getByRole("link", { name: "Button", exact: true }).first().click();
  await expect(page).toHaveURL(/\/docs\/components\/button\/?$/);
  await expect(
    page.getByRole("heading", { name: "Button", level: 1 }),
  ).toBeVisible();
});

test("docs search returns a component", async ({ page }) => {
  await page.goto("/docs");
  // Wait for client hydration — the SSR trigger is visible before onClick
  // attaches, so an early click is a no-op under parallel worker load.
  await page.waitForLoadState("networkidle");

  const trigger = page.getByRole("button", { name: /Search docs/i });
  await expect(trigger).toBeVisible();
  await trigger.click();
  await expect(page.getByRole("dialog")).toBeVisible({ timeout: 15_000 });

  const search = page.getByPlaceholder("Search");
  await expect(search).toBeVisible();
  await search.fill("Dialog");

  // Fumadocs search hits are buttons whose name includes breadcrumbs + title.
  const result = page
    .getByRole("button", { name: /Documentation.*Components.*Dialog/i })
    .first();
  await expect(result).toBeVisible({ timeout: 15_000 });
  await result.click();
  await expect(page).toHaveURL(/\/docs\/components\/dialog\/?$/);
  await expect(
    page.getByRole("heading", { name: "Dialog", level: 1 }),
  ).toBeVisible();
});

