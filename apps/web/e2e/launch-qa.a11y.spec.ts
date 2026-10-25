import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { NEW_COMPONENTS, seedLaunchAppearance } from "./launch-qa.helpers";

for (const name of NEW_COMPONENTS) {
  test(`axe serious/critical: ${name}`, async ({ page }) => {
    await seedLaunchAppearance(page, "light");
    await page.goto(`/docs/components/${name}`, {
      waitUntil: "domcontentloaded",
    });
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
