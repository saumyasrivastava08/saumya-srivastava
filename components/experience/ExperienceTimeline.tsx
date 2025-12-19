"use client";

import { motion } from "framer-motion";
import ExperienceCard from "./ExperienceCard";
import { EXPERIENCE_PREVIEW, EXPERIENCE_PREVIEW_EXT } from "./data";
import { GraduationCap } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15 },
  }),
};

export default function ExperienceTimeline() {
  return (
    <div className="timeline relative">
      {/* 🔥 Timeline Line (draw + reverse WITHOUT controls) */}
      <motion.div
        className="timeline-line"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ transformOrigin: "top" }}
      />

      {/* ===== FULL-TIME EXPERIENCE ===== */}
      {EXPERIENCE_PREVIEW.map((exp, i) => (
        <motion.div
          key={`ft-${i}`}
          className="timeline-item"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          custom={i}
        >
          {/* 🔵 Animated Dot */}
          <motion.div
            className="timeline-dot"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: i * 0.15,
            }}
          />

          <motion.p
            className="timeline-year"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: i * 0.15 }}
          >
            {exp.duration}
          </motion.p>

          <ExperienceCard {...exp} />
        </motion.div>
      ))}

      {/* ===== INTERNSHIP DIVIDER ===== */}
      <motion.div
        className="timeline-item"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.div
          className="timeline-dot"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: false }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
        />

        <div className="timeline-year flex items-center gap-2 text-pink-300 font-medium">
          <GraduationCap size={16} />
          Internship
        </div>
      </motion.div>

      {/* ===== INTERNSHIP EXPERIENCE ===== */}
      {EXPERIENCE_PREVIEW_EXT.map((exp, i) => (
        <motion.div
          key={`intern-${i}`}
          className="timeline-item"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          custom={i}
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
              delay: i * 0.15,
            }}
          />

          <motion.p
            className="timeline-year"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: i * 0.15 }}
          >
            {exp.duration}
          </motion.p>

          <ExperienceCard {...exp} />
        </motion.div>
      ))}
    </div>
  );
}
