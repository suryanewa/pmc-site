'use client';

import { motion } from 'motion/react';

interface TeamMemberCardProps {
  name: string;
  className?: string;
}

export function TeamMemberCard({ name, className = '' }: TeamMemberCardProps) {
  return (
    <motion.div
      className={`group relative p-6 bg-[#3F3F3F] border border-[#3F3F3F]/60 hover:border-[#41C9C1]/40 transition-colors duration-300 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
    >
      <div className="flex flex-col gap-1">
        <h3 className="text-xl md:text-2xl font-medium text-[#DBDBDB] tracking-[-0.02em] group-hover:text-[#41C9C1] transition-colors duration-300">
          /{name.toLowerCase().replace(/\s+/g, '-')}
        </h3>
      </div>
      
      {/* Decorative accent line on hover */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#41C9C1] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </motion.div>
  );
}
