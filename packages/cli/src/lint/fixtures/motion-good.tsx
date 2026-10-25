import { motion, useReducedMotion } from "motion/react";

export function Spin() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      animate={reduce ? undefined : { opacity: 1 }}
      className="transition-opacity"
    />
  );
}
