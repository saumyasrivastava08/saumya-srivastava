import type { LucideIcon } from "lucide-react";

interface SkillGroupProps {
  title: string;
  skills: string[];
  icon: LucideIcon;
}

export default function SkillGroup({ title, skills, icon: Icon }: SkillGroupProps) {
  return (
    <div className="skill-group">
      <div className="skill-group-heading">
        <span className="skill-group-icon" aria-hidden="true">
          <Icon size={19} strokeWidth={1.8} />
        </span>
        <h3 className="skill-title">{title}</h3>
        <span className="skill-group-count">{String(skills.length).padStart(2, "0")}</span>
      </div>

      <div className="skill-tags">
        {skills.map((skill) => (
          <span key={skill} className="skill-tag">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
