import TimelineCard from "../shared/TimelineCard";

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
    <TimelineCard
      heading={role}
      subheading={company}
      meta={`${duration}${location ? ` • ${location}` : ""}`}
      highlights={highlights}
      tags={tech}
    />
  );
}
