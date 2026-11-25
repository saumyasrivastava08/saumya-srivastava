"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

const INTERACTIVE = "a, button, [role='button'], summary, label[for], .mission-folder";
const TEXT_FIELD = "input, textarea, select, [contenteditable='true']";

/** A comet: a bright head with a tail that streams out behind whichever way you move. */
export default function CometCursor() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [onText, setOnText] = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const glowX = useSpring(mx, { stiffness: 190, damping: 24, mass: 0.5 });
  const glowY = useSpring(my, { stiffness: 190, damping: 24, mass: 0.5 });

  // Tail points opposite to the direction of travel; its length follows the speed.
  const angleRaw = useMotionValue(180);
  const angle = useSpring(angleRaw, { stiffness: 160, damping: 20, mass: 0.4 });
  const speedRaw = useMotionValue(0);
  const speed = useSpring(speedRaw, { stiffness: 120, damping: 18, mass: 0.4 });
  const tailLength = useTransform(speed, [0, 1], [0.16, 1]);
  const tailOpacity = useTransform(speed, [0, 1], [0.35, 0.95]);

  const last = useRef({ x: 0, y: 0, ready: false });
  const idleTimer = useRef(0);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.documentElement.classList.add("has-comet-cursor");

    const onMove = (event: PointerEvent) => {
      const { clientX, clientY } = event;
      mx.set(clientX);
      my.set(clientY);
      setVisible(true);

      if (last.current.ready) {
        const dx = clientX - last.current.x;
        const dy = clientY - last.current.y;
        const dist = Math.hypot(dx, dy);
        if (dist > 1.2) {
          const desired = (Math.atan2(dy, dx) * 180) / Math.PI + 180;
          const current = angleRaw.get();
          // shortest turn, so the tail never spins the long way round
          angleRaw.set(current + ((((desired - current) % 360) + 540) % 360) - 180);
        }
        speedRaw.set(Math.min(1, dist / 38));
      }
      last.current = { x: clientX, y: clientY, ready: true };

      window.clearTimeout(idleTimer.current);
      idleTimer.current = window.setTimeout(() => speedRaw.set(0), 90);

      const target = event.target as Element | null;
      setHovering(Boolean(target?.closest?.(INTERACTIVE)));
      setOnText(Boolean(target?.closest?.(TEXT_FIELD)));
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      document.documentElement.classList.remove("has-comet-cursor");
      window.clearTimeout(idleTimer.current);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [angleRaw, mx, my, speedRaw]);

  if (!enabled) return null;

  const show = visible && !onText;

  return (
    <div className="comet-cursor-layer" aria-hidden="true">
      <motion.span className="comet-cursor-glow" style={{ x: glowX, y: glowY, opacity: show ? 1 : 0 }} />

      <motion.span className="comet-cursor-tail-anchor" style={{ x: mx, y: my, opacity: show ? 1 : 0 }}>
        <motion.span
          className="comet-cursor-tail"
          style={{ rotate: angle, scaleX: reduceMotion ? 0.2 : tailLength, opacity: tailOpacity }}
        />
      </motion.span>

      <motion.span className="comet-cursor-head-anchor" style={{ x: mx, y: my, opacity: show ? 1 : 0 }}>
        <motion.span
          className={`comet-cursor-head ${hovering ? "is-hover" : ""}`}
          animate={{ scale: pressed ? 0.7 : hovering ? 1.9 : 1 }}
          transition={{ type: "spring", stiffness: 380, damping: 20 }}
        />
      </motion.span>
    </div>
  );
}
