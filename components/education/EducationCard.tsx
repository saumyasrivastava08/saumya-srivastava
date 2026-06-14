"use client";

import TimelineCard from "../shared/TimelineCard";

interface EducationCardProps {
  degree: string;
  institute: string;
  duration: string;
  score?: string;
  location?: string;
}

export default function EducationCard({
  degree,
  institute,
  duration,
  score,
  location,
}: EducationCardProps) {
  const highlights = score ? [score] : [];

  return (
    <TimelineCard
      heading={degree}
      subheading={institute}
      meta={`${duration}${location ? ` • ${location}` : ""}`}
      highlights={highlights}
      tags={[]}
    />
  );
}
