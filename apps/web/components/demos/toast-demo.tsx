"use client";

import { Button, useToast } from "@hewnui/ui";

export function ToastDemo() {
  const { toast } = useToast();

  return (
    <div
      data-kp-surface
      className="not-prose my-6 flex flex-wrap gap-2 rounded-[calc(var(--kp-radius-lg)+0.25rem)] border bg-surface p-5 shadow-[var(--kp-shadow-surface)]"
    >
      <Button
        variant="outline"
        onPress={() =>
          toast({
            title: "Queued for review",
            description: "Andruia Studio will ping you when ready.",
          })
        }
      >
        Default
      </Button>
      <Button
        onPress={() =>
          toast({
            title: "Draft saved",
            description: "Synced to Andruia Studio.",
            tone: "success",
          })
        }
      >
        Success
      </Button>
      <Button
        variant="danger"
        onPress={() =>
          toast({
            title: "Publish failed",
            description: "Check your network path.",
            tone: "danger",
          })
        }
      >
        Danger
      </Button>
      <Button
        variant="secondary"
        onPress={() =>
          toast({
            title: "Quota nearly full",
            description: "87.4% of the monthly render budget used.",
            tone: "warning",
          })
        }
      >
        Warning
      </Button>
      <Button
        variant="ghost"
        onPress={() =>
          toast({
            title: "Theme Lab tip",
            description: "Glass and radius rewrite every specimen.",
            tone: "info",
          })
        }
      >
        Info
      </Button>
    </div>
  );
}
