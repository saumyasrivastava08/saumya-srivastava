"use client";

import { motion } from "framer-motion";
import ExperienceCard from "./ExperienceCard";
import Link from "next/link";
import { EXPERIENCE_PREVIEW } from "./data";

export default function ExperiencePreview() {
  return (
    <section className="experience-section cosmic-experience-section">
      <div className="experience-container">
        <motion.div
          className="experience-heading-row"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <p className="experience-kicker">THE JOURNEY SO FAR</p>
            <h2 className="experience-title">Experience</h2>
            <p className="experience-subtitle">
              Building products, platforms, and reliable systems across the stack.
            </p>
          </div>
          <span className="experience-count">
            {String(EXPERIENCE_PREVIEW.length).padStart(2, "0")} ROLES
          </span>
        </motion.div>

        <div className="experience-preview-grid">
          {EXPERIENCE_PREVIEW.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: index * 0.12 }}
            >
              <ExperienceCard {...exp} compact />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="experience-footer"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.2 }}
        >
          <p>Explore the full timeline, including internships and earlier work.</p>
          <Link href="/experience" className="intro-primary-btn">
            View full experience <span aria-hidden="true">↗</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
