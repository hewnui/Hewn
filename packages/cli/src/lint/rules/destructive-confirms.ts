import { offsetToLineColumn } from "../location.js";
import type { TsModule } from "../typescript.js";
import type { LintFinding, SourceFile } from "../types.js";

const DANGER_VARIANTS = new Set([
  "danger",
  "danger-outline",
  "danger-soft",
  "destructive",
]);

const DELETE_HINT =
  /\b(delete|remove|destroy|purge|wipe|drop)\b/i;

const CONFIRM_HINT =
  /\b(confirm|ConfirmDialog|AlertDialog|Dialog|window\.confirm|isConfirming)\b/;

export function lintDestructiveConfirms(
  file: SourceFile,
  ts: TsModule | null,
): LintFinding[] {
  if (!ts) return lintDestructiveRegex(file);
  return lintDestructiveAst(file, ts);
}

function lintDestructiveAst(file: SourceFile, ts: TsModule): LintFinding[] {
  const kind = file.filePath.endsWith("x") ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
  const source = ts.createSourceFile(
    file.filePath,
    file.content,
    ts.ScriptTarget.Latest,
    true,
    kind,
  );
  const findings: LintFinding[] = [];
  const fileHasConfirm = CONFIRM_HINT.test(file.content);

  const visit = (node: import("typescript").Node): void => {
    if (ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) {
      const tag = getTag(node.tagName);
      if (tag === "Button") {
        const variant = readStringAttr(node, "variant", ts);
        const onPress = readAttrText(node, "onPress", ts) ?? "";
        const childrenText = ts.isJsxOpeningElement(node)
          ? node.parent && ts.isJsxElement(node.parent)
            ? node.parent.getText(source)
            : ""
          : "";
        if (variant && DANGER_VARIANTS.has(variant)) {
          const pressLooksDestructive =
            DELETE_HINT.test(onPress) || DELETE_HINT.test(childrenText);
          if (pressLooksDestructive && !fileHasConfirm) {
            const { line, column } = offsetToLineColumn(
              file.content,
              node.getStart(source),
            );
            findings.push({
              ruleId: "destructive-confirms",
              severity: "warn",
              message:
                "Destructive Button appears to delete without a confirm pattern (Dialog / window.confirm heuristic)",
              file: file.filePath,
              line,
              column,
            });
          }
        }
      }
    }
    ts.forEachChild(node, visit);
  };

  visit(source);
  return findings;
}

function getTag(
  node: import("typescript").JsxTagNameExpression,
): string | null {
  if ("text" in node && typeof node.text === "string") return node.text;
  return null;
}

function readStringAttr(
  node: import("typescript").JsxOpeningLikeElement,
  name: string,
  ts: TsModule,
): string | null {
  for (const prop of node.attributes.properties) {
    if (!ts.isJsxAttribute(prop) || !ts.isIdentifier(prop.name)) continue;
    if (prop.name.text !== name || !prop.initializer) continue;
    if (ts.isStringLiteral(prop.initializer)) return prop.initializer.text;
    if (
      ts.isJsxExpression(prop.initializer) &&
      prop.initializer.expression &&
      ts.isStringLiteral(prop.initializer.expression)
    ) {
      return prop.initializer.expression.text;
    }
  }
  return null;
}

function readAttrText(
  node: import("typescript").JsxOpeningLikeElement,
  name: string,
  ts: TsModule,
): string | null {
  for (const prop of node.attributes.properties) {
    if (!ts.isJsxAttribute(prop) || !ts.isIdentifier(prop.name)) continue;
    if (prop.name.text !== name || !prop.initializer) continue;
    return prop.initializer.getText();
  }
  return null;
}

function lintDestructiveRegex(file: SourceFile): LintFinding[] {
  const findings: LintFinding[] = [];
  if (CONFIRM_HINT.test(file.content)) return findings;
  const re =
    /<Button\b([^>]*variant=["'](?:danger|danger-outline|danger-soft|destructive)["'][^>]*)\/?>/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(file.content)) !== null) {
    const attrs = match[1] ?? "";
    const window = file.content.slice(match.index, match.index + 400);
    if (DELETE_HINT.test(attrs) || DELETE_HINT.test(window)) {
      const { line, column } = offsetToLineColumn(file.content, match.index);
      findings.push({
        ruleId: "destructive-confirms",
        severity: "warn",
        message:
          "Destructive Button appears to delete without a confirm pattern (Dialog / window.confirm heuristic)",
        file: file.filePath,
        line,
        column,
      });
    }
  }
  return findings;
}
