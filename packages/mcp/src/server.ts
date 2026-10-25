import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { LicenseAccess } from "./license.js";
import type { Catalog } from "./types.js";
import {
  getComponent,
  getInstallCommand,
  getLicenseStatus,
  getTheme,
  getTokens,
  listComponents,
  searchComponents,
} from "./tools.js";

function textResult(result: { ok: boolean; data?: unknown; error?: string }) {
  if (!result.ok) {
    return {
      content: [{ type: "text" as const, text: result.error ?? "Unknown error" }],
      isError: true,
    };
  }
  return {
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(result.data, null, 2),
      },
    ],
  };
}

/** Build a read-only Hewn MCP server bound to a catalog + license access. */
export function createHewnServer(
  catalog: Catalog,
  access: LicenseAccess,
): McpServer {
  const server = new McpServer({
    name: "hewn",
    version: "0.0.0",
  });

  server.registerTool(
    "list_components",
    {
      description:
        "List Hewn components. Pro items require a stub license key.",
      inputSchema: {
        _: z.string().optional().describe("Unused"),
      },
    },
    async () => textResult(listComponents(catalog, access)),
  );

  server.registerTool(
    "search_components",
    {
      description:
        "Search components by name, title, description, or keywords.",
      inputSchema: {
        query: z.string().describe("Search query"),
      },
    },
    async ({ query }) => textResult(searchComponents(catalog, query, access)),
  );

  server.registerTool(
    "get_component",
    {
      description:
        "Get registry + AI schema. Pro items fail closed without a license.",
      inputSchema: {
        name: z.string().describe("Component name (kebab-case)"),
      },
    },
    async ({ name }) => textResult(getComponent(catalog, name, access)),
  );

  server.registerTool(
    "get_install_command",
    {
      description: "Return npm and CLI install commands for a component.",
      inputSchema: {
        name: z.string().describe("Component name (kebab-case)"),
      },
    },
    async ({ name }) => textResult(getInstallCommand(catalog, name, access)),
  );

  server.registerTool(
    "get_theme",
    {
      description:
        "List curated theme packs, or get one pack by id (forest, tide, …).",
      inputSchema: {
        id: z.string().optional().describe("Optional pack id"),
      },
    },
    async ({ id }) => textResult(getTheme(catalog, id)),
  );

  server.registerTool(
    "get_tokens",
    {
      description:
        "Return semantic tokens for a component AI schema or a theme pack.",
      inputSchema: {
        component: z.string().optional().describe("Component name"),
        theme: z.string().optional().describe("Theme pack id"),
      },
    },
    async ({ component, theme }) => {
      const opts: { component?: string; theme?: string } = {};
      if (component !== undefined) opts.component = component;
      if (theme !== undefined) opts.theme = theme;
      return textResult(getTokens(catalog, opts, access));
    },
  );

  server.registerTool(
    "get_license_status",
    {
      description: "Show whether Pro access is unlocked (fail-closed until payments).",
      inputSchema: {
        _: z.string().optional().describe("Unused"),
      },
    },
    async () => textResult(getLicenseStatus(access)),
  );

  return server;
}
