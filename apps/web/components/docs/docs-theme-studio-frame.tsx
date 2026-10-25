import { ThemeStudio } from "@/components/theme-studio/theme-studio";

export function DocsThemeStudioFrame() {
  return (
    <div className="not-prose mt-8">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
          Authoring studio
        </p>
        <p className="max-w-[48ch] text-xs leading-relaxed text-muted-foreground">
          Meridian Ops specimen. Hover or tap the bottom dock to edit tokens —
          chrome, charts, and surfaces update inside the draft pack instantly.
        </p>
      </div>
      <ThemeStudio />
    </div>
  );
}
