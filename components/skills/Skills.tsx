"use client";

import { motion } from "framer-motion";
import SkillGroup from "./SkillGroup";

export default function Skills() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.15 },
    }),
  };

  const groups = [
    {
      title: "Core / Languages",
      skills: ["JavaScript", "TypeScript", "Go", "SQL", "Java"],
    },
    {
      title: "Frontend",
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
    },
    {
      title: "Backend",
      skills: [
        "Node.js (Express)",
        "Bun (Elysia)",
        "Go (Gin)",
        "REST APIs",
        "WebSockets",
        "MQTT",
        "Microservices",
      ],
    },
    {
      title: "Databases",
      skills: [
        "PostgreSQL (Drizzle ORM)",
        "Indexing",
        "Read Replicas",
        "Query Optimization",
        "MongoDB",
        "Redis",
      ],
    },
    {
      title: "Cloud & DevOps",
      skills: [
        "AWS (EC2, S3, ECR, CloudFront, IAM, Auto Scaling)",
        "GCP (GKE)",
        "Docker",
        "Kubernetes",
        "Jenkins",
        "CloudBees CI/CD",
        "GitHub Actions",
        "Terraform",
        "HashiCorp Vault",
        "SonarQube",
      ],
    },
    {
      title: "Testing & Tools",
      skills: [
        "Jest",
        "Integration Testing",
        "OpenAPI/Swagger",
        "Git",
        "Biome",
        "Husky",
        "Linux",
        "Jira",
        "Agile/Scrum",
      ],
    },
  ];

  return (
    <section className="skills-section">
      <div className="skills-container">
        {/* Title */}
        <motion.h2
          className="skills-heading"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={0}
        >
          Technical Skills <span className="text-pink-300">🛠️</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="skills-subtitle"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={0.2}
        >
          Technologies I use to build scalable, production-ready systems
        </motion.p>

        {/* Skill Groups */}
        <div className="skills-grid">
          {groups.map((grp, i) => (
            <motion.div
              key={grp.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              custom={i + 1}
            >
              <SkillGroup title={grp.title} skills={grp.skills} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}