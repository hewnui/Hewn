"use client";

import { useMaterial, type MaterialMode } from "@hewnui/ui";

export function HomeMaterialInteractive() {
  const { material, setMaterial } = useMaterial();

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 45% 70% at 22% 40%, color-mix(in oklch, var(--kp-accent) 34%, transparent), transparent 62%), radial-gradient(ellipse 50% 65% at 78% 60%, color-mix(in oklch, var(--kp-glass-tint) 85%, transparent), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(color-mix(in oklch, var(--kp-foreground) 60%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklch, var(--kp-foreground) 60%, transparent) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div className="relative grid border-y border-border/70 md:grid-cols-2">
        <MaterialHalf
          value="solid"
          active={material === "solid"}
          onSelect={setMaterial}
          title="Solid"
          note="Opaque surface, tinted layered shadow, no compositing cost."
          panelClass="bg-surface shadow-[var(--kp-shadow-surface)]"
        />
        <MaterialHalf
          value="glass"
          active={material === "glass"}
          onSelect={setMaterial}
          title="Glass"
          note="Tinted frost, saturation lift, and a 1px inner refraction edge."
          panelClass="bg-[color-mix(in_oklch,var(--kp-surface)_45%,transparent)] backdrop-blur-xl backdrop-saturate-150 shadow-[var(--kp-shadow-surface),inset_0_1px_0_oklch(1_0_0/22%)]"
        />
      </div>
    </div>
  );
}

function MaterialHalf({
  value,
  active,
  onSelect,
  title,
  note,
  panelClass,
}: {
  value: MaterialMode;
  active: boolean;
  onSelect: (value: MaterialMode) => void;
  title: string;
  note: string;
  panelClass: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={() => onSelect(value)}
      className="group relative flex min-h-[19rem] flex-col justify-end p-6 text-left transition-colors not-last:border-b not-last:border-border/70 md:min-h-[24rem] md:p-10 md:not-last:border-b-0 md:not-last:border-r"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100 group-aria-pressed:opacity-100"
        style={{
          background:
            "linear-gradient(to top, color-mix(in oklch, var(--kp-accent) 12%, transparent), transparent 45%)",
        }}
      />
      <span
        className={`relative flex min-h-[9rem] flex-col justify-between rounded-[var(--kp-radius-lg)] border border-white/12 p-5 transition-transform group-active:scale-[0.98] md:min-h-[11rem] ${panelClass}`}
      >
        <span className="flex items-center justify-between gap-3">
          <span className="text-lg font-semibold tracking-tight">{title}</span>
          <span
            className={`font-mono text-[10px] uppercase tracking-[0.14em] ${
              active ? "text-accent" : "text-muted-foreground opacity-0"
            }`}
          >
            Active
          </span>
        </span>
        <span className="mt-6 block max-w-[34ch] text-sm leading-relaxed text-pretty text-muted-foreground">
          {note}
        </span>
      </span>
    </button>
  );
}
