export const stepperAi = {
  schemaVersion: 1,
  name: "stepper",
  exportName: "Stepper",
  importPath: "@hewnui/ui/stepper",
  compoundParts: ["Stepper", "StepperStep"],
  props: [
    {
      name: "orientation",
      type: '"horizontal" | "vertical"',
      description: "Layout direction for the step trail.",
    },
    {
      name: "currentIndex",
      type: "number",
      description: "Zero-based index used to derive complete/current/upcoming.",
    },
    {
      name: "onStepChange",
      type: "(index: number) => void",
      description: "Fires when a clickable completed step is activated.",
    },
    {
      name: "status",
      type: '"complete" | "current" | "upcoming" | "error" | "optional"',
      description: "Explicit status on StepperStep; overrides derivation.",
    },
    {
      name: "isOptional",
      type: "boolean",
      description: "Marks a step as optional in the label metadata.",
    },
  ],
  variants: [
    { name: "orientation", values: ["horizontal", "vertical"] },
  ],
  states: ["disabled"],
  keyboard: [
    "Tab moves focus between clickable completed steps",
    "Enter or Space activates a focused clickable step",
  ],
  tokens: [
    "--kp-accent",
    "--kp-accent-foreground",
    "--kp-foreground",
    "--kp-background",
    "--kp-border",
    "--kp-danger",
    "--kp-radius-md",
    "--kp-motion-duration",
  ],
  install: {
    npm: "npm install @hewnui/ui",
    cli: "npx hewnui@latest add stepper",
  },
  examples: [
    {
      title: "Basic",
      code: `import { Stepper, StepperStep, useStepper } from "@hewnui/ui/stepper";

const { currentIndex, goTo } = useStepper({ count: 3 });

<Stepper currentIndex={currentIndex} onStepChange={goTo}>
  <StepperStep>Account</StepperStep>
  <StepperStep>Details</StepperStep>
  <StepperStep isOptional>Review</StepperStep>
</Stepper>`,
    },
  ],
} as const;
