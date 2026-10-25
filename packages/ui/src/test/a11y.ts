import { configureAxe } from "jest-axe";
import { expect } from "vitest";

type A11yOptions = {
  /** Extra axe rule ids to disable. Each disable needs a justifying comment at the call site. */
  disableRules?: string[];
};

/**
 * Run axe against a rendered container and assert zero violations.
 *
 * `color-contrast` is disabled globally here: jsdom does not resolve Tailwind /
 * OKLCH CSS variables to computed colors, so contrast checks are unreliable in
 * unit tests. Visual contrast remains a Theme Lab / Playwright concern.
 */
export async function expectNoA11yViolations(
  container: Element,
  options: A11yOptions = {},
): Promise<void> {
  const disabled = new Set(["color-contrast", ...(options.disableRules ?? [])]);
  const rules = Object.fromEntries(
    [...disabled].map((id) => [id, { enabled: false }]),
  );
  const run = configureAxe({ rules });
  const results = await run(container);
  expect(results).toHaveNoViolations();
}
