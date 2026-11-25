"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { GraduationCap, MapPin, X } from "lucide-react";
import { EDUCATION } from "./data";
import UniverseRocket from "./UniverseRocket";

const ease = [0.22, 0.8, 0.24, 1] as const;

type Tone = "cyan" | "violet" | "lavender" | "indigo" | "rose" | "mint";

type Planet = {
  id: string;
  kind: "education";
  tone: Tone;
  /** short label under the planet */
  name: string;
  meta: string;
  /** printed on the planet itself */
  orb?: string;
  /** detail panel */
  kicker: string;
  title: string;
  place?: string;
  location?: string;
  score: string;
  blurb: string;
  /** desktop [x, y] (% of the stage) and size (cqw) */
  d: [number, number];
  s: number;
  /** tablet [x, y] and size */
  t: [number, number];
  ts: number;
  /** phone: [x, y] and size */
  m: [number, number];
  ms: number;
  depth: "fg" | "mid" | "bg";
  saturn?: boolean;
  float: number;
  delay: number;
};

const EDU = Object.fromEntries(EDUCATION.map((e) => [e.id, e]));

/** The planetary system. Chronology climbs the rocket: Secondary → Senior Secondary → B.Tech. */
const PLANETS: Planet[] = [
  {
    id: "btech",
    kind: "education",
    tone: "cyan",
    name: "B.Tech",
    meta: "Computer Science",
    kicker: `${EDU.btech.label} · ${EDU.btech.duration}`,
    title: EDU.btech.degree,
    place: EDU.btech.institute,
    location: EDU.btech.location,
    score: EDU.btech.score,
    blurb: EDU.btech.blurb,
    d: [17, 28],
    s: 22,
    t: [18, 20],
    ts: 25,
    m: [20, 23],
    ms: 34,
    depth: "fg",
    float: 8,
    delay: 0.1,
  },
  {
    id: "senior-secondary",
    kind: "education",
    tone: "violet",
    name: "Senior Secondary",
    meta: "",
    kicker: `${EDU["senior-secondary"].label} · ${EDU["senior-secondary"].duration}`,
    title: EDU["senior-secondary"].degree,
    place: EDU["senior-secondary"].institute,
    location: EDU["senior-secondary"].location,
    score: EDU["senior-secondary"].score,
    blurb: EDU["senior-secondary"].blurb,
    d: [84, 48],
    s: 14.5,
    t: [86, 44],
    ts: 17,
    m: [84, 41],
    ms: 23,
    depth: "fg",
    saturn: true,
    float: 9,
    delay: 0.25,
  },
  {
    id: "secondary",
    kind: "education",
    tone: "lavender",
    name: "Secondary",
    meta: "",
    kicker: `${EDU.secondary.label} · ${EDU.secondary.duration}`,
    title: EDU.secondary.degree,
    place: EDU.secondary.institute,
    location: EDU.secondary.location,
    score: EDU.secondary.score,
    blurb: EDU.secondary.blurb,
    d: [19, 76],
    s: 9.5,
    t: [16, 66],
    ts: 13,
    m: [16, 76],
    ms: 20,
    depth: "mid",
    float: 7,
    delay: 0.4,
  },
];

/** thin constellation paths between planets */
const LINKS: Array<[string, string]> = [
  ["secondary", "senior-secondary"],
  ["senior-secondary", "btech"],
];

function linkPath(a: [number, number], b: [number, number]) {
  const mx = (a[0] + b[0]) / 2;
  const my = (a[1] + b[1]) / 2;
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy) || 1;
  const bend = 5;
  return `M${a[0]} ${a[1]} Q${mx - (dy / len) * bend} ${my + (dx / len) * bend} ${b[0]} ${b[1]}`;
}

