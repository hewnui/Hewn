import { expect, test } from "@playwright/test";

test("reduced-motion emulation does not break demos", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/docs/components/dialog");

  await expect(
    page.getByRole("heading", { name: "Dialog", level: 1 }),
  ).toBeVisible();

  const trigger = page.getByRole("button", { name: "Export report" });
  await expect(trigger).toBeVisible();
  await expect(trigger).toHaveAttribute("data-react-aria-pressable", "true");
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Export Northwind report?" });
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();

  await page.goto("/docs/components/button");
  await expect(
    page.getByRole("heading", { name: "Button", level: 1 }),
  ).toBeVisible();
  await expect(page.getByRole("button").first()).toBeVisible();
});

test("404 page renders", async ({ page }) => {
  const response = await page.goto("/this-route-was-never-shipped");
  expect(response?.status()).toBe(404);

  await expect(page.getByText("404")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /never shipped/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("navigation", { name: "Popular pages" }),
  ).toBeVisible();
});
