'use client';

import { useState, useEffect } from 'react';
import { Button } from './Button';

interface NavbarProps {
  logo: React.ReactNode;
}

export function Navbar({ logo }: NavbarProps) {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsCompact(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`flex items-center justify-between w-full px-[52px] fixed top-0 left-0 right-0 z-50 bg-[#F7F3EE] transition-all duration-300 ${
        isCompact ? 'py-4 shadow-sm' : 'py-[43px]'
      }`}
    >
      <div className="flex items-center gap-[2px]">{logo}</div>

      <div className="flex items-center gap-[60px]">
        <a
          href="/programs"
          className="text-[#041540] text-lg font-medium hover:opacity-70 transition-opacity"
        >
          EEG/programs
        </a>
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
