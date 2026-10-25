import { expect, type Page } from "@playwright/test";

/** Ignore third-party telemetry / browser chrome noise in smoke runs. */
const ignoredConsole = [
  /vercel\.live/i,
  /speedinsights/i,
  /va\.vercel-scripts/i,
  /\/_vercel\//i,
  /Failed to fetch/i,
  /net::ERR_/i,
];

const ignoredRequestHosts = [
  /va\.vercel-scripts\.com/i,
  /vitals\.vercel-insights\.com/i,
  /vercel\.live/i,
  /\/_vercel\//i,
];

export function trackConsoleErrors(page: Page) {
  const errors: string[] = [];
  const failedUrls = new Set<string>();

  page.on("response", (response) => {
    if (response.status() < 400) return;
    const url = response.url();
    if (ignoredRequestHosts.some((pattern) => pattern.test(url))) return;
    failedUrls.add(`${response.status()} ${url}`);
  });

  page.on("console", (msg) => {
    if (msg.type() !== "error") return;
    const text = msg.text();
    if (ignoredConsole.some((pattern) => pattern.test(text))) return;
    // Resource failures are reported with URLs via the response listener.
    if (/Failed to load resource/i.test(text)) return;
    errors.push(text);
  });

  page.on("pageerror", (error) => {
    const text = error.message;
    if (ignoredConsole.some((pattern) => pattern.test(text))) return;
    errors.push(text);
  });

  return {
    get list() {
      return [...errors, ...failedUrls];
    },
  };
}

export async function appearanceRoot(page: Page) {
  return page.locator("html");
}

export async function expectAppearance(
  page: Page,
  next: { theme: string; mode: string; material: string },
) {
  const root = await appearanceRoot(page);
  await expect(root).toHaveAttribute("data-theme", next.theme);
  await expect(root).toHaveAttribute("data-mode", next.mode);
  await expect(root).toHaveAttribute("data-material", next.material);
}

export async function openDocsAppearance(page: Page) {
  const toggle = page.getByRole("button", {
    name: /Appearance settings:/i,
  });
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
}

export async function setDocsAppearance(
  page: Page,
  next: { theme: string; mode: string; material: string },
) {
  await openDocsAppearance(page);
  await page.getByRole("button", { name: `${next.theme} theme` }).click();
  await page.getByRole("button", { name: next.mode, exact: true }).click();
  await page.getByRole("button", { name: next.material, exact: true }).click();
  await expectAppearance(page, next);
}
