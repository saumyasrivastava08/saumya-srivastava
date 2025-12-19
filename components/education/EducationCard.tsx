"use client";

import { motion } from "framer-motion";

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
  return (
    <motion.div
      className="education-card edu-animate"
      whileHover={{ scale: 1.02 }}   // ✅ hover only
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <div className="edu-shimmer" />

      
      <h3 className="education-institute">{institute}</h3>
      <p className="education-location">{location}</p>
      <p className="education-meta">
      {score && `· ${score}`}
      </p>
    </motion.div>
  );
}
