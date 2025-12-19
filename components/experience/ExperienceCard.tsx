import { motion } from "framer-motion";

interface ExperienceCardProps {
  role: string;
  company: string;
  duration: string;
  location?: string;
  highlights: string[];
  tech: string[];
}

export default function ExperienceCard({
  role,
  company,
  duration,
  location,
  highlights,
  tech,
}: ExperienceCardProps) {
  return (
    <motion.div
      className="experience-card"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="experience-accent" />
      <h3 className="experience-role">{role}</h3>

      <p className="experience-meta">
        <span className="experience-company">{company}</span>
        {" • "}
        {duration}
        {location && ` • ${location}`}
      </p>

      {/* Animated bullet list */}
      <ul className="experience-desc">
        {highlights.map((point, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <span
              className="experience-bullet-text"
              dangerouslySetInnerHTML={{
                __html: highlightImportant(point),
              }}
            />
          </motion.li>
        ))}
      </ul>

      {/* Tech tags */}
      <div className="experience-tags">
        {tech.map((item) => (
          <span key={item} className="experience-tag">
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* 🔥 Helper to bold & color important keywords */
function highlightImportant(text: string) {
  const keywords =
    /(frontend|backend|DevOps|React|Next\.js|GoLang|Node\.js|AWS|Docker|Kubernetes|Jenkins|Terraform|Vault|\d+%)/gi;

  return text.replace(
    keywords,
    `<strong class="experience-highlight">$1</strong>`
  );
}
