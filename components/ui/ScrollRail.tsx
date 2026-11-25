"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";

const STOPS = [
  { id: "intro", label: "Launchpad" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
] as const;

type Stop = { id: string; label: string; at: number };

const STAR_PATH = "M0 -7 L2 -2.4 L6.7 -2.1 L3.1 1 L4.2 5.7 L0 3.2 L-4.2 5.7 L-3.1 1 L-6.7 -2.1 L-2 -2.4 Z";

/** A faint thread between two stars that lights up as you travel along it. */
function Thread({ from, to, progress }: { from: number; to: number; progress: MotionValue<number> }) {
  const fill = useTransform(progress, (v) => Math.min(1, Math.max(0, (v - from) / (to - from || 1))));
  return (
    <span className="scroll-rail-thread" style={{ top: `${from * 100}%`, height: `${(to - from) * 100}%` }}>
      <motion.i style={{ scaleY: fill }} />
    </span>
  );
}

/** A tiny constellation on the right edge: each section is a star that lights up as you reach it. */
export default function ScrollRail() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });
  const cometTop = useTransform(progress, (v) => `${v * 100}%`);
  const [stops, setStops] = useState<Stop[]>([]);
  const [active, setActive] = useState<string | null>(null);

  const measure = useCallback(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (max <= 0) {
      setStops([]);
      return;
    }
    const found: Stop[] = [];
    STOPS.forEach((stop) => {
      const el = document.getElementById(stop.id);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      found.push({ ...stop, at: Math.min(1, Math.max(0, top / max)) });
    });
    setStops(found);
  }, []);

  useEffect(() => {
    measure();
    const timers = [300, 1000, 2200].map((ms) => window.setTimeout(measure, ms));
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    return () => {
      timers.forEach(window.clearTimeout);
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
      observer.disconnect();
    };
  }, [measure]);

  useEffect(() => {
    if (!stops.length) return;
    const update = () => {
      const probe = window.scrollY + window.innerHeight * 0.4;
      let current: string | null = stops[0].id;
      stops.forEach((stop) => {
        const el = document.getElementById(stop.id);
        if (el && el.getBoundingClientRect().top + window.scrollY <= probe) current = stop.id;
      });
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [stops]);

  if (!stops.length) return null;

  const activeIndex = stops.findIndex((stop) => stop.id === active);

  return (
    <nav className="scroll-rail" aria-label="Page sections">
      {stops.slice(0, -1).map((stop, index) => (
        <Thread key={`${stop.id}-thread`} from={stop.at} to={stops[index + 1].at} progress={progress} />
      ))}

      {stops.map((stop, index) => (
        <button
          key={stop.id}
          type="button"
          className={`scroll-rail-star ${index <= activeIndex ? "is-lit" : ""} ${
            active === stop.id ? "is-active" : ""
          }`}
          style={{ top: `${stop.at * 100}%` }}
          onClick={() =>
            document.getElementById(stop.id)?.scrollIntoView({ behavior: "smooth", block: "start" })
          }
          aria-label={`Go to ${stop.label}`}
        >
          <span className="scroll-rail-label">{stop.label}</span>
          <svg viewBox="-9 -9 18 18" className="scroll-rail-star-svg" aria-hidden="true">
            <path d={STAR_PATH} />
          </svg>
        </button>
      ))}

      <motion.span className="scroll-rail-comet" style={{ top: cometTop }} aria-hidden="true">
        <i />
      </motion.span>
    </nav>
  );
}
