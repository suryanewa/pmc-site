"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useMemo } from "react";

interface ScrollLinkedAirplaneProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  trackHeight: number;
  lineColor?: string;
  className?: string;
}

// Helper function to convert hex to rgba
function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function ScrollLinkedAirplane({
  containerRef,
  trackHeight,
  lineColor = "#41C9C1",
  className = "",
}: ScrollLinkedAirplaneProps) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const progressHeight = useTransform(scrollYProgress, [0, 1], [0, trackHeight]);
  // Trim just a small amount so the trail doesn't peek above the plane.
  // (Subtracting the full plane offset makes the trail feel too short.)
  const TRAIL_TIP_TRIM_PX = 10;
  const trailHeight = useTransform(progressHeight, (v) =>
    Math.max(0, v - TRAIL_TIP_TRIM_PX),
  );
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1], { clamp: true });
  
  // Trail opacity fades in with the plane
  const trailOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1], { clamp: true });

  // Create gradient string with proper rgba colors
  const trailGradient = useMemo(() => {
    return `linear-gradient(to top, 
      ${hexToRgba(lineColor, 1)} 0%, 
      ${hexToRgba(lineColor, 0.95)} 10%, 
      ${hexToRgba(lineColor, 0.85)} 25%, 
      ${hexToRgba(lineColor, 0.7)} 45%, 
      ${hexToRgba(lineColor, 0.5)} 65%, 
      ${hexToRgba(lineColor, 0.3)} 80%, 
      ${hexToRgba(lineColor, 0.1)} 92%, 
      transparent 100%)`;
  }, [lineColor]);

  return (
    <>
      {/* Gradient trail behind the plane */}
      <motion.div
        className="absolute pointer-events-none z-40"
        style={{
          top: 0,
          left: "32px",
          width: "2px",
          height: trailHeight,
          opacity: trailOpacity,
          background: trailGradient,
          boxShadow: `0 0 12px ${hexToRgba(lineColor, 0.4)}, 0 0 6px ${hexToRgba(lineColor, 0.2)}`,
        }}
      />
      
      {/* Plane */}
      <motion.div
        className={`absolute pointer-events-none z-50 ${className}`}
        style={{
          top: 0,
          y: progressHeight,
          left: "33px",
          opacity,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill={lineColor}
          stroke="none"
          className="rotate-90"
          style={{ 
            marginLeft: "-24px",
            marginTop: "-48px",
          }}
        >
          <path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z" />
        </svg>
      </motion.div>
    </>
  );
}

export default ScrollLinkedAirplane;
