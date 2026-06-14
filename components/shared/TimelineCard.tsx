import { motion } from "framer-motion";

interface TimelineCardProps {
  heading: string;
  subheading?: string;
  meta?: string;
  highlights?: string[];
  tags?: string[];
}

export default function TimelineCard({
  heading,
  subheading,
  meta,
  highlights = [],
  tags = [],
}: TimelineCardProps) {
  return (
    <motion.div
      className="experience-card"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="experience-accent" />
      <h3 className="experience-role">{heading}</h3>

      <p className="experience-meta">
        {subheading && <span className="experience-company">{subheading}</span>}
        {subheading && meta ? " • " : ""}
        {meta}
      </p>

      {highlights.length > 0 && (
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
                dangerouslySetInnerHTML={{ __html: highlightImportant(point) }}
              />
            </motion.li>
          ))}
        </ul>
      )}

      {tags.length > 0 && (
        <div className="experience-tags">
          {tags.map((item) => (
            <span key={item} className="experience-tag">
              {item}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

function highlightImportant(text: string) {
  const keywords = /(frontend|backend|DevOps|React|Next\.js|GoLang|Node\.js|AWS|Docker|Kubernetes|Jenkins|Terraform|Vault|\d+%)/gi;
  return text.replace(keywords, `<strong class="experience-highlight">$1</strong>`);
}
