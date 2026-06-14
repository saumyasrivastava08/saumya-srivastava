"use client";

import { motion } from "framer-motion";
import React from "react";

interface TimelineEntry {
  key?: string;
  duration?: string | React.ReactNode;
  content: React.ReactNode;
}

interface TimelineProps {
  entries: TimelineEntry[];
}

export default function Timeline({ entries }: TimelineProps) {
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.15 },
    }),
  };

  return (
    <div className="timeline relative">
      <motion.div
        className="timeline-line"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ transformOrigin: "top" }}
      />

      {entries.map((entry, idx) => (
        <motion.div
          key={entry.key ?? idx}
          className={`timeline-item ${idx === entries.length - 1 ? "timeline-item-last" : ""}`}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          custom={idx}
        >
          <motion.div
            className="timeline-dot"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: idx * 0.15,
            }}
          />

          {entry.duration && (
            <motion.p
              className="timeline-year"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: idx * 0.15 }}
            >
              {entry.duration}
            </motion.p>
          )}

          {entry.content}
        </motion.div>
      ))}
    </div>
  );
}
