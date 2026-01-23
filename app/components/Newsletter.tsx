'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface NewsletterProps {
  variant?: 'light' | 'dark';
}

export function Newsletter({ variant = 'light' }: NewsletterProps) {
  const isLight = variant === 'light';
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <form className="flex flex-col sm:flex-row gap-3">
      <motion.div
        className="relative"
        animate={{ scale: isFocused ? 1.01 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <input
          type="email"
          placeholder="Enter your email"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`h-12 w-full sm:w-[280px] px-4 text-sm border transition-all duration-300 focus:outline-none ${
            isLight 
              ? 'border-[#041540]/20 bg-white text-[#041540] placeholder:text-[#041540]/40 focus:border-[#041540]' 
              : 'border-white/20 bg-white/5 text-white placeholder:text-white/40 focus:border-white'
          }`}
        />
        {/* Focus underline animation */}
        <motion.div
          className={`absolute bottom-0 left-0 h-[2px] ${isLight ? 'bg-[#0115DF]' : 'bg-white'}`}
          initial={{ width: 0 }}
          animate={{ width: isFocused ? '100%' : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
      
      <motion.button
        type="submit"
        className={`h-12 px-8 text-sm font-medium transition-all duration-300 relative overflow-hidden ${
          isLight
            ? 'bg-[#041540] text-white'
            : 'bg-white text-[#041540]'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Hover background animation */}
        <motion.div
          className={`absolute inset-0 ${isLight ? 'bg-[#0115DF]' : 'bg-white/90'}`}
          initial={{ x: '-100%' }}
          animate={{ x: isHovered ? 0 : '-100%' }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
        <span className="relative z-10">Subscribe</span>
      </motion.button>
    </form>
  );
}
