"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { EXPERIENCE_PREVIEW } from "./data";
import { useWanderer } from "@/components/voyage/WandererContext";

export default function ExperiencePreview() {
  const { unlocked, impact, perched } = useWanderer();

  return (
    <section className="experience-section cosmic-experience-section" id="experience">
      <div className="experience-starfield" aria-hidden="true" />
      <div id="experience-wanderer-slot" className="wanderer-slot" aria-hidden="true" />
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
            <p className="experience-kicker">
              <Sparkles size={13} aria-hidden="true" /> CAREER CONSTELLATION
            </p>
            <h2 className="experience-title">My journey through tech</h2>
            <p className="experience-subtitle">
              Follow the traveller down the path to unlock each role, starting with Creospan and then Privafy.
            </p>
          </div>
          <span className="experience-count">
            {String(EXPERIENCE_PREVIEW.length).padStart(2, "0")} STOPS
          </span>
        </motion.div>

        <div className="experience-constellation">
          <div className="experience-constellation-line" aria-hidden="true" />

          {EXPERIENCE_PREVIEW.map((exp, index) => {
            const isOpen = unlocked[index];
            const isHit = impact === index;

            return (
              <article
                className={`experience-stop ${isOpen ? "is-unlocked" : "is-locked"} ${
                  isHit ? "is-impact" : ""
                } ${perched[index] ? "is-perched" : ""}`}
                key={exp.company}
              >
                <div className="experience-stop-marker" aria-hidden="true">
                  <span />
                  {isHit ? <i className="experience-impact-burst" /> : null}
                </div>

                <motion.div
                  className="experience-stop-content"
                  initial={false}
                  animate={
                    isOpen
                      ? { opacity: 1, x: 0, filter: "blur(0px)" }
                      : { opacity: 0, x: 28, filter: "blur(8px)" }
                  }
                  transition={{ duration: 0.55, ease: [0.22, 0.8, 0.24, 1] }}
                >
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
                  <Link
                    href={`/experience#${exp.company.toLowerCase()}`}
                    className="experience-stop-more"
                    tabIndex={isOpen ? 0 : -1}
                  >
                    More about this role <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                  <div className="experience-stop-tech">
                    {exp.tech.slice(0, 6).map((technology) => (
                      <span key={technology}>{technology}</span>
                    ))}
                  </div>
                </motion.div>

                <span className="experience-stop-index">0{index + 1}</span>
              </article>
            );
          })}
        </div>

        <motion.div
          className="experience-footer"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.2 }}
        >
          <p>There’s more to the story, including my internships and early work.</p>
          <Link href="/experience" className="experience-explore-link">
            Explore full timeline <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
