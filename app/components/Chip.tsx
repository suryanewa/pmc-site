'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import PixelFillCanvas from './PixelFillCanvas';

interface ChipProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
  variant?: 'outline' | 'filled';
  textColor?: string;
}

// Helper function to convert hex to rgba
function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function Chip({ 
  children, 
  color = '#41C9C1', 
  className = '', 
  variant = 'outline',
  textColor 
}: ChipProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const chipRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (chipRef.current) {
      const rect = chipRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    }
    setIsHovered(true);
  };

  const isFilled = variant === 'filled';
  const backgroundColor = isFilled ? color : hexToRgba(color, 0.2);
  const borderColor = isFilled ? hexToRgba('#3F3F3F', 0.6) : hexToRgba(color, 0.4);
  
  // Handle text color - convert common color names to hex values
  const getTextColor = (colorValue?: string) => {
    if (!colorValue) return '#DBDBDB';
    if (colorValue === 'gray' || colorValue === 'grey') return '#DBDBDB';
    if (colorValue.startsWith('#')) return colorValue;
    return colorValue; // Assume it's a valid CSS color
  };
  
  const defaultTextColor = isFilled ? getTextColor(textColor) : color;
  const hoverTextColor = '#DBDBDB';

  return (
    <motion.span
      ref={chipRef}
      className={`relative overflow-hidden px-4 py-2 text-sm cursor-default ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: '1px',
        borderStyle: 'solid',
      }}
    >
      <PixelFillCanvas
        active={isHovered}
        origin={mousePos}
        color={isFilled ? '#3F3F3F' : color}
        gap={8}
        speed={0.5}
        className="z-0"
        borderRadius={0}
      />
      <span 
        className="relative z-10 transition-colors duration-300" 
        style={{ color: isHovered ? hoverTextColor : defaultTextColor }}
      >
        {children}
      </span>
    </motion.span>
  );
}
