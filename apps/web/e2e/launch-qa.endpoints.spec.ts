import { expect, test } from "@playwright/test";
import { NEW_COMPONENTS } from "./launch-qa.helpers";

test("registry, themes, ai, seo endpoints resolve", async ({ request }) => {
  const jsonEndpoints = [
    "/r/index.free.json",
    "/r/shadcn/registry.json",
    "/r/shadcn/button.json",
    ...NEW_COMPONENTS.map((name) => `/r/shadcn/${name}.json`),
    "/themes/index.json",
    "/themes/forest/tokens.dtcg.json",
    "/ai/index.json",
  ];

  for (const path of jsonEndpoints) {
    const res = await request.get(path);
    expect(res.status(), path).toBe(200);
    expect(await res.json(), path).toBeTruthy();
  }

  const textEndpoints = [
    "/themes/forest/DESIGN.md",
    "/themes/forest/theme.css",
    "/themes/forest/SKILL.md",
    "/llms.txt",
    "/llms-full.txt",
    "/robots.txt",
    "/sitemap.xml",
  ];

  for (const path of textEndpoints) {
    const res = await request.get(path);
    expect(res.status(), path).toBe(200);
    expect((await res.text()).length, path).toBeGreaterThan(20);
  }

  for (const path of ["/opengraph-image", "/og/docs/components/button"]) {
    const res = await request.get(path);
    expect(res.status(), path).toBe(200);
    expect(res.headers()["content-type"] ?? "", path).toMatch(/image/);
  }

  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain("Disallow: /qa/");
  expect(robots).toMatch(/Sitemap:/);

  const free = await (await request.get("/r/index.free.json")).json();
  const names = new Set(
    (free.items as Array<{ name: string }>).map((item) => item.name),
  );
  for (const name of NEW_COMPONENTS) {
    expect(names.has(name), `free registry missing ${name}`).toBe(true);
  }

  const shadcn = await (await request.get("/r/shadcn/tag-field.json")).json();
  const files = (shadcn.files ?? []) as Array<{ content?: string }>;
  expect(files.length).toBeGreaterThan(0);
  expect(files.some((file) => Boolean(file.content))).toBe(true);

  const aiIndex = await (await request.get("/ai/index.json")).json();
  const aiNames = new Set(
    (aiIndex.items as Array<{ name: string }>).map((item) => item.name),
  );
  for (const name of NEW_COMPONENTS) {
    expect(aiNames.has(name), `ai index missing ${name}`).toBe(true);
  }

  const aiTag = await request.get("/ai/components/tag-field.json");
  expect(aiTag.status()).toBe(200);
  await expect(aiTag.json()).resolves.toBeTruthy();
});
