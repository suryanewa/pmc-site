'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

// Consistent text-based logo - uses Gotham font
function Logo() {
  return (
    <div className="flex items-baseline">
      <span className="text-xl font-medium tracking-tight text-[#041540]" style={{ fontFamily: 'var(--font-gotham-medium)' }}>
        eeg
      </span>
      <span className="text-xl font-medium tracking-tight text-[#0115DF]" style={{ fontFamily: 'var(--font-gotham-medium)' }}>
        /
      </span>
    </div>
  );
}

export function Footer({ variant = 'default' }: { variant?: 'default' | 'light' }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#F7F3EE] border-t border-[#041540]/10 relative z-10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          {/* Programs */}
          <div>
            <h4 className="text-xs tracking-[0.15em] uppercase text-[#041540]/50 mb-4">Programs</h4>
            <div className="flex flex-col gap-3">
              {['/startup', '/investing', '/eir'].map((program) => (
                <Link 
                  key={program}
                  href={`/programs${program}`} 
                  className="text-sm text-[#041540]/70 hover:text-[#041540] hover:translate-x-1 transition-all duration-300 inline-block"
                  style={{ fontFamily: 'var(--font-gotham-medium)' }}
                >
                  {program}
                </Link>
              ))}
            </div>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-xs tracking-[0.15em] uppercase text-[#041540]/50 mb-4">Community</h4>
            <div className="flex flex-col gap-3">
              <Link href="/people" className="text-sm text-[#041540]/70 hover:text-[#041540] hover:translate-x-1 transition-all duration-300 inline-block">
                People
              </Link>
              <Link href="/people#leadership-spring-26" className="text-sm text-[#041540]/70 hover:text-[#041540] hover:translate-x-1 transition-all duration-300 inline-block">
                Leadership
              </Link>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xs tracking-[0.15em] uppercase text-[#041540]/50 mb-4">Connect</h4>
            <div className="flex flex-col gap-3">
              <a href="https://www.linkedin.com/company/nyueeg/" target="_blank" rel="noopener noreferrer" className="text-sm text-[#041540]/70 hover:text-[#041540] hover:translate-x-1 transition-all duration-300 inline-block">
                LinkedIn
              </a>
              <a href="https://x.com/nyueeg" target="_blank" rel="noopener noreferrer" className="text-sm text-[#041540]/70 hover:text-[#041540] hover:translate-x-1 transition-all duration-300 inline-block">
                X / Twitter
              </a>
              <a href="https://www.instagram.com/nyu.eeg/" target="_blank" rel="noopener noreferrer" className="text-sm text-[#041540]/70 hover:text-[#041540] hover:translate-x-1 transition-all duration-300 inline-block">
                Instagram
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs tracking-[0.15em] uppercase text-[#041540]/50 mb-4">Contact</h4>
            <div className="flex flex-col gap-3">
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSdcQw779OxVgmhXaUkwDBqMBkfnJU6Dwms5m6tss6jD7ZGVPA/viewform" target="_blank" rel="noopener noreferrer" className="text-sm text-[#041540]/70 hover:text-[#041540] hover:translate-x-1 transition-all duration-300 inline-block">
                Get Coffee
              </a>
              <a href="mailto:eeg@stern.nyu.edu" className="text-sm text-[#041540]/70 hover:text-[#041540] hover:translate-x-1 transition-all duration-300 inline-block">
                Email Us
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-start md:items-center pt-8 border-t border-[#041540]/10 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/" className="hover:opacity-70 transition-opacity duration-300">
            <Logo />
          </Link>
          <p className="text-xs text-[#041540]/40">
            &copy; {currentYear} Entrepreneurship & Emerging Growth. NYU Stern.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
