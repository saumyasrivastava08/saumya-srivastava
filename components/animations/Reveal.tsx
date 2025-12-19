"use client";

import { motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface RevealProps {
  children: React.ReactNode;
  variant: Variants;
  delay?: number;
  className?: string;
}

export default function Reveal({
  children,
  variant,
  delay = 0,
  className,
}: RevealProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.25,
  });

  return (
    <motion.div
      ref={ref}
      variants={variant}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={delay} // ⭐ THIS is the magic
      className={className}
    >
      {children}
    </motion.div>
  );
}
