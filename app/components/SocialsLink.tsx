'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Linkedin, Twitter, Instagram } from 'lucide-react';

export function SocialsLink() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative flex items-center h-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait" initial={false}>
        {!isHovered ? (
          <motion.a
            key="text"
            href="/socials" // Fallback if JS fails, but we mostly want the hover effect
            className="text-[#DBDBDB]/70 hover:text-[#DBDBDB] transition-colors duration-300"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            socials
          </motion.a>
        ) : (
          <motion.div
            key="icons"
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <a
              href="https://www.linkedin.com/company/nyueeg/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#DBDBDB]/70 hover:text-[#41C9C1] hover:scale-110 transition-all duration-300"
              title="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="https://x.com/nyueeg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#DBDBDB]/70 hover:text-[#41C9C1] hover:scale-110 transition-all duration-300"
              title="X / Twitter"
            >
              <Twitter size={16} />
            </a>
            <a
              href="https://www.instagram.com/nyu.eeg/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#DBDBDB]/70 hover:text-[#41C9C1] hover:scale-110 transition-all duration-300"
              title="Instagram"
            >
              <Instagram size={16} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
