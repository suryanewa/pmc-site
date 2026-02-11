"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import { Countdown } from "./Countdown";

// Helper function to convert hex to rgba
function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function ApplicationsCountdown({ accentColor = "#41C9C1" }: { accentColor?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dateRef = useRef<HTMLSpanElement>(null);
  const countdownRef = useRef<HTMLDivElement>(null);
  const width = useMotionValue(0);
  const springWidth = useSpring(width, { stiffness: 300, damping: 30 });
  const [dateWidth, setDateWidth] = useState(0);
  const [countdownWidth, setCountdownWidth] = useState(0);
  
  // Set target date to February 8th of the current year (or next year if already passed)
  const getTargetDate = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const targetDate = new Date(currentYear, 1, 8); // Month is 0-indexed, so 1 = February
    
    // If February 8th has already passed this year, use next year
    if (targetDate < now) {
      return new Date(currentYear + 1, 1, 8);
    }
    
    return targetDate;
  };

  const targetDate = useMemo(() => getTargetDate(), []);
  const color = accentColor;

  const calculateTimeLeft = useCallback(() => {
    const difference = +targetDate - +new Date();
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft());

  useEffect(() => {
    const measureWidths = () => {
      if (dateRef.current) {
        const nextDateWidth = dateRef.current.offsetWidth;
        setDateWidth((prev) => (prev === nextDateWidth ? prev : nextDateWidth));
      }
      if (countdownRef.current) {
        const nextCountdownWidth = countdownRef.current.offsetWidth;
        setCountdownWidth((prev) => (prev === nextCountdownWidth ? prev : nextCountdownWidth));
      }
    };

    measureWidths();

    const observer = new ResizeObserver(measureWidths);
    if (dateRef.current) observer.observe(dateRef.current);
    if (countdownRef.current) observer.observe(countdownRef.current);

    window.addEventListener('resize', measureWidths, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measureWidths);
    };
  }, []);

  // Update width immediately when index changes using pre-measured widths
  useEffect(() => {
    const targetWidth = currentIndex === 0 ? dateWidth : countdownWidth;
    if (targetWidth > 0) {
      width.set(targetWidth);
    }
  }, [currentIndex, dateWidth, countdownWidth, width]);

  // Rotate between the two states with different durations
  useEffect(() => {
    const getDuration = (index: number) => {
      return index === 0 ? 5000 : 10000; // Date: 5s, Countdown: 10s
    };

    const timeout = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % 2);
    }, getDuration(currentIndex));

    return () => clearTimeout(timeout);
  }, [currentIndex]);

  // Update countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (newTimeLeft.days === 0 && newTimeLeft.hours === 0 && newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  // If countdown has ended, show a message
  if (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
    return (
      <div 
        className="inline-flex items-center px-4 h-[46px] text-xs font-medium uppercase tracking-[0.2em]"
        style={{
          backgroundColor: color,
          borderColor: hexToRgba('#3F3F3F', 0.6),
          borderWidth: '1px',
          borderStyle: 'solid',
          color: '#DBDBDB',
        }}
      >
        Applications Open Now
      </div>
    );
  }

  const chipStyle = {
    backgroundColor: color,
    borderColor: hexToRgba('#3F3F3F', 0.6),
    borderWidth: '1px',
    borderStyle: 'solid',
    color: '#DBDBDB',
  };

  return (
    <motion.div 
      className="relative overflow-hidden inline-flex items-center px-4 h-[46px] text-xs font-medium uppercase tracking-[0.2em] cursor-default"
      style={chipStyle}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="relative z-10 text-[#DBDBDB]">
        Applications Open
      </span>
      <span className="mx-0.5 relative z-10"> </span>
      <motion.div 
        className="relative overflow-hidden inline-flex items-center h-[1.5em] z-10"
        style={{ width: springWidth }}
      >
        {/* Hidden measurement elements - always rendered */}
        <span
          ref={dateRef}
          className="whitespace-nowrap absolute opacity-0 pointer-events-none -z-10"
          aria-hidden="true"
        >
          February 8th
        </span>
        <div
          ref={countdownRef}
          className="flex items-center gap-0.5 text-xs tabular-nums font-medium uppercase tracking-[0.2em] absolute opacity-0 pointer-events-none -z-10"
          aria-hidden="true"
        >
          <Countdown value={timeLeft.days} padStart={true} />
          <span className="text-[#DBDBDB]/60">:</span>
          <Countdown value={timeLeft.hours} padStart={true} />
          <span className="text-[#DBDBDB]/60">:</span>
          <Countdown value={timeLeft.minutes} padStart={true} />
          <span className="text-[#DBDBDB]/60">:</span>
          <Countdown value={timeLeft.seconds} padStart={true} />
        </div>
        
        <AnimatePresence mode="wait">
          {currentIndex === 0 ? (
            <motion.span
              key="static"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="whitespace-nowrap"
            >
              February 8th
            </motion.span>
          ) : (
            <motion.div
              key="countdown"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="flex items-center gap-0.5 text-xs tabular-nums font-medium uppercase tracking-[0.2em]"
            >
              <Countdown value={timeLeft.days} padStart={true} />
              <span className="text-[#DBDBDB]/60">:</span>
              <Countdown value={timeLeft.hours} padStart={true} />
              <span className="text-[#DBDBDB]/60">:</span>
              <Countdown value={timeLeft.minutes} padStart={true} />
              <span className="text-[#DBDBDB]/60">:</span>
              <Countdown value={timeLeft.seconds} padStart={true} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
