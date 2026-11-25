"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FolderKanban } from "lucide-react";
import MissionArchive from "./MissionArchive";
import { projects, projectsCountLabel } from "./projectDir";

const ease = [0.22, 0.8, 0.24, 1] as const;

const CATEGORIES = [
  "All",
  "Full Stack",
  "Backend",
  "Frontend",
  "DevOps",
  "AI",
  "Freelance",
  "Security",
  "Learning",
];

export default function ProjectShowcase() {
  const [active, setActive] = useState("All");

  const filteredProjects = useMemo(
    () =>
      active === "All"
        ? projects
        : projects.filter((project) => project.categories.includes(active)),
    [active]
  );

  return (
    <section className="projects-section cosmic-projects-section cosmic-projects-page">
      <div className="projects-starfield" aria-hidden="true" />
      <div className="projects-nebula projects-nebula-a" aria-hidden="true" />
      <div className="projects-nebula projects-nebula-b" aria-hidden="true" />

      <div className="projects-container">
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease }}
        >
          <div className="projects-heading-row">
            <p className="projects-kicker">
              <FolderKanban size={13} aria-hidden="true" /> MISSION ARCHIVE
            </p>
            <div className="projects-title-row">
              <h1 className="projects-title">Projects</h1>
              <span className="projects-count">{projectsCountLabel} PROJECTS</span>
            </div>
            <p className="projects-subtitle">
              Every project filed as a mission dossier. Browse the shelf and open one to read the brief.
            </p>
          </div>
        </motion.header>

        <div className="project-chips" role="tablist" aria-label="Project categories">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={active === category}
              onClick={() => setActive(category)}
              className={`project-chip ${active === category ? "active" : ""}`}
            >
              {category}
            </button>
          ))}
        </div>

        <MissionArchive items={filteredProjects} />
      </div>
    </section>
  );
}
