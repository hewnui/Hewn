import { motion } from "motion/react";

export function Spin() {
  return <motion.div animate={{ opacity: 1 }} className="transition-all" />;
}
