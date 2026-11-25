"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import { useRouter } from "next/router";
import { ArrowUpRight, GraduationCap } from "lucide-react";
import { EDUCATION, type EducationStop } from "./data";

const ease = [0.22, 0.8, 0.24, 1] as const;
const SHOWN = { opacity: 1 };

/** The big ship needs about this long to assemble itself once it starts building (ms). */
export const BUILD_MS = 1900;

/** Where a loose part of the ship starts (rem from its place, degrees of spin) and when it flies in. */
function part(sx: number, sy: number, sr: number, delay: number): CSSProperties {
  return {
    "--sx": `${sx}rem`,
    "--sy": `${sy}rem`,
    "--sr": `${sr}deg`,
    "--bd": `${delay}s`,
  } as CSSProperties;
}

const LIGHTS = [
  { x: "16%", sx: -10, sy: -16, sr: 200 },
  { x: "26%", sx: 8, sy: -22, sr: -160 },
  { x: "36%", sx: -4, sy: 18, sr: 120 },
  { x: "46%", sx: 14, sy: -10, sr: -240 },
  { x: "56%", sx: -16, sy: 12, sr: 180 },
  { x: "66%", sx: 6, sy: 20, sr: -90 },
  { x: "76%", sx: 22, sy: -14, sr: 260 },
];

/** The rocket lies on its side on wide screens (homepage) and stands upright (nose up) on phones and tablets. */
export function useUprightShip(query = "(max-width: 1060px)") {
  return useSyncExternalStore(
    (notify) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", notify);
      return () => media.removeEventListener("change", notify);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

type SequenceState = {
  built: boolean;
  arriving: boolean;
  docked: boolean;
  lit: boolean;
  open: boolean[];
};

const START: SequenceState = {
  built: false,
  arriving: false,
  docked: false,
  lit: false,
  open: EDUCATION.map(() => false),
};

const DONE: SequenceState = {
  built: true,
  arriving: true,
  docked: true,
  lit: true,
  open: EDUCATION.map(() => true),
};

/**
 * The whole story on its own (for pages without the travelling sun): when it scrolls into view the
 * engine part flies in and attaches, the rest of the ship scatters in around it, the engine
 * ignites, and the bays open one by one.
 */
export function useShipSequence(ref: React.RefObject<Element | null>) {
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true });
  const [state, setState] = useState<SequenceState>(START);

  useEffect(() => {
    if (!inView || reduce) return;
    const timers: number[] = [];
    const at = (ms: number, patch: (s: SequenceState) => SequenceState) =>
      timers.push(window.setTimeout(() => setState(patch), ms));

    at(150, (s) => ({ ...s, arriving: true }));
    // the engine part reaches the back of the ship and attaches; the rest builds around it
    at(1450, (s) => ({ ...s, docked: true, built: true }));
    // once assembled the engine ignites
    at(1450 + BUILD_MS, (s) => ({ ...s, lit: true }));
    // and the bays open one by one, each in a puff of smoke
    EDUCATION.forEach((_, index) =>
      at(1450 + BUILD_MS + 700 + index * 850, (s) => ({
        ...s,
        open: s.open.map((_open, k) => k <= index),
      }))
    );
    return () => timers.forEach(window.clearTimeout);
  }, [inView, reduce]);

  return reduce ? DONE : state;
}

type ShipProps = {
  built: boolean;
  docked: boolean;
  lit: boolean;
  open: boolean[];
  /** nose up (phones / the Education page) instead of lying down */
  vertical: boolean;
  /** the standalone page: the engine part flies in by itself, smoke bursts are drawn locally */
  standalone?: boolean;
  arriving?: boolean;
  /** give each bay an id so it can be linked to (for example /education#btech) */
  withIds?: boolean;
};

