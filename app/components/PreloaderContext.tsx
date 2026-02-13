"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface PreloaderContextValue {
  isPreloaderComplete: boolean;
  setPreloaderComplete: (complete: boolean) => void;
}

const PreloaderContext = createContext<PreloaderContextValue | undefined>(undefined);

export function PreloaderProvider({ children }: { children: ReactNode }) {
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);

  // Sync with sessionStorage after hydration to avoid server/client mismatch
  useEffect(() => {
    if (sessionStorage.getItem("eeg_preloader_shown") !== null) {
      setIsPreloaderComplete(true);
    }
  }, []);

  return (
    <PreloaderContext.Provider
      value={{
        isPreloaderComplete,
        setPreloaderComplete: setIsPreloaderComplete,
      }}
    >
      {children}
    </PreloaderContext.Provider>
  );
}

export function usePreloaderComplete() {
  const context = useContext(PreloaderContext);
  if (context === undefined) {
    throw new Error("usePreloaderComplete must be used within PreloaderProvider");
  }
  return context;
}
