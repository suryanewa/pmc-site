"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { ScrollLinkedAirplane } from "./ScrollLinkedAirplane";

// Helper function to interpolate between two hex colors
function interpolateColor(color1: string, color2: string, factor: number): string {
  const r1 = parseInt(color1.slice(1, 3), 16);
  const g1 = parseInt(color1.slice(3, 5), 16);
  const b1 = parseInt(color1.slice(5, 7), 16);
  
  const r2 = parseInt(color2.slice(1, 3), 16);
  const g2 = parseInt(color2.slice(3, 5), 16);
  const b2 = parseInt(color2.slice(5, 7), 16);
  
  const r = Math.round(r1 + (r2 - r1) * factor);
  const g = Math.round(g1 + (g2 - g1) * factor);
  const b = Math.round(b1 + (b2 - b1) * factor);
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

interface TimelineProps {
  data: TimelineEntry[];
  title?: string;
  description?: string;
  showHeader?: boolean;
  className?: string;
  lineColor?: string;
}

export const Timeline = ({
  data,
  title,
  description,
  showHeader = true,
  className = "",
  lineColor = "#41C9C1"
}: TimelineProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [height, setHeight] = useState(0);
  const [titlePositions, setTitlePositions] = useState<number[]>([]);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  useEffect(() => {
    // Calculate positions of each title relative to the timeline container
    const calculatePositions = () => {
      if (ref.current && titleRefs.current.length > 0 && height > 0) {
        const containerRect = ref.current.getBoundingClientRect();
        const positions = titleRefs.current.map((titleRef, index) => {
          if (!titleRef) {
            // Fallback: estimate position based on index
            return (index / data.length) * height * 0.8;
          }
          const titleRect = titleRef.getBoundingClientRect();
          // Get position relative to container top
          const relativeTop = titleRect.top - containerRect.top;
          return relativeTop;
        });
        setTitlePositions(positions);
      }
    };

    // Use requestAnimationFrame to ensure layout is complete
    const timeoutId = setTimeout(calculatePositions, 100);
    
    // Recalculate on resize and scroll (for sticky positioning)
    const handleRecalculate = () => {
      requestAnimationFrame(calculatePositions);
    };
    
    window.addEventListener('resize', handleRecalculate);
    window.addEventListener('scroll', handleRecalculate, { passive: true });
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleRecalculate);
      window.removeEventListener('scroll', handleRecalculate);
    };
  }, [height, data.length]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const dashedLineColor = useTransform(scrollYProgress, [0, 1], ["#DBDBDB", lineColor]);
  const dashedLineGlow = useTransform(scrollYProgress, [0, 1], ["#DBDBDB00", lineColor + "80"]);

  // Helper function to create transform function for a specific title index
  const createTitleColorTransformFn = (index: number) => (latest: number) => {
    if (titlePositions.length === 0 || height === 0 || titlePositions[index] === undefined) return "#DBDBDB";
    
    const normalizedPosition = titlePositions[index] / height;
    const highlightRange = 0.10;
    const highlightStart = Math.max(0, normalizedPosition - highlightRange);
    const highlightEnd = Math.min(1, normalizedPosition + highlightRange);
    
    // Get the next title's position (if it exists)
    const hasNextTitle = index < titlePositions.length - 1 && titlePositions[index + 1] !== undefined;
    const nextTitlePosition = hasNextTitle ? titlePositions[index + 1] / height : 1;
    const nextTitleStart = hasNextTitle ? Math.max(0, nextTitlePosition - highlightRange) : 1;
    
    // Before this title is reached
    if (latest < highlightStart) {
      return "#DBDBDB";
    }
    
    // Approaching this title (fade in)
    if (latest >= highlightStart && latest < normalizedPosition) {
      const progress = (latest - highlightStart) / highlightRange;
      const intensity = Math.max(0, Math.min(1, progress));
      return interpolateColor("#DBDBDB", lineColor, intensity);
    }
    
    // At this title (fully highlighted)
    if (latest >= normalizedPosition && latest < highlightEnd) {
      return lineColor;
    }
    
    // Past this title but before next title starts
    if (latest >= highlightEnd && latest < nextTitleStart) {
      return lineColor;
    }
    
    // Next title is being approached (fade out)
    if (hasNextTitle && latest >= nextTitleStart && latest < nextTitlePosition + highlightRange) {
      const fadeStart = nextTitleStart;
      const fadeEnd = Math.min(1, nextTitlePosition + highlightRange);
      if (latest < fadeEnd) {
        const fadeProgress = (latest - fadeStart) / (fadeEnd - fadeStart);
        const intensity = Math.max(0, Math.min(1, 1 - fadeProgress));
        return interpolateColor("#DBDBDB", lineColor, intensity);
      }
    }
    
    // After next title has been reached (or no next title and we're past the end)
    return "#DBDBDB";
  };

  // Create color transforms for each title at the top level (max 10 titles)
  // All hooks must be called unconditionally
  const titleColor0 = useTransform(scrollYProgress, createTitleColorTransformFn(0));
  const titleColor1 = useTransform(scrollYProgress, createTitleColorTransformFn(1));
  const titleColor2 = useTransform(scrollYProgress, createTitleColorTransformFn(2));
  const titleColor3 = useTransform(scrollYProgress, createTitleColorTransformFn(3));
  const titleColor4 = useTransform(scrollYProgress, createTitleColorTransformFn(4));
  const titleColor5 = useTransform(scrollYProgress, createTitleColorTransformFn(5));
  const titleColor6 = useTransform(scrollYProgress, createTitleColorTransformFn(6));
  const titleColor7 = useTransform(scrollYProgress, createTitleColorTransformFn(7));
  const titleColor8 = useTransform(scrollYProgress, createTitleColorTransformFn(8));
  const titleColor9 = useTransform(scrollYProgress, createTitleColorTransformFn(9));

  const titleColors = [
    titleColor0,
    titleColor1,
    titleColor2,
    titleColor3,
    titleColor4,
    titleColor5,
    titleColor6,
    titleColor7,
    titleColor8,
    titleColor9,
  ];

  return (
    <div
      className={`w-full md:px-10 ${className}`}
      ref={containerRef}
    >
      {showHeader && (title || description) && (
        <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
          {title && (
            <h2 className="text-lg md:text-4xl mb-4 text-[#DBDBDB] max-w-4xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-[#DBDBDB]/70 text-sm md:text-base max-w-sm">
              {description}
            </p>
          )}
        </div>
      )}

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => {
          const titleColor = titleColors[index] || titleColor0; // Fallback to first transform
          
          return (
            <div
              key={index}
              className="flex justify-start pt-10 md:pt-32 md:gap-24"
            >
              <div 
                ref={(el) => {
                  titleRefs.current[index] = el;
                }}
                className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full"
              >
                <motion.h3 
                  className="hidden md:block text-xl md:pl-24 md:text-5xl font-medium" 
                  style={{ 
                    fontFamily: 'var(--font-gotham-medium)',
                    color: titleColor,
                  }}
                >
                  {item.title}
                </motion.h3>
              </div>

              <div className="relative pl-24 pr-4 md:pl-4 w-full">
                <motion.h3 
                  className="md:hidden block text-2xl mb-4 text-left font-medium" 
                  style={{ 
                    fontFamily: 'var(--font-gotham-medium)',
                    color: titleColor,
                  }}
                >
                  {item.title}
                </motion.h3>
                {item.content}{" "}
              </div>
            </div>
          );
        })}
        {/* Static dashed background line */}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 w-[2px] border-l-2 border-dashed border-[#3F3F3F]/60"
        />
        <ScrollLinkedAirplane containerRef={containerRef} trackHeight={height + 40} lineColor={lineColor} />
      </div>
    </div>
  );
};