function SmokeBurst({ className = "" }: { className?: string }) {
  return (
    <span className={`wp-smoke-burst ${className}`} aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

/** Round porthole in the hull: one milestone lights up when its bay opens. */
function Porthole({
  stop,
  isOpen,
  withIds,
  standalone,
  size = "lg",
}: {
  stop: EducationStop;
  isOpen: boolean;
  withIds: boolean;
  standalone: boolean;
  /** like the sample: one big window, one small window next to it */
  size?: "lg" | "sm";
}) {
  // a school milestone says its board in the tag ("CBSE · 2018") and its level as the title, so the level isn't said twice
  const boardMatch = stop.degree.match(/\(([^)]+)\)/);
  const board = size === "sm" ? (boardMatch?.[1] ?? null) : null;
  const title = size === "sm" ? stop.degree.replace(/\s*\([^)]*\)/, "") : stop.degree;
  return (
    <article
      id={withIds ? stop.id : undefined}
      className={`edu-part edu-win edu-win-${size} tone-${stop.tone} ${isOpen ? "is-open" : ""}`}
      style={size === "lg" ? part(-7, 4, -150, 0.7) : part(5, -5, 170, 0.85)}
    >
      <div className="education-star-node" aria-hidden="true">
        <span className="education-star-core" />
        <span className="education-star-glow" />
      </div>
      {standalone && isOpen ? <SmokeBurst className="edu-burst" /> : null}
      <span className="edu-win-glass" aria-hidden="true" />
      {/* the content is already in the window: it travels with the window as the ship assembles */}
      <div className="edu-win-copy">
        <span className="edu-win-tag">
          {board ?? stop.label} · {stop.duration}
        </span>
        <h3>{title}</h3>
        <p className="edu-win-school">
          <GraduationCap size={11} aria-hidden="true" />
          {stop.institute}
        </p>
        <span className="edu-win-score">{stop.score}</span>
      </div>
    </article>
  );
}

