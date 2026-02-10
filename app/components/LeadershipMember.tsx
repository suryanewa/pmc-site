'use client';

import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ProgressiveBlur } from '@/components/motion-primitives/progressive-blur';

interface LeadershipMemberProps {
  src: string;
  name: string;
  role: string;
  linkedinUrl?: string;
  description?: string;
  className?: string;
}

export function LeadershipMember({
  src,
  name,
  role,
  linkedinUrl,
  description,
  className = '',
}: LeadershipMemberProps) {
  const linkedInHref =
    linkedinUrl ??
    `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(name.replace(/-/g, ' '))}`;

  const [isHovered, setIsHovered] = useState(false);
  const linkedInRef = useRef<HTMLAnchorElement>(null);

  return (
    <motion.div
      className={`group flex flex-col gap-[14px] w-full ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Image Container */}
      <div
        className="w-full aspect-[3/4] overflow-hidden relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {src ? (
          <>
            <img
              src={src}
              alt={name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <ProgressiveBlur
              className="pointer-events-none absolute bottom-0 left-0 h-[50%] w-full"
              blurIntensity={1.2}
              animate={isHovered ? 'visible' : 'hidden'}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            />
            <motion.div
              className="pointer-events-none absolute bottom-0 left-0 h-[60%] w-full"
              style={{
                background:
                  'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.7) 100%)',
              }}
              animate={isHovered ? 'visible' : 'hidden'}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            />
            <motion.div
              className="absolute bottom-0 left-0 right-0"
              animate={isHovered ? 'visible' : 'hidden'}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <div className="flex items-end gap-3 px-4 py-4">
                {description && (
                  <p className="text-sm text-white/90 leading-relaxed flex-1 min-w-0">
                    {description}
                  </p>
                )}
                <a
                  href={linkedInHref}
                  target="_blank"
                  rel="noreferrer"
                  ref={linkedInRef}
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center text-white/60 hover:text-white transition-colors duration-200 border border-white/15 hover:border-white/35"
                  aria-label={`Open ${name} on LinkedIn`}
                >
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <g clipPath="url(#clip0_linkedin)">
                      <path
                        d="M4.5353 0C1.80204 0 0 1.86676 0 4.33356C0 6.73368 1.73433 8.66503 4.40093 8.66503C7.26752 8.66503 9.06747 6.73368 9.00081 4.33356C9.00081 1.86676 7.26856 0 4.5353 0ZM30.1325 11.4673C25.5327 11.4673 22.7338 14.133 21.6005 15.9998H21.4682L21.0672 12.0673H13.6684C13.7351 14.6008 13.8673 17.5342 13.8673 21.0011V40H22.3994V23.9325C22.3994 23.1325 22.4661 22.3335 22.6661 21.7334C23.3327 20.1333 24.7337 18.4655 27.067 18.4655C30.2003 18.4655 31.4002 20.9334 31.4002 24.5336V40H40V23.5346C40 15.2675 35.7324 11.4673 30.1325 11.4673ZM0.202077 12.0673V40H8.73415V12.0673H0.202077Z"
                        fill="currentColor"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_linkedin">
                        <rect width="40" height="40" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </a>
              </div>
            </motion.div>
          </>
        ) : (
          <div className="w-full h-full bg-[#3F3F3F]" />
        )}
      </div>

      {/* Name and Role */}
      <div className="text-[#DBDBDB] tracking-[-0.02em]">
        <p className="text-lg md:text-xl font-medium leading-tight">{name}</p>
        <p className="text-lg md:text-xl text-[#DBDBDB]/60 leading-tight">{role}</p>
      </div>
    </motion.div>
  );
}
