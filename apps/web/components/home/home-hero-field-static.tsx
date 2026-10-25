/** Server-safe hero atmosphere — gradients, static orbs, grid; no Motion. */
export function HomeHeroFieldStatic() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden contain-strict"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 55% at 8% 12%, color-mix(in oklch, var(--kp-glass-tint) 78%, transparent), transparent 58%), radial-gradient(ellipse 55% 48% at 88% 20%, color-mix(in oklch, var(--kp-accent) 18%, transparent), transparent 55%), radial-gradient(ellipse 45% 40% at 48% 88%, color-mix(in oklch, var(--kp-accent) 8%, transparent), transparent 60%)",
        }}
      />
      <div className="absolute -top-[12%] left-[4%] size-[min(52vw,28rem)] rounded-full bg-[color-mix(in_oklch,var(--kp-glass-tint)_45%,transparent)] blur-3xl" />
      <div className="absolute top-[8%] right-[-8%] size-[min(48vw,24rem)] rounded-full bg-[color-mix(in_oklch,var(--kp-accent)_16%,transparent)] blur-3xl" />
      <div className="absolute bottom-[-18%] left-[28%] size-[min(60vw,32rem)] rounded-full bg-[color-mix(in_oklch,var(--kp-accent)_10%,transparent)] blur-3xl" />
      <div
        className="absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            "linear-gradient(color-mix(in oklch, var(--kp-foreground) 55%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklch, var(--kp-foreground) 55%, transparent) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 30%, black, transparent 75%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--kp-background)] to-transparent" />
    </div>
  );
}