export default function EducationShip({
  built,
  docked,
  lit,
  open,
  vertical,
  standalone = false,
  arriving = false,
  withIds = false,
}: ShipProps) {
  const router = useRouter();
  const sceneRef = useRef<HTMLDivElement>(null);
  const fitRef = useRef<HTMLDivElement>(null);

  // The rocket lies on its side at every size. On small screens it is scaled down as a whole to fit the width
  // (--edu-fit), so nothing is rearranged and nothing scrolls sideways.
  useEffect(() => {
    if (vertical) return;
    const scene = sceneRef.current;
    const inner = fitRef.current;
    if (!scene || !inner) return;
    const apply = () => {
      const natural = inner.offsetWidth;
      const avail = scene.clientWidth;
      const fit = natural > 0 ? Math.min(1, avail / natural) : 1;
      inner.style.transform = fit < 1 ? `scale(${fit})` : "";
      scene.style.height = fit < 1 ? `${inner.offsetHeight * fit}px` : "";
      const next = String(Math.round(fit * 1000) / 1000);
      if (scene.style.getPropertyValue("--edu-fit") !== next) {
        scene.style.setProperty("--edu-fit", next);
        // the voyage re-measures the head of the rocket when the layout changes
        window.dispatchEvent(new Event("resize"));
      }
    };
    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(scene);
    observer.observe(inner);
    return () => observer.disconnect();
  }, [vertical]);

  return (
    <div
      ref={sceneRef}
      className={`education-ship-scene ${vertical ? "is-vertical" : ""}`}
      aria-label="Education milestones"
    >
      <div ref={fitRef} className="edu-fit">
      <div
        className={`edu-ship ${vertical ? "is-vertical" : ""} ${built ? "is-built" : "is-hidden"} ${
          docked ? "is-docked" : ""
        } ${lit ? "is-lit" : ""}`}
      >
        {/* the two side fins */}
        <span className="edu-part edu-fin edu-fin-top" style={part(-14, -22, -120, 0.55)} aria-hidden="true" />
        <span className="edu-part edu-fin edu-fin-bottom" style={part(12, 24, 140, 0.55)} aria-hidden="true" />

        <div className="edu-engine" aria-hidden="true">
          <span className="edu-flame-glow" />
          <span className="edu-flame" />
          <span className="edu-flame edu-flame-mid" />
          <span className="edu-flame edu-flame-in" />
          <span className="edu-nozzle" />
          <span className="edu-wisps">
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <i key={n} style={{ "--i": n } as CSSProperties} />
            ))}
          </span>
        </div>

        {/* the third (centre) fin points out of the tail along the rocket's axis: its root is tucked behind
            the hull (it is drawn before it) and its outer part sticks out past the tail — “view more
            education” */}
        <span className="edu-part edu-fin-wrap" style={part(-12, 22, -110, 0.55)}>
          <motion.button
            type="button"
            className={`edu-fin-center ${open[1] ? "is-open" : ""}`}
            initial={false}
            animate={open[1] ? SHOWN : { opacity: 0.35 }}
            transition={{ duration: 0.45, ease }}
            disabled={!open[1]}
            tabIndex={open[1] ? 0 : -1}
            aria-label="Explore: open the education page"
            onClick={() => {
              void router.push("/education");
            }}
          >
            <span className="education-star-node" aria-hidden="true">
              <span className="education-star-core" />
              <span className="education-star-glow" />
            </span>
            <span className="edu-fin-center-label">
              Explore
              <ArrowUpRight size={13} aria-hidden="true" />
            </span>
          </motion.button>
          {standalone && open[1] ? <SmokeBurst className="edu-burst" /> : null}
        </span>

        <div className="edu-part edu-hull" style={part(-22, 15, -12, 0.3)}>
          <div className="edu-hull-skin">
            <span className="edu-skirt" aria-hidden="true" />
            {/* two portholes side by side near the nose (sample: one large, one small) */}
            <div className="edu-bays">
              <Porthole
                stop={EDUCATION[0]}
                isOpen={Boolean(open[0])}
                withIds={withIds}
                standalone={standalone}
                size="lg"
              />
              <Porthole
                stop={EDUCATION[1]}
                isOpen={Boolean(open[1] || open[2])}
                withIds={withIds}
                standalone={standalone}
                size="sm"
              />
            </div>
          </div>
        </div>

        <span className="edu-part edu-antenna" style={part(24, -10, 40, 1.1)} aria-hidden="true" />
        <span className="edu-part edu-nose-cone" style={part(32, -12, 50, 0.8)} aria-hidden="true" />
        <span className="edu-part edu-band" style={part(-6, -20, 90, 1)} aria-hidden="true" />
        {LIGHTS.map((light, i) => (
          <span
            key={i}
            className="edu-part edu-light"
            style={
              { ...part(light.sx, light.sy, light.sr, 1.05 + i * 0.07), "--lx": light.x } as CSSProperties
            }
            aria-hidden="true"
          />
        ))}

        {/* where the sun docks: the head of the ship, which becomes its nose cone */}
        <span className="education-ship-head" aria-hidden="true">
          {standalone ? (
            <>
              <span className={`edu-flyin ${arriving ? "is-arriving" : ""} ${docked ? "is-attached" : ""}`}>
                <span className="wp-nose-part">
                  <span className="wp-nose-glow" />
                  <span className="wp-nose-cone" />
                </span>
              </span>
              {docked ? <SmokeBurst /> : null}
            </>
          ) : null}
        </span>
        <span className="education-ship-nose" aria-hidden="true" />
      </div>
      </div>
    </div>
  );
}

/** Convenience wrapper for the standalone page: plays the whole sequence when scrolled into view. */
export function StandaloneEducationShip() {
  // The sequence starts when the middle of the (tall) ship scrolls into view.
  const ref = useRef<HTMLSpanElement>(null);
  const vertical = true;
  const seq = useShipSequence(ref);
  return (
    <div style={{ position: "relative" }}>
      <span
        ref={ref}
        aria-hidden="true"
        style={{ position: "absolute", top: "50%", left: 0, width: 1, height: 1, pointerEvents: "none" }}
      />
      <EducationShip
        built={seq.built}
        docked={seq.docked}
        lit={seq.lit}
        open={seq.open}
        vertical={vertical}
        standalone
        arriving={seq.arriving}
        withIds
      />
    </div>
  );
}

