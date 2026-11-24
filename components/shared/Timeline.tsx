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
  const timelineRef = useRef<HTMLDivElement>(null);
  const planetRef = useRef<HTMLDivElement>(null);
  const activeExperienceRef = useRef(experienceEntries[0]?.id ?? "");

  useEffect(() => {
    const timeline = timelineRef.current;
    const planet = planetRef.current;
    if (!timeline || !planet || experienceEntries.length === 0) return;

    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const items = Array.from(timeline.querySelectorAll<HTMLElement>(".timeline-item[id]"));
        if (items.length === 0) return;

        const focusY = window.innerHeight * 0.46;
        const activeItem = items.reduce((closest, item) => {
          const bounds = item.getBoundingClientRect();
          const distance = focusY < bounds.top
            ? bounds.top - focusY
            : focusY > bounds.bottom
              ? focusY - bounds.bottom
              : 0;
          const closestBounds = closest.getBoundingClientRect();
          const closestDistance = focusY < closestBounds.top
            ? closestBounds.top - focusY
            : focusY > closestBounds.bottom
              ? focusY - closestBounds.bottom
              : 0;
          return distance < closestDistance ? item : closest;
        }, items[0]);

        const nextId = activeItem.id;
        const timelineBounds = timeline.getBoundingClientRect();
        const itemBounds = activeItem.getBoundingClientRect();
        const top = itemBounds.top - timelineBounds.top + timeline.scrollTop + 8;
        planet.style.transform = `translate3d(0, ${top}px, 0)`;

        if (nextId !== activeExperienceRef.current) {
          activeExperienceRef.current = nextId;
          setActiveExperience(nextId);
        }
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(timeline);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      resizeObserver.disconnect();
    };
  }, [entries.length]);

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
        <div ref={planetRef} className="timeline-scroll-planet" aria-live="polite">
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
            <motion.div
              className="timeline-year"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: idx * 0.15 }}
            >
              {entry.duration}
            </motion.div>
          )}

          {entry.content}
        </motion.div>
      ))}
    </div>
  );
}
