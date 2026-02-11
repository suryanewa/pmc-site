"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "../../hooks/use-is-mobile";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isMobile || prefersReducedMotion) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    // RAF loop
    let rafId: number | null = null;
    let isActive = true;
    let isVisible = document.visibilityState === "visible";

    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === "visible";
      if (isVisible && isActive && rafId === null) {
        rafId = requestAnimationFrame(raf);
      }
    };

    function raf(time: number) {
      if (!isActive) return;
      if (!isVisible) {
        rafId = null;
        return;
      }
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    rafId = requestAnimationFrame(raf);

    // Cleanup
    return () => {
      isActive = false;
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (rafId !== null) cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [isMobile]);

  return <>{children}</>;
}
