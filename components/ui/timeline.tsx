"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { Compass } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";


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

const DIM_TEXT = "#DBDBDB";

function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}

function parseRgb(value: string): [number, number, number] {
  const normalized = value.startsWith("#") ? value.slice(1) : value;
  const hex = normalized.length === 3
    ? `${normalized[0]}${normalized[0]}${normalized[1]}${normalized[1]}${normalized[2]}${normalized[2]}`
    : normalized;

  return [
    parseInt(hex.slice(0, 2), 16),
    parseInt(hex.slice(2, 4), 16),
    parseInt(hex.slice(4, 6), 16),
  ];
}

function interpolateColor(color1: string, color2: string, ratio: number): string {
  const [r1, g1, b1] = parseRgb(color1);
  const [r2, g2, b2] = parseRgb(color2);
  const t = clamp01(ratio);
  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

function TimelineItem({
  item,
  start,
  nextStart,
  color,
  iconLeft,
  scrollProgress,
  rowRef,
}: {
  item: TimelineEntry;
  start: number;
  nextStart: number;
  color: string;
  iconLeft: number;
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  rowRef: (element: HTMLDivElement | null) => void;
}) {
  const leadInStart = clamp01(start - 0.1);
  const leadInEnd = clamp01(start - 0.04);
  const activeStart = clamp01(start - 0.01);
  const activeEnd = clamp01(nextStart - 0.01);
  const leadOutEnd = clamp01(nextStart + 0.1);

  const titleColor = useTransform(scrollProgress, (value) => {
    if (value <= leadInStart || value >= leadOutEnd) return DIM_TEXT;
    if (value < leadInEnd) {
      return interpolateColor(DIM_TEXT, color, (value - leadInStart) / (leadInEnd - leadInStart || 1));
    }
    if (value <= activeEnd) {
      return color;
    }
    if (value < leadOutEnd) {
      return interpolateColor(color, DIM_TEXT, (value - activeEnd) / (leadOutEnd - activeEnd || 1));
    }
    return DIM_TEXT;
  });

  const rowOpacity = useTransform(scrollProgress, (value) => {
    const enter = clamp01((value - leadInStart) / (activeStart - leadInStart || 1));
    const leave = clamp01((leadOutEnd - value) / (leadOutEnd - activeEnd || 1));
    return clamp01(Math.min(enter, leave));
  });

  const rowTranslate = useTransform(rowOpacity, [0, 1], [12, 0]);

  const markerScale = useTransform(
    scrollProgress,
    [leadInStart, activeStart, clamp01(activeStart + 0.02), activeEnd, leadOutEnd],
    [0.6, 0.85, 1, 0.85, 0.6],
  );

  return (
    <div
      ref={rowRef}
      className="flex justify-start pt-10 md:pt-32 md:gap-24"
    >
      <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
        <motion.div
          className="hidden md:flex items-center justify-center absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            left: iconLeft,
            color: titleColor,
            scale: markerScale,
            opacity: rowOpacity,
          }}
        >
          <Compass size={45} strokeWidth={1.5} />
        </motion.div>

        <motion.h3
          className="hidden md:block text-xl md:pl-24 md:text-5xl font-medium text-left"
          style={{
            fontFamily: "var(--font-gotham-medium)",
            color: titleColor,
            opacity: rowOpacity,
            y: rowTranslate,
          }}
        >
          {item.title}
        </motion.h3>
      </div>

      <motion.div
        className="relative pl-24 pr-4 md:pl-4 w-full"
        style={{
          opacity: rowOpacity,
          y: rowTranslate,
        }}
      >
        <motion.h3
          className="md:hidden block text-2xl mb-4 text-left font-medium"
          style={{
            fontFamily: "var(--font-gotham-medium)",
            color: titleColor,
          }}
        >
          {item.title}
        </motion.h3>

        <motion.div style={{ color: titleColor }}>
          {item.content}
        </motion.div>
      </motion.div>
    </div>
  );
}

