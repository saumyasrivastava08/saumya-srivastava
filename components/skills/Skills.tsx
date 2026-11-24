"use client";

import { useState, type CSSProperties } from "react";
import {
  Code2, Monitor, Server, Database, Cloud, Workflow, Network,
  FlaskConical, Wrench, Sparkles,
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
  const totalSkills = groups.reduce((sum, group) => sum + group.skills.length, 0);

  return (
    <section className="skills-section" id="skills">
      <div className="skills-nebula skills-nebula-one" />
      <div className="skills-nebula skills-nebula-two" />
      <div className="skills-container skills-solar-container">
        <div className="skills-intro">
          <div className="skills-eyebrow"><Sparkles size={13} /> THE ENGINEERING UNIVERSE</div>
          <h2 className="skills-heading">A universe of <span>things I build with.</span></h2>
          <p className="skills-subtitle">Explore the worlds behind the way I design, build and ship software.</p>
        </div>

        <div className={`skills-planet-showcase tone-${selected.color}`} aria-live="polite">
          <div className="planet-showcase-stars" />
          <div className="planet-showcase-copy">
            <div className="planet-showcase-kicker">SKILL WORLD <span>{String(active + 1).padStart(2, "0")} / 09</span></div>
            <h3>{selected.title}</h3>
            <div className="planet-showcase-rule" />
            <p>{selected.description}</p>
            <div className="planet-showcase-tech">
              {selected.skills.map((skill, index) => (
                <span key={skill} style={{ "--skill-index": index } as CSSProperties}>{skill}</span>
              ))}
            </div>
            <div className="planet-showcase-foot"><span><i /> {selected.short}</span><span>{String(selected.skills.length).padStart(2, "0")} TECHNOLOGIES</span></div>
          </div>
          <div className="planet-showcase-art" aria-hidden="true">
            <div className="planet-aura" />
            <div className={`planet-featured world-planet-${selected.planet}`}><span className="planet-clouds" /></div>
            <div className="planet-orbit-glint" />
          </div>
          <div className="planet-showcase-index">EXPLORE THE COLLECTION <span>↘</span></div>
        </div>

        <nav className="planet-selector" aria-label="Choose a skill world">
          {groups.map((group, index) => {
            const Icon = group.icon;
            return (
              <button key={group.planet} type="button"
                className={`planet-selector-item ${active === index ? "active" : ""}`}
                onClick={() => setActive(index)} aria-pressed={active === index}
                aria-label={`Show ${group.title}`}>
                <span className={`planet-selector-sphere world-planet-${group.planet}`} />
                <span className="planet-selector-name"><Icon size={12} />{group.title}</span>
              </button>
            );
          })}
        </nav>
        <div className="skills-total-line"><span>MY TOOLKIT</span><span>09 WORLDS <i /> {String(totalSkills).padStart(2, "0")} TECHNOLOGIES</span></div>
      </div>
    </section>
  );
}
