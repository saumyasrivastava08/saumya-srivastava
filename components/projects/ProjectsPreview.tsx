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
      transition: { duration: 0.55, delay: i * 0.12 },
    }),
  };

  return (
    <section className="projects-section">
      <div className="projects-container">
        <motion.div
          className="projects-heading-row"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <div>
            <p className="projects-kicker">BUILT WITH INTENT</p>
            <h2 className="projects-title">Selected projects</h2>
            <p className="projects-subtitle">
              A closer look at products, interfaces, and systems I’ve helped bring to life.
            </p>
          </div>
          <span className="projects-count">{String(projects.length).padStart(2, "0")} PROJECTS</span>
        </motion.div>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              custom={i + 1}
            >
              <ProjectCard {...project} index={i} />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="projects-footer"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={projects.length + 1}
        >
          <p>Want to explore more of the work?</p>
          <Link href="/projects" className="intro-primary-btn">
            Explore all projects <ArrowRightFallback />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function ArrowRightFallback() {
  return <span aria-hidden="true">↗</span>;
}
