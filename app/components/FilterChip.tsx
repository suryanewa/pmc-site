'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface FilterChipProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

export function FilterChip({ label, isActive, onClick, className }: FilterChipProps) {
  return (
    <motion.button
      onClick={onClick}
      type="button"
      className={cn(
        'relative inline-flex items-center justify-center px-4 py-2 text-sm font-medium border overflow-hidden cursor-pointer transition-colors duration-200',
        'border-[#3F3F3F]/60 text-[#DBDBDB]/70 bg-transparent',
        isActive && 'border-[#41C9C1] text-[#DBDBDB] bg-[#41C9C1]/10',
        'hover:border-[#41C9C1] hover:text-[#DBDBDB]',
        className
      )}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="relative z-10">{label}</span>
    </motion.button>
  );
}
