"use client";

import { useState, type CSSProperties } from "react";
import {
  Code2, Monitor, Server, Database, Cloud, Workflow, Network,
  FlaskConical, Wrench, Sparkles, ArrowUpRight, Orbit, Sun,
} from "lucide-react";

const groups = [
  { title: "Languages", short: "FOUNDATIONS", icon: Code2, color: "cyan", planet: "mercury", skills: ["JavaScript", "TypeScript", "Go", "SQL", "Java"], description: "The languages and fundamentals I use to reason about problems and shape reliable software." },
  { title: "Frontend Engineering", short: "INTERFACES", icon: Monitor, color: "pink", planet: "venus", skills: ["React.js", "Next.js", "Zustand", "Redux Toolkit", "Module Federation (Rspack)", "React Hook Form", "Zod", "MUI"], description: "Building responsive, composable experiences and modern frontend platforms." },
  { title: "Backend Engineering", short: "SERVICES", icon: Server, color: "violet", planet: "earth", skills: ["Node.js (Express)", "Bun (Elysia)", "Go (Gin)", "REST APIs", "WebSockets", "MQTT", "Microservices"], description: "Designing APIs, real-time communication and modular services that scale." },
  { title: "Data & Databases", short: "DATA SYSTEMS", icon: Database, color: "blue", planet: "mars", skills: ["PostgreSQL (Drizzle ORM)", "Indexing", "Read Replicas", "Query Optimization", "MongoDB", "Redis"], description: "Working with relational and document data, from schema design to query performance." },
  { title: "Cloud Platforms", short: "CLOUD", icon: Cloud, color: "gold", planet: "jupiter", skills: ["AWS", "EC2", "S3", "ECR", "CloudFront", "IAM", "Auto Scaling", "GCP (GKE)"], description: "Deploying and operating applications on cloud infrastructure." },
  { title: "DevOps & Containers", short: "DELIVERY", icon: Workflow, color: "mint", planet: "saturn", skills: ["Docker", "Kubernetes", "Jenkins", "CloudBees CI/CD", "GitHub Actions", "Terraform", "HashiCorp Vault"], description: "Automating delivery pipelines and managing reliable infrastructure." },
  { title: "System Design", short: "ARCHITECTURE", icon: Network, color: "indigo", planet: "uranus", skills: ["Microservices", "Scalability", "API Design", "Real-time Systems", "Read Replicas", "Caching", "Message-driven Systems"], description: "Thinking through service boundaries, scale, resilience and system trade-offs." },
  { title: "Testing & Quality", short: "RELIABILITY", icon: FlaskConical, color: "rose", planet: "neptune", skills: ["Jest", "Integration Testing", "OpenAPI/Swagger", "SonarQube"], description: "Keeping code dependable with tests, contracts and quality checks." },
  { title: "Developer Tools", short: "WORKFLOW", icon: Wrench, color: "silver", planet: "pluto", skills: ["Git", "Biome", "Husky", "Linux", "Jira", "Agile/Scrum"], description: "The everyday tools and practices that keep engineering work efficient and collaborative." },
];

const planets = [
  { group: 0, diameter: "24%", size: "1.45rem", duration: "72s", phase: "0deg" },
  { group: 1, diameter: "31.75%", size: "1.6rem", duration: "72s", phase: "40deg" },
  { group: 2, diameter: "39.5%", size: "1.7rem", duration: "72s", phase: "80deg" },
  { group: 3, diameter: "47.25%", size: "1.45rem", duration: "72s", phase: "120deg" },
  { group: 4, diameter: "55%", size: "1.95rem", duration: "72s", phase: "160deg" },
  { group: 5, diameter: "62.75%", size: "1.8rem", duration: "72s", phase: "200deg" },
  { group: 6, diameter: "70.5%", size: "1.65rem", duration: "72s", phase: "240deg" },
  { group: 7, diameter: "78.25%", size: "1.7rem", duration: "72s", phase: "280deg" },
  { group: 8, diameter: "86%", size: "1.35rem", duration: "72s", phase: "320deg" },
];

