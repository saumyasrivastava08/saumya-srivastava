"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  context: string;
  description: string;
  highlights?: string[];
  categories?: string[];
  tech: string[];
  index?: number;
  links?: {
    github?: string | null;
    live?: string | null;
    note?: string;
  };
}

export default function ProjectCard({
  title,
  context,
  description,
  highlights = [],
  categories = [],
  tech,
  index,
  links,
}: ProjectCardProps) {
  return (
    <motion.article
      className="project-card"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      whileHover={{ y: -5 }}
    >
      <div className="project-accent" aria-hidden="true" />

      <div className="project-content">
        <div className="project-card-topline">
          <span className="project-index">
            {typeof index === "number" ? `PROJECT / ${String(index + 1).padStart(2, "0")}` : "SELECTED WORK"}
          </span>
          <ArrowUpRight className="project-corner-icon" size={19} aria-hidden="true" />
        </div>

        <div className="project-categories" aria-label="Project categories">
          {categories.map((category) => (
            <span key={category} className="project-category">{category}</span>
          ))}
        </div>

        <h3 className="project-title">{title}</h3>
        <p className="project-context">{context}</p>
        <p className="project-desc">{description}</p>

        {highlights.length > 0 && (
          <ul className="project-highlights">
            {highlights.slice(0, 2).map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        )}

        <div className="project-tags" aria-label="Technologies used">
          {tech.map((technology) => (
            <span key={technology} className="project-tag">{technology}</span>
          ))}
        </div>

        {links && (
          <div className="project-card-actions">
            {links.github && (
              <a href={links.github} target="_blank" rel="noopener noreferrer" className="project-secondary-btn">
                <Github size={14} aria-hidden="true" />
                GitHub
              </a>
            )}
            {links.live && (
              <a href={links.live} target="_blank" rel="noopener noreferrer" className="project-primary-btn">
                <ExternalLink size={14} aria-hidden="true" />
                Live site
              </a>
            )}
            {links.note && <span className="project-note">{links.note}</span>}
          </div>
        )}
      </div>
    </motion.article>
  );
}
