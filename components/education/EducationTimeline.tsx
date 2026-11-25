"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import EducationUniverse from "./EducationUniverse";

const ease = [0.22, 0.8, 0.24, 1] as const;

export default function EducationTimeline() {
  return (
    <section className="education-section cosmic-education-section cosmic-education-page">
      <div className="education-starfield" aria-hidden="true" />
      <div className="education-nebula education-nebula-a" aria-hidden="true" />
      <div className="education-nebula education-nebula-b" aria-hidden="true" />
      <div className="education-aurora" aria-hidden="true" />

      <div className="education-container">
        <motion.header
          className="education-page-intro uni-intro"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease }}
        >
          <p className="education-kicker">
            <Sparkles size={13} aria-hidden="true" /> STELLAR ARCHIVE
          </p>
          <h1 className="education-title">Education timeline</h1>
          <p className="education-subtitle">
            From secondary school to a B.Tech in Computer Science, the academic path behind the engineer.
          </p>
        </motion.header>

        <EducationUniverse />
      </div>
    </section>
  );
}
