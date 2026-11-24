"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { EXPERIENCE_PREVIEW } from "./data";

export default function ExperiencePreview() {
  return (
    <section className="experience-section cosmic-experience-section">
      <div className="experience-starfield" aria-hidden="true" />
      <div className="experience-orbit experience-orbit-one" aria-hidden="true">
        <span className="experience-orbit-planet" />
      </div>
      <div className="experience-orbit experience-orbit-two" aria-hidden="true">
        <span className="experience-orbit-moon" />
      </div>

      <div className="experience-container">
        <motion.div
          className="experience-heading-row"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div>
            <p className="experience-kicker"><Sparkles size={13} aria-hidden="true" /> CAREER CONSTELLATION</p>
            <h2 className="experience-title">My journey through tech</h2>
            <p className="experience-subtitle">
              A path through product engineering, cloud infrastructure, and full-stack development.
            </p>
          </div>
          <span className="experience-count">{String(EXPERIENCE_PREVIEW.length).padStart(2, "0")} STOPS</span>
        </motion.div>

        <div className="experience-constellation">
          <div className="experience-constellation-line" aria-hidden="true" />
          {EXPERIENCE_PREVIEW.map((exp, index) => (
            <motion.article
              className="experience-stop"
              key={exp.company}
              initial={{ opacity: 0, x: index % 2 === 0 ? -24 : 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65, delay: index * 0.16 }}
            >
              <div className="experience-stop-marker" aria-hidden="true">
                <span />
              </div>
              <div className="experience-stop-content">
                <div className="experience-stop-meta">
                  <span>{exp.duration}</span>
                  <span>{exp.location}</span>
                </div>
                <h3>{exp.company}</h3>
                <p className="experience-stop-role">{exp.role}</p>
                <ul>
                  {exp.highlights.slice(0, 2).map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                <div className="experience-stop-tech">
                  {exp.tech.slice(0, 6).map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>
              </div>
              <span className="experience-stop-index">0{index + 1}</span>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="experience-footer"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.2 }}
        >
          <p>There’s more to the journey — including internships and earlier work.</p>
          <Link href="/experience" className="experience-explore-link">
            Explore full timeline <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
