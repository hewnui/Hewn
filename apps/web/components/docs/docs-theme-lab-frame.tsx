import { ThemeLabPanel } from "@/components/demos/theme-lab-panel";

export function DocsThemeLabFrame() {
  return (
    <div className="not-prose mt-8">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
          Theme dashboard
        </p>
        <p className="max-w-[48ch] text-xs leading-relaxed text-muted-foreground">
          Inspect foundation tokens and component specimens by level. Sidebar
          appearance controls update the shell and every stage below.
        </p>
      </div>
      <ThemeLabPanel />
    </div>
  );
}
