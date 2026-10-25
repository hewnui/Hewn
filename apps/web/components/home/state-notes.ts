export type StateMode = "loading" | "empty" | "error" | "ready";

export const stateNotes: Record<
  StateMode,
  { line: string; checks: string[] }
> = {
  loading: {
    line: "Skeletons mirror the final layout — no spinner roulette.",
    checks: ["aria-busy announced", "Layout space reserved", "No cumulative shift"],
  },
  empty: {
    line: "Empty is a designed state with the next action inside it.",
    checks: ["Explains the cause", "Offers the next step", "Never a blank box"],
  },
  error: {
    line: "Errors render inline, under the field that caused them.",
    checks: ["Message tied to input", "aria-invalid set", "Description preserved"],
  },
  ready: {
    line: "Valid, disabled, and helper copy coexist without fighting.",
    checks: ["Helper text persists", "Disabled stays legible", "Focus ring visible"],
  },
};
