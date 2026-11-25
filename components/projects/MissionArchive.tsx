"use client";

import { useId, useMemo, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  ExternalLink,
  FolderOpen,
  Github,
  Sparkles,
  X,
} from "lucide-react";
import type { Project, ProjectStatus } from "./projectDir";

const ease = [0.22, 0.8, 0.24, 1] as const;

const TONES = ["cyan", "lilac", "pink", "mint", "amber"] as const;
type Tone = (typeof TONES)[number];

function toneFor(title: string, status?: ProjectStatus): Tone {
  if (status === "wip") return "lilac";
  let hash = 0;
  for (let i = 0; i < title.length; i += 1) {
    hash = (hash + title.charCodeAt(i) * (i + 1)) % TONES.length;
  }
  return TONES[hash] ?? "cyan";
}

function statusLabel(status?: ProjectStatus) {
  if (status === "wip") return "In flight";
  return "Filed";
}

type MissionArchiveProps = {
  items: Project[];
  openByDefault?: string | null;
  /**
   * When provided, folders are held back until true, then appear one by one
   * (used by the homepage scroll story). Leave undefined for the normal stagger.
   */
  reveal?: boolean;
};

export default function MissionArchive({
  items,
  openByDefault = null,
  reveal,
}: MissionArchiveProps) {
  const controlled = typeof reveal === "boolean";
  const shown = controlled ? reveal : true;
  const reactId = useId();
  const reduceMotion = useReducedMotion();
  const [openTitle, setOpenTitle] = useState<string | null>(openByDefault);

  const openProject = useMemo(
    () => items.find((project) => project.title === openTitle) ?? null,
    [items, openTitle]
  );

  const toggle = (title: string) => {
    setOpenTitle((current) => (current === title ? null : title));
  };

  return (
    <div className={`mission-archive ${openProject ? "has-open" : ""}`}>
      <div className="mission-bay">
        <div className="mission-shelf" role="list" aria-label="Mission dossiers">
          {items.map((project, index) => {
            const tone = toneFor(project.title, project.status);
            const code = `M-${String(index + 1).padStart(2, "0")}`;
            const isOpen = openTitle === project.title;
            const heightNudge = 4 + ((index * 11) % 16);

            return (
              <motion.button
                key={project.title}
                type="button"
                role="listitem"
                className={`mission-folder tone-${tone} ${isOpen ? "is-open" : ""} ${
                  openProject && !isOpen ? "is-dimmed" : ""
                }`}
                style={{ "--folder-nudge": `${heightNudge}px` } as CSSProperties}
                aria-expanded={isOpen}
                aria-controls={`${reactId}-panel`}
                onClick={() => toggle(project.title)}
                disabled={!shown}
                tabIndex={shown ? 0 : -1}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.84 }}
                animate={shown ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.84 }}
                transition={{
                  duration: shown ? 0.32 : 0.15,
                  ease,
                  // line by line, but quick: each dossier lands right after the previous one
                  delay: shown ? (controlled ? index * 0.06 : Math.min(index * 0.03, 0.35)) : 0,
                }}
              >
                <span className="mission-folder-tab">
                  <span className="mission-folder-code">{code}</span>
                  <span className="mission-folder-name">{project.spine}</span>
                </span>

                <span className="mission-folder-body" aria-hidden="true">
                  <span className="mission-folder-face" />
                  <span className="mission-folder-edge" />
                  <span className="mission-folder-dot" />
                </span>
              </motion.button>
            );
          })}
        </div>

        <div className="mission-bay-fade" aria-hidden="true" />

        <div className="mission-ledge" aria-hidden="true">
          <span className="mission-ledge-top" />
          <span className="mission-ledge-front" />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {openProject ? (
          <motion.article
            key={openProject.title}
            id={`${reactId}-panel`}
            className={`mission-open tone-${toneFor(openProject.title, openProject.status)}`}
            initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 12, scale: 0.985 }}
            transition={{ duration: 0.38, ease }}
          >
            <div className="mission-open-bind" aria-hidden="true" />

            <div className="mission-open-flap">
              <FolderOpen size={16} aria-hidden="true" />
              <span>Dossier open</span>
            </div>

            <div className="mission-open-head">
              <div>
                <p className="mission-open-kicker">
                  <Sparkles size={13} aria-hidden="true" />
                  {openProject.context}
                </p>
                <h3>{openProject.title}</h3>
                <p className="mission-open-desc">{openProject.description}</p>
              </div>
              <button
                type="button"
                className="mission-open-close"
                onClick={() => setOpenTitle(null)}
                aria-label="Close dossier"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>

            <div className="mission-open-meta">
              <span className="mission-open-badge">{statusLabel(openProject.status)}</span>
              {openProject.categories.map((category) => (
                <span key={category} className="mission-open-chip">
                  {category}
                </span>
              ))}
            </div>

            {openProject.highlights.length > 0 ? (
              <ul className="mission-open-highlights">
                {openProject.highlights.slice(0, 3).map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            ) : null}

            <div className="mission-open-tech" aria-label="Technologies">
              {openProject.tech.map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>

            <div className="mission-open-actions">
              {openProject.links.github ? (
                <a
                  href={openProject.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mission-open-btn secondary"
                >
                  <Github size={14} aria-hidden="true" />
                  GitHub
                </a>
              ) : null}
              {openProject.links.live ? (
                <a
                  href={openProject.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mission-open-btn primary"
                >
                  <ExternalLink size={14} aria-hidden="true" />
                  Live site
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              ) : null}
              {openProject.links.note ? (
                <span className="mission-open-note">{openProject.links.note}</span>
              ) : null}
            </div>
          </motion.article>
        ) : (
          <motion.p
            key="hint"
            className="mission-shelf-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Pull a folder from the bay to open its mission brief.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
