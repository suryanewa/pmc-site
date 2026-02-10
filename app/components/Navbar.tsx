'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './Button';

const eventsDropdownItems = [
  { label: 'Speakers', href: '/events/speakers' },
  { label: 'Office Visits', href: '/events/office-visits' },
  { label: 'Case Comp', href: '/events/case-comp' },
];

const programsDropdownItems = [
  { label: 'Product Team', href: '/programs/product-team', color: '#5076DD' },
  { label: 'Mentorship', href: '/programs/mentorship', color: '#6966E3' },
  { label: 'Grad Bootcamp', href: '/programs/grad-bootcamp', color: '#41C9C1' },
];

const teamDropdownItems = [
  { label: 'E-Board', href: '/people/e-board' },
  { label: 'Leads', href: '/people/leads' },
  { label: 'Past Teams', href: '/people/past-teams' },
];

interface LogoProps {
  variant?: 'light' | 'dark';
  suffix?: string;
  suffixColor?: string;
  slashColor?: string;
}

function Logo({ suffix, suffixColor, slashColor }: LogoProps) {
  return (
    <motion.div
      className="flex items-center gap-2"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Image
        src="/pmc-logo.svg"
        alt="PMC logo"
        width={30}
        height={14}
        className="h-6 w-auto"
        priority
      />
      {suffix && (
        <span className="flex items-baseline">
          <span
            className="text-[1.5rem] md:text-[1.75rem] font-medium tracking-tight"
            style={{ fontFamily: 'var(--font-gotham-medium)', color: suffixColor || '#41C9C1' }}
          >
            {suffix}
          </span>
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
  const [isEventsDropdownOpen, setIsEventsDropdownOpen] = useState(false);
  const [isProgramsDropdownOpen, setIsProgramsDropdownOpen] = useState(false);
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
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
  const scrolledBg = isDark ? 'bg-black/95' : 'bg-black/95';
  const textColor = isDark ? 'text-[#DBDBDB]' : 'text-[#DBDBDB]';
  const textMuted = isDark ? 'text-[#DBDBDB]/60' : 'text-[#DBDBDB]/60';
  const textHover = isDark ? 'hover:text-[#DBDBDB]' : 'hover:text-[#DBDBDB]';
  const dropdownBg = isDark ? 'bg-[#3F3F3F]' : 'bg-[#3F3F3F]';
  const dropdownBorder = isDark ? 'border-[#3F3F3F]/60' : 'border-[#3F3F3F]/60';
  const dropdownItemHover = isDark ? 'hover:bg-[#3F3F3F]/70' : 'hover:bg-[#3F3F3F]/70';
  const mobileMenuBg = isDark ? 'bg-black' : 'bg-black';


  return (
    <motion.nav
      data-navbar
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isPastHero || isMobileMenuOpen
          ? `${scrolledBg} backdrop-blur-xl`
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-16 lg:px-24 relative">
        <div className={`flex items-center justify-between transition-all duration-500 ${
          isPastHero ? 'h-16 md:h-18' : 'h-20 md:h-24'
        }`}>
          <Link href="/" className="hover:opacity-80 transition-opacity duration-300 flex-shrink-0">
            <Logo
              variant={variant}
              suffix={logoSuffix}
              suffixColor={logoSuffixColor}
              slashColor={logoSuffixColor}
            />
          </Link>

          {/* Desktop Navigation - centered Events, Programs, Team */}
          <div className="hidden md:flex items-center justify-center gap-2 absolute left-1/2 -translate-x-1/2">
            {/* Events dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsEventsDropdownOpen(true)}
              onMouseLeave={() => setIsEventsDropdownOpen(false)}
            >
              <motion.button
                className={`${textMuted} ${textHover} text-sm font-medium px-4 py-2 transition-colors duration-300`}
                whileTap={{ scale: 0.97 }}
              >
                Events
              </motion.button>

              <AnimatePresence>
                {isEventsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute top-full left-0 pt-2"
                  >
                    <div className={`${dropdownBg} backdrop-blur-xl border ${dropdownBorder} shadow-xl py-2 min-w-[180px]`}>
                      {eventsDropdownItems.map((item, index) => (
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
                            <span className="group-hover:translate-x-0.5 transition-transform duration-200">
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

            {/* Programs dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsProgramsDropdownOpen(true)}
              onMouseLeave={() => setIsProgramsDropdownOpen(false)}
            >
              <motion.button
                className={`${textMuted} ${textHover} text-sm font-medium px-4 py-2 transition-colors duration-300`}
                whileTap={{ scale: 0.97 }}
              >
                Programs
              </motion.button>

              {/* Dropdown menu */}
              <AnimatePresence>
                {isProgramsDropdownOpen && (
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
                            <span className="group-hover:translate-x-0.5 transition-transform duration-200">
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

            {/* Team dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsTeamDropdownOpen(true)}
              onMouseLeave={() => setIsTeamDropdownOpen(false)}
            >
              <motion.button
                className={`${textMuted} ${textHover} text-sm font-medium px-4 py-2 transition-colors duration-300`}
                whileTap={{ scale: 0.97 }}
              >
                Team
              </motion.button>

              <AnimatePresence>
                {isTeamDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute top-full left-0 pt-2"
                  >
                    <div className={`${dropdownBg} backdrop-blur-xl border ${dropdownBorder} shadow-xl py-2 min-w-[180px]`}>
                      {teamDropdownItems.map((item, index) => (
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
                            <span className="group-hover:translate-x-0.5 transition-transform duration-200">
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
          </div>

          {/* Coffee Chat - right side */}
          <div className="hidden md:block flex-shrink-0">
            <Button
              href="https://docs.google.com/forms/d/e/1FAIpQLSdcQw779OxVgmhXaUkwDBqMBkfnJU6Dwms5m6tss6jD7ZGVPA/viewform"
              className="px-5 py-2.5"
            >
              Coffee Chat
            </Button>
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
            className={`md:hidden ${mobileMenuBg} overflow-hidden`}
          >
            <div className="px-6 py-8 space-y-6">
              {/* Events section */}
              <div className="space-y-3">
                <p className={`text-xs uppercase tracking-[0.15em] ${textMuted} font-medium`}>
                  Events
                </p>
                <div className="space-y-1">
                  {eventsDropdownItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 py-2 ${textColor} text-base font-medium`}
                    >
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>

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
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Team links */}
              <div className="space-y-3">
                <p className={`text-xs uppercase tracking-[0.15em] ${textMuted} font-medium`}>
                  Team
                </p>
                <div className="space-y-1">
                  <Link
                    href="/people/e-board"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-2 ${textColor} text-base font-medium`}
                  >
                    E-Board
                  </Link>
                  <Link
                    href="/people/leads"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-2 ${textColor} text-base font-medium`}
                  >
                    Leads
                  </Link>
                  <Link
                    href="/people/past-teams"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-2 ${textColor} text-base font-medium`}
                  >
                    Past Teams
                  </Link>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-4">
                <div onClick={() => setIsMobileMenuOpen(false)}>
                  <Button
                    href="https://docs.google.com/forms/d/e/1FAIpQLSdcQw779OxVgmhXaUkwDBqMBkfnJU6Dwms5m6tss6jD7ZGVPA/viewform"
                    className="px-6 py-3"
                  >
                    Coffee Chat
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
