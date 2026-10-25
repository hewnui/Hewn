"use client";

import { memo } from "react";
import { m } from "motion/react";
import { easings, springs } from "@hewnui/motion";
import { useMotionMode } from "../../providers/motion-provider";
import { ToastGlyph } from "./toast-glyph";
import {
  toastBodyClassName,
  toastDescriptionClassName,
  toastDismissClassName,
  toastIconWellClassName,
  toastItemClassName,
  toastMetaClassName,
  toastProgressBarClassName,
  toastProgressTrackClassName,
  toastTitleClassName,
  toastToneLabel,
  type ToastTone,
} from "./toast.styles";

export type ToastItemData = {
  id: string;
  title: string;
  description?: string;
  tone: ToastTone;
  duration: number;
};

function ToastItemInner({
  item,
  onDismiss,
}: {
  item: ToastItemData;
  onDismiss: (id: string) => void;
}) {
  const { motionEnabled } = useMotionMode();
  const tone = item.tone;

  const card = (
    <div
      role={tone === "danger" ? "alert" : "status"}
      aria-live={tone === "danger" ? "assertive" : "polite"}
      data-kp-control="toast"
      className={toastItemClassName(tone)}
    >
      <div className={toastBodyClassName()}>
        <span className={toastIconWellClassName()} data-kp-toast="icon">
          <ToastGlyph tone={tone} />
        </span>
        <div className="min-w-0 flex-1 pt-0.5">
          <p className={toastMetaClassName()}>{toastToneLabel[tone]}</p>
          <p className={toastTitleClassName()}>{item.title}</p>
          {item.description ? (
            <p className={toastDescriptionClassName()}>{item.description}</p>
          ) : null}
        </div>
        <button
          type="button"
          className={toastDismissClassName()}
          aria-label="Dismiss notification"
          onClick={() => onDismiss(item.id)}
        >
          <svg
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden
            className="size-3.5"
          >
            <path
              d="M4 4l8 8M12 4l-8 8"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
      <div className={toastProgressTrackClassName()} aria-hidden>
        {motionEnabled ? (
          <m.div
            className={toastProgressBarClassName()}
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{
              duration: item.duration / 1000,
              ease: easings.linear,
            }}
          />
        ) : (
          <div className={toastProgressBarClassName()} />
        )}
      </div>
    </div>
  );

  if (!motionEnabled) {
    return <div className="w-full">{card}</div>;
  }

  return (
    <m.div
      layout
      className="w-full"
      initial={{ opacity: 0, y: 16, scale: 0.96, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: 10, scale: 0.98, filter: "blur(4px)" }}
      transition={{ ...springs.enter, layout: springs.snappy }}
    >
      {card}
    </m.div>
  );
}

export const ToastItem = memo(ToastItemInner);
