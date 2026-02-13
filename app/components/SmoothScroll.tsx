"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "../../hooks/use-is-mobile";
import { usePreloaderComplete } from "./PreloaderContext";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const isMobile = useIsMobile();
  const { isPreloaderComplete } = usePreloaderComplete();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!isPreloaderComplete) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isMobile || prefersReducedMotion) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Throttle ScrollTrigger updates to ~60fps to prevent excessive work
    let lastScrollUpdate = 0;
    const throttledScrollUpdate = () => {
      const now = performance.now();
      if (now - lastScrollUpdate > 16) {
        // ~60fps throttle
        ScrollTrigger.update();
        lastScrollUpdate = now;
      }
    };

    lenis.on("scroll", throttledScrollUpdate);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        lenis.stop();
      } else {
        lenis.start();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      gsap.ticker.remove(tickerCallback);
      lenis.off("scroll", throttledScrollUpdate);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [isMobile, isPreloaderComplete]);

  return <>{children}</>;
}
