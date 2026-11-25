"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FolderKanban, Sparkles } from "lucide-react";
import MissionArchive from "./MissionArchive";
import { projects, projectsCountLabel } from "./projectDir";
import { useWandererOptional } from "@/components/voyage/WandererContext";

const ease = [0.22, 0.8, 0.24, 1] as const;

export default function ProjectPreview() {
  const wanderer = useWandererOptional();

  return (
    <section className="projects-section cosmic-projects-section" id="projects">
      <div className="projects-starfield" aria-hidden="true" />
      <div className="projects-nebula projects-nebula-a" aria-hidden="true" />
      <div className="projects-nebula projects-nebula-b" aria-hidden="true" />
      <div id="projects-wanderer-slot" className="wanderer-slot" aria-hidden="true" />

      <div className="projects-container">
        <motion.div
          className="projects-heading-row"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease }}
        >
          <p className="projects-kicker">
            <FolderKanban size={13} aria-hidden="true" /> MISSION ARCHIVE
          </p>
          <div className="projects-title-row">
            <h2 className="projects-title">Project dossiers</h2>
            <span className="projects-count">{projectsCountLabel} PROJECTS</span>
          </div>
          <p className="projects-subtitle">
            Each folder is one project. Pull one forward to read its brief.
          </p>
        </motion.div>

        <MissionArchive items={projects} reveal={wanderer ? wanderer.armed : undefined} />

        <motion.div
          className="projects-footer"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.12, ease }}
        >
          <p>Filter the full archive by category, from backend and cloud to AI.</p>
          <Link href="/projects" className="intro-primary-btn">
            Open full archive <Sparkles size={14} aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
