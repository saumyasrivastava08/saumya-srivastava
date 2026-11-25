/**
 * The spaceship, drawn in the portfolio's own palette (deep navy hull, lilac / cyan / pink
 * accents) and pointing right. `id` keeps gradient ids unique when it is used more than once.
 */
export default function ShipArt({
  id = "wp-ship",
  flame = true,
  className,
}: {
  id?: string;
  flame?: boolean;
  className?: string;
}) {
  return (
    <svg className={className} viewBox="0 0 110 56" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-hull`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5a5fc4" />
          <stop offset="0.5" stopColor="#2b3180" />
          <stop offset="1" stopColor="#141a48" />
        </linearGradient>
        <linearGradient id={`${id}-nose`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f9a8d4" />
          <stop offset="1" stopColor="#c6a5ff" />
        </linearGradient>
        <linearGradient id={`${id}-fin`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7a5be0" />
          <stop offset="1" stopColor="#c6a5ff" />
        </linearGradient>
        <linearGradient id={`${id}-flame`} x1="1" y1="0" x2="0" y2="0">
          <stop offset="0" stopColor="#c8f1ff" />
          <stop offset="0.5" stopColor="#7dd3fc" />
          <stop offset="1" stopColor="#8b5cf6" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${id}-glass`} cx="35%" cy="30%" r="80%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.35" stopColor="#bdeeff" />
          <stop offset="1" stopColor="#3b82c4" />
        </radialGradient>
      </defs>

      {flame ? (
        <g className="wp-ship-flame">
          <path d="M20 21 Q-2 28 20 35 Z" fill={`url(#${id}-flame)`} />
          <path d="M20 24 Q7 28 20 32 Z" fill="#f2fbff" />
        </g>
      ) : null}

      {/* swept fins (behind the hull) */}
      <path d="M34 17 L15 3 L27 4 L53 17 Z" fill={`url(#${id}-fin)`} stroke="rgba(125,211,252,0.7)" strokeWidth="0.7" />
      <path d="M34 39 L15 53 L27 52 L53 39 Z" fill={`url(#${id}-fin)`} stroke="rgba(125,211,252,0.7)" strokeWidth="0.7" />

      {/* engine nozzle */}
      <path d="M22 20 L16 18 L16 38 L22 36 Z" fill="#0f1438" stroke="rgba(198,165,255,0.6)" strokeWidth="0.7" />

      {/* hull */}
      <path
        d="M22 17 H66 C84 17 98 23 106 28 C98 33 84 39 66 39 H22 Q19 39 19 36 V20 Q19 17 22 17 Z"
        fill={`url(#${id}-hull)`}
        stroke="rgba(198,165,255,0.75)"
        strokeWidth="0.9"
      />
      {/* soft light along the top edge */}
      <path d="M24 19 H66 C80 19 91 23 99 26.4 C88 23.6 78 21.6 66 21.6 H24 Z" fill="rgba(255,255,255,0.16)" />
      {/* nose cone */}
      <path d="M78 17.6 C90 19 99 23.5 106 28 C99 32.5 90 37 78 38.4 Z" fill={`url(#${id}-nose)`} />
      {/* hull bands */}
      <path d="M30 17 V39 M36 17 V39" stroke="rgba(125,211,252,0.6)" strokeWidth="1.2" />
      {/* portholes */}
      <circle cx="48" cy="28" r="5.2" fill={`url(#${id}-glass)`} stroke="#c6a5ff" strokeWidth="1.2" />
      <circle cx="64" cy="28" r="4.2" fill={`url(#${id}-glass)`} stroke="#c6a5ff" strokeWidth="1.1" />
    </svg>
  );
}
