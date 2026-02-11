'use client';

import { motion } from 'motion/react';
import { useState } from 'react';
import AsciiHoverEffect from '@/components/AsciiHoverEffect';

interface TeamMemberCardProps {
  name: string;
  className?: string;
}

export function TeamMemberCard({ name, className = '' }: TeamMemberCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`group relative overflow-hidden p-6 bg-[#3F3F3F] border border-[#3F3F3F]/60 hover:border-[#41C9C1]/40 transition-colors duration-300 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AsciiHoverEffect
        active={isHovered}
        colors="#41C9C1,rgba(219,219,219,0.7),rgba(63,63,63,0.8)"
        fontSize={10}
        className="opacity-40 mix-blend-screen"
      />

      <div className="relative z-10 flex flex-col gap-1">
        <h3 className="text-xl md:text-2xl font-medium text-[#DBDBDB] tracking-[-0.02em] group-hover:text-[#41C9C1] transition-colors duration-300">
          {name}
        </h3>
      </div>
    </motion.div>
  );
}
