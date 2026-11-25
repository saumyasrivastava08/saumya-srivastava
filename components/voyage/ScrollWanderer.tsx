"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionStyle,
  type MotionValue,
} from "framer-motion";
import { useWanderer } from "./WandererContext";
import ShipArt from "./ShipArt";

/** Each section hosts a slot, so the traveller renders BEHIND that section's content
 *  (the education slot sits above its cards, so the spaceship flies over them). */
const SLOTS = [
  { id: "hero-wanderer-slot", section: "#intro" },
  { id: "experience-wanderer-slot", section: "#experience" },
  { id: "projects-wanderer-slot", section: "#projects" },
  { id: "skills-wanderer-slot", section: "#skills" },
  { id: "education-wanderer-slot", section: "#education" },
  // Inside the hero laptop screen: the planet starts out "inside" the laptop.
  { id: "laptop-wanderer-slot", section: "#intro .laptop-screen" },
] as const;

/** Where on screen (fraction of viewport height) a target should sit on impact. */
const IMPACT_VIEWPORT = 0.55;

type Journey = {
  s: number[];
  x: number[];
  y: number[];
  impact1: number;
  impact2: number;
  landing: number;
  /** The planet first touches the shelf (the bay) on its way to the first dossier */
  bay: number;
  /** The dossier starts coming out of the bay (it sat on its slot until now, while the rest of the shelf appeared) */
  leave: number;
  /** The dossier is completely out of the bay: the bay is cleared */
  clear: number;
  /** How far (px) the paper has to rise to be completely out of the dossier */
  pullLift: number;
  resume: number;
  /** Planet crosses the skills heading and becomes a sun */
  sunForm: number;
  sunAt: number;
  /** The small sun leaves the core and heads down to Education */
  depart: number;
  /** Sun reaches the education section and turns into the back part (engine) of the big ship */
  shipForm: number;
  /** That part crosses the education heading: the big ship starts scattering in and assembling */
  buildAt: number;
  /** Spaceship has reached the first education card; from here it flies on its own */
  flyAt: number;
  /** Stacked (phone) layout: the traveller starts as the heading sparkle instead of in the laptop */
  compact: boolean;
  /** Size of the traveller at the very start */
  startScale: number;
  markers: { x: number; y: number }[];
  eduMarkers: { x: number; y: number }[];
  /** Top of the education section inside the story (smoke bursts are placed relative to it) */
  eduTop: number;
  /** Back of the big ship, where the sun locks in as its engine, if it can be measured */
  eduEngine: { x: number; y: number } | null;
};

type Puff = { id: number; x: number; y: number };

/** Planet counts as "on" a marker when its centre is this close (px). */
const PERCH_RADIUS = 34;
/** The planet's edge first touches a marker at roughly this centre distance (px). */
const TOUCH_RADIUS = 76;
/** Scroll px before a destination where the handoff starts (the traveller is nearly there). */
const LEAD = 110;
/** The planet counts as having landed on the dossier slot this close to it (scroll px). */
const DOSSIER_LEAD = 40;
/** Once the dossier sits on its slot, the rest of the shelf appears after this short beat (ms). */
const LAND_ARM_MS = 140;
/** The paper takes this long to come out of the first dossier before the bay is cleared (ms). */
const PULL_OUT_MS = 1000;
/** the dossier is shown bigger once it is out of the bay */
const OUT_SCALE = 1.35;
/** How long the planet spends turning into a dossier before the shelf fills in (ms). */
const DOSSIER_MORPH_MS = 420;
/** Phone layout: scroll distance at which the heading sparkle turns into the planet / returns. */
const SPARKLE_TURN = 8;
const SPARKLE_BACK = 60;

const smoothstep = (t: number) => t * t * (3 - 2 * t);

function sample(keys: number[], vals: number[], s: number) {
  if (s <= keys[0]) return vals[0];
  const last = keys.length - 1;
  if (s >= keys[last]) return vals[last];
  for (let i = 0; i < last; i += 1) {
    if (s <= keys[i + 1]) {
      const span = keys[i + 1] - keys[i] || 1;
      const t = smoothstep((s - keys[i]) / span);
      return vals[i] + (vals[i + 1] - vals[i]) * t;
    }
  }
  return vals[last];
}

function band(s: number, from: number, to: number) {
  if (s <= from) return 0;
  if (s >= to) return 1;
  return smoothstep((s - from) / (to - from));
}

function Planet() {
  return (
    <span className="wp-planet">
      <span className="wp-ring wp-ring-back" />
      <span className="wp-sphere" />
      <span className="wp-ring wp-ring-front" />
    </span>
  );
}

function Dossier() {
  return (
    <span className="wp-dossier">
      <span className="wp-dossier-tab">M-01</span>
      <span className="wp-dossier-body">
        <i />
        <span className="wp-dossier-dot" />
      </span>
    </span>
  );
}

/** A page taken out of the dossier: what travels from the projects shelf to the skills heading. */
function Page() {
  return (
    <span className="wp-page">
      <span className="wp-page-sheet">
        <i />
        <i />
        <i />
        <b />
      </span>
      <span className="wp-page-scrap" />
      <span className="wp-page-loose" />
      <span className="wp-page-tight" />
      <span className="wp-page-ball" />
    </span>
  );
}

/** The head (nose cone) of the big ship: what the sun turns into at the Education heading. */
function EnginePart() {
  return (
    <span className="wp-nose-part">
      <span className="wp-nose-glow" />
      <span className="wp-nose-cone" />
    </span>
  );
}

function Sun() {
  return (
    <span className="wp-sun">
      <span className="wp-sun-rays" />
      <span className="wp-sun-core" />
    </span>
  );
}

