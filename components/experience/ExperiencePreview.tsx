"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Rocket, Sparkles } from "lucide-react";
import { useRef } from "react";
import ExperienceCard from "./ExperienceCard";
import Link from "next/link";
import { EXPERIENCE_PREVIEW } from "./data";

export default function ExperiencePreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const shipX = useTransform(scrollYProgress, [0, 1], ["0vw", "72vw"]);
  const shipY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const shipRotate = useTransform(scrollYProgress, [0, 1], [-12, 18]);
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.15 },
    }),
  };

  return (
    <section ref={sectionRef} className="experience-section cosmic-experience-section">\n      <div className="experience-cosmic-bridge" aria-hidden="true">\n        <div className="experience-bridge-track" />\n        <motion.div className="experience-bridge-ship" style={{ x: shipX, y: shipY, rotate: shipRotate }}>\n          <Rocket size={22} />\n          <span className="experience-ship-trail" />\n        </motion.div>\n        <Sparkles className="experience-bridge-star experience-bridge-star-one" size={15} />\n        <Sparkles className="experience-bridge-star experience-bridge-star-two" size={20} />\n      </div>
      <div className="experience-container">

        {/* Title */}
        <motion.h2
          className="experience-title"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={0}
        >
          Experience ✨
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="experience-subtitle"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={1}
        >
          A quick look at where & what I've worked
        </motion.p>

        {/* Cards */}
        <div className="experience-grid">
          {EXPERIENCE_PREVIEW.map((exp, i) => (
            <motion.div
              key={`${exp.company}-${i}`}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              custom={i + 2}
            >
              <ExperienceCard {...exp} />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={4}
        >
          <Link href="/experience" className="intro-primary-btn inline-block">
            View full experience →
          </Link>
        </motion.div>

      </div>
    </section>
  );
}