function Constellation({ layout }: { layout: "d" | "t" | "m" }) {
  const byId = useMemo(() => Object.fromEntries(PLANETS.map((p) => [p.id, p])), []);
  return (
    <svg
      className={`uni-lines uni-lines-${layout}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`uni-line-${layout}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7dd3fc" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c6a5ff" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      {LINKS.map(([from, to]) => (
        <path
          key={`${from}-${to}`}
          d={linkPath(byId[from][layout], byId[to][layout])}
          fill="none"
          stroke={`url(#uni-line-${layout})`}
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="1 7"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

function Orb({ planet, children }: { planet: Planet; children?: React.ReactNode }) {
  return (
    <span className="uni-orb">
      <span className="uni-orb-tex" />
      <span className="uni-orb-shine" />
      <span className="uni-orb-bounce" />
      {planet.orb ? <span className="uni-orb-text">{planet.orb}</span> : null}
      {children}
    </span>
  );
}

function Detail({
  planet,
  origin,
  onClose,
}: {
  planet: Planet;
  origin: { x: number; y: number };
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="uni-modal">
      <motion.div
        className="uni-scrim"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      />
      <motion.div
        className="uni-expand"
        style={{ transformOrigin: `${origin.x}px ${origin.y}px` }}
        initial={{ opacity: 0, scale: 0.2 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.3 }}
        transition={{ duration: 0.5, ease }}
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        <section
          className={`uni-panel tone-${planet.tone}`}
          role="dialog"
          aria-modal="true"
          aria-label={planet.title}
        >
          <button ref={closeRef} type="button" className="uni-panel-close" onClick={onClose} aria-label="Close">
            <X size={16} aria-hidden="true" />
          </button>
          <span className="uni-panel-orb" aria-hidden="true">
            <Orb planet={planet} />
          </span>
          <p className="uni-panel-kicker">{planet.kicker}</p>
          <h2 className="uni-panel-title">{planet.title}</h2>
          {planet.place ? (
            <p className="uni-panel-place">
              <GraduationCap size={14} aria-hidden="true" />
              {planet.place}
            </p>
          ) : null}
          <p className="uni-panel-blurb">{planet.blurb}</p>
          <div className="uni-panel-foot">
            <span className="uni-panel-score">
              {planet.score}
            </span>
            {planet.location ? (
              <span className="uni-panel-loc">
                <MapPin size={12} aria-hidden="true" />
                {planet.location}
              </span>
            ) : null}
          </div>
        </section>
      </motion.div>
    </div>
  );
}

export default function EducationUniverse() {
  const [active, setActive] = useState<{ id: string; x: number; y: number } | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const lastRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const built = useInView(stageRef, { once: true, amount: 0.3 });
  const planet = active ? PLANETS.find((p) => p.id === active.id) ?? null : null;

  const close = useCallback(() => {
    setActive(null);
    lastRef.current?.focus();
  }, []);

  return (
    <div ref={stageRef} className={`uni ${built ? "is-built" : "is-hidden"}`}>
      <div className="uni-stars" aria-hidden="true" />
      <div className="uni-glow" aria-hidden="true" />
      <div className="uni-rings" aria-hidden="true">
        <span className="uni-ring uni-ring-a" />
        <span className="uni-ring uni-ring-b" />
        <span className="uni-ring uni-ring-c" />
      </div>
      <Constellation layout="d" />
      <Constellation layout="t" />
      <Constellation layout="m" />

      <div className="uni-rocket">
        <div className="uni-rocket-float">
          <UniverseRocket lit={hover ?? active?.id ?? null} />
        </div>
      </div>

      {PLANETS.map((p) => {
        const style = {
          "--x": p.d[0],
          "--y": p.d[1],
          "--s": p.s,
          "--tx": p.t[0],
          "--ty": p.t[1],
          "--ts": p.ts,
          "--mx": p.m[0],
          "--my": p.m[1],
          "--ms": p.ms,
          "--dur": `${p.float}s`,
          "--delay": `${p.delay}s`,
        } as CSSProperties;
        return (
          <button
            key={p.id}
            type="button"
            className={`uni-planet tone-${p.tone} depth-${p.depth} ${
              active?.id === p.id ? "is-active" : ""
            }`}
            style={style}
            onMouseEnter={() => setHover(p.id)}
            onMouseLeave={() => setHover(null)}
            onFocus={() => setHover(p.id)}
            onBlur={() => setHover(null)}
            aria-haspopup="dialog"
            aria-label={`${p.name}${p.meta ? `: ${p.meta}` : ""}. Open details`}
            onClick={(event) => {
              const box = event.currentTarget.getBoundingClientRect();
              lastRef.current = event.currentTarget;
              setActive({ id: p.id, x: box.left + box.width / 2, y: box.top + box.height / 2 });
            }}
          >
            <span className="uni-float">
              {p.saturn ? <span className="uni-saturn uni-saturn-back" /> : null}
              <span className="uni-halo" />
              <Orb planet={p} />
              {p.saturn ? <span className="uni-saturn uni-saturn-front" /> : null}
              <span className="uni-label">
                <b>{p.name}</b>
                {p.meta ? <i>{p.meta}</i> : null}
              </span>
            </span>
          </button>
        );
      })}

      <p className="uni-hint">Tap a planet to open its log</p>

      {typeof document !== "undefined"
        ? createPortal(
            <AnimatePresence>
              {planet && active ? (
                <Detail key={planet.id} planet={planet} origin={{ x: active.x, y: active.y }} onClose={close} />
              ) : null}
            </AnimatePresence>,
            document.body
          )
        : null}
    </div>
  );
}






