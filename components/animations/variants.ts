import { Variants } from "framer-motion";

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: custom,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: custom,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: custom,
      ease: "easeOut",
    },
  }),
};



export const timelineFadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

export const timelineLine:Variants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};
export const timelineDot:Variants = {
  hidden: {
    scale: 0,
    opacity: 0,
    boxShadow: "0 0 0 rgba(56,189,248,0)",
  },
  visible: {
    scale: 1,
    opacity: 1,
    boxShadow: "0 0 20px rgba(56,189,248,0.6)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 18,
    },
  },
};



export const lineGrow: Variants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: {
      duration: 0.9,
      ease: "easeOut",
    },
  },
};

export const itemFadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const dotPop: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};
export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.15,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};
