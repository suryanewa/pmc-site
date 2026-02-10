'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import TiltedCard from '@/components/TiltedCard';
import PixelFillCanvas from './PixelFillCanvas';

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

  const [isLinkedInHovered, setIsLinkedInHovered] = useState(false);
  const [linkedInMousePos, setLinkedInMousePos] = useState({ x: 0.5, y: 0.5 });
  const linkedInRef = useRef<HTMLAnchorElement>(null);

  const handleLinkedInMouseEnter = (e: React.MouseEvent) => {
    if (linkedInRef.current) {
      const rect = linkedInRef.current.getBoundingClientRect();
      setLinkedInMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    }
    setIsLinkedInHovered(true);
  };

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
      <div className="w-full aspect-[3/4]">
        {src ? (
          <TiltedCard
            imageSrc={src}
            altText={name}
            containerHeight="100%"
            containerWidth="100%"
            imageHeight="100%"
            imageWidth="100%"
            rotateAmplitude={12}
            scaleOnHover={1.0}
            imageScaleOnHover={1.15}
            showMobileWarning={false}
            showTooltip={false}
            displayOverlayContent={true}
            overlayContent={(isHovered) => (
              <>
                <div
                  className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
                    isHovered ? 'opacity-0' : 'opacity-100'
                  }`}
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0.4) 100%)',
                    mixBlendMode: 'multiply',
                  }}
                />
              </>
            )}
          />
        ) : (
          <div className="w-full h-full bg-[#3F3F3F]" />
        )}
      </div>

      {/* Name and Role */}
      <div className="flex items-start justify-between gap-3 text-[#DBDBDB] tracking-[-0.02em]">
        <div className="min-w-0">
          <p className="text-lg md:text-xl font-medium leading-tight">/{name}</p>
          <p className="text-lg md:text-xl text-[#DBDBDB]/60 leading-tight">/{role}</p>
          {description && (
            <p className="text-sm text-[#DBDBDB]/50 leading-relaxed mt-2">{description}</p>
          )}
        </div>

        <a
          href={linkedInHref}
          target="_blank"
          rel="noreferrer"
          ref={linkedInRef}
          onMouseEnter={handleLinkedInMouseEnter}
          onMouseLeave={() => setIsLinkedInHovered(false)}
          className={`mt-[2px] inline-flex h-9 w-9 shrink-0 items-center justify-center opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto pointer-events-none translate-y-1 ${
            isLinkedInHovered ? 'text-[#DBDBDB]' : 'text-[#DBDBDB]/60'
          }`}
          style={{
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: isLinkedInHovered ? 'rgba(219, 219, 219, 0.35)' : 'rgba(219, 219, 219, 0.15)',
          }}
          aria-label={`Open ${name} on LinkedIn`}
        >
          <PixelFillCanvas
            active={isLinkedInHovered}
            origin={linkedInMousePos}
            color="#41C9C1"
            gap={8}
            speed={0.5}
            className="z-0"
            borderRadius={0}
          />
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative z-10 h-5 w-5"
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
                <rect width="40" height="40" fill="#DBDBDB" />
              </clipPath>
            </defs>
          </svg>
        </a>
      </div>
    </motion.div>
  );
}
