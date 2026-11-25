"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/** The opening plays once per full page load (not when navigating back to the homepage). */
let played = false;
export const hasSplashPlayed = () => played;

type Stage = "closed" | "open" | "zoom" | "leave";

const OPEN_AT = 350; // lid starts to open
const COUNT_AT = 1600; // "3 .. 2 .. 1" starts
const COUNT_STEP = 800; // one second of the countdown (a touch quicker than real time)
const ZOOM_AT = COUNT_AT + COUNT_STEP * 3; // the screen grows to fill the page
const LEAVE_AT = ZOOM_AT + 1250; // the opening fades and the page takes over
const GONE_AT = LEAVE_AT + 650;

const SAUMYA = "Saumya".split("");
const VERSE = "Verse".split("");

/** Number of keys in each row of the keyboard (a space-bar row is added below). */
const KEY_ROWS = [14, 14, 13, 12];

const letterIn = (index: number) => ({
  initial: { opacity: 0, y: 26, rotateX: -70 },
  animate: { opacity: 1, y: 0, rotateX: 0 },
  transition: { duration: 0.7, delay: 0.3 + index * 0.07, ease: [0.22, 0.8, 0.24, 1] as const },
});

export default function SaumyaverseSplash({ onDone }: { onDone: () => void }) {
  const reduceMotion = useReducedMotion();
  const [stage, setStage] = useState<Stage>("closed");
  const [count, setCount] = useState<number | null>(null);
  const [zoom, setZoom] = useState({ x: 0, y: 0, scale: 1 });
  // tall, narrow screens: fit the laptop screen to the width instead of cropping it
  const [fit, setFit] = useState(false);
  const [visible, setVisible] = useState(true);

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const displayRef = useRef<HTMLDivElement | null>(null);
  const timers = useRef<number[]>([]);
  const doneRef = useRef(false);
  const lockRef = useRef<string | null>(null);

  const unlock = useCallback(() => {
    if (lockRef.current === null) return;
    document.documentElement.style.overflow = lockRef.current;
    lockRef.current = null;
  }, []);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    played = true;
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
    setStage("leave");
    setCount(null);
    unlock();
    onDone();
    timers.current.push(window.setTimeout(() => setVisible(false), GONE_AT - LEAVE_AT));
  }, [onDone, unlock]);

  useEffect(() => {
    if (reduceMotion) {
      finish();
      return;
    }

    // keep the page still while the opening plays
    lockRef.current = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    const at = (ms: number, fn: () => void) => timers.current.push(window.setTimeout(fn, ms));

    at(OPEN_AT, () => setStage("open"));
    at(COUNT_AT, () => setCount(3));
    at(COUNT_AT + COUNT_STEP, () => setCount(2));
    at(COUNT_AT + COUNT_STEP * 2, () => setCount(1));
    at(ZOOM_AT, () => {
      const wrap = wrapRef.current;
      const display = displayRef.current;
      if (wrap && display) {
        const w = wrap.getBoundingClientRect();
        const d = display.getBoundingClientRect();
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const byWidth = vw / d.width;
        const byHeight = vh / d.height;
        // On a phone the screen is much wider than tall, so filling the height would crop the
        // prompt. Fit it to the width instead and let the backdrop take on the screen colour.
        const portrait = byWidth * d.height < vh * 0.8;
        const scale = portrait ? byWidth * 0.94 : Math.max(byWidth, byHeight) * 1.06;
        setFit(portrait);
        const ox = w.left + w.width / 2;
        const oy = w.top + w.height / 2;
        const cx = d.left + d.width / 2;
        const cy = d.top + d.height / 2;
        setZoom({
          scale,
          x: vw / 2 - ox - scale * (cx - ox),
          y: vh / 2 - oy - scale * (cy - oy),
        });
      }
      setCount(null);
      setStage("zoom");
    });
    at(LEAVE_AT, finish);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Enter") finish();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      timers.current.forEach((timer) => window.clearTimeout(timer));
      timers.current = [];
      unlock();
    };
  }, [finish, reduceMotion, unlock]);

  if (!visible || reduceMotion) return null;

  const zooming = stage === "zoom" || stage === "leave";
  const opened = stage !== "closed";

  return (
    <motion.div
      className={`sv-splash ${fit && zooming ? "is-fit" : ""}`}
      initial={{ opacity: 1 }}
      animate={{ opacity: stage === "leave" ? 0 : 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ pointerEvents: stage === "leave" ? "none" : "auto" }}
      role="dialog"
      aria-label="Welcome to SaumyaVerse"
    >
      <div className="sv-stars" aria-hidden="true" />
      <div className={`sv-halo ${opened ? "is-on" : ""}`} aria-hidden="true" />
      <div className="sv-fill" aria-hidden="true" />

      <motion.div
        className="sv-title-block"
        animate={{ opacity: zooming ? 0 : 1, y: zooming ? -18 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.p
          className="sv-kicker"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <span className="sv-kicker-line" aria-hidden="true" />
          Welcoming you to
          <span className="sv-kicker-line" aria-hidden="true" />
        </motion.p>

        <h1 className="sv-title" aria-label="SaumyaVerse">
          <span className="sv-word sv-word-a" aria-hidden="true">
            {SAUMYA.map((letter, index) => (
              <motion.span key={`a-${index}`} className="sv-letter" {...letterIn(index)}>
                {letter}
              </motion.span>
            ))}
          </span>
          <span className="sv-word sv-word-b" aria-hidden="true">
            {VERSE.map((letter, index) => (
              <motion.span key={`b-${index}`} className="sv-letter" {...letterIn(index + SAUMYA.length)}>
                {letter}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.p
          className="sv-sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          a universe of things I build
        </motion.p>

        <div className="sv-count" aria-live="polite">
          <AnimatePresence>
            {count !== null ? (
              <motion.div
                key="count"
                className="sv-count-row"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="sv-count-text">Entering in</span>
                <span className="sv-count-ring">
                  <svg viewBox="0 0 44 44" aria-hidden="true">
                    <circle className="sv-count-track" cx="22" cy="22" r="19" />
                    <motion.circle
                      key={count}
                      className="sv-count-arc"
                      cx="22"
                      cy="22"
                      r="19"
                      initial={{ pathLength: 1 }}
                      animate={{ pathLength: 0 }}
                      transition={{ duration: COUNT_STEP / 1000, ease: "linear" }}
                    />
                  </svg>
                  <motion.b
                    key={count}
                    className="sv-count-num"
                    initial={{ opacity: 0, scale: 1.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    {count}
                  </motion.b>
                </span>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div
        ref={wrapRef}
        className="sv-laptop-wrap"
        initial={{ opacity: 0, y: 24, scale: 1 }}
        animate={
          zooming
            ? { opacity: 1, x: zoom.x, y: zoom.y, scale: zoom.scale }
            : { opacity: 1, x: 0, y: opened ? 0 : "-26%", scale: 1 }
        }
        transition={
          zooming
            ? { duration: 1.2, ease: [0.7, 0, 0.25, 1] }
            : { duration: opened ? 1.1 : 0.8, ease: "easeOut" }
        }
      >
        <div className="sv-laptop">
          <motion.div
            className="sv-lid"
            initial={{ rotateX: -92 }}
            animate={{ rotateX: opened ? 5 : -92 }}
            transition={{ duration: 1.1, ease: [0.3, 0.7, 0.2, 1] }}
          >
            <div className="sv-bezel">
              <span className="sv-camera" aria-hidden="true" />
              <div ref={displayRef} className={`sv-display ${opened ? "is-on" : ""}`}>
                <div className="sv-orb">
                  <span className="wp-planet">
                    <span className="wp-ring wp-ring-back" />
                    <span className="wp-sphere" />
                    <span className="wp-ring wp-ring-front" />
                  </span>
                </div>
                <p className="sv-prompt">
                  <b>$</b> welcome <em>--to</em> saumyaverse<span className="sv-caret">▌</span>
                </p>
                <span className="sv-glare" aria-hidden="true" />
              </div>
            </div>
          </motion.div>

          {/* The keyboard deck: laid back so the keys read in perspective */}
          <div className={`sv-deck-wrap ${opened ? "is-on" : ""}`} aria-hidden="true">
            <div className="sv-deck">
              <span className="sv-deck-cover" />
              <div className="sv-keys">
                {KEY_ROWS.map((keys, row) => (
                  <div key={row} className="sv-key-row">
                    {Array.from({ length: keys }).map((_, key) => (
                      <i key={key} className={`sv-key ${(row + key) % 5 === 0 ? "is-accent" : ""}`} />
                    ))}
                  </div>
                ))}
                <div className="sv-key-row sv-key-row-space">
                  <i className="sv-key sv-key-mod" />
                  <i className="sv-key sv-key-mod" />
                  <i className="sv-key sv-key-space" />
                  <i className="sv-key sv-key-mod" />
                  <i className="sv-key sv-key-mod" />
                </div>
              </div>
              <div className="sv-trackpad" />
            </div>
          </div>

          <div className="sv-base">
            <div className="sv-notch" />
          </div>
          <div className="sv-floor" aria-hidden="true" />
        </div>
      </motion.div>

      {stage !== "leave" ? (
        <button type="button" className="sv-skip" onClick={finish}>
          Skip intro <span aria-hidden="true">›</span>
        </button>
      ) : null}
    </motion.div>
  );
}
