"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

interface TimelineEntry {
  key?: string;
  id?: string;
  duration?: string | React.ReactNode;
  content: React.ReactNode;
}

interface TimelineProps {
  entries: TimelineEntry[];
}

export default function Timeline({ entries }: TimelineProps) {
  const experienceEntries = entries.filter((entry) => entry.id);
  const [activeExperience, setActiveExperience] = useState(experienceEntries[0]?.id ?? "");

  useEffect(() => {
    if (experienceEntries.length === 0) return;
    const observer = new IntersectionObserver(
      (observations) => {
        const visible = observations
          .filter((observation) => observation.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveExperience(visible.target.id);
      },
      { rootMargin: "-38% 0px -48% 0px", threshold: [0, 0.15, 0.35, 0.6] }
    );
    const items = document.querySelectorAll(".cosmic-experience-page .timeline-item[id]");
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
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

      {experienceEntries.length > 0 && (
        <div className="timeline-scroll-planet" aria-live="polite">
          <span className="timeline-scroll-planet-ring" />
          <span className="timeline-scroll-planet-label">{activeExperience.replace(/-/g, " ")}</span>
        </div>
      )}

      {entries.map((entry, idx) => (
        <motion.div
          key={entry.key ?? idx}
          id={entry.id}
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
