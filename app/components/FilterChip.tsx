'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import PixelFillCanvas from './PixelFillCanvas';
import { cn } from '@/lib/utils';

interface FilterChipProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

export function FilterChip({ label, isActive, onClick, className }: FilterChipProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [pixelActive, setPixelActive] = useState(false);
  const chipRef = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (chipRef.current) {
      const rect = chipRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    }
    setIsHovered(true);
  };

  // Drive the pixel fill from local state that always starts as false,
  // so initial "selected" chips still trigger the fill animation.
  useEffect(() => {
    const nextActive = isActive || isHovered;
    // Defer the update to the next paint to avoid synchronous setState in an effect body
    // while still producing the initial inactive -> active transition for the canvas animation.
    const raf = requestAnimationFrame(() => setPixelActive(nextActive));
    return () => cancelAnimationFrame(raf);
  }, [isActive, isHovered]);

  const visualActive = isActive || isHovered;

  return (
    <motion.button
      ref={chipRef}
      onClick={onClick}
      type="button"
      className={cn(
        'relative inline-flex items-center justify-center px-4 py-2 text-sm font-medium border overflow-hidden cursor-pointer transition-colors duration-200',
        'border-[#3F3F3F]/60 text-[#DBDBDB]/70 bg-transparent',
        visualActive && 'border-[#41C9C1] text-[#DBDBDB]',
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
    >
      <PixelFillCanvas
        active={pixelActive}
        origin={mousePos}
        color="#41C9C1"
        gap={10}
        speed={0.45}
        className="z-0"
        borderRadius={0}
      />
      <span className="relative z-10">{label}</span>
    </motion.button>
  );
}