/** Classic rocket-style spaceship drawn pointing right; rotated to follow its flight path. */
function Ship() {
  return (
    <span className="wp-ship-wrap">
      <ShipArt className="wp-ship" />
    </span>
  );
}
type BodyProps = {
  x: MotionValue<number>;
  y: MotionValue<number>;
  /** Top / left of the host slot inside the story, so one global x/y works in every slot. */
  top: MotionValue<number>;
  left: MotionValue<number>;
  scale: MotionValue<number>;
  opacity: MotionValue<number>;
  planetOpacity: MotionValue<number>;
  pageOpacity: MotionValue<number>;
  pageLift: MotionValue<number>;
  pageScale: MotionValue<number>;
  pageCrumple: MotionValue<number>;
  dossierOpacity: MotionValue<number>;
  dossierScale: MotionValue<number>;
  sunOpacity: MotionValue<number>;
  sunScale: MotionValue<number>;
  noseScale: MotionValue<number>;
  engineOpacity: MotionValue<number>;
  shipOpacity: MotionValue<number>;
  shipAngle: MotionValue<number>;
};

function WandererBody({
  x,
  y,
  top,
  left,
  scale,
  opacity,
  planetOpacity,
  pageOpacity,
  pageLift,
  pageScale,
  pageCrumple,
  dossierOpacity,
  dossierScale,
  sunOpacity,
  sunScale,
  noseScale,
  engineOpacity,
  shipOpacity,
  shipAngle,
}: BodyProps) {
  const localY = useTransform([y, top], ([a, b]) => (a as number) - (b as number));
  const localX = useTransform([x, left], ([a, b]) => (a as number) - (b as number));

  return (
    <motion.div
      className="scroll-wanderer"
      style={{ x: localX, y: localY, scale, opacity }}
      aria-hidden="true"
    >
      <motion.span className="wp-layer" style={{ opacity: planetOpacity }}>
        <Planet />
      </motion.span>
      <motion.span className="wp-layer" style={{ opacity: pageOpacity, y: pageLift, scale: pageScale, "--crumple": pageCrumple } as MotionStyle}>
        <Page />
      </motion.span>
      <motion.span className="wp-layer" style={{ opacity: dossierOpacity, scale: dossierScale }}>
        <Dossier />
      </motion.span>
      <motion.span className="wp-layer" style={{ opacity: sunOpacity, scale: sunScale }}>
        <Sun />
      </motion.span>
      <motion.span className="wp-layer" style={{ opacity: engineOpacity, scale: noseScale }}>
        <EnginePart />
      </motion.span>
      <motion.span className="wp-layer" style={{ opacity: shipOpacity, rotate: shipAngle }}>
        <Ship />
      </motion.span>
    </motion.div>
  );
}

type Form = {
  planet: number;
  page: number;
  dossier: number;
  sun: number;
  engine: number;
  ship: number;
  sunScale: number;
};

const FORMS: Record<number, Form> = {
  0: { planet: 1, page: 0, dossier: 0, sun: 0, engine: 0, ship: 0, sunScale: 1 },
  1: { planet: 0, page: 0, dossier: 1, sun: 0, engine: 0, ship: 0, sunScale: 1 },
  2: { planet: 0, page: 1, dossier: 0, sun: 0, engine: 0, ship: 0, sunScale: 1 },
  3: { planet: 0, page: 0, dossier: 0, sun: 1, engine: 0, ship: 0, sunScale: 1 },
  4: { planet: 0, page: 0, dossier: 0, sun: 1, engine: 0, ship: 0, sunScale: 1 },
  5: { planet: 0, page: 0, dossier: 0, sun: 1, engine: 0, ship: 0, sunScale: 0.5 },
  6: { planet: 0, page: 0, dossier: 0, sun: 0, engine: 1, ship: 0, sunScale: 0.5 },
  7: { planet: 0, page: 0, dossier: 0, sun: 0, engine: 1, ship: 0, sunScale: 0.5 },
};

/** Phases where the real thing (shelf / sun / education cards) takes over and the traveller hides. */
const HIDDEN_PHASES = new Set([1, 4]);

/** Where the traveller is at scroll position s, from planet (0) to spaceship in flight (7). */
function phaseAt(j: Journey, s: number) {
  if (s < j.bay) return 0;
  if (s < j.resume) return 1;
  if (s < j.sunForm) return 2;
  if (s < j.sunAt - LEAD) return 3;
  if (s < j.depart) return 4;
  if (s < j.shipForm) return 5;
  if (s < j.flyAt) return 6;
  return 7;
}

