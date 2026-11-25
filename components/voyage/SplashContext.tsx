"use client";

import { createContext, useContext, type ReactNode } from "react";

/** True once the "Welcome to Saumyaverse" opening has finished (or when there is none). */
const SplashContext = createContext<boolean>(true);

export function SplashProvider({ done, children }: { done: boolean; children: ReactNode }) {
  return <SplashContext.Provider value={done}>{children}</SplashContext.Provider>;
}

export function useSplashDone() {
  return useContext(SplashContext);
}
