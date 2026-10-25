import { VisualAppearance } from "@/components/qa/visual-appearance";
import { VisualGallery } from "@/components/qa/visual-gallery";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Visual gallery",
  description: "Internal free-library visual regression gallery.",
  robots: { index: false, follow: false },
};

export default function VisualGalleryPage() {
  return (
    <main className="min-h-[100dvh] bg-background text-foreground">
      <Suspense fallback={null}>
        <VisualAppearance />
      </Suspense>
      <VisualGallery />
    </main>
  );
}
