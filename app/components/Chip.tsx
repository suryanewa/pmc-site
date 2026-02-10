'use client';

import { motion } from 'framer-motion';

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

  return (
    <motion.span
      className={`relative overflow-hidden px-4 py-2 text-sm cursor-default ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: '1px',
        borderStyle: 'solid',
      }}
    >
      <span 
        className="relative z-10" 
        style={{ color: defaultTextColor }}
      >
        {children}
      </span>
    </motion.span>
  );
}
