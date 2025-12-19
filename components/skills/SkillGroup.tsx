interface SkillGroupProps {
  title: string;
  skills: string[];
}

export default function SkillGroup({ title, skills }: SkillGroupProps) {
  return (
    <div className="skill-group">
      <h3 className="skill-title">{title}</h3>

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
