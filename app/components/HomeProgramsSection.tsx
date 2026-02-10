'use client';

import { useRef } from 'react';
import { FadeUp } from './ScrollAnimations';
import { TextAnimate } from '@/components/ui/text-animate';

const programs = [
  {
    id: 'product-team',
    title: 'Product Team',
    description: '',
    color: '#5076DD',
    href: '/programs/product-team',
  },
  {
    id: 'mentorship',
    title: 'Mentorship',
    description: '',
    color: '#6966E3',
    href: '/programs/mentorship',
  },
  {
    id: 'grad-bootcamp',
    title: 'Grad Bootcamp',
    description: '',
    color: '#41C9C1',
    href: '/programs/grad-bootcamp',
  },
];

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
            <FadeUp key={program.id} delay={0.1 * index} className="h-full">
              <div className="relative h-full min-h-[320px] rounded-2xl bg-[#1E1E1E]/80 p-8 shadow-[0_20px_40px_rgba(0,0,0,0.18)] overflow-hidden">
                <div
                  data-us-project={
                    program.id === 'investing'
                      ? 'M5cRPBWulgAdSjCuFemf'
                      : program.id === 'eir'
                        ? 'NEJJOUcoL3C4e87FYFaQ'
                        : 'xG650J1WpXyfilT1Q6Bp'
                  }
                  className="absolute z-0"
                  style={{
                    width: 1440,
                    height: 900,
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%) scale(0.8)',
                  }}
                />
                <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
                  <h3
                    className="text-3xl font-medium tracking-[-0.02em]"
                    style={{ fontFamily: 'var(--font-gotham-medium)', color: '#DBDBDB' }}
                  >
                    {program.title}
                  </h3>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
