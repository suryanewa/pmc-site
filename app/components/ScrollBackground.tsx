"use client";

import { motion } from "framer-motion";

export function ScrollBackground() {
  
  return (
    <>
      {/* Main animated background */}
      <motion.div
        className="fixed inset-0 -z-20 transition-colors duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ backgroundColor: "var(--scroll-background, #F7F3EE)" }}
      />
      
      {/* Subtle noise texture overlay */}
      <motion.div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{ opacity: 0.02 }}
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
