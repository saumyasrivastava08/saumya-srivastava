"use client";

import { useState } from "react";
import {
  Code2, Monitor, Server, Database, Cloud, FlaskConical,
  Sparkles, ArrowUpRight, Orbit, Cpu,
} from "lucide-react";

const groups = [
  { title: "Core / Languages", short: "LANGUAGES", icon: Code2, color: "cyan", skills: ["JavaScript", "TypeScript", "Go", "SQL", "Java"] },
  { title: "Frontend", short: "INTERFACES", icon: Monitor, color: "pink", skills: ["React.js", "Next.js", "Zustand", "Redux Toolkit", "Module Federation (Rspack)", "React Hook Form", "Zod", "MUI"] },
  { title: "Backend", short: "SERVICES", icon: Server, color: "violet", skills: ["Node.js (Express)", "Bun (Elysia)", "Go (Gin)", "REST APIs", "WebSockets", "MQTT", "Microservices"] },
  { title: "Databases", short: "DATA", icon: Database, color: "blue", skills: ["PostgreSQL (Drizzle ORM)", "Indexing", "Read Replicas", "Query Optimization", "MongoDB", "Redis"] },
  { title: "Cloud & DevOps", short: "INFRASTRUCTURE", icon: Cloud, color: "gold", skills: ["AWS (EC2, S3, ECR, CloudFront, IAM, Auto Scaling)", "GCP (GKE)", "Docker", "Kubernetes", "Jenkins", "CloudBees CI/CD", "GitHub Actions", "Terraform", "HashiCorp Vault", "SonarQube"] },
  { title: "Testing & Tools", short: "QUALITY", icon: FlaskConical, color: "mint", skills: ["Jest", "Integration Testing", "OpenAPI/Swagger", "Git", "Biome", "Husky", "Linux", "Jira", "Agile/Scrum"] },
];

const featured = [
  { name: "TypeScript", group: 0, orbit: "feature-one" },
  { name: "React", group: 1, orbit: "feature-two" },
  { name: "Go", group: 0, orbit: "feature-three" },
  { name: "PostgreSQL", group: 3, orbit: "feature-four" },
  { name: "AWS", group: 4, orbit: "feature-five" },
  { name: "Kubernetes", group: 4, orbit: "feature-six" },
  { name: "Next.js", group: 1, orbit: "feature-seven" },
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
      <div className="skills-container">
        <div className="skills-intro">
          <div className="skills-eyebrow"><Sparkles size={13} /> THE ENGINEERING UNIVERSE</div>
          <h2 className="skills-heading">A universe of <span>things I build with.</span></h2>
          <p className="skills-subtitle">A connected toolkit across interfaces, services, data and infrastructure — select a constellation to explore.</p>
        </div>

        <div className="skills-universe">
          <div className="skills-orbit-stage" aria-label="Featured technology constellation">
            <div className="skills-stage-grid" />
            <div className="skills-orbit orbit-large" />
            <div className="skills-orbit orbit-medium" />
            <div className="skills-orbit orbit-small" />
            <div className="skills-core">
              <div className="skills-core-halo" />
              <div className="skills-core-icon"><Cpu size={27} strokeWidth={1.5} /></div>
              <strong>ENGINEERING</strong>
              <span>CORE SYSTEM</span>
            </div>
            {featured.map((item) => (
              <button
                key={item.name}
                type="button"
                className={`skills-feature ${item.orbit} ${active === item.group ? "is-related" : ""}`}
                onClick={() => setActive(item.group)}
                aria-label={`Explore ${item.name} in ${groups[item.group].title}`}
              >
                <span className="skills-feature-dot" />{item.name}
              </button>
            ))}
            <div className="skills-stage-caption"><Orbit size={13} /> SELECT A TECHNOLOGY TO TRACE ITS CLUSTER</div>
          </div>

          <div className={`skills-detail-panel tone-${selected.color}`}>
            <div className="skills-detail-topline">
              <span>CAPABILITY CLUSTER / 0{active + 1}</span>
              <span>{String(selected.skills.length).padStart(2, "0")} TOOLS</span>
            </div>
            <div className="skills-detail-heading">
              <span className="skills-detail-icon"><SelectedIcon size={22} strokeWidth={1.7} /></span>
              <div><span className="skills-detail-kicker">{selected.short}</span><h3>{selected.title}</h3></div>
            </div>
            <p className="skills-detail-description">
              {active === 0 && "The languages and fundamentals I use to reason about problems and shape reliable software."}
              {active === 1 && "Building responsive, composable experiences and modern frontend platforms."}
              {active === 2 && "Designing APIs, real-time communication and modular services that scale."}
              {active === 3 && "Working with relational and document data, from schema design to query performance."}
              {active === 4 && "Shipping and operating software across cloud infrastructure and automated delivery."}
              {active === 5 && "Keeping code dependable with tests, developer tooling and collaborative workflows."}
            </p>
            <div className="skills-detail-tags">
              {selected.skills.map((skill, index) => (
                <span key={skill} style={{ "--skill-index": index } as React.CSSProperties}>{skill}</span>
              ))}
            </div>
            <div className="skills-detail-footer"><span><span className="skills-live-dot" /> CLUSTER IN VIEW</span><span>{String(active + 1).padStart(2, "0")} / 06</span></div>
          </div>
        </div>

        <div className="skills-cluster-nav" aria-label="Choose a skill category">
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
        <div className="skills-total-line"><span>MY TOOLKIT</span><span>{String(groups.length).padStart(2, "0")} DOMAINS <i /> {String(totalSkills).padStart(2, "0")} SKILLS</span></div>
      </div>
    </section>
  );
}
