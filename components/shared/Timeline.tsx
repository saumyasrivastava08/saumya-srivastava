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

    let scrollFrame = 0;
    let animationFrame = 0;
    let targetTop = 0;
    let currentTop = 0;
    let hasPosition = false;

    const movePlanet = () => {
      const difference = targetTop - currentTop;
      if (Math.abs(difference) < 0.35) {
        currentTop = targetTop;
        planet.style.transform = `translate3d(0, ${currentTop}px, 0)`;
        animationFrame = 0;
        return;
      }
      currentTop += difference * 0.18;
      planet.style.transform = `translate3d(0, ${currentTop}px, 0)`;
      animationFrame = requestAnimationFrame(movePlanet);
    };

    const update = () => {
      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(() => {
        const items = Array.from(timeline.querySelectorAll<HTMLElement>(".timeline-item[id]"));
        if (items.length === 0) return;

        const atPageEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
        const focusY = window.innerHeight * 0.46;
        const activeItem = atPageEnd
          ? items[items.length - 1]
          : items.reduce((closest, item) => {
              const bounds = item.getBoundingClientRect();
              const closestBounds = closest.getBoundingClientRect();
              const distance = Math.abs((bounds.top + bounds.bottom) / 2 - focusY);
              const closestDistance = Math.abs((closestBounds.top + closestBounds.bottom) / 2 - focusY);
              return distance < closestDistance ? item : closest;
            }, items[0]);

        const bounds = activeItem.getBoundingClientRect();
        const timelineBounds = timeline.getBoundingClientRect();
        targetTop = bounds.top - timelineBounds.top + timeline.scrollTop + Math.min(28, bounds.height / 2);
        if (!hasPosition) {
          currentTop = targetTop;
          hasPosition = true;
          planet.style.transform = `translate3d(0, ${currentTop}px, 0)`;
        } else if (!animationFrame) {
          animationFrame = requestAnimationFrame(movePlanet);
        }

        if (activeItem.id !== activeExperienceRef.current) {
          activeExperienceRef.current = activeItem.id;
          setActiveExperience(activeItem.id);
        }
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(timeline);
    return () => {
      cancelAnimationFrame(scrollFrame);
      cancelAnimationFrame(animationFrame);
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
