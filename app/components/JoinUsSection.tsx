'use client';

import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
const LinkedInFilled = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const InstagramFilled = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);
import { Button } from './Button';
import { Newsletter } from './Newsletter';
import { FadeUp } from './ScrollAnimations';
import { TextAnimate } from '@/components/ui/text-animate';

type JoinUsVariant = 'default' | 'startup' | 'investing' | 'eir';

const theme = {
  default: {
    bg: 'bg-black',
    accent: '#41C9C1',
    gradientColor: '#41C9C120',
    gradientOpacity: 'opacity-30',
    slashClass: 'text-[#41C9C1]',
    socialBorder: 'rgba(219, 219, 219, 0.6)',
    socialRipple: '#41C9C1',
  },
  startup: {
    bg: 'bg-black',
    accent: '#5076DD',
    gradientColor: '#5076DD20',
    gradientOpacity: 'opacity-25',
    slashClass: 'text-[#5076DD]',
    socialBorder: 'rgba(219, 219, 219, 0.6)',
    socialRipple: '#5076DD',
  },
  investing: {
    bg: 'bg-black',
    accent: '#6966E3',
    gradientColor: '#6966E320',
    gradientOpacity: 'opacity-25',
    slashClass: 'text-[#6966E3]',
    socialBorder: 'rgba(219, 219, 219, 0.6)',
    socialRipple: '#6966E3',
  },
  eir: {
    bg: 'bg-black',
    accent: '#41C9C1',
    gradientColor: '#41C9C120',
    gradientOpacity: 'opacity-25',
    slashClass: 'text-[#41C9C1]',
    socialBorder: 'rgba(219, 219, 219, 0.6)',
    socialRipple: '#41C9C1',
  },
};

interface JoinUsSectionProps {
  variant?: JoinUsVariant;
  newsletterSource?: string;
}

export function JoinUsSection({
  variant = 'default',
  newsletterSource = 'website',
}: JoinUsSectionProps) {
  const t = theme[variant];
  const newsletterRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const [newsletterInView, setNewsletterInView] = useState(false);
  const [socialsInView, setSocialsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (entry.target === newsletterRef.current) {
            setNewsletterInView(true);
            observer.unobserve(entry.target);
          }
          if (entry.target === socialsRef.current) {
            setSocialsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.35,
        rootMargin: '0px 0px -10% 0px',
      },
    );

    if (newsletterRef.current) observer.observe(newsletterRef.current);
    if (socialsRef.current) observer.observe(socialsRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="join-us"
      className={`pt-32 pb-16 px-6 md:px-16 lg:px-24 ${t.bg} relative z-10 overflow-hidden`}
    >
      <motion.div
        className={`absolute inset-0 ${t.gradientOpacity} overflow-hidden`}
        animate={{
          background: [
            `radial-gradient(circle at 0% 0%, ${t.gradientColor} 0%, transparent 50%)`,
            `radial-gradient(circle at 100% 100%, ${t.gradientColor} 0%, transparent 50%)`,
            `radial-gradient(circle at 0% 0%, ${t.gradientColor} 0%, transparent 50%)`,
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-y-12 lg:gap-x-16 items-start">
          <div className="col-span-12 flex flex-col justify-center pt-12">
            <div className="mb-20 lg:mb-32">
              <FadeUp>
                <TextAnimate
                  as="h2"
                  animation="slideLeft"
                  by="character"
                  className="section-title text-[#DBDBDB] mb-8 text-center"
                >
                  Join PMC
                </TextAnimate>
              </FadeUp>

              <FadeUp delay={0.1}>
                <p className="text-xl md:text-2xl text-[#DBDBDB]/60 leading-relaxed max-w-2xl font-light text-center mx-auto">
                  Get access to exclusive events, mentorship, and a network of
                  ambitious students and industry leaders.
                </p>
              </FadeUp>

              <div
                ref={socialsRef}
                className={`relative z-20 flex flex-wrap gap-5 justify-center mt-10 transition-all duration-700 delay-100 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${socialsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <Button
                  href="https://www.linkedin.com/company/nyu-pmc"
                  borderColor={t.socialBorder}
                  textColor="#FFFFFF"
                  rippleColor={t.socialRipple}
                  className="!p-0 !h-16 !w-16 !border"
                >
                  <LinkedInFilled className="size-7" />
                </Button>
                <Button
                  href="https://discord.com/invite/xuxQUsmUQg"
                  borderColor={t.socialBorder}
                  textColor="#FFFFFF"
                  rippleColor={t.socialRipple}
                  className="!p-0 !h-16 !w-16 !border"
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="size-7"
                    fill="currentColor"
                  >
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                </Button>
                <Button
                  href="https://www.instagram.com/nyupmc"
                  borderColor={t.socialBorder}
                  textColor="#FFFFFF"
                  rippleColor={t.socialRipple}
                  className="!p-0 !h-16 !w-16 !border"
                >
                  <InstagramFilled className="size-7" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div
                ref={newsletterRef}
                className={`relative z-10 w-full max-w-xl transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${newsletterInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <Newsletter variant="dark" source={newsletterSource} accentColor={t.accent} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
