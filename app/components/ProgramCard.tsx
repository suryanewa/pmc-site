'use client';

import { motion } from 'motion/react';
import { useState } from 'react';
import { Button } from './Button';
import AsciiHoverEffect from '@/components/AsciiHoverEffect';

interface ProgramCardProps {
  title: string;
  description: string;
  accentColor: string;
  learnMoreHref: string;
  applyHref?: string;
}

export function ProgramCard({
  title,
  description,
  accentColor,
  learnMoreHref,
  applyHref,
}: ProgramCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative bg-[#3F3F3F] rounded-[20px] overflow-hidden flex flex-col"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AsciiHoverEffect
        active={isHovered}
        colors={`${accentColor},rgba(219,219,219,0.7),rgba(63,63,63,0.8)`}
        fontSize={10}
        className="opacity-40 mix-blend-screen"
      />
      {/* Colored Header */}
      <div
        className="relative z-10 h-[112px] flex items-center justify-center"
        style={{ backgroundColor: accentColor }}
      >
        <h3 className="text-[36px] font-bold text-[#DBDBDB] tracking-[-0.075em]">
          {title}
        </h3>
      </div>

      {/* Body */}
      <div className="relative z-10 p-8 flex flex-col flex-1">
        <p className="text-[18px] font-medium text-[#DBDBDB]/80 tracking-[-0.02em] leading-relaxed mb-8 flex-1">
          {description}
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-4 items-center">
          <Button
            href={learnMoreHref}
            size="lg"
            fillColor={accentColor}
            rippleColor={accentColor}
            className="w-[254px]"
          >
            Learn More
          </Button>
          <Button
            href={applyHref || '#'}
            size="lg"
            borderColor={accentColor}
            rippleColor={accentColor}
            className="w-[254px]"
          >
            Apply Now
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
