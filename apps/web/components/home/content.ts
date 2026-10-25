export const hero = {
  brand: "Hewn",
  headlineLead: "Product UI with a",
  headlineAccent: "point of view",
  support:
    "Accessible React Aria components, themes with guardrails, motion inside real app UI, and AI-native docs with MCP — built for teams evaluating a library, not a screenshot kit.",
  primaryCta: { href: "/docs", label: "Explore docs" },
  secondaryCta: { href: "/docs/theme-lab", label: "Open Theme Lab" },
  docsCta: { href: "/docs/getting-started", label: "Getting started" },
  themeHint: "Repaint everything",
  cue: { href: "#claims", label: "What most libraries skip" },
  specimen: {
    label: "Live specimen",
    hint: "Real controls, not screenshots. Press one.",
    primary: "Deploy",
    secondary: "Review",
    switchLabel: "Live sync",
    badge: "Accessible",
    densityLabel: "Density",
    rolloutLabel: "Rollout",
  },
} as const;

/** Each claim anchors to the chapter that proves it — promise first, proof below. */
export const claims = [
  {
    text: "Accessibility ships with the control — React Aria owns behavior.",
    chapter: "Accessibility",
    href: "#accessibility",
  },
  {
    text: "Themes are identities with contrast guardrails, not accent swaps.",
    chapter: "Theme Studio",
    href: "#theme-studio",
  },
  {
    text: "Motion lives inside real app UI, not a decorative demo reel.",
    chapter: "Demo app",
    href: "#product",
  },
  {
    text: "AI-native docs, schema, and MCP — machines read the same source.",
    chapter: "AI-native",
    href: "#ai",
  },
] as const;

export const themeBlurbs: Record<
  string,
  { title: string; line: string }
> = {
  forest: {
    title: "Forest",
    line: "Grounded greens for product work that needs calm confidence.",
  },
  tide: {
    title: "Tide",
    line: "Cool coastal neutrals for analytical surfaces and dense data.",
  },
  graphite: {
    title: "Graphite",
    line: "Precise steel tones when the UI should feel engineered.",
  },
  dune: {
    title: "Dune",
    line: "Warm light-only sand for tools that live in daylight.",
  },
  clay: {
    title: "Clay",
    line: "Earthy light mode with tactile depth and soft contrast.",
  },
  ember: {
    title: "Ember",
    line: "Dark-only heat for night ops and focused editing.",
  },
};

/**
 * Positions the library takes — not testimonials. Never attribute these to a
 * person or company; inventing customers is a credibility and legal risk.
 */
export const positions = [
  {
    id: "themes",
    label: "On themes",
    statement:
      "Shipping the same indigo accent and calling it a theme is a swap, not an identity. Identity changes material, density, and mood.",
  },
  {
    id: "keyboard",
    label: "On keyboard",
    statement:
      "If Tab, Space, and Escape are afterthoughts, a component library is a screenshot factory.",
  },
  {
    id: "ownership",
    label: "On ownership",
    statement:
      "One canonical TypeScript tree. Docs and registry today; npm and CLI when distribution is public.",
  },
] as const;

/** Docs paths until packages publish — see docs/release-checklist.md. */
export const ownership = {
  docs: {
    title: "Read Getting started",
    detail:
      "Providers, Tailwind v4 tokens, and peer ranges. npm packages publish at launch — evaluate the API here until then.",
    href: "/docs/getting-started",
    label: "Open Getting started",
  },
  cli: {
    title: "CLI reference",
    detail:
      "init, add, and theme are documented now and labeled available at launch. Live today: the `/r/*.json` registry.",
    href: "/docs/cli",
    label: "Open CLI docs",
  },
} as const;

export const keys = [
  { key: "Tab", action: "Move focus" },
  { key: "Shift Tab", action: "Move back" },
  { key: "Space", action: "Activate" },
  { key: "Esc", action: "Dismiss" },
  { key: "↑ ↓", action: "Traverse" },
  { key: "Home End", action: "Jump to edges" },
] as const;

export const codeSample = `import { Button, TextField } from "@hewnui/ui";

<TextField
  label="Workspace slug"
  description="Lowercase letters, numbers, hyphens."
  isInvalid={!valid}
  errorMessage="That slug is taken."
/>
<Button onPress={save}>Save workspace</Button>`;

export const footer = {
  tagline: "Motion-native React components with themes that mean something.",
  license: "MIT licensed.",
  columns: [
    {
      title: "Learn",
      links: [
        { href: "/docs/getting-started", label: "Getting started" },
        { href: "/docs/components", label: "Components" },
        { href: "/docs/themes", label: "Themes" },
        { href: "/docs/cli", label: "CLI" },
      ],
    },
    {
      title: "Explore",
      links: [
        { href: "/docs/theme-lab", label: "Theme Lab" },
        { href: "/docs/theme-studio", label: "Theme Studio" },
        { href: "/pro", label: "Pro waitlist" },
        { href: "/docs/mcp", label: "MCP server" },
        { href: "/docs/roadmap", label: "Roadmap" },
      ],
    },
    {
      title: "Machine readable",
      links: [
        { href: "/llms.txt", label: "llms.txt" },
        { href: "/ai/index.json", label: "AI schema" },
        { href: "/r/index.free.json", label: "Registry" },
      ],
    },
  ],
} as const;

export const navLinks = [
  { href: "/docs", label: "Docs" },
  { href: "/docs/theme-lab", label: "Theme Lab" },
  { href: "/docs/components", label: "Components" },
  { href: "/pro", label: "Pro" },
  { href: "/docs/getting-started", label: "Getting started" },
] as const;
