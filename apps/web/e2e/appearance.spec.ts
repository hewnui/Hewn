import { expect, test } from "@playwright/test";
import { expectAppearance, setDocsAppearance } from "./helpers";

test("theme, mode, and material persist across navigation and reload", async ({
  page,
}) => {
  await page.goto("/docs/getting-started");

  const next = { theme: "forest", mode: "light", material: "solid" } as const;
  await setDocsAppearance(page, next);

  await page.getByRole("link", { name: "Components", exact: true }).first().click();
  await expect(page).toHaveURL(/\/docs\/components/);
  await expectAppearance(page, next);

  await page.getByRole("link", { name: "Button", exact: true }).first().click();
  await expect(page).toHaveURL(/\/docs\/components\/button/);
  await expectAppearance(page, next);

  await page.reload();
  await expectAppearance(page, next);
  await expect(
    page.getByRole("heading", { name: "Button", level: 1 }),
  ).toBeVisible();
});
