import { readdir, readFile } from "fs/promises";
import { join } from "path";

const HAND_PROPS = /^##\s+Props\s*$/m;
const HAND_INSTALL = /^##\s+Install\s*$/m;

export type DocsPageCheckResult = {
  missingApi: string[];
  handWrittenProps: string[];
  handWrittenInstall: string[];
};

/**
 * Ensure every component docs page has generated API data and no
 * hand-maintained Props/Install sections (those come from shared components).
 */
export async function checkComponentDocsPages(
  docsComponentsDir: string,
  apiNames: Set<string>,
): Promise<DocsPageCheckResult> {
  const entries = await readdir(docsComponentsDir);
  const missingApi: string[] = [];
  const handWrittenProps: string[] = [];
  const handWrittenInstall: string[] = [];

  for (const entry of entries) {
    if (!entry.endsWith(".mdx") || entry === "index.mdx") continue;
    const name = entry.replace(/\.mdx$/, "");
    if (!apiNames.has(name)) {
      missingApi.push(name);
    }

    const body = await readFile(join(docsComponentsDir, entry), "utf8");
    if (HAND_PROPS.test(body)) handWrittenProps.push(name);
    if (HAND_INSTALL.test(body)) handWrittenInstall.push(name);
  }

  return { missingApi, handWrittenProps, handWrittenInstall };
}

export function formatDocsPageErrors(result: DocsPageCheckResult): string[] {
  const errors: string[] = [];
  for (const name of result.missingApi) {
    errors.push(
      `${name}: component docs page lacks generated API reference metadata`,
    );
  }
  for (const name of result.handWrittenProps) {
    errors.push(
      `${name}: remove hand-written ## Props — use generated DocsApiReference`,
    );
  }
  for (const name of result.handWrittenInstall) {
    errors.push(
      `${name}: remove hand-written ## Install — use shared DocsInstallBlock`,
    );
  }
  return errors;
}
