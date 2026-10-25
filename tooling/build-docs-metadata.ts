import { mkdir, readFile, writeFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { buildAiIndex, enrichAiDocument } from "../packages/docs-metadata/src/ai-emit";
import { scanAiComponents } from "../packages/docs-metadata/src/ai-scan";
import {
  checkComponentDocsPages,
  formatDocsPageErrors,
} from "../packages/docs-metadata/src/check-docs-pages";
import {
  buildLlmsTxt,
  type RegistryIndexItem,
} from "../packages/docs-metadata/src/index";
import {
  assertApiComplete,
  resolveComponentApi,
} from "../packages/docs-metadata/src/resolve-api";
import { resolveCanonicalSiteUrl } from "../packages/site-url/src/index";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const freeIndexPath = join(
  repoRoot,
  "packages/registry/generated/index.free.json",
);
const componentsRoot = join(repoRoot, "packages/ui/src/components");
const docsComponentsDir = join(
  repoRoot,
  "apps/web/content/docs/components",
);
const publicDir = join(repoRoot, "apps/web/public");
const packageOutDir = join(repoRoot, "packages/docs-metadata/generated");

async function main(): Promise<void> {
  const raw = await readFile(freeIndexPath, "utf8");
  const parsed = JSON.parse(raw) as { items: RegistryIndexItem[] };
  const baseUrl = resolveCanonicalSiteUrl();

  const expected = parsed.items.map((item) => item.name).sort();
  const aiScan = await scanAiComponents(componentsRoot, expected);

  if (aiScan.missing.length > 0 || aiScan.invalid.length > 0) {
    for (const name of aiScan.missing) {
      console.error(`AI schema missing: ${name}.ai.ts`);
    }
    for (const entry of aiScan.invalid) {
      console.error(
        `AI schema invalid (${entry.name}): ${entry.errors.join("; ")}`,
      );
    }
    process.exitCode = 1;
    return;
  }

  const byName = new Map(parsed.items.map((item) => [item.name, item]));
  const apiDocs = await Promise.all(
    aiScan.found.map((meta) => resolveComponentApi(componentsRoot, meta)),
  );
  const apiErrors = assertApiComplete(apiDocs);
  const pageCheck = await checkComponentDocsPages(
    docsComponentsDir,
    new Set(apiDocs.map((doc) => doc.name)),
  );
  const pageErrors = formatDocsPageErrors(pageCheck);
  const allErrors = [...apiErrors, ...pageErrors];
  if (allErrors.length > 0) {
    for (const error of allErrors) console.error(error);
    process.exitCode = 1;
    return;
  }

  const llms = buildLlmsTxt(parsed.items, baseUrl);
  const index = buildAiIndex(aiScan.found, parsed.items);

  await mkdir(join(publicDir, "ai/components"), { recursive: true });
  await mkdir(join(publicDir, "ai/api"), { recursive: true });
  await mkdir(join(packageOutDir, "components"), { recursive: true });
  await mkdir(join(packageOutDir, "api"), { recursive: true });
  await writeFile(join(publicDir, "llms.txt"), llms);
  await writeFile(join(packageOutDir, "llms.txt"), llms);
  await writeFile(
    join(publicDir, "ai/index.json"),
    `${JSON.stringify(index, null, 2)}\n`,
  );
  await writeFile(
    join(packageOutDir, "index.json"),
    `${JSON.stringify(index, null, 2)}\n`,
  );

  for (const meta of aiScan.found) {
    const doc = enrichAiDocument(meta, byName.get(meta.name));
    const body = `${JSON.stringify(doc, null, 2)}\n`;
    await writeFile(join(publicDir, "ai/components", `${meta.name}.json`), body);
    await writeFile(join(packageOutDir, "components", `${meta.name}.json`), body);
  }

  for (const api of apiDocs) {
    const body = `${JSON.stringify(api, null, 2)}\n`;
    await writeFile(join(publicDir, "ai/api", `${api.name}.json`), body);
    await writeFile(join(packageOutDir, "api", `${api.name}.json`), body);
  }

  await writeFile(
    join(packageOutDir, "api-index.json"),
    `${JSON.stringify(
      {
        schemaVersion: 1,
        generatedAt: new Date().toISOString(),
        items: apiDocs.map((doc) => ({
          name: doc.name,
          exportName: doc.exportName,
          source: doc.source,
          propCount: doc.props.length,
        })),
      },
      null,
      2,
    )}\n`,
  );

  console.log(
    `docs-metadata: llms.txt + ${aiScan.found.length} AI schemas + ${apiDocs.length} API refs → apps/web/public/ai`,
  );
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
