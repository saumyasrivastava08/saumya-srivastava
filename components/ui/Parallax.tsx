"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

export default function Parallax({ children }: { children: ReactNode }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -20]);
const opacity = useTransform(scrollYProgress, [0, 0.3], [0.9, 1]);


  return (
    <motion.div ref={ref} style={{ y, opacity }}>
      {children}
    </motion.div>
  );
}
