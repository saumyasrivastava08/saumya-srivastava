"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { useRef, useState } from "react";
import EducationCard from "./EducationCard";

const EDUCATION = [
  {
    duration: "2019 – 2023",
    location: "Phagwara, Punjab, India",
    degree: "B.Tech in Computer Science & Engineering (Hons.)",
    institute: "Lovely Professional University",
    score: "CGPA: 8.01 / 10",
  },
  {
    duration: "2018",
    degree: "Senior Secondary (CBSE)",
    institute: "Lucknow Public School",
    location: "Raebareli, Uttar Pradesh, India",
    score: "Percentage: 87.5%",
  },
  {
    duration: "2016",
    degree: "Secondary (CBSE)",
    institute: "Lucknow Public School",
    location: "Raebareli, Uttar Pradesh, India",
    score: "CGPA: 10 / 10",
  },
];

export default function EducationTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);


  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const total = EDUCATION.length;
    const segment = 1 / total;

    const adjusted = Math.min(
      0.999,
      Math.max(0, v + segment / 2)
    );

    const index = Math.floor(adjusted / segment);
    setActiveIndex(index);
  });

  return (
    <section className="education-section">
      <div className="education-container" ref={containerRef}>
        {/* Title */}
        <motion.h2
          className="education-title"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Education Timeline <span className="text-pink-300">🎓</span>
        </motion.h2>

        <div className="timeline">
          {/* Vertical line */}
          <motion.div
            className="timeline-line"
            style={{ scaleY: lineScale }}
          />

          {EDUCATION.map((edu, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={index}
                className={`timeline-item ${
                  index === EDUCATION.length - 1
                    ? "timeline-item-last"
                    : ""
                }`}
              >
                {/* Dot */}
                <motion.div
                  className={`timeline-dot ${isActive ? "active" : ""}`}
                  animate={{ scale: isActive ? 1.5 : 1 }}
                  transition={{ duration: 0.3 }}
                />

               {/* Degree (instead of year) */}
              <motion.p
                className="timeline-degree"
                animate={{ opacity: isActive ? 1 : 0.4 }}
              >
                {edu.degree}
              </motion.p>

              {/* Optional duration below */}
              <motion.p
                className="timeline-duration"
                animate={{ opacity: isActive ? 1 : 0.4 }}
              >
                {edu.duration}
              </motion.p>


                {/* Card */}
                <motion.div
                  animate={{
                    opacity: isActive ? 1 : 0.35,
                    y: isActive ? 0 : 18,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <EducationCard
                    degree={edu.degree}
                    institute={edu.institute}
                    duration={edu.duration}
                    score={edu.score}
                    location={edu.location}
                  />
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
