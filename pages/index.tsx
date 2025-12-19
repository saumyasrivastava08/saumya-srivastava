import Intro from "../components/intro/Intro";
import ExperiencePreview from "../components/experience/ExperiencePreview";
import Projects from "@/components/projects/ProjectsPreview";
import Skills from "@/components/skills/Skills";
import EducationPreview from "@/components/education/EducationPreview";

export default function Home() {
  return (
    <>
      <Intro />
      <ExperiencePreview />
      <Projects />
      <Skills />
      <EducationPreview />
    </>
  );
}
