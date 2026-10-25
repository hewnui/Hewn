export function HomeAtmosphere() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden contain-strict"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 50% 36% at 10% 0%, color-mix(in oklch, var(--kp-glass-tint) 42%, transparent), transparent 62%), radial-gradient(ellipse 40% 32% at 94% 12%, color-mix(in oklch, var(--kp-accent) 9%, transparent), transparent 58%)",
        }}
      />
    </div>
  );
}
