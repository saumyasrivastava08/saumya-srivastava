import { motion } from "framer-motion";
import Parallax from "../ui/Parallax";
import ExperienceCard from "../experience/ExperienceCard";
import Link from "next/link";

export default function EducationPreview() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.15 },
    }),
  };

  return (
    <section className="education-section">
      <div className="education-container">

        {/* Title */}
        <motion.h2
          className="education-title"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={0}
        >
          Education <span className="text-pink-300">🎓</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="education-subtitle"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={1}
        >
          Academic background and credentials
        </motion.p>

        {/* Card */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          custom={2}
        >
          <Parallax>
            <ExperienceCard
              role="B.Tech in Computer Science & Engineering (Hons.)"
              company="Lovely Professional University"
              duration="2019 – 2023"
              location={undefined}
              highlights={["CGPA 8.01 / 10"]}
              tech={[]}
            />
          </Parallax>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="education-cta"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={3}
        >
          <Link href="/education" className="intro-primary-btn inline-block">
            View full education →
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
