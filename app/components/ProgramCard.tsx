'use client';

import { motion } from 'framer-motion';
import { Button } from './Button';

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
  return (
    <motion.div
      className="bg-[#3F3F3F] rounded-[20px] overflow-hidden flex flex-col"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Colored Header */}
      <div
        className="h-[112px] flex items-center justify-center"
        style={{ backgroundColor: accentColor }}
      >
        <h3 className="text-[36px] font-bold text-[#DBDBDB] tracking-[-0.075em]">
          {title}
        </h3>
      </div>

      {/* Body */}
      <div className="p-8 flex flex-col flex-1">
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
