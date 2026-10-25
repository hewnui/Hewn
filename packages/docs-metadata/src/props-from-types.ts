import {
  createSourceFile,
  forEachChild,
  isIntersectionTypeNode,
  isPropertySignature,
  isTypeAliasDeclaration,
  isTypeLiteralNode,
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

function collectMembers(typeNode: TypeNode, source: string): AiProp[] {
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

/** Extract Hewn-owned props from a `*.types.ts` source string. */
export function extractPropsFromTypesSource(source: string): AiProp[] {
  const file = createSourceFile(
    "props.types.ts",
    source,
    ScriptTarget.Latest,
    true,
  );
  const collected: AiProp[] = [];

  const visit = (node: Node) => {
    if (
      isTypeAliasDeclaration(node) &&
      node.name.text.endsWith("Props")
    ) {
      collected.push(...collectMembers(node.type, source));
    }
    forEachChild(node, visit);
  };

  visit(file);

  const seen = new Set<string>();
  return collected.filter((prop) => {
    if (seen.has(prop.name)) return false;
    seen.add(prop.name);
    return true;
  });
}
