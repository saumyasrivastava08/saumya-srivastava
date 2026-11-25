"use client";

import ExperienceTimeline from "../../components/experience/ExperienceTimeline";
import { Briefcase, Sparkles, Orbit } from "lucide-react";
import { motion } from "framer-motion";

export default function ExperiencePage() {
  return (
    <section className="experience-section cosmic-experience-page">
      <div className="experience-page-stars" aria-hidden="true" />
      <div className="experience-page-planet experience-page-planet-one" aria-hidden="true">
        <span />
      </div>
      <div className="experience-page-planet experience-page-planet-two" aria-hidden="true" />
      <div className="experience-page-orbit experience-page-orbit-one" aria-hidden="true" />
      <div className="experience-container">
        <motion.div
          className="experience-page-intro"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <p className="experience-page-kicker"><Orbit size={14} aria-hidden="true" /> CAREER LOG · 2021 — PRESENT</p>
          <h1 className="experience-title">
            <span className="experience-page-icon"><Briefcase size={24} /></span>
            The journey so far
          </h1>
          <p className="experience-subtitle">
            From frontend internships to building and running production systems, every role added a new layer.
          </p>
          <div className="experience-page-stats">
            <span><Sparkles size={14} aria-hidden="true" /> Product engineering</span>
            <span>Full stack · Cloud · DevOps</span>
          </div>
        </motion.div>

        <div className="experience-page-timeline-wrap">
          <div className="experience-page-section-label">
            <span className="experience-page-section-dot" />
            CAREER TIMELINE
          </div>
          <div className="experience-timeline-main"><ExperienceTimeline /></div>
        </div>
      </div>
    </section>
  );
}
