"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

type FormId = "planet" | "experience" | "dossier" | "sun" | "rocket";

const FORMS: { id: FormId; at: number; label: string }[] = [
  { id: "planet", at: 0, label: "Wanderer" },
  { id: "experience", at: 0.18, label: "Career stop" },
  { id: "dossier", at: 0.38, label: "Mission file" },
  { id: "sun", at: 0.58, label: "Engineering sun" },
  { id: "rocket", at: 0.78, label: "Archive burn" },
];

function formIndexFor(progress: number) {
  let index = 0;
  for (let i = 0; i < FORMS.length; i += 1) {
    if (progress >= FORMS[i].at) index = i;
  }
  return index;
}

/** Smooth 0–1 blend inside a window */
function band(progress: number, start: number, end: number) {
  if (progress <= start) return 0;
  if (progress >= end) return 1;
  return (progress - start) / (end - start);
}

export default function CosmicVoyage() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 28,
    mass: 0.4,
  });

  const [formIndex, setFormIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useMotionValueEvent(smooth, "change", (value) => {
    setFormIndex(formIndexFor(value));
    setProgress(value);
  });

  useEffect(() => {
    const value = smooth.get();
    setFormIndex(formIndexFor(value));
    setProgress(value);
  }, [smooth]);

  // Side traveler position — drifts with the story, reverses on scroll up
  const x = useTransform(
    smooth,
    [0, 0.18, 0.28, 0.38, 0.5, 0.58, 0.7, 0.78, 1],
    ["4vw", "-8vw", "-2vw", "2vw", "6vw", "18vw", "8vw", "3vw", "5vw"]
  );
  const y = useTransform(
    smooth,
    [0, 0.18, 0.38, 0.58, 0.7, 0.78, 1],
    ["18vh", "22vh", "28vh", "42vh", "48vh", "58vh", "62vh"]
  );
  const scale = useTransform(
    smooth,
    [0, 0.18, 0.38, 0.58, 0.68, 0.78, 1],
    [1, 1.05, 0.95, 1.35, 0.55, 1, 1.05]
  );
  const rotate = useTransform(smooth, [0, 0.38, 0.58, 0.78, 1], [0, -8, 12, -18, -6]);

  // Crossfades between forms
  const planetOp = useTransform(smooth, [0, 0.14, 0.24], [1, 1, 0]);
  const experienceOp = useTransform(smooth, [0.14, 0.22, 0.34, 0.44], [0, 1, 1, 0]);
  const dossierOp = useTransform(smooth, [0.34, 0.42, 0.54, 0.64], [0, 1, 1, 0]);
  const sunOp = useTransform(smooth, [0.54, 0.62, 0.74, 0.84], [0, 1, 1, 0]);
  const rocketOp = useTransform(smooth, [0.74, 0.82, 1], [0, 1, 1]);

  const label = FORMS[formIndex]?.label ?? FORMS[0].label;
  const collide = band(progress, 0.16, 0.26);

  if (reduceMotion) return null;

  return (
    <div className="cosmic-voyage" aria-hidden="true">
      <motion.div
        className={`cosmic-traveler ${collide > 0.55 ? "is-colliding" : ""}`}
        style={{ x, y, scale, rotate }}
      >
        {/* 1. Planet — intro wanderer */}
        <motion.div className="traveler-form traveler-planet" style={{ opacity: planetOp }}>
          <span className="planet-atmosphere" />
          <span className="planet-body" />
          <span className="planet-ring" />
          <span className="planet-shine" />
        </motion.div>

        {/* 2. Experience stop — timeline node / career form */}
        <motion.div className="traveler-form traveler-experience" style={{ opacity: experienceOp }}>
          <span className="exp-card">
            <i />
            <em>STOP</em>
            <b>Career</b>
          </span>
          <span className="exp-rail" />
          <span className="exp-dot d1" />
          <span className="exp-dot d2" />
          <span className="exp-dot d3" />
        </motion.div>

        {/* 3. Dossier — projects */}
        <motion.div className="traveler-form traveler-dossier" style={{ opacity: dossierOp }}>
          <span className="dossier-tab">M</span>
          <span className="dossier-body">
            <i />
            <i />
            <i />
          </span>
        </motion.div>

        {/* 4. Sun — sinks into skills core */}
        <motion.div className="traveler-form traveler-sun" style={{ opacity: sunOp }}>
          <span className="sun-corona" />
          <span className="sun-core" />
          <span className="sun-flare f1" />
          <span className="sun-flare f2" />
        </motion.div>

        {/* 5. Rocket — education burn / archive */}
        <motion.div className="traveler-form traveler-rocket" style={{ opacity: rocketOp }}>
          <span className="rocket-flame" />
          <span className="rocket-fin left" />
          <span className="rocket-fin right" />
          <span className="rocket-body" />
          <span className="rocket-nose" />
          <span className="rocket-window" />
        </motion.div>
      </motion.div>

      <div className="cosmic-traveler-caption">
        <span>{label}</span>
      </div>
    </div>
  );
}
