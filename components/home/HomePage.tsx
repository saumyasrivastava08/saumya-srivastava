"use client";

import { useCallback, useState } from "react";
import Intro from "@/components/intro/Intro";
import SaumyaverseSplash, { hasSplashPlayed } from "@/components/intro/SaumyaverseSplash";
import ExperiencePreview from "@/components/experience/ExperiencePreview";
import Projects from "@/components/projects/ProjectsPreview";
import Skills from "@/components/skills/Skills";
import EducationPreview from "@/components/education/EducationPreview";
import { WandererProvider } from "@/components/voyage/WandererContext";
import { SplashProvider } from "@/components/voyage/SplashContext";
import ScrollWanderer from "@/components/voyage/ScrollWanderer";

export default function HomePage() {
  // "Welcoming you to Saumyaverse" plays once per page load; the page itself waits for it.
  const [showSplash] = useState(() => !hasSplashPlayed());
  const [splashDone, setSplashDone] = useState(() => hasSplashPlayed());
  const handleDone = useCallback(() => setSplashDone(true), []);

  return (
    <SplashProvider done={splashDone}>
      <WandererProvider>
        <div className="home-scroll-story">
          <ScrollWanderer />
          <Intro />
          <ExperiencePreview />
          <Projects />
          <Skills />
          <EducationPreview />
        </div>
      </WandererProvider>
      {showSplash ? <SaumyaverseSplash onDone={handleDone} /> : null}
    </SplashProvider>
  );
}
