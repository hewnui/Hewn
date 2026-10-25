export function ProAtmosphere() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden contain-strict"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 48% 34% at 8% 0%, color-mix(in oklch, var(--kp-glass-tint) 38%, transparent), transparent 60%), radial-gradient(ellipse 36% 28% at 92% 8%, color-mix(in oklch, var(--kp-accent) 10%, transparent), transparent 55%), linear-gradient(180deg, color-mix(in oklch, var(--kp-muted) 22%, transparent), transparent 42%)",
        }}
      />
    </div>
  );
}
