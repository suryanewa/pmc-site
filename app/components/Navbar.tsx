'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

import { Button } from './Button';

const programsDropdownItems = [
  { label: '/startup', href: '/programs/startup', color: '#AD1DE0' },
  { label: '/investing', href: '/programs/investing', color: '#2DB67D' },
  { label: '/eir', href: '/programs/eir', color: '#F0C75B' },
];

// Text-based logo component - uses Gotham font
function Logo() {
  return (
    <motion.div 
      className="flex items-baseline"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <span className="text-[1.875rem] font-medium tracking-tight text-[#041540]" style={{ fontFamily: 'var(--font-gotham-medium)' }}>
        eeg
      </span>
      <span className="text-[1.875rem] font-medium tracking-tight text-[#0115DF]" style={{ fontFamily: 'var(--font-gotham-medium)' }}>
        /
      </span>
    </motion.div>
  );
}

export function Navbar() {
  const [isPastHero, setIsPastHero] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsPastHero(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      data-navbar
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-16 lg:px-24 transition-all duration-500 ${
        isPastHero 
          ? 'bg-[#F7F3EE]/80 backdrop-blur-xl border-b border-[#041540]/5' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto w-full">
        <div className={`flex items-center justify-between transition-all duration-500 ${
          isPastHero ? 'h-20' : 'h-24'
        }`}>
          <Link href="/" className="hover:opacity-70 transition-opacity duration-300">
            <Logo />
          </Link>

          <div className="flex items-center gap-1">
            {/* Programs dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <motion.button 
                className="text-[#041540] text-sm font-medium px-4 py-2 hover:text-[#041540]/60 transition-colors duration-300"
                whileTap={{ scale: 0.95 }}
              >
                /programs
              </motion.button>
              
              {/* Dropdown menu */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute top-full left-0 pt-2"
                  >
                    <div className="bg-white/95 backdrop-blur-xl border border-[#041540]/10 shadow-xl shadow-[#041540]/5 py-2 min-w-[160px]">
                      {programsDropdownItems.map((item, index) => (
                        <motion.div
                          key={item.href}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Link
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-2.5 text-[#041540] text-sm hover:bg-[#F7F3EE] transition-all duration-200 group"
                          >
                            <motion.span 
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: item.color }}
                              whileHover={{ scale: 1.5 }}
                            />
                            <span 
                              className="group-hover:translate-x-0.5 transition-transform duration-200"
                              style={{ fontFamily: 'var(--font-gotham-medium)' }}
                            >
                              {item.label}
                            </span>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/people">
              <motion.span 
                className="text-[#041540] text-sm font-medium px-4 py-2 hover:text-[#041540]/60 transition-colors duration-300 inline-block"
                whileTap={{ scale: 0.95 }}
              >
                /people
              </motion.span>
            </Link>

            <Button
              href="#"
              borderColor="#041540"
              textColor="#041540"
              className="ml-4 px-5 py-2 !h-auto !text-sm"
            >
              Coffee Chat
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
