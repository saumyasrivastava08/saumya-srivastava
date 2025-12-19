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
      title: "Frontend",
      skills: ["React", "Next.js", "TypeScript", "JavaScript", "Redux", "HTML", "CSS"],
    },
    {
      title: "Backend",
      skills: ["GoLang", "Node.js", "REST APIs", "Microservices"],
    },
    {
      title: "DevOps & Cloud",
      skills: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform", "CI/CD"],
    },
    {
      title: "Databases & Messaging",
      skills: ["PostgreSQL", "MongoDB", "MQTT"],
    },
    {
      title: "Tools & Practices",
      skills: ["Git", "Linux", "Agile / Scrum", "System Design"],
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
          Skills <span className="text-pink-300">🛠️</span>
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