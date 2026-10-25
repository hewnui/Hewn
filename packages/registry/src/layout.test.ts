import { describe, expect, it } from "vitest";
import {
  isOnDemandShared,
  rewriteSharedComponentImports,
  rewriteSharedImportDepth,
  sharedComponentRefs,
  sharedModuleRefs,
} from "./layout";

describe("rewriteSharedImportDepth", () => {
  it("lifts ../../shared imports to ../ for the installed layout", () => {
    expect(rewriteSharedImportDepth('import { cn } from "../../utils/cn";')).toBe(
      'import { cn } from "../utils/cn";',
    );
    expect(
      rewriteSharedImportDepth("import { fieldBase } from '../../styles/field';"),
    ).toBe("import { fieldBase } from '../styles/field';");
    expect(
      rewriteSharedImportDepth('export { scales } from "../../chart/scales";'),
    ).toBe('export { scales } from "../chart/scales";');
    expect(rewriteSharedImportDepth('import "../../styles/field";')).toBe(
      'import "../styles/field";',
    );
  });

  it("leaves sibling, package and non-shared imports alone", () => {
    for (const source of [
      'import { Spinner } from "../spinner";',
      'import { springs } from "@hewnui/motion";',
      'import { render } from "../../test/render";',
      'import { cn } from "../utils/cn";',
    ]) {
      expect(rewriteSharedImportDepth(source)).toBe(source);
    }
  });

  it("marks chart as on-demand shared code", () => {
    expect(isOnDemandShared("chart/axes.tsx")).toBe(true);
    expect(isOnDemandShared("utils/cn.ts")).toBe(false);
  });

  it("maps shared → component imports to the installed sibling layout", () => {
    const frame = 'import { Skeleton } from "../components/skeleton";\nimport { cn } from "../utils/cn";';
    expect(rewriteSharedComponentImports(frame)).toBe(
      'import { Skeleton } from "../skeleton";\nimport { cn } from "../utils/cn";',
    );
    expect(sharedComponentRefs(frame)).toEqual(["skeleton"]);
    expect(sharedModuleRefs(frame)).toEqual(["utils/cn"]);
  });
});
