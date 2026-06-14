"use client";

import { GraduationCap } from "lucide-react";
import ExperienceCard from "./ExperienceCard";
import { EXPERIENCE_PREVIEW, EXPERIENCE_PREVIEW_EXT } from "./data";
import Timeline from "../shared/Timeline";

export default function ExperienceTimeline() {
  const entries = [
    // full-time
    ...EXPERIENCE_PREVIEW.map((exp, i) => ({
      key: `ft-${i}`,
      duration: exp.duration,
      content: <ExperienceCard {...exp} />,
    })),

    // internship divider
    {
      key: "intern-divider",
      duration: (
        <div className="timeline-year flex items-center gap-2 text-pink-300 font-medium">
          <GraduationCap size={16} />
          Internship
        </div>
      ),
      content: <div />,
    },

    // internships
    ...EXPERIENCE_PREVIEW_EXT.map((exp, i) => ({
      key: `intern-${i}`,
      duration: exp.duration,
      content: <ExperienceCard {...exp} />,
    })),
  ];

  return <Timeline entries={entries} />;
}
