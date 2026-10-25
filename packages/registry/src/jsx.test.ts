import { describe, expect, it } from "vitest";
import { toJsxSource, transformToJsx } from "./jsx";

describe("toJsxSource", () => {
  it("strips types from a docs example snippet", () => {
    const out = toJsxSource(
      'import { type ReactNode } from "react";\nimport { Button } from "@hewnui/ui";\n\nexport function Example(props: { label: string }): ReactNode {\n  return <Button variant="primary">{props.label}</Button>;\n}\n',
    );
    expect(out).toContain("<Button");
    expect(out).toContain('variant="primary"');
    expect(out).not.toContain(": ReactNode");
    expect(out).not.toContain("props: {");
  });
});

describe("transformToJsx", () => {
  it("strips type annotations and preserves JSX", () => {
    const [out] = transformToJsx([
      {
        path: "a.tsx",
        content:
          "type P = { x: number };\nexport function A(p: P) { return <div>{p.x}</div>; }\n",
      },
    ]);
    expect(out?.path).toBe("a.jsx");
    expect(out?.content).toContain("<div>");
    expect(out?.content).not.toContain(": P");
  });

  it("omits types-only files", () => {
    const result = transformToJsx([
      { path: "a.types.ts", content: "export type A = { x: number };\n" },
      { path: "a.tsx", content: "export const A = () => <div />;\n" },
    ]);
    expect(result.map((file) => file.path)).toEqual(["a.jsx"]);
  });

  it("elides import type statements", () => {
    const [out] = transformToJsx([
      {
        path: "a.ts",
        content:
          'import type { X } from "./x";\nimport { y } from "./y";\nexport const z: number = y;\n',
      },
    ]);
    expect(out?.content).not.toContain("./x");
    expect(out?.content).toContain("./y");
  });

  it("keeps the use client directive", () => {
    const [out] = transformToJsx([
      {
        path: "a.tsx",
        content: '"use client";\nexport const A = () => <div />;\n',
      },
    ]);
    expect(out?.content).toContain('"use client"');
  });

  it("strips satisfies expressions", () => {
    const [out] = transformToJsx([
      {
        path: "a.ts",
        content: "export const v = { a: 1 } satisfies Record<string, number>;\n",
      },
    ]);
    expect(out?.content).not.toContain("satisfies");
  });

  it("passes through css files unchanged", () => {
    const css = ":root { --x: 1; }\n";
    const result = transformToJsx([{ path: "a.css", content: css }]);
    expect(result).toEqual([{ path: "a.css", content: css }]);
  });

  it("elides export type re-exports in barrels", () => {
    const [out] = transformToJsx([
      {
        path: "index.ts",
        content:
          'export { A } from "./a";\nexport type { AProps } from "./a.types";\n',
      },
    ]);
    expect(out?.path).toBe("index.js");
    expect(out?.content).toContain("./a");
    expect(out?.content).not.toContain("./a.types");
  });
});
