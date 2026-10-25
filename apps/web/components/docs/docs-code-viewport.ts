/** Shared CodeBlock viewport props — focusable for axe scrollable-region. */
export function docsCodeViewportProps(label = "Code") {
  return {
    className: "kp-docs-code-viewport",
    tabIndex: 0,
    role: "region" as const,
    "aria-label": label,
  };
}
