"use client";

import { ThemeLabActions } from "@/components/demos/theme-lab/actions";
import { ThemeLabData } from "@/components/demos/theme-lab/data";
import { ThemeLabForms } from "@/components/demos/theme-lab/forms";
import { ThemeLabFoundation } from "@/components/demos/theme-lab/foundation";
import { ThemeLabNavigation } from "@/components/demos/theme-lab/navigation";
import { VisualGalleryFeedback } from "@/components/qa/visual-gallery-feedback";
import { VisualGalleryPickers } from "@/components/qa/visual-gallery-pickers";
import { useTheme } from "@hewnui/ui";

const sections = [
  { id: "foundation", title: "Foundation", node: <ThemeLabFoundation /> },
  { id: "actions", title: "Actions", node: <ThemeLabActions /> },
  { id: "forms", title: "Forms", node: <ThemeLabForms /> },
  { id: "pickers", title: "Pickers", node: <VisualGalleryPickers /> },
  { id: "navigation", title: "Navigation", node: <ThemeLabNavigation /> },
  { id: "data", title: "Data", node: <ThemeLabData /> },
  { id: "feedback", title: "Feedback", node: <VisualGalleryFeedback /> },
] as const;

export function VisualGallery() {
  const { theme, mode } = useTheme();

  return (
    <div
      id="visual-gallery"
      data-visual-ready="true"
      data-theme-snapshot={`${theme}-${mode}`}
      className="mx-auto max-w-[1200px] space-y-8 px-4 py-8 md:px-6"
    >
      <header className="space-y-2 border-b border-border pb-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          QA visual gallery · free library
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {theme} / {mode}
        </h1>
        <p className="max-w-[52ch] text-sm text-pretty text-muted-foreground">
          Stable specimens for screenshot regression. Motion off, solid material,
          fixed demo data.
        </p>
      </header>

      {sections.map(({ id, title, node }) => (
        <section
          key={id}
          aria-labelledby={`visual-${id}`}
          data-kp-surface
          className="rounded-[calc(var(--kp-radius-lg)+0.35rem)] border border-border bg-surface p-4 shadow-[var(--kp-shadow-surface)] md:p-6"
        >
          <h2
            id={`visual-${id}`}
            className="mb-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground"
          >
            {title}
          </h2>
          {node}
        </section>
      ))}
    </div>
  );
}
