#!/usr/bin/env node
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { loadFsCatalog } from "./catalog.js";
import { resolveLicenseAccess } from "./license.js";
import { resolveCatalogPaths } from "./resolve.js";
import { createHewnServer } from "./server.js";

async function main(): Promise<void> {
  const paths = resolveCatalogPaths();
  if (!paths) {
    console.error(
      "Hewn MCP: could not find registry data. Set HEWN_ROOT to the monorepo root, or run generate first.",
    );
    process.exitCode = 1;
    return;
  }

  const access = resolveLicenseAccess();
  const catalog = await loadFsCatalog(paths);
  const server = createHewnServer(catalog, access);
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
