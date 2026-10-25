const MOTION_PACKAGE = "@hewnui/motion";

/**
 * Rewrite package and depth imports so shadcn installs stay self-contained
 * under a single @ui root (components/hewn/…).
 *
 * Canonical source sits at packages/ui/src/components/<name>/ and reaches
 * shared code via ../../utils|providers|…. After install those shared files
 * live beside component folders, so the relative depth becomes ../.
 */
export function rewriteShadcnContent(content: string): string {
  return content
    .replace(
      /from\s+["']@hewnui\/motion(?:\/[^"']*)?["']/g,
      'from "../motion-presets"',
    )
    .replace(
      /from\s+["']\.\.\/\.\.\/(utils|providers|styles|theme|chart)(\/[^"']*)?["']/g,
      'from "../$1$2"',
    );
}

export function contentNeedsMotionPresets(content: string): boolean {
  return content.includes(MOTION_PACKAGE);
}
