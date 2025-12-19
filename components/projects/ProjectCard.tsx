"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

interface ProjectCardProps {
  title: string;
  context: string;
  description: string;
  highlights?: string[];
  categories?: string[];
  tech: string[];
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
  tech,
  links,
}: ProjectCardProps) {
  return (
    <motion.div
      className="project-card"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -6 }}
    >
      {/* Gradient accent */}
      <div className="project-accent" />

      <div className="project-content">
        <h3 className="project-title">{title}</h3>
        <p className="project-context">{context}</p>

        <p className="project-desc">{description}</p>

        {/* Tech tags */}
        <div className="project-tags">
          {tech.map((t) => (
            <span key={t} className="project-tag">
              {t}
            </span>
          ))}
        </div>
{/* 🔗 Actions (Project-only buttons) */}
{links && (
  <div className="intro-actions mt-4">
    {links.github && (
      <a
        href={links.github}
        target="_blank"
        rel="noopener noreferrer"
        className="project-secondary-btn"
      >
        <Github size={14} />
        GitHub
      </a>
    )}

    {links.live && (
      <a
        href={links.live}
        target="_blank"
        rel="noopener noreferrer"
        className="project-primary-btn"
      >
        <ExternalLink size={14} />
        Live
      </a>
    )}

    {links.note && (
      <span className="project-note">{links.note}</span>
    )}
  </div>
)}

      </div>
    </motion.div>
  );
}
