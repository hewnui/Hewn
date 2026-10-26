import { describe, expect, it } from "vitest";
import { buildLlmsTxt, DEFAULT_SITE_URL } from "./build";
import { generateLlmsTxt } from "./llms";

describe("generateLlmsTxt", () => {
  it("emits H1, summary, and absolute links", () => {
    const text = generateLlmsTxt({
      siteName: "Hewn",
      summary: "Test summary",
      baseUrl: DEFAULT_SITE_URL,
      sections: [
        {
          heading: "Guides",
          links: [
            {
              title: "CLI",
              path: "/docs/cli",
              description: "Install via CLI",
            },
          ],
        },
      ],
    });

    expect(text.startsWith("# Hewn\n") || text.startsWith("# Hewn UI\n")).toBe(
      true,
    );
    expect(text).toContain("> Test summary");
    expect(text).toContain("## Guides");
    expect(text).toContain(
      `- [CLI](${DEFAULT_SITE_URL}/docs/cli): Install via CLI`,
    );
  });
});

describe("buildLlmsTxt", () => {
  it("groups components and includes Optional section", () => {
    const text = buildLlmsTxt(
      [
        {
          name: "button",
          title: "Button",
          description: "Pressable action",
          category: "buttons",
          docsPath: "/docs/components/button",
          tier: "free",
        },
      ],
      "https://example.com",
    );

    expect(text).toContain("# Hewn UI");
    expect(text).toContain("## Buttons");
    expect(text).toContain(
      "- [Button](https://example.com/docs/components/button): Pressable action",
    );
    expect(text).toContain("## Optional");
    expect(text).toContain("https://example.com/r/index.free.json");
    expect(text).toContain("https://github.com/hewnui/Hewn");
    expect(text).toContain("https://example.com/llms-full.txt");
  });

  it("defaults baseUrl to the canonical site URL", () => {
    const text = buildLlmsTxt([
      {
        name: "button",
        title: "Button",
        description: "Pressable action",
        category: "buttons",
        docsPath: "/docs/components/button",
        tier: "free",
      },
    ]);

    expect(text).toContain(`${DEFAULT_SITE_URL}/docs/components/button`);
  });
});
