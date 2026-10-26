/**
 * Copy for the specimen chapters — the Northline ops desk, the catalog census,
 * and the Theme Studio ladder. Northline is a fictional product used to show
 * shipped components under load; it is never presented as a customer.
 */

export const product = {
  eyebrow: "Demo app",
  headline: "The same tokens, on an actual desk.",
  support:
    "Every control on this desk is a shipped component. Switch the theme anywhere on this page and the whole surface repaints — Theme Lab is the gallery, this is the app.",
  cta: { href: "#theme-studio", label: "Author your own pack" },
  brand: "Northline",
  brandMeta: "Ops desk",
  sampleCaption: "Fictional company · sample data",
  liveLabel: "Canary tracking",
  operator: "Mira Solvang",
  operatorShift: "On desk",
  operatorMark: "MS",
  action: "Queue deploy",
  queued: "Queued",
  lead: {
    label: "Routed jobs · 24h",
    value: "94,817",
    delta: "+8.6%",
    hint: "vs prior window",
  },
  latency: { label: "p95 latency", value: "211ms", delta: "-14ms" },
  errors: { label: "Error rate", value: "0.21%", delta: "-0.04pt" },
  chartLabel: "Jobs routed per 3h window",
  chartUnit: "thousands",
} as const;

export const productActivity = [
  {
    id: "1",
    title: "Canary 9% healthy",
    detail: "Edge cluster · us-east",
    time: "3m",
    live: true,
  },
  {
    id: "2",
    title: "Invoice export settled",
    detail: "Ledger close · FY26 Q1",
    time: "22m",
    live: false,
  },
  {
    id: "3",
    title: "Ingest backlog eased",
    detail: "Queue 3,104 → 886",
    time: "47m",
    live: false,
  },
  {
    id: "4",
    title: "Nightly checksum",
    detail: "Retention window OK",
    time: "4h",
    live: false,
  },
] as const;

export const studio = {
  eyebrow: "Theme Studio",
  headline: "Guardrails are the product.",
  support:
    "Seed an accent from a prompt, a stylesheet, or a logo. The engine derives the whole token ladder, raises anything that fails contrast, and tells you exactly what it changed. No free-form CSS, no palette that looks fine until someone tries to read it.",
  cta: { href: "/docs/theme-studio", label: "Open Theme Studio" },
  clampNote: "Raised to clear 4.5:1",
  ladderLabel: "Derived token ladder — live on the theme you picked",
  steps: [
    {
      id: "seed",
      title: "Seed",
      detail:
        "Describe it, paste a stylesheet, or drop a logo. Offline heuristics always run; bring your own key when you want a model in the loop.",
    },
    {
      id: "derive",
      title: "Derive",
      detail:
        "One accent becomes surfaces, muted layers, borders, ring, and foregrounds — with every pair checked against WCAG AA before it ships.",
    },
    {
      id: "ship",
      title: "Ship",
      detail:
        "Download a drop-in CSS pack. Every curated theme also exports DESIGN.md, DTCG tokens and a Tailwind v4 @theme file.",
    },
  ],
  /** Rendered with live var(--kp-*) so the ladder repaints with the active theme. */
  ladder: [
    { token: "--kp-background", role: "Page base", height: 74 },
    { token: "--kp-surface", role: "Panels", height: 88 },
    { token: "--kp-surface-raised", role: "Menus, dialogs", height: 66 },
    { token: "--kp-muted", role: "Quiet structure", height: 94 },
    { token: "--kp-muted-foreground", role: "Secondary text", height: 78 },
    { token: "--kp-foreground", role: "Body text", height: 100 },
    { token: "--kp-accent", role: "Action", height: 86, clamped: true },
    { token: "--kp-accent-foreground", role: "On accent", height: 70 },
    { token: "--kp-ring", role: "Focus", height: 92 },
    { token: "--kp-danger", role: "Destructive", height: 62 },
  ],
} as const;