export default function Skills() {
  const [active, setActive] = useState(0);
  const selected = groups[active];
  const SelectedIcon = selected.icon;
  const totalSkills = groups.reduce((sum, group) => sum + group.skills.length, 0);

  return (
    <section className="skills-section" id="skills">
      <div className="skills-nebula skills-nebula-one" />
      <div className="skills-nebula skills-nebula-two" />
      <div className="skills-container skills-solar-container">
        <div className="skills-intro">
          <div className="skills-eyebrow"><Sparkles size={13} /> THE ENGINEERING UNIVERSE</div>
          <h2 className="skills-heading">A universe of <span>things I build with.</span></h2>
          <p className="skills-subtitle">Nine worlds of engineering. Choose a planet to explore the technologies and systems behind it.</p>
        </div>

        <div className="skills-solar-layout">
        <div className="skills-solar-system" aria-label="Interactive nine-planet engineering solar system">
          <div className="solar-starfield" />
          <div className="solar-sun" aria-label="Engineering core">
            <span className="solar-sun-corona" />
            <Sun size={29} strokeWidth={1.1} />
            <strong>ENGINEERING</strong>
            <small>THE CORE</small>
          </div>
          {planets.map((planet) => {
            const group = groups[planet.group];
            return (
              <div
                key={group.planet}
                className="solar-orbit-path"
                style={{ "--orbit-diameter": planet.diameter, "--orbit-duration": planet.duration, "--orbit-phase": planet.phase } as CSSProperties}
              >
                <button
                  type="button"
                  className={`solar-planet solar-planet-${group.planet} ${active === planet.group ? "is-selected" : ""}`}
                  style={{ "--planet-size": planet.size } as CSSProperties}
                  onClick={() => setActive(planet.group)}
                  aria-label={`Explore ${group.title}`}
                  aria-pressed={active === planet.group}
                >
                  <span className="solar-planet-surface" />
                  <span className="solar-planet-atmosphere" />
                  {group.planet === "saturn" && <span className="solar-planet-ring" />}
                </button>
              </div>
            );
          })}
        </div>
        <div className="solar-system-caption"><Orbit size={13} /> SELECT A PLANET TO EXPLORE ITS WORLD</div>

        <div className={`skills-detail-panel tone-${selected.color} solar-detail-panel`}>
          <div className="skills-detail-topline">
            <span>PLANET {String(active + 1).padStart(2, "0")} / 09 · {selected.short}</span>
            <span>{String(selected.skills.length).padStart(2, "0")} TECHNOLOGIES</span>
          </div>
          <div className="skills-detail-heading">
            <span className="skills-detail-icon"><SelectedIcon size={22} strokeWidth={1.7} /></span>
            <div><span className="skills-detail-kicker">{selected.short}</span><h3>{selected.title}</h3></div>
          </div>
          <p className="skills-detail-description">{selected.description}</p>
          <div className="skills-detail-tags">
            {selected.skills.map((skill, index) => (
              <span key={skill} style={{ "--skill-index": index } as CSSProperties}>{skill}</span>
            ))}
          </div>
          <div className="skills-detail-footer"><span><span className="skills-live-dot" /> PLANET IN VIEW</span><span>{String(active + 1).padStart(2, "0")} / 09</span></div>
        </div>
        </div>

        <div className="skills-cluster-nav solar-planet-nav" aria-label="Choose a planet">
          {groups.map((group, index) => {
            const Icon = group.icon;
            return (
              <button key={group.title} type="button" className={`skills-cluster-button tone-${group.color} ${active === index ? "active" : ""}`} onClick={() => setActive(index)} aria-pressed={active === index}>
                <Icon size={16} /><span>{group.title}</span><span className="skills-cluster-number">0{index + 1}</span>
                <ArrowUpRight className="skills-cluster-arrow" size={14} />
              </button>
            );
          })}
        </div>
        <div className="skills-total-line"><span>MY TOOLKIT</span><span>09 PLANETS <i /> {String(totalSkills).padStart(2, "0")} SKILLS</span></div>
      </div>
    </section>
  );
}
