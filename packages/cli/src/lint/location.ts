export function offsetToLineColumn(
  content: string,
  offset: number,
): { line: number; column: number } {
  let line = 1;
  let column = 1;
  const end = Math.min(offset, content.length);
  for (let i = 0; i < end; i += 1) {
    if (content[i] === "\n") {
      line += 1;
      column = 1;
    } else {
      column += 1;
    }
  }
  return { line, column };
}

export function lineAt(content: string, line: number): string {
  return content.split("\n")[line - 1] ?? "";
}
