import { expect, test, type Locator, type Page } from "@playwright/test";

/** Lazy docs demos must hydrate (React Aria) before keyboard/pointer open works. */
async function waitForDemoTrigger(trigger: Locator) {
  await expect(trigger).toBeVisible();
  await expect(trigger).toBeEnabled();
  await expect(trigger).toHaveAttribute("data-react-aria-pressable", "true");
}

async function gotoDemo(page: Page, path: string) {
  await page.goto(path);
  await page.waitForLoadState("domcontentloaded");
}

test("Dialog keyboard: open, focus trap, Escape closes, focus returns", async ({
  page,
}) => {
  await gotoDemo(page, "/docs/components/dialog");
  const trigger = page.getByRole("button", { name: "Archive project" });
  await waitForDemoTrigger(trigger);
  await trigger.click();

  const dialog = page.getByRole("dialog", { name: "Archive Northwind?" });
  await expect(dialog).toBeVisible();
  await expect(dialog).toBeFocused();

  await page.keyboard.press("Tab");
  await expect(dialog.getByRole("button").first()).toBeFocused();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await expect(dialog.locator(":focus")).toHaveCount(1);

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("Menu keyboard opens, navigates, and Escape returns focus", async ({
  page,
}) => {
  await gotoDemo(page, "/docs/components/menu");
  const trigger = page.getByRole("button", { name: "Actions" });
  await waitForDemoTrigger(trigger);
  await expect(trigger).toHaveAttribute("aria-haspopup", "true");
  await trigger.focus();
  await page.keyboard.press("Enter");

  const edit = page.getByRole("menuitem", { name: "Edit" });
  const duplicate = page.getByRole("menuitem", { name: "Duplicate" });
  await expect(edit).toBeVisible();
  await expect(page.getByRole("menu")).toBeVisible();

  await page.keyboard.press("ArrowDown");
  await expect(duplicate).toHaveAttribute("data-focused", "true");

  await page.keyboard.press("Escape");
  await expect(edit).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("Select keyboard opens listbox and chooses an option", async ({ page }) => {
  await gotoDemo(page, "/docs/components/select");
  const trigger = page.getByRole("button", { name: /Theme pack/i });
  await waitForDemoTrigger(trigger);
  await trigger.click();

  const listbox = page.getByRole("listbox");
  await expect(listbox).toBeVisible();
  await page.getByRole("option", { name: "Tide" }).click();
  await expect(listbox).toBeHidden();
  await expect(trigger).toContainText("Tide");
});

test("Combobox keyboard filters and selects", async ({ page }) => {
  await gotoDemo(page, "/docs/components/combobox");
  const input = page.getByRole("combobox", { name: "City" });
  await expect(input).toBeVisible();
  await expect(input).toBeEnabled();
  await input.click();
  await input.fill("Por");

  const listbox = page.getByRole("listbox");
  await expect(listbox).toBeVisible();
  await page.getByRole("option", { name: "Porto" }).click();
  await expect(input).toHaveValue("Porto");
});
