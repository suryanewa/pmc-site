"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "../../hooks/use-is-mobile";

export function GsapScrollEffects() {
  const isMobile = useIsMobile();

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || isMobile) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const parallaxEls = gsap.utils.toArray<HTMLElement>(
        '[data-gsap="parallax"]'
      );

      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.dataset.speed || "0.1");

        gsap.to(el, {
          yPercent: speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
            fastScrollEnd: true,
          },
        });
        });
    });

    return () => ctx.revert();
  }, [isMobile]);

  return null;
}
