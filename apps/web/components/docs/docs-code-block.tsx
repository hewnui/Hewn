import {
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import type { CodeBlockProps } from "fumadocs-ui/components/codeblock";
import { toJsxSource } from "@/lib/to-jsx-source";
import { DocsCodeBlockView } from "@/components/docs/docs-code-block-view";

function languageFromNode(node: ReactNode): string | undefined {
  if (!isValidElement(node)) return undefined;
  const props = node.props as {
    className?: string;
    "data-language"?: string;
    children?: ReactNode;
  };
  if (props["data-language"]) return props["data-language"];
  const match = props.className?.match(/language-([\w+-]+)/);
  if (match?.[1]) return match[1];
  return languageFromNode(props.children);
}

function languageFromProps(
  props: CodeBlockProps,
  children: ReactNode,
): string | undefined {
  const record = props as Record<string, unknown>;
  const direct =
    (typeof record["data-language"] === "string" &&
      record["data-language"]) ||
    (typeof record.language === "string" && record.language) ||
    undefined;
  if (direct) return direct;
  if (typeof props.className === "string") {
    const match = props.className.match(/language-([\w+-]+)/);
    if (match?.[1]) return match[1];
  }
  return languageFromNode(children);
}

function extractText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (isValidElement(node)) {
    const props = node.props as { children?: ReactNode };
    return extractText(props.children);
  }
  return "";
}

function formatLang(lang: string): string {
  const map: Record<string, string> = {
    tsx: "TSX",
    jsx: "JSX",
    ts: "TS",
    js: "JS",
    mdx: "MDX",
    bash: "Bash",
    sh: "Shell",
    shell: "Shell",
    json: "JSON",
    css: "CSS",
  };
  return map[lang.toLowerCase()] ?? lang.toUpperCase();
}

function looksLikeTsx(source: string): boolean {
  return (
    /<\/?[A-Z][A-Za-z0-9]*[\s/>]/.test(source) ||
    /from\s+["']@hewnui\//.test(source) ||
    /:\s*(string|number|boolean|ReactNode)\b/.test(source) ||
    /\bimport\s+type\b/.test(source)
  );
}

/** Server `pre` replacement — transforms TS examples with the registry JSX pipeline. */
export function DocsCodeBlock({
  children,
  title,
  className,
  ...props
}: CodeBlockProps) {
  const lang = languageFromProps(props, children);
  const raw = extractText(children).replace(/\n$/, "");
  const treatAsTs =
    lang === "ts" ||
    lang === "tsx" ||
    (!lang && raw.length > 0 && looksLikeTsx(raw));

  let jsCode: string | undefined;
  let jsLang: string | undefined;
  if (treatAsTs && raw.trim().length > 0) {
    const transformed = toJsxSource(raw).replace(/\n$/, "");
    if (transformed !== raw) {
      jsCode = transformed;
      jsLang = lang === "ts" ? "js" : "jsx";
    } else if (looksLikeTsx(raw)) {
      // Still offer JS tab using the same transform output (often identical for
      // type-free JSX examples — keep the toggle for language consumers).
      jsCode = transformed;
      jsLang = "jsx";
    }
  }

  const label =
    typeof title === "string" && title.length > 0
      ? title
      : lang
        ? formatLang(lang)
        : jsCode
          ? "TSX"
          : "Snippet";

  return (
    <DocsCodeBlockView
      {...props}
      title={label}
      className={className}
      jsCode={jsCode}
      jsLang={jsLang}
    >
      {children}
    </DocsCodeBlockView>
  );
}
