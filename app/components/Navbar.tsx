'use client';

import { useState, useEffect } from 'react';
import { Button } from './Button';

interface NavbarProps {
  logo: React.ReactNode;
}

const programsDropdownItems = [
  { label: '/startup', href: '/programs/startup' },
  { label: '/investing', href: '/programs/investing' },
  { label: '/eir', href: '/programs/eir' },
];

export function Navbar({ logo }: NavbarProps) {
  const [isPastHero, setIsPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroThreshold = window.innerHeight * 0.8;
      setIsPastHero(window.scrollY > heroThreshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`flex items-center justify-between w-full px-[80px] fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isPastHero ? 'py-4 shadow-sm bg-[#F7F3EE]' : 'py-[43px] bg-transparent'
      }`}
    >
      <a href="/" className="flex items-center gap-[2px]">{logo}</a>

      <div className="flex items-center gap-[60px]">
        {/* Programs dropdown */}
        <div className="relative group">
          <span className="text-[#041540] text-lg font-medium hover:opacity-70 transition-opacity cursor-default">
            EEG/programs
          </span>
          {/* Dropdown menu */}
          <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            <div className="bg-[#F7F3EE] border border-[#041540]/10 rounded-lg shadow-lg py-2 min-w-[160px]">
              {programsDropdownItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2 text-[#041540] text-base font-medium hover:bg-[#041540]/5 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <a
          href="/people"
          className="text-[#041540] text-lg font-medium hover:opacity-70 transition-opacity"
        >
          EEG/people
        </a>
        <Button size="lg" className="w-[175px]">
          EEG/coffee
        </Button>
      </div>
    </nav>
  );
}
