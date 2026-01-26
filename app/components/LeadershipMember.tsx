'use client';

import { motion } from 'framer-motion';

interface LeadershipMemberProps {
  src: string;
  name: string;
  role: string;
  className?: string;
}

export function LeadershipMember({
  src,
  name,
  role,
  className = '',
}: LeadershipMemberProps) {
  return (
    <motion.div
      className={`flex flex-col gap-[14px] w-full ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Image Container */}
      <div className="bg-[#F7F3EE] w-full aspect-[3/4] overflow-hidden flex items-center justify-center">
        {src ? (
          <img
            src={src}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[#F7F3EE]" />
        )}
      </div>

      {/* Name and Role */}
      <div className="text-[#041540] tracking-[-0.02em]">
        <p className="text-lg md:text-xl font-medium leading-tight">/{name}</p>
        <p className="text-lg md:text-xl text-[#041540]/60 leading-tight">/{role}</p>
      </div>
    </motion.div>
  );
}
