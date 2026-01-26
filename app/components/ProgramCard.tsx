'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
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
      className="bg-white rounded-[20px] overflow-hidden flex flex-col"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Colored Header */}
      <div
        className="h-[112px] flex items-center justify-center"
        style={{ backgroundColor: accentColor }}
      >
        <h3 className="text-[36px] font-bold text-white tracking-[-0.075em]">
          {title}
        </h3>
      </div>

      {/* Body */}
      <div className="p-8 flex flex-col flex-1">
        <p className="text-[18px] font-medium text-black tracking-[-0.02em] leading-relaxed mb-8 flex-1">
          {description}
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-4 items-center w-full">
          <Link href={learnMoreHref} className="w-full max-w-[254px]">
            <Button
              size="lg"
              fillColor={accentColor}
              className="w-full"
            >
              Learn More
            </Button>
          </Link>
          {applyHref ? (
            <Link href={applyHref} className="w-full max-w-[254px]">
              <Button
                size="lg"
                borderColor={accentColor}
                className="w-full"
              >
                Apply Now
              </Button>
            </Link>
          ) : (
            <Button
              size="lg"
              borderColor={accentColor}
              className="w-full max-w-[254px]"
            >
              Apply Now
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
