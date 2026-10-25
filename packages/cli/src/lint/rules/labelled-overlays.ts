import { offsetToLineColumn } from "../location.js";
import type { TsModule } from "../typescript.js";
import type { LintFinding, SourceFile } from "../types.js";

/** Dialog-like surfaces that need an accessible name. Popovers often inherit trigger names. */
const OVERLAY_NAMES = new Set([
  "Dialog",
  "Modal",
  "Sheet",
  "Drawer",
  "DialogContent",
  "ModalContent",
  "SheetContent",
  "DrawerContent",
]);

const LABEL_ATTRS = new Set(["aria-label", "aria-labelledby", "title"]);
const HEADING_TAGS = new Set([
  "Heading",
  "DialogTitle",
  "DrawerTitle",
  "SheetTitle",
]);

export function lintLabelledOverlays(
  file: SourceFile,
  ts: TsModule | null,
): LintFinding[] {
  if (!ts) return lintLabelledOverlaysRegex(file);
  return lintLabelledOverlaysAst(file, ts);
}

function lintLabelledOverlaysAst(file: SourceFile, ts: TsModule): LintFinding[] {
  const kind = file.filePath.endsWith("x") ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
  const source = ts.createSourceFile(
    file.filePath,
    file.content,
    ts.ScriptTarget.Latest,
    true,
    kind,
  );
  const findings: LintFinding[] = [];

  const visit = (node: import("typescript").Node): void => {
    if (ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) {
      const tag = jsxTagName(node.tagName, ts);
      if (tag && OVERLAY_NAMES.has(tag)) {
        if (isPassthroughWrapper(node, ts)) return;
        const attrs = node.attributes.properties;
        const hasLabelAttr = attrs.some(
          (p) =>
            ts.isJsxAttribute(p) &&
            ts.isIdentifier(p.name) &&
            LABEL_ATTRS.has(p.name.text),
        );
        const hasHeadingChild =
          ts.isJsxOpeningElement(node) && hasHeadingInTree(node.parent, ts);
        const hasTitleProp = attrs.some(
          (p) =>
            ts.isJsxAttribute(p) &&
            ts.isIdentifier(p.name) &&
            p.name.text === "title",
        );
        if (!hasLabelAttr && !hasHeadingChild && !hasTitleProp) {
          const { line, column } = offsetToLineColumn(
            file.content,
            node.getStart(source),
          );
          findings.push({
            ruleId: "labelled-overlays",
            severity: "error",
            message: `<${tag}> is missing an accessible name (aria-label, aria-labelledby, title prop, or Heading slot)`,
            file: file.filePath,
            line,
            column,
          });
        }
      }
    }
    ts.forEachChild(node, visit);
  };

  visit(source);
  return findings;
}

/** `<Dialog>{children}</Dialog>` composition shells are labelled by callers. */
function isPassthroughWrapper(
  node: import("typescript").JsxOpeningLikeElement,
  ts: TsModule,
): boolean {
  if (!ts.isJsxOpeningElement(node) || !ts.isJsxElement(node.parent)) return false;
  const kids = node.parent.children.filter(
    (c) => !ts.isJsxText(c) || c.getText().trim().length > 0,
  );
  if (kids.length !== 1) return false;
  const only = kids[0]!;
  return ts.isJsxExpression(only) && !!only.expression && ts.isIdentifier(only.expression);
}

function jsxTagName(
  node: import("typescript").JsxTagNameExpression,
  ts: TsModule,
): string | null {
  if (ts.isIdentifier(node)) return node.text;
  if (ts.isPropertyAccessExpression(node) && ts.isIdentifier(node.name)) {
    const leaf = node.name.text;
    if (leaf === "Root" || leaf === "Trigger") return null;
    if (ts.isIdentifier(node.expression)) {
      return `${node.expression.text}${leaf}`;
    }
    return leaf;
  }
  return null;
}

function hasHeadingInTree(
  parent: import("typescript").Node,
  ts: TsModule,
): boolean {
  if (!ts.isJsxElement(parent)) return false;
  for (const child of parent.children) {
    if (ts.isJsxElement(child) || ts.isJsxSelfClosingElement(child)) {
      const opening = ts.isJsxElement(child) ? child.openingElement : child;
      const name = jsxTagName(opening.tagName, ts);
      if (name && HEADING_TAGS.has(name)) return true;
      if (ts.isJsxElement(child) && hasHeadingInTree(child, ts)) return true;
    }
  }
  return false;
}

function lintLabelledOverlaysRegex(file: SourceFile): LintFinding[] {
  const findings: LintFinding[] = [];
  const re = /<(Dialog|Modal|Sheet|Drawer)(\s[^>]*)?>/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(file.content)) !== null) {
    const tag = match[1]!;
    const attrs = match[2] ?? "";
    const slice = file.content.slice(match.index, match.index + 800);
    if (/>\s*\{children\}\s*</.test(slice.slice(0, 120))) continue;
    const labelled =
      /aria-label\s*=/.test(attrs) ||
      /aria-labelledby\s*=/.test(attrs) ||
      /\btitle\s*=/.test(attrs) ||
      /<Heading[\s>]/.test(slice) ||
      new RegExp(`<${tag}(?:Title|\\.Title)[\\s>]`).test(slice);
    if (!labelled) {
      const { line, column } = offsetToLineColumn(file.content, match.index);
      findings.push({
        ruleId: "labelled-overlays",
        severity: "error",
        message: `<${tag}> is missing an accessible name (aria-label, aria-labelledby, title prop, or Heading slot)`,
        file: file.filePath,
        line,
        column,
      });
    }
  }
  return findings;
}
