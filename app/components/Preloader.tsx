"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

const PRELOADER_SHOWN_KEY = "eeg_preloader_shown";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if preloader was already shown this session
    if (typeof window !== "undefined") {
      const alreadyShown = sessionStorage.getItem(PRELOADER_SHOWN_KEY);
      if (alreadyShown) {
        setIsLoading(false);
        return;
      }
    }

    // Simulate loading progress
    const duration = 1800; // Total duration in ms
    const interval = 20; // Update interval
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      // Eased progress (slow start, fast middle, slow end)
      const linearProgress = currentStep / steps;
      const easedProgress = 1 - Math.pow(1 - linearProgress, 3);
      setProgress(Math.min(easedProgress * 100, 100));

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setIsLoading(false);
          if (typeof window !== "undefined") {
            sessionStorage.setItem(PRELOADER_SHOWN_KEY, "true");
          }
        }, 200);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12"
          >
            <Image
              src="/pmc-logo.svg"
              alt="PMC logo"
              width={30}
              height={14}
              className="h-10 w-auto"
              priority
            />
          </motion.div>

          {/* Progress bar container */}
          <div className="w-48 h-[2px] bg-[#3F3F3F]/60 overflow-hidden">
            <motion.div
              className="h-full bg-[#41C9C1]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Progress text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-xs tracking-[0.3em] uppercase text-[#DBDBDB]/60 font-mono"
          >
            {Math.round(progress)}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
