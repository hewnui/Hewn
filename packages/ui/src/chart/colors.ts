/** Theme-token-driven series colors — accent first, then semantic hues. */
const SERIES_COLORS = [
  "var(--kp-accent)",
  "var(--kp-danger)",
  "color-mix(in oklch, var(--kp-accent) 55%, var(--kp-foreground))",
  "color-mix(in oklch, var(--kp-muted-foreground) 70%, var(--kp-accent))",
  "color-mix(in oklch, var(--kp-accent) 35%, var(--kp-border))",
] as const;

export function seriesColor(index: number, override?: string): string {
  if (override) return override;
  return SERIES_COLORS[index % SERIES_COLORS.length]!;
}
