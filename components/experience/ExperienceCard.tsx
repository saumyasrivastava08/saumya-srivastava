import TimelineCard from "../shared/TimelineCard";

interface ExperienceCardProps {
  role: string;
  company: string;
  duration: string;
  location?: string;
  highlights: string[];
  tech: string[];
  compact?: boolean;
}

export default function ExperienceCard({
  role,
  company,
  duration,
  location,
  highlights,
  tech,
  compact = false,
}: ExperienceCardProps) {
  return (
    <TimelineCard
      heading={role}
      subheading={company}
      meta={`${duration}${location ? ` • ${location}` : ""}`}
      highlights={compact ? highlights.slice(0, 3) : highlights}
      tags={compact ? tech.slice(0, 8) : tech}
    />
  );
}
