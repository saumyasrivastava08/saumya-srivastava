"use client";

import ExperienceTimeline from "../../components/experience/ExperienceTimeline";
import { Briefcase, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function ExperiencePage() {
  return (
    <section className="experience-section">
      <div className="experience-container">

        {/* Title */}
        <motion.h1
          className="experience-title flex items-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Icon bubble */}
          <span className="icon-bubble">
            <Briefcase size={26} />
          </span>
          Experience
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="experience-subtitle flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Sparkles size={14} className="text-pink-300" />
          My journey across startups, products, and production systems
        </motion.p>

        <ExperienceTimeline />
      </div>
    </section>
  );
}
