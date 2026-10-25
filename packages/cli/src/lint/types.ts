export type RuleId =
  | "tokens-only"
  | "aa-contrast"
  | "reduced-motion"
  | "labelled-overlays"
  | "destructive-confirms";

export type Severity = "error" | "warn" | "off";

export type LintFinding = {
  ruleId: RuleId;
  severity: "error" | "warn";
  message: string;
  file: string;
  line: number;
  column: number;
  endLine?: number;
  endColumn?: number;
  fixable?: boolean;
};

export type LintRuleLevel = Severity;

export type LintConfig = {
  include: string[];
  ignore: string[];
  themes: string[];
  rules: Record<RuleId, LintRuleLevel>;
};

export type LintOptions = {
  cwd: string;
  fix: boolean;
  json: boolean;
  paths: string[];
};

export type LintReport = {
  findings: LintFinding[];
  fixed: number;
  errorCount: number;
  warnCount: number;
};

export type SourceFile = {
  filePath: string;
  content: string;
  lines: string[];
};

export const DEFAULT_RULES: Record<RuleId, LintRuleLevel> = {
  "tokens-only": "error",
  "aa-contrast": "error",
  "reduced-motion": "error",
  "labelled-overlays": "error",
  "destructive-confirms": "warn",
};

export const RULE_IDS = Object.keys(DEFAULT_RULES) as RuleId[];
