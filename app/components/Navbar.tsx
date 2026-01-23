'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from './Button';

interface NavbarProps {
  logo: React.ReactNode;
}

const APPLY_URL = "https://forms.gle/placeholder";
const COFFEE_URL = "https://forms.gle/EjU85eHYiz5ZbPpj8";

const programsDropdownItems = [
  { label: '/startup', href: '/programs/startup' },
  { label: '/investing', href: '/programs/investing' },
  { label: '/eir', href: '/programs/eir' },
];

export function Navbar({ logo }: NavbarProps) {
  const [isPastHero, setIsPastHero] = useState(false);
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const programsMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setIsPastHero(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsProgramsOpen(false);
        setIsMobileNavOpen(false);
      }
    };
    if (isProgramsOpen || isMobileNavOpen) {
      window.addEventListener('keydown', onKeyDown);
      return () => window.removeEventListener('keydown', onKeyDown);
    }
  }, [isProgramsOpen, isMobileNavOpen]);

  useEffect(() => {
    if (!isProgramsOpen) return;
    const onMouseDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (programsMenuRef.current && !programsMenuRef.current.contains(target)) {
        setIsProgramsOpen(false);
      }
    };
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, [isProgramsOpen]);

  return (
    <nav
      className={`flex items-center justify-between w-full px-5 sm:px-6 md:px-10 lg:px-20 xl:px-[80px] fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isPastHero ? 'py-3 md:py-4 shadow-sm bg-[#F7F3EE]' : 'py-6 md:py-[43px] bg-[#F7F3EE]/90 backdrop-blur'
      }`}
    >
      <Link href="/" className="flex items-center">{logo}</Link>

      <div className="hidden md:flex items-center gap-4 md:gap-8 lg:gap-10 xl:gap-[60px]">
        {/* Programs dropdown */}
        <div className="relative group" ref={programsMenuRef}>
          <button
            type="button"
            className="text-[#041540] text-lg font-medium hover:opacity-70 transition-opacity"
            aria-haspopup="menu"
            aria-expanded={isProgramsOpen}
            onClick={() => setIsProgramsOpen((v) => !v)}
          >
            Programs
          </button>
          {/* Dropdown menu */}
          <div
            className={`absolute top-full left-0 pt-2 transition-all duration-200 ${isProgramsOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
          >
            <div className="bg-[#F7F3EE] border border-[#041540]/15 shadow-lg py-2 min-w-[180px]">
              {programsDropdownItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-4 py-2 text-[#041540] text-lg font-medium hover:opacity-70 transition-opacity ${
                    index > 0 ? 'border-t border-[#041540]/10' : ''
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <Link
          href="/people"
          className="text-[#041540] text-lg font-medium hover:opacity-70 transition-opacity"
        >
          People
        </Link>
        <a href={COFFEE_URL} className="w-[175px]" target="_blank" rel="noopener noreferrer">
          <Button size="lg" className="w-full">
            Get Coffee
          </Button>
        </a>
      </div>

      <div className="flex md:hidden items-center">
        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-controls="mobile-nav"
          aria-expanded={isMobileNavOpen}
          onClick={() => setIsMobileNavOpen((open) => !open)}
          className="inline-flex items-center justify-center size-10 rounded-full border border-[#041540]/20 text-[#041540] hover:opacity-70 transition-opacity"
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-1">
            <span className="block h-[2px] w-5 bg-current" />
            <span className="block h-[2px] w-5 bg-current" />
            <span className="block h-[2px] w-5 bg-current" />
          </div>
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`absolute top-full left-0 right-0 md:hidden bg-[#F7F3EE] border-t border-[#041540]/10 shadow-sm transition-all duration-200 ${
          isMobileNavOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
        }`}
      >
        <div className="px-5 sm:px-6 py-4 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            {programsDropdownItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileNavOpen(false)}
                className="text-[#041540] text-lg font-medium hover:opacity-70 transition-opacity"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Link
            href="/people"
            onClick={() => setIsMobileNavOpen(false)}
            className="text-[#041540] text-lg font-medium hover:opacity-70 transition-opacity"
          >
            People
          </Link>
          <a href={APPLY_URL} target="_blank" rel="noopener noreferrer" className="w-full">
            <Button size="lg" className="w-full">
              Apply to EEG
            </Button>
          </a>
        </div>
      </div>
    </nav>
  );
}
