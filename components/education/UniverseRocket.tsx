import type { CSSProperties } from "react";

/** Where a loose part starts (rem away from its place, degrees of spin) and when it flies in (s). */
function part(sx: number, sy: number, sr: number, delay: number): CSSProperties {
  return {
    "--sx": `${sx}rem`,
    "--sy": `${sy}rem`,
    "--sr": `${sr}deg`,
    "--bd": `${delay}s`,
  } as CSSProperties;
}

/** an ogive (rocket-nose) outline as a clip-path, tip at the top */
function ogive(): string {
  const steps = [0.04, 0.1, 0.18, 0.28, 0.4, 0.54, 0.7, 0.85, 1];
  const half = steps.map((t) => 50 * (1 - Math.pow(1 - t, 2.2)));
  const right = steps.map((t, i) => `${(50 + half[i]).toFixed(1)}% ${(t * 100).toFixed(1)}%`);
  const left = steps.map((t, i) => `${(50 - half[i]).toFixed(1)}% ${(t * 100).toFixed(1)}%`).reverse();
  return `polygon(50% 0%, ${right.join(", ")}, ${left.join(", ")})`;
}

const NOSE_CLIP = ogive();

export type RocketWindow = "btech" | "senior-secondary" | "secondary";

/** the three portholes carry the education details, one per planet */
const WINDOWS: Array<{ id: RocketWindow; tone: string; lines: string[] }> = [
  { id: "btech", tone: "cyan", lines: ["B.Tech", "Computer Science"] },
  { id: "senior-secondary", tone: "violet", lines: ["Senior Secondary"] },
  { id: "secondary", tone: "lavender", lines: ["Secondary"] },
];
/**
 * The same coded rocket as the homepage — flat navy hull, pink nose cone, swept purple fins, ribbed engine
 * skirt, nozzle and exhaust — standing upright, and built from loose parts that fly in and assemble.
 * It has exactly three fins: two swept side fins and one facing us.
 */
export default function UniverseRocket({ lit }: { lit: string | null }) {
  return (
    <div className="uni-ship" role="img" aria-label="A rocket pointing upwards">
      {/* exhaust (behind everything) */}
      <div className="uni-exhaust" aria-hidden="true">
        <span className="uni-exhaust-glow" />
        <span className="uni-flame-out" />
        <span className="uni-flame-in" />
        <i style={{ "--i": 0 } as CSSProperties} />
        <i style={{ "--i": 1 } as CSSProperties} />
        <i style={{ "--i": 2 } as CSSProperties} />
        <i style={{ "--i": 3 } as CSSProperties} />
      </div>

      {/* the two swept side fins */}
      <span className="uni-p uni-fin uni-fin-l" style={part(-20, -8, -140, 0.95)} aria-hidden="true">
        <i />
      </span>
      <span className="uni-p uni-fin uni-fin-r" style={part(20, -8, 140, 0.95)} aria-hidden="true">
        <i />
      </span>

      {/* nozzle */}
      <span className="uni-p uni-nozzle" style={part(-12, 22, 80, 0.7)} aria-hidden="true">
        <i />
      </span>

      {/* hull */}
      <div className="uni-p uni-hull" style={part(-12, 18, -30, 0.1)}>
        <span className="uni-p uni-band" style={part(-6, 2, -8, 1.3)} aria-hidden="true" />
        {WINDOWS.map((w, i) => (
          <span
            key={w.id}
            className={`uni-p uni-window uni-window-${i} tone-${w.tone} ${lit === w.id ? "is-lit" : ""}`}
            style={part(0, -4, 0, 1.6 + i * 0.15)}
            aria-hidden="true"
          >
            <span className="uni-window-glass" />
            <span className="uni-window-copy">
              {w.lines.map((line, n) => (n === 0 ? <b key={n}>{line}</b> : <i key={n}>{line}</i>))}
            </span>
          </span>
        ))}
        <span className="uni-p uni-skirt" style={part(0, 10, 0, 1.3)} aria-hidden="true" />
      </div>

      {/* nose cone */}
      <span className="uni-p uni-nose" style={part(8, -22, 50, 0.4)} aria-hidden="true">
        <i style={{ clipPath: NOSE_CLIP }} />
      </span>

      {/* the third fin: faces us, in front of the tail */}
      <span className="uni-p uni-fin uni-fin-c" style={part(0, 18, 100, 0.95)} aria-hidden="true">
        <i />
      </span>
    </div>
  );
}



