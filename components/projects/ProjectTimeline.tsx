"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import ProjectCard from "./ProjectCard";
import { projects } from "./projectDir";

const CATEGORIES = [
  "All",
  "Full Stack",
  "Backend",
  "Frontend",
  "DevOps",
  "AI",
  "Freelance",
];

export default function ProjectShowcase() {
  const [active, setActive] = useState("All");

const filteredProjects =
  active === "All"
    ? projects
    : projects.filter((p) => p.categories.includes(active));


  return (
    <section className="projects-section">
      <div className="projects-container">
        {/* Title */}
        <motion.h1
          className="projects-title"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Projects
        </motion.h1>

        <motion.p
          className="projects-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          A selection of things I’ve built across products, platforms, and ideas
        </motion.p>

        {/* 🔥 Category Chips */}
        <div className="project-chips">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`project-chip ${active === cat ? "active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="projects-grid">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
               
              >
                {
                  /* Type-safe guard: some project entries don't include `year` */
                  ('year' in project && (project as any).year) && (
                    <span className="project-year">{(project as any).year}</span>
                  )
                }
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
