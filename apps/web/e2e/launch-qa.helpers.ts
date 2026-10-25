import { expect, type Page } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

export const ARTIFACT_DIR =
  process.env.LAUNCH_QA_DIR ?? "/opt/cursor/artifacts/launch-qa";

export const NEW_COMPONENTS = [
  "card",
  "empty",
  "donut-chart",
  "tag-field",
  "pagination",
  "command-palette",
  "stepper",
  "date-range-picker",
  "color-picker",
] as const;

export const DOCS_PAGES = [
  "/docs/getting-started",
  "/docs/components",
  "/docs/theme-lab",
  "/docs/cli",
  "/docs/roadmap",
  ...NEW_COMPONENTS.map((name) => `/docs/components/${name}`),
] as const;

export const FORBIDDEN_COPY = [
  /open[\s-]?source/i,
  /built in the open/i,
  /free forever/i,
];

export const VIEWPORTS = [
  { name: "mobile", width: 375, height: 812 },
  { name: "desktop", width: 1440, height: 900 },
] as const;

mkdirSync(ARTIFACT_DIR, { recursive: true });

export async function seedLaunchAppearance(
  page: Page,
  mode: "light" | "dark",
  motion: "full" | "reduced" | "off" = "full",
) {
  await page.addInitScript(
    ({ modeValue, motionValue }) => {
      localStorage.setItem("kp-theme", "forest");
      localStorage.setItem("kp-mode", modeValue);
      localStorage.setItem("kp-material", "solid");
      localStorage.setItem("kp-radius", "soft");
      localStorage.setItem("kp-motion", motionValue);
    },
    { modeValue: mode, motionValue: motion },
  );
}

export async function captureViewport(
  page: Page,
  label: string,
  viewport: (typeof VIEWPORTS)[number],
  mode: string,
) {
  const file = join(
    ARTIFACT_DIR,
    `${label.replace(/\//g, "_")}-${viewport.name}-${mode}.png`,
  );
  await page.screenshot({ path: file, fullPage: false });
}

export async function expectNoHorizontalOverflow(page: Page, path: string) {
  const overflow = await page.evaluate(() => {
    const doc = document.documentElement;
    return { scrollWidth: doc.scrollWidth, clientWidth: doc.clientWidth };
  });
  expect(
    overflow.scrollWidth,
    `${path} horizontal overflow`,
  ).toBeLessThanOrEqual(overflow.clientWidth + 1);
}

export async function expectHonestCopy(page: Page, path: string) {
  const text = await page.locator("body").innerText();
  for (const pattern of FORBIDDEN_COPY) {
    expect(text, `${path} honest-copy ${pattern}`).not.toMatch(pattern);
  }
}
