import {
  createSourceFile,
  forEachChild,
  isArrowFunction,
  isFunctionDeclaration,
  isFunctionExpression,
  isIdentifier,
  isIntersectionTypeNode,
  isParameter,
  isPropertySignature,
  isTypeAliasDeclaration,
  isTypeLiteralNode,
  isVariableStatement,
  ScriptTarget,
  type Node,
  type TypeElement,
  type TypeNode,
} from "typescript";
import type { AiProp } from "./ai-types";

function typeNodeText(node: TypeNode, source: string): string {
  return source.slice(node.getStart(), node.getEnd()).replace(/\s+/g, " ").trim();
}

function memberToProp(member: TypeElement, source: string): AiProp[] {
  if (!isPropertySignature(member) || !member.name || !member.type) return [];
  const rawName = member.name.getText();
  const name =
    rawName.startsWith('"') || rawName.startsWith("'")
      ? rawName.slice(1, -1)
      : rawName;
  return [
    {
      name,
      type: typeNodeText(member.type, source),
      description: "",
      ...(member.questionToken ? {} : { required: true }),
    },
  ];
}

/** Collect Hewn-owned fields from a type literal or `Omit<…> & { … }` intersection. */
export function collectMembers(typeNode: TypeNode, source: string): AiProp[] {
  if (isTypeLiteralNode(typeNode)) {
    return typeNode.members.flatMap((member) => memberToProp(member, source));
  }
  if (isIntersectionTypeNode(typeNode)) {
    return typeNode.types.flatMap((part) =>
      isTypeLiteralNode(part)
        ? part.members.flatMap((member) => memberToProp(member, source))
        : [],
    );
  }
  return [];
}

function dedupeProps(props: AiProp[]): AiProp[] {
  const seen = new Set<string>();
  return props.filter((prop) => {
    if (seen.has(prop.name)) return false;
    seen.add(prop.name);
    return true;
  });
}

/** Map every `*Props` type alias name → extracted props. */
export function extractPropsMapsFromSource(
  source: string,
): Map<string, AiProp[]> {
  const file = createSourceFile(
    "props.types.ts",
    source,
    ScriptTarget.Latest,
    true,
  );
  const maps = new Map<string, AiProp[]>();

  const visit = (node: Node) => {
    if (
      isTypeAliasDeclaration(node) &&
      (node.name.text.endsWith("Props") || node.name.text.endsWith("Input"))
    ) {
      maps.set(node.name.text, dedupeProps(collectMembers(node.type, source)));
    }
    forEachChild(node, visit);
  };

  visit(file);
  return maps;
}

/**
 * Extract Hewn-owned props from a `*.types.ts` source string.
 * When `exportName` is set, only the matching `ExportNameProps` alias is used
 * (avoids merging compound-part props into the root table).
 */
export function extractPropsFromTypesSource(
  source: string,
  exportName?: string,
): AiProp[] {
  const maps = extractPropsMapsFromSource(source);
  if (exportName) {
    return maps.get(`${exportName}Props`) ?? [];
  }
  const collected: AiProp[] = [];
  for (const props of maps.values()) collected.push(...props);
  return dedupeProps(collected);
}

function propsFromParameterType(
  typeNode: TypeNode | undefined,
  source: string,
): AiProp[] {
  if (!typeNode) return [];
  return dedupeProps(collectMembers(typeNode, source));
}

/**
 * Read inline component prop types from a `.tsx` / `.ts` implementation file:
 * - `export function Name({…}: { … })`
 * - `export function Name({…}: NameProps)` when NameProps is a local alias
 * - `type NameProps = Omit<…> & { … }` / object literal
 */
export function extractPropsFromComponentSource(
  source: string,
  exportName: string,
): AiProp[] {
  const file = createSourceFile(
    "component.tsx",
    source,
    ScriptTarget.Latest,
    true,
  );
  const maps = extractPropsMapsFromSource(source);
  if (maps.has(`${exportName}Props`)) {
    return maps.get(`${exportName}Props`)!;
  }
  if (maps.has(`${exportName}Input`)) {
    return maps.get(`${exportName}Input`)!;
  }

  const candidates = [exportName, `${exportName}Provider`];
  let found: AiProp[] = [];

  const visit = (node: Node) => {
    if (
      isFunctionDeclaration(node) &&
      node.name &&
      candidates.includes(node.name.text)
    ) {
      const param = node.parameters[0];
      if (param && isParameter(param)) {
        const next = propsFromParameterType(param.type, source);
        if (next.length > found.length) found = next;
      }
    }

    if (isVariableStatement(node)) {
      for (const decl of node.declarationList.declarations) {
        if (!isIdentifier(decl.name)) continue;
        if (!candidates.includes(decl.name.text)) continue;
        const init = decl.initializer;
        if (!init) continue;
        if (isArrowFunction(init) || isFunctionExpression(init)) {
          const next = propsFromParameterType(init.parameters[0]?.type, source);
          if (next.length > found.length) found = next;
        }
      }
    }

    forEachChild(node, visit);
  };

  visit(file);
  return found;
}

/** Resolve props for a compound part export like `DialogBody` → `DialogBodyProps`. */
export function extractPropsForPart(
  maps: Map<string, AiProp[]>,
  partName: string,
): AiProp[] {
  const bare = partName.includes(".")
    ? partName.slice(partName.lastIndexOf(".") + 1)
    : partName;
  return maps.get(`${bare}Props`) ?? [];
}
