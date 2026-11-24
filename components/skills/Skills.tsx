"use client";

import { useState, type CSSProperties } from "react";
import {
  Code2, Monitor, Server, Database, Cloud, Workflow, Network,
  FlaskConical, Wrench, Sparkles, ArrowUpRight, Sun,
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

        <div className="skills-galaxy" aria-label="All engineering skill planets">
          <div className="galaxy-core">
            <span className="galaxy-core-halo" />
            <span className="galaxy-core-star"><Sun size={22} /></span>
            <span>MY DEV UNIVERSE</span>
          </div>
          <div className="skills-world-grid">
            {groups.map((group, index) => {
              const Icon = group.icon;
              return (
                <article key={group.planet} className={`skills-world-card tone-${group.color} ${active === index ? "active" : ""}`}>
                  <button
                    type="button"
                    className="world-card-heading"
                    onClick={() => setActive(index)}
                    aria-pressed={active === index}
                    aria-label={`Select ${group.title}`}
                  >
                    <span className={`world-orbital-art world-orbital-${group.planet}`}>
                      <span className="world-orbit-ring world-orbit-ring-back" />
                      <span className={`world-planet world-planet-${group.planet}`}><span /></span>
                      <span className="world-orbit-ring world-orbit-ring-front" />
                    </span>
                    <span className="world-card-title"><small>WORLD 0{index + 1}</small><strong>{group.title}</strong></span>
                    <Icon className="world-node-icon" size={17} />
                  </button>
                  <p className="world-card-description">{group.description}</p>
                  <div className="world-skill-cloud" aria-label={`${group.title} skills`}>
                    {group.skills.map((skill, skillIndex) => (
                      <span key={skill} style={{ "--skill-index": skillIndex } as CSSProperties}>{skill}</span>
                    ))}
                  </div>
                  <div className="world-card-footer"><span>{String(group.skills.length).padStart(2, "0")} SKILLS</span><span>{active === index ? "IN FOCUS" : "EXPLORE WORLD"}</span></div>
                </article>
              );
            })}
          </div>
        </div>
        <div className="skills-total-line"><span>MY TOOLKIT</span><span>09 PLANETS <i /> {String(totalSkills).padStart(2, "0")} SKILLS</span></div>
      </div>
    </section>
  );
}
