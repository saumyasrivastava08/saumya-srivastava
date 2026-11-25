"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type WandererContextValue = {
  unlocked: boolean[];
  setUnlocked: (next: boolean[]) => void;
  impact: number | null;
  setImpact: (index: number | null) => void;
  /** Projects dossiers revealed once the planet lands on the shelf */
  armed: boolean;
  setArmed: (next: boolean) => void;
  /** Education cards, opened one by one as the spaceship touches each star */
  eduUnlocked: boolean[];
  setEduUnlocked: (next: boolean[]) => void;
  /** The spaceship has flown into the big ship in the background, which then powers up */
  eduDocked: boolean;
  setEduDocked: (next: boolean) => void;
  /** The sun has reached the education section: the big ship scatters in and assembles itself */
  eduBuilt: boolean;
  setEduBuilt: (next: boolean) => void;
  /** The planet has reached the skills sun and ignited it; the worlds appear */
  sunLit: boolean;
  setSunLit: (next: boolean) => void;
  /** The small sun has left the core to travel down to Education: the core in Skills goes dark */
  sunGone: boolean;
  setSunGone: (next: boolean) => void;
  /** Per marker: the planet is sitting on it right now (so the marker hides) */
  perched: boolean[];
  setPerched: (next: boolean[]) => void;
};

const WandererContext = createContext<WandererContextValue | null>(null);

export function WandererProvider({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState([false, false]);
  const [impact, setImpact] = useState<number | null>(null);
  const [armed, setArmed] = useState(false);
  const [perched, setPerched] = useState([false, false]);
  const [sunLit, setSunLit] = useState(false);
  const [sunGone, setSunGone] = useState(false);
  const [eduUnlocked, setEduUnlocked] = useState<boolean[]>([]);
  const [eduDocked, setEduDocked] = useState(false);
  const [eduBuilt, setEduBuilt] = useState(false);

  const value = useMemo(
    () => ({
      unlocked,
      setUnlocked,
      impact,
      setImpact,
      armed,
      setArmed,
      sunLit,
      setSunLit,
      sunGone,
      setSunGone,
      eduUnlocked,
      setEduUnlocked,
      eduDocked,
      setEduDocked,
      eduBuilt,
      setEduBuilt,
      perched,
      setPerched,
    }),
    [unlocked, impact, armed, sunLit, sunGone, eduUnlocked, eduDocked, eduBuilt, perched]
  );

  return <WandererContext.Provider value={value}>{children}</WandererContext.Provider>;
}

export function useWanderer() {
  const ctx = useContext(WandererContext);
  if (!ctx) {
    throw new Error("useWanderer must be used within WandererProvider");
  }
  return ctx;
}

/** Safe outside the homepage (returns null). */
export function useWandererOptional() {
  return useContext(WandererContext);
}
