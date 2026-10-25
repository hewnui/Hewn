import {
  JsxEmit,
  ModuleKind,
  ScriptTarget,
  transpileModule,
} from "typescript";
import type { RegistryFileEntry } from "./types";

const TYPES_SUFFIX = ".types.ts";

function toJsPath(path: string): string {
  if (path.endsWith(".tsx")) return path.replace(/\.tsx$/, ".jsx");
  if (path.endsWith(".ts")) return path.replace(/\.ts$/, ".js");
  return path;
}

/** Strip TypeScript syntax — same pipeline used for registry `jsxFiles`. */
export function toJsxSource(source: string): string {
  const { outputText } = transpileModule(source, {
    compilerOptions: {
      jsx: JsxEmit.Preserve,
      module: ModuleKind.ESNext,
      target: ScriptTarget.ES2022,
    },
  });
  return outputText;
}

export function transformToJsx(
  files: RegistryFileEntry[],
): RegistryFileEntry[] {
  const result: RegistryFileEntry[] = [];
  for (const file of files) {
    if (file.path.endsWith(TYPES_SUFFIX)) continue;
    if (file.path.endsWith(".tsx") || file.path.endsWith(".ts")) {
      result.push({
        path: toJsPath(file.path),
        content: toJsxSource(file.content),
      });
    } else {
      result.push(file);
    }
  }
  return result;
}
