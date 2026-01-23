"use client";

import { useScroll, useTransform, motion } from "framer-motion";

export function ScrollBackground() {
  const { scrollYProgress } = useScroll();
  
  // Background color transitions based on scroll position
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      "#F7F3EE", // Hero - warm cream
      "#F7F3EE", // Programs - same
      "#FFFFFF", // Events - pure white
      "#F7F3EE", // Back to cream
      "#F7F3EE", // Footer area
    ]
  );

  // Subtle overlay opacity that changes with scroll
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    [0, 0.02, 0.01, 0]
  );

  return (
    <>
      {/* Main animated background */}
      <motion.div
        className="fixed inset-0 -z-20 transition-colors duration-700"
        style={{ backgroundColor }}
      />
      
      {/* Subtle noise texture overlay */}
      <motion.div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{ opacity: overlayOpacity }}
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            opacity: 0.4,
          }}
        />
      </motion.div>
    </>
  );
}