export const Timeline = ({
  data,
  title,
  description,
  showHeader = true,
  className = "",
  lineColor = "#41C9C1",
}: TimelineProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [titlePositions, setTitlePositions] = useState<number[]>([]);
  const [iconLeft, setIconLeft] = useState(0);
  const [trackHeight, setTrackHeight] = useState(0);
  const dataLength = data.length;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 10%", "end 50%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], [0, trackHeight]);

  const setRowRef = useCallback((index: number) => {
    return (element: HTMLDivElement | null) => {
      titleRefs.current[index] = element;
    };
  }, []);

  const measure = useCallback(() => {
    if (!trackRef.current) {
      return;
    }

    const rect = trackRef.current.getBoundingClientRect();
    const nextHeight = rect.height;

    const dashedLineViewportX = rect.left + 32;
    const centerX = dashedLineViewportX / 2;
    const centerRelativeToRow = centerX - rect.left - 10;
    setIconLeft((prev) => (Math.abs(prev - centerRelativeToRow) < 1 ? prev : centerRelativeToRow));
    setTrackHeight((prev) => (Math.abs(prev - nextHeight) < 0.5 ? prev : nextHeight));

    const fallback = Array.from({ length: dataLength }, (_, index) => {
      const divisor = Math.max(dataLength - 1, 1);
      return index / divisor;
    });

    const nextPositions = titleRefs.current.slice(0, dataLength).map((titleRef, index) => {
      if (!titleRef || !nextHeight) {
        return fallback[index] ?? 0;
      }

      const titleRect = titleRef.getBoundingClientRect();
      const midpoint = titleRect.top - rect.top + titleRect.height * 0.55;
      return clamp01(midpoint / nextHeight);
    });

    setTitlePositions((prev) => {
      if (
        prev.length === nextPositions.length
        && prev.every((value, index) => Math.abs(value - (nextPositions[index] ?? 0)) < 0.001)
      ) {
        return prev;
      }

      return nextPositions;
    });
  }, [dataLength]);

  useEffect(() => {
    measure();

    const node = trackRef.current;
    if (!node) {
      return;
    }

    let animationFrame: number | null = null;
    const schedule = () => {
      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
      }

      animationFrame = requestAnimationFrame(measure);
    };

    const observer = new ResizeObserver(schedule);
    observer.observe(node);
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", schedule);
      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [measure]);

  const fallbackStops = Array.from({ length: dataLength }, (_, index) => {
    const divisor = Math.max(dataLength - 1, 1);
    return index / divisor;
  });

  const stops = titlePositions.length === dataLength ? titlePositions : fallbackStops;

  return (
    <div className={`w-full md:px-10 ${className}`} ref={sectionRef}>
      {showHeader && (title || description) && (
        <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
          {title && (
            <h2 className="text-lg md:text-4xl mb-4 text-[#DBDBDB] max-w-4xl">{title}</h2>
          )}
          {description && (
            <p className="text-[#DBDBDB]/70 text-sm md:text-base max-w-sm">{description}</p>
          )}
        </div>
      )}

      <div ref={trackRef} className="relative max-w-7xl mx-auto pb-20">
        <div className="relative">
          <motion.div
            className="absolute left-[31px] top-0 w-[3px] rounded-full"
            style={{
              height: lineHeight,
              background: `linear-gradient(to bottom, ${lineColor}, ${lineColor}dd, ${lineColor}88)`,
              boxShadow: `0 0 12px ${lineColor}88, 0 0 4px ${lineColor}55`,
            }}
          />

          <div className="relative px-2">
            {data.map((item, index) => {
              const start = stops[index] ?? 0;
              const nextStart = stops[index + 1] ?? 1;

              return (
                <TimelineItem
                  key={`${item.title}-${index}`}
                  item={item}
                  start={start}
                  nextStart={nextStart}
                  color={lineColor}
                  iconLeft={iconLeft}
                  scrollProgress={scrollYProgress}
                  rowRef={setRowRef(index)}
                />
              );
            })}
          </div>


        </div>
      </div>
    </div>
  );
};
