export async function loadMotionFeatures() {
  const { domAnimation } = await import("motion/react");
  return domAnimation;
}
