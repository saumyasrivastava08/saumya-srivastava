"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { EDUCATION } from "./data";
import EducationShip, { BUILD_MS } from "./EducationShip";
import { useWandererOptional } from "@/components/voyage/WandererContext";

const ease = [0.22, 0.8, 0.24, 1] as const;

export default function EducationPreview() {
  const wanderer = useWandererOptional();
  // the rocket always lies on its side on the homepage; small screens scale it down to fit
  // The big ship scatters in and assembles itself around the engine once the sun has become it.
  const built = wanderer ? wanderer.eduBuilt : true;
  // The windows (content already inside) and the Explore fin are parts of the ship: they assemble with it,
  // so nothing waits for the assembly to finish.
  const open = () => built;
  // a bay never opens before the ship has finished assembling
  const [assembled, setAssembled] = useState(false);
  useEffect(() => {
    if (!built) return;
    const timer = window.setTimeout(() => setAssembled(true), BUILD_MS);
    return () => {
      window.clearTimeout(timer);
      setAssembled(false);
    };
  }, [built]);
  const ready = !wanderer || assembled;
  // The engine appears and ignites once the sun has locked into the back of the ship.
  const docked = wanderer ? wanderer.eduDocked : true;
  // the engine lights once the ship is assembled around it
  const lit = docked && ready;

  return (
    <section className="education-section cosmic-education-section" id="education">
      <div className="education-starfield" aria-hidden="true" />
      <div className="education-nebula education-nebula-a" aria-hidden="true" />
      <div className="education-nebula education-nebula-b" aria-hidden="true" />
      <div className="education-aurora" aria-hidden="true" />
      <div id="education-wanderer-slot" className="wanderer-slot" aria-hidden="true" />

      <div className="education-container">
        <motion.div
          className="education-heading-row"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease }}
        >
          <div>
            <p className="education-kicker">
              <Sparkles size={13} aria-hidden="true" /> STELLAR ARCHIVE
            </p>
            <h2 className="education-title">Where the journey began</h2>
            <p className="education-subtitle">
              The academic milestones that shaped how I think and build.
            </p>
          </div>
        </motion.div>

        <EducationShip
          built={built}
          docked={docked}
          lit={lit}
          open={EDUCATION.map(() => open())}
          vertical={false}
        />

        {/* phones: the fin on the scaled-down rocket is too small to read or tap, so "Explore" is a real button below it */}
        <Link
          href="/education"
          className={`edu-explore-pill ${open() ? "is-on" : ""}`}
          tabIndex={open() ? 0 : -1}
          aria-label="View full education"
        >
          View full education <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

