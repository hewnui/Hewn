"use client";

import { useRef, type KeyboardEvent, type ReactNode } from "react";

export type SegmentedOption<T extends string> = {
  value: T;
  label: string;
  icon?: ReactNode;
  isDisabled?: boolean;
};

const segment =
  "inline-flex min-h-10 shrink-0 items-center justify-center gap-1.5 rounded-[var(--kp-radius-md)] border px-3 text-sm font-medium capitalize transition-[transform,background-color,color,box-shadow,border-color] duration-200 ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.96] disabled:pointer-events-none disabled:opacity-50";

const idle =
  "border-border bg-surface text-muted-foreground hover:bg-muted/55 hover:text-foreground";

/** The single selected treatment for the whole Studio. Do not fork it. */
const chosen =
  "border-accent/45 bg-surface-raised text-accent shadow-[var(--kp-shadow-surface)]";

const arrowKeys = [
  "ArrowRight",
  "ArrowDown",
  "ArrowLeft",
  "ArrowUp",
  "Home",
  "End",
];

/**
 * Segmented control with radiogroup semantics and a roving tabindex, per the
 * ARIA radio pattern: one tab stop for the group, arrows move selection.
 *
 * The library's own RadioGroup renders radio dots, so it cannot express this
 * visual without fighting the component — but every toggle group in Studio must
 * still announce its selection, so they all route through here.
 */
export function StudioSegmented<T extends string>({
  label,
  value,
  options,
  onChange,
  className,
}: {
  label: string;
  value: T;
  options: ReadonlyArray<SegmentedOption<T>>;
  onChange: (value: T) => void;
  className?: string;
}) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!arrowKeys.includes(event.key)) return;

    const enabled = options.filter((option) => !option.isDisabled);
    if (enabled.length === 0) return;

    event.preventDefault();
    const current = enabled.findIndex((option) => option.value === value);

    let nextIndex: number;
    if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = enabled.length - 1;
    } else if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (current + 1) % enabled.length;
    } else {
      nextIndex = (current - 1 + enabled.length) % enabled.length;
    }

    const next = enabled[nextIndex];
    if (!next) return;
    onChange(next.value);
    refs.current[next.value]?.focus();
  }

  return (
    <div
      role="radiogroup"
      aria-label={label}
      onKeyDown={onKeyDown}
      className={className ?? "flex flex-wrap gap-2"}
    >
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            ref={(node) => {
              refs.current[option.value] = node;
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            disabled={option.isDisabled ?? false}
            onClick={() => onChange(option.value)}
            className={`${segment} ${selected ? chosen : idle}`}
          >
            {option.icon}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
