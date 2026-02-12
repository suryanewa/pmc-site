'use client';

import { memo, useRef, useState } from 'react';
import Link from 'next/link';
import { FadeUp } from './ScrollAnimations';
import { TextAnimate } from '@/components/ui/text-animate';
import { ProgressiveBlur } from '@/components/motion-primitives/progressive-blur';
import AsciiHoverEffect from '@/components/AsciiHoverEffect';

const programs = [
  {
    id: 'product-team',
    title: 'Product Team',
    description: 'Build PM fundamentals by shipping real features with a cross-functional student team.',
    color: '#5076DD',
    href: '/programs/product-team',
  },
  {
    id: 'mentorship',
    title: 'Mentorship',
    description: 'Get paired with industry mentors for focused career guidance and recruiting preparation.',
    color: '#6966E3',
    href: '/programs/mentorship',
  },
  {
    id: 'grad-bootcamp',
    title: 'Grad Bootcamp',
    description: 'Go from PM basics to portfolio-ready execution in an intensive, hands-on graduate cohort.',
    color: '#41C9C1',
    href: '/programs/grad-bootcamp',
  },
];

type Program = (typeof programs)[number];

const ProgramCard = memo(function ProgramCard({
  program,
  index,
}: {
  program: Program;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <FadeUp delay={0.1 * index} className="h-full">
      <Link
        href={program.href}
        data-program-card
        className="group relative block h-full min-h-[320px] rounded-2xl bg-[#1E1E1E]/80 p-8 shadow-[0_20px_40px_rgba(0,0,0,0.18)] overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          data-us-project={
            program.id === 'investing'
              ? 'M5cRPBWulgAdSjCuFemf'
              : program.id === 'eir'
                ? 'NEJJOUcoL3C4e87FYFaQ'
                : 'xG650J1WpXyfilT1Q6Bp'
          }
          data-us-production="true"
          className="absolute z-0 pointer-events-none"
          style={{
            width: 1440,
            height: 900,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%) scale(0.8)',
          }}
        />
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            backgroundColor: program.id === 'mentorship' ? 'rgba(0, 50, 150, 0.4)' : program.id === 'grad-bootcamp' ? 'rgba(180, 80, 220, 0.65)' : 'transparent',
            mixBlendMode: program.id === 'mentorship' || program.id === 'grad-bootcamp' ? 'multiply' : undefined,
          }}
        />
        <div className="absolute inset-0 z-[2] pointer-events-none">
          <AsciiHoverEffect
            active={isHovered}
            colors={`${program.color},rgba(219,219,219,0.7),rgba(63,63,63,0.8)`}
            fontSize={10}
            className="opacity-40 mix-blend-screen"
          />
        </div>
         <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[44%]">
           <ProgressiveBlur
             direction="bottom"
             blurIntensity={1.25}
             className="absolute inset-0"
             animate={{ opacity: isHovered ? 1 : 0 }}
             transition={{ duration: 0.25, ease: 'easeOut' }}
           />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.38) 45%, rgba(0,0,0,0.72) 100%)',
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 250ms ease-out',
            }}
          />
        </div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
          <h3
            className="text-3xl font-medium tracking-[-0.02em]"
            style={{ fontFamily: 'var(--font-gotham-medium)', color: '#DBDBDB' }}
          >
            {program.title}
          </h3>
        </div>
        <div className="absolute inset-x-6 bottom-6 z-[4] flex translate-y-2 items-end justify-center gap-4 opacity-0 transition-[opacity,transform] duration-300 ease-out pointer-events-none group-hover:opacity-100 group-hover:translate-y-0">
          <p className="pointer-events-none max-w-full text-center text-sm leading-relaxed text-[#DBDBDB]/90">
            {program.description}
          </p>
        </div>
      </Link>
    </FadeUp>
  );
});

export function HomeProgramsSection() {
  const programsTopRef = useRef<HTMLDivElement | null>(null);
  const themeTransition = 'transition-colors duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)]';

  return (
    <section
      id="programs"
      className={`relative overflow-visible py-32 px-6 md:px-16 lg:px-24 ${themeTransition} text-[#DBDBDB]`}
    >
      <div
        ref={programsTopRef}
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        aria-hidden="true"
      />
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col items-center text-center mb-20">
          <FadeUp>
            <TextAnimate
              as="h2"
              animation="slideLeft"
              by="character"
              className={`section-title whitespace-nowrap ${themeTransition} text-[#DBDBDB]`}
            >
              Programs
            </TextAnimate>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p
              className={`text-lg leading-relaxed mt-4 max-w-2xl ${themeTransition} text-[#DBDBDB]/70`}
            >
              Get hands on with our programs and build practical skills through unforgettable experiences. Find your fit below!
            </p>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 overflow-visible">
          {programs.map((program, index) => (
            <ProgramCard key={program.id} program={program} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
