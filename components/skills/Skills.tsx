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
          <p className="skills-subtitle">Nine skill planets orbit the engineering core. Select a world to explore its technologies.</p>
        </div>

        <div className="skills-orbit-layout">
          <div className="skills-orbit-universe" aria-label="Three-dimensional orbit of nine engineering skill planets">
            <div className="orbit-nebula-glow" />
            <div className="orbit-starfield" />
            <div className="orbit-sun">
              <span className="orbit-sun-corona" />
              <Sun size={27} strokeWidth={1.2} />
              <strong>DEV</strong><small>CORE</small>
            </div>
            {groups.map((group, index) => {
              const Icon = group.icon;
              return (
                <div
                  key={group.planet}
                  className={`skill-orbit-path skill-orbit-path-${index + 1}`}
                  style={{ "--orbit-index": index } as CSSProperties}
                >
                  <span className="skill-orbit-track" />
                  <button
                    type="button"
                    className={`skill-orbiting-world tone-${group.color} ${active === index ? "active" : ""}`}
                    onClick={() => setActive(index)}
                    aria-label={`Explore ${group.title}`}
                    aria-pressed={active === index}
                  >
                    <span className={`orbit-planet-texture world-planet-${group.planet}`}><span /></span>
                    <span className="orbit-world-label"><Icon size={13} /><strong>{group.title}</strong></span>
                  </button>
                </div>
              );
            })}
            <div className="orbit-scene-caption"><span /> 9 WORLDS · ONE ENGINEERING UNIVERSE</div>
          </div>

          <aside className={`skills-orbit-detail tone-${selected.color}`} aria-live="polite">
            <div className="orbit-detail-topline"><span>PLANET {String(active + 1).padStart(2, "0")} / 09</span><span>{selected.short}</span></div>
            <div className="orbit-detail-heading">
              <span className="orbit-detail-planet"><span className={`orbit-planet-texture world-planet-${selected.planet}`} /></span>
              <div><span>SKILL WORLD</span><h3>{selected.title}</h3></div>
            </div>
            <p>{selected.description}</p>
            <div className="orbit-detail-skills">
              {selected.skills.map((skill, index) => (
                <span key={skill} style={{ "--skill-index": index } as CSSProperties}>{skill}</span>
              ))}
            </div>
            <div className="orbit-detail-footer"><span><i /> WORLD IN FOCUS</span><span>{String(selected.skills.length).padStart(2, "0")} SKILLS</span></div>
          </aside>
        </div>
        <div className="skills-total-line"><span>MY TOOLKIT</span><span>09 PLANETS <i /> {String(totalSkills).padStart(2, "0")} SKILLS</span></div>
      </div>
    </section>
  );
}
