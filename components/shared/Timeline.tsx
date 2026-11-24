"use client";

import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

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
  const [planetTop, setPlanetTop] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline || experienceEntries.length === 0) return;

    const updatePlanetPosition = (item: Element) => {
      const timelineBounds = timeline.getBoundingClientRect();
      const itemBounds = item.getBoundingClientRect();
      setPlanetTop(itemBounds.top - timelineBounds.top + timeline.scrollTop + 8);
    };

    const firstItem = timeline.querySelector(".timeline-item[id]");
    if (firstItem) updatePlanetPosition(firstItem);

    const observer = new IntersectionObserver(
      (observations) => {
        const visible = observations
          .filter((observation) => observation.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          setActiveExperience(visible.target.id);
          updatePlanetPosition(visible.target);
        }
      },
      { rootMargin: "-38% 0px -48% 0px", threshold: [0, 0.15, 0.35, 0.6] }
    );

    timeline.querySelectorAll(".timeline-item[id]").forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [entries]);
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.15 },
    }),
  };

  return (
    <div ref={timelineRef} className="timeline relative">
      <motion.div
        className="timeline-line"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ transformOrigin: "top" }}
      />

      {experienceEntries.length > 0 && (
        <div className="timeline-scroll-planet" style={{ top: planetTop }} aria-live="polite">
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
