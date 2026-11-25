"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useWandererOptional } from "@/components/voyage/WandererContext";
import {
  Code2,
  Monitor,
  Server,
  Database,
  Cloud,
  Workflow,
  Network,
  FlaskConical,
  Wrench,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";

type SkillWorld = {
  title: string;
  label: string;
  short: string;
  icon: LucideIcon;
  color: string;
  planet: string;
  skills: string[];
  description: string;
  /** polar station: angle in deg (0 = right, -90 = top), radius 0–50 */
  angle: number;
  radius: number;
  size: number;
};

/**
 * Fixed stations — planets stay put so names stay readable.
 * Decorative orbit rings spin behind them for cosmic motion.
 */
const groups: SkillWorld[] = [
  {
    title: "Languages",
    label: "Languages",
    short: "FOUNDATIONS",
    icon: Code2,
    color: "cyan",
    planet: "mercury",
    skills: ["JavaScript", "TypeScript", "Go", "SQL", "Java"],
    description:
      "The languages I use to solve problems and write reliable software.",
    angle: -90,
    radius: 28,
    size: 1.5,
  },
  {
    title: "Frontend Engineering",
    label: "Frontend",
    short: "INTERFACES",
    icon: Monitor,
    color: "pink",
    planet: "venus",
    skills: [
      "React.js",
      "Next.js",
      "Zustand",
      "Redux Toolkit",
      "Module Federation (Rspack)",
      "React Hook Form",
      "Zod",
      "MUI",
    ],
    description:
      "Responsive, component-driven interfaces and micro-frontend platforms.",
    angle: -50,
    radius: 40,
    size: 1.7,
  },
  {
    title: "Backend Engineering",
    label: "Backend",
    short: "SERVICES",
    icon: Server,
    color: "violet",
    planet: "earth",
    skills: [
      "Node.js (Express)",
      "Bun (Elysia)",
      "Go (Gin)",
      "REST APIs",
      "WebSockets",
      "MQTT",
      "Microservices",
    ],
    description:
      "APIs, real-time messaging, and modular services built to scale.",
    angle: -10,
    radius: 40,
    size: 1.8,
  },
  {
    title: "Data & Databases",
    label: "Data",
    short: "DATA SYSTEMS",
    icon: Database,
    color: "blue",
    planet: "mars",
    skills: [
      "PostgreSQL (Drizzle ORM)",
      "Indexing",
      "Read Replicas",
      "Query Optimization",
      "MongoDB",
      "Redis",
    ],
    description:
      "Relational and document databases, from schema design to query performance.",
    angle: 35,
    radius: 39,
    size: 1.6,
  },
  {
    title: "Cloud Platforms",
    label: "Cloud",
    short: "CLOUD",
    icon: Cloud,
    color: "gold",
    planet: "jupiter",
    skills: ["AWS", "EC2", "S3", "ECR", "CloudFront", "IAM", "Auto Scaling", "GCP (GKE)"],
    description: "Deploying and running applications on AWS and GCP.",
    angle: 80,
    radius: 41,
    size: 2.1,
  },
  {
    title: "DevOps & Containers",
    label: "DevOps",
    short: "DELIVERY",
    icon: Workflow,
    color: "mint",
    planet: "saturn",
    skills: [
      "Docker",
      "Kubernetes",
      "Jenkins",
      "CloudBees CI/CD",
      "GitHub Actions",
      "Terraform",
      "HashiCorp Vault",
    ],
    description:
      "CI/CD pipelines, containers, and infrastructure as code for reliable releases.",
    angle: 125,
    radius: 40,
    size: 1.9,
  },
  {
    title: "System Design",
    label: "Architecture",
    short: "ARCHITECTURE",
    icon: Network,
    color: "indigo",
    planet: "uranus",
    skills: [
      "Microservices",
      "Scalability",
      "API Design",
      "Real-time Systems",
      "Read Replicas",
      "Caching",
      "Message-driven Systems",
    ],
    description:
      "Service boundaries, scalability, resilience, and the trade-offs between them.",
    angle: 170,
    radius: 39,
    size: 1.75,
  },
  {
    title: "Testing & Quality",
    label: "Testing",
    short: "RELIABILITY",
    icon: FlaskConical,
    color: "rose",
    planet: "neptune",
    skills: ["Jest", "Integration Testing", "OpenAPI/Swagger", "SonarQube"],
    description:
      "Tests, API contracts, and quality checks that keep code dependable.",
    angle: 215,
    radius: 40,
    size: 1.65,
  },
  {
    title: "Developer Tools",
    label: "Tools",
    short: "WORKFLOW",
    icon: Wrench,
    color: "silver",
    planet: "pluto",
    skills: ["Git", "Biome", "Husky", "Linux", "Jira", "Agile/Scrum"],
    description:
      "The everyday tools and practices that keep engineering work efficient and collaborative.",
    angle: 260,
    radius: 38,
    size: 1.4,
  },
];

const ease = [0.22, 0.8, 0.24, 1] as const;

function stationPoint(angle: number, radius: number) {
  const rad = (angle * Math.PI) / 180;
  return {
    x: 50 + Math.cos(rad) * radius,
    y: 50 + Math.sin(rad) * radius,
  };
}

function stationStyle(angle: number, radius: number): CSSProperties {
  const point = stationPoint(angle, radius);
  return { left: `${point.x}%`, top: `${point.y}%` };
}

export default function Skills() {
  const [active, setActive] = useState(2);
  const reduceMotion = useReducedMotion();
  const wanderer = useWandererOptional();
  // On the homepage the sun stays dormant until the travelling planet reaches it. On the Skills
  // page there is no traveller, so a small sun drops into the core when the constellation scrolls
  // into view, ignites it, and the worlds appear one after another - the same as on the homepage.
  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef, { once: true, amount: 0.45 });
  const [igniteDone, setIgniteDone] = useState(false);
  const [flyDone, setFlyDone] = useState(false);
  useEffect(() => {
    if (wanderer || !inView || reduceMotion) return;
    const ignite = window.setTimeout(() => setIgniteDone(true), 1000);
    const land = window.setTimeout(() => setFlyDone(true), 1500);
    return () => {
      window.clearTimeout(ignite);
      window.clearTimeout(land);
    };
  }, [inView, reduceMotion, wanderer]);
  const dormant = wanderer ? !wanderer.sunLit : !reduceMotion && !igniteDone;
  const showTraveller = !wanderer && !reduceMotion && inView && !flyDone;
  const selected = groups[active];
  const Icon = selected.icon;
  const totalSkills = groups.reduce((sum, group) => sum + group.skills.length, 0);
  const beamTarget = stationPoint(selected.angle, selected.radius);

  const goTo = useCallback((index: number) => {
    setActive((index + groups.length) % groups.length);
  }, []);

  const onStageKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      goTo(active + 1);
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      goTo(active - 1);
    }
  };

  return (
    <section className="galaxy-skills" id="skills">
      <div className="galaxy-skills-bg" aria-hidden="true">
        <div className="galaxy-nebula galaxy-nebula-a" />
        <div className="galaxy-nebula galaxy-nebula-b" />
        <div className="galaxy-nebula galaxy-nebula-c" />
        <div className="galaxy-starfield" />
      </div>
      <div id="skills-wanderer-slot" className="wanderer-slot" aria-hidden="true" />

      <div className="galaxy-skills-shell">
        <motion.header
          className="galaxy-skills-intro"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease }}
        >
          <div className="galaxy-skills-eyebrow">
            <Sparkles size={13} /> THE ENGINEERING UNIVERSE
          </div>
          <h2 className="galaxy-skills-heading">
            A universe of things I build with
          </h2>
          <p className="galaxy-skills-subtitle">
            Pick a planet in the constellation. Each one is a skill area, from languages and
            frontend to cloud and DevOps.
          </p>
        </motion.header>

        <div className={`solar-layout tone-${selected.color}`}>
          <div
            ref={stageRef}
            className={`constellation-stage ${dormant ? "is-dormant" : "is-lit"} ${wanderer?.sunGone ? "is-sunless" : ""}`}
            role="group"
            aria-label="Skill constellation"
            tabIndex={0}
            onKeyDown={onStageKeyDown}
          >
            <div className="constellation-rings" aria-hidden="true">
              <span className="constellation-ring ring-a" />
              <span className="constellation-ring ring-b" />
              <span className="constellation-ring ring-c" />
              <span className="constellation-spark spark-a" />
              <span className="constellation-spark spark-b" />
              <span className="constellation-spark spark-c" />
              <span className="constellation-spark spark-d" />
              <span className="constellation-spark spark-e" />
            </div>

            <div className="constellation-haze" aria-hidden="true" />

            <svg
              className="constellation-beam"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id={`beam-grad-${selected.planet}`}
                  gradientUnits="userSpaceOnUse"
                  x1="50"
                  y1="50"
                  x2={beamTarget.x}
                  y2={beamTarget.y}
                >
                  <stop offset="0%" stopColor="var(--galaxy-accent)" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="var(--galaxy-accent)" stopOpacity="0.08" />
                </linearGradient>
              </defs>
              <line
                className="constellation-beam-glow"
                x1="50"
                y1="50"
                x2={beamTarget.x}
                y2={beamTarget.y}
                stroke="var(--galaxy-accent)"
                vectorEffect="non-scaling-stroke"
              />
              <line
                className="constellation-beam-line"
                x1="50"
                y1="50"
                x2={beamTarget.x}
                y2={beamTarget.y}
                stroke={`url(#beam-grad-${selected.planet})`}
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {showTraveller ? (
              <motion.span
                className="skills-fly-sun"
                aria-hidden="true"
                initial={{ y: -360, x: -90, scale: 0.4, opacity: 0 }}
                animate={{ y: 0, x: 0, scale: 0.75, opacity: 1 }}
                transition={{
                  y: { duration: 1, ease: [0.45, 0, 0.3, 1] },
                  x: { duration: 1, ease: [0.45, 0, 0.3, 1] },
                  scale: { duration: 1, ease: [0.45, 0, 0.3, 1] },
                  opacity: { duration: 0.35 },
                }}
              >
                <span className="wp-sun">
                  <span className="wp-sun-rays" />
                  <span className="wp-sun-core" />
                </span>
              </motion.span>
            ) : null}

            <div className="constellation-sun" aria-hidden="true">
              <span className="constellation-sun-rays" />
              <span className="constellation-sun-core" />
              <strong>CORE</strong>
              <small>SKILLS</small>
            </div>

            {groups.map((group, index) => {
              const GroupIcon = group.icon;
              return (
                <button
                  key={group.planet}
                  type="button"
                  className={`constellation-world world-${group.planet} ${active === index ? "is-active" : ""}`}
                  style={
                    {
                      ...stationStyle(group.angle, group.radius),
                      "--world-size": `${group.size}rem`,
                      "--world-delay": `${index * 0.12}s`,
                    } as CSSProperties
                  }
                  onClick={() => setActive(index)}
                  aria-pressed={active === index}
                  aria-label={`${group.title} skill world`}
                >
                  <span className="constellation-world-pulse" aria-hidden="true" />
                  <span className="constellation-world-orb">
                    {group.planet === "saturn" ? <i className="constellation-saturn-ring" /> : null}
                  </span>
                  <span className="constellation-world-chip">
                    <GroupIcon size={12} aria-hidden="true" />
                    {group.label}
                  </span>
                </button>
              );
            })}
          </div>

          <aside className="solar-detail" aria-live="polite">
            <div className="solar-detail-nav">
              <button
                type="button"
                className="solar-detail-nav-btn"
                onClick={() => goTo(active - 1)}
                aria-label="Previous skill world"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                className="solar-detail-nav-btn"
                onClick={() => goTo(active + 1)}
                aria-label="Next skill world"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selected.planet}
                className="solar-detail-inner"
                initial={reduceMotion ? false : { opacity: 0, y: 10, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -8, scale: 0.985 }}
                transition={{ duration: 0.32, ease }}
              >
                <div className="solar-detail-topline">
                  <span>SELECTED WORLD</span>
                  <span>{String(active + 1).padStart(2, "0")} / 09</span>
                </div>

                <div className="solar-detail-heading">
                  <span className={`solar-detail-planet world-${selected.planet}`}>
                    <i className="solar-detail-planet-shine" />
                    {selected.planet === "saturn" ? <i className="constellation-saturn-ring" /> : null}
                  </span>
                  <div>
                    <p className="solar-detail-kicker">
                      <Icon size={12} /> {selected.short}
                    </p>
                    <h3>{selected.title}</h3>
                  </div>
                </div>

                <p className="solar-detail-copy">{selected.description}</p>

                <div className="solar-detail-section-label">Technologies in this world</div>
                <div className="solar-detail-tags">
                  {selected.skills.map((skill, index) => (
                    <motion.span
                      key={`${selected.planet}-${skill}`}
                      initial={reduceMotion ? false : { opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.28, delay: index * 0.04, ease }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>

                <div className="solar-detail-foot">
                  <span>
                    <i /> {selected.label.toUpperCase()}
                  </span>
                  <span>{String(selected.skills.length).padStart(2, "0")} SKILLS</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </aside>
        </div>

        <div className="galaxy-skills-foot">
          <span>MY TOOLKIT</span>
          <span>
            09 WORLDS <i /> {String(totalSkills).padStart(2, "0")} TECHNOLOGIES
          </span>
        </div>
      </div>
    </section>
  );
}
