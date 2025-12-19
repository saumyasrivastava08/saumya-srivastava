import Reveal from "../animations/Reveal";
import {  fadeUp , fadeIn } from "../animations/variants";
import Parallax from "../ui/Parallax";
import EducationCard from "./EducationCard";
import Link from "next/link";

export default function EducationPreview() {
  return (
    <section className="education-section">
      <div className="education-container">

        <Reveal variant={fadeUp}>
          <Parallax>
          <h2 className="education-title">
            Education <span className="text-pink-300">🎓</span>
          </h2>
          </Parallax>
        </Reveal>

        <Reveal variant={fadeUp} delay={0.2}>
          <Parallax >
          <EducationCard
            degree="B.Tech in Computer Science & Engineering (Hons.)"
            institute="Lovely Professional University"
            duration="2019 – 2023"
            score="CGPA 8.01 / 10"
          />
          </Parallax>
        </Reveal>
        
          <Reveal variant={fadeIn} delay={0.4}>
            <Parallax>
            <Link
              href="/education"
              className="text-sky-400 hover:text-pink-300 transition mt-8 block"
            >
              View full education →
            </Link>
                </Parallax>
          </Reveal>
    

      </div>
    </section>
  );
}
