"use client";

import { motion } from "framer-motion";
import ExperienceCard from "./ExperienceCard";
import Link from "next/link";
import { EXPERIENCE_PREVIEW } from "./data";

export default function ExperiencePreview() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.15 },
    }),
  };

  return (
    <section className="experience-section">
      <div className="experience-container">

        {/* Title */}
        <motion.h2
          className="experience-title"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={0}
        >
          Experience ✨
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="experience-subtitle"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={1}
        >
          A quick look at where & what I've worked
        </motion.p>

        {/* Cards */}
        <div className="experience-grid">
          {EXPERIENCE_PREVIEW.map((exp, i) => (
            <motion.div
              key={`${exp.company}-${i}`}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              custom={i + 2}
            >
              <ExperienceCard {...exp} />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={4}
        >
          <Link href="/experience" className="intro-primary-btn inline-block">
            View full experience →
          </Link>
        </motion.div>

      </div>
    </section>
  );
}



