import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const pages = [
  { name: "home", path: "/" },
  { name: "docs", path: "/docs" },
  { name: "button", path: "/docs/components/button" },
  { name: "dialog", path: "/docs/components/dialog" },
  { name: "select", path: "/docs/components/select" },
] as const;

for (const entry of pages) {
  test(`axe serious/critical: ${entry.name}`, async ({ page }) => {
    await page.goto(entry.path);
    await page.waitForLoadState("domcontentloaded");

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const serious = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );

    expect(
      serious,
      serious
        .map(
          (v) =>
            `${v.id} (${v.impact}): ${v.help} — ${v.nodes
              .slice(0, 3)
              .map((n) => n.target.join(" "))
              .join("; ")}`,
        )
        .join("\n"),
    ).toEqual([]);
  });
}
