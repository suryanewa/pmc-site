'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const programsDropdownItems = [
  { label: 'startup', href: '/programs/startup', color: '#AD1DE0' },
  { label: 'investing', href: '/programs/investing', color: '#2DB67D' },
  { label: 'eir', href: '/programs/eir', color: '#F0C75B' },
];

interface LogoProps {
  variant?: 'light' | 'dark';
  suffix?: string;
  suffixColor?: string;
}

// Logo component - uses Gotham font for EEG branding only
function Logo({ variant = 'light', suffix, suffixColor }: LogoProps) {
  const textColor = variant === 'dark' ? 'text-white' : 'text-[#041540]';

  return (
    <motion.div
      className="flex items-baseline"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <span 
        className={`text-[1.5rem] md:text-[1.75rem] font-medium tracking-tight ${textColor}`} 
        style={{ fontFamily: 'var(--font-gotham-medium)' }}
      >
        eeg
      </span>
      <span 
        className="text-[1.5rem] md:text-[1.75rem] font-medium tracking-tight text-[#0115DF]" 
        style={{ fontFamily: 'var(--font-gotham-medium)' }}
      >
        /
      </span>
      {suffix && (
        <span
          className="text-[1.5rem] md:text-[1.75rem] font-medium tracking-tight"
          style={{ fontFamily: 'var(--font-gotham-medium)', color: suffixColor || '#0115DF' }}
        >
          {suffix}
        </span>
      )}
    </motion.div>
  );
}

interface NavbarProps {
  variant?: 'light' | 'dark';
  logoSuffix?: string;
  logoSuffixColor?: string;
}

export function Navbar({ variant = 'light', logoSuffix, logoSuffixColor }: NavbarProps) {
  const [isPastHero, setIsPastHero] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isDark = variant === 'dark';

  useEffect(() => {
    const handleScroll = () => {
      setIsPastHero(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Color classes based on variant
  const scrolledBg = isDark ? 'bg-[#1e1e1e]/95' : 'bg-[#F7F3EE]/95';
  const scrolledBorder = isDark ? 'border-white/10' : 'border-[#041540]/5';
  const textColor = isDark ? 'text-white' : 'text-[#041540]';
  const textMuted = isDark ? 'text-white/60' : 'text-[#041540]/60';
  const textHover = isDark ? 'hover:text-white' : 'hover:text-[#041540]';
  const dropdownBg = isDark ? 'bg-[#2a2a2a]' : 'bg-white';
  const dropdownBorder = isDark ? 'border-white/10' : 'border-[#041540]/10';
  const dropdownItemHover = isDark ? 'hover:bg-white/5' : 'hover:bg-[#F7F3EE]';
  const mobileMenuBg = isDark ? 'bg-[#1e1e1e]' : 'bg-[#F7F3EE]';
  const buttonBorder = isDark ? 'border-white/80' : 'border-[#041540]';
  const buttonText = isDark ? 'text-white/90' : 'text-[#041540]';
  const buttonHover = isDark ? 'hover:bg-white hover:text-[#1e1e1e]' : 'hover:bg-[#041540] hover:text-white';

  return (
    <motion.nav
      data-navbar
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isPastHero || isMobileMenuOpen
          ? `${scrolledBg} backdrop-blur-xl border-b ${scrolledBorder}`
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-16 lg:px-24">
        <div className={`flex items-center justify-between transition-all duration-500 ${
          isPastHero ? 'h-16 md:h-18' : 'h-20 md:h-24'
        }`}>
          <Link href="/" className="hover:opacity-80 transition-opacity duration-300">
            <Logo variant={variant} suffix={logoSuffix} suffixColor={logoSuffixColor} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {/* Programs dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <motion.button
                className={`${textMuted} ${textHover} text-sm font-medium px-4 py-2 transition-colors duration-300`}
                whileTap={{ scale: 0.97 }}
              >
                <span className="text-[#0115DF]">/</span>programs
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
                    <div className={`${dropdownBg} backdrop-blur-xl border ${dropdownBorder} shadow-xl py-2 min-w-[180px]`}>
                      {programsDropdownItems.map((item, index) => (
                        <motion.div
                          key={item.href}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Link
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 ${textMuted} ${textHover} text-sm ${dropdownItemHover} transition-all duration-200 group`}
                          >
                            <span
                              className="w-2 h-2 rounded-full transition-transform duration-200 group-hover:scale-125"
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                              <span style={{ color: item.color }}>/</span>
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
                className={`${textMuted} ${textHover} text-sm font-medium px-4 py-2 transition-colors duration-300 inline-block`}
                whileTap={{ scale: 0.97 }}
              >
                <span className="text-[#0115DF]">/</span>people
              </motion.span>
            </Link>

            <motion.a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdcQw779OxVgmhXaUkwDBqMBkfnJU6Dwms5m6tss6jD7ZGVPA/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className={`${buttonText} text-sm font-medium ml-4 px-5 py-2.5 border ${buttonBorder} ${buttonHover} transition-all duration-300`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Coffee Chat
            </motion.a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className={`md:hidden ${textColor} p-2 -mr-2`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.path
                    key="close"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <motion.path
                    key="menu"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </AnimatePresence>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={`md:hidden ${mobileMenuBg} border-t ${scrolledBorder} overflow-hidden`}
          >
            <div className="px-6 py-8 space-y-6">
              {/* Programs section */}
              <div className="space-y-3">
                <p className={`text-xs uppercase tracking-[0.15em] ${textMuted} font-medium`}>
                  Programs
                </p>
                <div className="space-y-1">
                  {programsDropdownItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 py-2 ${textColor} text-base font-medium`}
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span>
                        <span style={{ color: item.color }}>/</span>
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Other links */}
              <div className="space-y-3">
                <p className={`text-xs uppercase tracking-[0.15em] ${textMuted} font-medium`}>
                  Navigate
                </p>
                <Link
                  href="/people"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2 ${textColor} text-base font-medium`}
                >
                  <span className="text-[#0115DF]">/</span>people
                </Link>
              </div>

              {/* CTA */}
              <div className="pt-4">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdcQw779OxVgmhXaUkwDBqMBkfnJU6Dwms5m6tss6jD7ZGVPA/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`inline-block px-6 py-3 border ${buttonBorder} ${buttonText} ${buttonHover} text-sm font-medium transition-all duration-300`}
                >
                  Coffee Chat
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
