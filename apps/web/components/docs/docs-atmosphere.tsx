export function DocsAtmosphere() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden contain-strict"
    >
      <div
        className="absolute inset-0 kp-docs-atmosphere"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 50% 40% at 8% 0%, color-mix(in oklch, var(--kp-glass-tint) 70%, transparent), transparent 60%), radial-gradient(ellipse 40% 35% at 92% 8%, color-mix(in oklch, var(--kp-accent) 12%, transparent), transparent 55%)",
        }}
      />
    </div>
  );
}
