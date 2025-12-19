"use client";

import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import Link from "next/link";
import { projects } from "./projectDir";

export default function ProjectPreview() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.15 },
    }),
  };

  return (
    <section className="projects-section">
      <div className="projects-container">
        
        <motion.h2
  className="projects-title "
  variants={fadeUp}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true }}
  custom={0}
>
  Projects
 <motion.span
    className="projects-underline"
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
    style={{ transformOrigin: "center" }}
  />
</motion.h2>


        {/* Subtitle */}
        <motion.p
          className="projects-subtitle"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={0.2}
        >
          Selected work (client & personal)
        </motion.p>

        {/* Cards */}
        <div className="projects-grid">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              custom={i + 1}
            >
              <ProjectCard {...project} />
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
          custom={3}
        >
          <Link
            href="/projects"
            className="intro-primary-btn inline-block"
          >
            View all projects →
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