export default function ScrollWanderer() {
  const reduceMotion = useReducedMotion();
  const journeyRef = useRef<Journey | null>(null);
  const unlockedRef = useRef([false, false]);
  const perchedRef = useRef([false, false]);
  const reachedRef = useRef([false, false]);
  const eduRef = useRef<boolean[]>([]);
  const armedRef = useRef(false);
  const p1Ref = useRef<0 | 1 | 2>(0);
  const shelfTargetRef = useRef(false);
  const armTimerRef = useRef(0);
  const lastScrollRef = useRef(0);
  const eduClosingRef = useRef(false);
  const closeTimersRef = useRef<number[]>([]);
  // Scrolling back up from the last phase, the ship flies back through the cards on its own.
  const rewindingRef = useRef(false);
  const applyRef = useRef<((s: number) => void) | null>(null);
  const shipObserverRef = useRef<ResizeObserver | null>(null);
  const observedShipRef = useRef<Element | null>(null);
  const phaseRef = useRef(0);
  const angleRef = useRef(0);
  const readyRef = useRef(false);
  const {
    setUnlocked,
    setImpact,
    setArmed,
    setPerched,
    setSunLit,
    setSunGone,
    setEduUnlocked,
    setEduDocked,
    setEduBuilt,
  } = useWanderer();
  const { scrollY } = useScroll();

  const [slots, setSlots] = useState<(HTMLElement | null)[]>([]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(0.82);
  const planetOpacity = useMotionValue(1);
  // between the dossier and the sun the traveller is a page taken out of the dossier
  const pageOpacity = useMotionValue(0);
  const pageLift = useMotionValue(24);
  const pageScale = useMotionValue(0.55);
  // 0 = flat sheet, 1 = crumpled into a ball (just about to become the sun)
  const pageCrumple = useMotionValue(0);
  const dossierOpacity = useMotionValue(0);
  const dossierScale = useMotionValue(1);
  const sunOpacity = useMotionValue(0);
  const sunScale = useMotionValue(1);
  // the head part is drawn at the real size of the ship's nose; this scales it from a small part up to that size
  const noseScale = useMotionValue(0.3);
  const engineOpacity = useMotionValue(0);
  const shipOpacity = useMotionValue(0);
  const shipAngleRaw = useMotionValue(0);
  const shipAngle = useSpring(shipAngleRaw, { stiffness: 140, damping: 20, mass: 0.4 });
  // Whole traveller fades out while the real shelf / sun / cards take over.
  const bodyOpacity = useMotionValue(1);
  // Phone layout: the traveller only exists once the heading sparkle has turned into it (first scroll).
  const homeGate = useMotionValue(0);
  const shownOpacity = useTransform([bodyOpacity, homeGate], ([a, b]) => (a as number) * (b as number));
  const gateOnRef = useRef(false);

  const tops = [
    useMotionValue(0),
    useMotionValue(0),
    useMotionValue(0),
    useMotionValue(0),
    useMotionValue(0),
    useMotionValue(0),
  ];
  const lefts = [
    useMotionValue(0),
    useMotionValue(0),
    useMotionValue(0),
    useMotionValue(0),
    useMotionValue(0),
    useMotionValue(0),
  ];

  const xs = useSpring(x, { stiffness: 320, damping: 38, mass: 0.35 });
  const ys = useSpring(y, { stiffness: 320, damping: 38, mass: 0.35 });

  // ---- Smoke: the ship ejects a cloud at each star, then that card appears ----
  const [puffs, setPuffs] = useState<Puff[]>([]);
  const puffId = useRef(0);

  const emitPuffAt = useCallback((px: number, py: number) => {
    const j = journeyRef.current;
    if (!j) return;
    puffId.current += 1;
    const puff = { id: puffId.current, x: px, y: py - j.eduTop };
    setPuffs((list) => [...list, puff]);
    window.setTimeout(() => setPuffs((list) => list.filter((p) => p.id !== puff.id)), 1500);
  }, []);

  // Has the spaceship flown into the big ship in the background (so that ship has powered up)?
  const dockedRef = useRef(false);
  const dock = useCallback(
    (value: boolean) => {
      if (dockedRef.current === value) return;
      dockedRef.current = value;
      setEduDocked(value);
    },
    [setEduDocked]
  );

  // ---- Docking: the sun becomes the back part (engine) of the big ship ----
  // Once the sun has reached the back of the big ship it locks in as the engine, which ignites
  // and pours out smoke; then the bays open one by one. Timers are cancelled if the user leaves.
  const flightRef = useRef<{ id: number; stops: (() => void)[]; timers: number[] }>({
    id: 0,
    stops: [],
    timers: [],
  });

  // Is the big ship assembling / assembled, and since when (so the engine waits for it).
  const builtRef = useRef(false);
  const stopFlight = useCallback(() => {
    const flight = flightRef.current;
    flight.id += 1;
    flight.stops.forEach((stop) => stop());
    flight.timers.forEach((timer) => window.clearTimeout(timer));
    flight.stops = [];
    flight.timers = [];
  }, []);

  const startFlight = useCallback(() => {
    const j = journeyRef.current;
    if (!j) return;
    stopFlight();
    closeTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    closeTimersRef.current = [];
    eduClosingRef.current = false;
    rewindingRef.current = false;
    const flight = flightRef.current;
    const id = flight.id;
    const nodes = j.eduMarkers;
    const engine = j.eduEngine;

    const later = (fn: () => void, ms: number) => {
      flight.timers.push(
        window.setTimeout(() => {
          if (flight.id === id) fn();
        }, ms)
      );
    };

    const target = engine ?? nodes[0];
    x.set(target.x);
    y.set(target.y);

    // the moment the head part reaches the ship, the ship powers up around it...
    later(() => {
      if (engine) emitPuffAt(engine.x, engine.y);
      // it is already the exact size of the nose, so it simply stays on as the ship's head
      dock(true);
    }, 80);
    // the ship normally started assembling when the part crossed the heading; make sure it has
    if (!builtRef.current) {
      builtRef.current = true;
      setEduBuilt(true);
    }
    // The windows (with their content already inside) are parts of the ship: they fly in and assemble with
    // it, so there is nothing left to wait for or to open one by one afterwards.
  }, [bodyOpacity, dock, emitPuffAt, setEduBuilt, stopFlight, x, y]);

  // Scrolling back up is the mirror of coming down: the head lets go of the ship right away and flies back up
  // the path with the scroll, shrinking as it goes until it is the little sun again. Meanwhile the engine shuts
  // down and the bays close (last first); the ship itself falls apart again when the head crosses the heading.
  const beginRewind = useCallback(() => {
    const j = journeyRef.current;
    if (!j) return;
    closeTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    closeTimersRef.current = [];

    dock(false);

    const last = eduRef.current.lastIndexOf(true);
    if (last < 0) {
      eduClosingRef.current = false;
      return;
    }

    eduClosingRef.current = true;
    const flight = flightRef.current;
    const id = flight.id;
    const later = (fn: () => void, ms: number) => {
      flight.timers.push(
        window.setTimeout(() => {
          if (flight.id === id) fn();
        }, ms)
      );
    };

    let t = 0;
    for (let k = last; k >= 0; k -= 1) {
      later(() => {
        const next = eduRef.current.map((open, i) => (i < k ? open : false));
        eduRef.current = next;
        setEduUnlocked(next);
      }, t);
      t += 420;
    }
    later(() => {
      eduClosingRef.current = false;
      applyRef.current?.(lastScrollRef.current);
    }, t + 60);
  }, [dock, setEduUnlocked]);
  const apply = useCallback(
    (s: number) => {
      const j = journeyRef.current;
      if (!j) return;

      lastScrollRef.current = s;

      // Everything on the page is decided by the scroll position alone, never by the direction,
      // so a spot looks exactly the same whether you arrive from above or from below.
      const sPhase = s;
      const phase = phaseAt(j, sPhase);
      // In the last phase the spaceship flies on its own (time based), not with the scroll.
      const flying = phase === 7;

      // Leaving the last phase upwards: stop the autopilot and rewind it through the cards.
      if (phaseRef.current === 7 && phase !== 7) {
        stopFlight();
        beginRewind();
      }

      const px = sample(j.s, j.x, s);
      const py = sample(j.s, j.y, s);
      if (!flying && !rewindingRef.current) {
        x.set(px);
        y.set(py);

        // Spaceship nose follows the direction of travel (and turns around when scrolling up).
        const nx = sample(j.s, j.x, s + 14);
        const ny = sample(j.s, j.y, s + 14);
        if (Math.hypot(nx - px, ny - py) > 0.05) {
          angleRef.current = (Math.atan2(ny - py, nx - px) * 180) / Math.PI;
        }
        const desired = angleRef.current;
        const current = shipAngleRaw.get();
        // take the shortest turn
        shipAngleRaw.set(current + ((((desired - current) % 360) + 540) % 360) - 180);
      }

      // While the planet sits on a timeline marker, the marker hides: only the planet shows.
      // The last role's marker goes with the planet when it heads on to the project dossiers: it stays
      // hidden from the hit onwards (and is back when you scroll up above it).
      const perched = j.markers.map(
        (m, i) =>
          Math.hypot(px - m.x, py - m.y) < PERCH_RADIUS || (i === j.markers.length - 1 && s >= j.impact2)
      );
      const prevPerched = perchedRef.current;
      if (perched.some((v, i) => v !== prevPerched[i])) {
        perchedRef.current = perched;
        setPerched(perched);
      }

      // From the first dossier to the skills heading the page is moulded like paper: it scrunches up
      // as it travels, and is a paper ball by the time it crosses the heading (where it becomes the sun).
      pageCrumple.set(band(s, j.resume, j.sunForm));

      const grow = sample([0, j.impact1], [j.startScale, 1], s);

      // Phone layout: the heading stays a sparkle until the first scroll. Then the sparkle turns
      // into the planet (it hides while the planet flies off) and the journey begins.
      const gateOn = !j.compact || s >= SPARKLE_TURN;
      if (gateOn !== gateOnRef.current) {
        gateOnRef.current = gateOn;
        animate(homeGate, gateOn ? 1 : 0, { duration: gateOn ? 0.3 : 0.2, ease: "easeOut" });
      }
      const sparkleHidden = j.compact && s >= SPARKLE_TURN && s < SPARKLE_BACK;
      if (document.documentElement.hasAttribute("data-planet-home") !== sparkleHidden) {
        document.documentElement.toggleAttribute("data-planet-home", sparkleHidden);
      }
      const pulse1 = 1 + 0.3 * (band(s, j.impact1 - 90, j.impact1) - band(s, j.impact1, j.impact1 + 130));
      const pulse2 = 1 + 0.3 * (band(s, j.impact2 - 90, j.impact2) - band(s, j.impact2, j.impact2 + 130));
      scale.set(grow * pulse1 * pulse2);
      // the head part grows from a small part to the full size of the nose as it flies in
      noseScale.set(0.3 + 0.7 * band(s, j.shipForm, j.flyAt));

      // The details appear the moment the planet touches the marker (even slightly),
      // and stay once it has passed; the impact burst still fires on the exact hit.
      const reached = [s >= j.impact1, s >= j.impact2];
      const touching = j.markers.map((m) => Math.hypot(px - m.x, py - m.y) < TOUCH_RADIUS);
      const next = reached.map((isReached, index) => isReached || touching[index]);
      const prev = unlockedRef.current;
      const prevReached = reachedRef.current;
      reached.forEach((isOn, index) => {
        if (isOn && !prevReached[index] && readyRef.current) {
          setImpact(index);
          window.setTimeout(() => setImpact(null), 650);
        }
      });
      reachedRef.current = reached;
      if (next[0] !== prev[0] || next[1] !== prev[1]) {
        unlockedRef.current = next;
        setUnlocked(next);
      }

      // Education: the bays only open once the sun has locked into the ship's engine (phase 7);
      // anywhere else they stay shut.
      if (!flying && !eduClosingRef.current) {
        const eduNext = j.eduMarkers.map(() => false);
        const eduPrev = eduRef.current;
        if (eduNext.length !== eduPrev.length || eduPrev.some(Boolean)) {
          eduRef.current = eduNext;
          setEduUnlocked(eduNext);
        }
      }
      // Phases of the traveller's form (see phaseAt):
      // 0 planet -> 1 dossier (shelf takes over, hidden) -> 2 planet again, travelling behind
      // the content -> 3 turns into a sun as it crosses the skills heading -> 4 reaches the core
      // (real sun ignites, worlds appear, hidden) -> 5 a small sun leaves the core and heads down
      // -> 6 becomes a spaceship at the education heading -> 7 reached the first card, then flies
      // on its own through the rest of the cards and vanishes.
      const prevPhase = phaseRef.current;

      // The dossier is "landed" once it sits on its slot of the shelf (the rest of the shelf appears then).
      const landedNow = phase >= 2 || (phase === 1 && s >= j.landing - DOSSIER_LEAD);
      // ...and "leaving" once it starts coming out of the bay (the real first folder then hands over to it).
      const leavingNow = phase === 1 && s >= j.leave;
      // Where the dossier is while phase 1 lasts: flying in, sitting on its slot, or leaving the bay.
      const p1Now: 0 | 1 | 2 = !landedNow ? 0 : leavingNow ? 2 : 1;
      const p1Before = p1Ref.current;
      p1Ref.current = p1Now;
      // (landedBefore is only meaningful inside phase 1)
      const landedBefore = p1Before !== 0;

      // The big ship starts scattering in and assembling once the engine part crosses the
      // Stellar Archive heading, and falls apart again when it goes back above it.
      if (!rewindingRef.current) {
        const wantBuilt = phase >= 6 && sPhase >= j.buildAt;
        if (wantBuilt !== builtRef.current) {
          builtRef.current = wantBuilt;
          setEduBuilt(wantBuilt);
        }
      }

      if (phase !== prevPhase) {
        phaseRef.current = phase;
        setSunLit(phase >= 4);
        // the sun in the skills core leaves with the little sun that heads down to Education
        setSunGone(phase >= 5);

        if (phase === 7) startFlight();

        // (the dossier shelf itself is driven by the scroll position, see syncShelf below)

        // Scrolling up into the dossier slot from the sun is the same morph in reverse.
        const intoDossier = phase === 1 && prevPhase !== 1;

        // It is always the planet that takes the forms: between the dossier and the sun it has to pass
        // through the planet, so a quick scroll never skips that step in either direction.
        const via = Math.min(phase, prevPhase) === 1 && Math.max(phase, prevPhase) >= 3 ? 0.2 : 0;
        // the paper being pulled out of the first dossier, going down
        const pullOut = phase === 2 && prevPhase === 1;

        // The page is slid out of the dossier going down (and slid back in going up).
        if (phase === 2) {
          if (prevPhase === 1) {
            // pulled out of the first dossier: it keeps rising until it is completely outside the bay,
            // and only then is the dossier removed and the bay cleared; then it comes away with the scroll
            pageLift.stop();
            pageLift.set(22);
            pageScale.stop();
            pageScale.set(0.85);
            animate(pageLift, [22, -j.pullLift, -j.pullLift, 0], {
              duration: PULL_OUT_MS / 1000 + 1.1,
              times: [0, PULL_OUT_MS / (PULL_OUT_MS + 1100), (PULL_OUT_MS + 450) / (PULL_OUT_MS + 1100), 1],
              ease: "easeInOut",
            });
            animate(pageScale, 1, { duration: PULL_OUT_MS / 1000, ease: "easeOut" });
          } else {
            if (prevPhase < 2) {
              pageLift.set(24);
              pageScale.set(0.55);
            }
            animate(pageLift, 0, { type: "spring", stiffness: 170, damping: 13 });
            animate(pageScale, 1, { type: "spring", stiffness: 190, damping: 13 });
          }
        } else if (phase < 2) {
          animate(pageLift, 24, { duration: 0.25, delay: via, ease: "easeOut" });
          animate(pageScale, 0.55, { duration: 0.25, delay: via, ease: "easeOut" });
        } else if (via) {
          pageLift.set(0);
          pageScale.set(1);
        }

        if (intoDossier) {
          // pop the dossier shape into existence as the planet / sun melts into it
          dossierScale.set(0.55);
          animate(dossierScale, p1Now === 2 ? OUT_SCALE : 1, { type: "spring", stiffness: 240, damping: 15, delay: via });
        } else if (!pullOut) {
          dossierScale.set(1);
        }

        // Same look in both directions: between the dossiers and the skills heading it is the
        // planet, whether you are scrolling down or back up.
        const form = FORMS[phase];
        // (the dossier only steps aside once it has reached its slot, not while it is still flying in)
        const hidden = HIDDEN_PHASES.has(phase) && (phase !== 1 || p1Now === 1);

        const to = (mv: MotionValue<number>, v: number, delay = 0, duration = 0.22) =>
          animate(mv, v, { duration, delay: delay + via, ease: "easeOut" });

        {
          // jumped over the planet (dossier <-> sun)? show the planet first, then take the next form
          if (via) {
            animate(pageOpacity, 1, { duration: via, ease: "easeOut" });
            animate(planetOpacity, 0, { duration: via, ease: "easeOut" });
            animate(dossierOpacity, 0, { duration: via, ease: "easeOut" });
            animate(sunOpacity, 0, { duration: via, ease: "easeOut" });
            animate(bodyOpacity, 1, { duration: via, ease: "easeOut" });
          }
          const morph = phase === 1 ? 0.34 : phase === 6 ? 0.55 : 0.22;
          to(planetOpacity, form.planet, 0, morph);
          if (pullOut) {
            // the paper is simply there, pulled out of the dossier: no fading in
            pageOpacity.stop();
            pageOpacity.set(1);
            dossierOpacity.stop();
            dossierOpacity.set(1);
            // the dossier is only removed once the paper is completely out of the bay
            animate(dossierOpacity, 0, { duration: 0.3, delay: (PULL_OUT_MS + 150) / 1000, ease: "easeOut" });
          } else {
            to(pageOpacity, form.page, 0, morph);
            to(dossierOpacity, form.dossier, 0, morph);
          }
          to(sunOpacity, form.sun);
          to(engineOpacity, form.engine);
          to(shipOpacity, form.ship);
          to(sunScale, form.sunScale, 0, 0.3);
          if (hidden) {
            // reached the destination: morph first, then the real thing takes over
            // (for the dossier: after the shelf starts appearing, so there is no gap)
            to(bodyOpacity, 0, phase === 1 ? (DOSSIER_MORPH_MS + 40) / 1000 : 0.17, 0.25);
          } else if (pullOut) {
            // the traveller's dossier sits exactly over the first folder, so it can take over without a fade
            bodyOpacity.stop();
            bodyOpacity.set(1);
          } else if (!(rewindingRef.current && dockedRef.current)) {
            // (while the sun is still locked into the engine during a rewind it stays hidden)
            to(bodyOpacity, 1, 0, 0.22);
          }
        }
      }

      // Inside phase 1 the dossier is flying in (0), sitting on its slot while the shelf fills (1), or
      // coming out of the bay (2). The real first folder and the traveller hand over to each other.
      if (phase === 1 && prevPhase === 1 && p1Now !== p1Before) {
        if (p1Now === 1 && p1Before === 0) {
          // landed on its slot: a little pop, then the traveller steps aside for the real folder
          dossierScale.set(0.9);
          animate(dossierScale, 1, { type: "spring", stiffness: 260, damping: 14 });
          animate(bodyOpacity, 0, { duration: 0.25, delay: LAND_ARM_MS / 1000 + 0.04, ease: "easeOut" });
        } else if (p1Now === 0) {
          // back above the slot: the traveller takes over again
          animate(bodyOpacity, 1, { duration: 0.2, ease: "easeOut" });
        } else if (p1Now === 2) {
          // starts coming out of the bay: it sits exactly over the first folder, so it takes over without a fade
          bodyOpacity.stop();
          bodyOpacity.set(1);
          // out in the open it grows, so it reads as a big file with a big sheet inside
          animate(dossierScale, OUT_SCALE, { type: "spring", stiffness: 200, damping: 16 });
        } else {
          // back on its slot from coming out of the bay: the real folder is there again
          bodyOpacity.stop();
          bodyOpacity.set(0);
          animate(dossierScale, 1, { type: "spring", stiffness: 240, damping: 18 });
        }
      }

      // The dossier shelf (the bay) is driven by the scroll position, the same in both directions: it is
      // there while the dossier sits on its slot and is cleared once the dossier is completely out of it.
      const shelfWant = phase === 1 && landedNow && s < j.clear;
      if (shelfWant !== shelfTargetRef.current) {
        shelfTargetRef.current = shelfWant;
        if (armTimerRef.current) {
          window.clearTimeout(armTimerRef.current);
          armTimerRef.current = 0;
        }
        if (shelfWant) {
          if (!armedRef.current) {
            armTimerRef.current = window.setTimeout(() => {
              armTimerRef.current = 0;
              armedRef.current = true;
              setArmed(true);
            }, LAND_ARM_MS);
          }
        } else if (armedRef.current) {
          armedRef.current = false;
          setArmed(false);
        }
      }

      // While the dossier comes out of the bay and the paper is pulled out of it, it travels in front of the
      // projects content, and the real first folder steps aside for it.
      const root = document.documentElement;
      const front = leavingNow || phase === 2;
      if (root.hasAttribute("data-wp-front") !== front) root.toggleAttribute("data-wp-front", front);
      if (root.hasAttribute("data-wp-lift") !== front) root.toggleAttribute("data-wp-lift", front);
      // once the bay is empty it is not shown at all (its place stays, so nothing below it moves)
      const bayGone = phase >= 2 || (phase === 1 && s >= j.clear);
      if (root.hasAttribute("data-wp-bay-gone") !== bayGone) root.toggleAttribute("data-wp-bay-gone", bayGone);
    },
    [
      bodyOpacity,
      dossierOpacity,
      dossierScale,
      engineOpacity,
      homeGate,
      noseScale,
      planetOpacity,
      pageOpacity,
      pageLift,
      pageScale,
      pageCrumple,
      scale,
      setArmed,
      setEduBuilt,
      setEduUnlocked,
      setImpact,
      setPerched,
      setSunLit,
      setSunGone,
      setUnlocked,
      shipAngleRaw,
      shipOpacity,
      sunOpacity,
      sunScale,
      beginRewind,
      startFlight,
      stopFlight,
      x,
      y,
    ]
  );

  const measure = useCallback(() => {
    const story = document.querySelector<HTMLElement>(".home-scroll-story");
    if (!story) return;

    const storyRect = story.getBoundingClientRect();
    const vh = window.innerHeight;
    const storyDocTop = storyRect.top + window.scrollY;
    const W = storyRect.width;

    const center = (el: Element | null) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        x: r.left - storyRect.left + r.width / 2,
        y: r.top - storyRect.top + r.height / 2,
      };
    };

    const markers = story.querySelectorAll("#experience .experience-stop-marker");
    const folder = story.querySelector("#projects .mission-folder");
    const m1 = center(markers[0] ?? null);
    const m2 = center(markers[1] ?? null);
    const landing = center(folder);
    const sun = center(story.querySelector("#skills .constellation-sun"));
    const eduNodes = Array.from(story.querySelectorAll("#education .education-star-node"))
      .map((node) => center(node))
      .filter((point): point is { x: number; y: number } => point !== null);
    if (!m1 || !m2 || !landing || !sun || !eduNodes.length) return;

    SLOTS.forEach((slot, index) => {
      const host = story.querySelector<HTMLElement>(slot.section);
      if (!host) {
        tops[index].set(0);
        lefts[index].set(0);
        return;
      }
      const rect = host.getBoundingClientRect();
      // slots sit inside the host's border box, so skip the border
      tops[index].set(rect.top - storyRect.top + host.clientTop);
      lefts[index].set(rect.left - storyRect.left + host.clientLeft);
    });

    const toScroll = (docY: number) => Math.max(0, storyDocTop + docY - vh * IMPACT_VIEWPORT);

    // The planet starts inside the hero laptop screen. On a phone the laptop is stacked far below
    // the title, so there the heading sparkle turns into the planet instead.
    const introMain = story.querySelector("#intro .intro-main");
    const introScene = story.querySelector("#intro .intro-tech-scene");
    const stacked =
      !!introMain &&
      !!introScene &&
      introScene.getBoundingClientRect().top >= introMain.getBoundingClientRect().bottom - 4;
    const sparkle = stacked ? center(story.querySelector("#intro .intro-sparkle")) : null;
    const start = sparkle ??
      center(story.querySelector("#intro .laptop-planet")) ?? { x: W - 70, y: 64 };
    const impact1 = Math.max(toScroll(m1.y), 220);
    const impact2 = Math.max(toScroll(m2.y), impact1 + 140);
    const landingAt = Math.max(toScroll(landing.y), impact2 + 220);

    // The dossier sits on its slot while the rest of the shelf appears, then comes out of the bay and
    // travels down to the "Filter by stack…" line, where the paper is pulled out of it.
    const filterEl = story.querySelector("#projects .projects-footer p");
    const filterPt = center(filterEl);
    const filterY = Math.max(filterPt?.y ?? landing.y + 140, landing.y + 90);
    // the paper is pulled out in the clear space of that row (between the text and the archive button), so
    // it does not cover the words
    let filterX = landing.x;
    if (filterEl) {
      const range = document.createRange();
      range.selectNodeContents(filterEl);
      const textRight = range.getBoundingClientRect().right - storyRect.left;
      const btn = Array.from(filterEl.parentElement?.children ?? []).find((c) => c !== filterEl);
      const btnLeft = btn ? btn.getBoundingClientRect().left - storyRect.left : W;
      if (btnLeft - textRight > 170) filterX = (textRight + btnLeft) / 2;
    }
    const holdAt = landingAt + 40;
    // the paper is pulled out while the filter line is in the middle of the screen, where it can be seen
    const resumeAt = Math.max(toScroll(filterY), holdAt + 170);
    const sunAt = Math.max(toScroll(sun.y), resumeAt + 360);
    // The real sun lights up; a small sun then leaves the core and heads down to Education.
    const departAt = sunAt + 300;

    // The spaceship must reach the first education card while the page can still scroll
    // (Education is the last section), so the target is clamped to the real scroll range.
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - vh);
    const firstNode = eduNodes[0];
    // the sun heads for the head (nose) of the big ship (or the first card if that cannot be measured)
    const eduEngine = center(story.querySelector("#education .education-ship-head"));
    // the head part is drawn at the exact size of the ship's nose cone (a share of the ship's own box)
    const eduShip = story.querySelector<HTMLElement>("#education .edu-ship");
    if (eduShip) {
      // keep the head glued to the nose even when the ship itself changes size later on
      if (shipObserverRef.current && observedShipRef.current !== eduShip) {
        shipObserverRef.current.observe(eduShip);
        observedShipRef.current = eduShip;
      }
      const shipBox = eduShip.getBoundingClientRect();
      const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      const upright = eduShip.classList.contains("is-vertical");
      const root = document.documentElement.style;
      // the ship can be scaled down to fit a small screen (--edu-fit); the head is scaled with it
      const fit = parseFloat(eduShip.closest<HTMLElement>(".education-ship-scene")?.style.getPropertyValue("--edu-fit") ?? "") || 1;
      root.setProperty("--wp-s", String(fit));
      root.setProperty("--wp-head-w", `${upright ? shipBox.width : 9 * rem * fit}px`);
      root.setProperty("--wp-head-h", `${upright ? 14 * rem : shipBox.height}px`);
    }
    const target = eduEngine ?? firstNode;
    const flyAt = Math.max(
      departAt + 260,
      Math.min(Math.max(toScroll(target.y), departAt + 420), maxScroll - 40)
    );

    const keysS = [0, impact1, impact2, landingAt, holdAt, resumeAt, sunAt, departAt, flyAt, flyAt + 800];
    const keysX = [start.x, m1.x, m2.x, landing.x, landing.x, filterX, sun.x, sun.x, target.x, target.x];
    const keysY = [start.y, m1.y, m2.y, landing.y, landing.y, filterY, sun.y, sun.y, target.y, target.y];
    // The planet becomes a dossier the moment it touches the shelf (the bay), not once it is
    // sitting on the first dossier.
    const bayEl = story.querySelector("#projects .mission-bay");
    const bayTop = bayEl ? bayEl.getBoundingClientRect().top - storyRect.top : null;
    const bayLatest = landingAt - DOSSIER_LEAD;
    let bayAt = bayLatest;
    if (bayTop !== null) {
      for (let t = impact2; t <= bayLatest; t += 4) {
        if (sample(keysS, keysY, t) >= bayTop - 20) {
          bayAt = t;
          break;
        }
      }
    }
    // The bay is cleared once the dossier is completely out of it (its bottom edge is past the bay's).
    const bayBottom = bayEl ? bayEl.getBoundingClientRect().bottom - storyRect.top : null;
    let clearAt = resumeAt - 20;
    if (bayBottom !== null) {
      for (let t = holdAt; t <= resumeAt; t += 4) {
        if (sample(keysS, keysY, t) >= bayBottom + 40) {
          clearAt = t;
          break;
        }
      }
    }
    // The planet turns into a sun the moment it crosses the skills heading.
    const heading = story.querySelector("#skills .galaxy-skills-intro");
    const headingBottom = heading ? heading.getBoundingClientRect().bottom - storyRect.top : null;
    const latest = sunAt - LEAD - 40;
    let sunForm = resumeAt + (latest - resumeAt) * 0.35;
    if (headingBottom !== null) {
      sunForm = latest;
      for (let t = resumeAt; t <= latest; t += 4) {
        if (sample(keysS, keysY, t) >= headingBottom) {
          sunForm = t;
          break;
        }
      }
    }

    // The sun turns into the engine part as it enters the education section, and the big ship
    // starts assembling when that part crosses the education heading.
    const eduSection = story.querySelector("#education");
    const eduSectionTop = eduSection ? eduSection.getBoundingClientRect().top - storyRect.top : null;
    const eduHeading = story.querySelector("#education .education-heading-row");
    const eduHeadingBottom = eduHeading
      ? eduHeading.getBoundingClientRect().bottom - storyRect.top
      : null;
    const shipLatest = flyAt - LEAD;
    let buildAt = departAt + (shipLatest - departAt) * 0.7;
    if (eduHeadingBottom !== null) {
      buildAt = shipLatest;
      for (let t = departAt; t <= shipLatest; t += 4) {
        if (sample(keysS, keysY, t) >= eduHeadingBottom) {
          buildAt = t;
          break;
        }
      }
    }
    // the rest of the ship only starts assembling itself once the head part is arriving at the ship
    buildAt = Math.max(buildAt, flyAt - 60);
    let shipForm = departAt + (buildAt - departAt) * 0.4;
    if (eduSectionTop !== null) {
      shipForm = buildAt;
      for (let t = departAt; t <= buildAt; t += 4) {
        if (sample(keysS, keysY, t) >= eduSectionTop - 40) {
          shipForm = t;
          break;
        }
      }
    }
    // the part form comes a little before the build, never after it
    shipForm = Math.min(shipForm, buildAt - 12);

    journeyRef.current = {
      s: keysS,
      x: keysX,
      y: keysY,
      impact1,
      impact2,
      landing: landingAt,
      bay: bayAt,
      leave: holdAt,
      clear: clearAt,
      // up out of the dossier: half the dossier, half the paper and some air
      pullLift: 84,
      resume: resumeAt,
      sunForm,
      sunAt,
      depart: departAt,
      shipForm: Math.max(shipForm, departAt + 20),
      buildAt: Math.max(buildAt, departAt + 40),
      flyAt,
      compact: Boolean(sparkle),
      startScale: sparkle ? 0.5 : 0.82,
      markers: [m1, m2],
      eduMarkers: eduNodes,
      eduEngine,
      eduTop: (() => {
        const section = story.querySelector("#education");
        return section ? section.getBoundingClientRect().top - storyRect.top : 0;
      })(),
    };

    apply(window.scrollY);
    // once the head has docked it must follow the nose if the ship changes size or moves
    if (dockedRef.current && !rewindingRef.current && eduEngine) {
      x.set(eduEngine.x);
      y.set(eduEngine.y);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apply]);

  useEffect(() => {
    applyRef.current = apply;
  }, [apply]);

  useMotionValueEvent(scrollY, "change", (value) => apply(value));

  useEffect(() => {
    setSlots(SLOTS.map((slot) => document.getElementById(slot.id)));
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      unlockedRef.current = [true, true];
      setUnlocked([true, true]);
      setArmed(true);
      setSunLit(true);
      setPerched([false, false]);
      setEduUnlocked(new Array(12).fill(true));
      setEduDocked(true);
      setEduBuilt(true);
      return;
    }

    measure();
    const timers = [250, 900, 2000].map((ms) => window.setTimeout(measure, ms));
    const settle = window.setTimeout(() => {
      readyRef.current = true;
    }, 400);

    const story = document.querySelector(".home-scroll-story");
    const observer = story ? new ResizeObserver(() => measure()) : null;
    if (story && observer) observer.observe(story);
    shipObserverRef.current = observer;
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);

    return () => {
      timers.forEach(window.clearTimeout);
      window.clearTimeout(settle);
      document.documentElement.removeAttribute("data-planet-home");
      document.documentElement.removeAttribute("data-wp-front");
      document.documentElement.removeAttribute("data-wp-lift");
      document.documentElement.removeAttribute("data-wp-bay-gone");
      observer?.disconnect();
      shipObserverRef.current = null;
      observedShipRef.current = null;
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
    };
  }, [measure, reduceMotion, setArmed, setEduBuilt, setEduDocked, setEduUnlocked, setPerched, setSunLit, setUnlocked]);

  if (reduceMotion) return null;

  return (
    <>
      {slots.map((slot, index) =>
        slot
          ? createPortal(
              <WandererBody
                x={xs}
                y={ys}
                top={tops[index]}
                left={lefts[index]}
                scale={scale}
                opacity={shownOpacity}
                planetOpacity={planetOpacity}
                pageOpacity={pageOpacity}
                pageLift={pageLift}
                pageScale={pageScale}
                pageCrumple={pageCrumple}
                dossierOpacity={dossierOpacity}
                dossierScale={dossierScale}
                sunOpacity={sunOpacity}
                sunScale={sunScale}
                noseScale={noseScale}
                engineOpacity={engineOpacity}
                shipOpacity={shipOpacity}
                shipAngle={shipAngle}
              />,
              slot,
              SLOTS[index].id
            )
          : null
      )}
      {slots[4] && puffs.length
        ? createPortal(
            <>
              {puffs.map((puff) => (
              <span
                key={puff.id}
                className="wp-smoke-burst"
                style={{ left: puff.x, top: puff.y }}
                aria-hidden="true"
              >
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </span>
              ))}
            </>,
            slots[4]
          )
        : null}
    </>
  );
}

