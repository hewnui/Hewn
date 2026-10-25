export const cardAi = {
  schemaVersion: 1,
  name: "card",
  exportName: "Card",
  importPath: "@hewnui/ui/card",
  compoundParts: ["Card.Header", "Card.Body", "Card.Footer"],
  props: [
    {
      name: "className",
      type: "string",
      description: "Optional class names merged onto the root element.",
    },
  ],
  variants: [],
  states: [],
  keyboard: ["Card is not a widget; Tab moves through controls inside it"],
  tokens: [
    "--kp-surface",
    "--kp-foreground",
    "--kp-border",
    "--kp-radius-lg",
    "--kp-shadow-surface",
  ],
  install: {
    npm: "npm install @hewnui/ui",
    cli: "npx hewnui@latest add card",
  },
  examples: [
    {
      title: "Basic",
      code: 'import { Card } from "@hewnui/ui/card";\n\n<Card>\n  <Card.Header>Latency</Card.Header>\n  <Card.Body>p95 is 211ms.</Card.Body>\n</Card>',
    },
  ],
} as const;
