import { mkdtemp, writeFile, mkdir } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";
import { describe, expect, it } from "vitest";
import { collectDocsPages, generateLlmsFullTxt } from "./llms-full";

describe("llms-full", () => {
  it("collects MDX pages and emits full dump with sources", async () => {
    const root = await mkdtemp(join(tmpdir(), "llms-full-"));
    await mkdir(join(root, "components"), { recursive: true });
    await writeFile(
      join(root, "index.mdx"),
      `---\ntitle: Docs home\ndescription: Index\n---\n\nWelcome to docs.\n`,
    );
    await writeFile(
      join(root, "components", "button.mdx"),
      `---\ntitle: Button\ndescription: Press me\n---\n\nButton body.\n`,
    );

    const pages = await collectDocsPages(root);
    expect(pages.map((page) => page.path).sort()).toEqual([
      "/docs",
      "/docs/components/button",
    ]);

    const text = generateLlmsFullTxt(
      {
        siteName: "Hewn UI",
        summary: "Summary",
        baseUrl: "https://example.com",
        sections: [
          {
            heading: "Guides",
            links: [{ title: "Docs home", path: "/docs" }],
          },
          {
            heading: "Buttons",
            links: [{ title: "Button", path: "/docs/components/button" }],
          },
        ],
      },
      pages,
    );

    expect(text).toContain("# Hewn UI");
    expect(text).toContain("Source: https://example.com/docs/components/button");
    expect(text).toContain("Button body.");
    expect(text).toContain("/llms.txt");
  });
});
